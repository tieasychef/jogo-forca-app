import { AnimatePresence } from 'framer-motion'
import { ForcaSvg } from '@/components/game/ForcaSvg'
import { InfoBar } from '@/components/game/InfoBar'
import { PalavraDisplay } from '@/components/game/PalavraDisplay'
import { ResultModal } from '@/components/game/ResultModal'
import { StatusPanel } from '@/components/game/StatusPanel'
import { Teclado } from '@/components/game/Teclado'
import { SomToggle } from '@/components/ui/SomToggle'
import { useGame } from '@/hooks/useGame'
import { useKeyboard } from '@/hooks/useKeyboard'
import { useSom } from '@/hooks/useSom'
import type { Categoria, Dificuldade } from '@/types/palavra'

interface GamePageProps {
  categoria: Categoria
  dificuldade: Dificuldade
  onVoltar: () => void
}

export function GamePage({ categoria, dificuldade, onVoltar }: GamePageProps) {
  const { somAtivo, alternarSom, reproduzir } = useSom()
  const {
    palavraAtual,
    letrasUsadas,
    letrasCorretas,
    letrasErradas,
    erros,
    estado,
    pontuacao,
    combo,
    melhorPontuacao,
    usarLetra,
    reiniciar,
  } = useGame({
    categoria,
    dificuldade,
    aoAcertarLetra: () => reproduzir('acerto'),
    aoErrarLetra: () => reproduzir('erro'),
    aoVencer: () => reproduzir('vitoria'),
    aoPerder: () => reproduzir('derrota'),
  })

  useKeyboard(usarLetra, estado === 'jogando')

  return (
    <div className="flex min-h-screen flex-col items-center gap-8 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-4 py-8 text-slate-100">
      <header className="flex w-full max-w-2xl items-center justify-between">
        <button
          type="button"
          onClick={() => {
            reproduzir('clique')
            onVoltar()
          }}
          className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-300 transition-colors hover:border-slate-500"
        >
          ← Início
        </button>
        <div className="flex items-center gap-2">
          <SomToggle ativo={somAtivo} onToggle={alternarSom} />
          <button
            type="button"
            onClick={() => {
              reproduzir('clique')
              reiniciar()
            }}
            className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-300 transition-colors hover:border-slate-500"
          >
            Reiniciar
          </button>
        </div>
      </header>

      <InfoBar categoria={palavraAtual.categoria} dica={palavraAtual.dica} />

      <ForcaSvg erros={erros} />

      <PalavraDisplay palavra={palavraAtual.palavra} letrasCorretas={letrasCorretas} />

      <StatusPanel
        letrasErradas={letrasErradas}
        erros={erros}
        pontuacao={pontuacao}
        combo={combo}
        melhorPontuacao={melhorPontuacao}
      />

      <Teclado
        letrasUsadas={letrasUsadas}
        letrasCorretas={letrasCorretas}
        onSelecionar={usarLetra}
        desabilitado={estado !== 'jogando'}
      />

      <AnimatePresence>
        {(estado === 'venceu' || estado === 'perdeu') && (
          <ResultModal
            estado={estado}
            palavra={palavraAtual.palavra}
            pontuacao={pontuacao}
            onVoltar={onVoltar}
            onReiniciar={reiniciar}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
