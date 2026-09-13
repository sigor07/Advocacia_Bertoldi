'use client'

import { motion } from 'framer-motion'
import { FadeIn } from '@/components/ui/animate'
import { CountUp } from './count-up'
import { Award, ShieldCheck, Scale, Landmark } from 'lucide-react'

const stats = [
  { icon: Award, end: 10, suffix: '+', label: 'Anos de atuação' },
  { icon: Landmark, end: 2009, prefix: '', label: 'Fundado em', mono: true },
  { icon: Scale, end: 12, prefix: '+', suffix: '', label: 'Áreas do Direito' },
  { icon: ShieldCheck, end: 2, suffix: '', label: 'Atuação no STJ e STF' },
]

export function QuemSomos() {
  return (
    <section id="quem-somos" className="relative overflow-hidden bg-background py-20 md:py-28">
      <div className="absolute inset-0 section-gradient" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1200px] px-4 md:px-6">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-secondary px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            Quem Somos
          </span>
          <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Atuação estratégica e{' '}
            <span className="text-primary">rigor técnico</span> em cada caso
          </h2>
        </FadeIn>

        <div className="mt-12 grid items-start gap-10 lg:grid-cols-5">
          <FadeIn delay={0.1} className="space-y-5 text-[15px] leading-relaxed text-muted-foreground lg:col-span-3">
            <p>
              Com mais de 10 anos de atuação, o escritório <strong className="text-foreground">Advocacia Bertoldi</strong> tem como princípios o profissionalismo, a ética e o respeito no atendimento aos seus clientes, oferecendo-lhes qualidade e agilidade nos serviços prestados. Todos os profissionais têm como premissa de sua função prestar um atendimento personalizado e eficiente, visando defender os interesses de seus clientes e oferecer a melhor solução para os casos, dentro das normas da ética profissional.
            </p>
            <p>
              A Advocacia Bertoldi é reconhecida por sua atuação estratégica e rigor técnico em assessoria jurídica. Nossa equipe altamente qualificada está focada em resultados concretos, oferecendo atendimento personalizado e soluções jurídicas inovadoras adaptadas às necessidades específicas de cada cliente.
            </p>
            <p>
              Fundado em 2009 por <strong className="text-foreground">Gleidmilson Bertoldi</strong>, o escritório é reconhecido por atuar em grandes processos trabalhistas, dos quais podemos citar o caso que envolveu trabalhadores rurais e a usina de açúcar e álcool DECASA; bem como a intensa atuação na defesa dos funcionários públicos municipais de Caiuá-SP e processos previdenciários. Além de casos abrangidos pela lei de drogas, atuando na defesa dos acusados em primeira e segunda instância, bem como junto ao Superior Tribunal de Justiça e ao Supremo Tribunal Federal.
            </p>
          </FadeIn>

          <FadeIn delay={0.2} className="lg:col-span-2">
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={false}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="rounded-xl bg-card p-5 shadow-[var(--shadow-md)] ring-1 ring-border/60 transition-shadow hover:shadow-[var(--shadow-lg)]"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <s.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="font-display text-2xl font-bold tracking-tight text-primary">
                    <CountUp end={s.end} prefix={s.prefix} suffix={s.suffix} />
                  </div>
                  <p className="mt-1 text-xs font-medium text-muted-foreground">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
