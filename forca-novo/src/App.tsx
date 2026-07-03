import { useState } from 'react'
import { HomePage } from '@/pages/HomePage'
import { GamePage } from '@/pages/GamePage'
import type { Categoria, Dificuldade } from '@/types/palavra'

interface PartidaConfig {
  categoria: Categoria
  dificuldade: Dificuldade
}

function App() {
  const [partida, setPartida] = useState<PartidaConfig | null>(null)

  if (!partida) {
    return (
      <HomePage
        onIniciar={(categoria, dificuldade) => setPartida({ categoria, dificuldade })}
      />
    )
  }

  return (
    <GamePage
      categoria={partida.categoria}
      dificuldade={partida.dificuldade}
      onVoltar={() => setPartida(null)}
    />
  )
}

export default App
