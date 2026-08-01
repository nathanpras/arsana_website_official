'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { MapPin, Clock, Layers, ArrowUpRight, ArrowLeft, ArrowRight } from 'lucide-react'
import { PortfolioLightbox } from '@/components/ui/portfolio-lightbox'

const projects = [
  {
    number: '01',
    title: 'Rumah Tinggal PIK Gold Coast',
    category: 'Bangun Baru',
    location: 'PIK, Jakarta Utara',
    duration: '12 bulan',
    scope: 'Pembangunan mansion klasik dari pondasi hingga finishing mewah lengkap',
    year: '2023',
    image: '/projects/goldcoast/02.webp',
    accent: '#E8B870',
    size: 'lg:col-span-2',
    tags: ['Bangun Baru', 'Klasik', 'Mewah'],
  },
  {
    number: '02',
    title: 'Rumah Tinggal Bangka Mampang',
    category: 'Bangun Baru',
    location: 'Mampang, Jakarta Selatan',
    duration: '10 bulan',
    scope: 'Pembangunan rumah tinggal mewah dengan interior marmer dan kolam dalam',
    year: '2024',
    image: '/projects/bangka-mampang/02.webp',
    accent: '#D4956A',
    size: 'lg:col-span-2',
    tags: ['Bangun Baru', 'Interior', 'Mewah'],
  },
  {
    number: '03',
    title: 'Rumah Tinggal Nava Park',
    category: 'Bangun Baru',
    location: 'BSD, Tangerang',
    duration: '7 bulan',
    scope: 'Pembangunan rumah tinggal lengkap dengan landscaping dan kolam renang',
    year: '2022',
    image: '/projects/navapark-bsd/02.webp',
    accent: '#B8A090',
    size: '',
    tags: ['Bangun Baru', 'Landscape', 'Finishing'],
  },
  {
    number: '04',
    title: 'Rumah Tinggal Puri Metland',
    category: 'Bangun Baru',
    location: 'Tangerang',
    duration: '8 bulan',
    scope: 'Pembangunan rumah tinggal tiga lantai bergaya klasik modern',
    year: '2023',
    image: '/projects/puri-metland/02.webp',
    accent: '#C8A875',
    size: '',
    tags: ['Bangun Baru', 'Klasik', 'Finishing'],
  },
  {
    number: '05',
    title: 'Rumah Tinggal Citra2',
    category: 'Bangun Baru',
    location: 'Citra 2, Jakarta Barat',
    duration: '7 bulan',
    scope: 'Pembangunan rumah tinggal tiga lantai bergaya klasik dengan kolom',
    year: '2023',
    image: '/projects/citra-2-ext/01.webp',
    accent: '#D4A870',
    size: '',
    tags: ['Bangun Baru', 'Klasik', 'Finishing'],
  },
  {
    number: '06',
    title: 'Rumah Tinggal Chiara7',
    category: 'Bangun Baru',
    location: 'Cikupa, Tangerang',
    duration: '9 bulan',
    scope: 'Pembangunan rumah tinggal dua lantai modern dengan aksen kayu',
    year: '2023',
    image: '/projects/cikupa-chiara7/01.webp',
    accent: '#C09878',
    size: '',
    tags: ['Bangun Baru', 'Modern', 'Finishing'],
  },
  {
    number: '07',
    title: 'Rumah Tinggal Bintaro',
    category: 'Bangun Baru',
    location: 'Bintaro, Tangerang',
    duration: '6 bulan',
    scope: 'Pembangunan rumah tinggal dua lantai bergaya klasik modern',
    year: '2020',
    image: '/projects/bintaro/01.webp',
    accent: '#D0A878',
    size: '',
    tags: ['Bangun Baru', 'Klasik', 'Finishing'],
  },
  {
    number: '08',
    title: 'Rumah Tinggal Suvarna Sutra Andara',
    category: 'Bangun Baru',
    location: 'Cikupa, Tangerang',
    duration: '9 bulan',
    scope: 'Pembangunan rumah tinggal dengan fasad batu alam dan kolam koi',
    year: '2018',
    image: '/projects/suvarna-sutra-andara/01.webp',
    accent: '#C4A882',
    size: '',
    tags: ['Bangun Baru', 'Eksterior', 'Landscape'],
  },
  {
    number: '09',
    title: 'Rumah Tinggal Suvarna Sutra Flavio',
    category: 'Bangun Baru',
    location: 'Cikupa, Tangerang',
    duration: '9 bulan',
    scope: 'Pembangunan rumah tinggal tiga lantai dengan carport dan ornamen klasik',
    year: '2023',
    image: '/projects/suvarna-sutra-flavio/02.webp',
    accent: '#D4A870',
    size: '',
    tags: ['Bangun Baru', 'Klasik', 'Finishing'],
  },
  {
    number: '10',
    title: 'Rumah Tinggal Taman Kencana',
    category: 'Bangun Baru',
    location: 'Tangerang',
    duration: '8 bulan',
    scope: 'Pembangunan rumah tinggal dengan carport dan interior lantai marmer',
    year: '2022',
    image: '/projects/taman-kencana/01.webp',
    accent: '#A09888',
    size: '',
    tags: ['Bangun Baru', 'Interior', 'Finishing'],
  },
  {
    number: '11',
    title: 'Renovasi Cafe Coffee Grounds',
    category: 'Renovasi Komersial',
    location: 'Sunter, Jakarta Utara',
    duration: '3 bulan',
    scope: 'Renovasi fasad, interior, dan fit-out cafe tiga lantai',
    year: '2018',
    image: '/projects/coffee-ground-cafe/02.webp',
    accent: '#C47030',
    size: '',
    tags: ['Renovasi', 'Komersial', 'Fit-Out'],
  },
  {
    number: '12',
    title: 'Showroom Marmer Cipondoh',
    category: 'Renovasi Komersial',
    location: 'Cipondoh, Tangerang',
    duration: '2 bulan',
    scope: 'Renovasi fasad dan interior showroom material bangunan',
    year: '2023',
    image: '/projects/cipondoh-showroom-marmer/04.webp',
    accent: '#B0A090',
    size: '',
    tags: ['Renovasi', 'Komersial', 'Fasad'],
  },
  {
    number: '13',
    title: 'Bozz Billiard Citra 8',
    category: 'Renovasi Komersial',
    location: 'Citra Garden, Jakarta Barat',
    duration: '4 bulan',
    scope: 'Renovasi dan fit-out arena billiard dengan akustik dan pencahayaan',
    year: '2024',
    image: '/projects/bozz-billiard-citra-8/02.webp',
    accent: '#C4A882',
    size: '',
    tags: ['Renovasi', 'Komersial', 'Fit-Out'],
  },
]

