import { SplineSceneBasic } from '@/components/ui/splite'
import { ProblemSection } from '@/components/ui/problem-section'
import { TrustSection } from '@/components/ui/trust-section'
import { Component as InfiniteGrid } from '@/components/ui/the-infinite-grid'
import { Portfolio } from '@/components/ui/portfolio'
import { ProcessSteps } from '@/components/ui/process-steps'
import { FAQ } from '@/components/ui/faq'
import { FinalCTA } from '@/components/ui/final-cta'
import { ContactForm } from '@/components/ui/contact-form'
import { Footer7 } from '@/components/ui/footer-7'
import { WhatsAppButton } from '@/components/ui/whatsapp-button'
import { Brand } from '@/components/ui/brand'

export default function Home() {
  return (
    <main className="bg-background min-h-screen">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-8 py-4 bg-background/80 backdrop-blur-sm border-b border-border">
        <a href="#" aria-label="Arsana — beranda">
          <Brand imgClassName="h-10 w-auto" />
        </a>
        <div className="hidden md:flex items-center gap-8 text-muted-foreground text-sm">
          <a href="#features" className="hover:text-foreground transition-colors">Layanan</a>
          <a href="#portfolio" className="hover:text-foreground transition-colors">Portofolio</a>
          <a href="#process" className="hover:text-foreground transition-colors">Cara Kerja</a>
          <a href="#faq" className="hover:text-foreground transition-colors">FAQ</a>
          <a href="#kontak" className="hover:text-foreground transition-colors">Kontak</a>
        </div>
        <a
          href="#kontak"
          data-magnetic
          className="px-4 py-2 border border-foreground/20 text-foreground text-sm font-semibold rounded-lg hover:bg-foreground/5 transition-colors"
        >
          Konsultasi via WA
        </a>
      </nav>

      {/* 1. Hero */}
      <section className="pt-16">
        <SplineSceneBasic />
      </section>

      {/* 2. Problem — sebut masalah calon klien */}
      <section id="problem" className="border-t border-border">
        <ProblemSection />
      </section>

      {/* 3. Trust — kurangi risiko dengan bukti */}
      <section id="trust" className="border-t border-border">
        <TrustSection />
      </section>

      {/* 4. Layanan */}
      <section id="features" className="border-t border-border">
        <InfiniteGrid />
      </section>

      {/* 5. Portofolio */}
      <section id="portfolio" className="border-t border-border">
        <Portfolio />
      </section>

      {/* 6. Proses Kerja */}
      <section id="process" className="border-t border-border">
        <ProcessSteps />
      </section>

      {/* 8. FAQ */}
      <section id="faq" className="border-t border-border">
        <FAQ />
      </section>

      {/* 10. Final CTA */}
      <section className="border-t border-border">
        <FinalCTA />
      </section>

      {/* 11. Contact Form */}
      <section className="border-t border-border">
        <ContactForm />
      </section>

      {/* Footer */}
      <Footer7 />

      {/* Floating WhatsApp */}
      <WhatsAppButton />
    </main>
  )
}
