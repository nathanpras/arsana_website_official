// Satu sumber kebenaran untuk kontak WhatsApp Arsana.
// GANTI nomor di bawah dengan nomor WhatsApp asli (format internasional tanpa "+" atau "0" di depan).
// Contoh: nomor 0812-3456-7890  ->  '6281234567890'
export const WHATSAPP_NUMBER = '6281234567890'

// Link sosial media Arsana. GANTI dengan URL profil asli.
// Biarkan '#' jika belum ada — ikon tetap tampil tapi tidak mengarah ke mana pun.
export const INSTAGRAM_URL = '#'
export const FACEBOOK_URL = '#'

// Membentuk link wa.me dengan pesan opsional (otomatis di-encode).
export function waLink(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}
