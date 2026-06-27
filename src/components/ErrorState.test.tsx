import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ErrorState from "./ErrorState";
import { SITE } from "@/config";

describe("ErrorState", () => {
  it("shows a reassuring default message and a contact email", () => {
    render(<ErrorState />);
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    const mail = screen.getByRole("link", { name: SITE.contactEmail });
    expect(mail).toHaveAttribute("href", expect.stringContaining(`mailto:${SITE.contactEmail}`));
  });

  it("fires the primary action", async () => {
    const onClick = vi.fn();
    render(<ErrorState action={{ label: "Try again", onClick }} />);
    await userEvent.click(screen.getByRole("button", { name: "Try again" }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("renders a secondary link", () => {
    render(<ErrorState secondary={{ label: "Go home", href: "/" }} />);
    expect(screen.getByRole("link", { name: "Go home" })).toHaveAttribute("href", "/");
  });
});
