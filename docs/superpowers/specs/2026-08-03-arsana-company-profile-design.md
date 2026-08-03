# Company Profile Arsana — Desain

Tanggal: 2026-08-03

## Tujuan

PDF company profile resmi untuk disajikan ke calon customer. Satu dokumen
serba guna: dikirim via WhatsApp/email sebelum ketemu, ditinggal setelah survey,
dan bisa dicetak.

Ukuran keberhasilan: calon customer yang membuka dokumen ini percaya Arsana
sanggup mengerjakan rumah kelas menengah-atas, dan mau lanjut ke konsultasi.

## Keputusan yang sudah diambil

| Hal | Keputusan | Alasan |
|---|---|---|
| Bentuk | PDF A4 portrait, 18 halaman | Bisa dikirim, disimpan, dan dicetak |
| Cara buat | Template HTML/CSS → PDF via Chrome headless | Foto akan diganti; biaya update harus murah |
| Gaya | Editorial elegan | Cocok dengan logo klasik-minimalis; memaafkan foto tidak sempurna |
| Bahasa | Indonesia | Semua customer lokal |
| Proyek ditampilkan | 5 andalan, masing-masing 2 halaman | Sedikit proyek, jadi tiap proyek harus berkesan |
| Testimoni | Tidak masuk | Data belum ada |
| Harga | Tidak masuk | Data belum ada |

## Struktur dokumen

Jumlah halaman menyesuaikan stok foto (lihat "Halaman proyek adaptif").
Saat ini sekitar 15 halaman, tumbuh ke 18–20 setelah foto baru masuk.

| Hal. | Isi | Sumber data |
|---|---|---|
| 1 | Sampul — logo, tagline, satu foto nyata terkuat | brand + foto |
| 2 | Pembuka — Arsana dalam 3 kalimat | ditulis, perlu review user |
| 3 | Tentang — legalitas, tahun berdiri, alamat kantor | **penanda, user isi** |
| 4 | Angka — proyek selesai, tahun pengalaman, luas dikerjakan | **penanda, user isi** |
| 5 | Layanan — bangun baru, renovasi, casco, interior, komersial | ditulis |
| 6 | Cara kerja — konsultasi → serah terima | ditulis |
| 7 | Pembatas bagian — "Karya Terbangun" | — |
| 8–… | Proyek terbangun, adaptif 1–2 halaman per proyek | foto nyata |
| … | Pembatas bagian — "Visualisasi Desain" | — |
| … | Render / visualisasi desain | render |
| … | Proyek lain — daftar teks, **tanpa foto** | photos-archive |
| akhir | Penutup — ajakan konsultasi, kontak, QR ke website | **penanda, user isi** |

### Pemisahan karya terbangun dan visualisasi desain

Isi `photos-src/` bercampur tiga jenis: foto hasil jadi, foto proses konstruksi,
dan render 3D. Contoh nyata: `GoldCoast/This_image_is_already_correct_*.jpeg`
adalah render (mobil sport tertata, patung bersuluh, taman tanpa cacat),
sementara `GoldCoast/Recreate_this_photograph_*.jpeg` foto asli bangunan yang
sama saat masih ada scaffolding.

Render **tidak boleh** tampil seolah-olah hasil jadi. Portofolio ini dipakai
menjual proyek ratusan juta; customer yang datang ke lokasi dan melihat
bangunan aslinya berbeda dari gambar akan merasa dibohongi.

Penanganannya: dua bagian terpisah dengan halaman pembatas sendiri —
**Karya Terbangun** (hanya foto nyata) dan **Visualisasi Desain** (render).
Ini justru memperkuat tagline Design · Build · Elevate.

Tiap foto di `content.mjs` wajib punya field `jenis`:
- `foto` — hasil jadi, boleh full-bleed dan boleh jadi sampul
- `proses` — konstruksi berjalan, dipakai kecil sebagai bukti pengerjaan
- `render` — visualisasi, hanya boleh di bagian Visualisasi Desain

### Halaman proyek adaptif

Pola halaman ditentukan jumlah foto layak cetak yang benar-benar ada:

| Foto layak | Pola |
|---|---|
| ≥ 4 | 2 halaman — kiri full-bleed, kanan data + 3 foto kecil |
| 2–3 | 1 halaman — foto besar di atas, data di bawah |
| 1 | 1 halaman — foto setengah halaman, data di sampingnya |
| 0 | 1 halaman penanda dengan slot foto yang jelas |

Begitu foto baru masuk, pola naik sendiri tanpa mengubah kode.

### Halaman "Proyek lain"

Daftar teks murni: nama proyek, lokasi, tahun, lingkup. Disusun seperti indeks
buku. Tidak memuat foto sama sekali — foto proyek-proyek ini kualitasnya tidak
layak portofolio. Tujuannya menunjukkan jam terbang, bukan memamerkan hasil.

### Halaman 17 — Proyek lain

Daftar teks murni: nama proyek, lokasi, tahun, lingkup. Disusun seperti indeks
buku. Tidak memuat foto sama sekali — foto proyek-proyek ini kualitasnya tidak
layak portofolio. Tujuannya menunjukkan jam terbang, bukan memamerkan hasil.

## 5 proyek andalan

Hasil audit `photos-src/` dan `photos-archive/` (2026-08-03). Semua gambar di
bawah 1400 px sisi terpendek dibuang — isinya thumbnail 200–400 px.

| # | Proyek | Gambar layak cetak | Data |
|---|---|---|---|
| 1 | Gold Coast PIK | 2 (1 foto proses, 1 render) | ada di `portfolio.tsx` |
| 2 | Puri Garden Casco | **0 — belum ada** | **belum ada** |
| 3 | Citra 1 Ext | **0 — belum ada** | **belum ada** |
| 4 | Bangka Mampang, Jaksel | 5 | ada di `portfolio.tsx` |
| 5 | Bozz Billiard | 2 | ada di `portfolio.tsx` |

