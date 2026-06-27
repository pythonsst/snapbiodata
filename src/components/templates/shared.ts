import { biodataSections, formatValue, type Biodata } from "@/data/biodata";

export interface TemplateProps {
  data: Biodata;
}

export interface RenderedRow {
  label: string;
  value: string;
}

export interface RenderedSection {
  id: string;
  title: string;
  rows: RenderedRow[];
}

/** Build the list of non-empty rows per section, ready for templates to render. */
export function renderedSections(data: Biodata): RenderedSection[] {
  return biodataSections
    .map((section) => ({
      id: section.id,
      title: section.title,
      rows: section.fields
        .map((field) => ({ label: field.label, value: formatValue(field, data.values[field.key]) }))
        .filter((row) => row.value.trim().length > 0),
    }))
    .filter((section) => section.rows.length > 0);
}

/** The full name, with a sensible fallback for the preview. */
export function displayName(data: Biodata): string {
  return data.values.fullName?.trim() || "Your Name";
}
