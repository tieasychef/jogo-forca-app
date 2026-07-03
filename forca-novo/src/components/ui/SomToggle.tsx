interface SomToggleProps {
  ativo: boolean
  onToggle: () => void
}

export function SomToggle({ ativo, onToggle }: SomToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={ativo ? 'Desativar sons' : 'Ativar sons'}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 text-lg text-slate-600 transition-colors hover:border-slate-400 dark:border-slate-700 dark:text-slate-300 dark:hover:border-slate-500"
    >
      {ativo ? '🔊' : '🔇'}
    </button>
  )
}
