'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FadeIn } from '@/components/ui/animate'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { Turnstile } from './turnstile'
import { MapSection } from './map-section'
import { contactInfo } from '@/lib/site-data'
import { User, Mail, Tag, MessageSquare, Send, MapPin, Phone, Clock, ShieldCheck } from 'lucide-react'

export function Contato() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [token, setToken] = useState('')
  const [loading, setLoading] = useState(false)

  const update = (key: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setForm((prev) => ({ ...prev, [key]: e?.target?.value ?? '' }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.subject || !form.message) {
      toast.error('Preencha todos os campos.')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, turnstileToken: token }),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok && data?.success) {
        toast.success('Mensagem enviada com sucesso! Retornaremos em breve.')
        setForm({ name: '', email: '', subject: '', message: '' })
      } else {
        toast.error(data?.message ?? 'Não foi possível enviar. Tente novamente.')
      }
    } catch {
      toast.error('Erro de conexão. Verifique sua internet e tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const infoItems = [
    { icon: MapPin, label: 'Endereço', value: `${contactInfo.address}, ${contactInfo.cep}` },
    { icon: Phone, label: 'Telefone', value: contactInfo.phone },
    { icon: Mail, label: 'E-mail', value: contactInfo.email },
    { icon: Clock, label: 'Horário de atendimento', value: `${contactInfo.hours}. ${contactInfo.hoursSubtitle}` },
  ]

  return (
    <section id="contato" className="relative overflow-x-clip bg-secondary/40 py-20 md:py-28">
      <div className="mx-auto w-full min-w-0 max-w-[1200px] px-3 sm:px-4 md:px-6">
        <FadeIn className="mx-auto min-w-0 max-w-3xl text-center">
          <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            Fale Conosco
          </span>
          <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Vamos conversar sobre o{' '}
            <span className="text-primary">seu caso</span>
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
            Entre em contato conosco e descubra como podemos transformar desafios jurídicos em
            soluções eficientes para o seu negócio. Além disso, este canal está disponível para que
            titulares de dados pessoais possam exercer seus direitos previstos na LGPD, incluindo
            solicitações relacionadas a acesso, correção, atualização ou demais demandas sobre o
            tratamento de dados.
          </p>
        </FadeIn>

        <div className="mt-12 grid min-w-0 gap-8 lg:grid-cols-2">
          {/* Formulário */}
          <FadeIn delay={0.1} className="min-w-0 w-full">
            <form
              onSubmit={handleSubmit}
              className="w-full min-w-0 rounded-2xl bg-card p-4 shadow-[var(--shadow-md)] ring-1 ring-border/60 sm:p-6 md:p-8"
            >
              <div className="grid min-w-0 gap-5">
                <div className="min-w-0 space-y-2">
                  <Label htmlFor="name">Seu nome</Label>
                  <div className="relative min-w-0">
                    <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input id="name" value={form.name} onChange={update('name')} placeholder="Nome completo" className="min-w-0 max-w-full pl-10 text-base sm:text-sm" required />
                  </div>
                </div>
                <div className="min-w-0 space-y-2">
                  <Label htmlFor="email">Seu e-mail</Label>
                  <div className="relative min-w-0">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input id="email" type="email" value={form.email} onChange={update('email')} placeholder="voce@email.com" className="min-w-0 max-w-full pl-10 text-base sm:text-sm" required />
                  </div>
                </div>
                <div className="min-w-0 space-y-2">
                  <Label htmlFor="subject">Assunto</Label>
                  <div className="relative min-w-0">
                    <Tag className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input id="subject" value={form.subject} onChange={update('subject')} placeholder="Sobre o que deseja falar?" className="min-w-0 max-w-full pl-10 text-base sm:text-sm" required />
                  </div>
                </div>
                <div className="min-w-0 space-y-2">
                  <Label htmlFor="message">Sua mensagem</Label>
                  <div className="relative min-w-0">
                    <MessageSquare className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Textarea
                      id="message"
                      value={form.message}
                      onChange={update('message')}
                      placeholder="Descreva seu caso com o máximo de detalhes possível."
                      className="min-h-[160px] min-w-0 max-w-full pl-10 pt-3 text-base sm:min-h-[200px] sm:text-sm"
                      required
                    />
                  </div>
                </div>

                <Turnstile onVerify={setToken} onExpire={() => setToken('')} />

                <Button type="submit" loading={loading} size="lg" className="w-full min-w-0 gap-2 px-3">
                  <Send className="h-4 w-4" />
                  Enviar mensagem
                </Button>
                <p className="flex min-w-0 items-start gap-1.5 break-words text-xs text-muted-foreground">
                  <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                  Seus dados são armazenados com segurança e utilizados exclusivamente para responder
                  ao seu contato, conforme a LGPD.
                </p>
              </div>
            </form>
          </FadeIn>

          {/* Informações + Mapa */}
          <FadeIn delay={0.2} className="flex w-full min-w-0 flex-col gap-5">
            <motion.img
              src="/uploads/horario-atendimento.png"
              alt="Horário de atendimento: segunda a sexta, das 8h às 18h"
              width={264}
              height={86}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="h-auto w-full max-w-full rounded-xl sm:max-w-sm"
            />
            <div className="grid min-w-0 gap-3">
              {infoItems.map((item, i) => {
                const href =
                  item.label === 'E-mail'
                    ? `mailto:${contactInfo.email}`
                    : item.label === 'Telefone'
                    ? `tel:+551832810975`
                    : item.label === 'Endereço'
                    ? contactInfo.mapsEmbed.replace('&output=embed', '')
                    : undefined
                const inner = (
                  <>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <item.icon className="h-5 w-5" />
                    </span>
                    <span className="min-w-0 max-w-full flex-1">
                      <span className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground">{item.label}</span>
                      <span className="block break-words text-sm font-medium leading-snug text-foreground sm:truncate" suppressHydrationWarning>{item.value}</span>
                    </span>
                  </>
                )
                const motionProps = {
                  initial: false,
                  whileInView: { opacity: 1, x: 0 },
                  viewport: { once: true },
                  transition: { duration: 0.4, delay: i * 0.08 },
                  className:
                    'flex w-full min-w-0 items-center gap-3 rounded-xl bg-card p-4 shadow-[var(--shadow-sm)] ring-1 ring-border/60 transition-all hover:shadow-[var(--shadow-md)] hover:ring-primary/30 sm:gap-4',
                }
                return href ? (
                  <motion.a
                    key={item.label}
                    {...motionProps}
                    href={href}
                    target={item.label === 'Endereço' ? '_blank' : undefined}
                    rel="noopener noreferrer"
                  >
                    {inner}
                  </motion.a>
                ) : (
                  <motion.div key={item.label} {...motionProps}>
                    {inner}
                  </motion.div>
                )
              })}
            </div>
            <div className="w-full min-w-0 max-w-full flex-1">
              <MapSection />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
