# Arsana — Instagram Content Brief (handoff for a new task)

Compact context to resume the Instagram work cold. Scope: **Instagram only.**

## What this is
Producing Instagram content (highlight covers, story content, feed carousels, portfolio posts) for **Arsana** — a design-build contractor ("Design · Build · Elevate"): interior, eksterior, konstruksi/renovasi, instalasi listrik, instalasi AC, furniture custom. Jabodetabek-based.

## Where things live
- **Deliverables (this folder):** `C:\Users\jonat\Desktop\arsana-ig-assets\`
- **Website repo (source of brand + content):** `C:\Users\jonat\Desktop\arsana_website_official\` (Next.js, private on GitHub). Real content lives in its components.
- Website domain: **arsana.id**

## Brand tokens (LOCKED — do not swap)
- Cream `#F5EEE5` · Gold `#A37510` · Espresso `#271810` · Muted brown `#6B5A47`
- Serif (display/headings): **Georgia** stands in for the Trajan-style ARSANA wordmark
- Sans (body): **Arial**
- Monogram "A": `public/favicon.svg` (cream tile stripped = transparent gold monogram) · Full wordmark: `public/logo.svg`
- Style direction chosen by user: **Elegan Minimalis**

## Design system
- **Signature = "surveyor's seal":** gold ring (r430, sw4) + 4 registration ticks (N/E/S/W). Used on highlight covers.
- **Icon language = architect's technical drawing** (hairline gold): dimension line, floor plan, elevation, etc. Covers carry NO text (the IG highlight title carries the name).
- **Story frame (1080×1920):** cream bg · "ARSANA" top-left · eyebrow top-right · "arsana.id" bottom · hairline rules.
- **Formats:** highlight covers & stories = 1080×1920 · feed carousel = 1080×1350 · portfolio posts = 1080×1350 (4:5).

## Produced so far
| Folder | Count | Use |
|---|---|---|
| `highlights/` | 7 covers | cara-kerja, layanan, portofolio, testimoni, kontak, faq, estimasi-garansi |
| `carousel-cara-kerja/` | 9 slides | feed post (cover + 7 steps + CTA) |
| `portfolio/` | 3 samples + template | feed posts (of 13 projects) |
| `stories-faq/` | 8 | Highlight FAQ |
| `stories-testimoni/` | 6 | Highlight Testimoni |
| `stories-layanan/` | 6 | Highlight Layanan (custom line icons) |
| `stories-estimasi-garansi/` | 4 | Highlight Estimasi & Garansi (stat cards) |

## Content sources (real, from repo components)
- Process (7 steps): `components/ui/process-steps.tsx`
- Portfolio (13 projects w/ photos): `components/ui/portfolio.tsx` (photos in `public/projects/Arsana Foto Recreate/`)
- FAQ (8 Q&A): `components/ui/faq.tsx`
- Testimonials (6): `components/ui/testimonials.tsx`
- Services (6): `components/ui/footer-7.tsx` · Pricing: `components/ui/pricing-section-4.tsx`

## Rendering pipeline
SVG string → PNG via **`sharp`** (installed in the website repo; run scripts from inside the repo so node_modules resolves). Text rendering works on this Windows box. Write a temp `_tmp_*.mjs` in the repo, run with `node`, then delete. Output to this assets folder (kept OUT of the website git repo on purpose).

## Pending / needs user
- **WhatsApp number** — still placeholder `6281234567890` in `lib/contact.ts` (also `+62 812-3456-7890` in contact-form).
- **Instagram / Facebook handles** — `#` placeholders in `lib/contact.ts`.
- **Before-photos** → for a "Sebelum–Sesudah" highlight (high impact).
- **Field/progress photos** → for a "Proses / Di Lapangan" highlight.

## Open next steps (menu)
1. Batch all 13 portfolio posts (data ready).
2. "Layanan" feed carousel (6 services).
3. Feed plan: first 12 posts + posting calendar.
4. "Sebelum–Sesudah" (needs before-photos).
5. Finalize CTA/Kontak once real WA + IG handle provided.

## Captions already written
- Cara Kerja carousel caption + Portfolio post caption template exist (in prior chat). Recreate on request.

## How to use highlights
Upload a story image → tap Sorotan (＋) → save to the highlight → set its cover from `highlights/`. Type the highlight name in IG ("Cara Kerja", etc.).
