'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export function FinalCTA() {
  return (
    <section
      className="relative overflow-hidden py-32"
      style={{ background: 'linear-gradient(135deg, #1C1008 0%, #3D1F0A 50%, #1C1008 100%)' }}
    >
      {/* Warm glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute left-[20%] top-[-20%] w-[60%] h-[60%] rounded-full opacity-20 blur-[120px]"
          style={{ background: 'radial-gradient(circle, #C46830, transparent)' }} />
        <div className="absolute right-[10%] bottom-[-10%] w-[40%] h-[40%] rounded-full opacity-15 blur-[100px]"
          style={{ background: 'radial-gradient(circle, #E8A870, transparent)' }} />
      </div>

      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

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
