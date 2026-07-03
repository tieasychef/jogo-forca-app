import { useMemo, useState } from 'react'
import { InfoBar } from '@/components/game/InfoBar'
import { PalavraDisplay } from '@/components/game/PalavraDisplay'
import { StatusPanel } from '@/components/game/StatusPanel'
import type { Categoria, Dificuldade } from '@/types/palavra'
import { sortearPalavra } from '@/utils/palavras'

interface GamePageProps {
  categoria: Categoria
  dificuldade: Dificuldade
  onVoltar: () => void
}

export function GamePage({ categoria, dificuldade, onVoltar }: GamePageProps) {
  const [chave, setChave] = useState(0)
  const palavraAtual = useMemo(
    () => sortearPalavra(categoria, dificuldade),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [categoria, dificuldade, chave],
  )
  const [letrasUsadas, setLetrasUsadas] = useState<Set<string>>(new Set())

  const letrasCorretas = new Set(
    [...letrasUsadas].filter((letra) => palavraAtual.palavra.includes(letra)),
  )
  const letrasErradas = [...letrasUsadas].filter(
    (letra) => !palavraAtual.palavra.includes(letra),
  )

  function reiniciar() {
    setLetrasUsadas(new Set())
    setChave((valor) => valor + 1)
  }

  return (
    <div className="flex min-h-screen flex-col items-center gap-8 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-4 py-8 text-slate-100">
      <header className="flex w-full max-w-2xl items-center justify-between">
        <button
          type="button"
          onClick={onVoltar}
          className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-300 transition-colors hover:border-slate-500"
        >
          ← Início
        </button>
        <button
          type="button"
          onClick={reiniciar}
          className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-300 transition-colors hover:border-slate-500"
        >
          Reiniciar
        </button>
      </header>

      <InfoBar categoria={palavraAtual.categoria} dica={palavraAtual.dica} />

      <PalavraDisplay palavra={palavraAtual.palavra} letrasCorretas={letrasCorretas} />

      <StatusPanel letrasErradas={letrasErradas} erros={letrasErradas.length} pontuacao={0} />
    </div>
  )
}
