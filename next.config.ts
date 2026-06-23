import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    // Sajikan format modern yang jauh lebih kecil tanpa menurunkan kualitas visual.
    formats: ['image/avif', 'image/webp'],
    // Next 16 mewajibkan daftar quality yang diizinkan saat prop `quality` dipakai.
    qualities: [75, 90],
    remotePatterns: [
      { protocol: 'https', hostname: 'randomuser.me' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'www.shadcnblocks.com' },
    ],
  },
}

export default nextConfig
