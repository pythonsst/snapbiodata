import Link from "next/link";
import { templates } from "@/components/templates";
import { SITE } from "@/config";
import { faqs, homeJsonLd } from "@/lib/seo";
import {
  TemplateIcon,
  PhotoIcon,
  PdfIcon,
  LinkIcon,
  ShieldIcon,
  HeartIcon,
} from "@/components/ui/icons";
import { Seal, Flourish, StarMark, CornerFlourish } from "@/components/ui/decor";

const GITHUB_URL = SITE.github;

const features = [
  { Icon: TemplateIcon, title: "Beautiful templates", body: "Traditional, elegant, modern, floral and royal designs — all print-ready." },
  { Icon: PhotoIcon, title: "Add your photo", body: "Upload a photo that looks great on every template." },
  { Icon: PdfIcon, title: "Download as PDF", body: "Export a crisp, A4 print-ready PDF in one click." },
  { Icon: LinkIcon, title: "Share a link", body: "Publish a clean link like snapbiodata.com/your-name to share on WhatsApp." },
  { Icon: ShieldIcon, title: "Private by design", body: "Your details stay in your browser until you choose to publish." },
  { Icon: HeartIcon, title: "Free & open source", body: "No sign-up, no paywall, no ads — and anyone can contribute." },
];

const steps = [
  { n: "1", title: "Fill your details", body: "Personal, family and contact details in a simple form." },
  { n: "2", title: "Pick a template", body: "Switch designs instantly with a live preview." },
  { n: "3", title: "Download or share", body: "Save a PDF or publish a shareable link." },
];

/** Brand mark reused in the header. */
function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <span className="grid h-9 w-9 place-items-center rounded-xl maroon-gradient text-white ring-1 ring-gold/40 shadow-sm">
        <HeartIcon className="h-4 w-4" />
      </span>
      <span className="font-display text-lg font-bold tracking-tight">SnapBiodata</span>
    </Link>
  );
}

