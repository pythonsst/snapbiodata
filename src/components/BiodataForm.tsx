"use client";

import { type ChangeEvent } from "react";
import { biodataSections, headerPresets, type Biodata, type FieldDef } from "@/data/biodata";

interface Props {
  data: Biodata;
  onChange: (next: Biodata) => void;
}

export default function BiodataForm({ data, onChange }: Props) {
  const setValue = (key: string, value: string) =>
    onChange({ ...data, values: { ...data.values, [key]: value } });

  const setHeader = (header: string) => onChange({ ...data, header });

  const onPhoto = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please choose an image file (JPG, PNG, etc.).");
      e.target.value = "";
      return;
    }
    if (file.size > 12 * 1024 * 1024) {
      alert("That image is too large — please use one under 12 MB.");
      e.target.value = "";
      return;
    }
    const reader = new FileReader();
    reader.onerror = () => alert("Sorry, that image couldn't be loaded. Please try another.");
    reader.onload = () => onChange({ ...data, photo: String(reader.result) });
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-8">
      {/* Photo + header */}
      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-maroon">Photo & Heading</h2>

        <div className="flex items-center gap-4">
          <div className="h-20 w-16 overflow-hidden rounded-md border border-line bg-canvas">
            {data.photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={data.photo} alt="Profile" className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-[10px] text-muted">
                No photo
              </div>
            )}
          </div>
          <div className="space-y-2">
            <label className="inline-block cursor-pointer rounded-lg bg-maroon px-4 py-2 text-sm font-medium text-white hover:bg-maroon-dark transition-colors">
              {data.photo ? "Change photo" : "Upload photo"}
              <input type="file" accept="image/*" className="hidden" onChange={onPhoto} />
            </label>
            {data.photo && (
              <button
                type="button"
                onClick={() => onChange({ ...data, photo: undefined })}
                className="ml-2 text-sm text-muted hover:text-maroon"
              >
                Remove
              </button>
            )}
            <p className="text-xs text-muted">Kept on your device — only uploaded if you publish a link.</p>
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink">Heading</label>
          <select
            value={headerPresets.includes(data.header) ? data.header : "__custom"}
            onChange={(e) => setHeader(e.target.value === "__custom" ? data.header : e.target.value)}
            className="w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm focus:border-maroon focus:outline-none"
          >
            {headerPresets.map((h) => (
              <option key={h || "none"} value={h}>
                {h || "— None —"}
              </option>
            ))}
            <option value="__custom">Custom…</option>
          </select>
          <input
            type="text"
            value={data.header}
            onChange={(e) => setHeader(e.target.value)}
            placeholder="Type a custom heading"
            className="mt-2 w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm focus:border-maroon focus:outline-none"
          />
        </div>
      </section>

      {biodataSections.map((section) => (
        <section key={section.id} className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-maroon">{section.title}</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {section.fields.map((field) => (
              <Field
                key={field.key}
                field={field}
                value={data.values[field.key] ?? ""}
                onChange={(v) => setValue(field.key, v)}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function Field({
  field,
  value,
  onChange,
}: {
  field: FieldDef;
  value: string;
  onChange: (v: string) => void;
}) {
  const base =
    "w-full rounded-lg border border-line bg-surface px-3 py-2 text-sm text-ink focus:border-maroon focus:outline-none focus:ring-2 focus:ring-maroon/10";
  const wide = field.type === "textarea";

  return (
    <div className={wide ? "sm:col-span-2" : ""}>
      <label className="mb-1.5 block text-sm font-medium text-ink">{field.label}</label>
      {field.type === "select" ? (
        <select value={value} onChange={(e) => onChange(e.target.value)} className={base}>
          <option value="">— Select —</option>
          {field.options?.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : field.type === "textarea" ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          rows={2}
          className={base}
        />
      ) : (
        <input
          type={field.type ?? "text"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          className={base}
        />
      )}
    </div>
  );
}
