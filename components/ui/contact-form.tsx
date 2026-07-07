'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, MapPin, MessageCircle, Phone } from 'lucide-react'
import { GridBackground } from '@/components/ui/grid-background'
import { waLink } from '@/lib/contact'

const projectTypes = [
  'Bangun Rumah Baru',
  'Renovasi Rumah',
  'Interior / Fit-Out',
  'Bangunan Komersial',
  'Lainnya',
]

export function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    location: '',
    projectType: '',
    area: '',
    message: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const buildWAMessage = () => {
    return [
      'Halo Arsana, saya ingin konsultasi proyek.',
      `Nama: ${form.name}`,
      form.phone ? `No. HP: ${form.phone}` : '',
      `Lokasi proyek: ${form.location}`,
      `Jenis pekerjaan: ${form.projectType}`,
      form.area ? `Perkiraan luas: ${form.area} m²` : '',
      form.message ? `Catatan: ${form.message}` : '',
      'Mohon bantu estimasi awal.',
    ]
      .filter(Boolean)
      .join('\n')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    window.open(waLink(buildWAMessage()), '_blank')
  }

  return (
    <GridBackground>
      <section id="kontak" className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center border border-border py-1 px-4 rounded-lg text-muted-foreground text-sm mb-6">
                Mulai Proyek
              </div>
              <h2
                className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-6"
                style={{
                  backgroundImage: 'linear-gradient(105deg, #1C1814 0%, #7A3A18 50%, #B05030 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Minta Estimasi
                <br />Awal Proyek Anda
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-10">
                Ceritakan kebutuhan proyek Anda. Tim kami akan bantu arahkan langkah awal
                — gratis, tanpa komitmen, tanpa tekanan.
              </p>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, #C4683020, #E8A87015)' }}
                  >
                    <MessageCircle className="w-5 h-5" style={{ color: '#E8A870' }} />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">Chat via WhatsApp</p>
                    <p className="text-muted-foreground text-sm">+62 812-3456-7890 · Respon dalam 1 jam kerja</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, #C4683020, #E8A87015)' }}
                  >
                    <MapPin className="w-5 h-5" style={{ color: '#E8A870' }} />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">Area Layanan</p>
                    <p className="text-muted-foreground text-sm">Jakarta Selatan, Barat, Timur, Utara, Pusat & Jabodetabek</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, #C4683020, #E8A87015)' }}
                  >
                    <Phone className="w-5 h-5" style={{ color: '#E8A870' }} />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">Survey Lokasi Gratis</p>
                    <p className="text-muted-foreground text-sm">Tidak ada biaya survey · Tidak ada kewajiban setelah konsultasi</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right — Form */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
            >
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-border bg-card card-soft p-8 space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Nama <span className="text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Nama Anda"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/60 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Nomor WhatsApp <span className="text-primary">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="08xx-xxxx-xxxx"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/60 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Lokasi Proyek <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    name="location"
                    required
                    value={form.location}
                    onChange={handleChange}
                    placeholder="Kecamatan / Kota (contoh: Kebayoran Baru, Jakarta Selatan)"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/60 transition"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Jenis Pekerjaan <span className="text-primary">*</span>
                    </label>
                    <select
                      name="projectType"
                      required
                      value={form.projectType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/60 transition"
                    >
                      <option value="" disabled>Pilih jenis pekerjaan</option>
                      {projectTypes.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Perkiraan Luas (m²)
                    </label>
                    <input
                      type="text"
                      name="area"
                      value={form.area}
                      onChange={handleChange}
                      placeholder="contoh: 80 m²"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/60 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Ceritakan Kebutuhan Anda
                  </label>
                  <textarea
                    name="message"
                    rows={3}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Kondisi saat ini, rencana, atau pertanyaan yang ingin ditanyakan..."
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/60 transition resize-none"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="group w-full flex items-center justify-center gap-2.5 py-4 px-4 rounded-xl font-semibold text-sm transition-all duration-300 text-stone-950 hover:brightness-105 active:scale-[0.98]"
                    style={{ background: 'linear-gradient(105deg, #E8A870, #C46830)' }}
                  >
                    <Send className="w-4 h-4 shrink-0" />
                    <span className="whitespace-nowrap">Kirim ke WhatsApp</span>
                  </button>
                  <p className="text-center text-xs text-muted-foreground mt-3">
                    Gratis, tidak ada komitmen
                  </p>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </GridBackground>
  )
}
