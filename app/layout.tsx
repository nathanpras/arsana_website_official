import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Grain } from '@/components/ui/grain'
import { Cursor } from '@/components/ui/cursor'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Arsana — Kontraktor Interior & Eksterior Profesional',
  description: 'Tim kontraktor profesional untuk desain interior, eksterior, konstruksi, instalasi listrik, dan AC dalam satu layanan terpadu untuk rumah dan bisnis Anda.',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-48.png', sizes: '48x48', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <Grain />
        <Cursor />
        {children}
      </body>
    </html>
  )
}
