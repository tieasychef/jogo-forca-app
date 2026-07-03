import { motion } from 'framer-motion'
import { MAX_ERROS } from '@/types/jogo'

interface ForcaSvgProps {
  erros: number
}

const partesDoBoneco = [
  // cabeça
  <motion.circle
    key="cabeca"
    cx="150"
    cy="70"
    r="14"
    fill="none"
    stroke="currentColor"
    strokeWidth="4"
  />,
  // corpo
  <motion.line
    key="corpo"
    x1="150"
    y1="84"
    x2="150"
    y2="140"
    stroke="currentColor"
    strokeWidth="4"
    strokeLinecap="round"
  />,
  // braço esquerdo
  <motion.line
    key="braco-esquerdo"
    x1="150"
    y1="100"
    x2="122"
    y2="120"
    stroke="currentColor"
    strokeWidth="4"
    strokeLinecap="round"
  />,
  // braço direito
  <motion.line
    key="braco-direito"
    x1="150"
    y1="100"
    x2="178"
    y2="120"
    stroke="currentColor"
    strokeWidth="4"
    strokeLinecap="round"
  />,
  // perna esquerda
  <motion.line
    key="perna-esquerda"
    x1="150"
    y1="140"
    x2="126"
    y2="172"
    stroke="currentColor"
    strokeWidth="4"
    strokeLinecap="round"
  />,
  // perna direita
  <motion.line
    key="perna-direita"
    x1="150"
    y1="140"
    x2="174"
    y2="172"
    stroke="currentColor"
    strokeWidth="4"
    strokeLinecap="round"
  />,
]

export function ForcaSvg({ erros }: ForcaSvgProps) {
  const derrota = erros >= MAX_ERROS

  return (
    <motion.svg
      viewBox="0 0 260 220"
      className={`h-56 w-64 sm:h-64 sm:w-72 ${derrota ? 'text-red-400' : 'text-slate-200'}`}
      animate={derrota ? { x: [0, -4, 4, -4, 4, 0] } : {}}
      transition={{ duration: 0.4 }}
    >
      {/* base */}
      <line x1="30" y1="200" x2="130" y2="200" stroke="#8b5e34" strokeWidth="8" strokeLinecap="round" />
      {/* poste */}
      <line x1="55" y1="200" x2="55" y2="20" stroke="#8b5e34" strokeWidth="8" strokeLinecap="round" />
      {/* barra superior */}
      <line x1="55" y1="20" x2="150" y2="20" stroke="#8b5e34" strokeWidth="8" strokeLinecap="round" />
      {/* corda */}
      <line x1="150" y1="20" x2="150" y2="56" stroke="#c9a876" strokeWidth="3" />

      {partesDoBoneco.slice(0, erros).map((parte, index) => (
        <motion.g
          key={index}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 15 }}
        >
          {parte}
        </motion.g>
      ))}
    </motion.svg>
  )
}
