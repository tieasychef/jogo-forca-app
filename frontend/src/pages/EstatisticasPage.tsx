import { Users, Swords, Percent, Tags, Sparkles, Crown } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { Loader } from '../components/ui/Loader';
import { GlowCard } from '../components/ui/GlowCard';
import { CountUp } from '../components/ui/CountUp';
import { useEstatisticas } from '../hooks/useEstatisticas';

export function EstatisticasPage() {
  const { data: estatisticas, isLoading, isError } = useEstatisticas();

  return (
    <main className="min-h-screen">
      <Header />
      <div className="mx-auto max-w-3xl px-4 pb-16">
        <h1 className="mb-6 text-2xl font-bold">Estatisticas</h1>

        {isLoading && <Loader texto="Carregando estatisticas..." />}
        {isError && <p className="text-red-500">Nao foi possivel carregar as estatisticas.</p>}

        {estatisticas && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <GlowCard>
              <div className="flex items-center gap-3">
                <Users className="text-indigo-500" size={22} />
                <p className="text-sm text-slate-500 dark:text-slate-400">Total de jogadores</p>
              </div>
              <p className="mt-2 text-3xl font-bold">
                <CountUp value={estatisticas.totalJogadores} />
              </p>
            </GlowCard>

            <GlowCard>
              <div className="flex items-center gap-3">
                <Swords className="text-indigo-500" size={22} />
                <p className="text-sm text-slate-500 dark:text-slate-400">Total de partidas</p>
              </div>
              <p className="mt-2 text-3xl font-bold">
                <CountUp value={estatisticas.totalPartidas} />
              </p>
            </GlowCard>

            <GlowCard>
              <div className="flex items-center gap-3">
                <Percent className="text-indigo-500" size={22} />
                <p className="text-sm text-slate-500 dark:text-slate-400">Taxa de vitoria</p>
              </div>
              <p className="mt-2 text-3xl font-bold">
                <CountUp value={estatisticas.taxaVitoria} />%
              </p>
            </GlowCard>

            <GlowCard>
              <div className="flex items-center gap-3">
                <Crown className="text-indigo-500" size={22} />
                <p className="text-sm text-slate-500 dark:text-slate-400">Maior pontuacao</p>
              </div>
              <p className="mt-2 text-3xl font-bold">
                <CountUp value={estatisticas.maiorPontuacao} />
              </p>
            </GlowCard>

            <GlowCard>
              <div className="flex items-center gap-3">
                <Tags className="text-indigo-500" size={22} />
                <p className="text-sm text-slate-500 dark:text-slate-400">Categoria mais jogada</p>
              </div>
              <p className="mt-2 text-xl font-bold">
                {estatisticas.categoriaMaisJogada?.categoria ?? '-'}
              </p>
            </GlowCard>

            <GlowCard>
              <div className="flex items-center gap-3">
                <Sparkles className="text-indigo-500" size={22} />
                <p className="text-sm text-slate-500 dark:text-slate-400">Palavra mais sorteada</p>
              </div>
              <p className="mt-2 text-xl font-bold">
                {estatisticas.palavraMaisSorteada?.palavra ?? '-'}
              </p>
            </GlowCard>
          </div>
        )}
      </div>
    </main>
  );
}
