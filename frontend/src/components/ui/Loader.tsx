import { Loader2 } from 'lucide-react';

interface LoaderProps {
  texto?: string;
}

export function Loader({ texto = 'Carregando...' }: LoaderProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-slate-500 dark:text-slate-400">
      <Loader2 className="animate-spin" size={28} />
      <p className="text-sm">{texto}</p>
    </div>
  );
}
