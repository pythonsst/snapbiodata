import { describe, it, expect } from "vitest";
import { useState } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BiodataForm from "./BiodataForm";
import { emptyBiodata, sampleBiodata, type Biodata } from "@/data/biodata";

/** Controlled harness so the form actually reflects its own onChange. */
function Harness({ initial }: { initial: Biodata }) {
  const [data, setData] = useState<Biodata>(initial);
  return <BiodataForm data={data} onChange={setData} />;
}

describe("BiodataForm", () => {
  it("edits a field and reflects it back", async () => {
    render(<Harness initial={emptyBiodata} />);
    const input = screen.getByPlaceholderText("e.g. Aarav Sharma");
    await userEvent.type(input, "Priya");
    expect(input).toHaveValue("Priya");
  });

  it("shows a per-section completion badge", () => {
    render(<Harness initial={emptyBiodata} />);
    // Personal Details has 19 fields, none filled in the empty biodata.
    expect(screen.getByText("0/19")).toBeInTheDocument();
  });

  it("loads the sample data", async () => {
    render(<Harness initial={emptyBiodata} />);
    await userEvent.click(screen.getByRole("button", { name: "Load sample" }));
    expect(screen.getByDisplayValue("Aarav Sharma")).toBeInTheDocument();
  });

  it("clears all data", async () => {
    render(<Harness initial={sampleBiodata} />);
    expect(screen.getByDisplayValue("Aarav Sharma")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Clear all" }));
    expect(screen.queryByDisplayValue("Aarav Sharma")).not.toBeInTheDocument();
  });

  it("rejects a non-image photo upload with an inline error", () => {
    const { container } = render(<Harness initial={emptyBiodata} />);
    const fileInput = container.querySelector('input[type="file"]') as HTMLInputElement;
    const notAnImage = new File(["x"], "resume.pdf", { type: "application/pdf" });
    fireEvent.change(fileInput, { target: { files: [notAnImage] } });
    expect(screen.getByText(/choose an image file/i)).toBeInTheDocument();
  });
});
