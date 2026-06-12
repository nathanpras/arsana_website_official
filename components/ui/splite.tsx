'use client'

import { motion } from 'framer-motion'
import { Circle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { TextRotate } from '@/components/ui/text-rotate'

function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = 'from-stone-300/[0.35]',
}: {
  className?: string
  delay?: number
  width?: number
  height?: number
  rotate?: number
  gradient?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -150, rotate: rotate - 15 }}
      animate={{ opacity: 1, y: 0, rotate: rotate }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={cn('absolute', className)}
    >
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        style={{ width, height }}
        className="relative"
      >
        <div
          className={cn(
            'absolute inset-0 rounded-full',
            'bg-gradient-to-r to-transparent',
            gradient,
            'border border-stone-300/[0.40]',
            'shadow-[0_8px_32px_0_rgba(180,150,120,0.08)]',
            'after:absolute after:inset-0 after:rounded-full',
            'after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,220,180,0.12),transparent_70%)]'
          )}
        />
      </motion.div>
    </motion.div>
  )
}

export function SplineSceneBasic() {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  }

  return (
    <div className="relative min-h-[calc(100vh-4rem)] w-full flex items-center justify-center overflow-hidden bg-background">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 mix-blend-multiply"
        style={{ backgroundImage: "url('/hero-bg.png')" }}
      />
      {/* Warm fade overlay to blend image with background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/40 to-orange-50/60 pointer-events-none" />
      <div className="absolute right-[-15%] top-[-25%] w-[55%] h-[55%] rounded-full bg-orange-200/75 blur-[120px] pointer-events-none" />

      {/* Bentuk dekoratif melayang — disembunyikan di mobile agar tidak meleset
          keluar layar dan tidak membebani GPU perangkat kecil. */}
      <div className="absolute inset-0 overflow-hidden hidden md:block">
        <ElegantShape
          delay={0.3}
          width={600}
          height={140}
          rotate={12}
          gradient="from-orange-200/[0.40]"
          className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
        />
        <ElegantShape
          delay={0.5}
          width={500}
          height={120}
          rotate={-15}
          gradient="from-stone-300/[0.35]"
          className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
        />
        <ElegantShape
          delay={0.4}
          width={300}
          height={80}
          rotate={-8}
          gradient="from-amber-200/[0.30]"
          className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
        />
        <ElegantShape
          delay={0.6}
          width={200}
          height={60}
          rotate={20}
          gradient="from-stone-200/[0.40]"
          className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
        />
        <ElegantShape
          delay={0.7}
          width={150}
          height={40}
          rotate={-25}
          gradient="from-orange-100/[0.35]"
          className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-stone-300/50 bg-white/40 backdrop-blur-sm mb-8 md:mb-12"
          >
            <Circle className="h-1.5 w-1.5 fill-amber-500/70" />
            <span className="text-xs font-medium text-stone-600 tracking-widest uppercase">
              Kontraktor Profesional · Jakarta
            </span>
          </motion.div>

          {/* Heading with TextRotate */}
          <motion.div
            custom={1}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 md:mb-8 tracking-tight">
              <span
                className="bg-clip-text text-transparent block pb-2"
                style={{
                  backgroundImage: 'linear-gradient(105deg, #1C1814 0%, #4A3728 45%, #C4784A 100%)',
                  lineHeight: '1.15',
                }}
              >
                Bangun & Renovasi
              </span>
              <span
                className="block"
                style={{ color: '#C46830' }}
              >
                <TextRotate
                  texts={[
                    "Proses Jelas",
                    "Hasil Transparan",
                    "Tepat Waktu",
                    "Sesuai Budget",
                    "Tanpa Khawatir",
                  ]}
                  rotationInterval={2600}
                  staggerDuration={0.03}
                  staggerFrom="first"
                  splitBy="characters"
                  transition={{ type: "spring", damping: 28, stiffness: 320 }}
                  mainClassName="justify-center"
                />
              </span>
            </h1>
          </motion.div>

          {/* Description + stats */}
          <motion.div
            custom={2}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="mb-10"
          >
            <p className="text-base sm:text-lg text-stone-500 mb-6 leading-relaxed font-light tracking-wide max-w-xl mx-auto px-4">
              Kami bantu dari perencanaan, estimasi biaya, pengerjaan, hingga pengawasan proyek —
              agar Anda tidak perlu bingung mengurus semuanya sendiri.
            </p>
            <div className="flex items-center justify-center gap-6 flex-wrap">
              <div className="flex items-center gap-2">
                <span
                  className="text-xl font-bold tabular-nums"
                  style={{
                    backgroundImage: 'linear-gradient(105deg, #C46830, #E8A870)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  100+
                </span>
                <span className="text-sm text-stone-500">Proyek Selesai</span>
              </div>
              <span className="text-stone-300 select-none">·</span>
              <div className="flex items-center gap-2">
                <span
                  className="text-xl font-bold tabular-nums"
                  style={{
                    backgroundImage: 'linear-gradient(105deg, #C46830, #E8A870)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  15 Thn+
                </span>
                <span className="text-sm text-stone-500">Pengalaman</span>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            custom={3}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="flex items-center justify-center gap-4 flex-wrap"
          >
            <motion.a
              href="#kontak"
              className="px-8 py-3.5 rounded-full font-semibold text-sm cursor-pointer transition-all duration-300 bg-foreground text-background hover:bg-foreground/90"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Konsultasi Gratis
            </motion.a>
            <motion.button
              className="px-8 py-3.5 rounded-full border border-border text-muted-foreground font-medium text-sm hover:bg-secondary hover:text-foreground transition-all duration-300 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Lihat Portofolio
            </motion.button>
          </motion.div>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent pointer-events-none" />
    </div>
  )
}
