import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import type { EstadoJogo } from '@/types/jogo'

interface ResultModalProps {
  estado: Extract<EstadoJogo, 'venceu' | 'perdeu'>
  palavra: string
  pontuacao: number
  elegivelParaRanking: boolean
  onReiniciar: () => void
  onVoltar: () => void
  onSalvarNoRanking: (nome: string) => void
}

export function ResultModal({
  estado,
  palavra,
  pontuacao,
  elegivelParaRanking,
  onReiniciar,
  onVoltar,
  onSalvarNoRanking,
}: ResultModalProps) {
  const venceu = estado === 'venceu'
  const [nome, setNome] = useState('')
  const [salvo, setSalvo] = useState(false)

  useEffect(() => {
    if (!venceu) return
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#e879f9', '#a78bfa', '#22d3ee', '#34d399'],
    })
  }, [venceu])

  function salvarPontuacao() {
    const nomeFinal = nome.trim() || 'Jogador'
    onSalvarNoRanking(nomeFinal)
    setSalvo(true)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="flex w-full max-w-sm flex-col items-center gap-4 rounded-2xl border border-slate-700 bg-slate-900 p-8 text-center shadow-2xl"
      >
        <span className="text-5xl">{venceu ? '🎉' : '💀'}</span>
        <h2
          className={`text-2xl font-extrabold ${venceu ? 'text-emerald-400' : 'text-red-400'}`}
        >
          {venceu ? 'Você venceu!' : 'Fim de jogo'}
        </h2>
        <p className="text-slate-300">
          A palavra era <strong className="text-slate-100">{palavra}</strong>
        </p>
        <p className="text-lg font-semibold text-slate-100">
          Pontuação final: <span className="text-fuchsia-400">{pontuacao}</span>
        </p>

        {elegivelParaRanking && !salvo && (
          <div className="flex w-full flex-col gap-2">
            <p className="text-sm font-semibold text-amber-300">
              Sua pontuação entrou no Top 10! 🏆
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                value={nome}
                onChange={(evento) => setNome(evento.target.value)}
                maxLength={20}
                placeholder="Seu nome"
                className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-sm text-slate-100 outline-none focus:border-fuchsia-400"
              />
              <button
                type="button"
                onClick={salvarPontuacao}
                className="shrink-0 rounded-lg bg-amber-400 px-3 py-2 text-sm font-bold text-slate-900"
              >
                Salvar
              </button>
            </div>
          </div>
        )}
        {elegivelParaRanking && salvo && (
          <p className="text-sm text-emerald-400">Pontuação salva no ranking!</p>
        )}

        <div className="mt-2 flex gap-3">
          <button
            type="button"
            onClick={onVoltar}
            className="rounded-full border border-slate-600 px-4 py-2 text-sm text-slate-300 transition-colors hover:border-slate-400"
          >
            Início
          </button>
          <button
            type="button"
            onClick={onReiniciar}
            className="rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500 px-5 py-2 text-sm font-bold text-white shadow-lg shadow-fuchsia-500/30"
          >
            Jogar novamente
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
