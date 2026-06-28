import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost";

const VARIANTS: Record<Variant, string> = {
  primary:
    "maroon-gradient text-white shadow-lg shadow-maroon/25 ring-1 ring-inset ring-white/15 hover:-translate-y-0.5 hover:shadow-maroon/35",
  secondary:
    "border border-line bg-surface text-ink shadow-sm hover:border-gold hover:text-maroon hover:shadow-md",
  ghost: "text-ink hover:text-maroon",
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

/**
 * The one button in the app. Variants keep every call site visually consistent
 * (Open/Closed: add a variant here, not a new bespoke button elsewhere).
 */
export default function Button({ variant = "primary", className = "", ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 ${VARIANTS[variant]} ${className}`}
    />
  );
}
