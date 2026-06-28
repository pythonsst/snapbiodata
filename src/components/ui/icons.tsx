/** Small inline icon set (no runtime dependency). All inherit `currentColor`. */
import type { SVGProps } from "react";

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

export function DownloadIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} className="h-4 w-4" {...props}>
      <path d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
    </svg>
  );
}

export function ArrowRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} className="h-4 w-4" {...props}>
      <path d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
  );
}

export function ChevronDownIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} className="h-4 w-4" {...props}>
      <path d="M19 9l-7 7-7-7" />
    </svg>
  );
}

export function AlertIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} className="h-6 w-6" {...props}>
      <path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
    </svg>
  );
}

/* ---- Feature / marketing icons (line style, inherit currentColor) ---- */

export function TemplateIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} className="h-6 w-6" {...props}>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M9 3v18M9 8h11M9 13h11" />
    </svg>
  );
}

export function PhotoIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} className="h-6 w-6" {...props}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="8.5" cy="9.5" r="1.5" />
      <path d="M21 16l-4.5-4.5L7 21" />
    </svg>
  );
}

export function PdfIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} className="h-6 w-6" {...props}>
      <path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8z" />
      <path d="M14 3v5h5M9 13l3 3 3-3M12 16v-5" />
    </svg>
  );
}

export function LinkIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} className="h-6 w-6" {...props}>
      <path d="M10 13a5 5 0 007.5.5l3-3a5 5 0 00-7-7l-1.5 1.5" />
      <path d="M14 11a5 5 0 00-7.5-.5l-3 3a5 5 0 007 7l1.5-1.5" />
    </svg>
  );
}

export function ShieldIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} className="h-6 w-6" {...props}>
      <path d="M12 3l8 3v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

export function HeartIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} className="h-6 w-6" {...props}>
      <path d="M12 20s-7-4.3-9.5-9C1 8 2.5 4.5 6 4.5c2 0 3.3 1.2 4 2.5.7-1.3 2-2.5 4-2.5 3.5 0 5 3.5 3.5 6.5C19 15.7 12 20 12 20z" />
    </svg>
  );
}
