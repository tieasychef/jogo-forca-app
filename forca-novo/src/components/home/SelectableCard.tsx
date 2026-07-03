import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface SelectableCardProps {
  label: string
  description?: string
  icon?: ReactNode
  selected: boolean
  onClick: () => void
}

export function SelectableCard({
  label,
  description,
  icon,
  selected,
  onClick,
}: SelectableCardProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.96 }}
      className={`relative flex flex-col items-center gap-1 rounded-xl border px-4 py-3 text-sm font-medium transition-colors ${
        selected
          ? 'border-fuchsia-400 bg-fuchsia-500/10 text-fuchsia-200 shadow-[0_0_20px_-4px_rgba(232,121,249,0.6)]'
          : 'border-slate-700 bg-slate-800/60 text-slate-300 hover:border-slate-500'
      }`}
    >
      {icon && <span className="text-xl">{icon}</span>}
      <span>{label}</span>
      {description && <span className="text-xs text-slate-500">{description}</span>}
    </motion.button>
  )
}
