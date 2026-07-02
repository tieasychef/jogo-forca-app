import { motion } from 'framer-motion';
import { Trophy, XCircle } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { Loader } from '../components/ui/Loader';
import { useHistorico } from '../hooks/useHistorico';
import { formatTime } from '../lib/formatTime';

function formatarData(iso: string): string {
  return new Date(iso).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function HistoricoPage() {
  const { data: historico, isLoading, isError } = useHistorico();

  return (
    <main className="min-h-screen">
      <Header />
      <div className="mx-auto max-w-3xl px-4 pb-16">
        <h1 className="mb-6 text-2xl font-bold">Historico de partidas</h1>

        {isLoading && <Loader texto="Carregando historico..." />}
        {isError && <p className="text-red-500">Nao foi possivel carregar o historico.</p>}
        {historico?.length === 0 && (
          <p className="text-slate-500 dark:text-slate-400">Nenhuma partida registrada ainda.</p>
        )}

        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
              <tr>
                <th className="px-4 py-2.5 font-medium">Resultado</th>
                <th className="px-4 py-2.5 font-medium">Palavra</th>
                <th className="px-4 py-2.5 font-medium">Categoria</th>
                <th className="px-4 py-2.5 font-medium">Tempo</th>
                <th className="px-4 py-2.5 font-medium">Pontos</th>
                <th className="px-4 py-2.5 font-medium">Data</th>
              </tr>
            </thead>
            <tbody>
              {historico?.map((partida, indice) => (
                <motion.tr
                  key={partida.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: indice * 0.02 }}
                  className="border-t border-slate-100 bg-white dark:border-slate-800 dark:bg-slate-900"
                >
                  <td className="px-4 py-2.5">
                    {partida.resultado === 'VITORIA' ? (
                      <span className="flex items-center gap-1.5 font-medium text-emerald-600 dark:text-emerald-400">
                        <Trophy size={14} /> Vitoria
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 font-medium text-red-500">
                        <XCircle size={14} /> Derrota
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-2.5 font-medium">{partida.palavra}</td>
                  <td className="px-4 py-2.5">{partida.categoria}</td>
                  <td className="px-4 py-2.5">{formatTime(partida.tempoPartida)}</td>
                  <td className="px-4 py-2.5 font-semibold text-indigo-600 dark:text-indigo-400">
                    {partida.pontosGanhos}
                  </td>
                  <td className="px-4 py-2.5 text-slate-500 dark:text-slate-400">
                    {formatarData(partida.createdAt)}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
