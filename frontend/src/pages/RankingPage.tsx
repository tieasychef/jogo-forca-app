import { motion } from 'framer-motion';
import { Medal } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { Loader } from '../components/ui/Loader';
import { useRanking } from '../hooks/useRanking';

const CORES_POSICAO = ['text-amber-500', 'text-slate-400', 'text-amber-700'];

export function RankingPage() {
  const { data: ranking, isLoading, isError } = useRanking();

  return (
    <main className="min-h-screen">
      <Header />
      <div className="mx-auto max-w-2xl px-4 pb-16">
        <h1 className="mb-6 text-2xl font-bold">Ranking</h1>

        {isLoading && <Loader texto="Carregando ranking..." />}
        {isError && <p className="text-red-500">Nao foi possivel carregar o ranking.</p>}
        {ranking?.length === 0 && (
          <p className="text-slate-500 dark:text-slate-400">Ninguem jogou ainda.</p>
        )}

        <ul className="flex flex-col gap-2">
          {ranking?.map((usuario, indice) => (
            <motion.li
              key={usuario.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: indice * 0.03 }}
              className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`flex w-6 justify-center font-bold ${CORES_POSICAO[indice] ?? 'text-slate-400'}`}
                >
                  {indice < 3 ? <Medal size={18} /> : indice + 1}
                </span>
                <span className="font-medium">{usuario.nome}</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                <span>{usuario.vitorias}V</span>
                <span>{usuario.derrotas}D</span>
                <span>{usuario.partidas} partidas</span>
                <span className="w-14 text-right font-bold text-indigo-600 dark:text-indigo-400">
                  {usuario.pontuacao} pts
                </span>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </main>
  );
}
