'use client'

import { motion } from 'framer-motion'
import { FileText, CreditCard, BarChart2, Camera, ShieldCheck, PenLine } from 'lucide-react'

const trustItems = [
  {
    icon: FileText,
    title: 'RAB Tertulis Sebelum Mulai',
    description: 'Rincian biaya lengkap disiapkan sebelum satu pun pekerjaan dimulai. Tidak ada biaya tersembunyi.',
    tag: 'Transparan',
  },
  {
    icon: PenLine,
    title: 'Kontrak Kerja Resmi',
    description: 'Kontrak mencantumkan hak, kewajiban, jadwal, dan mekanisme pembayaran secara hitam di atas putih.',
    tag: 'Terlindungi',
  },
  {
    icon: CreditCard,
    title: 'Pembayaran Bertahap',
    description: 'Bayar sesuai progres, bukan di muka. Anda tetap punya kontrol penuh atas pengeluaran proyek.',
    tag: 'Terstruktur',
  },
  {
    icon: BarChart2,
    title: 'Laporan Progres Rutin',
    description: 'Update berkala langsung ke WhatsApp Anda — foto, video, dan status per tahap pengerjaan.',
    tag: 'Terpantau',
  },
  {
    icon: Camera,
    title: 'Dokumentasi Lengkap',
    description: 'Setiap fase direkam. Dari kondisi awal, proses pengerjaan, hingga hasil akhir yang diserahterimakan.',
    tag: 'Terdokumentasi',
  },
  {
    icon: ShieldCheck,
    title: 'Garansi Resmi',
    description: 'Garansi cacat material dan pengerjaan hingga 2 tahun. Bukan sekadar janji — tercantum dalam kontrak.',
    tag: 'Dijamin',
  },
]

export function TrustSection() {
  return (
    <section className="bg-stone-950 py-24 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center border border-stone-700 py-1 px-4 rounded-lg text-stone-400 text-sm mb-6">
              Kenapa Arsana
            </div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white max-w-xl leading-tight">
              Kami Kurangi
              <br />
              <span style={{ color: '#E8A870' }}>Risikonya.</span>
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="text-stone-400 max-w-sm text-base leading-relaxed lg:text-right"
          >
            Setiap langkah dirancang agar Anda merasa aman, mendapat kejelasan penuh, dan bisa memantau proyek kapan saja.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {trustItems.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                className="group relative p-6 rounded-2xl border border-stone-800 bg-stone-900 hover:border-amber-800/60 hover:bg-stone-800/80 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-5">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #92400e22, #b4541822)' }}
                  >
                    <Icon className="w-5 h-5" style={{ color: '#E8A870' }} />
                  </div>
                  <span
                    className="text-xs font-medium px-2.5 py-1 rounded-full border"
                    style={{ color: '#E8A870', borderColor: '#92400e60', background: '#92400e15' }}
                  >
                    {item.tag}
                  </span>
                </div>
                <h3 className="font-semibold text-white mb-2 text-base">{item.title}</h3>
                <p className="text-sm text-stone-400 leading-relaxed">{item.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