export function Portfolio() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  // Drag-to-scroll pakai mouse; layar sentuh sudah bisa swipe sendiri.
  // `moved` dipakai untuk menahan klik agar drag tidak membuka lightbox.
  const drag = useRef({ active: false, moved: false, startX: 0, startScroll: 0 })

  const updateScrollState = useCallback(() => {
    const el = scrollerRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setProgress(max > 0 ? el.scrollLeft / max : 0)
    setAtStart(el.scrollLeft <= 8)
    setAtEnd(el.scrollLeft >= max - 8)
  }, [])

  useEffect(() => {
    updateScrollState()
    window.addEventListener('resize', updateScrollState)
    return () => window.removeEventListener('resize', updateScrollState)
  }, [updateScrollState])

  const scrollByCard = (direction: 1 | -1) => {
    const el = scrollerRef.current
    if (!el) return
    const card = el.querySelector('[data-card]') as HTMLElement | null
    const step = card ? card.offsetWidth + 16 : el.clientWidth * 0.8
    el.scrollBy({ left: step * direction, behavior: 'smooth' })
  }

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return
    const el = scrollerRef.current
    if (!el) return
    drag.current = { active: true, moved: false, startX: e.clientX, startScroll: el.scrollLeft }
  }

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return
    const el = scrollerRef.current
    if (!el) return
    const delta = e.clientX - drag.current.startX
    // Capture baru diaktifkan setelah jelas ini drag, bukan klik. Kalau capture
    // dipasang sejak pointerdown, event click dialihkan ke container ini dan
    // kartu tidak pernah menerima klik (lightbox tak terbuka).
    if (!drag.current.moved && Math.abs(delta) > 5) {
      drag.current.moved = true
      el.style.scrollSnapType = 'none'
      el.setPointerCapture(e.pointerId)
    }
    if (drag.current.moved) el.scrollLeft = drag.current.startScroll - delta
  }

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return
    drag.current.active = false
    const el = scrollerRef.current
    if (!el) return
    el.style.scrollSnapType = ''
    if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId)
  }

  const openProject = (i: number) => {
    if (drag.current.moved) return
    setOpenIndex(i)
  }

  return (
    <section className="bg-[hsl(var(--panel))] py-24 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center border border-border py-1 px-4 rounded-lg text-muted-foreground text-sm mb-4">
              Portofolio
            </div>
            <h2
              className="text-3xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(105deg, #271810 0%, #7A3A18 50%, #B05030 100%)' }}
            >
              Proyek Asli Kami
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex items-end gap-6"
          >
            <p className="text-muted-foreground max-w-xs text-sm leading-relaxed">
              Studi kasus nyata dengan lokasi, durasi, dan lingkup pekerjaan yang jelas — bukan sekadar foto.
            </p>
            <div className="hidden md:flex items-center gap-2 shrink-0">
              <button
                type="button"
                aria-label="Proyek sebelumnya"
                onClick={() => scrollByCard(-1)}
                disabled={atStart}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground transition-all duration-300 hover:bg-foreground hover:text-background disabled:opacity-30 disabled:pointer-events-none active:scale-95"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                aria-label="Proyek berikutnya"
                onClick={() => scrollByCard(1)}
                disabled={atEnd}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground transition-all duration-300 hover:bg-foreground hover:text-background disabled:opacity-30 disabled:pointer-events-none active:scale-95"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>

        <div
          ref={scrollerRef}
          onScroll={updateScrollState}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          className="no-scrollbar flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth -mx-6 px-6 pb-2 select-none cursor-grab active:cursor-grabbing [scroll-padding-left:1.5rem]"
        >
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: Math.min(i, 5) * 0.08, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              onClick={() => openProject(i)}
              data-card
              className="group relative shrink-0 snap-start w-[80vw] sm:w-[380px] lg:w-[420px] rounded-2xl overflow-hidden border border-border aspect-[4/3] cursor-pointer transition-transform duration-500 hover:-translate-y-1"
            >
              <Image
                src={project.image}
                alt={`${project.category} — ${project.title}, ${project.location}`}
                fill
                quality={90}
                priority={i === 0}
                loading={i === 0 ? undefined : 'lazy'}
                sizes="(max-width: 640px) 80vw, (max-width: 1024px) 380px, 420px"
                draggable={false}
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />

              {/* Large number */}
              <div className="absolute top-4 right-5 font-serif text-7xl font-bold text-white/[0.06] select-none leading-none">
                {project.number}
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

              {/* Top-right arrow */}
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/0 group-hover:bg-white/10 flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
                <ArrowUpRight className="w-4 h-4 text-white" />
              </div>

              {/* Tags */}
              <div className="absolute top-4 left-4 flex gap-1.5 flex-wrap opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/10 text-white/80 backdrop-blur-sm">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="mb-1.5">
                  <span className="text-[11px] font-medium tracking-wider uppercase" style={{ color: project.accent }}>
                    {project.category}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-white mb-2 leading-snug">
                  {project.title}
                </h3>
                <p className="text-xs text-white/50 leading-snug mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2">
                  {project.scope}
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-xs text-white/50">
                    <MapPin className="w-3 h-3" />
                    <span>{project.location}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-white/40">
                    <Clock className="w-3 h-3" />
                    <span>{project.duration}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-white/35">
                    <Layers className="w-3 h-3" />
                    <span>{project.year}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Indikator posisi scroll */}
        <div className="mt-8 flex items-center gap-4">
          <div className="relative h-[2px] flex-1 bg-border rounded-full overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-foreground/60 rounded-full transition-[width] duration-300 ease-out"
              style={{ width: `${Math.max(progress * 100, 6)}%` }}
            />
          </div>
          <span className="text-xs text-muted-foreground tabular-nums shrink-0">
            {Math.round(progress * (projects.length - 1)) + 1} / {projects.length}
          </span>
        </div>
      </div>

      <PortfolioLightbox
        projects={projects}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onIndexChange={setOpenIndex}
      />
    </section>
  )
}
