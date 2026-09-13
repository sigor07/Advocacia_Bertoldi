'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { FadeIn } from '@/components/ui/animate'
import { teamMembers } from '@/lib/site-data'

export function Equipe() {
  return (
    <section id="equipe" className="relative overflow-hidden bg-background py-20 md:py-28">
      <div className="absolute inset-0 section-gradient" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1200px] px-4 md:px-6">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-secondary px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            Nossa Equipe
          </span>
          <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Sócios e profissionais{' '}
            <span className="text-primary">comprometidos</span>
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
            Nossos sócios são profissionais altamente qualificados, com vasta experiência em diversas
            áreas do Direito. Com formação acadêmica sólida e reconhecimento no mercado, eles lideram
            nossa equipe com comprometimento, ética e foco em resultados eficazes para os clientes.
          </p>
        </FadeIn>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member, i) => (
            <motion.div
              key={member.name}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.1 }}
              className="group overflow-hidden rounded-2xl bg-card shadow-[var(--shadow-md)] ring-1 ring-border/60 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-lg)]"
            >
              <div className="relative overflow-hidden bg-muted">
                <Image
                  src={member.photo}
                  alt={`Foto de ${member.name}, ${member.role} da Advocacia Bertoldi`}
                  width={552}
                  height={552}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="h-auto w-full transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
