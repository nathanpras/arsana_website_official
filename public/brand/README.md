# Aset Brand Arsana

Logo vector hasil trace ulang dari artwork asli. Semua SVG di sini kurva murni
(bukan PNG yang dibungkus SVG), jadi tetap tajam di ukuran berapa pun.

## Warna

| Peran | Hex | Dipakai untuk |
|---|---|---|
| Gold | `#AF8431` | monogram + wordmark ARSANA |
| Ink | `#241812` | tagline "Design · Build · Elevate." |
| Cream | `#F6F3EE` | background brand |

Nilai yang sama tersedia mesin-baca di [`brand.json`](./brand.json).

## Lockup

| Nama | Rasio | Pakai kapan |
|---|---|---|
| `arsana-landscape` | 3.20 : 1 | header website, kop surat, banner, email signature |
| `arsana-portrait` | 1.13 : 1 | feed sosial media, poster, stempel dokumen |
| `arsana-wordmark` | 3.37 : 1 | kalau monogram sudah tampil terpisah di dekatnya |
| `arsana-monogram` | 1 : 1 | avatar, favicon, watermark, pojok video |

## Varian warna

- `nama.svg` — warna brand, background transparan. Untuk background terang.
- `nama-dark.svg` — monogram/wordmark gold, tagline cream. Untuk background gelap.
- `nama-white.svg` — putih semua. Untuk di atas foto atau background ramai.

PNG transparan ikut disertakan untuk platform yang tidak menerima SVG
(monogram 512 & 1024 px, lockup lain 1600–2400 px sisi panjang).

## Catatan

- Teks sudah jadi outline, bukan font hidup — tidak bisa diedit sebagai teks.
- File lama `public/logo.svg` dan `public/favicon.svg` sengaja tidak diubah.
  Kalau mau website pakai aset di folder ini, arahkan `LOGO_SRC` di
  `components/ui/brand.tsx` ke `/brand/arsana-landscape.svg`.
- Untuk cetak besar atau brand guideline resmi, file master dari desainer
  (`.ai`/`.svg` asli) tetap lebih baik dari hasil trace ini.
