"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { renderedSections, type RenderedSection } from "./shared";
import type { Biodata } from "@/data/biodata";

const MM = 3.779527559; // px per mm @96dpi
const A4_W = 793.7;
const A4_H = 1122.5;

export interface FramedDocProps {
  data: Biodata;
  /** Page background colour. */
  bg?: string;
  /** Content padding in mm. */
  padX: number;
  padTop: number;
  padBottom: number;
  /** Decorative frame for one page; receives the page index for unique ids. */
  frame: (pageIndex: number) => ReactNode;
  /** Page-1 header block (name / photo / invocation). */
  header?: ReactNode;
  /** Render one section (heading + rows). Kept whole on a page. */
  renderSection: (section: RenderedSection) => ReactNode;
}

/**
 * Splits a biodata into self-contained, individually-framed A4 pages by
 * measuring each block. This makes multi-page PDFs reliable across every print
 * engine — each printed sheet is one complete framed page.
 */
export default function FramedDoc({
  data,
  bg = "#ffffff",
  padX,
  padTop,
  padBottom,
  frame,
  header,
  renderSection,
}: FramedDocProps) {
  const sections = renderedSections(data);

  const blocks: { key: string; node: ReactNode }[] = [];
  if (header) blocks.push({ key: "__header", node: header });
  for (const s of sections) blocks.push({ key: s.id, node: renderSection(s) });

  const measRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [pages, setPages] = useState<number[][] | null>(null);

  // Vertical gap rendered between blocks; counted in packing so measured heights
  // (which exclude margins) stay accurate.
  const GAP = 24;

  const sig = JSON.stringify(data.values) + (data.photo ? "1" : "0") + data.header;
  useLayoutEffect(() => {
    // A small safety buffer prevents a block that's a hair too tall from making
    // the browser split a page in two.
    const contentPx = A4_H - (padTop + padBottom) * MM - 8;
    const heights = measRefs.current.map((el) => (el ? el.offsetHeight : 0));
    const result: number[][] = [];
    let cur: number[] = [];
    let h = 0;
    blocks.forEach((_, i) => {
      const bh = (heights[i] || 0) + GAP;
      if (cur.length && h + bh > contentPx) {
        result.push(cur);
        cur = [];
        h = 0;
      }
      cur.push(i);
      h += bh;
    });
    if (cur.length) result.push(cur);
    setPages(result);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sig, padTop, padBottom, padX]);

  const contentStyle = {
    paddingLeft: `${padX}mm`,
    paddingRight: `${padX}mm`,
    paddingTop: `${padTop}mm`,
    paddingBottom: `${padBottom}mm`,
  };

  const laidOut = pages ?? [blocks.map((_, i) => i)];

  return (
    <>
      {/* Hidden measurer at the real content width */}
      <div
        aria-hidden
        style={{ position: "absolute", left: -99999, top: 0, width: A4_W - 2 * padX * MM, visibility: "hidden" }}
      >
        {blocks.map((b, i) => (
          <div
            key={b.key}
            ref={(el) => {
              measRefs.current[i] = el;
            }}
          >
            {b.node}
          </div>
        ))}
      </div>

      {laidOut.map((pageBlocks, pi) => (
        <div
          key={pi}
          className="a4 doc relative"
          style={{ background: bg, breakAfter: pi < laidOut.length - 1 ? "page" : "auto" }}
        >
          {frame(pi)}
          <div className="relative" style={contentStyle}>
            {pageBlocks.map((bi) => (
              <div key={blocks[bi].key} style={{ marginBottom: GAP }}>
                {blocks[bi].node}
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
