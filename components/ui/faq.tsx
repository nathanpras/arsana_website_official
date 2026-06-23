'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { GridBackground } from '@/components/ui/grid-background'

const faqs = [
  {
    question: 'Bagaimana cara memulai proyek bersama Arsana?',
    answer:
      'Cukup hubungi kami via WhatsApp atau tombol Konsultasi Gratis. Tim kami akan menjadwalkan konsultasi awal untuk memahami kebutuhan, anggaran, dan visi Anda. Setelah itu, kami siapkan proposal, desain, dan RAB dalam 3–5 hari kerja. Tidak ada kewajiban apa pun setelah konsultasi.',
  },
  {
    question: 'Apakah survei lokasi dikenakan biaya?',
    answer:
      'Tidak. Survei lokasi dan konsultasi awal sepenuhnya gratis. Tim kami akan datang ke lokasi untuk mengukur, memahami kondisi lapangan, dan mendiskusikan kebutuhan Anda — tanpa biaya dan tanpa komitmen.',
  },
  {
    question: 'Bagaimana sistem pembayarannya?',
    answer:
      'Pembayaran dilakukan bertahap sesuai progres pekerjaan, bukan dibayar penuh di awal. Umumnya dibagi menjadi 3–4 tahap: DP saat kontrak ditandatangani, cicilan selama pengerjaan, dan pelunasan setelah serah terima. Detail diatur dalam kontrak resmi.',
  },
  {
    question: 'Apakah ada RAB dan kontrak tertulis?',
    answer:
      'Ya, selalu. Sebelum pekerjaan dimulai, kami menyiapkan RAB rinci yang mencantumkan semua item pekerjaan dan biaya. Kontrak kerja resmi ditandatangani kedua pihak dan mencakup lingkup kerja, jadwal, sistem pembayaran, dan garansi.',
  },
  {
    question: 'Berapa lama proses renovasi atau pembangunan berlangsung?',
    answer:
      'Bergantung skala proyek. Renovasi ringan (1–2 ruangan) biasanya 2–4 minggu. Renovasi total 2–4 bulan. Pembangunan baru 4–8 bulan. Jadwal disepakati di awal kontrak dan kami berkomitmen pada timeline tersebut dengan laporan progres rutin.',
  },
  {
    question: 'Bagaimana saya bisa memantau progres proyek?',
    answer:
      'Kami mengirimkan laporan progres rutin via WhatsApp, berisi foto dan update kondisi lapangan. Anda juga bisa mengunjungi lokasi kapan saja. Transparansi adalah prioritas kami — tidak ada yang disembunyikan.',
  },
  {
    question: 'Apakah ada garansi setelah proyek selesai?',
    answer:
      'Ya. Setiap pekerjaan dilindungi garansi resmi yang tercantum dalam kontrak — mencakup perbaikan cacat material dan pengerjaan tanpa biaya tambahan, hingga 2 tahun tergantung lingkup proyek. Durasi garansi disepakati di awal sebelum pekerjaan dimulai.',
  },
  {
    question: 'Wilayah mana saja yang dilayani Arsana?',
    answer:
      'Arsana berpusat di Jakarta dan sekitarnya (Jabodetabek) dan melayani proyek skala apa pun di area ini. Untuk luar daerah seperti Bali dan kota lain, kami terbuka terutama untuk proyek berskala besar — silakan hubungi kami untuk berdiskusi sesuai lingkup dan lokasi proyek.',
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <GridBackground patternId="faq" tone="panel">
    <div className="py-24">
      <div className="container mx-auto px-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-12"
        >
          <div className="flex justify-center">
            <div className="border border-border py-1 px-4 rounded-lg text-muted-foreground text-sm">
              FAQ
            </div>
          </div>
          <h2
            className="text-3xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent"
            style={{ backgroundImage: 'linear-gradient(105deg, #271810 0%, #7A3A18 50%, #B05030 100%)' }}
          >
            Pertanyaan yang Sering Ditanyakan
          </h2>
          <p className="text-muted-foreground">
            Ada pertanyaan? Temukan jawabannya di sini atau hubungi kami langsung.
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="border border-border rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left text-foreground font-medium hover:bg-secondary/40 transition-colors"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  size={18}
                  className={cn(
                    'ml-4 flex-shrink-0 text-muted-foreground transition-transform duration-300',
                    openIndex === i && 'rotate-180'
                  )}
                />
              </button>
              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    key="content"
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-muted-foreground text-sm leading-relaxed border-t border-border">
                      <div className="pt-4">{faq.answer}</div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
    </GridBackground>
  )
}
