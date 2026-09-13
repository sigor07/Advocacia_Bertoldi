'use client'

import { motion } from 'framer-motion'
import { FadeIn } from '@/components/ui/animate'
import { practiceAreas } from '@/lib/site-data'

export function AreasAtuacao() {
  return (
    <section id="areas" className="relative bg-secondary/40 py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-4 md:px-6">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            Áreas de Atuação
          </span>
          <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Soluções jurídicas para{' '}
            <span className="text-primary">cada necessidade</span>
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
            Atuação multidisciplinar com profundidade técnica. Conheça as principais frentes em que
            defendemos os interesses dos nossos clientes.
          </p>
        </FadeIn>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {practiceAreas.map((area, i) => (
            <motion.div
              key={area.title}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
              className="group relative overflow-hidden rounded-xl bg-card p-6 shadow-[var(--shadow-sm)] ring-1 ring-border/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lg)] hover:ring-primary/30"
            >
              <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-primary to-accent transition-transform duration-300 group-hover:scale-x-100" />
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                <area.icon className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-semibold tracking-tight text-foreground">
                {area.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {area.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
