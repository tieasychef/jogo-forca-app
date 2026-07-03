import { useState } from 'react'
import { HomePage } from '@/pages/HomePage'
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
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-950 text-slate-100">
      <p>
        Categoria: <strong>{partida.categoria}</strong> · Dificuldade:{' '}
        <strong>{partida.dificuldade}</strong>
      </p>
      <button
        type="button"
        className="rounded-full border border-slate-600 px-4 py-2 text-sm hover:border-slate-400"
        onClick={() => setPartida(null)}
      >
        Voltar
      </button>
    </div>
  )
}

export default App
