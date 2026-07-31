/**
 * Membuat gambar preview link (Open Graph) 1200x630 di public/og-image.jpg.
 * Inilah yang tampil saat link arsana.id dibagikan ke WhatsApp, Instagram,
 * atau Facebook. Jalankan ulang bila foto latar atau tagline berubah.
 *
 *   node scripts/og-image.mjs
 */
import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'

const W = 1200
const H = 630
const BG = path.join('photos-src', 'GoldCoast', 'This_image_is_already_correct_202606212117.jpeg')
const OUT = path.join('public', 'og-image.jpg')

const logoInner = fs
  .readFileSync(path.join('public', 'logo.svg'), 'utf8')
  .replace(/^[\s\S]*?<svg[^>]*>/, '')
  .replace(/<\/svg>\s*$/, '')
  .replace(/fill="#271810"/g, 'fill="#FFFFFF"')
  .replace(/fill="#A37510"/g, 'fill="#FFFFFF"')

// Foto dipotong ke rasio OG, lalu digelapkan agar logo putih menonjol.
const bg = await sharp(BG).resize(W, H, { fit: 'cover', position: 'attention' }).toBuffer()

const scrim = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="#140C06" stop-opacity="0.55"/>
      <stop offset="45%"  stop-color="#140C06" stop-opacity="0.72"/>
      <stop offset="100%" stop-color="#140C06" stop-opacity="0.92"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <rect x="0" y="${H - 6}" width="${W}" height="6" fill="#C46830"/>
</svg>`)

const LOGO_W = 620
const logo = await sharp(
  Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1597 446">
     <g>${logoInner}</g>
   </svg>`),
  { density: 600 }
)
  .resize({ width: LOGO_W })
  .png()
  .toBuffer()
const logoMeta = await sharp(logo).metadata()

const caption = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="120">
  <text x="${W / 2}" y="44" text-anchor="middle"
        font-family="Georgia, 'Times New Roman', serif" font-size="30" fill="#F0DCC4"
        letter-spacing="1.5">Bangun &amp; Renovasi — Proses Jelas, Hasil Transparan</text>
  <text x="${W / 2}" y="92" text-anchor="middle"
        font-family="Georgia, 'Times New Roman', serif" font-size="23" fill="#C9A882"
        letter-spacing="4.5">JAKARTA · JABODETABEK</text>
</svg>`)

const logoTop = Math.round(H / 2 - logoMeta.height / 2 - 58)

await sharp(bg)
  .composite([
    { input: scrim, top: 0, left: 0 },
    { input: logo, top: logoTop, left: Math.round((W - LOGO_W) / 2) },
    { input: caption, top: logoTop + logoMeta.height + 26, left: 0 },
  ])
  .jpeg({ quality: 90 })
  .toFile(OUT)

console.log(`${OUT} ${W}x${H} (${(fs.statSync(OUT).size / 1024).toFixed(0)} KB)`)
