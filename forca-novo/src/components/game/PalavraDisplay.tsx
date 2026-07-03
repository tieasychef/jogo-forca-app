import { motion } from 'framer-motion'

interface PalavraDisplayProps {
  palavra: string
  letrasCorretas: Set<string>
}

export function PalavraDisplay({ palavra, letrasCorretas }: PalavraDisplayProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
      {palavra.split('').map((letra, index) => {
        const revelada = letrasCorretas.has(letra)
        return (
          <motion.div
            key={`${letra}-${index}`}
            initial={false}
            animate={revelada ? { rotateX: [90, 0], opacity: 1 } : { opacity: 1 }}
            transition={{ duration: 0.35 }}
            className="flex h-10 w-7 items-center justify-center border-b-4 border-slate-500 text-2xl font-bold text-slate-100 sm:h-12 sm:w-9 sm:text-3xl"
          >
            {revelada ? letra : ''}
          </motion.div>
        )
      })}
    </div>
  )
}
