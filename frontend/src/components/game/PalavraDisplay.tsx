interface PalavraDisplayProps {
  palavra: string;
  letrasTentadas: Set<string>;
  revelarTudo: boolean;
}

export function PalavraDisplay({ palavra, letrasTentadas, revelarTudo }: PalavraDisplayProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {palavra.split('').map((letra, indice) => {
        const visivel = revelarTudo || letrasTentadas.has(letra);
        return (
          <span
            key={`${letra}-${indice}`}
            className="flex h-11 w-8 items-center justify-center border-b-2 border-slate-400 text-xl font-bold uppercase sm:h-12 sm:w-9 dark:border-slate-600"
          >
            {visivel ? letra : ''}
          </span>
        );
      })}
    </div>
  );
}
