# Contributing to SnapBiodata

Thanks for helping make SnapBiodata better for people around the world! 💛
Every contribution — a new template, a translation, a bug fix, or an idea — is welcome.

## Ways to contribute
- 🎨 **New templates** — the most impactful contribution (see below).
- 🌍 **Translations / languages** — help make it usable worldwide.
- 🐛 **Bug fixes** — see open [issues](https://github.com/pythonsst/snapbiodata/issues).
- ✨ **Features & polish** — accessibility, performance, UX.
- 📝 **Docs** — improve this guide or the README.

## Development setup
```bash
git clone https://github.com/pythonsst/snapbiodata.git
cd snapbiodata
npm install
npm run dev          # http://localhost:3000
```
Publishing works locally without any keys (it uses a `.data/` file fallback).

Before opening a PR, make sure these pass:
```bash
npm run lint
npm run build
```

## 🎨 Adding a template
1. Create `src/components/templates/YourTemplate.tsx`. It receives `{ data }` and renders an A4 page (`<div className="a4 doc">…</div>`).
2. Use the shared helpers so it stays in sync with the form:
   ```ts
   import { renderedSections, displayName, type TemplateProps } from "./shared";
   ```
   `renderedSections(data)` gives you the non-empty sections + rows; `displayName(data)` gives the name with a fallback.
3. Register it in `src/components/templates/index.tsx`:
   ```ts
   { id: "your-id", name: "Your Name", description: "Short blurb", Component: YourTemplate }
   ```
4. Test at `/create` — pick your template, check the **live preview**, **photo**, and **Download PDF** (print). Add a screenshot to your PR.

Tips: keep colours self-contained (use the wedding tokens `maroon`, `gold`, `canvas`, `ink`, `line`, or arbitrary values). Inline SVG ornaments live in `templates/ornaments.tsx` and are reusable.

## 🌍 Adding a language
Field labels and options live in `src/data/biodata.ts`. The cleanest path is to move user-facing strings into a small locale map and add a language switcher — this is a tracked, **help-wanted** area. Open an issue first so we can agree on the structure, then submit your translation.

## Pull request guidelines
- Keep PRs focused and small where possible.
- Match the existing code style; `npm run lint && npm run build` must pass.
- Include before/after screenshots for any UI or template change.
- Describe **what** and **why** in the PR description.

For larger changes, please open an issue first to discuss the approach.

By contributing, you agree your work is licensed under the project's [MIT License](./LICENSE), and you agree to follow our [Code of Conduct](./CODE_OF_CONDUCT.md).

Happy building! 🚀
