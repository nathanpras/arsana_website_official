# Company Profile Arsana — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a regenerable A4 PDF company profile for Arsana from a single editable content file, so swapping photos never touches layout code.

**Architecture:** Plain ESM modules under `portfolio/`. `content.mjs` holds all copy and project data. One module per page type returns page objects; `document.mjs` assembles them into a single HTML string; `build.mjs` renders that HTML to PDF with Playwright's bundled Chromium. A validator blocks the build when placeholders remain, photos are missing, or a render leaks into the built-work section.

**Tech Stack:** Node 24 (ESM, `node:test`), Playwright 1.60 (already a devDependency, browsers installed), sharp 0.35 (already a dependency), CSS print layout. No new dependencies.

## Global Constraints

- Page size A4 exactly: 210 × 297 mm. Verified output must measure 209.9 × 297.0 mm.
- Margins: 18 mm outer, 22 mm inner (binding side).
- Colours, verbatim: gold `#AF8431`, ink `#241812`, cream `#F6F3EE`.
- Fonts: headings `Baskerville, 'Hoefler Text', Georgia, serif`; body `'Avenir Next', 'Helvetica Neue', sans-serif`. Both confirmed present on this machine.
- Language of all user-facing copy and code comments: Indonesian. Match the style of `scripts/og-image.mjs`.
- File extension `.mjs`, ESM only. No TypeScript, no bundler.
- Every photo entry carries `jenis: 'foto' | 'proses' | 'render'`.
- `jenis: 'render'` may appear **only** in `visualisasiDesain`. Never in `proyekTerbangun`.
- Print-usable thresholds: full-bleed needs shortest side ≥ 1400 px; small placement needs ≥ 700 px; below 700 px is unusable.
- Placeholder syntax is exactly `[ISI: ...]`. The build fails on any remaining placeholder unless run with `--draft`.
- Final PDF must be under 8 MB.
- Work in the repo clone on branch `main`. Run `npm install` once before Task 1 if `node_modules/` is absent.

---

### Task 1: Photo audit library

**Files:**
- Create: `portfolio/lib/photos.mjs`
- Test: `portfolio/test/photos.test.mjs`

**Interfaces:**
- Consumes: nothing.
- Produces: `classifyPrint(width, height) -> 'fullbleed' | 'small' | 'unusable'`, `imageInfo(absPath) -> Promise<{ width, height, minSide, printClass }>`, constants `FULLBLEED_MIN = 1400`, `SMALL_MIN = 700`.

- [ ] **Step 1: Write the failing test**

```js
// portfolio/test/photos.test.mjs
import test from 'node:test'
import assert from 'node:assert/strict'
import { classifyPrint, FULLBLEED_MIN, SMALL_MIN } from '../lib/photos.mjs'

test('classifyPrint memakai sisi terpendek', () => {
  assert.equal(classifyPrint(2400, 1792), 'fullbleed')
  assert.equal(classifyPrint(1792, 2400), 'fullbleed')
  assert.equal(classifyPrint(1400, 1400), 'fullbleed')
  assert.equal(classifyPrint(1200, 1600), 'small')
  assert.equal(classifyPrint(700, 5000), 'small')
  assert.equal(classifyPrint(424, 246), 'unusable')
})

test('ambang batas terekspos untuk dipakai modul lain', () => {
  assert.equal(FULLBLEED_MIN, 1400)
  assert.equal(SMALL_MIN, 700)
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test portfolio/test/photos.test.mjs`
Expected: FAIL — `Cannot find module '../lib/photos.mjs'`

- [ ] **Step 3: Write minimal implementation**

```js
// portfolio/lib/photos.mjs
/**
 * Menilai apakah sebuah gambar cukup tajam untuk dicetak A4.
 * Ambang diambil dari audit foto 2026-08-03: banyak berkas di photos-archive
 * ternyata thumbnail 200-400 px yang tidak mungkin dipakai.
 */
import sharp from 'sharp'

export const FULLBLEED_MIN = 1400
export const SMALL_MIN = 700

export function classifyPrint(width, height) {
  const minSide = Math.min(width, height)
  if (minSide >= FULLBLEED_MIN) return 'fullbleed'
  if (minSide >= SMALL_MIN) return 'small'
  return 'unusable'
}

export async function imageInfo(absPath) {
  const { width, height } = await sharp(absPath).metadata()
  return { width, height, minSide: Math.min(width, height), printClass: classifyPrint(width, height) }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test portfolio/test/photos.test.mjs`
Expected: PASS, 2 tests

- [ ] **Step 5: Commit**

```bash
git add portfolio/lib/photos.mjs portfolio/test/photos.test.mjs
git commit -m "feat(portfolio): add print-resolution classifier"
```

---

### Task 2: Content model with placeholders

**Files:**
- Create: `portfolio/content.mjs`
- Test: `portfolio/test/content.test.mjs`

**Interfaces:**
- Consumes: nothing.
- Produces: named exports `perusahaan`, `angka`, `layanan`, `caraKerja`, `proyekTerbangun`, `visualisasiDesain`, `proyekLain`, `penutup`. Project shape: `{ id, nama, lokasi, tahun, durasi, lingkup, cerita, foto: [{ file, jenis, keterangan }] }`.

Photo filenames below are the curated names created in Task 8. They are declared now so page modules can be built and tested against a stable shape.

- [ ] **Step 1: Write the failing test**

```js
// portfolio/test/content.test.mjs
import test from 'node:test'
import assert from 'node:assert/strict'
import { perusahaan, proyekTerbangun, visualisasiDesain, proyekLain } from '../content.mjs'

test('perusahaan punya semua field yang dipakai halaman Tentang', () => {
  for (const k of ['namaResmi', 'tahunBerdiri', 'alamat', 'kontak']) {
    assert.ok(k in perusahaan, `field ${k} hilang`)
  }
  for (const k of ['wa', 'email', 'instagram', 'web']) {
    assert.ok(k in perusahaan.kontak, `kontak.${k} hilang`)
  }
})

test('tiap proyek terbangun punya field lengkap dan tidak memuat render', () => {
  assert.ok(proyekTerbangun.length >= 3)
  for (const p of proyekTerbangun) {
    for (const k of ['id', 'nama', 'lokasi', 'tahun', 'durasi', 'lingkup', 'cerita', 'foto']) {
      assert.ok(k in p, `${p.id ?? '?'}: field ${k} hilang`)
    }
    for (const f of p.foto) {
      assert.ok(['foto', 'proses'].includes(f.jenis), `${p.id}: render dilarang di karya terbangun`)
    }
  }
})

test('visualisasi desain hanya berisi render', () => {
  for (const p of visualisasiDesain) {
    for (const f of p.foto) assert.equal(f.jenis, 'render')
  }
})

test('daftar proyek lain tidak memuat foto', () => {
  assert.ok(proyekLain.length >= 8)
  for (const p of proyekLain) assert.ok(!('foto' in p))
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test portfolio/test/content.test.mjs`
Expected: FAIL — `Cannot find module '../content.mjs'`

- [ ] **Step 3: Write minimal implementation**

