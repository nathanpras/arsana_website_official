'use client'

import { motion } from 'framer-motion'
import { MapPin, Clock, CalendarDays, ArrowUpRight } from 'lucide-react'

const featured = [
  {
    number: '01',
    title: 'PIK Gold Coast',
    subtitle: 'Rumah Tinggal',
    category: 'Bangun Baru',
    location: 'PIK, Jakarta Utara',
    duration: '12 bulan',
    year: '2023',
    scope: 'Pembangunan mansion klasik dari pondasi hingga finishing mewah, lengkap dengan ornamen fasad dan landscaping',
    image: '/projects/goldcoast/02.webp',
    layout: 'hero',
    accent: '#E8B870',
  },
  {
    number: '02',
    title: 'Bangka Mampang',
    subtitle: 'Rumah Tinggal',
    category: 'Bangun Baru',
    location: 'Mampang, Jakarta Selatan',
    duration: '10 bulan',
    year: '2024',
    scope: 'Pembangunan rumah tinggal mewah — struktur, MEP, interior marmer, dan kolam renang dalam',
    image: '/projects/bangka-mampang/02.webp',
    layout: 'half',
    accent: '#D4956A',
  },
  {
    number: '03',
    title: 'Nava Park BSD',
    subtitle: 'Rumah Tinggal',
    category: 'Bangun Baru',
    location: 'BSD, Tangerang',
    duration: '7 bulan',
    year: '2022',
    scope: 'Pembangunan rumah tinggal modern lengkap dengan landscaping dan kolam renang',
    image: '/projects/navapark-bsd/02.webp',
    layout: 'half',
    accent: '#B8C8A0',
  },
]

export function FeaturedProjects() {
  return (
    <section className="bg-background py-24">
      <div className="container mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10"
        >
          <div>
            <div className="inline-flex items-center border border-border py-1 px-4 rounded-lg text-muted-foreground text-sm mb-4">
              Proyek Unggulan
            </div>
            <h2
              className="text-3xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(105deg, #271810 0%, #7A3A18 50%, #B05030 100%)' }}
            >
              Tiga Proyek Terbaik Kami
            </h2>
          </div>
          <p className="text-muted-foreground max-w-xs text-sm leading-relaxed">
            Proyek unggulan dengan kompleksitas tinggi, dikerjakan penuh dari pondasi hingga serah terima.
          </p>
        </motion.div>

        {/* Hero card — Suvarna Sutra Daru */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="group relative rounded-2xl overflow-hidden mb-4 cursor-pointer"
          style={{ height: '520px' }}
        >
          {/* Photo */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.03]"
            style={{ backgroundImage: `url(${featured[0].image})` }}
          />
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

          {/* Top row */}
          <div className="absolute top-6 left-6 right-6 flex items-start justify-between">
            <span
              className="text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full backdrop-blur-sm"
              style={{ background: 'rgba(0,0,0,0.35)', color: featured[0].accent, border: `1px solid ${featured[0].accent}40` }}
            >
              {featured[0].category}
            </span>
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
              <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                <ArrowUpRight className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>

          {/* Large number — decorative */}
          <div className="absolute top-4 right-8 font-serif text-[160px] font-bold leading-none select-none pointer-events-none"
            style={{ color: 'rgba(255,255,255,0.04)' }}>
            {featured[0].number}
          </div>

          {/* Bottom content */}
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="mb-2 text-sm text-white/50 font-medium tracking-wide">{featured[0].subtitle}</div>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">{featured[0].title}</h3>

            {/* Scope — visible on hover */}
            <p className="text-white/60 text-sm leading-relaxed mb-5 max-w-xl opacity-0 group-hover:opacity-100 transition-opacity duration-400">
              {featured[0].scope}
            </p>

            {/* Meta */}
            <div className="flex items-center gap-5 flex-wrap">
              <div className="flex items-center gap-1.5 text-xs text-white/55">
                <MapPin className="w-3.5 h-3.5" />
                <span>{featured[0].location}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-white/45">
                <Clock className="w-3.5 h-3.5" />
                <span>{featured[0].duration}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-white/40">
                <CalendarDays className="w-3.5 h-3.5" />
                <span>{featured[0].year}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Two half cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {featured.slice(1).map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="group relative rounded-2xl overflow-hidden cursor-pointer"
              style={{ height: '380px' }}
            >
              {/* Photo */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.04]"
                style={{ backgroundImage: `url(${project.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/5" />

              {/* Category badge */}
              <div className="absolute top-5 left-5">
                <span
                  className="text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full backdrop-blur-sm"
                  style={{ background: 'rgba(0,0,0,0.35)', color: project.accent, border: `1px solid ${project.accent}40` }}
                >
                  {project.category}
                </span>
              </div>

              {/* Arrow on hover */}
              <div className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/0 group-hover:bg-white/10 flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 border border-white/0 group-hover:border-white/20">
                <ArrowUpRight className="w-4 h-4 text-white" />
              </div>

              {/* Large number */}
              <div className="absolute top-2 right-5 font-serif text-[100px] font-bold leading-none select-none pointer-events-none"
                style={{ color: 'rgba(255,255,255,0.05)' }}>
                {project.number}
              </div>

              {/* Bottom content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="mb-1 text-xs text-white/45 font-medium tracking-wide">{project.subtitle}</div>
                <h3 className="text-xl font-bold text-white mb-3 leading-snug">{project.title}</h3>

                <p className="text-white/55 text-xs leading-relaxed mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2">
                  {project.scope}
                </p>

                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-1 text-xs text-white/50">
                    <MapPin className="w-3 h-3" />
                    <span>{project.location}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-white/40">
                    <Clock className="w-3 h-3" />
                    <span>{project.duration}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-white/35">
                    <CalendarDays className="w-3 h-3" />
                    <span>{project.year}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
