@AGENTS.md

# SnapBiodata — project rules

Free, open-source marriage-biodata maker (Next.js 16 App Router, React 19,
Tailwind v4, TypeScript). Deployed on Vercel at https://snapbiodata.com.

## Git workflow — NEVER push to `main`

- All changes go through a branch and a PR. Start every task with
  `git checkout -b <type>/<slug>` (e.g. `fix/`, `feat/`, `chore/`).
- `main` is auto-deployed to production by Vercel, so a direct push ships
  untested code to real users. Do not `git push origin main`.
- Push the branch (`git push -u origin <branch>`) and open a PR with
  `gh pr create --base main`. The user reviews and merges.
- Vercel builds a **preview deployment** per branch — share that URL for
  device testing (especially the iPhone) before merging.
- End commit messages with the `Co-Authored-By` trailer.

## Quality gates — before every PR

Run all three and make sure they pass:

- `npm run lint`
- `npm test` (Vitest)
- `npm run build`

Add or update tests for any logic you change — we don't ship untested logic.
Pure logic (pagination, slugs, data helpers) gets unit tests; components get
Testing Library tests. Test files live next to the source as `*.test.ts(x)`
and are excluded from the production build via `tsconfig.json`.

## Privacy — data stays in the browser

The biodata never leaves the device until the user explicitly publishes. Don't
add network calls, logging, or storage that send form data anywhere. The PDF is
generated **client-side** (see below), not on a server.

## PDF generation — do NOT use `window.print()`

PDFs are rendered in the browser by `src/lib/pdf.ts` (`html2canvas-pro` +
`jsPDF`): each laid-out `.a4` page is captured to an image and placed on an A4
sheet. This is deliberate — every browser's print engine paginates differently
(iOS WebKit ignores `@page { margin: 0 }` and inserts blank pages; desktop
Chrome needs "Background graphics"). The in-browser path gives **identical
output on every device** and keeps data local. Don't reintroduce `window.print()`
for downloads.

## Single sources of truth — edit these, not copies

- `src/data/biodata.ts` — the biodata model; drives both the form and every
  template. Add/reorder fields here.
- `src/config.ts` — `SITE` (name, url, contactEmail) and `SUPPORT` (UPI). Used
  for rebranding; reference these, don't hard-code strings.
- `src/lib/a4.ts` — A4 page geometry (px/mm, dimensions, ratio).
- `src/lib/paginate.ts` — pure pagination logic (no DOM); `FramedDoc` measures
  the DOM and feeds it.
- `src/components/ui/` — shared `Button` + `icons`. Reuse, don't hand-roll
  buttons/SVGs per screen.

## Verifying visual / PDF changes

Headless Chromium can't fully reproduce iOS print behaviour. For visual or PDF
work, verify with a headless browser screenshot/PDF where possible, but treat
real-device confirmation (via the Vercel preview URL) as the final check.
