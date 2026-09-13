import { Header } from './_components/header'
import { Hero } from './_components/hero'
import { QuemSomos } from './_components/quem-somos'
import { AreasAtuacao } from './_components/areas-atuacao'
import { Equipe } from './_components/equipe'
import { Contato } from './_components/contato'
import { Footer } from './_components/footer'

export default function Home() {
  return (
    <main className="relative min-h-screen w-full max-w-full overflow-x-hidden bg-background">
      <Header />
      <Hero />
      <QuemSomos />
      <AreasAtuacao />
      <Equipe />
      <Contato />
      <Footer />
    </main>
  )
}
