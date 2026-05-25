'use client'

import { motion } from 'framer-motion'
import { MessageSquare, Search, FileText, PenLine, HardHat, BarChart2, CheckCircle } from 'lucide-react'
import { GridBackground } from '@/components/ui/grid-background'

const steps = [
  {
    icon: MessageSquare,
    title: 'Konsultasi',
    description: 'Cek kebutuhan, lokasi, tipe proyek, dan prioritas Anda. Bisa via WhatsApp atau tatap muka — gratis.',
  },
  {
    icon: Search,
    title: 'Survey Lokasi',
    description: 'Tim kami ukur kondisi lapangan, identifikasi pekerjaan penting, dan catat detail teknis di lokasi.',
  },
  {
    icon: FileText,
    title: 'RAB & Desain',
    description: 'Estimasi biaya rinci, lingkup pekerjaan, spesifikasi material, dan timeline disusun secara tertulis.',
  },
  {
    icon: PenLine,
    title: 'Kesepakatan',
    description: 'Kontrak kerja ditandatangani kedua pihak. Jadwal, termin pembayaran, dan garansi semua tercantum.',
  },
  {
    icon: HardHat,
    title: 'Pengerjaan',
    description: 'Eksekusi bertahap sesuai jadwal yang disepakati dengan quality control dan dokumentasi di setiap fase.',
  },
  {
    icon: BarChart2,
    title: 'Laporan Progres',
    description: 'Update foto dan video pekerjaan dikirim rutin via WhatsApp. Anda bisa pantau kapan saja dari mana saja.',
  },
  {
    icon: CheckCircle,
    title: 'Serah Terima',
    description: 'Pengecekan hasil bersama, catatan perbaikan jika ada, dan garansi resmi sesuai kesepakatan kontrak.',
  },
]

export function ProcessSteps() {
  return (
    <GridBackground patternId="process">
      <section className="py-24">
        <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-12"
        >
          <div className="flex justify-center">
            <div className="border border-border py-1 px-4 rounded-lg text-muted-foreground text-sm">
              Proses Kerja
            </div>
          </div>
          <h2
            className="text-3xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent"
            style={{ backgroundImage: 'linear-gradient(105deg, #271810 0%, #7A3A18 50%, #B05030 100%)' }}
          >
            Dari Konsultasi ke Serah Terima
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            7 langkah terstruktur dan transparan — dari obrolan pertama sampai Anda pegang kunci proyek selesai.
          </p>
        </motion.div>

        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-8">
            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center text-center gap-4"
                >
                  <div className="relative z-10 w-16 h-16 rounded-full border border-border bg-card flex items-center justify-center hover:border-primary/60 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                    <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="mt-14 text-center"
        >
          <p className="text-muted-foreground text-sm mb-4">Mau mulai dari konsultasi dulu?</p>
          <a
            href="#kontak"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-foreground text-sm font-medium hover:border-primary/60 hover:bg-primary/5 transition-all duration-300"
          >
            Mulai dari Konsultasi
          </a>
        </motion.div>
        </div>
      </section>
    </GridBackground>
  )
}
