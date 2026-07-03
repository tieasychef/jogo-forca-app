import { motion, AnimatePresence } from 'framer-motion'
import { MAX_ERROS } from '@/types/jogo'

interface StatusPanelProps {
  letrasErradas: string[]
  erros: number
  pontuacao: number
  combo: number
  melhorPontuacao: number
}

export function StatusPanel({
  letrasErradas,
  erros,
  pontuacao,
  combo,
  melhorPontuacao,
}: StatusPanelProps) {
  return (
    <div className="flex w-full max-w-md flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-600 dark:text-slate-300">
      <span>
        Tentativas restantes:{' '}
        <strong className="text-slate-900 dark:text-slate-100">{MAX_ERROS - erros}</strong>
      </span>
      <span>
        Pontuação: <strong className="text-emerald-600 dark:text-emerald-400">{pontuacao}</strong>
      </span>
      <span>
        Melhor: <strong className="text-slate-900 dark:text-slate-100">{melhorPontuacao}</strong>
      </span>
      <AnimatePresence>
        {combo >= 2 && (
          <motion.span
            key={combo}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            className="rounded-full bg-amber-400/20 px-2 py-0.5 font-bold text-amber-300"
          >
            Combo x{combo}
          </motion.span>
        )}
      </AnimatePresence>
      <span className="flex items-center gap-1">
        Erradas:
        {letrasErradas.length === 0 ? (
          <span className="text-slate-400 dark:text-slate-500">—</span>
        ) : (
          letrasErradas.map((letra) => (
            <span
              key={letra}
              className="rounded bg-red-500/20 px-1.5 py-0.5 font-mono text-red-300"
            >
              {letra}
            </span>
          ))
        )}
      </span>
    </div>
  )
}
