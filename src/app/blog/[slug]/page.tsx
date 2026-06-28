import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE } from "@/config";
import { getAllPosts, getPost, articleJsonLd, readingMinutes } from "@/lib/blog";
import Markdown from "@/components/Markdown";

type Params = { slug: string };

// Pre-render every post at build time (fully static, great for SEO + speed).
export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Post not found" };
  const url = `/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
    },
  };
}

function formatDate(iso: string): string {
  return new Date(iso + "T00:00:00Z").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default async function BlogPost({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(SITE, post)) }}
      />

      {/* Nav */}
      <header className="sticky top-0 z-30 border-b border-line bg-canvas/85 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3 sm:px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-maroon text-base font-bold text-white">❤</span>
            <span className="text-lg font-bold">SnapBiodata</span>
          </Link>
          <Link href="/create" className="rounded-lg bg-maroon px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-maroon-dark">
            Create free
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-16">
        <nav className="mb-8 text-sm text-muted">
          <Link href="/blog" className="hover:text-maroon">← All articles</Link>
        </nav>

        <article>
          <header>
            <h1 className="font-display text-3xl font-bold leading-tight sm:text-4xl">{post.title}</h1>
            <p className="mt-3 text-sm text-muted">
              {formatDate(post.date)} · {readingMinutes(post.body)} min read
            </p>
          </header>

          <div className="mt-8">
            <Markdown>{post.body}</Markdown>
          </div>
        </article>

        {/* CTA */}
        <aside className="mt-12 rounded-2xl border border-line bg-surface p-6 text-center">
          <h2 className="font-display text-xl font-bold">Ready to make your biodata?</h2>
          <p className="mt-2 text-sm text-muted">
            Pick a template, fill in your details, and download a print-ready PDF — free.
          </p>
          <Link
            href="/create"
            className="mt-5 inline-block rounded-xl bg-maroon px-7 py-3 font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            Create your biodata →
          </Link>
        </aside>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-3xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted sm:flex-row sm:px-6">
          <p>© 2026 SnapBiodata · Free &amp; open source (MIT)</p>
          <div className="flex gap-5">
            <Link href="/blog" className="hover:text-maroon">Blog</Link>
            <Link href="/create" className="hover:text-maroon">Create</Link>
            <a href={SITE.github} target="_blank" rel="noopener noreferrer" className="hover:text-maroon">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
