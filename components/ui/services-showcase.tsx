'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

interface Service {
  title: string
  description: string
  image: string
  price: string
  unit: string
  cta: string
}

const services: Service[] = [
  {
    title: 'Bangun Rumah',
    description: 'Pembangunan rumah dari nol: perencanaan, struktur, arsitektur, MEP, hingga finishing. Untuk hunian tinggal dan rumah investasi.',
    image: '/projects/Arsana%20Foto%20Recreate/GoldCoast/This_image_is_already_correct_202606212117.jpeg',
    price: 'Mulai Rp 4 Jt',
    unit: '/m²',
    cta: 'Konsultasi Sekarang',
  },
  {
    title: 'Renovasi Rumah',
    description: 'Renovasi sebagian atau total: fasad, dapur, kamar mandi, lantai, plafon, layout, dan perbaikan struktur.',
    image: '/projects/Arsana%20Foto%20Recreate/Cipondoh%20Showroom%20Marmer/Recreate_this_photograph_at_professional_202606221029.jpeg',
    price: 'Mulai Rp 2 Jt',
    unit: '/m²',
    cta: 'Kirim Foto Lokasi',
  },
  {
    title: 'Desain Rumah',
    description: 'Desain arsitektur rumah tinggal: denah, tampak, visualisasi 3D, hingga gambar kerja siap bangun.',
    image: '/projects/Arsana%20Foto%20Recreate/Bangka%20Mampang/Recreate_this_photograph_at_professional_202606212111.jpeg',
    price: 'Mulai Rp 75 Rb',
    unit: '/m²',
    cta: 'Konsultasi Desain',
  },
  {
    title: 'Desain Interior',
    description: 'Desain interior ruang: layout, material, pencahayaan, dan visualisasi 3D sebelum eksekusi.',
    image: '/projects/Arsana%20Foto%20Recreate/Taman%20Kencana/Recreate_this_photograph_at_professional_202606221030.jpeg',
    price: 'Mulai Rp 75 Rb',
    unit: '/m²',
    cta: 'Konsultasi Desain',
  },
  {
    title: 'Furniture Custom',
    description: 'Kitchen set, lemari, meja, dan furniture custom sesuai ukuran & gaya ruang Anda.',
    image: '/projects/Arsana%20Foto%20Recreate/Coffee%20Ground%20Cafe/Recreate_this_photograph_at_professional_202606212155.jpeg',
    price: 'Mulai Rp 1,5 Jt',
    unit: '/m²',
    cta: 'Diskusi Kebutuhan',
  },
  {
    title: 'Bangunan Komersial',
    description: 'Ruko, kantor, cafe, gudang, klinik, dan ruang usaha dengan alur kerja yang lebih terukur dan spesifikasi bisnis.',
    image: '/projects/Arsana%20Foto%20Recreate/Bozz%20Billiard%20Citra%208/Recreate_this_photograph_at_professional_202606212158.jpeg',
    price: 'Custom',
    unit: '',
    cta: 'Jadwalkan Survey',
  },
  {
    title: 'Instalasi Listrik',
    description: 'Sistem kelistrikan standar SNI dengan teknisi bersertifikat.',
    image: '/projects/Arsana%20Foto%20Recreate/Suvarna%20Sutra%20Andara/01_Suvarna-Sutra-Andara_fasad-malam_2018.jpeg_202606212116.jpeg',
    price: 'Custom',
    unit: '',
    cta: 'Konsultasi Sekarang',
  },
  {
    title: 'Instalasi AC',
    description: 'Instalasi dan maintenance AC residensial maupun komersial.',
    image: '/projects/Arsana%20Foto%20Recreate/NavaPark%20BSD/This_image_is_already_correct_202606212123.jpeg',
    price: 'Custom',
    unit: '',
    cta: 'Konsultasi Sekarang',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring' as const, stiffness: 260, damping: 20 } },
}

export function ServicesShowcase() {
  return (
    <div className="relative w-full bg-background overflow-hidden py-24">
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute right-[-15%] top-[-25%] w-[55%] h-[55%] rounded-full bg-orange-200/75 blur-[120px]" />
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-12"
        >
          <div className="flex justify-center">
            <div className="border border-border py-1 px-4 rounded-lg text-muted-foreground text-sm">
              Layanan Kami
            </div>
          </div>
          <h2
            className="text-3xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent"
            style={{ backgroundImage: 'linear-gradient(105deg, #271810 0%, #7A3A18 50%, #B05030 100%)' }}
          >
            Layanan untuk Rumah Tinggal
            <br />dan Bangunan Usaha
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Dari pembangunan baru, renovasi, desain, hingga furniture custom — harga transparan per m², konsultasi gratis.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {services.map((service, i) => (
            <motion.a
              key={service.title}
              href="#kontak"
              variants={cardVariants}
              className="group flex flex-col rounded-2xl border border-border bg-card card-soft overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  quality={90}
                  priority={i === 0}
                  loading={i === 0 ? undefined : 'lazy'}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />
              </div>

              <div className="flex flex-col flex-1 p-5">
                <h3 className="font-bold text-foreground mb-1.5">{service.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-4">
                  {service.description}
                </p>

                <div className="flex items-baseline justify-between border-t border-border pt-3 mb-4">
                  <span className="font-bold text-foreground">{service.price}</span>
                  {service.unit && (
                    <span className="text-sm text-muted-foreground">{service.unit}</span>
                  )}
                </div>

                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary group-hover:underline underline-offset-4">
                  {service.cta}
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
