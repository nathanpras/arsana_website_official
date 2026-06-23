'use client'

import { useState } from 'react'

/**
 * Logo Arsana. Menampilkan `public/logo.png` (lockup monogram + wordmark).
 * Jika file hilang/gagal dimuat, otomatis fallback ke wordmark teks.
 * Ganti logo cukup dengan menimpa file di `public/logo.png`.
 */
const LOGO_SRC = '/logo.png'

export function Brand({
  className = '',
  imgClassName = 'h-9 w-auto',
}: {
  className?: string
  imgClassName?: string
}) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <span className={`flex flex-col leading-none ${className}`}>
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
    )
  }

  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      src={LOGO_SRC}
      alt="Arsana — Design · Build · Elevate"
      onError={() => setFailed(true)}
      className={`${imgClassName} ${className}`}
    />
  )
}
