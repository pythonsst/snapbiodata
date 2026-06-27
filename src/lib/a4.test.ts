import { describe, it, expect } from "vitest";
import { MM, A4_W, A4_H, A4_RATIO, A4_WIDTH_MM, A4_HEIGHT_MM } from "./a4";

describe("a4 geometry", () => {
  it("derives px dimensions from mm at 96dpi", () => {
    expect(A4_W).toBeCloseTo(210 * MM, 5);
    expect(A4_H).toBeCloseTo(297 * MM, 5);
    expect(A4_W).toBeCloseTo(793.7, 1);
    expect(A4_H).toBeCloseTo(1122.5, 1);
  });

  it("has the correct portrait aspect ratio", () => {
    expect(A4_RATIO).toBeCloseTo(A4_HEIGHT_MM / A4_WIDTH_MM, 6);
    expect(A4_RATIO).toBeCloseTo(1.4142, 3);
    expect(A4_H / A4_W).toBeCloseTo(A4_RATIO, 6);
  });
});
