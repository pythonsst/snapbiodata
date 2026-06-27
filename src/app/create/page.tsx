"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import BiodataForm from "@/components/BiodataForm";
import BiodataPreview from "@/components/BiodataPreview";
import TemplatePicker from "@/components/TemplatePicker";
import SupportDialog from "@/components/SupportDialog";
import { defaultTemplateId, getTemplate } from "@/components/templates";
import { sampleBiodata, type Biodata } from "@/data/biodata";

export default function CreatePage() {
  const [data, setData] = useState<Biodata>(sampleBiodata);
  const [templateId, setTemplateId] = useState<string>(defaultTemplateId);
  const [showPublish, setShowPublish] = useState(false);
  const [mobileTab, setMobileTab] = useState<"edit" | "preview">("edit");

  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get("t");
    if (t && getTemplate(t).id === t) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTemplateId(t);
    }
  }, []);

  const handleDownload = () => window.print();

  const downloadBtn = (cls = "") => (
    <button
      onClick={handleDownload}
      className={`inline-flex items-center justify-center gap-2 rounded-lg border border-line bg-surface px-4 py-2 text-sm font-semibold text-ink transition-colors hover:border-maroon hover:text-maroon ${cls}`}
    >
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
      </svg>
      Download PDF
    </button>
  );

  const publishBtn = (cls = "") => (
    <button
      onClick={() => setShowPublish(true)}
      className={`inline-flex items-center justify-center gap-2 rounded-lg bg-maroon px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-maroon-dark ${cls}`}
    >
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
      </svg>
      Share
    </button>
  );

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-canvas">
      {/* Header */}
      <header className="no-print sticky top-0 z-30 border-b border-line bg-surface/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-3 py-2.5 sm:px-6 sm:py-3">
          <Link href="/" className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-maroon text-sm font-bold text-white sm:h-9 sm:w-9">
              ❤
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-bold text-ink sm:text-base">SnapBiodata</span>
              <span className="hidden text-xs text-muted sm:block">Free · private · no sign-up</span>
            </span>
          </Link>
          <div className="hidden items-center gap-2 sm:flex">
            {downloadBtn()}
            {publishBtn()}
          </div>
        </div>
        {/* Mobile Edit / Preview tabs */}
        <div className="flex border-t border-line sm:hidden">
          {(["edit", "preview"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setMobileTab(tab)}
              className={`flex-1 py-2.5 text-sm font-semibold capitalize transition-colors ${
                mobileTab === tab ? "border-b-2 border-maroon text-maroon" : "text-muted"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </header>

      {showPublish && <SupportDialog onClose={() => setShowPublish(false)} />}

      <main className="mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 gap-6 px-3 pb-24 pt-4 sm:px-6 sm:pb-8 lg:grid-cols-[380px_minmax(0,1fr)] print:!block print:!p-0">
        {/* Controls */}
        <div className={`no-print space-y-5 ${mobileTab === "edit" ? "block" : "hidden"} lg:block`}>
          <div>
            <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-maroon">Choose a template</h2>
            <TemplatePicker templateId={templateId} onSelect={setTemplateId} />
          </div>
          <BiodataForm data={data} onChange={setData} />
        </div>

        {/* Preview (always printable; visible per tab on mobile) */}
        <div
          className={`${mobileTab === "preview" ? "block" : "hidden"} lg:sticky lg:top-24 lg:block lg:h-[calc(100vh-120px)] lg:overflow-y-auto print:!block`}
        >
          <div className="rounded-xl bg-canvas p-1 sm:p-3 print:!p-0">
            <BiodataPreview data={data} templateId={templateId} />
          </div>
        </div>
      </main>

      {/* Mobile sticky action bar */}
      <div className="no-print fixed inset-x-0 bottom-0 z-30 flex gap-2 border-t border-line bg-surface/95 p-3 backdrop-blur sm:hidden">
        {downloadBtn("flex-1")}
        {publishBtn("flex-1")}
      </div>
    </div>
  );
}
