import { motion } from 'framer-motion'

const ALFABETO = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

interface TecladoProps {
  letrasUsadas: Set<string>
  letrasCorretas: Set<string>
  onSelecionar: (letra: string) => void
  desabilitado: boolean
}

export function Teclado({
  letrasUsadas,
  letrasCorretas,
  onSelecionar,
  desabilitado,
}: TecladoProps) {
  return (
    <div className="grid grid-cols-7 gap-1.5 sm:grid-cols-9 sm:gap-2">
      {ALFABETO.map((letra) => {
        const usada = letrasUsadas.has(letra)
        const correta = letrasCorretas.has(letra)

        return (
          <motion.button
            key={letra}
            type="button"
            disabled={usada || desabilitado}
            onClick={() => onSelecionar(letra)}
            whileTap={usada ? undefined : { scale: 0.85 }}
            className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-bold transition-colors sm:h-10 sm:w-10 ${
              !usada
                ? 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                : correta
                  ? 'bg-emerald-500/80 text-white'
                  : 'bg-red-500/60 text-white/70'
            } disabled:cursor-not-allowed`}
          >
            {letra}
          </motion.button>
        )
      })}
    </div>
  )
}
