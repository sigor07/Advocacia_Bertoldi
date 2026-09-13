'use client'

import { contactInfo } from '@/lib/site-data'

export function MapSection() {
  return (
    <div className="w-full min-w-0 max-w-full overflow-hidden rounded-2xl shadow-[var(--shadow-md)] ring-1 ring-border/60">
      <iframe
        title="Localização da Advocacia Bertoldi"
        src={contactInfo.mapsEmbed}
        className="block h-[320px] w-full max-w-full border-0 md:h-full md:min-h-[420px]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  )
}
