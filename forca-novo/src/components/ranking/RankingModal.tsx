import { motion } from 'framer-motion'
import type { EntradaRanking } from '@/types/ranking'

interface RankingModalProps {
  ranking: EntradaRanking[]
  onFechar: () => void
}

function formatarData(data: string) {
  return new Date(data).toLocaleDateString('pt-BR')
}

export function RankingModal({ ranking, onFechar }: RankingModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 backdrop-blur-sm"
      onClick={onFechar}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 16 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        onClick={(evento) => evento.stopPropagation()}
        className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 text-slate-900 shadow-2xl dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Ranking · Top 10</h2>
          <button
            type="button"
            onClick={onFechar}
            aria-label="Fechar"
            className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
          >
            ✕
          </button>
        </div>

        {ranking.length === 0 ? (
          <p className="py-8 text-center text-slate-500 dark:text-slate-400">
            Ninguém pontuou ainda. Jogue e seja o primeiro!
          </p>
        ) : (
          <div className="max-h-96 space-y-2 overflow-y-auto">
            {ranking.map((entrada, indice) => (
              <div
                key={`${entrada.nome}-${entrada.data}-${indice}`}
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-100/60 p-3 dark:border-slate-800 dark:bg-slate-800/50"
              >
                <span className="w-6 text-center font-bold text-fuchsia-600 dark:text-fuchsia-300">
                  {indice + 1}
                </span>
                <div className="flex-1">
                  <p className="font-semibold text-slate-900 dark:text-slate-100">
                    {entrada.nome}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {entrada.categoria} · {entrada.dificuldade} · {formatarData(entrada.data)}
                  </p>
                </div>
                <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                  {entrada.pontuacao}
                </span>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}
