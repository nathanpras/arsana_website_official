// Satu sumber kebenaran untuk seluruh data kontak & profil Arsana.
// Semua komponen menarik dari sini — jangan tulis ulang nomor/email di komponen.

// Nomor WhatsApp admin, format internasional tanpa "+" atau "0" di depan.
export const WHATSAPP_NUMBER = '6281317640409'

// Versi yang ditampilkan ke pengunjung (enak dibaca).
export const WHATSAPP_DISPLAY = '+62 813-1764-0409'

export const EMAIL = 'arsanaconstruction@gmail.com'

// Tahun Arsana mulai beroperasi. Dipakai untuk menghitung lama pengalaman.
export const FOUNDED_YEAR = 2001

// Dihitung saat build. Angka ikut naik sendiri tiap tahun tanpa perlu diedit.
export const YEARS_EXPERIENCE = new Date().getFullYear() - FOUNDED_YEAR

// Link sosial media. Biarkan '' (string kosong) kalau akunnya belum ada —
// ikonnya otomatis tidak ditampilkan, jadi tidak ada link mati di footer.
export const INSTAGRAM_URL = 'https://www.instagram.com/arsana.idn'
export const FACEBOOK_URL = ''

// Area layanan utama — dipakai di form kontak dan data SEO.
export const SERVICE_AREA = 'Jakarta & Jabodetabek'

// Membentuk link wa.me dengan pesan opsional (otomatis di-encode).
export function waLink(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

// Link mailto dengan subjek opsional.
export function mailLink(subject?: string): string {
  const base = `mailto:${EMAIL}`
  return subject ? `${base}?subject=${encodeURIComponent(subject)}` : base
}