```js
// portfolio/content.mjs
/**
 * Semua teks dan data portofolio Arsana ada di berkas ini.
 * Aman diedit tanpa menyentuh layout: ubah kalimat, angka, atau nama berkas
 * foto, lalu jalankan `node portfolio/build.mjs`.
 *
 * Tulisan [ISI: ...] adalah penanda data yang belum ada. Build sengaja gagal
 * selama masih ada penanda, supaya dokumen setengah jadi tidak terkirim ke
 * customer. Untuk melihat hasil sementara: `node portfolio/build.mjs --draft`.
 *
 * jenis foto:
 *   'foto'   hasil jadi, boleh dipakai besar dan boleh jadi sampul
 *   'proses' konstruksi berjalan, bukti pengerjaan, dipakai ukuran kecil
 *   'render' visualisasi desain, HANYA boleh di bagian visualisasiDesain
 */

export const perusahaan = {
  namaResmi: '[ISI: nama resmi PT/CV]',
  tahunBerdiri: '[ISI: tahun berdiri]',
  alamat: '[ISI: alamat kantor]',
  ringkas:
    'Arsana mengerjakan rumah tinggal dan ruang komersial dari perencanaan ' +
    'sampai serah terima. Satu tim menangani desain, pembangunan, dan finishing, ' +
    'sehingga pemilik cukup berurusan dengan satu penanggung jawab.',
  kontak: {
    wa: '[ISI: nomor WhatsApp]',
    email: '[ISI: email]',
    instagram: '[ISI: @instagram]',
    web: 'arsana.id',
  },
}

export const angka = [
  { nilai: '[ISI: jumlah]', satuan: 'proyek selesai' },
  { nilai: '[ISI: jumlah]', satuan: 'tahun pengalaman' },
  { nilai: '[ISI: jumlah]', satuan: 'm² bangunan dikerjakan' },
]

export const layanan = [
  { nama: 'Bangun Baru', isi: 'Rumah tinggal dari pondasi sampai finishing, termasuk perizinan dan pengawasan harian.' },
  { nama: 'Renovasi', isi: 'Perombakan sebagian atau menyeluruh pada bangunan yang sudah berdiri, dengan penanganan struktur lama.' },
  { nama: 'Casco', isi: 'Pengerjaan struktur dan kulit bangunan tanpa finishing, untuk pemilik yang ingin menentukan interior sendiri.' },
  { nama: 'Interior', isi: 'Finishing dan pengisian ruang, dari marmer dan kayu sampai pencahayaan.' },
  { nama: 'Komersial', isi: 'Fit-out ruko, kafe, showroom, dan arena hiburan dengan target buka yang harus ditepati.' },
]

export const caraKerja = [
  { no: '01', nama: 'Konsultasi', isi: 'Mendengar kebutuhan, gaya, dan batas anggaran. Belum ada biaya.' },
  { no: '02', nama: 'Survey lokasi', isi: 'Pengukuran, pengecekan kondisi tanah dan bangunan sekitar.' },
  { no: '03', nama: 'Desain & RAB', isi: 'Gambar kerja dan rincian anggaran yang bisa ditelusuri per item.' },
  { no: '04', nama: 'Pembangunan', isi: 'Pengerjaan dengan laporan berkala dan foto perkembangan.' },
  { no: '05', nama: 'Serah terima', isi: 'Pengecekan bersama, perbaikan temuan, lalu bangunan diserahkan.' },
]

export const proyekTerbangun = [
  {
    id: 'mampang',
    nama: 'Rumah Tinggal Bangka Mampang',
    lokasi: 'Mampang, Jakarta Selatan',
    tahun: '2024',
    durasi: '10 bulan',
    lingkup: 'Bangun baru, interior marmer, kolam dalam',
    cerita:
      'Rumah tinggal mewah di lahan padat Jakarta Selatan. Pekerjaan mencakup ' +
      'struktur, finishing marmer, sampai kolam renang di dalam bangunan.',
    foto: [
      { file: 'mampang-01.jpg', jenis: 'foto', keterangan: 'Tampak depan' },
      { file: 'mampang-02.jpg', jenis: 'foto', keterangan: 'Ruang keluarga' },
      { file: 'mampang-03.jpg', jenis: 'foto', keterangan: 'Detail marmer' },
      { file: 'mampang-04.jpg', jenis: 'foto', keterangan: 'Area kolam' },
      { file: 'mampang-05.jpg', jenis: 'foto', keterangan: 'Tangga utama' },
    ],
  },
  {
    id: 'goldcoast',
    nama: 'Rumah Tinggal PIK Gold Coast',
    lokasi: 'PIK, Jakarta Utara',
    tahun: '2023',
    durasi: '12 bulan',
    lingkup: 'Bangun baru, mansion klasik, finishing mewah',
    cerita:
      'Mansion klasik tiga lantai di kawasan Pantai Indah Kapuk, dikerjakan ' +
      'dari pondasi sampai ornamen fasad.',
    foto: [{ file: 'goldcoast-01.jpg', jenis: 'proses', keterangan: 'Pengerjaan fasad' }],
  },
  {
    id: 'bozz-billiard',
    nama: 'Bozz Billiard Citra 8',
    lokasi: 'Citra Garden, Jakarta Barat',
    tahun: '2024',
    durasi: '4 bulan',
    lingkup: 'Fit-out komersial, akustik, pencahayaan',
    cerita:
      'Arena billiard dengan penanganan akustik dan pencahayaan terarah, ' +
      'dikejar tenggat pembukaan.',
    foto: [
      { file: 'bozz-01.jpg', jenis: 'foto', keterangan: 'Area meja utama' },
      { file: 'bozz-02.jpg', jenis: 'foto', keterangan: 'Suasana malam' },
    ],
  },
  {
    id: 'puri-garden-casco',
    nama: 'Puri Garden Casco',
    lokasi: '[ISI: lokasi lengkap]',
    tahun: '[ISI: tahun]',
    durasi: '[ISI: durasi]',
    lingkup: 'Casco — struktur dan kulit bangunan',
    cerita: '[ISI: 2-3 kalimat tentang proyek ini]',
    foto: [],
  },
  {
    id: 'citra-1-ext',
    nama: 'Citra 1 Ext',
    lokasi: '[ISI: lokasi lengkap]',
    tahun: '[ISI: tahun]',
    durasi: '[ISI: durasi]',
    lingkup: '[ISI: lingkup pekerjaan]',
    cerita: '[ISI: 2-3 kalimat tentang proyek ini]',
    foto: [],
  },
]

export const visualisasiDesain = [
  {
    id: 'goldcoast-render',
    nama: 'Rumah Tinggal PIK Gold Coast',
    lokasi: 'PIK, Jakarta Utara',
    tahun: '2023',
    durasi: '12 bulan',
    lingkup: 'Visualisasi fasad tahap desain',
    cerita:
      'Gambar rancangan fasad sebelum pembangunan dimulai, dipakai sebagai ' +
      'acuan bersama pemilik.',
    foto: [{ file: 'goldcoast-render-01.jpg', jenis: 'render', keterangan: 'Visualisasi fasad' }],
  },
]

export const proyekLain = [
  { nama: 'Rumah Tinggal Nava Park', lokasi: 'BSD, Tangerang', tahun: '2021–2022', lingkup: 'Bangun baru, landscape, kolam renang' },
  { nama: 'Rumah Tinggal Puri Metland', lokasi: 'Tangerang', tahun: '2023', lingkup: 'Bangun baru tiga lantai, klasik modern' },
  { nama: 'Rumah Tinggal Citra 2', lokasi: 'Citra 2, Jakarta Barat', tahun: '2022–2023', lingkup: 'Bangun baru dan finishing' },
  { nama: 'Rumah Tinggal Chiara 7', lokasi: 'Cikupa, Tangerang', tahun: '2023', lingkup: 'Bangun baru' },
  { nama: 'Rumah Tinggal Bintaro', lokasi: 'Bintaro, Tangerang Selatan', tahun: '2019–2020', lingkup: 'Bangun baru' },
  { nama: 'Rumah Tinggal Suvarna Sutra Flavio', lokasi: 'Pasar Kemis, Tangerang', tahun: '2022–2023', lingkup: 'Bangun baru' },
  { nama: 'Rumah Tinggal Suvarna Sutra Andara', lokasi: 'Pasar Kemis, Tangerang', tahun: '2018', lingkup: 'Bangun baru' },
  { nama: 'Rumah Tinggal Suvarna Sutra Padi Utama', lokasi: 'Pasar Kemis, Tangerang', tahun: '2020–2021', lingkup: 'Bangun baru' },
  { nama: 'Rumah Tinggal Suvarna Sutra Daru 1', lokasi: 'Pasar Kemis, Tangerang', tahun: '2021–2022', lingkup: 'Bangun baru' },
  { nama: 'Rumah Tinggal Taman Kencana', lokasi: 'Tangerang', tahun: '2022', lingkup: 'Bangun baru' },
  { nama: 'Rumah Tinggal Taman Alfa Joglo', lokasi: 'Jakarta Barat', tahun: '2022', lingkup: 'Bangun baru' },
  { nama: 'Rumah Tinggal Taman Surya', lokasi: 'Cengkareng, Jakarta Barat', tahun: '2019', lingkup: 'Bangun baru' },
  { nama: 'Renovasi Green Permata', lokasi: 'Ciledug, Tangerang', tahun: '2023', lingkup: 'Renovasi menyeluruh' },
  { nama: 'Showroom Marmer Cipondoh', lokasi: 'Cipondoh, Tangerang', tahun: '2023', lingkup: 'Renovasi ruko jadi showroom' },
  { nama: 'Coffee Grounds Cafe', lokasi: 'Sunter, Jakarta Utara', tahun: '2024', lingkup: 'Fit-out kafe' },
]

export const penutup = {
  judul: 'Mari mulai dari obrolan',
  isi:
    'Konsultasi dan survey lokasi tidak dipungut biaya. Kirim denah atau foto ' +
    'lahan, kami bantu perkirakan arah desain dan kebutuhan anggarannya.',
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test portfolio/test/content.test.mjs`
Expected: PASS, 4 tests

