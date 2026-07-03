import { useState } from 'react'
import { HomePage } from '@/pages/HomePage'
import { GamePage } from '@/pages/GamePage'
import type { Categoria, Dificuldade } from '@/types/palavra'
import type { ModoJogo } from '@/types/modo'

interface PartidaConfig {
  categoria: Categoria
  dificuldade: Dificuldade
  modo: ModoJogo
}

function App() {
  const [partida, setPartida] = useState<PartidaConfig | null>(null)

  if (!partida) {
    return (
      <HomePage
        onIniciar={(categoria, dificuldade, modo) => setPartida({ categoria, dificuldade, modo })}
      />
    )
  }

  return (
    <GamePage
      categoria={partida.categoria}
      dificuldade={partida.dificuldade}
      modo={partida.modo}
      onVoltar={() => setPartida(null)}
    />
  )
}

export default App
