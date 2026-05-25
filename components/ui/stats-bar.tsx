'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    const duration = 2000
    const step = (timestamp: number, startTime: number) => {
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * value))
      if (progress < 1) requestAnimationFrame((t) => step(t, startTime))
    }
    requestAnimationFrame((t) => step(t, t))
  }, [inView, value])

  return <span ref={ref}>{count}{suffix}</span>
}

export function StatsBar() {
  return (
    <section className="bg-background border-t border-border">
      <div className="container mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-3 flex-wrap"
        >
          {/* Stat 1 */}
          <div className="flex items-baseline gap-2">
            <span
              className="text-3xl md:text-4xl font-bold tabular-nums"
              style={{
                backgroundImage: 'linear-gradient(105deg, #C46830, #E8A870)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              <Counter value={100} suffix="+" />
            </span>
            <span className="text-sm md:text-base font-medium text-foreground">
              Proyek Selesai
            </span>
          </div>

          {/* Divider */}
          <span className="text-border text-2xl font-light select-none px-2">·</span>

          {/* Stat 2 */}
          <div className="flex items-baseline gap-2">
            <span
              className="text-3xl md:text-4xl font-bold tabular-nums"
              style={{
                backgroundImage: 'linear-gradient(105deg, #C46830, #E8A870)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              <Counter value={15} suffix=" Thn+" />
            </span>
            <span className="text-sm md:text-base font-medium text-foreground">
              Pengalaman
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
