# Arsana Instagram Assets (`ig-content/`)

Instagram content pipeline for **Arsana** (design-build contractor, arsana.id). Lives inside the
website repo on the **`ig-content` branch only**, in this `ig-content/` folder, so it can be synced
across devices via git. **It does not affect the website build or deploy** — nothing under `app/`
or `components/` imports from here, there are no `.ts`/`.tsx` files in this folder (so TypeScript's
repo-wide `include: ["**/*.ts", "**/*.tsx"]` in `tsconfig.json` never touches it), and it isn't under
`public/`. Safe to ignore entirely from the website's point of view.

## This is the canonical copy

If you also have a standalone `arsana-ig-assets/` folder on the original machine (Desktop, outside
this repo), **treat this `ig-content/` copy as the source of truth going forward** and stop editing
the standalone one, or the two will drift out of sync with no way to reconcile automatically.

## Setup on a new device

```
git clone <this-repo-url>
cd arsana_website_official
git checkout ig-content
npm install              # installs sharp (and everything else) into node_modules — required,
                          # node_modules is gitignored so it's not in the clone
cd ig-content/_build
node carousel-layanan.mjs   # regenerate any asset set, e.g.
```

Every generator script writes its PNGs to the sibling content folder (`../carousel-layanan/`, etc.)
and prints a `✓` per file. No other setup needed — all paths in `lib-v2.mjs` resolve relative to the
script's own location (`import.meta.url`), so this works regardless of the machine, username, or
drive letter.

## What's here

| Folder | Generator | Output |
|---|---|---|
| `carousel-cara-kerja/` | `_build/carousel.mjs` | 9 slides — 7-step process feed carousel |
| `carousel-layanan/` | `_build/carousel-layanan.mjs` | 8 slides — 6-service feed carousel |
| `highlights/` | `_build/highlights.mjs` [`light`\|`dark`] + `_build/_tray.mjs` | 6 highlight covers + tray mockup |
| `stories-layanan/`, `stories-faq/` | `_build/stories.mjs` | Instagram Stories (highlight content) |
| `portfolio/` | — (real photos, not generated) | 13 real project photos — **do not touch**, not ready for use yet |
| `profile-picture.png/.jpg/.jpeg` | `_build/profile.mjs` | Instagram profile picture (sourced from `_build/profile-source.png`) |
| `_build/lib-v2.mjs` | — | shared "V2" design-language library: brand tokens, `plate()` frame, icon loader, `render()` |
| `_build/icons/*.svg` | — | Phosphor Icons (fill weight), used by `iconFill()`/`icon()` in the carousels |

Run any generator with plain `node <script>.mjs` from inside `ig-content/_build/`.

## Brand tokens (LOCKED — do not change without asking)

```
cream    #F5EEE5
gold     #A37510
espresso #271810
muted    #6B5A47
```
Serif (headings): Georgia · Sans (body): Arial · Brand handle: `@arsana.idn`

## Content sources (if regenerating copy from the website)

- Process steps: `components/ui/process-steps.tsx`
- Services: `components/ui/footer-7.tsx` · Pricing: `components/ui/pricing-section-4.tsx`
- FAQ: `components/ui/faq.tsx`
- **"Tentang" material (no dedicated About page exists on the site — synthesized from scattered fragments):**
  stats (100+ proyek, 15+ tahun) in `components/ui/splite.tsx` (hero) · 6 trust pillars in
  `components/ui/trust-section.tsx` · tagline "Design · Build · Elevate" in `components/ui/brand.tsx`

## Known conventions / gotchas (read before editing generators)

- **Footer dot-row position must be computed once per carousel**, not per-slide — see
  `footerProgressLayout()` in `lib-v2.mjs`. It sizes the row to clear the single longest title used
  in that carousel, so every slide shows the identical row position. Never call `nodeRow()` directly
  with a per-slide-computed span/center in a step/card footer — that was a recurring bug (dots
  colliding with long titles, then dots drifting to a different spot per slide).
- **`highlights.mjs` wipes its entire output folder before rendering** (`unlinkSync` over every file
  in `highlights/`, including files it doesn't itself regenerate like `_tray-mockup.png`). Always
  re-run `_tray.mjs` right after `highlights.mjs`, and never leave unrelated files in that folder.
- Copy voice is **inconsistent by design across carousels** — `carousel-layanan.mjs` uses formal
  third-person "ARSANA melayani/merancang..." (no "kamu"/"Anda"); `carousel.mjs` (cara-kerja) uses
  formal "Anda". Match whichever carousel you're editing, don't unify them without asking first.
  `carousel.mjs` body copy also avoids em-dashes ("—") per user preference; other carousels don't.
