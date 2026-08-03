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

| Hal. | Isi | Sumber data |
|---|---|---|
| 1 | Sampul — logo, tagline, satu foto proyek terkuat | brand + foto |
| 2 | Pembuka — Arsana dalam 3 kalimat | ditulis, perlu review user |
| 3 | Tentang — legalitas, tahun berdiri, alamat kantor | **penanda, user isi** |
| 4 | Angka — proyek selesai, tahun pengalaman, luas dikerjakan | **penanda, user isi** |
| 5 | Layanan — bangun baru, renovasi, casco, interior, komersial | ditulis |
| 6 | Cara kerja — konsultasi → serah terima | ditulis |
| 7–16 | 5 proyek andalan × 2 halaman | foto + data proyek |
| 17 | Proyek lain — daftar teks, **tanpa foto** | photos-archive |
| 18 | Penutup — ajakan konsultasi, kontak, QR ke website | **penanda, user isi** |

### Halaman proyek (pola 2 halaman)

- **Halaman kiri:** satu foto besar full-bleed, tanpa bingkai. Nama proyek
  ditempatkan di area foto yang paling kosong.
- **Halaman kanan:** data proyek (lokasi, tahun, durasi, lingkup kerja),
  paragraf singkat 2–3 kalimat, dan 2–3 foto pendukung ukuran kecil.

### Halaman 17 — Proyek lain

Daftar teks murni: nama proyek, lokasi, tahun, lingkup. Disusun seperti indeks
buku. Tidak memuat foto sama sekali — foto proyek-proyek ini kualitasnya tidak
layak portofolio. Tujuannya menunjukkan jam terbang, bukan memamerkan hasil.

## 5 proyek andalan

| # | Proyek | Foto | Data |
|---|---|---|---|
| 1 | Gold Coast PIK | ada di repo | ada di `portfolio.tsx` |
| 2 | Puri Garden Casco | **belum ada** | **belum ada** |
| 3 | Citra 1 Ext | **belum ada** | **belum ada** |
| 4 | Bangka Mampang, Jaksel | ada di repo | ada di `portfolio.tsx` |
| 5 | Bozz Billiard | ada di repo | ada di `portfolio.tsx` |

Proyek 2 dan 3 belum pernah masuk repo. Nama mirip dengan proyek yang ada
("Puri Metland", "Citra 2 Ext") tapi user memastikan ini proyek berbeda.
Sampai fotonya dikirim, kedua halaman ini memakai penanda visual yang jelas.

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
  content.ts      semua teks & data proyek — satu file, user bisa edit sendiri
  template/       layout HTML + CSS cetak
  photos/         foto terpilih, nama file eksplisit (goldcoast-01.jpg)
  build.mjs       node portfolio/build.mjs → Arsana-Company-Profile.pdf
```

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
| Foto repo resolusinya kurang untuk cetak A4 | Cek resolusi tiap foto sebelum dipakai; yang kurang dipakai ukuran kecil saja, jangan full-bleed |
| Font serif yang cocok tidak tersedia | Cek ketersediaan di awal implementasi; siapkan pilihan cadangan |
| Ukuran PDF terlalu besar untuk WhatsApp (batas 100 MB, wajar di bawah 10 MB) | Kompres foto saat build, target akhir di bawah 8 MB |
| Dokumen terkirim dengan penanda masih terisi | Build gagal dengan pesan jelas kalau ada penanda tersisa, kecuali dijalankan dengan flag draft |
