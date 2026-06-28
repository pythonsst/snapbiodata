/**
 * Decorative, content-free SVG ornaments for the premium "wedding luxury" look.
 * All inherit currentColor where possible so they can be tinted with text-*.
 * Purely presentational — marked aria-hidden.
 */
import type { SVGProps } from "react";

/**
 * A wax-seal / stamp medallion. Circular text rotates very slowly (disabled for
 * reduced-motion) with a static heart at the centre. Sized via className.
 */
export function Seal({ className = "h-24 w-24", label = "· SNAPBIODATA · MARRIAGE BIODATA " }: { className?: string; label?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <defs>
        <path id="seal-text-curve" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
      </defs>
      {/* rings */}
      <circle cx="50" cy="50" r="47" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
      <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="50" cy="50" r="28" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
      {/* slow-rotating engraved text */}
      <g className="seal-rotate">
        <text fontSize="7.2" letterSpacing="1.1" fill="currentColor" fontFamily="var(--font-display), Georgia, serif">
          <textPath href="#seal-text-curve" startOffset="0">{label}</textPath>
        </text>
      </g>
      {/* centre motif */}
      <path
        d="M50 58c-6-4.2-11-7.8-11-13.2 0-3 2.4-5 5.2-5 1.9 0 3.7 1 4.8 2.6 1.1-1.6 2.9-2.6 4.8-2.6 2.8 0 5.2 2 5.2 5 0 5.4-5 9-11 13.2z"
        fill="currentColor"
      />
      <text x="50" y="70" textAnchor="middle" fontSize="6" letterSpacing="2" fill="currentColor" fontFamily="var(--font-display), Georgia, serif">EST 2026</text>
    </svg>
  );
}

/** A small four-point gold star used as a flourish mark. */
export function StarMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 0c.6 6.2 5.8 11.4 12 12-6.2.6-11.4 5.8-12 12-.6-6.2-5.8-11.4-12-12C6.2 11.4 11.4 6.2 12 0z" />
    </svg>
  );
}

/** Centered divider: two fading gold rules around a star mark. */
export function Flourish({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden="true">
      <span className="gold-rule h-px w-14 sm:w-24" />
      <StarMark className="h-3.5 w-3.5 text-gold" />
      <span className="gold-rule h-px w-14 sm:w-24" />
    </div>
  );
}

/** Gold filigree corner; mirror with CSS transforms to frame a card. */
export function CornerFlourish({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" aria-hidden="true">
      <path d="M4 4h14M4 4v14" />
      <path d="M4 4c10 0 18 8 18 18" opacity="0.7" />
      <circle cx="9" cy="9" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  );
}
