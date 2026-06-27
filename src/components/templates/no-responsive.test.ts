import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

/**
 * Templates render a fixed A4-width document, so they must NOT use viewport
 * breakpoints (sm:/md:/lg:/xl:). A responsive class collapses the layout on a
 * narrow phone, making the document measure taller there and paginate
 * differently than on desktop — i.e. a different PDF per device. Guard against
 * reintroducing that (it was the Royal "1 page desktop / 2 pages mobile" bug).
 */
const dir = join(process.cwd(), "src/components/templates");
const files = readdirSync(dir).filter((f) => f.endsWith("Template.tsx"));

describe("templates use no viewport-responsive classes", () => {
  it("has template files to check", () => {
    expect(files.length).toBeGreaterThan(0);
  });

  it.each(files)("%s has no sm:/md:/lg:/xl: classes", (file) => {
    const src = readFileSync(join(dir, file), "utf8");
    const matches = src.match(/\b(?:sm|md|lg|xl|2xl):/g) ?? [];
    expect(matches).toEqual([]);
  });
});