- [ ] **Step 5: Commit**

```bash
git add portfolio/content.mjs portfolio/test/content.test.mjs
git commit -m "feat(portfolio): add content model with placeholders"
```

---

### Task 3: Content validator

**Files:**
- Create: `portfolio/lib/validate.mjs`
- Test: `portfolio/test/validate.test.mjs`

**Interfaces:**
- Consumes: content module shape from Task 2.
- Produces: `findPlaceholders(value, path) -> [{ path, value }]`, `findMisplacedRenders(content) -> [{ proyek, file }]`, `findMissingPhotos(content, photosDir) -> Promise<[{ proyek, file }]>`, `validateContent(content, photosDir) -> Promise<{ placeholders, misplaced, missing }>`.

- [ ] **Step 1: Write the failing test**

```js
// portfolio/test/validate.test.mjs
import test from 'node:test'
import assert from 'node:assert/strict'
import { findPlaceholders, findMisplacedRenders } from '../lib/validate.mjs'

test('findPlaceholders menelusuri objek bersarang dan melaporkan jalurnya', () => {
  const found = findPlaceholders({
    a: 'aman',
    b: { c: '[ISI: tahun berdiri]' },
    d: [{ e: '[ISI: lokasi]' }],
  })
  assert.deepEqual(found.map((f) => f.path).sort(), ['b.c', 'd.0.e'])
})

test('findPlaceholders mengembalikan array kosong bila bersih', () => {
  assert.deepEqual(findPlaceholders({ a: 'aman', b: [1, 2] }), [])
})

test('findMisplacedRenders menangkap render di karya terbangun', () => {
  const bad = findMisplacedRenders({
    proyekTerbangun: [{ id: 'x', foto: [{ file: 'a.jpg', jenis: 'render' }] }],
    visualisasiDesain: [],
  })
  assert.deepEqual(bad, [{ proyek: 'x', file: 'a.jpg' }])
})

test('findMisplacedRenders menangkap foto nyata di bagian visualisasi', () => {
  const bad = findMisplacedRenders({
    proyekTerbangun: [],
    visualisasiDesain: [{ id: 'y', foto: [{ file: 'b.jpg', jenis: 'foto' }] }],
  })
  assert.deepEqual(bad, [{ proyek: 'y', file: 'b.jpg' }])
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test portfolio/test/validate.test.mjs`
Expected: FAIL — `Cannot find module '../lib/validate.mjs'`

- [ ] **Step 3: Write minimal implementation**

```js
// portfolio/lib/validate.mjs
/**
 * Penjaga mutu sebelum PDF dibuat. Tiga hal yang dicek:
 *   1. penanda [ISI: ...] yang belum diisi
 *   2. render yang nyasar ke bagian karya terbangun, atau sebaliknya
 *   3. berkas foto yang disebut content.mjs tapi tidak ada di portfolio/photos
 */
import fs from 'node:fs/promises'
import path from 'node:path'

const PENANDA = /\[ISI:/

export function findPlaceholders(value, prefix = '') {
  if (typeof value === 'string') return PENANDA.test(value) ? [{ path: prefix, value }] : []
  if (Array.isArray(value)) return value.flatMap((v, i) => findPlaceholders(v, prefix ? `${prefix}.${i}` : String(i)))
  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([k, v]) => findPlaceholders(v, prefix ? `${prefix}.${k}` : k))
  }
  return []
}

export function findMisplacedRenders(content) {
  const salah = []
  for (const p of content.proyekTerbangun) {
    for (const f of p.foto) if (f.jenis === 'render') salah.push({ proyek: p.id, file: f.file })
  }
  for (const p of content.visualisasiDesain) {
    for (const f of p.foto) if (f.jenis !== 'render') salah.push({ proyek: p.id, file: f.file })
  }
  return salah
}

export async function findMissingPhotos(content, photosDir) {
  const hilang = []
  const semua = [...content.proyekTerbangun, ...content.visualisasiDesain]
  for (const p of semua) {
    for (const f of p.foto) {
      try {
        await fs.access(path.join(photosDir, f.file))
      } catch {
        hilang.push({ proyek: p.id, file: f.file })
      }
    }
  }
  return hilang
}

export async function validateContent(content, photosDir) {
  return {
    placeholders: findPlaceholders(content),
    misplaced: findMisplacedRenders(content),
    missing: await findMissingPhotos(content, photosDir),
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test portfolio/test/validate.test.mjs`
Expected: PASS, 4 tests

- [ ] **Step 5: Commit**

```bash
git add portfolio/lib/validate.mjs portfolio/test/validate.test.mjs
git commit -m "feat(portfolio): add content validator"
```

---

### Task 4: Page shell, print CSS, and PDF pipeline

**Files:**
- Create: `portfolio/lib/page.mjs`, `portfolio/styles.css`, `portfolio/document.mjs`, `portfolio/build.mjs`
- Test: `portfolio/test/build.test.mjs`

