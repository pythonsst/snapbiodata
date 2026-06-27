/**
 * Inline SVG ornaments used by the decorative templates. Pure vector so they
 * scale and print crisply, and need no external assets.
 * Each uses `currentColor`, so colour them with a Tailwind text-* class.
 */

/** A filigree corner flourish. Place one in each corner (rotate via className). */
export function CornerFloral({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" aria-hidden>
      <g stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
        <path d="M8 64 C 8 32 32 8 64 8" />
        <path d="M8 46 C 8 24 24 8 46 8" opacity="0.75" />
        <path d="M22 64 C 22 40 40 22 64 22" opacity="0.5" />
        {/* scroll curl near the elbow */}
        <path d="M16 84 c 12 3 19 -5 16 -16 c -2 -8 -12 -10 -15 -3 c -2 5 2 10 7 9" />
      </g>
      {/* leaves along the arcs */}
      <g fill="currentColor">
        <path d="M64 8 c 7 -4 16 -2 21 4 c -7 4 -16 2 -21 -4 z" />
        <path d="M8 64 c -4 7 -2 16 4 21 c 4 -7 2 -16 -4 -21 z" />
        <circle cx="64" cy="8" r="2.2" />
        <circle cx="8" cy="64" r="2.2" />
        {/* small flower at the elbow */}
        <g transform="translate(30 30)">
          <circle r="2.4" />
          <ellipse cx="0" cy="-7" rx="2.1" ry="4" />
          <ellipse cx="0" cy="7" rx="2.1" ry="4" />
          <ellipse cx="-7" cy="0" rx="4" ry="2.1" />
          <ellipse cx="7" cy="0" rx="4" ry="2.1" />
        </g>
      </g>
    </svg>
  );
}

/** A small sprig used to flank a heading. */
export function Sprig({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 60 24"
      className={className}
      fill="none"
      aria-hidden
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      <g stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
        <path d="M2 12 H 44" />
        <path d="M44 12 c 6 -6 12 -6 14 -10" />
        <path d="M44 12 c 6 6 12 6 14 10" />
      </g>
      <g fill="currentColor">
        <circle cx="14" cy="12" r="1.6" />
        <circle cx="24" cy="12" r="1.6" />
        <circle cx="34" cy="12" r="1.6" />
      </g>
    </svg>
  );
}

/** The sacred "Om" symbol, set in a serif glyph for clean rendering. */
export function OmMark({ className = "" }: { className?: string }) {
  return <span className={`doc-display leading-none ${className}`}>ॐ</span>;
}

/** A simple radial mandala used as a background accent. */
export function Mandala({ className = "" }: { className?: string }) {
  const petals = Array.from({ length: 12 });
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" aria-hidden>
      <g stroke="currentColor" strokeWidth="1">
        <circle cx="50" cy="50" r="46" />
        <circle cx="50" cy="50" r="34" />
        <circle cx="50" cy="50" r="14" />
        {petals.map((_, i) => (
          <ellipse
            key={i}
            cx="50"
            cy="22"
            rx="4.5"
            ry="11"
            transform={`rotate(${i * 30} 50 50)`}
          />
        ))}
      </g>
    </svg>
  );
}
