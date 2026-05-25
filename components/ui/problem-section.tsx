'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Clock, Eye, Target, FileX, ShieldOff } from 'lucide-react'

const problems = [
  {
    icon: TrendingUp,
    title: 'Biaya Membengkak',
    short: 'RAB berubah tiba-tiba tanpa penjelasan di akhir proyek.',
    color: '#E8A870',
    bg: 'from-amber-500/10 to-orange-500/5',
    delay: 0,
  },
  {
    icon: Clock,
    title: 'Proyek Molor',
    short: 'Jadwal mundur terus, kontraktor susah dihubungi.',
    color: '#C4A882',
    bg: 'from-stone-400/10 to-stone-500/5',
    delay: 0.08,
  },
  {
    icon: Eye,
    title: 'Tidak Sempat Mengawasi',
    short: 'Sibuk bekerja, tidak bisa hadir setiap hari di lokasi.',
    color: '#D4956A',
    bg: 'from-orange-400/10 to-amber-400/5',
    delay: 0.16,
  },
  {
    icon: Target,
    title: 'Hasil Meleset',
    short: 'Desain bagus di gambar, tapi kenyataan jauh dari harapan.',
    color: '#B8A090',
    bg: 'from-stone-500/10 to-stone-400/5',
    delay: 0.24,
  },
  {
    icon: FileX,
    title: 'Proses Tidak Jelas',
    short: 'Tidak ada RAB rinci, kontrak kabur, pembayaran tidak terstruktur.',
    color: '#E8A870',
    bg: 'from-amber-400/10 to-orange-300/5',
    delay: 0.32,
  },
  {
    icon: ShieldOff,
    title: 'Susah Dipercaya',
    short: 'Banyak pilihan, tapi sulit bedakan yang profesional.',
    color: '#C4A882',
    bg: 'from-stone-300/10 to-stone-400/5',
    delay: 0.40,
  },
]

const iconAnimations = [
  { y: [0, -6, 0], duration: 3.2 },
  { y: [0, 5, 0], duration: 2.8 },
  { y: [0, -5, 0], duration: 3.6 },
  { y: [0, 6, 0], duration: 3.0 },
  { y: [0, -4, 0], duration: 2.6 },
  { y: [0, 5, 0], duration: 3.4 },
]

export function ProblemSection() {
  return (
    <section className="bg-background py-20 overflow-hidden">
      <div className="container mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center border border-border py-1 px-4 rounded-lg text-muted-foreground text-sm mb-5">
            Kami Mengerti
          </div>
          <h2
            className="text-3xl md:text-5xl font-bold tracking-tight max-w-2xl mx-auto leading-tight"
            style={{
              backgroundImage: 'linear-gradient(105deg, #1C1814 0%, #7A3A18 50%, #B05030 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Kenapa Banyak Orang Takut Salah Pilih Kontraktor?
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {problems.map((p, i) => {
            const Icon = p.icon
            const anim = iconAnimations[i]
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 32, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.55,
                  delay: p.delay,
                  ease: [0.16, 1, 0.3, 1],
                }}
                viewport={{ once: true, amount: 0.2 }}
                className={`group relative rounded-2xl border border-border bg-gradient-to-br ${p.bg} p-5 hover:border-border/80 hover:shadow-sm transition-all duration-300 overflow-hidden`}
              >
                {/* Animated glow blob */}
                <motion.div
                  className="absolute -top-6 -right-6 w-20 h-20 rounded-full blur-2xl opacity-30"
                  style={{ background: p.color }}
                  animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.35, 0.2] }}
                  transition={{ duration: 4 + i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
                />

                {/* Animated icon */}
                <motion.div
                  className="mb-4 inline-flex"
                  animate={{ y: anim.y }}
                  transition={{ duration: anim.duration, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{ background: `${p.color}18` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: p.color }} strokeWidth={1.8} />
                  </div>
                </motion.div>

                <h3 className="font-semibold text-foreground text-sm mb-1.5 leading-snug">
                  {p.title}
                </h3>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  {p.short}
                </p>
              </motion.div>
            )
          })}
        </div>

        {/* Answer strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="mt-6 p-6 rounded-2xl border border-primary/20 bg-primary/5"
        >
          <p className="text-foreground text-base md:text-lg font-medium leading-relaxed">
            Arsana dibangun untuk menjawab semua kekhawatiran ini — dengan{' '}
            <span className="text-primary font-semibold">proses terstruktur, RAB tertulis, laporan progres rutin,</span>{' '}
            dan komunikasi terbuka dari awal hingga serah terima.
          </p>
        </motion.div>

      </div>
    </section>
  )
}
