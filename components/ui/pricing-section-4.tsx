'use client'

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { motion, useInView } from 'framer-motion'
import { Check } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

interface PricingFeature {
  title: string
  items: string[]
}

interface PricingCardProps {
  title: string
  description: string
  price: number
  originalPrice?: number
  features: PricingFeature[]
  buttonText?: string
  onButtonClick?: () => void
}

function PricingCard({
  title,
  description,
  price,
  originalPrice,
  features,
  buttonText = 'Konsultasi Gratis',
  onButtonClick,
}: PricingCardProps) {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true)
    }
  }, [isInView, hasAnimated])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 260, damping: 20 },
    },
  }

  const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: 'spring', stiffness: 100, damping: 10 },
    },
  }

  return (
    <motion.div
      ref={containerRef}
      className="container"
      initial="hidden"
      animate={hasAnimated ? 'visible' : 'hidden'}
      variants={containerVariants}
    >
      <Card className="relative mx-auto w-full max-w-6xl overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Left — title + price + CTA */}
          <motion.div
            className="flex flex-col justify-between p-6 lg:w-2/5 lg:p-10"
            variants={itemVariants}
          >
            <div>
              <CardHeader className="p-0">
                <CardTitle className="text-3xl font-bold">{title}</CardTitle>
                <CardDescription className="mt-2">{description}</CardDescription>
              </CardHeader>

              <motion.div className="mt-6 space-y-2" variants={itemVariants}>
                <div className="flex items-baseline gap-1">
                  <span className="text-lg font-medium text-muted-foreground">Rp</span>
                  <span className="text-5xl font-extrabold text-foreground">{price}</span>
                  <span className="text-2xl font-semibold text-muted-foreground">Jt</span>
                  {originalPrice && (
                    <span className="ml-2 text-xl text-muted-foreground line-through">
                      Rp {originalPrice} Jt
                    </span>
                  )}
                </div>
                <span className="block text-sm text-muted-foreground">
                  estimasi proyek residensial
                </span>
              </motion.div>
            </div>

            <motion.div className="mt-8" variants={itemVariants}>
              <Button className="w-full" size="lg" onClick={onButtonClick}>
                {buttonText}
              </Button>
            </motion.div>
          </motion.div>

          <Separator className="lg:my-6 lg:hidden" />

          {/* Right — feature groups */}
          <motion.div
            className="bg-muted/50 p-6 lg:w-3/5 lg:p-10"
            variants={itemVariants}
          >
            <div className="space-y-6">
              {features.map((feature, featureIndex) => (
                <div key={featureIndex}>
                  <h3 className="mb-4 text-lg font-semibold text-foreground">{feature.title}:</h3>
                  <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    {feature.items.map((item, index) => (
                      <motion.li
                        key={index}
                        className="flex items-center"
                        variants={listItemVariants}
                        custom={index + featureIndex * feature.items.length}
                      >
                        <Check className="mr-2 h-4 w-4 flex-shrink-0 text-primary" />
                        <span className="text-sm text-foreground">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                  {featureIndex < features.length - 1 && <Separator className="my-6" />}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  )
}

const arsanaFeatures: PricingFeature[] = [
  {
    title: 'Desain',
    items: [
      'Desain Interior Lengkap',
      'Desain Eksterior & Fasad',
      '3D Rendering & Visualisasi',
      '2D Floor Plan',
      'Desain Landscape & Outdoor',
      'Konsultasi Desain Gratis',
    ],
  },
  {
    title: 'Konstruksi & Renovasi',
    items: [
      'Renovasi & Pembangunan Baru',
      'Material Standar SNI',
      'Project Management Penuh',
      'Quality Control Berkala',
      'Timeline Terstruktur',
      'Garansi Pengerjaan 1 Tahun',
    ],
  },
  {
    title: 'Instalasi',
    items: [
      'Instalasi Listrik Bersertifikat',
      'Instalasi AC Multi-Unit',
      'Smart Home Integration',
      'Maintenance & Support',
      'Inspeksi Pasca Instalasi',
      'Garansi Instalasi Resmi',
    ],
  },
  {
    title: 'Furniture Custom',
    items: [
      'Kitchen Set',
      'Lemari & Wardrobe Custom',
      'Meja & Rak Custom',
      'Ukuran Sesuai Dimensi Ruang',
      'Pilihan Material Premium',
      'Finishing Berkualitas Tinggi',
    ],
  },
]

export default function PricingSection() {
  return (
    <div className="bg-background py-24">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-10"
        >
          <div className="flex justify-center">
            <div className="border border-border py-1 px-4 rounded-lg text-muted-foreground text-sm">
              Harga
            </div>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
            Paket harga untuk setiap kebutuhan
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Pilih paket yang sesuai dengan kebutuhan proyek Anda. Konsultasi gratis tersedia untuk semua paket.
          </p>
        </motion.div>
      </div>

      <PricingCard
        title="Paket Profesional Arsana"
        description="Solusi lengkap untuk desain, konstruksi, instalasi listrik & AC, serta furniture custom — dalam satu layanan terpadu untuk rumah dan bisnis Anda."
        price={45}
        originalPrice={65}
        buttonText="Konsultasi Gratis"
        features={arsanaFeatures}
      />
    </div>
  )
}
