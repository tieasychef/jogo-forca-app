import { motion } from 'framer-motion'
import { CONQUISTAS } from '@/types/conquista'

interface ConquistasModalProps {
  desbloqueadas: string[]
  onFechar: () => void
}

export function ConquistasModal({ desbloqueadas, onFechar }: ConquistasModalProps) {
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
          <h2 className="text-xl font-bold">
            Conquistas · {desbloqueadas.length}/{CONQUISTAS.length}
          </h2>
          <button
            type="button"
            onClick={onFechar}
            aria-label="Fechar"
            className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
          >
            ✕
          </button>
        </div>

        <div className="max-h-96 space-y-2 overflow-y-auto">
          {CONQUISTAS.map((conquista) => {
            const desbloqueada = desbloqueadas.includes(conquista.id)
            return (
              <div
                key={conquista.id}
                className={`flex items-center gap-3 rounded-xl border p-3 ${
                  desbloqueada
                    ? 'border-amber-400/50 bg-amber-400/10'
                    : 'border-slate-200 bg-slate-100/60 opacity-60 dark:border-slate-800 dark:bg-slate-800/50'
                }`}
              >
                <span className="text-2xl">{desbloqueada ? conquista.icone : '🔒'}</span>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-slate-100">
                    {conquista.titulo}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {conquista.descricao}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </motion.div>
    </motion.div>
  )
}
