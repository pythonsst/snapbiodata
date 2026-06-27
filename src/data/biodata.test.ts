import { describe, it, expect } from "vitest";
import {
  formatValue,
  isFieldFilled,
  filledCount,
  biodataSections,
  type FieldDef,
} from "./biodata";

const dateField: FieldDef = { key: "dob", label: "Date of Birth", type: "date" };
const textField: FieldDef = { key: "fullName", label: "Full Name" };

describe("formatValue", () => {
  it("formats a valid date as a readable string", () => {
    expect(formatValue(dateField, "1996-04-12")).toBe("12 April 1996");
  });

  it("returns empty for an empty value", () => {
    expect(formatValue(dateField, "")).toBe("");
    expect(formatValue(textField, undefined)).toBe("");
  });

  it("passes through non-date values unchanged", () => {
    expect(formatValue(textField, "Aarav Sharma")).toBe("Aarav Sharma");
  });

  it("leaves an unparseable date untouched", () => {
    expect(formatValue(dateField, "not-a-date")).toBe("not-a-date");
  });
});

describe("isFieldFilled", () => {
  it("is false for missing or blank values", () => {
    expect(isFieldFilled(textField, {})).toBe(false);
    expect(isFieldFilled(textField, { fullName: "   " })).toBe(false);
  });

  it("is true for a real value", () => {
    expect(isFieldFilled(textField, { fullName: "Aarav" })).toBe(true);
  });
});

describe("filledCount", () => {
  const personal = biodataSections.find((s) => s.id === "personal")!;

  it("counts only filled fields", () => {
    expect(filledCount(personal, {})).toBe(0);
    expect(filledCount(personal, { fullName: "Aarav", height: "5'10\"" })).toBe(2);
  });
});
