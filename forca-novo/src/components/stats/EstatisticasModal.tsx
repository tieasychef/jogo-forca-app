import { motion } from 'framer-motion'
import type { Estatisticas } from '@/types/estatisticas'

interface EstatisticasModalProps {
  estatisticas: Estatisticas
  taxaVitoria: number
  onFechar: () => void
}

interface Item {
  label: string
  valor: string | number
}

export function EstatisticasModal({
  estatisticas,
  taxaVitoria,
  onFechar,
}: EstatisticasModalProps) {
  const itens: Item[] = [
    { label: 'Partidas jogadas', valor: estatisticas.partidasJogadas },
    { label: 'Vitórias', valor: estatisticas.vitorias },
    { label: 'Derrotas', valor: estatisticas.derrotas },
    { label: 'Taxa de vitória', valor: `${taxaVitoria}%` },
    { label: 'Maior sequência de vitórias', valor: estatisticas.maiorSequenciaVitorias },
    { label: 'Melhor pontuação', valor: estatisticas.melhorPontuacao },
    { label: 'Palavras acertadas', valor: estatisticas.totalPalavrasAcertadas },
    { label: 'Partidas sem erro', valor: estatisticas.partidasSemErro },
  ]

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
        className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-6 text-slate-100 shadow-2xl"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Estatísticas</h2>
          <button
            type="button"
            onClick={onFechar}
            aria-label="Fechar"
            className="text-slate-400 hover:text-slate-200"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {itens.map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-slate-800 bg-slate-800/50 p-3 text-center"
            >
              <p className="text-2xl font-bold text-fuchsia-300">{item.valor}</p>
              <p className="text-xs text-slate-400">{item.label}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
