'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Grid latar yang bergeser pelan, dianimasikan murni via CSS transform (GPU).
 * Tidak ada repaint per-frame seperti versi SVG lama, jadi mulus & tidak bikin panas.
 * Otomatis dijeda saat keluar dari viewport untuk menghemat baterai.
 */
export function AnimatedGrid() {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(true)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin: '120px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return <div ref={ref} className={`grid-drift ${active ? '' : 'grid-drift--paused'}`} />
}