**Interfaces:**
- Consumes: `validateContent` (Task 3).
- Produces: `page(inner, opts) -> { inner, chrome, bleed }`, `esc(s) -> string`, `renderDocument(content, pages) -> string`, and CLI `node portfolio/build.mjs [--draft]` writing `portfolio/.build/document.html` and `Arsana-Company-Profile.pdf` at repo root.

`renderDocument` takes the pages array as its second argument so this task is testable before any real page module exists.

- [ ] **Step 1: Write the failing test**

```js
// portfolio/test/build.test.mjs
import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { page, esc } from '../lib/page.mjs'
import { renderDocument } from '../document.mjs'

const run = promisify(execFile)

test('esc mengamankan karakter HTML', () => {
  assert.equal(esc('a & <b> "c"'), 'a &amp; &lt;b&gt; &quot;c&quot;')
})

test('renderDocument memberi nomor halaman berurutan dan melewati sampul', () => {
  const html = renderDocument({}, [page('<h1>Sampul</h1>', { chrome: false }), page('<p>Isi</p>'), page('<p>Lagi</p>')])
  assert.equal((html.match(/class="page/g) || []).length, 3)
  assert.match(html, /<span class="pg">2<\/span>/)
  assert.match(html, /<span class="pg">3<\/span>/)
  assert.doesNotMatch(html, /<span class="pg">1<\/span>/)
})

test('build --draft menghasilkan PDF A4 tanpa halaman kosong di akhir', async () => {
  await run('node', ['portfolio/build.mjs', '--draft'])
  const pdf = await fs.readFile('Arsana-Company-Profile.pdf')
  const boxes = [...new Set([...pdf.toString('latin1').matchAll(/\/MediaBox\s*\[([^\]]+)\]/g)].map((m) => m[1]))]
  assert.equal(boxes.length, 1, 'semua halaman harus seukuran')
  const [, , w, h] = boxes[0].trim().split(/\s+/).map(Number)
  assert.ok(Math.abs(w / 72 * 25.4 - 210) < 0.5, `lebar ${w} bukan A4`)
  assert.ok(Math.abs(h / 72 * 25.4 - 297) < 0.5, `tinggi ${h} bukan A4`)
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test portfolio/test/build.test.mjs`
Expected: FAIL — `Cannot find module '../lib/page.mjs'`

- [ ] **Step 3: Write minimal implementation**

```js
// portfolio/lib/page.mjs
/** Satu halaman dokumen. chrome=false untuk sampul dan pembatas bagian. */
export function page(inner, { chrome = true, bleed = false } = {}) {
  return { inner, chrome, bleed }
}

export function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
```

```css
/* portfolio/styles.css — tata letak cetak A4 */
@page { size: A4; margin: 0; }

* { margin: 0; padding: 0; box-sizing: border-box;
    -webkit-print-color-adjust: exact; print-color-adjust: exact; }

:root {
  --gold: #AF8431;
  --ink: #241812;
  --cream: #F6F3EE;
  --luar: 18mm;
  --dalam: 22mm;
}

body { background: var(--cream); color: var(--ink);
       font-family: 'Avenir Next', 'Helvetica Neue', sans-serif; }

.page { position: relative; width: 210mm; height: 297mm; overflow: hidden;
        background: var(--cream); break-after: page;
        padding: var(--luar) var(--luar) var(--luar) var(--dalam); }
.page:last-child { break-after: auto; }
.page.bleed { padding: 0; }

h1, h2, h3 { font-family: Baskerville, 'Hoefler Text', Georgia, serif; font-weight: normal; }
h1 { font-size: 34pt; line-height: 1.1; }
h2 { font-size: 22pt; line-height: 1.2; }
p  { font-size: 10.5pt; line-height: 1.65; }

.pg { position: absolute; bottom: 12mm; right: var(--luar);
      font-size: 8pt; letter-spacing: .12em; color: var(--gold); }
.kaki { position: absolute; bottom: 11mm; left: var(--dalam); height: 5mm; opacity: .75; }
```

```js
// portfolio/document.mjs
/** Merangkai daftar halaman menjadi satu dokumen HTML siap cetak. */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))

export function renderDocument(content, pages) {
  const css = fs.readFileSync(path.join(here, 'styles.css'), 'utf8')
  const kaki = '<img class="kaki" src="../public/brand/arsana-landscape.svg" alt="">'
  const body = pages
    .map((p, i) => {
      const nomor = p.chrome ? `${kaki}<span class="pg">${i + 1}</span>` : ''
      return `<section class="page${p.bleed ? ' bleed' : ''}">${p.inner}${nomor}</section>`
    })
    .join('\n')
  // HTML ditulis ke portfolio/.build/, sedangkan foto ada di portfolio/photos/
  // dan logo di public/brand/. <base> membuat semua path relatif dihitung dari
  // portfolio/, bukan dari .build/ — tanpa ini semua gambar gagal dimuat.
  return `<!doctype html><html lang="id"><head><meta charset="utf-8">
<base href="../">
<title>Arsana — Company Profile</title><style>${css}</style></head>
<body>\n${body}\n</body></html>`
}
```

```js
// portfolio/build.mjs
/**
 * Membuat Arsana-Company-Profile.pdf dari content.mjs.
 *
 *   node portfolio/build.mjs           build normal, gagal bila ada penanda
 *   node portfolio/build.mjs --draft   abaikan penanda, untuk melihat hasil
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'
import * as content from './content.mjs'
import { renderDocument } from './document.mjs'
import { validateContent } from './lib/validate.mjs'

const here = path.dirname(fileURLToPath(import.meta.url))
const draft = process.argv.includes('--draft')
const OUT = path.join(here, '..', 'Arsana-Company-Profile.pdf')
const BUILD = path.join(here, '.build')

const { placeholders, misplaced, missing } = await validateContent(content, path.join(here, 'photos'))

if (misplaced.length) {
  for (const m of misplaced) console.error(`SALAH TEMPAT: ${m.file} di proyek ${m.proyek}`)
  process.exit(1)
}
if (missing.length) {
  for (const m of missing) console.error(`FOTO HILANG: ${m.file} (proyek ${m.proyek})`)
  process.exit(1)
}
if (placeholders.length && !draft) {
  console.error(`Masih ada ${placeholders.length} penanda yang belum diisi:`)
  for (const p of placeholders) console.error(`  ${p.path} = ${p.value}`)
  console.error('\nIsi dulu di portfolio/content.mjs, atau jalankan dengan --draft.')
  process.exit(1)
}
if (placeholders.length) console.warn(`[draft] ${placeholders.length} penanda belum diisi`)

// Halaman asli dipasang di Task 5-8. Sampai itu, satu halaman kosong sudah
// cukup untuk membuktikan pipeline menghasilkan A4 yang benar.
const { buildPages } = await import('./pages/index.mjs').catch(() => ({ buildPages: null }))
const { page } = await import('./lib/page.mjs')
const pages = buildPages ? buildPages(content) : [page('')]

await fs.mkdir(BUILD, { recursive: true })
const htmlPath = path.join(BUILD, 'document.html')
await fs.writeFile(htmlPath, renderDocument(content, pages))

const browser = await chromium.launch()
const pg = await browser.newPage()
await pg.goto('file://' + htmlPath, { waitUntil: 'networkidle' })
await pg.pdf({ path: OUT, format: 'A4', printBackground: true, preferCSSPageSize: true })
await browser.close()

const { size } = await fs.stat(OUT)
console.log(`OK  ${pages.length} halaman  ${(size / 1e6).toFixed(2)} MB  ->  ${OUT}`)
if (size > 8e6) console.warn('PERINGATAN: di atas 8 MB, kompres foto lebih kuat.')
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test portfolio/test/build.test.mjs`
Expected: PASS, 3 tests. The PDF test prints `OK 1 halaman`.

