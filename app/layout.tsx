import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Grain } from '@/components/ui/grain'
import { Cursor } from '@/components/ui/cursor'
import {
  EMAIL,
  WHATSAPP_NUMBER,
  INSTAGRAM_URL,
  FACEBOOK_URL,
  FOUNDED_YEAR,
} from '@/lib/contact'

const inter = Inter({ subsets: ['latin'] })

const SITE_URL = 'https://arsana.id'
const TITLE = 'Arsana — Kontraktor Bangun & Renovasi Jakarta'
const DESCRIPTION =
  'Kontraktor bangun rumah, renovasi, desain interior & eksterior di Jakarta dan Jabodetabek. RAB tertulis, kontrak resmi, pembayaran bertahap, dan laporan progres rutin.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'kontraktor jakarta',
    'jasa bangun rumah',
    'renovasi rumah jakarta',
    'desain interior jakarta',
    'kontraktor jabodetabek',
    'jasa renovasi ruko',
    'bangun rumah mewah',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: SITE_URL,
    siteName: 'Arsana',
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Arsana — Design · Build · Elevate',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
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

// Data terstruktur untuk Google. Nama badan hukum sengaja tidak dicantumkan —
// baru diberikan langsung ke klien saat deal. Alamat juga belum diisi;
// tambahkan properti "address" di sini bila kantor sudah mau dipublikasikan.
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'GeneralContractor',
  name: 'Arsana',
  description: DESCRIPTION,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.svg`,
  image: `${SITE_URL}/og-image.jpg`,
  telephone: `+${WHATSAPP_NUMBER}`,
  email: EMAIL,
  foundingDate: String(FOUNDED_YEAR),
  areaServed: [
    { '@type': 'City', name: 'Jakarta' },
    { '@type': 'City', name: 'Bogor' },
    { '@type': 'City', name: 'Depok' },
    { '@type': 'City', name: 'Tangerang' },
    { '@type': 'City', name: 'Bekasi' },
  ],
  sameAs: [INSTAGRAM_URL, FACEBOOK_URL].filter(Boolean),
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Layanan Arsana',
    itemListElement: [
      'Bangun Rumah',
      'Renovasi Rumah',
      'Desain Rumah',
      'Desain Interior',
      'Furniture Custom',
      'Bangunan Komersial',
      'Instalasi Listrik',
      'Instalasi AC',
    ].map((name) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name },
    })),
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Grain />
        <Cursor />
        {children}
      </body>
    </html>
  )
}
