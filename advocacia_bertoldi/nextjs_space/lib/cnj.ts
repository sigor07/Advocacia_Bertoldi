// Parsing e roteamento de números de processo no padrão CNJ.
// Formato: NNNNNNN-DD.AAAA.J.TR.OOOO
//  N = número sequencial | D = dígito verificador | A = ano
//  J = segmento do judiciário (8 = Justiça Estadual)
//  TR = código do tribunal | O = origem (foro/comarca)

export type Instancia = 'primeiro' | 'tj' | 'turmas'

export interface ParsedCNJ {
  sequencial: string
  digito: string
  ano: string
  segmento: string
  tribunal: string
  origem: string
  formatado: string
}

interface TribunalInfo {
  nome: string
  uf: string
  esajBase?: string // quando o tribunal usa e-SAJ
  primeiroGrau?: string
  segundoGrau?: string
}

// Mapeamento por código TR da Justiça Estadual (segmento 8), 01 a 27.
export const tribunaisEstaduais: Record<string, TribunalInfo> = {
  '01': { nome: 'TJAC', uf: 'AC', esajBase: 'https://esaj.tjac.jus.br' },
  '02': { nome: 'TJAL', uf: 'AL', esajBase: 'https://www2.tjal.jus.br' },
  '03': { nome: 'TJAP', uf: 'AP', primeiroGrau: 'https://tucujuris.tjap.jus.br/tucujuris/pages/consultar-processo/consultar-processo.html', segundoGrau: 'https://tucujuris.tjap.jus.br/tucujuris/pages/consultar-processo/consultar-processo.html' },
  '04': { nome: 'TJAM', uf: 'AM', esajBase: 'https://consultasaj.tjam.jus.br' },
  '05': { nome: 'TJBA', uf: 'BA', esajBase: 'https://esaj.tjba.jus.br' },
  '06': { nome: 'TJCE', uf: 'CE', esajBase: 'https://esaj.tjce.jus.br' },
  '07': { nome: 'TJDFT', uf: 'DF', primeiroGrau: 'https://pje.tjdft.jus.br/consultapublica/ConsultaPublica/listView.seam', segundoGrau: 'https://pje2i.tjdft.jus.br/consultapublica/ConsultaPublica/listView.seam' },
  '08': { nome: 'TJES', uf: 'ES', esajBase: 'https://sistemas.tjes.jus.br' },
  '09': { nome: 'TJGO', uf: 'GO', primeiroGrau: 'https://projudi.tjgo.jus.br/BuscaProcesso', segundoGrau: 'https://projudi.tjgo.jus.br/BuscaProcesso' },
  '10': { nome: 'TJMA', uf: 'MA', primeiroGrau: 'https://pje.tjma.jus.br/pje/ConsultaPublica/listView.seam', segundoGrau: 'https://pje2.tjma.jus.br/pje2g/ConsultaPublica/listView.seam' },
  '11': { nome: 'TJMT', uf: 'MT', primeiroGrau: 'https://pjepg.tjmt.jus.br/pje/ConsultaPublica/listView.seam', segundoGrau: 'https://pjesg.tjmt.jus.br/pje2g/ConsultaPublica/listView.seam' },
  '12': { nome: 'TJMS', uf: 'MS', esajBase: 'https://esaj.tjms.jus.br' },
  '13': { nome: 'TJMG', uf: 'MG', primeiroGrau: 'https://pje-consulta-publica.tjmg.jus.br/', segundoGrau: 'https://pje-consulta-publica.tjmg.jus.br/' },
  '14': { nome: 'TJPA', uf: 'PA', primeiroGrau: 'https://consultas.tjpa.jus.br/consultaunificadapublica/consultapublica', segundoGrau: 'https://consultas.tjpa.jus.br/consultaunificadapublica/consultapublica' },
  '15': { nome: 'TJPB', uf: 'PB', primeiroGrau: 'https://pje.tjpb.jus.br/pje/ConsultaPublica/listView.seam', segundoGrau: 'https://pje.tjpb.jus.br/pje2g/ConsultaPublica/listView.seam' },
  '16': { nome: 'TJPR', uf: 'PR', primeiroGrau: 'https://consulta.tjpr.jus.br/projudi_consulta/', segundoGrau: 'https://consulta.tjpr.jus.br/projudi_consulta/' },
  '17': { nome: 'TJPE', uf: 'PE', primeiroGrau: 'https://srv01.tjpe.jus.br/consultaprocessualunificada/', segundoGrau: 'https://srv01.tjpe.jus.br/consultaprocessualunificada/' },
  '18': { nome: 'TJPI', uf: 'PI', primeiroGrau: 'https://pje.tjpi.jus.br/1g/ConsultaPublica/listView.seam', segundoGrau: 'https://pje.tjpi.jus.br/2g/ConsultaPublica/listView.seam' },
  '19': { nome: 'TJRJ', uf: 'RJ', primeiroGrau: 'https://www3.tjrj.jus.br/consultaprocessual/', segundoGrau: 'https://www3.tjrj.jus.br/consultaprocessual/' },
  '20': { nome: 'TJRN', uf: 'RN', primeiroGrau: 'https://pje1g.tjrn.jus.br/pje/ConsultaPublica/listView.seam', segundoGrau: 'https://pje2g.tjrn.jus.br/pje/ConsultaPublica/listView.seam' },
  '21': { nome: 'TJRS', uf: 'RS', primeiroGrau: 'https://www.tjrs.jus.br/novo/busca/?return=proc&client=wp_index', segundoGrau: 'https://www.tjrs.jus.br/novo/busca/?return=proc&client=wp_index' },
  '22': { nome: 'TJRO', uf: 'RO', primeiroGrau: 'https://pjepg.tjro.jus.br/consulta/ConsultaPublica/listView.seam', segundoGrau: 'https://pjesg.tjro.jus.br/consulta/ConsultaPublica/listView.seam' },
  '23': { nome: 'TJRR', uf: 'RR', primeiroGrau: 'https://projudi.tjrr.jus.br/projudi/', segundoGrau: 'https://projudi.tjrr.jus.br/projudi/' },
  '24': { nome: 'TJSC', uf: 'SC', esajBase: 'https://esaj.tjsc.jus.br' },
  '25': { nome: 'TJSE', uf: 'SE', primeiroGrau: 'https://www.tjse.jus.br/portal/consultas/consulta-processual', segundoGrau: 'https://www.tjse.jus.br/portal/consultas/consulta-processual' },
  '26': { nome: 'TJSP', uf: 'SP', esajBase: 'https://esaj.tjsp.jus.br' },
  '27': { nome: 'TJTO', uf: 'TO', primeiroGrau: 'https://eproc1.tjto.jus.br/eprocV2_prod_1grau/externo_controlador.php?acao=processo_consulta_publica', segundoGrau: 'https://eproc2.tjto.jus.br/eprocV2_prod_2grau/externo_controlador.php?acao=processo_consulta_publica' },
}