- [ ] **Step 5: Ignore build artefacts**

Append to `.gitignore`:

```
portfolio/.build
```

- [ ] **Step 6: Commit**

```bash
git add portfolio/lib/page.mjs portfolio/styles.css portfolio/document.mjs portfolio/build.mjs portfolio/test/build.test.mjs .gitignore
git commit -m "feat(portfolio): add print CSS and PDF build pipeline"
```

---

### Task 5: Cover and narrative pages

**Files:**
- Create: `portfolio/pages/cover.mjs`, `portfolio/pages/narrative.mjs`
- Test: `portfolio/test/pages-narrative.test.mjs`

**Interfaces:**
- Consumes: `page`, `esc` (Task 4); content exports (Task 2).
- Produces: `cover(content) -> [pageObj]`, `narrative(content) -> [pageObj, pageObj, pageObj, pageObj]` covering pembuka, tentang, angka, layanan + cara kerja.

- [ ] **Step 1: Write the failing test**

```js
// portfolio/test/pages-narrative.test.mjs
import test from 'node:test'
import assert from 'node:assert/strict'
import { cover } from '../pages/cover.mjs'
import { narrative } from '../pages/narrative.mjs'
import * as content from '../content.mjs'

test('sampul satu halaman, tanpa nomor halaman', () => {
  const [p] = cover(content)
  assert.equal(cover(content).length, 1)
  assert.equal(p.chrome, false)
  assert.match(p.inner, /Design . Build . Elevate/)
})

test('narasi menghasilkan empat halaman', () => {
  assert.equal(narrative(content).length, 4)
})

test('halaman angka menampilkan tiap satuan', () => {
  const html = narrative(content)[2].inner
  for (const a of content.angka) assert.ok(html.includes(a.satuan), `${a.satuan} hilang`)
})

test('halaman layanan memuat semua layanan dan tahapan kerja', () => {
  const html = narrative(content)[3].inner
  for (const l of content.layanan) assert.ok(html.includes(l.nama))
  for (const c of content.caraKerja) assert.ok(html.includes(c.nama))
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test portfolio/test/pages-narrative.test.mjs`
Expected: FAIL — `Cannot find module '../pages/cover.mjs'`

- [ ] **Step 3: Write minimal implementation**

```js
// portfolio/pages/cover.mjs
/** Sampul: logo besar di atas foto nyata terkuat. */
import { page, esc } from '../lib/page.mjs'

export function cover(content) {
  const inner = `
    <div class="sampul-foto"><img src="photos/mampang-01.jpg" alt=""></div>
    <div class="sampul-teks">
      <img class="sampul-logo" src="../public/brand/arsana-portrait-white.svg" alt="Arsana">
      <p class="sampul-sub">Design · Build · Elevate</p>
      <p class="sampul-kaki">${esc(content.perusahaan.namaResmi)}</p>
    </div>`
  return [page(inner, { chrome: false, bleed: true })]
}
```

```js
// portfolio/pages/narrative.mjs
/** Halaman pembuka, tentang, angka, dan layanan + cara kerja. */
import { page, esc } from '../lib/page.mjs'

export function narrative(content) {
  const { perusahaan, angka, layanan, caraKerja } = content

  const pembuka = `
    <h1>Membangun rumah<br>tanpa membuat pemiliknya<br>ikut lelah.</h1>
    <p class="lead">${esc(perusahaan.ringkas)}</p>`

  const tentang = `
    <h2>Tentang Arsana</h2>
    <dl class="data">
      <dt>Badan usaha</dt><dd>${esc(perusahaan.namaResmi)}</dd>
      <dt>Berdiri</dt><dd>${esc(perusahaan.tahunBerdiri)}</dd>
      <dt>Kantor</dt><dd>${esc(perusahaan.alamat)}</dd>
    </dl>`

  const angkaHtml = `
    <h2>Rekam jejak</h2>
    <ul class="angka">
      ${angka.map((a) => `<li><span class="nilai">${esc(a.nilai)}</span><span class="satuan">${esc(a.satuan)}</span></li>`).join('')}
    </ul>`

  const layananHtml = `
    <h2>Layanan</h2>
    <ul class="layanan">
      ${layanan.map((l) => `<li><h3>${esc(l.nama)}</h3><p>${esc(l.isi)}</p></li>`).join('')}
    </ul>
    <h2 class="jarak">Cara kerja</h2>
    <ol class="proses">
      ${caraKerja.map((c) => `<li><span class="no">${esc(c.no)}</span><h3>${esc(c.nama)}</h3><p>${esc(c.isi)}</p></li>`).join('')}
    </ol>`

  return [page(pembuka), page(tentang), page(angkaHtml), page(layananHtml)]
}
```

Append to `portfolio/styles.css`:

```css
.sampul-foto { position: absolute; inset: 0; }
.sampul-foto img { width: 100%; height: 100%; object-fit: cover; }
.sampul-teks { position: absolute; inset: auto 0 0 0; padding: var(--dalam);
               background: linear-gradient(transparent, rgba(36,24,18,.82) 45%); color: var(--cream); }
.sampul-logo { width: 52mm; margin-bottom: 6mm; }
.sampul-sub { font-size: 10pt; letter-spacing: .3em; text-transform: uppercase; }
.sampul-kaki { font-size: 8pt; opacity: .7; margin-top: 3mm; }

.lead { font-size: 12pt; margin-top: 10mm; max-width: 120mm; }
.data { margin-top: 12mm; }
.data dt { font-size: 8pt; letter-spacing: .16em; text-transform: uppercase; color: var(--gold); margin-top: 8mm; }
.data dd { font-size: 13pt; }

.angka { list-style: none; margin-top: 16mm; }
.angka li { border-top: .3mm solid var(--gold); padding: 6mm 0; }
.angka .nilai { font-family: Baskerville, serif; font-size: 40pt; display: block; }
.angka .satuan { font-size: 9pt; letter-spacing: .16em; text-transform: uppercase; color: var(--gold); }

.layanan, .proses { list-style: none; margin-top: 8mm; }
.layanan li, .proses li { margin-bottom: 6mm; }
.layanan h3, .proses h3 { font-size: 12pt; }
.proses .no { font-size: 8pt; color: var(--gold); letter-spacing: .16em; }
.jarak { margin-top: 14mm; }
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test portfolio/test/pages-narrative.test.mjs`
Expected: PASS, 4 tests

- [ ] **Step 5: Commit**

```bash
git add portfolio/pages/cover.mjs portfolio/pages/narrative.mjs portfolio/styles.css portfolio/test/pages-narrative.test.mjs
git commit -m "feat(portfolio): add cover and narrative pages"
```

---

### Task 6: Adaptive project pages and section dividers

**Files:**
- Create: `portfolio/pages/project.mjs`, `portfolio/pages/divider.mjs`
- Test: `portfolio/test/pages-project.test.mjs`

