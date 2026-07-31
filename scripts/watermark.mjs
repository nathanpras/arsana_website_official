/**
 * Pipeline foto Arsana: photos-src/ (master bersih) -> public/projects/ (siap tayang).
 *
 * Setiap foto di-resize, diberi watermark logo Arsana, lalu disimpan sebagai WebP.
 * Script ini idempoten — selalu membaca dari master, jadi aman dijalankan berulang
 * dan watermark tidak pernah menumpuk.
 *
 * Cara pakai:
 *   node scripts/watermark.mjs
 *
 * Mengganti foto proyek: taruh file baru di photos-src/<Nama Proyek>/, jalankan
 * ulang script ini, lalu sesuaikan path di komponen bila nomor urutnya berubah.
 */
import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'

const SRC = 'photos-src'
const OUT = path.join('public', 'projects')
const MANIFEST = path.join('scripts', 'photo-manifest.json')

// Sisi terpanjang foto hasil. Cukup untuk lightbox layar penuh, jauh lebih
// ringan dari master aslinya yang sampai 2752px.
const MAX_EDGE = 1920
const WEBP_QUALITY = 82

// --- Watermark -------------------------------------------------------------
// Logo brand dipakai apa adanya, hanya diubah jadi putih solid supaya terbaca
// di atas foto terang maupun gelap. Drop-shadow tipis menjaga kontras.
const LOGO_VIEWBOX = { w: 1597, h: 446 }
const SHADOW_PAD = 70

const logoInner = fs
  .readFileSync(path.join('public', 'logo.svg'), 'utf8')
  .replace(/^[\s\S]*?<svg[^>]*>/, '')
  .replace(/<\/svg>\s*$/, '')
  .replace(/fill="#271810"/g, 'fill="#FFFFFF"')
  .replace(/fill="#A37510"/g, 'fill="#FFFFFF"')

const watermarkSvg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg"
    viewBox="${-SHADOW_PAD} ${-SHADOW_PAD} ${LOGO_VIEWBOX.w + SHADOW_PAD * 2} ${LOGO_VIEWBOX.h + SHADOW_PAD * 2}">
    <defs>
      <filter id="sh" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="8" stdDeviation="16" flood-color="#000" flood-opacity="0.65"/>
      </filter>
    </defs>
    <g filter="url(#sh)" opacity="0.9">${logoInner}</g>
  </svg>`)

// Lebar watermark ikut lebar foto, dibatasi agar tidak mungil di foto kecil
// dan tidak mendominasi di foto besar.
const markWidthFor = (imgW) => Math.round(Math.min(Math.max(imgW * 0.19, 230), 520))

const slug = (s) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

async function processPhoto(srcPath, outPath) {
  // Resize dulu, watermark belakangan — supaya watermark tetap tajam dan
  // proporsinya konsisten di semua foto berapa pun ukuran aslinya.
  const resized = await sharp(srcPath)
    .rotate() // hormati orientasi EXIF (foto dari HP)
    .resize(MAX_EDGE, MAX_EDGE, { fit: 'inside', withoutEnlargement: true })
    .toBuffer()

  const { width, height } = await sharp(resized).metadata()
  const mark = await sharp(watermarkSvg, { density: 600 })
    .resize({ width: markWidthFor(width) })
    .png()
    .toBuffer()
  const m = await sharp(mark).metadata()
  const margin = Math.round(width * 0.025)

  await sharp(resized)
    .composite([{ input: mark, top: height - m.height - margin, left: width - m.width - margin }])
    .webp({ quality: WEBP_QUALITY })
    .toFile(outPath)

  return { width, height, bytes: fs.statSync(outPath).size }
}

// --- Jalan -----------------------------------------------------------------
const isImage = (f) => /\.(jpe?g|png|webp)$/i.test(f)

const folders = fs
  .readdirSync(SRC)
  .filter((d) => fs.statSync(path.join(SRC, d)).isDirectory())
  .sort()

const manifest = {}
let count = 0
let srcBytes = 0
let outBytes = 0

for (const folder of folders) {
  const files = fs.readdirSync(path.join(SRC, folder)).filter(isImage).sort()
  if (!files.length) continue

  const outDir = path.join(OUT, slug(folder))
  fs.mkdirSync(outDir, { recursive: true })

  for (let i = 0; i < files.length; i++) {
    const srcPath = path.join(SRC, folder, files[i])
    const name = String(i + 1).padStart(2, '0') + '.webp'
    const outPath = path.join(outDir, name)

    const r = await processPhoto(srcPath, outPath)
    srcBytes += fs.statSync(srcPath).size
    outBytes += r.bytes
    count++

    // Kunci manifest = path master, nilai = URL publik yang dipakai komponen.
    manifest[`${folder}/${files[i]}`] = `/projects/${slug(folder)}/${name}`
  }
  console.log(`${folder.padEnd(30)} ${files.length} foto -> ${slug(folder)}/`)
}

fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + '\n')

const mb = (b) => (b / 1048576).toFixed(1) + ' MB'
console.log(`\n${count} foto diproses`)
console.log(`master ${mb(srcBytes)} -> tayang ${mb(outBytes)}`)
console.log(`manifest: ${MANIFEST}`)
