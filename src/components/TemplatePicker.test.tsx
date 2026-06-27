import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TemplatePicker from "./TemplatePicker";
import { templates, defaultTemplateId } from "@/components/templates";

describe("TemplatePicker", () => {
  it("renders every template as an option", () => {
    render(<TemplatePicker templateId={defaultTemplateId} onSelect={() => {}} />);
    for (const t of templates) {
      expect(screen.getByText(t.name)).toBeInTheDocument();
    }
  });

  it("marks the selected template with aria-pressed", () => {
    render(<TemplatePicker templateId="royal" onSelect={() => {}} />);
    const royal = screen.getByRole("button", { pressed: true });
    expect(royal).toHaveAttribute("title", expect.stringContaining("Navy"));
  });

  it("calls onSelect with the clicked template id", async () => {
    const onSelect = vi.fn();
    render(<TemplatePicker templateId={defaultTemplateId} onSelect={onSelect} />);
    await userEvent.click(screen.getByText("Elegant"));
    expect(onSelect).toHaveBeenCalledWith("elegant");
  });
});