**Interfaces:**
- Consumes: `page`, `esc` (Task 4).
- Produces: `divider(judul, keterangan) -> [pageObj]`, `projectPages(proyek) -> pageObj[]` returning 2 pages when the project has ≥ 4 photos, otherwise 1.

- [ ] **Step 1: Write the failing test**

```js
// portfolio/test/pages-project.test.mjs
import test from 'node:test'
import assert from 'node:assert/strict'
import { projectPages } from '../pages/project.mjs'
import { divider } from '../pages/divider.mjs'

const buat = (n) => ({
  id: 'x', nama: 'Proyek X', lokasi: 'Jakarta', tahun: '2024',
  durasi: '6 bulan', lingkup: 'Bangun baru', cerita: 'Cerita singkat.',
  foto: Array.from({ length: n }, (_, i) => ({ file: `x-0${i + 1}.jpg`, jenis: 'foto', keterangan: `Foto ${i + 1}` })),
})

test('empat foto atau lebih menghasilkan dua halaman', () => {
  assert.equal(projectPages(buat(5)).length, 2)
  assert.equal(projectPages(buat(4)).length, 2)
})

test('satu sampai tiga foto menghasilkan satu halaman', () => {
  for (const n of [1, 2, 3]) assert.equal(projectPages(buat(n)).length, 1, `${n} foto`)
})

test('tanpa foto tetap satu halaman dan menandai slot kosong', () => {
  const [p] = projectPages(buat(0))
  assert.equal(projectPages(buat(0)).length, 1)
  assert.match(p.inner, /BELUM ADA FOTO/)
})

test('halaman proyek selalu memuat data pokok', () => {
  const html = projectPages(buat(5)).map((p) => p.inner).join('')
  for (const t of ['Proyek X', 'Jakarta', '2024', '6 bulan', 'Bangun baru']) {
    assert.ok(html.includes(t), `${t} hilang`)
  }
})

test('pembatas bagian tanpa nomor halaman', () => {
  const [p] = divider('Karya Terbangun', 'Foto proyek yang sudah berdiri')
  assert.equal(p.chrome, false)
  assert.match(p.inner, /Karya Terbangun/)
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test portfolio/test/pages-project.test.mjs`
Expected: FAIL — `Cannot find module '../pages/project.mjs'`

- [ ] **Step 3: Write minimal implementation**

```js
// portfolio/pages/divider.mjs
/** Halaman pembatas antar bagian. */
import { page, esc } from '../lib/page.mjs'

export function divider(judul, keterangan) {
  return [page(`<div class="pembatas"><h2>${esc(judul)}</h2><p>${esc(keterangan)}</p></div>`, { chrome: false })]
}
```

```js
// portfolio/pages/project.mjs
/**
 * Halaman proyek yang menyesuaikan jumlah foto:
 *   >= 4 foto  dua halaman, kiri full-bleed, kanan data + foto kecil
 *   1-3 foto   satu halaman, foto besar di atas, data di bawah
 *   0 foto     satu halaman dengan slot kosong yang jelas
 */
import { page, esc } from '../lib/page.mjs'

const dataHtml = (p) => `
  <dl class="data-proyek">
    <dt>Lokasi</dt><dd>${esc(p.lokasi)}</dd>
    <dt>Tahun</dt><dd>${esc(p.tahun)}</dd>
    <dt>Durasi</dt><dd>${esc(p.durasi)}</dd>
    <dt>Lingkup</dt><dd>${esc(p.lingkup)}</dd>
  </dl>
  <p class="cerita">${esc(p.cerita)}</p>`

const gambar = (f) =>
  `<figure><img src="photos/${esc(f.file)}" alt="${esc(f.keterangan)}">` +
  `<figcaption>${esc(f.keterangan)}${f.jenis === 'render' ? ' · Visualisasi desain' : ''}</figcaption></figure>`

export function projectPages(p) {
  const n = p.foto.length

  if (n === 0) {
    return [page(`<h2>${esc(p.nama)}</h2>${dataHtml(p)}
      <div class="slot-kosong">BELUM ADA FOTO — slot menunggu pemotretan ulang</div>`)]
  }

  if (n < 4) {
    return [page(`<div class="foto-atas">${gambar(p.foto[0])}</div>
      <h2>${esc(p.nama)}</h2>${dataHtml(p)}
      <div class="foto-kecil">${p.foto.slice(1).map(gambar).join('')}</div>`)]
  }

  const kiri = page(`<div class="penuh">${gambar(p.foto[0])}<h2 class="judul-atas-foto">${esc(p.nama)}</h2></div>`, { bleed: true })
  const kanan = page(`<h2>${esc(p.nama)}</h2>${dataHtml(p)}
    <div class="foto-kecil">${p.foto.slice(1, 4).map(gambar).join('')}</div>`)
  return [kiri, kanan]
}
```

Append to `portfolio/styles.css`:

```css
.pembatas { position: absolute; inset: 0; display: flex; flex-direction: column;
            justify-content: center; padding: var(--dalam); background: var(--ink); color: var(--cream); }
.pembatas h2 { font-size: 30pt; color: var(--cream); }
.pembatas p { color: var(--gold); margin-top: 4mm; letter-spacing: .1em; }

.penuh { position: absolute; inset: 0; }
.penuh img { width: 100%; height: 100%; object-fit: cover; }
.penuh figcaption { display: none; }
.judul-atas-foto { position: absolute; left: var(--dalam); bottom: 18mm; color: var(--cream);
                   text-shadow: 0 1mm 4mm rgba(36,24,18,.6); }

.foto-atas img { width: 100%; height: 105mm; object-fit: cover; }
.foto-kecil { display: flex; gap: 4mm; margin-top: 8mm; }
.foto-kecil img { width: 100%; height: 42mm; object-fit: cover; }
figcaption { font-size: 7.5pt; color: var(--gold); margin-top: 2mm; }

.data-proyek { display: grid; grid-template-columns: 28mm 1fr; gap: 2mm 6mm; margin-top: 6mm; }
.data-proyek dt { font-size: 8pt; letter-spacing: .14em; text-transform: uppercase; color: var(--gold); }
.data-proyek dd { font-size: 10.5pt; }
.cerita { margin-top: 6mm; max-width: 120mm; }

.slot-kosong { margin-top: 10mm; height: 90mm; border: .6mm dashed var(--gold); color: var(--gold);
               display: flex; align-items: center; justify-content: center;
               font-size: 10pt; letter-spacing: .12em; background: #EFE7DA; }
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test portfolio/test/pages-project.test.mjs`
Expected: PASS, 5 tests

- [ ] **Step 5: Commit**

```bash
git add portfolio/pages/project.mjs portfolio/pages/divider.mjs portfolio/styles.css portfolio/test/pages-project.test.mjs
git commit -m "feat(portfolio): add adaptive project pages and dividers"
```

---

### Task 7: Index list, closing page, and page assembly

**Files:**
- Create: `portfolio/pages/index-list.mjs`, `portfolio/pages/closing.mjs`, `portfolio/pages/index.mjs`
- Test: `portfolio/test/pages-assembly.test.mjs`

**Interfaces:**
- Consumes: every page module from Tasks 5–6.
- Produces: `otherProjects(list) -> [pageObj]`, `closing(content) -> [pageObj]`, `buildPages(content) -> pageObj[]` — the function `build.mjs` already imports from `./pages/index.mjs`.

- [ ] **Step 1: Write the failing test**

