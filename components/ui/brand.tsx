'use client'

import { useState } from 'react'

/**
 * Slot logo Arsana.
 * - Jika file `public/logo.svg` ADA, logo itu yang ditampilkan.
 * - Jika BELUM ada (default sekarang), otomatis fallback ke wordmark teks.
 *
 * Cara pakai nanti: cukup taruh file logo di `public/logo.svg`
 * (atau ganti path di `LOGO_SRC` bila pakai .png). Tidak perlu ubah kode lain —
 * logo otomatis muncul di navbar, footer, dan bisa dipakai untuk favicon.
 */
const LOGO_SRC = '/logo.svg'

export function Brand({
  className = '',
  imgClassName = 'h-9 w-auto',
}: {
  className?: string
  imgClassName?: string
}) {
  const [logoOk, setLogoOk] = useState(false)

  return (
    <span className={`flex items-center leading-none ${className}`}>
      {/* Coba muat logo; tampil hanya jika berhasil dimuat. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={LOGO_SRC}
        alt="Arsana"
        onLoad={() => setLogoOk(true)}
        onError={() => setLogoOk(false)}
        className={imgClassName}
        style={{ display: logoOk ? 'block' : 'none' }}
      />

      {/* Fallback wordmark — tampil selama logo belum tersedia. */}
      {!logoOk && (
        <span className="flex flex-col leading-none">
          <span
            className="font-serif text-base font-bold tracking-widest uppercase bg-clip-text text-transparent"
            style={{ backgroundImage: 'linear-gradient(105deg, #271810 0%, #7A3A18 60%, #B05030 100%)' }}
          >
            Arsana
          </span>
          <span className="text-[7px] tracking-[0.28em] text-muted-foreground uppercase mt-0.5">
            Design · Build · Elevate
          </span>
        </span>
      )}
    </span>
  )
}
