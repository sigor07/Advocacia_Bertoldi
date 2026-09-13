'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'
import { Search, FileText, ExternalLink } from 'lucide-react'
import { maskCNJ, resolveConsultaUrl, type Instancia } from '@/lib/cnj'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ProcessSearchModal({ open, onOpenChange }: Props) {
  const [numero, setNumero] = useState('')
  const [instancia, setInstancia] = useState<Instancia>('primeiro')
  const [loading, setLoading] = useState(false)

  const handleConsultar = async () => {
    const result = resolveConsultaUrl(numero, instancia)
    if (!result?.ok || !result?.url) {
      toast.error(result?.message ?? 'Não foi possível consultar o processo.')
      return
    }
    setLoading(true)
    try {
      // Para tribunais sem link direto, copia o número para colar na consulta.
      if (!result.prefilled) {
        try {
          await navigator?.clipboard?.writeText?.(maskCNJ(numero))
        } catch { /* clipboard indisponível — segue sem copiar */ }
        toast.info(
          result.message ?? 'Número copiado. Cole-o na página de consulta do tribunal.',
          { duration: 6000 },
        )
      } else {
        toast.success(`Abrindo a consulta no ${result.tribunalNome}...`)
      }
      window.open(result.url, '_blank', 'noopener,noreferrer')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-full bg-primary/10">
            <Search className="h-5 w-5 text-primary" />
          </div>
          <DialogTitle className="font-display text-xl tracking-tight">Pesquisar Processo</DialogTitle>
          <DialogDescription>
            Informe o número único (CNJ) e selecione a instância. Encaminharemos você diretamente ao tribunal correspondente.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="numero-processo">Nº Processo</Label>
            <div className="relative">
              <FileText className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="numero-processo"
                value={numero}
                onChange={(e) => setNumero(maskCNJ(e?.target?.value ?? ''))}
                placeholder="0000000-00.0000.8.26.0000"
                className="pl-10 font-mono"
                inputMode="numeric"
                onKeyDown={(e) => { if (e.key === 'Enter') handleConsultar() }}
              />
            </div>
            <p className="text-xs text-muted-foreground">Formato CNJ com 20 dígitos.</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="instancia">Instância</Label>
            <Select value={instancia} onValueChange={(v) => setInstancia(v as Instancia)}>
              <SelectTrigger id="instancia">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="primeiro">Primeiro Grau</SelectItem>
                <SelectItem value="tj">Tribunal de Justiça</SelectItem>
                <SelectItem value="turmas">Turmas Recursais</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button onClick={handleConsultar} loading={loading} className="w-full gap-2">
          <ExternalLink className="h-4 w-4" />
          Consultar
        </Button>
      </DialogContent>
    </Dialog>
  )
}