```js
// portfolio/test/pages-assembly.test.mjs
import test from 'node:test'
import assert from 'node:assert/strict'
import { buildPages } from '../pages/index.mjs'
import { otherProjects } from '../pages/index-list.mjs'
import * as content from '../content.mjs'

test('daftar proyek lain memuat tiap baris tanpa satu pun gambar', () => {
  const [p] = otherProjects(content.proyekLain)
  for (const x of content.proyekLain) assert.ok(p.inner.includes(x.nama), `${x.nama} hilang`)
  assert.doesNotMatch(p.inner, /<img/)
})

test('urutan halaman sesuai spec', () => {
  const pages = buildPages(content)
  assert.equal(pages[0].chrome, false, 'halaman 1 harus sampul')
  const teks = pages.map((p) => p.inner).join('\n')
  assert.ok(teks.indexOf('Karya Terbangun') < teks.indexOf('Visualisasi Desain'))
  assert.ok(teks.indexOf('Visualisasi Desain') < teks.indexOf('Proyek lain'))
})

test('tiap proyek terbangun dan visualisasi muncul di dokumen', () => {
  const teks = buildPages(content).map((p) => p.inner).join('\n')
  for (const p of [...content.proyekTerbangun, ...content.visualisasiDesain]) {
    assert.ok(teks.includes(p.nama), `${p.nama} tidak muncul`)
  }
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test portfolio/test/pages-assembly.test.mjs`
Expected: FAIL — `Cannot find module '../pages/index.mjs'`

- [ ] **Step 3: Write minimal implementation**

```js
// portfolio/pages/index-list.mjs
/** Daftar proyek lain. Sengaja tanpa foto: stok fotonya tidak layak portofolio. */
import { page, esc } from '../lib/page.mjs'

export function otherProjects(daftar) {
  const baris = daftar
    .map(
      (p) => `<li><span class="n">${esc(p.nama)}</span><span class="l">${esc(p.lokasi)}</span>
              <span class="t">${esc(p.tahun)}</span><span class="s">${esc(p.lingkup)}</span></li>`,
    )
    .join('')
  return [page(`<h2>Proyek lain</h2><ul class="indeks">${baris}</ul>`)]
}
```

```js
// portfolio/pages/closing.mjs
/** Halaman penutup dengan ajakan dan kontak. */
import { page, esc } from '../lib/page.mjs'

export function closing(content) {
  const { penutup, perusahaan } = content
  const k = perusahaan.kontak
  return [
    page(`<div class="penutup">
      <h1>${esc(penutup.judul)}</h1>
      <p class="lead">${esc(penutup.isi)}</p>
      <dl class="data">
        <dt>WhatsApp</dt><dd>${esc(k.wa)}</dd>
        <dt>Email</dt><dd>${esc(k.email)}</dd>
        <dt>Instagram</dt><dd>${esc(k.instagram)}</dd>
        <dt>Website</dt><dd>${esc(k.web)}</dd>
      </dl>
    </div>`),
  ]
}
```

```js
// portfolio/pages/index.mjs
/** Merangkai urutan halaman dokumen. */
import { cover } from './cover.mjs'
import { narrative } from './narrative.mjs'
import { divider } from './divider.mjs'
import { projectPages } from './project.mjs'
import { otherProjects } from './index-list.mjs'
import { closing } from './closing.mjs'

export function buildPages(content) {
  return [
    ...cover(content),
    ...narrative(content),
    ...divider('Karya Terbangun', 'Proyek yang sudah berdiri dan diserahterimakan'),
    ...content.proyekTerbangun.flatMap(projectPages),
    ...divider('Visualisasi Desain', 'Rancangan tahap desain, bukan foto bangunan jadi'),
    ...content.visualisasiDesain.flatMap(projectPages),
    ...otherProjects(content.proyekLain),
    ...closing(content),
  ]
}
```

Append to `portfolio/styles.css`:

```css
.indeks { list-style: none; margin-top: 10mm; }
.indeks li { display: grid; grid-template-columns: 62mm 42mm 22mm 1fr; gap: 4mm;
             padding: 3.2mm 0; border-bottom: .2mm solid rgba(175,132,49,.35); font-size: 9pt; }
.indeks .n { font-family: Baskerville, serif; font-size: 10.5pt; }
.indeks .l, .indeks .t, .indeks .s { color: rgba(36,24,18,.7); }

.penutup { position: absolute; inset: 0; padding: var(--dalam); display: flex;
           flex-direction: column; justify-content: center; }
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test portfolio/test/pages-assembly.test.mjs`
Expected: PASS, 3 tests

- [ ] **Step 5: Commit**

```bash
git add portfolio/pages/ portfolio/styles.css portfolio/test/pages-assembly.test.mjs
git commit -m "feat(portfolio): assemble full page order"
```

---

### Task 8: Curate photos and produce the first PDF

**Files:**
- Create: `portfolio/prepare-photos.mjs`, `portfolio/photos/*.jpg`, `portfolio/README.md`
- Modify: `portfolio/content.mjs` (only if a curated filename differs from what Task 2 declared)

**Interfaces:**
- Consumes: `imageInfo` (Task 1), content (Task 2).
- Produces: `node portfolio/prepare-photos.mjs` — copies chosen source images into `portfolio/photos/` resized to 1800 px on the long side, JPEG quality 82.

Source files, taken from the 2026-08-03 audit. Every one is ≥ 1400 px on its shortest side:

| Target | Source |
|---|---|
| `mampang-01.jpg` | `photos-src/Bangka Mampang/Recreate_this_photograph_at_professional_202606212110.jpeg` |
| `mampang-02.jpg` | `photos-src/Bangka Mampang/Recreate_this_photograph_at_professional_202606212111.jpeg` |
| `mampang-03.jpg` | `photos-src/Bangka Mampang/Recreate_this_photograph_at_professional_202606212112.jpeg` |
| `mampang-04.jpg` | `photos-src/Bangka Mampang/Recreate_this_photograph_at_professional_202606212113.jpeg` |
| `mampang-05.jpg` | `photos-src/Bangka Mampang/Recreate_this_photograph_at_professional_202606212114.jpeg` |
| `goldcoast-01.jpg` | `photos-src/GoldCoast/Recreate_this_photograph_at_professional_202606212150.jpeg` (construction, `jenis: 'proses'`) |
| `goldcoast-render-01.jpg` | `photos-src/GoldCoast/This_image_is_already_correct_202606212117.jpeg` (render) |
| `bozz-01.jpg` | `photos-src/Bozz Billiard Citra 8/Recreate_this_photograph_at_professional_202606212157.jpeg` |
| `bozz-02.jpg` | `photos-src/Bozz Billiard Citra 8/Recreate_this_photograph_at_professional_202606212158.jpeg` |

- [ ] **Step 1: Open each source image and confirm its `jenis`**

Look at all nine images before writing the mapping. Classify by what is visible, not by filename: staged supercars, flawless landscaping, and impossible lighting mean `render`; scaffolding, workers, or bare concrete mean `proses`; a finished, lived-in room or facade means `foto`. Correct `content.mjs` if any classification in Task 2 turns out wrong. Getting this wrong is the one error in this project that damages the customer relationship.

- [ ] **Step 2: Write the photo preparation script**