// Extrai apenas dígitos e valida os 20 caracteres do CNJ.
export function parseCNJ(input: string): ParsedCNJ | null {
  const digits = (input ?? '').replace(/\D/g, '')
  if (digits.length !== 20) return null
  const sequencial = digits.slice(0, 7)
  const digito = digits.slice(7, 9)
  const ano = digits.slice(9, 13)
  const segmento = digits.slice(13, 14)
  const tribunal = digits.slice(14, 16)
  const origem = digits.slice(16, 20)
  const formatado = `${sequencial}-${digito}.${ano}.${segmento}.${tribunal}.${origem}`
  return { sequencial, digito, ano, segmento, tribunal, origem, formatado }
}

export interface RedirectResult {
  ok: boolean
  url?: string
  tribunalNome?: string
  prefilled: boolean
  message?: string
}

// Monta a URL de consulta do tribunal correto conforme o CNJ e a instância.
export function resolveConsultaUrl(input: string, instancia: Instancia): RedirectResult {
  const parsed = parseCNJ(input)
  if (!parsed) {
    return {
      ok: false,
      prefilled: false,
      message: 'Número de processo inválido. Informe os 20 dígitos no formato CNJ.',
    }
  }

  if (parsed.segmento !== '8') {
    return {
      ok: false,
      prefilled: false,
      message:
        'Este consultor atende processos da Justiça Estadual (segmento 8). Verifique o número informado.',
    }
  }

  const info = tribunaisEstaduais[parsed.tribunal]
  if (!info) {
    return {
      ok: false,
      prefilled: false,
      message: `Não foi possível identificar o tribunal (código ${parsed.tribunal}).`,
    }
  }

  // Tribunais com e-SAJ permitem link direto com o número pré-preenchido.
  if (info.esajBase) {
    const isSegundo = instancia === 'tj' || instancia === 'turmas'
    const modulo = isSegundo ? 'cposg' : 'cpopg'
    const numeroDigitoAno = `${parsed.sequencial}-${parsed.digito}.${parsed.ano}`
    const params = new URLSearchParams({
      cbPesquisa: 'NUMPROC',
      tipoNuProcesso: 'UNIFICADO',
      numeroDigitoAnoUnificado: numeroDigitoAno,
      foroNumeroUnificado: parsed.origem,
      'dadosConsulta.valorConsultaNuUnificado': parsed.formatado,
      'dadosConsulta.valorConsulta': '',
      'dadosConsulta.tipoNuProcesso': 'UNIFICADO',
    })
    return {
      ok: true,
      url: `${info.esajBase}/${modulo}/search.do?${params.toString()}`,
      tribunalNome: info.nome,
      prefilled: true,
    }
  }

  // Demais tribunais: abre a página de consulta (número copiado para colar).
  const isSegundo = instancia === 'tj' || instancia === 'turmas'
  const url = (isSegundo ? info.segundoGrau : info.primeiroGrau) || info.primeiroGrau
  return {
    ok: true,
    url,
    tribunalNome: info.nome,
    prefilled: false,
    message:
      'O número do processo foi copiado. Cole-o na página de consulta do tribunal que será aberta.',
  }
}

// Máscara para exibição durante a digitação.
export function maskCNJ(value: string): string {
  const d = (value ?? '').replace(/\D/g, '').slice(0, 20)
  let out = d
  if (d.length > 7) out = `${d.slice(0, 7)}-${d.slice(7)}`
  if (d.length > 9) out = `${d.slice(0, 7)}-${d.slice(7, 9)}.${d.slice(9)}`
  if (d.length > 13) out = `${d.slice(0, 7)}-${d.slice(7, 9)}.${d.slice(9, 13)}.${d.slice(13)}`
  if (d.length > 14) out = `${d.slice(0, 7)}-${d.slice(7, 9)}.${d.slice(9, 13)}.${d.slice(13, 14)}.${d.slice(14)}`
  if (d.length > 16) out = `${d.slice(0, 7)}-${d.slice(7, 9)}.${d.slice(9, 13)}.${d.slice(13, 14)}.${d.slice(14, 16)}.${d.slice(16)}`
  return out
}
