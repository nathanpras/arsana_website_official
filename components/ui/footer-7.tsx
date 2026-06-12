'use client'

import React from 'react'
import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa'

interface Footer7Props {
  logo?: {
    url: string
    src: string
    alt: string
    title: string
  }
  sections?: Array<{
    title: string
    links: Array<{ name: string; href: string }>
  }>
  description?: string
  socialLinks?: Array<{
    icon: React.ReactElement
    href: string
    label: string
  }>
  copyright?: string
  legalLinks?: Array<{
    name: string
    href: string
  }>
}

const defaultSections = [
  {
    title: 'Layanan',
    links: [
      { name: 'Desain Interior', href: '#features' },
      { name: 'Desain Eksterior', href: '#features' },
      { name: 'Konstruksi & Renovasi', href: '#features' },
      { name: 'Instalasi Listrik', href: '#features' },
      { name: 'Instalasi AC', href: '#features' },
      { name: 'Furniture Custom', href: '#features' },
    ],
  },
  {
    title: 'Perusahaan',
    links: [
      { name: 'Tentang Kami', href: '#' },
      { name: 'Tim Kami', href: '#' },
      { name: 'Portofolio', href: '#' },
      { name: 'Karir', href: '#' },
    ],
  },
  {
    title: 'Dukungan',
    links: [
      { name: 'Konsultasi Gratis', href: '#' },
      { name: 'FAQ', href: '#faq' },
      { name: 'Hubungi Kami', href: '#' },
      { name: 'Garansi Layanan', href: '#' },
    ],
  },
]

const defaultSocialLinks = [
  { icon: <FaInstagram className="size-5" />, href: '#', label: 'Instagram' },
  { icon: <FaFacebook className="size-5" />, href: '#', label: 'Facebook' },
  { icon: <FaWhatsapp className="size-5" />, href: '#', label: 'WhatsApp' },
  { icon: <FaLinkedin className="size-5" />, href: '#', label: 'LinkedIn' },
]

const defaultLegalLinks = [
  { name: 'Syarat & Ketentuan', href: '#' },
  { name: 'Kebijakan Privasi', href: '#' },
]

export const Footer7 = ({
  logo = {
    url: '#',
    src: '',
    alt: '',
    title: 'Arsana',
  },
  sections = defaultSections,
  description = 'Tim kontraktor profesional untuk desain interior, eksterior, konstruksi, instalasi listrik, dan AC dalam satu layanan terpadu.',
  socialLinks = defaultSocialLinks,
  copyright = '© 2025 Arsana. Hak cipta dilindungi.',
  legalLinks = defaultLegalLinks,
}: Footer7Props) => {
  return (
    <section className="py-24 bg-[hsl(var(--panel-deep))] border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex w-full flex-col justify-between gap-10 lg:flex-row lg:items-start lg:text-left">
          <div className="flex w-full flex-col justify-between gap-6 lg:items-start">
            <a href={logo.url} className="flex flex-col leading-none">
              <span
                className="font-serif text-base font-bold tracking-widest uppercase bg-clip-text text-transparent"
                style={{ backgroundImage: 'linear-gradient(105deg, #271810 0%, #7A3A18 60%, #B05030 100%)' }}
              >Arsana</span>
              <span className="text-[7px] tracking-[0.28em] text-muted-foreground uppercase mt-0.5">Design · Build · Elevate</span>
            </a>
            <p className="max-w-[70%] text-sm text-muted-foreground">{description}</p>
            <ul className="flex items-center space-x-6 text-muted-foreground">
              {socialLinks.map((social, idx) => (
                <li key={idx} className="font-medium hover:text-primary transition-colors">
                  <a href={social.href} aria-label={social.label}>
                    {social.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid w-full gap-6 md:grid-cols-3 lg:gap-20">
            {sections.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-bold text-foreground">{section.title}</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx} className="font-medium hover:text-primary transition-colors">
                      <a href={link.href}>{link.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 flex flex-col justify-between gap-4 border-t border-border py-8 text-xs font-medium text-muted-foreground md:flex-row md:items-center md:text-left">
          <p className="order-2 lg:order-1">{copyright}</p>
          <ul className="order-1 flex flex-col gap-2 md:order-2 md:flex-row">
            {legalLinks.map((link, idx) => (
              <li key={idx} className="hover:text-primary transition-colors">
                <a href={link.href}>{link.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