```js
// portfolio/prepare-photos.mjs
/**
 * Menyalin foto terpilih ke portfolio/photos dengan ukuran siap cetak.
 * Jalankan ulang bila daftar SUMBER berubah.
 *
 *   node portfolio/prepare-photos.mjs
 */
import sharp from 'sharp'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { imageInfo } from './lib/photos.mjs'

const here = path.dirname(fileURLToPath(import.meta.url))
const repo = path.join(here, '..')
const OUT = path.join(here, 'photos')
const SISI_PANJANG = 1800

const SUMBER = {
  'mampang-01.jpg': 'photos-src/Bangka Mampang/Recreate_this_photograph_at_professional_202606212110.jpeg',
  'mampang-02.jpg': 'photos-src/Bangka Mampang/Recreate_this_photograph_at_professional_202606212111.jpeg',
  'mampang-03.jpg': 'photos-src/Bangka Mampang/Recreate_this_photograph_at_professional_202606212112.jpeg',
  'mampang-04.jpg': 'photos-src/Bangka Mampang/Recreate_this_photograph_at_professional_202606212113.jpeg',
  'mampang-05.jpg': 'photos-src/Bangka Mampang/Recreate_this_photograph_at_professional_202606212114.jpeg',
  'goldcoast-01.jpg': 'photos-src/GoldCoast/Recreate_this_photograph_at_professional_202606212150.jpeg',
  'goldcoast-render-01.jpg': 'photos-src/GoldCoast/This_image_is_already_correct_202606212117.jpeg',
  'bozz-01.jpg': 'photos-src/Bozz Billiard Citra 8/Recreate_this_photograph_at_professional_202606212157.jpeg',
  'bozz-02.jpg': 'photos-src/Bozz Billiard Citra 8/Recreate_this_photograph_at_professional_202606212158.jpeg',
}

await fs.mkdir(OUT, { recursive: true })
for (const [tujuan, asal] of Object.entries(SUMBER)) {
  const src = path.join(repo, asal)
  const { printClass, width, height } = await imageInfo(src)
  if (printClass === 'unusable') {
    console.error(`LEWATI ${tujuan}: ${width}x${height} terlalu kecil untuk dicetak`)
    continue
  }
  await sharp(src)
    .resize(SISI_PANJANG, SISI_PANJANG, { fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(path.join(OUT, tujuan))
  console.log(`${tujuan}  <- ${path.basename(asal)}  (${printClass})`)
}
```

- [ ] **Step 3: Run it and check the results**

Run: `node portfolio/prepare-photos.mjs && ls -la portfolio/photos/`
Expected: eight files written, none reported as skipped.

Every filename in `SUMBER` must match `content.mjs` exactly. Any mismatch fails the build — `findMissingPhotos` reports it by name.

- [ ] **Step 4: Build the draft PDF and look at every page**

Run: `node portfolio/build.mjs --draft`
Expected: prints `OK <n> halaman <size> MB`, size under 8 MB.

Then render each page to inspect it:

```bash
qlmanage -t -s 1400 -o /tmp/pf Arsana-Company-Profile.pdf
```

Check: no text overflowing its page, no stretched photos, page numbers on every page except cover and dividers, renders only in the Visualisasi Desain section.

- [ ] **Step 5: Write the README**

```markdown
<!-- portfolio/README.md -->
# Company Profile Arsana

PDF portofolio yang dibuat ulang dari data, bukan didesain manual.

## Membuat PDF

    node portfolio/build.mjs            # gagal bila masih ada penanda [ISI: ...]
    node portfolio/build.mjs --draft    # abaikan penanda, untuk mengintip hasil

Hasilnya `Arsana-Company-Profile.pdf` di akar repo.

## Mengganti foto

1. Simpan foto baru dengan nama berkas yang sama di `portfolio/photos/`
2. Jalankan `node portfolio/build.mjs`

Untuk menambah foto: taruh sumbernya di `photos-src/`, tambahkan barisnya di
`portfolio/prepare-photos.mjs`, jalankan skrip itu, lalu daftarkan nama
berkasnya di `portfolio/content.mjs`.

Halaman proyek menyesuaikan sendiri: 4 foto atau lebih jadi dua halaman,
1–3 foto jadi satu halaman, tanpa foto jadi halaman bertanda slot kosong.

## Mengubah teks

Semua kalimat ada di `portfolio/content.mjs`. Layout tidak perlu disentuh.

## Aturan yang dijaga otomatis

- Penanda `[ISI: ...]` menggagalkan build, supaya dokumen setengah jadi tidak
  terkirim ke customer
- Foto berjenis `render` hanya boleh di `visualisasiDesain`, tidak boleh
  tampil seolah-olah hasil jadi
- Foto yang disebut di `content.mjs` tapi berkasnya tidak ada menggagalkan build

## Tes

    node --test portfolio/test/
```

- [ ] **Step 6: Run the whole test suite**

Run: `node --test portfolio/test/`
Expected: all tests pass.

- [ ] **Step 7: Commit**

```bash
git add portfolio/prepare-photos.mjs portfolio/photos portfolio/README.md portfolio/content.mjs Arsana-Company-Profile.pdf
git commit -m "feat(portfolio): curate photos and build first PDF"
```

---

### Task 9: Review pass and handover

**Files:**
- Modify: `portfolio/content.mjs`, `portfolio/styles.css` as the visual review requires

- [ ] **Step 1: Render every page as an image and review it**

```bash
node portfolio/build.mjs --draft
qlmanage -t -s 1600 -o /tmp/pf-review Arsana-Company-Profile.pdf
```

Review each page against these checks:
- Cover photo is a real photograph, never a render
- No line of text sits closer than 15 mm to any page edge
- Every photo fills its frame without distortion
- The Visualisasi Desain divider appears before any render
- Placeholder blocks are visibly marked, impossible to mistake for finished copy

- [ ] **Step 2: Verify the placeholder guard actually blocks a real build**

Run: `node portfolio/build.mjs`
Expected: exits non-zero, lists every `[ISI: ...]` path, writes no PDF.

- [ ] **Step 3: Verify the render guard blocks a real mistake**

Temporarily change `goldcoast-render-01.jpg`'s entry to `jenis: 'foto'` inside `visualisasiDesain`, then run `node portfolio/build.mjs --draft`.
Expected: exits non-zero with `SALAH TEMPAT`. Revert the change afterwards.

- [ ] **Step 4: Copy the draft to Downloads for the user to review**

```bash
cp Arsana-Company-Profile.pdf ~/Downloads/Arsana-Company-Profile-DRAFT.pdf
```

- [ ] **Step 5: Commit and push**

```bash
git add -A portfolio Arsana-Company-Profile.pdf
git commit -m "chore(portfolio): review pass on first draft"
git push origin main
```

- [ ] **Step 6: Report to the user**

Tell them exactly which data is still needed, quoting the paths the validator printed, plus which projects still need photographs.

---

## Data still owed by the user

The build stays in `--draft` mode until all of these arrive:

1. Nama resmi badan usaha, tahun berdiri, alamat kantor
2. Jumlah proyek selesai, tahun pengalaman, total m² dikerjakan
3. Kontak resmi — WhatsApp, email, Instagram
4. Data proyek Puri Garden Casco dan Citra 1 Ext — lokasi, tahun, durasi, lingkup, cerita
5. Foto untuk kedua proyek itu, dan foto ulang untuk Gold Coast dan Bozz Billiard

Also confirm whether `photos-src/Proyek Baru/` (8 WhatsApp photos, 1200×1600) belongs to one of those two projects.
