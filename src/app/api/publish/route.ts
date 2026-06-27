import { NextResponse } from "next/server";
import { getTemplate } from "@/components/templates";
import { putRecord, slugExists } from "@/lib/store";
import { reservedSlugs, slugify } from "@/lib/slug";
import type { Biodata, BiodataRecord } from "@/data/biodata";

export const runtime = "nodejs";

// Guard rails on payload size (a shrunk photo should be well under this).
const MAX_PHOTO_CHARS = 400_000; // ~300 KB data URL
const MAX_BODY_CHARS = 600_000;

interface PublishBody {
  slug?: string;
  templateId?: string;
  data?: Biodata;
}

/** Find a free slug, appending -2, -3, … on collision. */
async function uniqueSlug(desired: string): Promise<string> {
  let base = slugify(desired);
  if (!base || reservedSlugs.has(base)) base = base ? `${base}-1` : "biodata";
  if (!(await slugExists(base))) return base;
  for (let i = 2; i < 1000; i++) {
    const candidate = `${base}-${i}`;
    if (!(await slugExists(candidate))) return candidate;
  }
  // Extremely unlikely; fall back to a timestamped slug.
  return `${base}-${Date.now().toString(36)}`;
}

export async function POST(req: Request) {
  let body: PublishBody;
  try {
    const text = await req.text();
    if (text.length > MAX_BODY_CHARS) {
      return NextResponse.json({ error: "Biodata is too large. Try a smaller photo." }, { status: 413 });
    }
    body = JSON.parse(text) as PublishBody;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const data = body.data;
  if (!data || typeof data !== "object" || !data.values) {
    return NextResponse.json({ error: "Missing biodata." }, { status: 400 });
  }
  if (!data.values.fullName?.trim()) {
    return NextResponse.json({ error: "Please enter the Full Name before publishing." }, { status: 400 });
  }
  if (data.photo && data.photo.length > MAX_PHOTO_CHARS) {
    return NextResponse.json({ error: "Photo is too large. Please re-upload a smaller image." }, { status: 413 });
  }

  const templateId = getTemplate(body.templateId ?? "").id;
  const slug = await uniqueSlug(body.slug || data.values.fullName);

  const record: BiodataRecord = {
    slug,
    templateId,
    data: { header: data.header ?? "", values: data.values, photo: data.photo },
    createdAt: Date.now(),
  };

  try {
    await putRecord(record);
  } catch (err) {
    console.error("publish failed", err);
    return NextResponse.json({ error: "Could not publish. Please try again." }, { status: 500 });
  }

  return NextResponse.json({ slug });
}
