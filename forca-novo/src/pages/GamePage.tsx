import { useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { ForcaSvg } from '@/components/game/ForcaSvg'
import { InfoBar } from '@/components/game/InfoBar'
import { ModoBadge } from '@/components/game/ModoBadge'
import { PalavraDisplay } from '@/components/game/PalavraDisplay'
import { ResultModal } from '@/components/game/ResultModal'
import { StatusPanel } from '@/components/game/StatusPanel'
import { Teclado } from '@/components/game/Teclado'
import { SomToggle } from '@/components/ui/SomToggle'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { useCountdown } from '@/hooks/useCountdown'
import { useEstatisticas } from '@/hooks/useEstatisticas'
import { useGame } from '@/hooks/useGame'
import { useKeyboard } from '@/hooks/useKeyboard'
import { useRanking } from '@/hooks/useRanking'
import { useSom } from '@/hooks/useSom'
import { useTheme } from '@/hooks/useTheme'
import { TEMPO_LIMITE_SEGUNDOS, type ModoJogo } from '@/types/modo'
import type { Categoria, Dificuldade } from '@/types/palavra'

interface GamePageProps {
  categoria: Categoria
  dificuldade: Dificuldade
  modo: ModoJogo
  onVoltar: () => void
}

export function GamePage({ categoria, dificuldade, modo, onVoltar }: GamePageProps) {
  const { somAtivo, alternarSom, reproduzir } = useSom()
  const { tema, alternarTema } = useTheme()
  const { estatisticas, registrarPartida } = useEstatisticas()
  const { entraNoRanking, adicionarEntrada } = useRanking()
  const {
    palavraAtual,
    letrasUsadas,
    letrasCorretas,
    letrasErradas,
    erros,
    estado,
    pontuacao,
    combo,
    rodada,
    usarLetra,
    forcarDerrota,
    reiniciar,
  } = useGame({
    categoria,
    dificuldade,
    modo,
    aoAcertarLetra: () => reproduzir('acerto'),
    aoErrarLetra: () => reproduzir('erro'),
    aoVencer: () => reproduzir('vitoria'),
    aoPerder: () => reproduzir('derrota'),
  })

  useKeyboard(usarLetra, estado === 'jogando')

  const segundosRestantes = useCountdown({
    duracaoSegundos: TEMPO_LIMITE_SEGUNDOS,
    ativo: modo === 'tempo' && estado === 'jogando',
    chaveReset: rodada,
    aoZerar: forcarDerrota,
  })

  useEffect(() => {
    const vitoriaFinal = estado === 'venceu' && modo !== 'infinito'
    if (vitoriaFinal || estado === 'perdeu') {
      registrarPartida({ venceu: estado === 'venceu', pontuacao, erros })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [estado])

  return (
    <div className="flex min-h-screen flex-col items-center gap-8 bg-gradient-to-b from-slate-100 via-white to-slate-100 px-4 py-8 text-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-slate-100">
      <header className="flex w-full max-w-2xl items-center justify-between">
        <button
          type="button"
          onClick={() => {
            reproduzir('clique')
            onVoltar()
          }}
          className="rounded-full border border-slate-300 px-4 py-2 text-sm text-slate-600 transition-colors hover:border-slate-400 dark:border-slate-700 dark:text-slate-300 dark:hover:border-slate-500"
        >
          ← Início
        </button>
        <div className="flex items-center gap-2">
          <ThemeToggle tema={tema} onToggle={alternarTema} />
          <SomToggle ativo={somAtivo} onToggle={alternarSom} />
          <button
            type="button"
            onClick={() => {
              reproduzir('clique')
              reiniciar()
            }}
            className="rounded-full border border-slate-300 px-4 py-2 text-sm text-slate-600 transition-colors hover:border-slate-400 dark:border-slate-700 dark:text-slate-300 dark:hover:border-slate-500"
          >
            Reiniciar
          </button>
        </div>
      </header>

      <ModoBadge modo={modo} segundosRestantes={segundosRestantes} />

      <InfoBar
        categoria={palavraAtual.categoria}
        dica={palavraAtual.dica}
        mostrarDica={modo !== 'desafio'}
      />

      <ForcaSvg erros={erros} />

      <PalavraDisplay palavra={palavraAtual.palavra} letrasCorretas={letrasCorretas} />

      <StatusPanel
        letrasErradas={letrasErradas}
        erros={erros}
        pontuacao={pontuacao}
        combo={combo}
        melhorPontuacao={estatisticas.melhorPontuacao}
      />

      <Teclado
        letrasUsadas={letrasUsadas}
        letrasCorretas={letrasCorretas}
        onSelecionar={usarLetra}
        desabilitado={estado !== 'jogando'}
      />

      <AnimatePresence>
        {estado === 'perdeu' && (
          <ResultModal
            estado={estado}
            palavra={palavraAtual.palavra}
            pontuacao={pontuacao}
            elegivelParaRanking={entraNoRanking(pontuacao)}
            onVoltar={onVoltar}
            onReiniciar={reiniciar}
            onSalvarNoRanking={(nome) =>
              adicionarEntrada({
                nome,
                pontuacao,
                categoria: palavraAtual.categoria,
                dificuldade,
                data: new Date().toISOString(),
              })
            }
          />
        )}
        {estado === 'venceu' && modo !== 'infinito' && (
          <ResultModal
            estado={estado}
            palavra={palavraAtual.palavra}
            pontuacao={pontuacao}
            elegivelParaRanking={entraNoRanking(pontuacao)}
            onVoltar={onVoltar}
            onReiniciar={reiniciar}
            onSalvarNoRanking={(nome) =>
              adicionarEntrada({
                nome,
                pontuacao,
                categoria: palavraAtual.categoria,
                dificuldade,
                data: new Date().toISOString(),
              })
            }
          />
        )}
      </AnimatePresence>
    </div>
  )
}
