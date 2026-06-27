"use client";

import { useEffect, useState } from "react";
import BiodataForm from "@/components/BiodataForm";
import BiodataPreview from "@/components/BiodataPreview";
import SupportDialog from "@/components/SupportDialog";
import { templates, defaultTemplateId, getTemplate } from "@/components/templates";
import { sampleBiodata, type Biodata } from "@/data/biodata";

export default function Home() {
  const [data, setData] = useState<Biodata>(sampleBiodata);
  const [templateId, setTemplateId] = useState<string>(defaultTemplateId);
  const [showPublish, setShowPublish] = useState(false);

  // Allow ?t=<templateId> to preselect a template (shareable links).
  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get("t");
    if (t && getTemplate(t).id === t) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTemplateId(t);
    }
  }, []);

  const handleDownload = () => window.print();

  return (
    <div className="flex min-h-full flex-col">
      {/* Top bar */}
      <header className="no-print sticky top-0 z-30 border-b border-line bg-surface/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-maroon text-base font-bold text-white">
              ❤
            </span>
            <div className="leading-tight">
              <h1 className="text-base font-bold text-ink">SnapBiodata</h1>
              <p className="text-xs text-muted">Free · private · no sign-up</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-2 rounded-lg border border-line px-4 py-2 text-sm font-semibold text-ink transition-colors hover:border-maroon hover:text-maroon"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
              </svg>
              <span className="hidden sm:inline">Download PDF</span>
              <span className="sm:hidden">PDF</span>
            </button>
            <button
              onClick={() => setShowPublish(true)}
              className="inline-flex items-center gap-2 rounded-lg bg-maroon px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-maroon-dark"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              Publish &amp; share
            </button>
          </div>
        </div>
      </header>

      {showPublish && (
        <SupportDialog onClose={() => setShowPublish(false)} />
      )}

      {/* Body: form (left) + preview (right) */}
      <main className="mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[minmax(0,420px)_1fr]">
        {/* Form panel */}
        <div className="no-print">
          {/* Template picker */}
          <div className="mb-5">
            <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-maroon">Template</h2>
            <div className="flex flex-wrap gap-2">
              {templates.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTemplateId(t.id)}
                  className={`rounded-lg border px-3 py-2 text-left text-sm transition-colors ${
                    templateId === t.id
                      ? "border-maroon bg-maroon/5 text-maroon"
                      : "border-line bg-surface text-ink hover:border-maroon/40"
                  }`}
                >
                  <span className="block font-medium">{t.name}</span>
                  <span className="block text-xs text-muted">{t.description}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="max-h-[calc(100vh-180px)] overflow-y-auto rounded-xl border border-line bg-surface p-5 scroll-slim lg:sticky lg:top-20">
            <BiodataForm data={data} onChange={setData} />
          </div>
        </div>

        {/* Preview */}
        <div className="lg:sticky lg:top-20 lg:h-[calc(100vh-110px)] lg:overflow-y-auto">
          <div className="rounded-xl bg-canvas p-2 sm:p-4">
            <BiodataPreview data={data} templateId={templateId} />
          </div>
        </div>
      </main>
    </div>
  );
}
