'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Budi S.',
    project: 'Renovasi Rumah 2 Lantai',
    location: 'Jakarta Selatan',
    rating: 5,
    text: 'Pekerjaannya rapi dan progress selalu dikabari. Kalau ada perubahan biaya, dijelaskan dulu sebelum dikerjakan. Tidak ada kejutan di akhir proyek.',
  },
  {
    name: 'Dinda R.',
    project: 'Bangun Rumah Baru',
    location: 'Jakarta Timur',
    rating: 5,
    text: 'Tim membantu dari awal pembuatan estimasi sampai finishing. Proses lebih tenang karena ada laporan mingguan via WhatsApp, bisa pantau dari kantor.',
  },
  {
    name: 'Hendra W.',
    project: 'Renovasi Total Ruko',
    location: 'Jakarta Barat',
    rating: 5,
    text: 'Komunikasi jelas dan hasil akhir sesuai arahan desain. Jadwal pekerjaan juga diinformasikan bertahap, tidak ada yang di-skip tanpa konfirmasi.',
  },
  {
    name: 'Sari M.',
    project: 'Interior Kantor',
    location: 'Jakarta Pusat',
    rating: 5,
    text: 'RAB-nya detail banget, saya jadi tahu persis biaya tiap item. Sistem pembayaran bertahap juga sangat membantu cash flow. Rekomen banget.',
  },
  {
    name: 'Fajar T.',
    project: 'Renovasi Dapur & Kamar Mandi',
    location: 'Tangerang Selatan',
    rating: 5,
    text: 'Survey lokasi cepat, estimasi keluar 2 hari setelah survey. Yang paling saya suka, progres dikabari rutin tanpa harus saya tanya duluan.',
  },
  {
    name: 'Yanti K.',
    project: 'Bangun Rumah 1 Lantai',
    location: 'Depok',
    rating: 5,
    text: 'Awalnya takut proyek molor, tapi ternyata selesai sesuai jadwal. Ada catatan progres mingguan lengkap dengan foto. Kontraknya juga jelas dan rinci.',
  },
]

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
      ))}
    </div>
  )
}

export function Testimonials() {
  const col1 = testimonials.slice(0, 2)
  const col2 = testimonials.slice(2, 4)
  const col3 = testimonials.slice(4, 6)

  return (
    <section className="bg-stone-950 py-24 overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center border border-stone-700 py-1 px-4 rounded-lg text-stone-400 text-sm mb-6">
            Testimoni Klien
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight">
            Kata Mereka yang Sudah
            <br />
            <span style={{ color: '#E8A870' }}>Percaya Kami</span>
          </h2>
          <p className="text-stone-400 mt-4 max-w-md mx-auto text-base">
            Review nyata dari klien yang telah menyelesaikan proyek bersama Arsana.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[col1, col2, col3].map((col, colIdx) => (
            <div key={colIdx} className="flex flex-col gap-4">
              {col.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: colIdx * 0.1 + i * 0.07,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  viewport={{ once: true }}
                  className="group relative p-6 rounded-2xl border border-stone-800 bg-stone-900 hover:border-amber-800/60 hover:bg-stone-800/80 transition-all duration-300"
                >
                  <Quote
                    className="absolute top-5 right-5 w-6 h-6 opacity-10 group-hover:opacity-20 transition-opacity"
                    style={{ color: '#E8A870' }}
                  />
                  <div className="mb-4">
                    <StarRating count={t.rating} />
                  </div>
                  <p className="text-stone-300 text-sm leading-relaxed mb-5">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-stone-800">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                      style={{
                        background: 'linear-gradient(135deg, #92400e44, #b4541833)',
                        color: '#E8A870',
                      }}
                    >
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-white text-sm font-semibold leading-none mb-1">{t.name}</p>
                      <p className="text-stone-500 text-xs">{t.project} · {t.location}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
