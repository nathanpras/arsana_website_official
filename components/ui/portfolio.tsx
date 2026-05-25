'use client'

import { motion } from 'framer-motion'
import { MapPin, Clock, Layers, ArrowUpRight } from 'lucide-react'

const projects = [
  {
    number: '01',
    title: 'Renovasi Rumah 2 Lantai',
    category: 'Renovasi Total',
    location: 'Jakarta Selatan',
    duration: '10 minggu',
    scope: 'Fasad, struktur, plafon gypsum, lantai granit, lighting, finishing',
    year: '2024',
    bg: 'from-amber-950 via-stone-900 to-stone-950',
    accent: '#E8A870',
    size: 'lg:col-span-2',
    tags: ['Renovasi', 'Fasad', 'Interior'],
  },
  {
    number: '02',
    title: 'Bangun Rumah Tinggal',
    category: 'Bangun Baru',
    location: 'Jakarta Timur',
    duration: '6 bulan',
    scope: 'Struktur, arsitektur, MEP, finishing interior dan eksterior',
    year: '2024',
    bg: 'from-stone-800 via-stone-900 to-stone-950',
    accent: '#C4A882',
    size: '',
    tags: ['Bangun Baru', 'Struktur', 'MEP'],
  },
  {
    number: '03',
    title: 'Fit-Out Kantor Startup',
    category: 'Interior Komersial',
    location: 'Jakarta Pusat',
    duration: '5 minggu',
    scope: 'Partisi, plafon, flooring, custom furniture, pencahayaan',
    year: '2024',
    bg: 'from-amber-950 via-amber-950 to-stone-950',
    accent: '#D4956A',
    size: '',
    tags: ['Interior', 'Kantor', 'Fit-Out'],
  },
  {
    number: '04',
    title: 'Renovasi Dapur & 2 Kamar',
    category: 'Renovasi Parsial',
    location: 'Tangerang Selatan',
    duration: '3 minggu',
    scope: 'Kitchen set custom, kamar mandi, lantai, pengecatan ulang',
    year: '2023',
    bg: 'from-stone-700 via-stone-800 to-stone-950',
    accent: '#B8A090',
    size: '',
    tags: ['Renovasi', 'Dapur', 'Kamar'],
  },
  {
    number: '05',
    title: 'Renovasi Ruko 3 Lantai',
    category: 'Bangunan Komersial',
    location: 'Jakarta Barat',
    duration: '8 minggu',
    scope: 'Fasad, tata ruang, MEP, finishing, signage area',
    year: '2023',
    bg: 'from-amber-900 via-stone-900 to-stone-950',
    accent: '#E8B870',
    size: 'lg:col-span-2',
    tags: ['Komersial', 'Ruko', 'Fasad'],
  },
]

export function Portfolio() {
  return (
    <section className="bg-background py-24">
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
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-muted-foreground max-w-xs text-sm leading-relaxed"
          >
            Studi kasus nyata dengan lokasi, durasi, dan lingkup pekerjaan yang jelas — bukan sekadar foto.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className={`group relative rounded-2xl overflow-hidden border border-border aspect-[4/3] cursor-pointer ${project.size}`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${project.bg} transition-transform duration-700 group-hover:scale-105`} />

              {/* Texture */}
              <div className="absolute inset-0 opacity-[0.035]"
                style={{
                  backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
                  backgroundSize: '28px 28px',
                }}
              />

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
      </div>
    </section>
  )
}
