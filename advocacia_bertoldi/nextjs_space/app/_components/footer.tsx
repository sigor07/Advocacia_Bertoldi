'use client'

import { Scale, MapPin, Phone, Mail, Linkedin, Instagram, Facebook } from 'lucide-react'
import { contactInfo } from '@/lib/site-data'

function WhatsappIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}

export function Footer() {
  const socials = [
    { icon: Linkedin, href: contactInfo.linkedin, label: 'LinkedIn' },
    { icon: Instagram, href: contactInfo.instagram, label: 'Instagram' },
    { icon: Facebook, href: contactInfo.facebook, label: 'Facebook' },
    { icon: WhatsappIcon, href: contactInfo.whatsappLink, label: 'WhatsApp' },
    { icon: Mail, href: `mailto:${contactInfo.email}`, label: 'E-mail' },
  ]

  const scrollTo = (id: string) => document.querySelector(id)?.scrollIntoView?.({ behavior: 'smooth' })

  return (
    <footer className="bg-[#0d2c46] text-white">
      <div className="mx-auto max-w-[1200px] px-4 py-14 md:px-6">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-white/10">
                <Scale className="h-5 w-5 text-accent" />
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-display text-base font-bold tracking-tight">ADVOCACIA</span>
                <span className="font-display text-[13px] font-semibold tracking-[0.22em] text-white/80">BERTOLDI</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
              Advocacia estratégica e rigor técnico. Mais de 10 anos defendendo os interesses dos
              nossos clientes com ética e profissionalismo.
            </p>
            <div className="mt-5 flex items-center gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-md bg-white/10 text-white/85 transition-colors hover:bg-accent hover:text-[#0d2c46]"
                >
                  <s.icon className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-widest text-accent">Navegação</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-white/70">
              {[
                { label: 'Quem Somos', href: '#quem-somos' },
                { label: 'Áreas de Atuação', href: '#areas' },
                { label: 'Equipe', href: '#equipe' },
                { label: 'Fale Conosco', href: '#contato' },
              ].map((l) => (
                <li key={l.href}>
                  <button onClick={() => scrollTo(l.href)} className="transition-colors hover:text-white">
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-widest text-accent">Contato</h4>
            <ul className="mt-4 space-y-3.5 text-sm text-white/70">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span>{contactInfo.address}, {contactInfo.cep}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-accent" />
                <a href="tel:+551832810975" className="transition-colors hover:text-white">{contactInfo.phone}</a>
              </li>
              <li className="flex items-center gap-3">
                <WhatsappIcon className="h-4 w-4 shrink-0 text-accent" />
                <a href={contactInfo.whatsappLink} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
                  WhatsApp: {contactInfo.whatsappDisplay}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-accent" />
                <a href={`mailto:${contactInfo.email}`} className="transition-colors hover:text-white" suppressHydrationWarning>{contactInfo.email}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-white/50" suppressHydrationWarning>
          © {new Date().getFullYear()} Advocacia Bertoldi. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  )
}