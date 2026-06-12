'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion'
import { AnimatedGrid } from '@/components/ui/animated-grid'

export function GridBackground({
  children,
  patternId,
  tone = 'cream',
}: {
  children: React.ReactNode
  patternId: string
  tone?: 'cream' | 'panel'
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Hanya terpicu saat ada gerakan mouse (desktop). Di layar sentuh tidak ada
  // mousemove, jadi tidak ada biaya komputasi sama sekali.
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - left)
    mouseY.set(e.clientY - top)
  }

  const maskImage = useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, black, transparent)`

  return (
    <div
      ref={containerRef}
      data-grid={patternId}
      onMouseMove={handleMouseMove}
      className={`relative overflow-hidden ${tone === 'panel' ? 'bg-[hsl(var(--panel))]' : 'bg-background'}`}
    >
      {/* Grid bergerak (selalu, halus via GPU) */}
      <div className="absolute inset-0 z-0 opacity-[0.05] overflow-hidden">
        <AnimatedGrid />
      </div>
      {/* Grid yang lebih terang mengikuti kursor (hanya pointer ber-hover / desktop) */}
      <motion.div
        className="absolute inset-0 z-0 opacity-40 overflow-hidden hidden [@media(hover:hover)]:block"
        style={{ maskImage, WebkitMaskImage: maskImage }}
      >
        <AnimatedGrid />
      </motion.div>
      {/* Cahaya hangat lembut & seimbang (tengah-atas), bukan bercak sudut */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute left-1/2 -translate-x-1/2 top-[-45%] w-[95%] h-[70%] rounded-full bg-orange-100/25 blur-[150px]" />
      </div>
      {/* Fade lembut di bawah agar grid memudar, tidak terpotong tegas */}
      <div
        className={`absolute inset-x-0 bottom-0 h-32 pointer-events-none z-0 bg-gradient-to-t to-transparent ${
          tone === 'panel' ? 'from-[hsl(var(--panel))]' : 'from-[hsl(var(--background))]'
        }`}
      />
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
