import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-maroon text-white hover:bg-maroon-dark",
  secondary: "border border-line bg-surface text-ink hover:border-maroon hover:text-maroon",
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
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${VARIANTS[variant]} ${className}`}
    />
  );
}
