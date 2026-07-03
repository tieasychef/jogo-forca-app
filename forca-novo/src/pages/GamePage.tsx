import { ForcaSvg } from '@/components/game/ForcaSvg'
import { InfoBar } from '@/components/game/InfoBar'
import { PalavraDisplay } from '@/components/game/PalavraDisplay'
import { StatusPanel } from '@/components/game/StatusPanel'
import { Teclado } from '@/components/game/Teclado'
import { useGame } from '@/hooks/useGame'
import { useKeyboard } from '@/hooks/useKeyboard'
import type { Categoria, Dificuldade } from '@/types/palavra'

interface GamePageProps {
  categoria: Categoria
  dificuldade: Dificuldade
  onVoltar: () => void
}

export function GamePage({ categoria, dificuldade, onVoltar }: GamePageProps) {
  const {
    palavraAtual,
    letrasUsadas,
    letrasCorretas,
    letrasErradas,
    erros,
    estado,
    usarLetra,
    reiniciar,
  } = useGame({ categoria, dificuldade })

  useKeyboard(usarLetra, estado === 'jogando')

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

      <Teclado
        letrasUsadas={letrasUsadas}
        letrasCorretas={letrasCorretas}
        onSelecionar={usarLetra}
        desabilitado={estado !== 'jogando'}
      />

      {estado === 'perdeu' && (
        <p className="text-lg font-bold text-red-400">
          Fim de jogo! A palavra era {palavraAtual.palavra}
        </p>
      )}
      {estado === 'venceu' && (
        <p className="text-lg font-bold text-emerald-400">Você venceu! 🎉</p>
      )}
    </div>
  )
}