export default function LandingPage() {
  return (
    <div className="paper-bg min-h-screen overflow-x-clip text-ink">
      {/* Structured data: helps Google show this as a free web app + FAQ rich results. */}
      <script
        type="application/ld+json"
        // The graph is built from trusted site constants — no user input.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd(SITE)) }}
      />

      {/* Nav */}
      <header className="sticky top-0 z-30 border-b border-line bg-canvas/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <Logo />
          <nav className="flex items-center gap-2 sm:gap-4">
            <a href="#templates" className="hidden px-3 py-2 text-sm font-medium text-muted hover:text-maroon sm:block">Templates</a>
            <Link href="/blog" className="hidden px-3 py-2 text-sm font-medium text-muted hover:text-maroon sm:block">Blog</Link>
            <a href="#faq" className="hidden px-3 py-2 text-sm font-medium text-muted hover:text-maroon sm:block">FAQ</a>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="hidden px-3 py-2 text-sm font-medium text-muted hover:text-maroon sm:block">GitHub</a>
            <Link href="/create" className="rounded-lg maroon-gradient px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-maroon/25 ring-1 ring-inset ring-white/15 transition-transform hover:-translate-y-0.5">
              Create free
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* floating seal — desktop only */}
        <Seal className="pointer-events-none absolute right-6 top-10 hidden h-28 w-28 text-gold/70 lg:block xl:right-16" />
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold-soft/40 px-3 py-1 text-xs font-semibold tracking-wide text-maroon">
              <StarMark className="h-3 w-3 text-gold" />
              100% FREE · NO SIGN-UP · OPEN SOURCE
            </span>
            <h1 className="font-display mt-5 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl">
              Create a stunning{" "}
              <span className="gold-underline text-maroon">marriage biodata</span>{" "}
              in minutes
            </h1>
            <p className="mt-4 font-serif text-base font-semibold italic text-gold-foil">
              Your fast, easy and free biodata maker.
            </p>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
              Pick a template, fill in your details, add a photo, and download a print-ready PDF —
              or share a private link. Beautiful, fast, and free forever.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="/create" className="rounded-xl maroon-gradient px-7 py-3.5 text-base font-semibold text-white lux-shadow ring-1 ring-inset ring-white/15 transition-transform hover:-translate-y-0.5">
                Create your biodata →
              </Link>
              <a href="#templates" className="rounded-xl border border-line bg-surface px-7 py-3.5 text-base font-semibold text-ink shadow-sm transition-colors hover:border-gold hover:text-maroon">
                View templates
              </a>
            </div>
            <p className="mt-4 text-sm text-muted">No account needed. Your data stays private.</p>
          </div>

          {/* Hero mock — a framed sample biodata */}
          <div className="relative mx-auto w-full max-w-sm">
            <div className="absolute -inset-8 rounded-[2.5rem] bg-gradient-to-tr from-maroon/10 via-transparent to-gold/25 blur-3xl" />
            <div className="doc relative rotate-2 rounded-2xl border border-gold/50 bg-white p-1.5 lux-shadow transition-transform duration-500 hover:rotate-0">
              <div className="relative rounded-xl border border-gold/60 p-6">
                <CornerFlourish className="absolute left-1.5 top-1.5 h-7 w-7 text-gold/70" />
                <CornerFlourish className="absolute right-1.5 top-1.5 h-7 w-7 -scale-x-100 text-gold/70" />
                <CornerFlourish className="absolute bottom-1.5 left-1.5 h-7 w-7 -scale-y-100 text-gold/70" />
                <CornerFlourish className="absolute bottom-1.5 right-1.5 h-7 w-7 -scale-100 text-gold/70" />
                <p className="doc-display text-center text-sm tracking-wide text-gold">❁ <span className="text-maroon">|| Shri Ganeshaya Namaha ||</span> ❁</p>
                <h3 className="doc-display mt-4 text-center text-2xl font-bold text-maroon">Aarav Sharma</h3>
                <div className="mx-auto mt-1.5 flex items-center justify-center gap-2">
                  <span className="h-px w-8 bg-gold/60" />
                  <StarMark className="h-2.5 w-2.5 text-gold" />
                  <span className="h-px w-8 bg-gold/60" />
                </div>
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

      {/* About / SEO intro — keyword-rich but written for humans, not stuffed. */}
      <section className="mx-auto max-w-3xl px-4 pb-4 text-center sm:px-6">
        <Flourish className="mb-6" />
        <h2 className="font-display text-2xl font-bold sm:text-3xl">
          The free biodata maker built for marriage
        </h2>
        <p className="mx-auto mt-4 text-lg leading-relaxed text-muted">
          SnapBiodata is a fast, easy and completely free biodata maker. Create a stunning
          marriage profile in minutes — choose a beautiful, print-ready template, add your photo,
          and download your biodata instantly or share it as a private link. No sign-up, no
          watermark and no cost. Whether you&apos;re preparing a profile for yourself or a family
          member, SnapBiodata helps you make a great first impression with your perfect match.
        </p>
      </section>

      {/* Features */}
      <section className="mt-16 border-y border-line bg-surface/60">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ Icon, title, body }) => (
              <div key={title} className="group rounded-2xl border border-line bg-surface p-6 transition-all hover:-translate-y-1 hover:border-gold/50 hover:shadow-lg">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-gold-soft/50 text-maroon ring-1 ring-gold/30 transition-colors group-hover:bg-gold-soft">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="font-display mt-4 text-lg font-bold">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates */}
      <section id="templates" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-24">
        <div className="text-center">
          <Flourish className="mb-6" />
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Pick a template you love</h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted">Every template is print-ready and fully editable. Switch anytime — your details carry over.</p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {templates.map((t) => (
            <Link key={t.id} href={`/create?t=${t.id}`} className="group rounded-2xl border border-line bg-surface p-5 transition-all hover:-translate-y-1.5 hover:border-gold/60 hover:shadow-xl">
              {/* miniature framed preview */}
              <div className="relative flex h-44 flex-col items-center justify-center rounded-xl border border-gold/30 bg-gradient-to-br from-gold-soft/40 to-surface p-5">
                <CornerFlourish className="absolute left-2 top-2 h-6 w-6 text-gold/60" />
                <CornerFlourish className="absolute right-2 top-2 h-6 w-6 -scale-x-100 text-gold/60" />
                <CornerFlourish className="absolute bottom-2 left-2 h-6 w-6 -scale-y-100 text-gold/60" />
                <CornerFlourish className="absolute bottom-2 right-2 h-6 w-6 -scale-100 text-gold/60" />
                <StarMark className="h-3 w-3 text-gold" />
                <span className="doc-display mt-2 text-xl font-bold text-maroon">{t.name}</span>
                <span className="mt-2 h-px w-10 bg-gold" />
                <div className="mt-4 w-3/4 space-y-1.5">
                  <div className="h-1.5 w-full rounded-full bg-line" />
                  <div className="mx-auto h-1.5 w-5/6 rounded-full bg-line" />
                  <div className="mx-auto h-1.5 w-2/3 rounded-full bg-line" />
                </div>
              </div>
              <h3 className="font-display mt-4 text-lg font-bold">{t.name}</h3>
              <p className="mt-1 text-sm text-muted">{t.description}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-maroon transition-transform group-hover:translate-x-0.5">Use this template →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="border-y border-line bg-surface/60">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
          <Flourish className="mb-6" />
          <h2 className="font-display text-center text-3xl font-bold sm:text-4xl">Ready in 3 steps</h2>
          <div className="relative mt-12 grid gap-10 md:grid-cols-3">
            {/* connecting line on desktop */}
            <div className="absolute left-1/6 right-1/6 top-7 hidden h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent md:block" />
            {steps.map((s) => (
              <div key={s.n} className="relative text-center">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full maroon-gradient font-display text-xl font-bold text-white ring-4 ring-gold-soft/60 shadow-md">{s.n}</div>
                <h3 className="font-display mt-4 text-lg font-bold">{s.title}</h3>
                <p className="mt-1.5 text-sm text-muted">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ — visible answers mirror the FAQPage JSON-LD above for rich results. */}
      <section id="faq" className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-24">
        <Flourish className="mb-6" />
        <h2 className="font-display text-center text-3xl font-bold sm:text-4xl">
          Frequently asked questions
        </h2>
        <dl className="mt-10 space-y-4">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="group rounded-2xl border border-line bg-surface p-5 transition-colors open:border-gold/40 open:shadow-sm"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display font-semibold">
                <dt>{f.q}</dt>
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold-soft/60 text-maroon transition-transform group-open:rotate-45">+</span>
              </summary>
              <dd className="mt-3 text-sm leading-relaxed text-muted">{f.a}</dd>
            </details>
          ))}
        </dl>
      </section>

      {/* Open source */}
      <section className="border-t border-line bg-surface/60">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 md:py-24">
          <span className="inline-grid h-14 w-14 place-items-center rounded-2xl bg-gold-soft/50 text-maroon ring-1 ring-gold/30">
            <HeartIcon className="h-7 w-7" />
          </span>
          <h2 className="font-display mt-5 text-3xl font-bold sm:text-4xl">Built in the open</h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted">
            SnapBiodata is free and open source under the MIT license. Found a bug, want a new template,
            or a new language? Contributions are welcome — let&apos;s make it great for the whole world.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-4">
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="rounded-xl maroon-gradient px-7 py-3.5 font-semibold text-white shadow-md shadow-maroon/25 ring-1 ring-inset ring-white/15 transition-transform hover:-translate-y-0.5">
              Star on GitHub
            </a>
            <a href={`${GITHUB_URL}/blob/main/CONTRIBUTING.md`} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-line bg-surface px-7 py-3.5 font-semibold text-ink shadow-sm transition-colors hover:border-gold hover:text-maroon">
              How to contribute
            </a>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden maroon-gradient">
        <Seal className="pointer-events-none absolute -left-8 -top-8 h-44 w-44 text-white/10" />
        <Seal className="pointer-events-none absolute -bottom-10 -right-8 h-44 w-44 text-white/10" />
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">
          <Flourish className="mb-6 [&_.gold-rule]:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.6),transparent)] [&_svg]:text-gold-soft" />
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">Make your biodata now — it&apos;s free</h2>
          <p className="mx-auto mt-3 max-w-lg text-white/80">No sign-up, no watermark, no cost. Just a beautiful biodata in minutes.</p>
          <Link href="/create" className="mt-8 inline-block rounded-xl bg-white px-8 py-3.5 font-semibold text-maroon shadow-xl transition-transform hover:-translate-y-0.5">
            Create your biodata →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-line bg-canvas">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted sm:flex-row sm:px-6">
          <p>© 2026 SnapBiodata · Free &amp; open source (MIT)</p>
          <div className="flex flex-wrap justify-center gap-5">
            <Link href="/create" className="hover:text-maroon">Create</Link>
            <Link href="/blog" className="hover:text-maroon">Blog</Link>
            <a href="#faq" className="hover:text-maroon">FAQ</a>
            <a href={`mailto:${SITE.contactEmail}?subject=SnapBiodata%20feedback`} className="hover:text-maroon">Feedback</a>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="hover:text-maroon">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
