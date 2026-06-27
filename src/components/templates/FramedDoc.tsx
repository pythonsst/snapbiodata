"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { renderedSections, type RenderedRow, type RenderedSection } from "./shared";
import type { Biodata } from "@/data/biodata";

const MM = 3.779527559; // px per mm @96dpi
const A4_W = 793.7;
const A4_H = 1122.5;

// Spacing (px) added between units; counted in packing and applied on render.
const HEADER_GAP = 16; // below the page-1 header
const SECTION_GAP = 18; // above a section heading (unless it starts a page)
const HEADING_GAP = 10; // below a heading, before its first row
const ROW_GAP = 6; // below each row
const BUFFER = 10; // safety so a too-tall page never forces a browser split

type Unit =
  | { type: "header" }
  | { type: "heading"; s: number }
  | { type: "row"; s: number; r: number }
  | { type: "section"; s: number }; // atomic mode

export interface FramedDocProps {
  data: Biodata;
  bg?: string;
  padX: number;
  padTop: number;
  padBottom: number;
  frame: (pageIndex: number) => ReactNode;
  header?: ReactNode;
  /** Row-level mode (fills pages, splits long sections, repeats the heading). */
  renderHeading?: (title: string) => ReactNode;
  renderRow?: (row: RenderedRow) => ReactNode;
  /** Atomic mode — keep each whole section together (e.g. 2-column layouts). */
  renderSection?: (section: RenderedSection) => ReactNode;
}

/**
 * Splits a biodata into self-contained, individually-framed A4 pages by
 * measuring each unit. Every printed sheet is one complete framed page, and
 * pages fill tightly (sections continue across a break with the heading
 * repeated). Works the same in every print engine.
 */
export default function FramedDoc(props: FramedDocProps) {
  const { data, bg = "#ffffff", padX, padTop, padBottom, frame, header } = props;
  const sections = renderedSections(data);
  const rowLevel = Boolean(props.renderHeading && props.renderRow);

  // Build the ordered unit list.
  const units: Unit[] = [];
  if (header) units.push({ type: "header" });
  sections.forEach((s, si) => {
    if (rowLevel) {
      units.push({ type: "heading", s: si });
      s.rows.forEach((_, ri) => units.push({ type: "row", s: si, r: ri }));
    } else {
      units.push({ type: "section", s: si });
    }
  });

  const nodeFor = (u: Unit): ReactNode => {
    if (u.type === "header") return header;
    if (u.type === "section") return props.renderSection!(sections[u.s]);
    if (u.type === "heading") return props.renderHeading!(sections[u.s].title);
    return props.renderRow!(sections[u.s].rows[u.r]);
  };
  const gapFor = (u: Unit): number =>
    u.type === "header" ? HEADER_GAP : u.type === "heading" ? HEADING_GAP : u.type === "row" ? ROW_GAP : SECTION_GAP;

  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const [pages, setPages] = useState<Unit[][] | null>(null);

  const sig = JSON.stringify(data.values) + (data.photo ? "1" : "0") + data.header + rowLevel;
  useLayoutEffect(() => {
    const contentPx = A4_H - (padTop + padBottom) * MM - BUFFER;
    const H = refs.current.map((el) => (el ? el.offsetHeight : 0));
    const pgs: Unit[][] = [];
    let cur: Unit[] = [];
    let h = 0;
    const flush = () => {
      if (cur.length) {
        pgs.push(cur);
        cur = [];
        h = 0;
      }
    };
    for (let i = 0; i < units.length; i++) {
      const u = units[i];
      const uh = (H[i] || 0) + gapFor(u);

      if (u.type === "heading") {
        const next = units[i + 1];
        const firstRowH = next && next.type === "row" ? (H[i + 1] || 0) + ROW_GAP : 0;
        const topGap = cur.length ? SECTION_GAP : 0;
        // Don't strand a heading at the bottom: it must fit with its first row.
        if (cur.length && h + topGap + uh + firstRowH > contentPx) flush();
        h += cur.length ? SECTION_GAP : 0;
        cur.push(u);
        h += uh;
      } else if (u.type === "row") {
        if (cur.length && h + uh > contentPx) {
          flush();
          // Repeat the section heading at the top of the continuation page.
          const hi = units.findIndex((x) => x.type === "heading" && x.s === u.s);
          if (hi >= 0) {
            cur.push(units[hi]);
            h += (H[hi] || 0) + HEADING_GAP;
          }
        }
        cur.push(u);
        h += uh;
      } else {
        // header or atomic section
        if (cur.length && h + uh > contentPx) flush();
        cur.push(u);
        h += uh;
      }
    }
    flush();
    // Derived layout from measured DOM — setting state here is intentional.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPages(pgs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sig, padTop, padBottom, padX]);

  const contentStyle = {
    paddingLeft: `${padX}mm`,
    paddingRight: `${padX}mm`,
    paddingTop: `${padTop}mm`,
    paddingBottom: `${padBottom}mm`,
  };

  const laid = pages ?? [units];

  return (
    <>
      {/* Hidden measurer — wrapped in a 0×0 clip so it never affects page width. */}
      <div aria-hidden style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}>
        <div style={{ width: A4_W - 2 * padX * MM }}>
          {units.map((u, i) => (
          <div
            key={i}
            ref={(el) => {
              refs.current[i] = el;
            }}
            >
              {nodeFor(u)}
            </div>
          ))}
        </div>
      </div>

      {laid.map((pageUnits, pi) => (
        <div
          key={pi}
          className="a4 doc relative"
          style={{ background: bg, breakAfter: pi < laid.length - 1 ? "page" : "auto" }}
        >
          {frame(pi)}
          <div className="relative" style={contentStyle}>
            {pageUnits.map((u, j) => (
              <div
                key={`${pi}-${j}`}
                style={{
                  marginTop: u.type === "heading" && j > 0 ? SECTION_GAP : 0,
                  marginBottom: gapFor(u),
                }}
              >
                {nodeFor(u)}
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
