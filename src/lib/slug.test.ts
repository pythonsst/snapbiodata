import { describe, it, expect } from "vitest";
import { slugify, reservedSlugs } from "./slug";

describe("slugify", () => {
  it("lowercases and hyphenates", () => {
    expect(slugify("Aarav Sharma")).toBe("aarav-sharma");
  });

  it("strips punctuation and collapses separators", () => {
    expect(slugify("  Priya & Co. ")).toBe("priya-co");
    expect(slugify("a___b---c")).toBe("a-b-c");
  });

  it("trims leading/trailing hyphens", () => {
    expect(slugify("!!hello!!")).toBe("hello");
  });

  it("caps length at 60 characters", () => {
    expect(slugify("a".repeat(100)).length).toBe(60);
  });

  it("returns empty string for non-alphanumeric input", () => {
    expect(slugify("！＠＃")).toBe("");
  });
});

describe("reservedSlugs", () => {
  it("reserves app routes and the empty slug", () => {
    expect(reservedSlugs.has("create")).toBe(true);
    expect(reservedSlugs.has("api")).toBe(true);
    expect(reservedSlugs.has("")).toBe(true);
  });

  it("does not reserve ordinary names", () => {
    expect(reservedSlugs.has("aarav-sharma")).toBe(false);
  });
});
