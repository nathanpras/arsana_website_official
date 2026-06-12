'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export function FinalCTA() {
  return (
    <section
      className="relative overflow-hidden py-32"
      style={{ background: 'linear-gradient(135deg, #1C1008 0%, #3D1F0A 50%, #1C1008 100%)' }}
    >
      {/* Aurora bercahaya yang mengalir pelan (GPU, hemat) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="cta-aurora cta-aurora-1"
          style={{ background: 'radial-gradient(circle, rgba(196,104,48,0.55), transparent 62%)' }}
        />
        <div
          className="cta-aurora cta-aurora-2"
          style={{ background: 'radial-gradient(circle, rgba(232,168,112,0.40), transparent 62%)' }}
        />
        <div
          className="cta-aurora cta-aurora-3"
          style={{ background: 'radial-gradient(circle, rgba(160,72,40,0.45), transparent 62%)' }}
        />
      </div>

      {/* Vignette agar teks tetap kontras & fokus ke tengah */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, transparent 35%, rgba(15,8,4,0.65) 100%)' }}
      />

      {/* Garis tipis aksen di atas & bawah */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />

      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="inline-flex items-center border border-amber-800/50 py-1 px-4 rounded-full text-amber-400/80 text-sm mb-8"
          >
            Mulai Sekarang
          </motion.div>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
            Ceritakan Kebutuhan
            <br />
            <span style={{ color: '#E8A870' }}>Proyek Anda</span>
          </h2>

          <p className="text-stone-400 text-base md:text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            Kami bantu arahkan langkah awalnya — gratis, tanpa komitmen, tanpa tekanan.
            Cukup ceritakan kebutuhan Anda dan tim kami siap memberikan estimasi awal.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4 flex-wrap"
          >
            <motion.a
              href="#kontak"
              className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-semibold text-sm text-stone-950 transition-all duration-300 cursor-pointer"
              style={{ background: 'linear-gradient(105deg, #E8A870, #C46830)' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Mulai Proyek
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </motion.div>

          <p className="text-stone-600 text-xs mt-8">
            Konsultasi awal sepenuhnya gratis · Tidak ada kewajiban setelah konsultasi · Respon dalam 1 jam kerja
          </p>
        </motion.div>
      </div>
    </section>
  )
}
