'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

interface SparklesProps {
  className?: string
  density?: number
  color?: string
}

export function Sparkles({ className, density = 80, color = '#FFFFFF' }: SparklesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    const particles: { x: number; y: number; r: number; alpha: number; speed: number }[] = []

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    for (let i = 0; i < density; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.2 + 0.3,
        alpha: Math.random(),
        speed: Math.random() * 0.008 + 0.003,
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const p of particles) {
        p.alpha += p.speed
        if (p.alpha > 1 || p.alpha < 0) p.speed *= -1
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = color + Math.round(p.alpha * 255).toString(16).padStart(2, '0')
        ctx.fill()
      }
      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [density, color])

  return <canvas ref={canvasRef} className={cn('w-full h-full', className)} />
}
