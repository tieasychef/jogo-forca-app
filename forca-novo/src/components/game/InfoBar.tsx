interface InfoBarProps {
  categoria: string
  dica: string
  mostrarDica: boolean
}

export function InfoBar({ categoria, dica, mostrarDica }: InfoBarProps) {
  return (
    <div className="flex flex-col items-center gap-1 text-center">
      <span className="rounded-full bg-fuchsia-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-fuchsia-600 dark:text-fuchsia-300">
        {categoria}
      </span>
      {mostrarDica ? (
        <p className="text-sm text-slate-500 dark:text-slate-400 sm:text-base">Dica: {dica}</p>
      ) : (
        <p className="text-sm italic text-slate-400 dark:text-slate-500 sm:text-base">
          Modo desafio: sem dicas
        </p>
      )}
    </div>
  )
}
