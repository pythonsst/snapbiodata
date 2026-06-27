"use client";

import { templates } from "@/components/templates";
import { sampleBiodata } from "@/data/biodata";

const A4_W = 793.7;
const THUMB_W = 116; // px
const SCALE = THUMB_W / A4_W;
const THUMB_H = THUMB_W * 1.414; // A4 ratio

/**
 * Visual template picker — each option is a real, scaled-down render of the
 * template (with sample data) so people choose by look, like Canva.
 */
export default function TemplatePicker({
  templateId,
  onSelect,
}: {
  templateId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {templates.map((t) => {
        const selected = t.id === templateId;
        return (
          <button
            key={t.id}
            type="button"
            onClick={() => onSelect(t.id)}
            aria-pressed={selected}
            title={t.description}
            className="group text-left"
          >
            <div
              className={`relative overflow-hidden rounded-lg border-2 bg-white transition-all ${
                selected
                  ? "border-maroon ring-2 ring-maroon/25"
                  : "border-line group-hover:border-maroon/40"
              }`}
              style={{ width: "100%", aspectRatio: "1 / 1.414" }}
            >
              <div
                aria-hidden
                style={{
                  width: A4_W,
                  transform: `scale(${SCALE})`,
                  transformOrigin: "top left",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  pointerEvents: "none",
                }}
              >
                <t.Component data={sampleBiodata} />
              </div>
            </div>
            <span
              className={`mt-1.5 block text-center text-xs font-medium ${
                selected ? "text-maroon" : "text-ink"
              }`}
            >
              {t.name}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// Keep the thumbnail height constant available if needed by callers.
export const TEMPLATE_THUMB_HEIGHT = THUMB_H;
