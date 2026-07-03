import { OPCOES_MODO, type ModoJogo } from '@/types/modo'

interface ModoBadgeProps {
  modo: ModoJogo
  segundosRestantes?: number
}

export function ModoBadge({ modo, segundosRestantes }: ModoBadgeProps) {
  if (modo === 'classico') return null

  const opcao = OPCOES_MODO.find((item) => item.valor === modo)
  const tempoCritico = modo === 'tempo' && (segundosRestantes ?? 0) <= 10

  return (
    <div
      className={`flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-semibold ${
        tempoCritico
          ? 'animate-pulse border-red-400 text-red-500 dark:text-red-400'
          : 'border-slate-300 text-slate-600 dark:border-slate-700 dark:text-slate-300'
      }`}
    >
      <span>{opcao?.icone}</span>
      <span>{opcao?.label}</span>
      {modo === 'tempo' && <span>· {segundosRestantes}s</span>}
    </div>
  )
}
