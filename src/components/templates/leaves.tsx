/**
 * Golden leafy corner garland, drawn as inline SVG (no external assets).
 * Leaves are placed along two vines that hug the corner edges, with a metallic
 * gold gradient. Pass a unique `id` per instance so gradients don't collide.
 */

const LEAF = "M0 0 C4 -4 4 -10 0 -14 C-4 -10 -4 -4 0 0 Z";

function vineLeaves(
  p0: [number, number],
  p1: [number, number],
  p2: [number, number],
  count: number,
  startSize: number,
  endSize: number,
) {
  const out = [];
  for (let i = 1; i <= count; i++) {
    const t = i / (count + 1);
    const mt = 1 - t;
    const x = mt * mt * p0[0] + 2 * mt * t * p1[0] + t * t * p2[0];
    const y = mt * mt * p0[1] + 2 * mt * t * p1[1] + t * t * p2[1];
    const dx = 2 * mt * (p1[0] - p0[0]) + 2 * t * (p2[0] - p1[0]);
    const dy = 2 * mt * (p1[1] - p0[1]) + 2 * t * (p2[1] - p1[1]);
    const ang = (Math.atan2(dy, dx) * 180) / Math.PI;
    const s = startSize + (endSize - startSize) * t;
    out.push(
      <path key={`${i}u`} d={LEAF} transform={`translate(${x} ${y}) rotate(${ang + 80}) scale(${s})`} />,
      <path key={`${i}d`} d={LEAF} transform={`translate(${x} ${y}) rotate(${ang - 80}) scale(${s})`} />,
    );
  }
  return out;
}

export function GoldLeafCorner({ id, className = "" }: { id: string; className?: string }) {
  const g = `url(#${id})`;
  return (
    <svg viewBox="0 0 150 150" className={className} aria-hidden xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f7dd92" />
          <stop offset="45%" stopColor="#dca93a" />
          <stop offset="100%" stopColor="#a9761a" />
        </linearGradient>
      </defs>
      {/* stems */}
      <g fill="none" stroke={g} strokeWidth="1.4" strokeLinecap="round">
        <path d="M12 12 Q 84 3 145 15" />
        <path d="M12 12 Q 3 84 15 145" />
      </g>
      {/* leaves */}
      <g fill={g} stroke="#946614" strokeWidth="0.25">
        {vineLeaves([12, 12], [84, 1], [145, 13], 8, 1.3, 0.65)}
        {vineLeaves([12, 12], [1, 84], [13, 145], 8, 1.3, 0.65)}
        {/* corner cluster */}
        <path d={LEAF} transform="translate(20 20) rotate(45) scale(1.5)" />
        <path d={LEAF} transform="translate(31 16) rotate(72) scale(1.1)" />
        <path d={LEAF} transform="translate(16 31) rotate(18) scale(1.1)" />
        <path d={LEAF} transform="translate(40 14) rotate(80) scale(0.85)" />
        <path d={LEAF} transform="translate(14 40) rotate(10) scale(0.85)" />
        <circle cx="22" cy="22" r="1.7" stroke="none" fill="#b8801c" />
      </g>
    </svg>
  );
}
