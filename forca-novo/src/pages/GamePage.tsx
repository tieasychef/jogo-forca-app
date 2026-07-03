import { useEffect, useMemo, useState } from 'react'
import { ForcaSvg } from '@/components/game/ForcaSvg'
import { InfoBar } from '@/components/game/InfoBar'
import { PalavraDisplay } from '@/components/game/PalavraDisplay'
import { StatusPanel } from '@/components/game/StatusPanel'
import type { Categoria, Dificuldade } from '@/types/palavra'
import { sortearPalavra } from '@/utils/palavras'

const MAX_ERROS = 6

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
  const erros = letrasErradas.length
  const venceu = palavraAtual.palavra.split('').every((letra) => letrasCorretas.has(letra))
  const perdeu = erros >= MAX_ERROS

  function reiniciar() {
    setLetrasUsadas(new Set())
    setChave((valor) => valor + 1)
  }

  useEffect(() => {
    function aoPressionarTecla(evento: KeyboardEvent) {
      const letra = evento.key.toUpperCase()
      if (!/^[A-ZÀ-Ú]$/.test(letra)) return
      if (perdeu || venceu) return
      setLetrasUsadas((atual) => new Set(atual).add(letra))
    }

    window.addEventListener('keydown', aoPressionarTecla)
    return () => window.removeEventListener('keydown', aoPressionarTecla)
  }, [perdeu, venceu])

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

      <ForcaSvg erros={erros} />

      <PalavraDisplay palavra={palavraAtual.palavra} letrasCorretas={letrasCorretas} />

      <StatusPanel letrasErradas={letrasErradas} erros={erros} pontuacao={0} />

      {perdeu && (
        <p className="text-lg font-bold text-red-400">
          Fim de jogo! A palavra era {palavraAtual.palavra}
        </p>
      )}
      {venceu && <p className="text-lg font-bold text-emerald-400">Você venceu! 🎉</p>}
    </div>
  )
}
