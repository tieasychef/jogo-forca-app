import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Logo } from '@/components/home/Logo'
import { SelectableCard } from '@/components/home/SelectableCard'
import { PlayButton } from '@/components/home/PlayButton'
import { SomToggle } from '@/components/ui/SomToggle'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { EstatisticasModal } from '@/components/stats/EstatisticasModal'
import { RankingModal } from '@/components/ranking/RankingModal'
import { useEstatisticas } from '@/hooks/useEstatisticas'
import { useRanking } from '@/hooks/useRanking'
import { useSom } from '@/hooks/useSom'
import { useTheme } from '@/hooks/useTheme'
import { OPCOES_DIFICULDADE } from '@/types/dificuldade'
import { OPCOES_MODO, type ModoJogo } from '@/types/modo'
import type { Categoria, Dificuldade } from '@/types/palavra'
import { listarCategorias } from '@/utils/palavras'
import { ICONES_CATEGORIA } from '@/utils/categoriaIcones'

const CATEGORIAS = listarCategorias()

interface HomePageProps {
  onIniciar: (categoria: Categoria, dificuldade: Dificuldade, modo: ModoJogo) => void
}

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.05, delayChildren: 0.15 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
}

export function HomePage({ onIniciar }: HomePageProps) {
  const [categoria, setCategoria] = useState<Categoria>(CATEGORIAS[0])
  const [dificuldade, setDificuldade] = useState<Dificuldade>('facil')
  const [modo, setModo] = useState<ModoJogo>('classico')
  const [mostrarEstatisticas, setMostrarEstatisticas] = useState(false)
  const [mostrarRanking, setMostrarRanking] = useState(false)
  const { somAtivo, alternarSom, reproduzir } = useSom()
  const { tema, alternarTema } = useTheme()
  const { estatisticas, taxaVitoria } = useEstatisticas()
  const { ranking } = useRanking()

  function selecionarCategoria(cat: Categoria) {
    reproduzir('clique')
    setCategoria(cat)
  }

  function selecionarDificuldade(valor: Dificuldade) {
    reproduzir('clique')
    setDificuldade(valor)
  }

  function selecionarModo(valor: ModoJogo) {
    reproduzir('clique')
    setModo(valor)
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center gap-10 bg-gradient-to-b from-slate-100 via-white to-slate-100 px-4 py-10 text-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:text-slate-100">
      <div className="absolute right-4 top-4 flex items-center gap-2">
        <button
          type="button"
          onClick={() => {
            reproduzir('clique')
            setMostrarEstatisticas(true)
          }}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 text-lg text-slate-600 transition-colors hover:border-slate-400 dark:border-slate-700 dark:text-slate-300 dark:hover:border-slate-500"
          aria-label="Ver estatísticas"
        >
          📊
        </button>
        <button
          type="button"
          onClick={() => {
            reproduzir('clique')
            setMostrarRanking(true)
          }}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 text-lg text-slate-600 transition-colors hover:border-slate-400 dark:border-slate-700 dark:text-slate-300 dark:hover:border-slate-500"
          aria-label="Ver ranking"
        >
          🏆
        </button>
        <ThemeToggle tema={tema} onToggle={alternarTema} />
        <SomToggle ativo={somAtivo} onToggle={alternarSom} />
      </div>

      <AnimatePresence>
        {mostrarEstatisticas && (
          <EstatisticasModal
            estatisticas={estatisticas}
            taxaVitoria={taxaVitoria}
            onFechar={() => setMostrarEstatisticas(false)}
          />
        )}
        {mostrarRanking && (
          <RankingModal ranking={ranking} onFechar={() => setMostrarRanking(false)} />
        )}
      </AnimatePresence>

      <Logo />

      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="w-full max-w-2xl space-y-8"
      >
        <motion.div variants={itemVariants}>
          <h2 className="mb-3 text-center text-sm font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
            Categoria
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {CATEGORIAS.map((cat) => (
              <motion.div key={cat} variants={itemVariants}>
                <SelectableCard
                  label={cat}
                  icon={ICONES_CATEGORIA[cat]}
                  selected={categoria === cat}
                  onClick={() => selecionarCategoria(cat)}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <h2 className="mb-3 text-center text-sm font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
            Dificuldade
          </h2>
          <div className="grid grid-cols-3 gap-3">
            {OPCOES_DIFICULDADE.map((opcao) => (
              <motion.div key={opcao.valor} variants={itemVariants}>
                <SelectableCard
                  label={opcao.label}
                  description={opcao.descricao}
                  selected={dificuldade === opcao.valor}
                  onClick={() => selecionarDificuldade(opcao.valor)}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <h2 className="mb-3 text-center text-sm font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
            Modo de jogo
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {OPCOES_MODO.map((opcao) => (
              <motion.div key={opcao.valor} variants={itemVariants}>
                <SelectableCard
                  label={opcao.label}
                  description={opcao.descricao}
                  icon={opcao.icone}
                  selected={modo === opcao.valor}
                  onClick={() => selecionarModo(opcao.valor)}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="flex justify-center pt-2">
          <PlayButton
            onClick={() => {
              reproduzir('clique')
              onIniciar(categoria, dificuldade, modo)
            }}
          />
        </motion.div>
      </motion.section>
    </div>
  )
}
