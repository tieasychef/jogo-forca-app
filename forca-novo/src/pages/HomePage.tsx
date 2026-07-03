import { useState } from 'react'
import { motion } from 'framer-motion'
import { Logo } from '@/components/home/Logo'
import { SelectableCard } from '@/components/home/SelectableCard'
import { PlayButton } from '@/components/home/PlayButton'
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

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-10 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-4 py-10 text-slate-100">
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
                  onClick={() => setCategoria(cat)}
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
                  onClick={() => setDificuldade(opcao.valor)}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="flex justify-center pt-2">
          <PlayButton onClick={() => onIniciar(categoria, dificuldade)} />
        </motion.div>
      </motion.section>
    </div>
  )
}
