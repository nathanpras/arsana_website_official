'use client'

import { motion } from 'framer-motion'
import { Home, Wrench, Sofa, Building2, ArrowRight, Info } from 'lucide-react'
import { WHATSAPP_NUMBER } from '@/lib/contact'

const estimates = [
  {
    icon: Home,
    title: 'Bangun Rumah',
    subtitle: 'Pembangunan dari nol',
    range: 'Mulai Rp 3–6 jt / m²',
    note: 'Final setelah desain & spesifikasi',
    items: ['Struktur & pondasi', 'Arsitektur & MEP', 'Finishing interior', 'Area luar & landscape'],
    cta: 'Cek Estimasi Awal',
    waMessage: 'Halo%20Arsana%2C%20saya%20ingin%20konsultasi%20proyek%20bangun%20rumah.%20Lokasi%3A%20%5Bkecamatan%5D.%20Perkiraan%20luas%3A%20%5B...%5D%20m%C2%B2.%20Mohon%20bantu%20estimasi%20awal.',
    accent: '#E8A870',
  },
  {
    icon: Wrench,
    title: 'Renovasi Rumah',
    subtitle: 'Ringan, sedang, atau total',
    range: 'Mulai Rp 800rb – 2,5 jt / m²',
    note: 'Tergantung kondisi & lingkup pekerjaan',
    items: ['Renovasi parsial (1–2 ruangan)', 'Renovasi sedang (fasad, layout)', 'Renovasi total (struktur + finishing)', 'Perbaikan darurat & estetika'],
    cta: 'Kirim Foto Lokasi',
    waMessage: 'Halo%20Arsana%2C%20saya%20ingin%20konsultasi%20renovasi%20rumah.%20Lokasi%3A%20%5Bkecamatan%5D.%20Kondisi%3A%20%5Brenovasi%20ringan%2Fsedang%2Ftotal%5D.%20Mohon%20estimasi%20awal.',
    accent: '#C4A882',
    featured: true,
  },
  {
    icon: Sofa,
    title: 'Interior & Fit-Out',
    subtitle: 'Rumah, kantor, komersial',
    range: 'Mulai Rp 1,2–4 jt / m²',
    note: 'Berdasarkan ruangan & material',
    items: ['Custom furniture & kitchen set', 'Partisi, plafon, & lighting', 'Interior rumah tinggal', 'Kantor, kafe, klinik, toko'],
    cta: 'Diskusi Kebutuhan',
    waMessage: 'Halo%20Arsana%2C%20saya%20ingin%20konsultasi%20interior%20%2F%20fit-out.%20Lokasi%3A%20%5Bkecamatan%5D.%20Jenis%3A%20%5Brumah%2Fkantor%2Fkomersial%5D.%20Mohon%20estimasi%20awal.',
    accent: '#D4956A',
  },
  {
    icon: Building2,
    title: 'Bangunan Komersial',
    subtitle: 'Ruko, kantor, cafe, gudang',
    range: 'Estimasi setelah survey',
    note: 'Menyesuaikan fungsi & standar operasional',
    items: ['Ruko & ruang usaha', 'Kafe, restoran, klinik', 'Gudang & bangunan industri', 'Fit-out & renovasi komersial'],
    cta: 'Jadwalkan Survey',
    waMessage: 'Halo%20Arsana%2C%20saya%20ingin%20konsultasi%20proyek%20komersial.%20Jenis%3A%20%5Bruko%2Fkafe%2Fkantor%5D.%20Lokasi%3A%20%5Bkecamatan%5D.%20Mohon%20jadwalkan%20survey.',
    accent: '#B8A090',
  },
]

export function EstimasiBiaya() {
  return (
    <section className="bg-background py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="inline-flex items-center border border-border py-1 px-4 rounded-lg text-muted-foreground text-sm mb-6">
            Estimasi Biaya
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2
              className="text-4xl md:text-6xl font-bold tracking-tight leading-tight max-w-xl"
              style={{
                backgroundImage: 'linear-gradient(105deg, #1C1814 0%, #7A3A18 50%, #B05030 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Berapa Biaya
              <br />Proyek Anda?
            </h2>
            <div className="flex items-start gap-2.5 max-w-sm text-sm text-muted-foreground leading-relaxed">
              <Info className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#D3922F' }} />
              <p>
                Biaya dipengaruhi oleh luas, kondisi lokasi, desain, struktur, dan spesifikasi
                material. Estimasi akhir dibuat setelah survey dan RAB.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {estimates.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                className={`group relative flex flex-col rounded-2xl border bg-card p-6 transition-all duration-300 hover:shadow-lg ${
                  item.featured
                    ? 'border-primary/40 ring-1 ring-primary/20'
                    : 'border-border hover:border-primary/30'
                }`}
              >
                {item.featured && (
                  <div
                    className="absolute -top-3 left-6 text-xs font-semibold px-3 py-1 rounded-full"
                    style={{ background: 'linear-gradient(105deg, #C46830, #E8A870)', color: '#1C1008' }}
                  >
                    Paling Diminati
                  </div>
                )}

                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: `${item.accent}15` }}
                >
                  <Icon className="w-5 h-5" style={{ color: item.accent }} />
                </div>

                <h3 className="font-bold text-foreground text-base mb-0.5">{item.title}</h3>
                <p className="text-xs text-muted-foreground mb-5">{item.subtitle}</p>

                <div
                  className="text-lg font-bold mb-1"
                  style={{ color: item.accent }}
                >
                  {item.range}
                </div>
                <p className="text-xs text-muted-foreground mb-5">{item.note}</p>

                <ul className="flex-1 space-y-2 mb-6">
                  {item.items.map((it, j) => (
                    <li key={j} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <span
                        className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: item.accent }}
                      />
                      {it}
                    </li>
                  ))}
                </ul>

                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${item.waMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold border border-border hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 text-foreground"
                >
                  {item.cta}
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                </a>
              </motion.div>
            )
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center text-xs text-muted-foreground mt-8"
        >
          Semua estimasi bersifat indikatif. RAB akurat disiapkan setelah survey lokasi dan klarifikasi spesifikasi. Tidak ada harga pasti sebelum survey — ini adalah transparansi, bukan kekurangan.
        </motion.p>
      </div>
    </section>
  )
}
