'use client'

import React, { useRef } from 'react'
import { cn } from '@/lib/utils'
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useAnimationFrame,
} from 'framer-motion'
import { Home, Wrench, Sofa, Building2, Zap, Wind, Armchair } from 'lucide-react'

const primaryServices = [
  {
    icon: Home,
    title: 'Bangun Rumah',
    description: 'Pembangunan rumah dari nol: perencanaan, struktur, arsitektur, MEP, hingga finishing. Untuk hunian tinggal dan rumah investasi.',
    cta: 'Konsultasi Sekarang',
    highlight: true,
  },
  {
    icon: Wrench,
    title: 'Renovasi Rumah',
    description: 'Renovasi sebagian atau total: fasad, dapur, kamar mandi, lantai, plafon, layout, dan perbaikan struktur.',
    cta: 'Kirim Foto Lokasi',
    highlight: false,
  },
  {
    icon: Sofa,
    title: 'Interior & Fit-Out',
    description: 'Pekerjaan interior rumah, kantor, toko, cafe, klinik — termasuk custom furniture, partisi, lighting, dan finishing.',
    cta: 'Diskusi Kebutuhan',
    highlight: false,
  },
  {
    icon: Building2,
    title: 'Bangunan Komersial',
    description: 'Ruko, kantor, cafe, gudang, klinik, dan ruang usaha dengan alur kerja yang lebih terukur dan spesifikasi bisnis.',
    cta: 'Jadwalkan Survey',
    highlight: false,
  },
]

const secondaryServices = [
  {
    icon: Zap,
    title: 'Instalasi Listrik',
    description: 'Sistem kelistrikan standar SNI dengan teknisi bersertifikat.',
  },
  {
    icon: Wind,
    title: 'Instalasi AC',
    description: 'Instalasi dan maintenance AC residensial maupun komersial.',
  },
  {
    icon: Armchair,
    title: 'Furniture Custom',
    description: 'Kitchen set, lemari, meja, dan furniture custom ukuran ruang.',
  },
]

export const Component = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - left)
    mouseY.set(e.clientY - top)
  }

  const gridOffsetX = useMotionValue(0)
  const gridOffsetY = useMotionValue(0)

  useAnimationFrame(() => {
    gridOffsetX.set((gridOffsetX.get() + 0.5) % 40)
    gridOffsetY.set((gridOffsetY.get() + 0.5) % 40)
  })

  const maskImage = useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, black, transparent)`

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  }

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring' as const, stiffness: 260, damping: 20 } },
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={cn('relative w-full bg-background overflow-hidden py-24')}
    >
      <div className="absolute inset-0 z-0 opacity-[0.05]">
        <GridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} />
      </div>
      <motion.div
        className="absolute inset-0 z-0 opacity-40"
        style={{ maskImage, WebkitMaskImage: maskImage }}
      >
        <GridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} />
      </motion.div>

      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute right-[-15%] top-[-25%] w-[55%] h-[55%] rounded-full bg-orange-200/75 blur-[160px]" />
        <div className="absolute right-[5%] top-[-5%] w-[25%] h-[25%] rounded-full bg-amber-100/60 blur-[100px]" />
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-12"
        >
          <div className="flex justify-center">
            <div className="border border-border py-1 px-4 rounded-lg text-muted-foreground text-sm">
              Layanan Kami
            </div>
          </div>
          <h2
            className="text-3xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent"
            style={{ backgroundImage: 'linear-gradient(105deg, #271810 0%, #7A3A18 50%, #B05030 100%)' }}
          >
            Layanan untuk Rumah Tinggal
            <br />dan Bangunan Usaha
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Dari pembangunan baru, renovasi, interior, hingga komersial — kami tangani dari konsultasi sampai serah terima.
          </p>
        </motion.div>

        {/* 4 Primary Services */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-5"
        >
          {primaryServices.map((service, i) => {
            const Icon = service.icon
            return (
              <motion.div
                key={i}
                variants={cardVariants}
                className={`group flex flex-col p-6 rounded-2xl border bg-card transition-all duration-300 ${
                  service.highlight
                    ? 'border-primary/40 ring-1 ring-primary/15 hover:border-primary/60'
                    : 'border-border hover:border-primary/30'
                }`}
              >
                <div className="shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors mb-4">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-bold text-foreground mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-5">{service.description}</p>
                <a
                  href={`https://wa.me/6281234567890?text=Halo%20Arsana%2C%20saya%20ingin%20tanya%20tentang%20layanan%20${encodeURIComponent(service.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-primary hover:underline underline-offset-4 transition-all"
                >
                  {service.cta} →
                </a>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Secondary Services */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          {secondaryServices.map((service, i) => {
            const Icon = service.icon
            return (
              <motion.div
                key={i}
                variants={cardVariants}
                className="group flex items-start gap-4 p-5 rounded-xl border border-border bg-card/60 hover:border-border/80 hover:bg-card transition-all duration-300"
              >
                <div className="shrink-0 w-9 h-9 rounded-lg bg-primary/8 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-primary/80" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm mb-0.5">{service.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{service.description}</p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const GridPattern = ({ offsetX, offsetY }: { offsetX: any; offsetY: any }) => {
  return (
    <svg className="w-full h-full">
      <defs>
        <motion.pattern
          id="grid-pattern"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
          x={offsetX}
          y={offsetY}
        >
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-muted-foreground"
          />
        </motion.pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid-pattern)" />
    </svg>
  )
}
