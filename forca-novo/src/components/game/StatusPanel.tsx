import { MAX_ERROS } from '@/types/jogo'

interface StatusPanelProps {
  letrasErradas: string[]
  erros: number
  pontuacao: number
}

export function StatusPanel({ letrasErradas, erros, pontuacao }: StatusPanelProps) {
  return (
    <div className="flex w-full max-w-md flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-300">
      <span>
        Tentativas restantes: <strong className="text-slate-100">{MAX_ERROS - erros}</strong>
      </span>
      <span>
        Pontuação: <strong className="text-emerald-400">{pontuacao}</strong>
      </span>
      <span className="flex items-center gap-1">
        Erradas:
        {letrasErradas.length === 0 ? (
          <span className="text-slate-500">—</span>
        ) : (
          letrasErradas.map((letra) => (
            <span
              key={letra}
              className="rounded bg-red-500/20 px-1.5 py-0.5 font-mono text-red-300"
            >
              {letra}
            </span>
          ))
        )}
      </span>
    </div>
  )
}
