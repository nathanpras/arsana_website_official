'use client'

import { useEffect, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, MapPin, Clock, Layers } from 'lucide-react'

export interface LightboxProject {
  title: string
  category: string
  location: string
  duration: string
  year: string
  scope: string
  image: string
  accent: string
}

export function PortfolioLightbox({
  projects,
  index,
  onClose,
  onIndexChange,
}: {
  projects: LightboxProject[]
  index: number | null
  onClose: () => void
  onIndexChange: (i: number) => void
}) {
  const isOpen = index !== null
  const project = isOpen ? projects[index] : null

  const goNext = useCallback(() => {
    if (index === null) return
    onIndexChange((index + 1) % projects.length)
  }, [index, projects.length, onIndexChange])

  const goPrev = useCallback(() => {
    if (index === null) return
    onIndexChange((index - 1 + projects.length) % projects.length)
  }, [index, projects.length, onIndexChange])

  // Keyboard: Esc tutup, panah kiri/kanan navigasi.
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') goNext()
      else if (e.key === 'ArrowLeft') goPrev()
    }
    window.addEventListener('keydown', onKey)
    // Kunci scroll body selama lightbox terbuka.
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [isOpen, onClose, goNext, goPrev])

  return (
    <AnimatePresence>
      {isOpen && project && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} — ${project.location}`}
        >
          {/* Tombol tutup */}
          <button
            onClick={onClose}
            aria-label="Tutup"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); goPrev() }}
            aria-label="Sebelumnya"
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); goNext() }}
            aria-label="Berikutnya"
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Konten */}
          <motion.div
            key={index}
            className="relative w-full max-w-5xl"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-stone-900">
              <Image
                src={project.image}
                alt={`${project.category} — ${project.title}, ${project.location}`}
                fill
                quality={90}
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-contain"
                priority
              />
            </div>

            {/* Caption */}
            <div className="mt-4 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
              <div>
                <div
                  className="text-[11px] font-semibold tracking-widest uppercase mb-1"
                  style={{ color: project.accent }}
                >
                  {project.category}
                </div>
                <h3 className="text-xl font-semibold text-white leading-snug">{project.title}</h3>
                <p className="text-white/55 text-sm mt-1 max-w-xl leading-relaxed">{project.scope}</p>
              </div>
              <div className="flex items-center gap-4 flex-wrap text-xs text-white/55 shrink-0">
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{project.location}</span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{project.duration}</span>
                <span className="flex items-center gap-1"><Layers className="w-3.5 h-3.5" />{project.year}</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
