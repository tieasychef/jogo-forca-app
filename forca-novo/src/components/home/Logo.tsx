import { motion } from 'framer-motion'

export function Logo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="flex flex-col items-center gap-2 text-center"
    >
      <span className="text-6xl">🎯</span>
      <h1 className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl">
        Jogo da Forca
      </h1>
      <p className="text-sm text-slate-400 sm:text-base">
        Descubra a palavra antes que seja tarde demais
      </p>
    </motion.div>
  )
}
