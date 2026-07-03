import { motion } from 'framer-motion'

interface PlayButtonProps {
  onClick: () => void
  disabled?: boolean
}

export function PlayButton({ onClick, disabled }: PlayButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? undefined : { scale: 1.05 }}
      whileTap={disabled ? undefined : { scale: 0.95 }}
      className="relative overflow-hidden rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500 px-10 py-3 text-lg font-bold text-white shadow-lg shadow-fuchsia-500/30 transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
    >
      <motion.span
        aria-hidden
        className="absolute inset-0 bg-white/20"
        initial={{ x: '-100%' }}
        animate={disabled ? undefined : { x: '100%' }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
      />
      <span className="relative">Jogar</span>
    </motion.button>
  )
}
