"""
Nome do Site: Advocacia Bertoldi
Desenvolvedor: Cristiano Rodrigues Bertoldi
Telefone: (18) 981066947
"""

# Advocacia Bertoldi

Site institucional da Advocacia Bertoldi, escritório jurídico localizado em Presidente Epitácio/SP.

## Sobre o projeto

O site apresenta:

- seção inicial com vídeo de destaque;
- informações sobre o escritório;
- áreas de atuação;
- equipe de profissionais;
- formulário de contato;
- localização e horário de atendimento;
- consulta de processo por número CNJ;
- links para WhatsApp, Instagram, Facebook, LinkedIn e e-mail;
- layout responsivo para computador, tablet e celular.

## Tecnologias

- Next.js 14 com App Router;
- React 18 e TypeScript;
- Tailwind CSS;
- Framer Motion;
- Lucide React;
- Prisma;
- Sonner para notificações.

## Estrutura

```text
Advocacia_Bertoldi/
├── advocacia_bertoldi/
│   └── nextjs_space/       # Aplicação Next.js
│       ├── app/             # Páginas, layout, API e componentes do site
│       ├── components/      # Componentes reutilizáveis e componentes UI
│       ├── lib/             # Dados do site, CNJ e utilitários
│       ├── prisma/          # Schema do banco de dados
│       ├── public/          # Imagens, vídeos e favicon
│       ├── scripts/         # Scripts auxiliares
│       ├── package.json
│       └── next.config.js
└── Uploads/                # Arquivos originais enviados para o projeto
```

## Requisitos

- Node.js 18 ou superior;
- npm;
- arquivo `.env` configurado dentro de `advocacia_bertoldi/nextjs_space`.

## Instalação

No PowerShell:

```powershell
cd .\advocacia_bertoldi\nextjs_space
npm install
```

Não publique o arquivo `.env`, pois ele pode conter credenciais e configurações privadas.

## Execução local

Para iniciar o servidor de desenvolvimento:

```powershell
cd .\advocacia_bertoldi\nextjs_space
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

Para testar pelo celular na mesma rede Wi-Fi:

```powershell
npm run dev -- -H 0.0.0.0 -p 3001
```

Substitua o endereço abaixo pelo IPv4 do computador:

```text
http://SEU_IPV4:3001
```

## Scripts disponíveis

| Comando | Finalidade |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera o build de produção |
| `npm run start` | Inicia a aplicação compilada |
| `npm run lint` | Executa a verificação de lint |

## Deploy na Vercel

Ao importar este repositório na Vercel, configure:

- **Framework Preset:** Next.js;
- **Root Directory:** `advocacia_bertoldi/nextjs_space`;
- **Build Command:** padrão da Vercel;
- **Install Command:** `npm install`.

As variáveis do arquivo `.env` devem ser cadastradas manualmente em **Project Settings > Environment Variables**. O arquivo `.env` não deve ser enviado ao repositório.

O arquivo `requirements.txt` não é necessário, pois esta aplicação utiliza Node.js e gerencia suas dependências pelo `package.json`.

## Conteúdo e assets

- Vídeo principal: `advocacia_bertoldi/nextjs_space/public/uploads/hero-video-final.mp4`
- Horário de atendimento: `advocacia_bertoldi/nextjs_space/public/uploads/horario-atendimento.png`
- Fotos da equipe: `advocacia_bertoldi/nextjs_space/public/team/`
- Dados de contato e redes sociais: `advocacia_bertoldi/nextjs_space/lib/site-data.ts`
- Guia visual: `advocacia_bertoldi/nextjs_space/STYLE_GUIDE.md`

## Observações de desenvolvimento

O servidor de desenvolvimento é o ambiente recomendado para revisar alterações de layout e responsividade. Ao testar no celular, mantenha o aparelho e o computador na mesma rede Wi-Fi e use o endereço IPv4 do computador.

Antes de publicar em produção, valide o comando `npm run build` no ambiente de hospedagem e confira as variáveis do arquivo `.env`.

## Licença

Projeto privado da Advocacia Bertoldi.

## Desenvolvedor

Cristiano Rodrigues Bertoldi  
Email: cristianorbertoldi@gmail.com  
Telefone: (18) 981066947
