import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/config";
import { getAllPosts, blogListJsonLd, readingMinutes } from "@/lib/blog";
import { HeartIcon } from "@/components/ui/icons";
import { Flourish } from "@/components/ui/decor";

export const metadata: Metadata = {
  title: "Marriage Biodata Blog — Guides, Formats & Tips",
  description:
    "Guides and tips on creating a marriage biodata: formats, samples, photo advice, family details and more — from the team behind SnapBiodata.",
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    url: "/blog",
    title: "Marriage Biodata Blog — SnapBiodata",
    description:
      "Guides and tips on creating a marriage biodata: formats, samples, photos, family details and more.",
  },
};

function formatDate(iso: string): string {
  return new Date(iso + "T00:00:00Z").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default function BlogIndex() {
  const posts = getAllPosts();
  return (
    <div className="paper-bg min-h-screen overflow-x-clip text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListJsonLd(SITE)) }}
      />

      {/* Nav */}
      <header className="sticky top-0 z-30 border-b border-line bg-canvas/80 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3 sm:px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl maroon-gradient text-white ring-1 ring-gold/40 shadow-sm">
              <HeartIcon className="h-4 w-4" />
            </span>
            <span className="font-display text-lg font-bold tracking-tight">SnapBiodata</span>
          </Link>
          <Link href="/create" className="rounded-lg maroon-gradient px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-maroon/25 ring-1 ring-inset ring-white/15 transition-transform hover:-translate-y-0.5">
            Create free
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 md:py-16">
        <div className="text-center">
          <Flourish className="mb-6" />
          <h1 className="font-display text-4xl font-bold sm:text-5xl">Marriage Biodata Blog</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
            Guides, formats and tips to help you create a marriage biodata that makes a great
            first impression.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {posts.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="group flex flex-col rounded-2xl border border-line bg-surface p-6 shadow-sm transition-all hover:-translate-y-1.5 hover:border-gold/60 hover:shadow-xl"
            >
              <h2 className="font-display text-xl font-bold leading-snug group-hover:text-maroon">
                {p.title}
              </h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{p.description}</p>
              <p className="mt-4 flex items-center gap-2 text-xs text-muted">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold" />
                {formatDate(p.date)} · {readingMinutes(p.body)} min read
              </p>
            </Link>
          ))}
        </div>
      </main>

      <footer className="border-t border-line bg-canvas">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted sm:flex-row sm:px-6">
          <p>© 2026 SnapBiodata · Free &amp; open source (MIT)</p>
          <div className="flex gap-5">
            <Link href="/" className="hover:text-maroon">Home</Link>
            <Link href="/create" className="hover:text-maroon">Create</Link>
            <a href={SITE.github} target="_blank" rel="noopener noreferrer" className="hover:text-maroon">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
