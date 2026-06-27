import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PublicBiodata from "@/components/PublicBiodata";
import { getRecord } from "@/lib/store";
import { displayName } from "@/components/templates/shared";

// Always read fresh from the store (published biodatas can appear any time).
export const dynamic = "force-dynamic";

type Params = { slug: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const record = await getRecord(slug);
  if (!record) return { title: "Biodata not found" };
  const name = displayName(record.data);
  return {
    title: `${name} — Marriage Biodata`,
    description: `Marriage biodata of ${name}.`,
    robots: { index: false, follow: false }, // personal data — keep out of search engines
  };
}

export default async function BiodataPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const record = await getRecord(slug);
  if (!record) notFound();
  return <PublicBiodata record={record} />;
}
