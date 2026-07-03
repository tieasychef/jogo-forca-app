import { useEffect } from 'react'
import { motion } from 'framer-motion'
import type { Conquista } from '@/types/conquista'

interface ConquistaToastProps {
  conquista: Conquista
  onFechar: () => void
}

export function ConquistaToast({ conquista, onFechar }: ConquistaToastProps) {
  useEffect(() => {
    const id = setTimeout(onFechar, 4000)
    return () => clearTimeout(id)
  }, [onFechar])

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 60, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 60, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className="flex items-center gap-3 rounded-xl border border-amber-400/50 bg-white px-4 py-3 shadow-xl dark:bg-slate-900"
    >
      <span className="text-2xl">{conquista.icone}</span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-amber-500">
          Conquista desbloqueada
        </p>
        <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
          {conquista.titulo}
        </p>
      </div>
    </motion.div>
  )
}
