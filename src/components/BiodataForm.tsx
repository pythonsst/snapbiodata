"use client";

import { useState, type ChangeEvent, type ReactNode } from "react";
import {
  biodataSections,
  filledCount,
  headerPresets,
  emptyBiodata,
  sampleBiodata,
  type Biodata,
  type FieldDef,
} from "@/data/biodata";
import { ChevronDownIcon } from "@/components/ui/icons";

/** Copy a Biodata so component state never aliases the shared module singletons. */
const clone = (b: Biodata): Biodata => ({ ...b, values: { ...b.values } });

interface Props {
  data: Biodata;
  onChange: (next: Biodata) => void;
}

export default function BiodataForm({ data, onChange }: Props) {
  const [photoError, setPhotoError] = useState("");
  const [open, setOpen] = useState<Record<string, boolean>>({
    photo: true,
    personal: true,
    family: false,
    contact: false,
  });
  const toggle = (id: string) => setOpen((o) => ({ ...o, [id]: !o[id] }));

  const setValue = (key: string, value: string) =>
    onChange({ ...data, values: { ...data.values, [key]: value } });
  const setHeader = (header: string) => onChange({ ...data, header });

  const onPhoto = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoError("");
    if (!file.type.startsWith("image/")) {
      setPhotoError("Please choose an image file (JPG, PNG, etc.).");
      e.target.value = "";
      return;
    }
    if (file.size > 12 * 1024 * 1024) {
      setPhotoError("That image is too large — please use one under 12 MB.");
      e.target.value = "";
      return;
    }
    const reader = new FileReader();
    reader.onerror = () => setPhotoError("Sorry, that image couldn't be loaded. Please try another.");
    reader.onload = () => onChange({ ...data, photo: String(reader.result) });
    reader.readAsDataURL(file);
    // Reset the input so re-selecting the same file (e.g. after Remove) still fires.
    e.target.value = "";
  };

  return (
    <div className="space-y-3">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs text-muted">Live preview updates as you type.</p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onChange(clone(sampleBiodata))}
            className="rounded-md border border-line px-2.5 py-1 text-xs font-medium text-ink hover:border-maroon hover:text-maroon"
          >
            Load sample
          </button>
          <button
            type="button"
            onClick={() => {
              setPhotoError("");
              onChange(clone(emptyBiodata));
            }}
            className="rounded-md border border-line px-2.5 py-1 text-xs font-medium text-ink hover:border-maroon hover:text-maroon"
          >
            Clear all
          </button>
        </div>
      </div>

      {/* Photo & Heading */}
      <Accordion
        id="photo"
        title="Photo & Heading"
        badge={`${(data.photo ? 1 : 0) + (data.header.trim() ? 1 : 0)}/2`}
        open={!!open.photo}
        onToggle={toggle}
      >
        <div className="flex items-center gap-4">
          <div className="h-20 w-16 shrink-0 overflow-hidden rounded-md border border-line bg-canvas">
            {data.photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={data.photo} alt="Profile" className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-[10px] text-muted">No photo</div>
            )}
          </div>
          <div className="space-y-2">
            <label className="inline-block cursor-pointer rounded-lg bg-maroon px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-maroon-dark">
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
            {photoError && <p className="text-xs font-medium text-red-600">{photoError}</p>}
          </div>
        </div>

        <div className="mt-4">
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
      </Accordion>

      {biodataSections.map((section) => (
        <Accordion
          key={section.id}
          id={section.id}
          title={section.title}
          badge={`${filledCount(section, data.values)}/${section.fields.length}`}
          open={!!open[section.id]}
          onToggle={toggle}
        >
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
        </Accordion>
      ))}
    </div>
  );
}

function Accordion({
  id,
  title,
  badge,
  open,
  onToggle,
  children,
}: {
  id: string;
  title: string;
  badge: string;
  open: boolean;
  onToggle: (id: string) => void;
  children: ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-xl border border-line bg-surface">
      <button
        type="button"
        onClick={() => onToggle(id)}
        aria-expanded={open}
        className="flex w-full items-center justify-between px-4 py-3 text-left"
      >
        <span className="text-sm font-semibold uppercase tracking-wider text-maroon">{title}</span>
        <span className="flex items-center gap-2.5">
          <span className="rounded-full bg-canvas px-2 py-0.5 text-[11px] font-medium text-muted">{badge}</span>
          <ChevronDownIcon className={`h-4 w-4 text-muted transition-transform ${open ? "rotate-180" : ""}`} />
        </span>
      </button>
      {open && <div className="border-t border-line p-4">{children}</div>}
    </section>
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
      ) : field.type === "combo" ? (
        <>
          {/* Type-or-select: free text with suggestions from a datalist. */}
          <input
            type="text"
            list={`${field.key}-options`}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={field.placeholder}
            className={base}
            autoComplete="off"
          />
          <datalist id={`${field.key}-options`}>
            {field.options?.map((opt) => (
              <option key={opt} value={opt} />
            ))}
          </datalist>
        </>
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
