'use client'

import { useEffect } from 'react'

/**
 * Efek "magnetic" ringan pada elemen ber-atribut [data-magnetic]
 * (elemen tertarik halus ke arah kursor). Kursor bawaan tetap dipakai —
 * tidak ada cursor kustom (ring/dot).
 *
 * Otomatis NONAKTIF di perangkat sentuh & saat pengguna meminta reduced-motion.
 */
export function Cursor() {
  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduce) return

    const magnets = Array.from(document.querySelectorAll<HTMLElement>('[data-magnetic]'))
    const cleanups: Array<() => void> = []
    magnets.forEach((el) => {
      const move = (e: MouseEvent) => {
        const r = el.getBoundingClientRect()
        const x = e.clientX - (r.left + r.width / 2)
        const y = e.clientY - (r.top + r.height / 2)
        el.style.transform = `translate(${x * 0.22}px, ${y * 0.22}px)`
      }
      const leave = () => { el.style.transform = '' }
      el.addEventListener('mousemove', move)
      el.addEventListener('mouseleave', leave)
      cleanups.push(() => {
        el.removeEventListener('mousemove', move)
        el.removeEventListener('mouseleave', leave)
        el.style.transform = ''
      })
    })

    return () => cleanups.forEach((fn) => fn())
  }, [])

  return null
}
