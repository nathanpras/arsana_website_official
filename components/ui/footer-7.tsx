'use client'

import React from 'react'
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa'
import { waLink, INSTAGRAM_URL, FACEBOOK_URL } from '@/lib/contact'
import { Brand } from '@/components/ui/brand'

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
    title: 'Jelajahi',
    links: [
      { name: 'Portofolio', href: '#portfolio' },
      { name: 'Cara Kerja', href: '#process' },
      { name: 'FAQ', href: '#faq' },
    ],
  },
  {
    title: 'Dukungan',
    links: [
      { name: 'Konsultasi Gratis', href: '#kontak' },
      { name: 'Hubungi Kami', href: '#kontak' },
      { name: 'FAQ', href: '#faq' },
    ],
  },
]

const defaultSocialLinks = [
  { icon: <FaInstagram className="size-5" />, href: INSTAGRAM_URL, label: 'Instagram' },
  { icon: <FaFacebook className="size-5" />, href: FACEBOOK_URL, label: 'Facebook' },
  { icon: <FaWhatsapp className="size-5" />, href: waLink(), label: 'WhatsApp' },
]

const defaultLegalLinks: Array<{ name: string; href: string }> = []

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
            <a href={logo.url} aria-label={logo.title}>
              <Brand imgClassName="h-12 w-auto" />
            </a>
            <p className="max-w-[70%] text-sm text-muted-foreground">{description}</p>
            <ul className="flex items-center space-x-6 text-muted-foreground">
              {socialLinks.map((social, idx) => (
                <li key={idx} className="font-medium hover:text-primary transition-colors">
                  <a
                    href={social.href}
                    aria-label={social.label}
                    target={social.href.startsWith('http') ? '_blank' : undefined}
                    rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
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
          {legalLinks.length > 0 && (
            <ul className="order-1 flex flex-col gap-2 md:order-2 md:flex-row">
              {legalLinks.map((link, idx) => (
                <li key={idx} className="hover:text-primary transition-colors">
                  <a href={link.href}>{link.name}</a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}
