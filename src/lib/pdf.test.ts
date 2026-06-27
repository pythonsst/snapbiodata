import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock the heavy libs so we can unit-test the page-iteration logic in isolation.
const mocks = vi.hoisted(() => ({
  html2canvas: vi.fn(),
  addPage: vi.fn(),
  addImage: vi.fn(),
  save: vi.fn(),
}));

vi.mock("html2canvas-pro", () => ({ default: mocks.html2canvas }));
vi.mock("jspdf", () => ({
  jsPDF: vi.fn(() => ({ addPage: mocks.addPage, addImage: mocks.addImage, save: mocks.save })),
}));

import { downloadBiodataPdf } from "./pdf";

function container(pageCount: number): HTMLElement {
  const el = document.createElement("div");
  for (let i = 0; i < pageCount; i++) {
    const p = document.createElement("div");
    p.className = "a4";
    el.appendChild(p);
  }
  return el;
}

describe("downloadBiodataPdf", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.html2canvas.mockResolvedValue({ toDataURL: () => "data:image/jpeg;base64,AAAA" });
  });

  it("writes one image per .a4 page and adds a page between them", async () => {
    const n = await downloadBiodataPdf(container(2), "x-biodata.pdf");
    expect(n).toBe(2);
    expect(mocks.html2canvas).toHaveBeenCalledTimes(2);
    expect(mocks.addImage).toHaveBeenCalledTimes(2);
    expect(mocks.addPage).toHaveBeenCalledTimes(1); // only between pages, not before the first
    expect(mocks.save).toHaveBeenCalledWith("x-biodata.pdf");
  });

  it("does not add a page for a single-page document", async () => {
    await downloadBiodataPdf(container(1));
    expect(mocks.addPage).not.toHaveBeenCalled();
    expect(mocks.save).toHaveBeenCalledOnce();
  });

  it("throws when there is nothing to export", async () => {
    await expect(downloadBiodataPdf(container(0))).rejects.toThrow(/nothing to export/i);
    expect(mocks.save).not.toHaveBeenCalled();
  });
});
