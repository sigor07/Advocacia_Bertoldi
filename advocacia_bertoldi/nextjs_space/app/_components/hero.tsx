'use client'

import { motion } from 'framer-motion'
import { ChevronDown, Scale, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Hero() {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView?.({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="relative flex min-h-[100svh] items-end justify-center overflow-hidden bg-[#0d2c46]">
      {/* Vídeo de fundo */}
      <video
        className="absolute inset-0 h-full w-full object-contain sm:object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/og-image.png"
      >
        <source src="/uploads/hero-video-final.mp4" type="video/mp4" />
      </video>

      {/* Overlays de leitura — leves no topo (vídeo visível), escuro apenas na base para o texto */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0d2c46] via-[#0d2c46]/45 to-[#0d2c46]/10" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0d2c46] to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-4 pb-24 pt-44 text-center sm:pb-28 lg:pt-40 md:px-6">
        <motion.div
          initial={false}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md ring-1 ring-white/20 sm:mb-6 sm:h-16 sm:w-16"
        >
          <Scale className="h-6 w-6 text-white sm:h-8 sm:w-8" />
        </motion.div>

        <motion.p
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mx-auto mb-3 max-w-full text-[clamp(0.68rem,2.7vw,0.875rem)] font-semibold uppercase leading-relaxed tracking-[0.12em] text-accent sm:mb-4 sm:tracking-[0.28em]"
        >
          Advocacia Bertoldi — Presidente Epitácio/SP
        </motion.p>

        <motion.h1
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mx-auto max-w-4xl font-display text-[clamp(2rem,8.5vw,3rem)] font-bold leading-[1.08] tracking-tight text-white [text-shadow:0_2px_18px_rgba(0,0,0,0.55)] sm:text-5xl md:text-6xl"
        >
          Transformamos desafios jurídicos em{' '}
          <span className="text-gradient-blue">soluções eficientes</span>
        </motion.h1>

        <motion.p
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/90 [text-shadow:0_1px_12px_rgba(0,0,0,0.5)] sm:mt-6 sm:text-base md:text-lg"
        >
          Mais de 10 anos de atuação pautada no profissionalismo, na ética e no rigor técnico.
          Atendimento personalizado e estratégico para defender o que é seu.
        </motion.p>

        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-7 flex flex-col items-center justify-center gap-3 sm:mt-9 sm:flex-row"
        >
          <Button
            size="lg"
            onClick={() => scrollTo('#contato')}
            className="w-full max-w-xs gap-2 bg-accent text-[#0d2c46] shadow-xl hover:bg-[#ADE8F4] sm:w-auto"
          >
            Fale com um advogado
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button
            size="lg"
            onClick={() => scrollTo('#areas')}
            className="w-full max-w-xs gap-2 bg-accent text-[#0d2c46] shadow-xl hover:bg-[#ADE8F4] sm:w-auto"
          >
            Nossas áreas de atuação
          </Button>
        </motion.div>
      </div>

      <motion.button
        onClick={() => scrollTo('#quem-somos')}
        aria-label="Rolar para baixo"
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-white/70 hover:text-white"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown className="h-7 w-7" />
      </motion.button>
    </section>
  )
}
