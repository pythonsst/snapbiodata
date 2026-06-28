import Link from "next/link";
import { templates } from "@/components/templates";
import { SITE } from "@/config";
import { faqs, homeJsonLd } from "@/lib/seo";

const GITHUB_URL = SITE.github;

const features = [
  { icon: "🎨", title: "Beautiful templates", body: "Traditional, elegant, modern, floral and royal designs — all print-ready." },
  { icon: "🖼️", title: "Add your photo", body: "Upload a photo that looks great on every template." },
  { icon: "📄", title: "Download as PDF", body: "Export a crisp, A4 print-ready PDF in one click." },
  { icon: "🔗", title: "Share a link", body: "Publish a clean link like snapbiodata.com/your-name to share on WhatsApp." },
  { icon: "🔒", title: "Private by design", body: "Your details stay in your browser until you choose to publish." },
  { icon: "💛", title: "Free & open source", body: "No sign-up, no paywall, no ads — and anyone can contribute." },
];

const steps = [
  { n: "1", title: "Fill your details", body: "Personal, family and contact details in a simple form." },
  { n: "2", title: "Pick a template", body: "Switch designs instantly with a live preview." },
  { n: "3", title: "Download or share", body: "Save a PDF or publish a shareable link." },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      {/* Structured data: helps Google show this as a free web app + FAQ rich results. */}
      <script
        type="application/ld+json"
        // The graph is built from trusted site constants — no user input.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd(SITE)) }}
      />

      {/* Nav */}
      <header className="sticky top-0 z-30 border-b border-line bg-canvas/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-maroon text-base font-bold text-white">❤</span>
            <span className="text-lg font-bold">SnapBiodata</span>
          </Link>
          <nav className="flex items-center gap-2 sm:gap-4">
            <a href="#templates" className="hidden px-3 py-2 text-sm font-medium text-muted hover:text-maroon sm:block">Templates</a>
            <a href="#faq" className="hidden px-3 py-2 text-sm font-medium text-muted hover:text-maroon sm:block">FAQ</a>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="hidden px-3 py-2 text-sm font-medium text-muted hover:text-maroon sm:block">GitHub</a>
            <Link href="/create" className="rounded-lg bg-maroon px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-maroon-dark">
              Create free
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs font-medium text-maroon">
              100% free · no sign-up · open source
            </span>
            <h1 className="font-display mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl">
              Create a stunning <span className="text-maroon">marriage biodata</span> in minutes
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
              Pick a template, fill in your details, add a photo, and download a print-ready PDF —
              or share a private link. Beautiful, fast, and free forever.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="/create" className="rounded-xl bg-maroon px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-maroon/20 transition-transform hover:-translate-y-0.5">
                Create your biodata →
              </Link>
              <a href="#templates" className="rounded-xl border border-line bg-surface px-7 py-3.5 text-base font-semibold text-ink transition-colors hover:border-maroon hover:text-maroon">
                View templates
              </a>
            </div>
            <p className="mt-4 text-sm text-muted">No account needed. Your data stays private.</p>
          </div>

          {/* Hero mock */}
          <div className="relative mx-auto w-full max-w-sm">
            <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-tr from-maroon/10 to-gold/20 blur-2xl" />
            <div className="doc relative rotate-2 rounded-xl border-2 border-maroon bg-white p-1 shadow-2xl transition-transform hover:rotate-0">
              <div className="rounded-lg border border-gold/70 p-6">
                <p className="doc-display text-center text-sm tracking-wide text-gold">❁ <span className="text-maroon">|| Shri Ganeshaya Namaha ||</span> ❁</p>
                <h3 className="doc-display mt-4 text-2xl font-bold text-maroon">Aarav Sharma</h3>
                <div className="mt-1 h-0.5 w-16 bg-gold" />
                <dl className="mt-5 space-y-2 text-[13px]">
                  {[["Date of Birth", "12 April 1996"], ["Height", "5'10\""], ["Education", "B.Tech, CSE"], ["Profession", "Software Engineer"], ["City", "Pune, Maharashtra"]].map(([k, v]) => (
                    <div key={k} className="flex gap-2">
                      <dt className="w-1/2 font-semibold text-ink/70">{k}</dt>
                      <dd className="flex-1 text-ink"><span className="mr-1 text-gold">:</span>{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-y border-line bg-surface/50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="rounded-2xl border border-line bg-surface p-6">
                <div className="text-2xl">{f.icon}</div>
                <h3 className="mt-3 text-lg font-semibold">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates */}
      <section id="templates" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Pick a template you love</h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted">Every template is print-ready and fully editable. Switch anytime — your details carry over.</p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {templates.map((t) => (
            <Link key={t.id} href={`/create?t=${t.id}`} className="group rounded-2xl border border-line bg-surface p-6 transition-all hover:-translate-y-1 hover:border-maroon hover:shadow-lg">
              <div className="flex h-28 items-center justify-center rounded-xl bg-gradient-to-br from-maroon/5 to-gold/10">
                <span className="doc-display text-2xl text-maroon">{t.name}</span>
              </div>
              <h3 className="mt-4 font-semibold">{t.name}</h3>
              <p className="mt-1 text-sm text-muted">{t.description}</p>
              <span className="mt-3 inline-block text-sm font-semibold text-maroon group-hover:underline">Use this template →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="border-y border-line bg-surface/50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="font-display text-center text-3xl font-bold sm:text-4xl">Ready in 3 steps</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {steps.map((s) => (
              <div key={s.n} className="text-center">
                <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-maroon text-lg font-bold text-white">{s.n}</div>
                <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
                <p className="mt-1.5 text-sm text-muted">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ — visible answers mirror the FAQPage JSON-LD above for rich results. */}
      <section id="faq" className="border-t border-line bg-surface/50">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-24">
          <h2 className="font-display text-center text-3xl font-bold sm:text-4xl">
            Frequently asked questions
          </h2>
          <dl className="mt-10 space-y-4">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-2xl border border-line bg-surface p-5 open:shadow-sm"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                  <dt>{f.q}</dt>
                  <span className="text-maroon transition-transform group-open:rotate-45">+</span>
                </summary>
                <dd className="mt-3 text-sm leading-relaxed text-muted">{f.a}</dd>
              </details>
            ))}
          </dl>
        </div>
      </section>

      {/* Open source */}
      <section className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 md:py-24">
        <h2 className="font-display text-3xl font-bold sm:text-4xl">Built in the open 💛</h2>
        <p className="mx-auto mt-3 max-w-2xl text-muted">
          SnapBiodata is free and open source under the MIT license. Found a bug, want a new template,
          or a new language? Contributions are welcome — let&apos;s make it great for the whole world.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-4">
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="rounded-xl bg-maroon px-7 py-3.5 font-semibold text-white transition-transform hover:-translate-y-0.5">
            ⭐ Star on GitHub
          </a>
          <a href={`${GITHUB_URL}/blob/main/CONTRIBUTING.md`} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-line bg-surface px-7 py-3.5 font-semibold text-ink transition-colors hover:border-maroon hover:text-maroon">
            How to contribute
          </a>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-maroon">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6">
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">Make your biodata now — it&apos;s free</h2>
          <Link href="/create" className="mt-7 inline-block rounded-xl bg-white px-8 py-3.5 font-semibold text-maroon transition-transform hover:-translate-y-0.5">
            Create your biodata →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted sm:flex-row sm:px-6">
          <p>© {2026} SnapBiodata · Free &amp; open source (MIT)</p>
          <div className="flex gap-5">
            <Link href="/create" className="hover:text-maroon">Create</Link>
            <a href="#templates" className="hover:text-maroon">Templates</a>
            <a href="#faq" className="hover:text-maroon">FAQ</a>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="hover:text-maroon">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
