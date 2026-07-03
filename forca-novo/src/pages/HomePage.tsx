import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Logo } from '@/components/home/Logo'
import { SelectableCard } from '@/components/home/SelectableCard'
import { PlayButton } from '@/components/home/PlayButton'
import { SomToggle } from '@/components/ui/SomToggle'
import { EstatisticasModal } from '@/components/stats/EstatisticasModal'
import { useEstatisticas } from '@/hooks/useEstatisticas'
import { useSom } from '@/hooks/useSom'
import { OPCOES_DIFICULDADE } from '@/types/dificuldade'
import type { Categoria, Dificuldade } from '@/types/palavra'
import { listarCategorias } from '@/utils/palavras'
import { ICONES_CATEGORIA } from '@/utils/categoriaIcones'

const CATEGORIAS = listarCategorias()

interface HomePageProps {
  onIniciar: (categoria: Categoria, dificuldade: Dificuldade) => void
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
  const [mostrarEstatisticas, setMostrarEstatisticas] = useState(false)
  const { somAtivo, alternarSom, reproduzir } = useSom()
  const { estatisticas, taxaVitoria } = useEstatisticas()

  function selecionarCategoria(cat: Categoria) {
    reproduzir('clique')
    setCategoria(cat)
  }

  function selecionarDificuldade(valor: Dificuldade) {
    reproduzir('clique')
    setDificuldade(valor)
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center gap-10 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-4 py-10 text-slate-100">
      <div className="absolute right-4 top-4 flex items-center gap-2">
        <button
          type="button"
          onClick={() => {
            reproduzir('clique')
            setMostrarEstatisticas(true)
          }}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 text-lg text-slate-300 transition-colors hover:border-slate-500"
          aria-label="Ver estatísticas"
        >
          📊
        </button>
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
      </AnimatePresence>

      <Logo />

      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="w-full max-w-2xl space-y-8"
      >
        <motion.div variants={itemVariants}>
          <h2 className="mb-3 text-center text-sm font-semibold uppercase tracking-widest text-slate-400">
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
          <h2 className="mb-3 text-center text-sm font-semibold uppercase tracking-widest text-slate-400">
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

        <motion.div variants={itemVariants} className="flex justify-center pt-2">
          <PlayButton
            onClick={() => {
              reproduzir('clique')
              onIniciar(categoria, dificuldade)
            }}
          />
        </motion.div>
      </motion.section>
    </div>
  )
}
