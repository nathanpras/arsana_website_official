import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Arsana — Kontraktor Interior & Eksterior Profesional',
  description: 'Tim kontraktor profesional untuk desain interior, eksterior, konstruksi, instalasi listrik, dan AC dalam satu layanan terpadu untuk rumah dan bisnis Anda.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
