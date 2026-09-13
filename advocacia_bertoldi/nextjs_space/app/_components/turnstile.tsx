'use client'

import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string
      reset: (id?: string) => void
      remove: (id?: string) => void
    }
    onTurnstileLoad?: () => void
  }
}

interface Props {
  onVerify: (token: string) => void
  onExpire?: () => void
}

const SCRIPT_ID = 'cf-turnstile-script'

export function Turnstile({ onVerify, onExpire }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const widgetIdRef = useRef<string | null>(null)
  const siteKey = process.env.NEXT_PUBLIC_CF_TURNSTILE_SITE_KEY

  useEffect(() => {
    if (!siteKey) return
    let cancelled = false

    const renderWidget = () => {
      if (cancelled) return
      if (!window?.turnstile || !containerRef?.current) return
      if (widgetIdRef.current) return
      try {
        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          theme: 'light',
          size: window.matchMedia('(max-width: 359px)').matches ? 'compact' : 'flexible',
          language: 'pt-br',
          callback: (token: string) => onVerify?.(token),
          'expired-callback': () => onExpire?.(),
          'error-callback': () => onExpire?.(),
        })
      } catch (e) {
        console.error('Erro ao renderizar Turnstile:', e)
      }
    }

    if (window?.turnstile) {
      renderWidget()
    } else if (!document.getElementById(SCRIPT_ID)) {
      const script = document.createElement('script')
      script.id = SCRIPT_ID
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js'
      script.async = true
      script.defer = true
      script.onload = renderWidget
      document.head.appendChild(script)
    } else {
      const interval = setInterval(() => {
        if (window?.turnstile) {
          clearInterval(interval)
          renderWidget()
        }
      }, 200)
      return () => clearInterval(interval)
    }

    return () => {
      cancelled = true
      if (widgetIdRef.current && window?.turnstile?.remove) {
        try { window.turnstile.remove(widgetIdRef.current) } catch { /* noop */ }
        widgetIdRef.current = null
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [siteKey])

  if (!siteKey) {
    return (
      <p className="max-w-full break-words text-xs text-muted-foreground">
        Verificação de segurança não configurada.
      </p>
    )
  }

  return <div ref={containerRef} className="min-h-[65px] w-full min-w-0 max-w-full overflow-hidden" />
}
