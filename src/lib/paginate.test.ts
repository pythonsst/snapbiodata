import { describe, it, expect } from "vitest";
import { paginate, gapFor, type Gaps, type Unit } from "./paginate";

const gaps: Gaps = { header: 16, section: 18, heading: 10, row: 6 };

describe("gapFor", () => {
  it("returns the gap for each unit type", () => {
    expect(gapFor({ type: "header" }, gaps)).toBe(16);
    expect(gapFor({ type: "heading", s: 0 }, gaps)).toBe(10);
    expect(gapFor({ type: "row", s: 0, r: 0 }, gaps)).toBe(6);
    expect(gapFor({ type: "section", s: 0 }, gaps)).toBe(18);
  });
});

describe("paginate", () => {
  it("returns no pages for no units", () => {
    expect(paginate([], { contentPx: 100, heights: [], gaps })).toEqual([]);
  });

  it("keeps everything on one page when it fits", () => {
    const units: Unit[] = [
      { type: "heading", s: 0 },
      { type: "row", s: 0, r: 0 },
      { type: "row", s: 0, r: 1 },
    ];
    const pages = paginate(units, { contentPx: 1000, heights: [20, 30, 30], gaps });
    expect(pages).toHaveLength(1);
    expect(pages[0]).toHaveLength(3);
  });

  it("splits a long section across pages and repeats the heading", () => {
    const units: Unit[] = [
      { type: "heading", s: 0 },
      { type: "row", s: 0, r: 0 },
      { type: "row", s: 0, r: 1 },
    ];
    // heading(20+10) + row0(30+6) = 66 fits; row1 pushes to 102 > 80.
    const pages = paginate(units, { contentPx: 80, heights: [20, 30, 30], gaps });
    expect(pages).toHaveLength(2);
    expect(pages[0]).toEqual([
      { type: "heading", s: 0 },
      { type: "row", s: 0, r: 0 },
    ]);
    // Continuation page repeats the heading before the carried-over row.
    expect(pages[1]).toEqual([
      { type: "heading", s: 0 },
      { type: "row", s: 0, r: 1 },
    ]);
  });

  it("never strands a heading at the bottom without its first row", () => {
    const units: Unit[] = [
      { type: "header" },
      { type: "heading", s: 0 },
      { type: "row", s: 0, r: 0 },
    ];
    // header(40+16=56) fills page 1; heading+firstRow don't fit after it,
    // so the heading must move down with its row rather than sit alone.
    const pages = paginate(units, { contentPx: 100, heights: [40, 20, 30], gaps });
    expect(pages).toHaveLength(2);
    expect(pages[0]).toEqual([{ type: "header" }]);
    expect(pages[1]).toEqual([
      { type: "heading", s: 0 },
      { type: "row", s: 0, r: 0 },
    ]);
  });

  it("packs atomic sections one per page when they don't both fit", () => {
    const units: Unit[] = [
      { type: "section", s: 0 },
      { type: "section", s: 1 },
    ];
    const pages = paginate(units, { contentPx: 100, heights: [60, 60], gaps });
    expect(pages).toEqual([[{ type: "section", s: 0 }], [{ type: "section", s: 1 }]]);
  });

  it("counts the gap after each unit when packing", () => {
    const units: Unit[] = [
      { type: "row", s: 0, r: 0 },
      { type: "row", s: 0, r: 1 },
    ];
    // Without gaps: 50+50 = 100 (fits in 100). With row gap 6 each: 56+56 = 112 > 100.
    const pages = paginate(units, { contentPx: 100, heights: [50, 50], gaps });
    expect(pages).toHaveLength(2);
  });
});
