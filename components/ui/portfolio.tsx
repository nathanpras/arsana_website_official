'use client'

import { motion } from 'framer-motion'
import { MapPin, Clock, Layers, ArrowUpRight } from 'lucide-react'

const projects = [
  {
    number: '01',
    title: 'Renovasi Rumah Tinggal',
    category: 'Renovasi',
    location: 'Ciledug, Tangerang',
    duration: '8 minggu',
    scope: 'Renovasi eksterior, interior, lantai, plafon, dan finishing',
    year: '2019',
    image: '/projects/renovasi-green-permata-ciledug/project-19-73.jpeg',
    accent: '#E8A870',
    size: '',
    tags: ['Renovasi', 'Eksterior', 'Interior'],
  },
  {
    number: '02',
    title: 'Rumah Tinggal Taman Surya',
    category: 'Bangun Baru',
    location: 'Cengkareng, Jakarta',
    duration: '5 bulan',
    scope: 'Pembangunan rumah tinggal dari pondasi hingga finishing',
    year: '2019',
    image: '/projects/rumah-tinggal-taman-surya-cengkareng-2019/project-15-42.jpeg',
    accent: '#C4A882',
    size: '',
    tags: ['Bangun Baru', 'Struktur', 'Finishing'],
  },
  {
    number: '03',
    title: 'Rumah Tinggal Suvarna Sutra',
    category: 'Bangun Baru',
    location: 'Cikupa, Tangerang',
    duration: '9 bulan',
    scope: 'Struktur, arsitektur, MEP, finishing interior dan eksterior',
    year: '2021',
    image: '/projects/rumah-tinggal-suvarna-sutra-padi-utama-2020-2021/project-20-86-sharp.jpeg',
    accent: '#D4956A',
    size: 'lg:col-span-2',
    tags: ['Bangun Baru', 'MEP', 'Finishing'],
  },
  {
    number: '04',
    title: 'Rumah Tinggal Nava Park',
    category: 'Bangun Baru',
    location: 'BSD, Tangerang',
    duration: '7 bulan',
    scope: 'Pembangunan rumah tinggal lengkap dengan landscaping',
    year: '2022',
    image: '/projects/rumah-tinggal-nava-park-bsd-2021-2022/project-21-91-sharp.jpeg',
    accent: '#B8A090',
    size: 'lg:col-span-2',
    tags: ['Bangun Baru', 'Landscape', 'Finishing'],
  },
  {
    number: '05',
    title: 'Rumah Tinggal Suvarna Sutra Daru',
    category: 'Bangun Baru',
    location: 'Cikupa, Tangerang',
    duration: '9 bulan',
    scope: 'Pembangunan dari nol termasuk struktur, MEP, dan finishing total',
    year: '2022',
    image: '/projects/rumah-tinggal-suvarna-sutra-daru1-2021-2022/project-23-106-sharp.jpeg',
    accent: '#E8B870',
    size: 'lg:col-span-2',
    tags: ['Bangun Baru', 'Struktur', 'MEP'],
  },
  {
    number: '06',
    title: 'Renovasi Cafe Coffee Grounds',
    category: 'Renovasi Komersial',
    location: 'Sunter, Jakarta Utara',
    duration: '3 bulan',
    scope: 'Renovasi fasad, interior, dan fit-out cafe tiga lantai',
    year: '2018',
    image: '/projects/renovasi-cafe-coffee-grounds-sunter/project-13-25.jpeg',
    accent: '#C47030',
    size: '',
    tags: ['Renovasi', 'Komersial', 'Fit-Out'],
  },
  {
    number: '07',
    title: 'Rumah Tinggal Bintaro',
    category: 'Bangun Baru',
    location: 'Bintaro, Tangerang',
    duration: '6 bulan',
    scope: 'Pembangunan rumah tinggal dua lantai bergaya klasik modern',
    year: '2020',
    image: '/projects/rumah-tinggal-bintaro-2019-2020/project-17-58.jpeg',
    accent: '#D0A878',
    size: '',
    tags: ['Bangun Baru', 'Klasik', 'Finishing'],
  },
  {
    number: '08',
    title: 'Rumah Tinggal Puri Metland',
    category: 'Bangun Baru',
    location: 'Tangerang',
    duration: '8 bulan',
    scope: 'Pembangunan rumah tinggal tiga lantai bergaya klasik modern',
    year: '2023',
    image: '/projects/rumah-tinggal-puri-metland-tangerang-2023/project-33-199.jpeg',
    accent: '#C8A875',
    size: '',
    tags: ['Bangun Baru', 'Klasik', 'Finishing'],
  },
  {
    number: '09',
    title: 'Showroom Marmer Cipondoh',
    category: 'Renovasi Komersial',
    location: 'Cipondoh, Tangerang',
    duration: '2 bulan',
    scope: 'Renovasi fasad dan interior showroom material bangunan',
    year: '2023',
    image: '/projects/renovasi-ruko-showroom-marmer-cipondoh-2023/project-35-214.jpeg',
    accent: '#B0A090',
    size: '',
    tags: ['Renovasi', 'Komersial', 'Fasad'],
  },
  {
    number: '10',
    title: 'Rumah Tinggal Taman Alfa',
    category: 'Bangun Baru',
    location: 'Joglo, Jakarta Barat',
    duration: '8 bulan',
    scope: 'Pembangunan rumah tinggal dua lantai dengan carport dan taman',
    year: '2022',
    image: '/projects/rumah-tinggal-taman-alfa-joglo-2022/project-26-129.jpeg',
    accent: '#A09888',
    size: '',
    tags: ['Bangun Baru', 'Landscape', 'Finishing'],
  },
  {
    number: '11',
    title: 'Rumah Tinggal Citra2',
    category: 'Bangun Baru',
    location: 'Citra 2, Jakarta Barat',
    duration: '7 bulan',
    scope: 'Pembangunan rumah tinggal tiga lantai bergaya klasik dengan kolom',
    year: '2023',
    image: '/projects/rumah-tinggal-citra2-jakarta-barat-2022-2023/project-25-124-sharp.jpeg',
    accent: '#D4A870',
    size: '',
    tags: ['Bangun Baru', 'Klasik', 'Finishing'],
  },
  {
    number: '12',
    title: 'Rumah Tinggal Chiara7',
    category: 'Bangun Baru',
    location: 'Cikupa, Tangerang',
    duration: '9 bulan',
    scope: 'Pembangunan rumah tinggal dua lantai modern dengan aksen kayu',
    year: '2023',
    image: '/projects/rumah-tinggal-chiara7-cikupa-tangerang-2023/project-30-168-sharp.jpeg',
    accent: '#C09878',
    size: '',
    tags: ['Bangun Baru', 'Modern', 'Finishing'],
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 grid-flow-row-dense">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className={`group relative rounded-2xl overflow-hidden border border-border aspect-[4/3] cursor-pointer ${project.size}`}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${project.image})` }}
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
      </div>
    </section>
  )
}
