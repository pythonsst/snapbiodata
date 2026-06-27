"use client";

import Link from "next/link";
import BiodataPreview from "@/components/BiodataPreview";
import type { BiodataRecord } from "@/data/biodata";

export default function PublicBiodata({ record }: { record: BiodataRecord }) {
  const handleDownload = () => window.print();

  return (
    <div className="flex min-h-full flex-col">
      {/* Top bar */}
      <header className="no-print sticky top-0 z-30 border-b border-line bg-surface/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-maroon text-base font-bold text-white">
              ❤
            </span>
            <div className="leading-tight">
              <h1 className="text-base font-bold text-ink">SnapBiodata</h1>
              <p className="text-xs text-muted">Free · private · no sign-up</p>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <Link
              href="/create"
              className="hidden rounded-lg border border-line px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-maroon hover:text-maroon sm:inline-block"
            >
              Create your own
            </Link>
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-2 rounded-lg bg-maroon px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-maroon-dark"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
              </svg>
              Download PDF
            </button>
          </div>
        </div>
      </header>

      {/* Biodata */}
      <main className="mx-auto w-full max-w-4xl flex-1 px-3 py-6 sm:px-6">
        <BiodataPreview data={record.data} templateId={record.templateId} />
      </main>

      {/* Footer CTA */}
      <footer className="no-print border-t border-line bg-surface">
        <div className="mx-auto max-w-4xl px-4 py-6 text-center sm:px-6">
          <p className="text-sm text-muted">
            Made with{" "}
            <Link href="/create" className="font-semibold text-maroon hover:underline">
              SnapBiodata
            </Link>{" "}
            — create your own free marriage biodata in minutes.
          </p>
        </div>
      </footer>
    </div>
  );
}
