'use client'

import React from 'react'
import { motion } from 'framer-motion'

const testimonials = [
  {
    text: 'Arsana mengubah ruang tamu dan dapur kami menjadi luar biasa. Desain interiornya sangat detail dan hasilnya benar-benar melebihi ekspektasi kami.',
    image: 'https://randomuser.me/api/portraits/women/1.jpg',
    name: 'Siti Rahayu',
    role: 'Homeowner, Jakarta Selatan',
  },
  {
    text: 'Proses renovasi kantor kami berjalan lancar dan tepat waktu. Tim Arsana sangat profesional dan komunikatif selama pengerjaan berlangsung.',
    image: 'https://randomuser.me/api/portraits/men/2.jpg',
    name: 'Budi Santoso',
    role: 'Direktur, PT Maju Bersama',
  },
  {
    text: 'Instalasi listrik dan AC di restoran kami dikerjakan dengan rapi dan standar SNI. Kami merasa aman dan sangat puas dengan hasilnya.',
    image: 'https://randomuser.me/api/portraits/women/3.jpg',
    name: 'Dewi Kusuma',
    role: 'Owner, Restoran Nusantara',
  },
  {
    text: 'Kitchen set custom dari Arsana pas sekali dengan ukuran dan konsep dapur kami. Kualitas materialnya sangat bagus dan finishing-nya rapi.',
    image: 'https://randomuser.me/api/portraits/men/4.jpg',
    name: 'Andi Wijaya',
    role: 'Homeowner, Bekasi',
  },
  {
    text: 'Fasad rumah kami berubah total setelah dikerjakan Arsana. Desain eksteriornya modern dan elegan. Banyak tetangga yang memuji hasilnya.',
    image: 'https://randomuser.me/api/portraits/women/5.jpg',
    name: 'Ratna Sari',
    role: 'Homeowner, Tangerang',
  },
  {
    text: 'Renovasi total villa kami di Bali ditangani Arsana dari nol hingga selesai. Hasilnya memuaskan, kualitas terjaga, dan tepat sesuai jadwal.',
    image: 'https://randomuser.me/api/portraits/women/6.jpg',
    name: 'Made Ariawan',
    role: 'Property Owner, Bali',
  },
  {
    text: 'Konsultasi desain gratis dari Arsana sangat membantu kami merencanakan renovasi. Tim mereka sabar dan selalu memberikan solusi terbaik.',
    image: 'https://randomuser.me/api/portraits/men/7.jpg',
    name: 'Hendra Gunawan',
    role: 'Homeowner, Surabaya',
  },
  {
    text: 'Instalasi AC untuk seluruh gedung kantor kami selesai tepat waktu. Teknisi Arsana bersertifikat dan hasil pemasangannya sangat rapi.',
    image: 'https://randomuser.me/api/portraits/women/8.jpg',
    name: 'Lestari Putri',
    role: 'Manajer Operasional, Perusahaan Logistik',
  },
  {
    text: 'Lemari dan meja kerja custom dari Arsana pas sempurna di ruang kerja saya. Desain fungsional, material premium, harga sangat terjangkau.',
    image: 'https://randomuser.me/api/portraits/men/9.jpg',
    name: 'Rizki Pratama',
    role: 'Freelancer & Content Creator',
  },
]

export const TestimonialsColumn = (props: {
  className?: string
  testimonials: typeof testimonials
  duration?: number
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{ translateY: '-50%' }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: 'linear',
          repeatType: 'loop',
        }}
        className="flex flex-col gap-6 pb-6 bg-background"
      >
        {[...new Array(2).fill(0).map((_, index) => (
          <React.Fragment key={index}>
            {props.testimonials.map(({ text, image, name, role }, i) => (
              <div
                className="p-10 rounded-3xl border border-border shadow-lg shadow-primary/10 max-w-xs w-full bg-card"
                key={i}
              >
                <div className="text-foreground text-sm leading-relaxed">{text}</div>
                <div className="flex items-center gap-2 mt-5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    width={40}
                    height={40}
                    src={image}
                    alt={name}
                    className="h-10 w-10 rounded-full"
                  />
                  <div className="flex flex-col">
                    <div className="font-medium tracking-tight leading-5 text-foreground">{name}</div>
                    <div className="leading-5 opacity-60 tracking-tight text-muted-foreground text-sm">
                      {role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))]}
      </motion.div>
    </div>
  )
}

const firstColumn = testimonials.slice(0, 3)
const secondColumn = testimonials.slice(3, 6)
const thirdColumn = testimonials.slice(6, 9)

export const Testimonials = () => {
  return (
    <section className="bg-background py-24 relative overflow-hidden">
      <div className="container z-10 mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto space-y-4"
        >
          <div className="flex justify-center">
            <div className="border border-border py-1 px-4 rounded-lg text-muted-foreground text-sm">
              Testimoni
            </div>
          </div>

          <h2
            className="text-3xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent"
            style={{ backgroundImage: 'linear-gradient(105deg, #271810 0%, #7A3A18 50%, #B05030 100%)' }}
          >
            Kata Klien Kami
          </h2>
          <p className="text-center text-muted-foreground">
            Kepuasan klien adalah prioritas utama kami di setiap proyek.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn
            testimonials={secondColumn}
            className="hidden md:block"
            duration={19}
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            className="hidden lg:block"
            duration={17}
          />
        </div>
      </div>
    </section>
  )
}
