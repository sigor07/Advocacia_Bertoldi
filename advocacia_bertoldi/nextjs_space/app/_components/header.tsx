'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Scale, Menu, Search, Linkedin, Instagram, Facebook, Mail, Phone, MapPin, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import { ProcessSearchModal } from './process-search-modal'
import { contactInfo } from '@/lib/site-data'

const navLinks = [
  { label: 'Quem Somos', href: '#quem-somos' },
  { label: 'Áreas de Atuação', href: '#areas' },
  { label: 'Equipe', href: '#equipe' },
  { label: 'Fale Conosco', href: '#contato' },
]

function WhatsappIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled((window?.scrollY ?? 0) > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (href: string) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) {
      const headerOffset = 96
      const elementPosition = el.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  const socials = [
    { icon: WhatsappIcon, href: contactInfo.whatsappLink, label: 'WhatsApp', isWhatsapp: true },
    { icon: Instagram, href: contactInfo.instagram, label: 'Instagram' },
    { icon: Facebook, href: contactInfo.facebook, label: 'Facebook' },
    { icon: Linkedin, href: contactInfo.linkedin, label: 'LinkedIn' },
    { icon: Mail, href: `mailto:${contactInfo.email}`, label: 'E-mail' },
  ]

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-background/95 backdrop-blur-md shadow-[0_2px_20px_-8px_rgba(24,78,119,0.35)] border-b border-border/60'
            : 'bg-[#0d2c46]/85 backdrop-blur-md border-b border-white/10'
        }`}
      >
        {/* Linha Principal (Desktop + Mobile) */}
        <div className="mx-auto flex h-14 sm:h-16 max-w-[1200px] items-center justify-between px-3 sm:px-4 md:px-6">
          {/* Logo */}
          <button
            onClick={() => handleNav('#hero')}
            className="flex items-center gap-2 sm:gap-2.5 text-left shrink-0"
            aria-label="Advocacia Bertoldi — início"
          >
            <span
              className={`flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-md transition-colors ${
                scrolled
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-white/15 text-white backdrop-blur-sm'
              }`}
            >
              <Scale className="h-4 w-4 sm:h-5 sm:w-5" />
            </span>
            <span className="flex flex-col leading-none">
              <span
                className={`font-display text-sm sm:text-base font-bold tracking-tight transition-colors ${
                  scrolled ? 'text-primary' : 'text-white'
                }`}
              >
                ADVOCACIA
              </span>
              <span
                className={`font-display text-[11px] sm:text-[13px] font-semibold tracking-[0.22em] transition-colors ${
                  scrolled ? 'text-foreground/70' : 'text-white/80'
                }`}
              >
                BERTOLDI
              </span>
            </span>
          </button>

          {/* Navegação Desktop */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  scrolled
                    ? 'text-foreground/80 hover:bg-secondary hover:text-primary'
                    : 'text-white/90 hover:bg-white/10 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
            <Button
              size="sm"
              onClick={() => setSearchOpen(true)}
              className={`ml-2 gap-1.5 ${
                scrolled
                  ? ''
                  : 'bg-accent text-[#0d2c46] hover:bg-[#ADE8F4] font-semibold shadow-md'
              }`}
            >
              <Search className="h-4 w-4" />
              Pesquisar Processo
            </Button>
          </nav>

          {/* Redes Sociais Desktop */}
          <div className="hidden items-center gap-0.5 lg:flex">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className={`flex h-9 w-9 items-center justify-center rounded-md transition-colors ${
                  s.isWhatsapp
                    ? 'text-[#25D366] hover:bg-white/15'
                    : scrolled
                    ? 'text-primary hover:bg-secondary'
                    : 'text-white hover:bg-white/15'
                }`}
              >
                <s.icon className="h-[18px] w-[18px]" />
              </a>
            ))}
          </div>

          {/* Ações Rápidas Mobile (Topo) */}
          <div className="flex items-center gap-1.5 lg:hidden">
            {/* Botão Pesquisar Processo direto no mobile */}
            {/* Botão Menu Hambúrguer com alto contraste */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className={`h-8 w-8 shrink-0 rounded-md border transition-colors ${
                    scrolled
                      ? 'border-border bg-secondary/70 text-primary hover:bg-secondary'
                      : 'border-white/20 bg-white/15 text-white hover:bg-white/25'
                  }`}
                  aria-label="Abrir menu de navegação"
                >
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[85vw] max-w-[340px] p-6 overflow-y-auto">
                <SheetTitle className="flex items-center gap-2 font-display text-lg text-primary border-b border-border pb-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
                    <Scale className="h-4 w-4" />
                  </span>
                  <span>Advocacia Bertoldi</span>
                </SheetTitle>

                {/* Destaque Pesquisar Processo no Drawer */}
                <div className="mt-5">
                  <Button
                    onClick={() => {
                      setMobileOpen(false)
                      setSearchOpen(true)
                    }}
                    className="w-full gap-2 bg-primary text-primary-foreground py-2.5 shadow-md justify-center font-semibold"
                  >
                    <Search className="h-4 w-4" />
                    Consultar Processo (CNJ)
                  </Button>
                </div>

                {/* Links de Seções */}
                <nav className="mt-6 flex flex-col gap-1.5">
                  <p className="px-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    Seções do Site
                  </p>
                  {navLinks.map((link) => (
                    <button
                      key={link.href}
                      onClick={() => handleNav(link.href)}
                      className="flex items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm font-medium text-foreground/85 transition-colors hover:bg-secondary hover:text-primary active:bg-secondary"
                    >
                      <span>{link.label}</span>
                      <ArrowRight className="h-3.5 w-3.5 opacity-40" />
                    </button>
                  ))}
                </nav>

                {/* Redes Sociais no Drawer */}
                <div className="mt-6 border-t border-border pt-5">
                  <p className="px-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    Redes Sociais & Contato
                  </p>
                  <div className="mt-3 grid grid-cols-5 gap-2">
                    {socials.map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.label}
                        title={s.label}
                        className={`flex h-11 w-11 items-center justify-center rounded-lg transition-all shadow-sm ${
                          s.isWhatsapp
                            ? 'bg-[#25D366] text-white hover:bg-[#20ba59]'
                            : 'bg-secondary text-primary hover:bg-accent hover:text-primary-foreground'
                        }`}
                      >
                        <s.icon className="h-5 w-5" />
                      </a>
                    ))}
                  </div>
                </div>

                {/* Informações rápidas */}
                <div className="mt-6 border-t border-border pt-4 text-xs text-muted-foreground space-y-2.5">
                  <div className="flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5 text-primary shrink-0" />
                    <a href="tel:+551832810975" className="hover:text-primary transition-colors">
                      {contactInfo.phone}
                    </a>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                    <span>{contactInfo.address}</span>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Faixa de Navegação e Redes Sociais no Mobile (Visível diretamente na tela do celular) */}
        <div
          className={`lg:hidden w-full overflow-x-hidden border-t transition-colors duration-300 ${
            scrolled
              ? 'border-border/60 bg-background/95'
              : 'border-white/10 bg-[#0d2c46]/95 backdrop-blur-md'
          }`}
        >
          <div
            className="mx-auto flex w-full min-w-0 max-w-[1200px] flex-col items-center gap-2 overflow-hidden px-3 py-2"
            style={{ width: '100vw', maxWidth: '100vw', boxSizing: 'border-box' }}
          >
            {/* Navegação Rápida: Quem Somos, Áreas, Equipe, Contato */}
            <nav className="flex w-full min-w-0 max-w-full items-center gap-1 overflow-x-auto pb-0.5 pr-4 scrollbar-none">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className={`rounded-full px-2 py-1 text-[11px] sm:text-xs font-medium whitespace-nowrap transition-all active:scale-95 last:mr-3 ${
                    scrolled
                      ? 'bg-secondary/70 text-foreground/80 hover:bg-secondary hover:text-primary'
                      : 'bg-white/15 text-white/95 hover:bg-white/25'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Divisor sutil */}
            <div
              className={`hidden h-4 w-px shrink-0 ${
                scrolled ? 'bg-border' : 'bg-white/20'
              }`}
            />

            {/* Ícones de Redes Sociais no Mobile */}
            <div
              className="relative w-full"
              style={{
                height: '32px',
              }}
            >
            <Button
              size="sm"
              onClick={() => setSearchOpen(true)}
              className={`h-8 gap-1 px-2 text-[11px] font-semibold shadow-sm ${
                scrolled
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                  : 'bg-accent text-[#0d2c46] hover:bg-[#ADE8F4]'
              }`}
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: 'calc(100% - 144px)',
                maxWidth: '176px',
              }}
            >
              <Search className="h-3.5 w-3.5" />
              Pesquisar Processo
            </Button>

            <div
              className="relative z-[60]"
              style={{
                display: 'flex',
                position: 'absolute',
                right: 0,
                top: '4px',
                width: '136px',
                minWidth: '136px',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: '4px',
                visibility: 'visible',
                opacity: 1,
              }}
            >
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  title={s.label}
                  className={`relative z-[60] rounded-full border border-white/40 shadow-sm transition-all active:scale-95 ${
                    s.isWhatsapp
                      ? 'bg-[#25D366] text-white hover:bg-[#20ba59]'
                      : scrolled
                      ? 'bg-secondary text-primary hover:bg-accent'
                      : 'bg-white text-[#0d2c46] hover:bg-accent'
                  }`}
                  style={{
                    display: 'flex',
                    width: '24px',
                    height: '24px',
                    flex: '0 0 24px',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <s.icon className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
            </div>
          </div>
        </div>
      </motion.header>

      <ProcessSearchModal open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  )
}
