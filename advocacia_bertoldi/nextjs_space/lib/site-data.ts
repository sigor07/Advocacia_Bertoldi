import {
  Scale, Gavel, Landmark, ShieldCheck, Users, Home, Leaf, Building2,
  FileSignature, HeartHandshake, BriefcaseBusiness, ShoppingBag,
} from 'lucide-react'

export interface PracticeArea {
  title: string
  description: string
  icon: typeof Scale
}

export const practiceAreas: PracticeArea[] = [
  {
    title: 'Direito Civil',
    description:
      'Atuação abrangente em relações civis — contratos, responsabilidade civil, família, sucessões e direitos reais — com foco na proteção do patrimônio e na resolução eficiente de conflitos.',
    icon: Scale,
  },
  {
    title: 'Direito Processual Civil',
    description:
      'Condução técnica e estratégica de processos judiciais em todas as instâncias, buscando a tutela dos direitos do cliente com agilidade, segurança e rigor procedimental.',
    icon: Landmark,
  },
  {
    title: 'Direito Trabalhista',
    description:
      'Orientação preventiva e atuação estratégica em disputas trabalhistas, minimizando riscos e protegendo a sustentabilidade do negócio.',
    icon: BriefcaseBusiness,
  },
  {
    title: 'Direito Previdenciário',
    description:
      'Assessoria completa em aposentadorias, benefícios e revisões junto ao INSS, com planejamento previdenciário personalizado e defesa dos direitos do segurado em âmbito administrativo e judicial.',
    icon: HeartHandshake,
  },
  {
    title: 'Direito Penal',
    description:
      'Defesa técnica e comprometida em todas as fases da persecução penal, assegurando o pleno respeito às garantias constitucionais e a melhor estratégia para cada caso.',
    icon: ShieldCheck,
  },
  {
    title: 'Direito Processual Penal',
    description:
      'Atuação rigorosa em inquéritos e ações penais em primeira e segunda instância, bem como junto ao STJ e STF, com defesa consistente e vigilância sobre o devido processo legal.',
    icon: Gavel,
  },
  {
    title: 'Direito Societário',
    description:
      'Soluções jurídicas completas para estruturação, reorganização e governança societária, garantindo segurança e eficiência corporativa.',
    icon: Building2,
  },
  {
    title: 'Direito do Consumidor',
    description:
      'Assessoria preventiva e contenciosa especializada, focada em reduzir riscos, assegurar compliance regulatório e proteger a reputação da empresa.',
    icon: ShoppingBag,
  },
  {
    title: 'Direito Imobiliário',
    description:
      'Consultoria jurídica especializada na estruturação de negócios imobiliários, elaboração de contratos estratégicos, regularização fundiária e prevenção de litígios, garantindo segurança e rentabilidade em operações imobiliárias complexas.',
    icon: Home,
  },
  {
    title: 'Direito Ambiental',
    description:
      'Assessoria jurídica preventiva e estratégica na gestão ambiental, licenciamento, compliance regulatório e defesa administrativa e judicial, assegurando o desenvolvimento sustentável e mitigação de riscos para o seu negócio.',
    icon: Leaf,
  },
  {
    title: 'Direito Administrativo',
    description:
      'Atuação estratégica junto ao setor público e privado, com consultoria especializada em licitações, contratos administrativos e defesa em procedimentos regulatórios, promovendo segurança e eficiência nas relações governamentais.',
    icon: Users,
  },
  {
    title: 'Direito Contratual',
    description:
      'Elaboração, negociação e revisão de contratos empresariais sofisticados, assegurando clareza jurídica, proteção patrimonial e segurança nas relações comerciais.',
    icon: FileSignature,
  },
]

export interface TeamMember {
  name: string
  role: string
  oab?: string
  photo: string
}

export const teamMembers: TeamMember[] = [
  {
    name: 'Gleidmilson Bertoldi',
    role: 'Advogado sócio fundador',
    oab: 'OAB/SP 283.043',
    photo: '/team/gleidmilson.webp',
  },
  {
    name: 'Gabriel Chanquini Dias',
    role: 'Advogado sócio',
    oab: 'OAB/SP 348.028',
    photo: '/team/gabriel.webp',
  },
  {
    name: 'Letícia Satiro Sakai',
    role: 'Advogada sócia',
    oab: 'OAB/SP 387.335',
    photo: '/team/leticia.webp',
  },
  {
    name: 'Giovana dos Santos Barbosa',
    role: 'Advogada sócia',
    oab: 'OAB/SP 499.177',
    photo: '/team/giovana.webp',
  },
  {
    name: 'Graziele Alves da Silva Nunes',
    role: 'Assistente administrativa',
    photo: '/team/graziele.webp',
  },
]

export const contactInfo = {
  address: 'Rua Vitória, 574, Centro, Presidente Epitácio-SP',
  cep: 'CEP 19470-045',
  phone: '(18) 3281-0975',
  whatsappDisplay: '(18) 99703-6855',
  whatsappLink: 'https://wa.me/5518997036855',
  email: 'atendimento@advbertoldi.com.br',
  instagram: 'https://www.instagram.com/',
  linkedin: 'https://www.linkedin.com/',
  facebook: 'https://www.facebook.com/',
  mapsEmbed:
    'https://maps.google.com/maps?q=Rua+Vitoria+574+Centro+Presidente+Epitacio+SP+19470-045&t=&z=16&ie=UTF8&iwloc=&output=embed',
  hours: 'Segunda a sexta, das 8h às 18h',
  hoursSubtitle: 'Atendimento presencial e online',
}
