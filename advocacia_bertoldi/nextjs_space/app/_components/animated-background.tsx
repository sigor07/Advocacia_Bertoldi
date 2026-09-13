'use client'

import { motion } from 'framer-motion'

// Partículas com posições fixas (determinísticas) para evitar mismatch de hidratação.
const particles = [
  { top: '12%', left: '8%', size: 10, cls: 'animate-float-slow', delay: '0s' },
  { top: '24%', left: '82%', size: 14, cls: 'animate-float-slower', delay: '1s' },
  { top: '62%', left: '15%', size: 8, cls: 'animate-float-slower', delay: '0.5s' },
  { top: '74%', left: '70%', size: 12, cls: 'animate-float-slow', delay: '1.4s' },
  { top: '40%', left: '48%', size: 6, cls: 'animate-float-slow', delay: '0.8s' },
  { top: '85%', left: '40%', size: 10, cls: 'animate-float-slower', delay: '0.2s' },
  { top: '18%', left: '55%', size: 7, cls: 'animate-float-slow', delay: '2s' },
  { top: '55%', left: '90%', size: 9, cls: 'animate-float-slower', delay: '1.2s' },
]

export function AnimatedBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 section-gradient" />
      {particles.map((p, i) => (
        <span
          key={i}
          className={`absolute rounded-full bg-primary/15 ${p.cls}`}
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
          }}
        />
      ))}
      <motion.div
        className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-accent/20 blur-3xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}
