'use client'

import { motion } from 'framer-motion'
import { FaWhatsapp } from 'react-icons/fa'
import { waLink } from '@/lib/contact'

const WA_URL = waLink(
  'Halo Arsana! Saya tertarik dengan layanan desain dan konstruksi Anda. Bisakah saya mendapatkan informasi lebih lanjut dan konsultasi gratis?'
)

export function WhatsAppButton() {
  return (
    <a
      href={WA_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat via WhatsApp"
      className="fixed bottom-6 right-6 z-50"
    >
      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />

      <motion.div
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg shadow-[#25D366]/40"
      >
        <FaWhatsapp className="w-7 h-7 text-white" />
      </motion.div>
    </a>
  )
}
