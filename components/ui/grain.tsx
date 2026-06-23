/**
 * Lapisan film-grain halus di atas seluruh halaman.
 * Memberi tekstur "analog" hangat agar tidak terasa flat/AI-generic.
 * Murni CSS (lihat .grain-overlay di globals.css), tanpa beban render berarti.
 */
export function Grain() {
  return <div aria-hidden className="grain-overlay" />
}
