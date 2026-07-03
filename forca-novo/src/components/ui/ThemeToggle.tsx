import type { Tema } from '@/hooks/useTheme'

interface ThemeToggleProps {
  tema: Tema
  onToggle: () => void
}

export function ThemeToggle({ tema, onToggle }: ThemeToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={tema === 'escuro' ? 'Ativar modo claro' : 'Ativar modo escuro'}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 text-lg text-slate-600 transition-colors hover:border-slate-400 dark:border-slate-700 dark:text-slate-300 dark:hover:border-slate-500"
    >
      {tema === 'escuro' ? '🌙' : '☀️'}
    </button>
  )
}
