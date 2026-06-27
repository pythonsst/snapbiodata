/**
 * Pure pagination: pack a flat list of measured "units" into A4 pages.
 *
 * This is the bug-prone heart of the PDF engine, so it is deliberately a pure,
 * side-effect-free function with no DOM access — FramedDoc measures the DOM and
 * hands the heights here. That keeps it fully unit-testable (see paginate.test.ts).
 *
 * Packing rules:
 *  - Units flow top-to-bottom; a new page starts when the next unit would overflow.
 *  - A section heading is never stranded at the bottom: if the heading plus its
 *    first row don't both fit, the heading moves to the next page.
 *  - When a section's rows continue onto a new page, its heading is repeated at
 *    the top of the continuation page.
 */

export type Unit =
  | { type: "header" }
  | { type: "heading"; s: number }
  | { type: "row"; s: number; r: number }
  | { type: "section"; s: number }; // atomic mode — whole section kept together

export interface Gaps {
  header: number;
  heading: number;
  row: number;
  section: number;
}

export interface PaginateOptions {
  /** Usable content height per page in px (page height minus padding and buffer). */
  contentPx: number;
  /** Measured offsetHeight per unit, index-aligned with `units`. */
  heights: number[];
  /** Vertical gap (px) that follows each unit type; counted in packing. */
  gaps: Gaps;
}

export function gapFor(unit: Unit, gaps: Gaps): number {
  switch (unit.type) {
    case "header":
      return gaps.header;
    case "heading":
      return gaps.heading;
    case "row":
      return gaps.row;
    default:
      return gaps.section;
  }
}

export function paginate(units: Unit[], opts: PaginateOptions): Unit[][] {
  const { contentPx, heights, gaps } = opts;
  const pages: Unit[][] = [];
  let cur: Unit[] = [];
  let h = 0;

  const flush = () => {
    if (cur.length) {
      pages.push(cur);
      cur = [];
      h = 0;
    }
  };

  for (let i = 0; i < units.length; i++) {
    const u = units[i];
    const uh = (heights[i] || 0) + gapFor(u, gaps);

    if (u.type === "heading") {
      const next = units[i + 1];
      const firstRowH = next && next.type === "row" ? (heights[i + 1] || 0) + gaps.row : 0;
      const topGap = cur.length ? gaps.section : 0;
      // Don't strand a heading at the bottom: it must fit with its first row.
      if (cur.length && h + topGap + uh + firstRowH > contentPx) flush();
      h += cur.length ? gaps.section : 0;
      cur.push(u);
      h += uh;
    } else if (u.type === "row") {
      if (cur.length && h + uh > contentPx) {
        flush();
        // Repeat the section heading at the top of the continuation page.
        const hi = units.findIndex((x) => x.type === "heading" && x.s === u.s);
        if (hi >= 0) {
          cur.push(units[hi]);
          h += (heights[hi] || 0) + gaps.heading;
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
  return pages;
}