Total sekitar 9 gambar layak cetak untuk kebutuhan ideal 20. Karena itu pola
halaman dibuat adaptif, bukan dipaksa 2 halaman per proyek.

Proyek 2 dan 3 belum pernah masuk repo. Nama mirip dengan proyek yang ada
("Puri Metland", "Citra 2 Ext") tapi user memastikan ini proyek berbeda.
Sampai fotonya dikirim, kedua halaman ini memakai penanda visual yang jelas.

`photos-src/Proyek Baru/` berisi 8 foto WhatsApp 1200×1600 — di bawah ambang
layak cetak untuk full-bleed, tapi cukup untuk ukuran setengah halaman.
Perlu dicek apakah ini salah satu dari dua proyek yang belum ada datanya.

## Sistem visual

**Warna** — dari `public/brand/brand.json`:
- Cream `#F6F3EE` — dasar halaman
- Gold `#AF8431` — aksen, garis, nomor halaman, judul kecil
- Ink `#241812` — teks isi

**Tipografi** — serif untuk judul (menyambung karakter logo), sans-serif untuk
data dan keterangan.
- Judul: Baskerville, cadangan Hoefler Text lalu Georgia
- Isi & data: Avenir Next, cadangan Helvetica Neue

Ketersediaan dicek di langkah pertama implementasi. Chrome menyertakan font ke
dalam PDF, jadi hasilnya tetap benar di komputer lain.

**Grid** — A4 210×297 mm. Margin luar 18 mm, margin dalam 22 mm supaya aman
kalau dijilid. Kolom tunggal untuk teks, dua kolom untuk data proyek.

**Logo** — pakai aset dari `public/brand/`: `arsana-portrait` di sampul,
`arsana-landscape` kecil di footer halaman isi.

## Sistem produksi

```
portfolio/
  content.mjs     semua teks & data proyek — satu file, user bisa edit sendiri
  pages/          satu modul per jenis halaman
  lib/            audit foto, validasi penanda, helper HTML
  photos/         foto terpilih, nama file eksplisit (goldcoast-01.jpg)
  styles.css      CSS cetak
  build.mjs       node portfolio/build.mjs → Arsana-Company-Profile.pdf
```

JavaScript polos (`.mjs`), bukan TypeScript — mengikuti `scripts/og-image.mjs`
yang sudah ada, dan supaya user bisa mengedit `content.mjs` tanpa tooling.

Alat yang sudah tersedia di repo, tidak perlu dependensi baru:
- **playwright** (devDependency, browser sudah terpasang) — render HTML ke PDF
- **sharp** (dependency) — baca dimensi gambar dan kompres foto saat build
- **node:test** — bawaan Node 24, tidak perlu framework tes tambahan

Terverifikasi lewat percobaan langsung: Chrome menghasilkan A4 presisi
209,9 × 297,0 mm, font Baskerville dan Avenir Next ter-embed ke dalam PDF, dan
warna latar ikut tercetak selama `print-color-adjust: exact` dipasang.
Halaman kosong di akhir dicegah dengan `.page:last-child { break-after: auto }`.

Aturan yang harus dipegang:

- **Teks dan layout terpisah.** Mengubah kalimat tidak boleh menyentuh file
  layout. User harus bisa edit `content.ts` sendiri tanpa takut merusak halaman.
- **Ganti foto = timpa file, nama tetap.** Tidak ada perubahan kode saat foto
  diganti. Nama file dikunci di `content.ts`.
- **Satu perintah menghasilkan PDF final.** Tanpa langkah manual.
- **Penanda harus mencolok.** Data yang belum ada ditulis `[ISI: tahun berdiri]`
  dengan latar berwarna, supaya mustahil terkirim ke customer tanpa sengaja.

## Data yang ditunggu dari user

1. Nama resmi badan usaha, tahun berdiri, alamat kantor
2. Jumlah proyek selesai, tahun pengalaman, total luas dikerjakan
3. Kontak resmi — WA, email, Instagram
4. Data proyek Puri Garden Casco & Citra 1 Ext — lokasi, tahun, durasi, lingkup
5. Foto untuk proyek 2 dan 3, dan foto ulang untuk proyek lain kalau ada

Pekerjaan dimulai tanpa menunggu data ini; semua diisi penanda.

## Di luar lingkup

- Halaman portofolio di website — dibahas setelah PDF jadi dan disetujui
- Testimoni customer — tidak ada datanya
- Kisaran harga / paket — tidak ada datanya
- Versi bahasa Inggris

## Risiko

| Risiko | Penanganan |
|---|---|
| Render tersaji seolah hasil jadi | Field `jenis` wajib di tiap foto; render hanya boleh muncul di bagian Visualisasi Desain, dijaga oleh validator saat build |
| Stok foto layak cetak cuma 9 dari 20 yang ideal | Pola halaman adaptif; dokumen tetap rapi walau tipis, tumbuh sendiri saat foto baru masuk |
| Foto repo resolusinya kurang untuk cetak A4 | Ambang: sisi terpendek ≥ 1400 px baru boleh full-bleed. Sudah diaudit |
| Font serif yang cocok tidak tersedia | Sudah dicek tersedia: Baskerville.ttc dan Avenir Next.ttc ada di sistem |
| Ukuran PDF terlalu besar untuk WhatsApp (batas 100 MB, wajar di bawah 10 MB) | Kompres foto saat build, target akhir di bawah 8 MB |
| Dokumen terkirim dengan penanda masih terisi | Build gagal dengan pesan jelas kalau ada penanda tersisa, kecuali dijalankan dengan flag draft |
