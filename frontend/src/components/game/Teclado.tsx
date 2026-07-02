const LINHAS = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'];

interface TecladoProps {
  letrasTentadas: Set<string>;
  palavra: string;
  desabilitado: boolean;
  onTentarLetra: (letra: string) => void;
}

export function Teclado({ letrasTentadas, palavra, desabilitado, onTentarLetra }: TecladoProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      {LINHAS.map((linha) => (
        <div key={linha} className="flex gap-1.5">
          {linha.split('').map((letra) => {
            const tentada = letrasTentadas.has(letra);
            const correta = tentada && palavra.includes(letra);
            const errada = tentada && !palavra.includes(letra);

            return (
              <button
                key={letra}
                type="button"
                disabled={tentada || desabilitado}
                onClick={() => onTentarLetra(letra)}
                aria-pressed={tentada}
                className={`flex h-10 w-8 items-center justify-center rounded-md text-sm font-semibold transition sm:h-11 sm:w-9 ${
                  correta
                    ? 'bg-emerald-500 text-white'
                    : errada
                      ? 'bg-red-500/80 text-white'
                      : 'bg-slate-200 text-slate-800 hover:bg-indigo-100 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                {letra}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
