import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, LogOut, RotateCcw, Trophy, XCircle } from 'lucide-react';
import { ForcaSvg } from '../components/game/ForcaSvg';
import { Teclado } from '../components/game/Teclado';
import { PalavraDisplay } from '../components/game/PalavraDisplay';
import { useJogoForca, useJogoResultadoUnico, MAX_ERROS } from '../hooks/useJogoForca';
import { useRegistrarPartida } from '../hooks/useRegistrarPartida';
import { formatTime } from '../lib/formatTime';

export function GamePage() {
  const navigate = useNavigate();
  const nome = localStorage.getItem('jogoForca.nome');
  const usuarioId = localStorage.getItem('jogoForca.usuarioId');

  const jogo = useJogoForca();
  const registrarPartida = useRegistrarPartida();
  const { marcarComoEnviado, resetar } = useJogoResultadoUnico();

  useEffect(() => {
    if (!nome || !usuarioId) navigate('/', { replace: true });
  }, [nome, usuarioId, navigate]);

  useEffect(() => {
    if (jogo.status === 'jogando' || !usuarioId) return;
    if (!marcarComoEnviado()) return;

    registrarPartida.mutate({
      usuarioId,
      palavra: jogo.palavra,
      categoria: jogo.categoria,
      resultado: jogo.status === 'vitoria' ? 'VITORIA' : 'DERROTA',
      tentativas: jogo.letrasTentadas.size,
      erros: jogo.erros,
      tempoPartida: jogo.tempoSegundos,
      pontosGanhos: jogo.pontosGanhos,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jogo.status]);

  function handleReiniciar() {
    resetar();
    jogo.reiniciar();
  }

  function handleSair() {
    localStorage.removeItem('jogoForca.nome');
    localStorage.removeItem('jogoForca.usuarioId');
    navigate('/');
  }

  if (!nome || !usuarioId) return null;

  const jogoFinalizado = jogo.status !== 'jogando';

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center gap-6 px-4 py-8">
      <header className="flex w-full items-center justify-between">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">Jogador</p>
          <p className="font-semibold">{nome}</p>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-medium dark:bg-slate-800">
          <Clock size={16} />
          {formatTime(jogo.tempoSegundos)}
        </div>
      </header>

      <div className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm dark:border-slate-800 dark:bg-slate-900">
        <span className="rounded-full bg-indigo-100 px-3 py-1 font-medium text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300">
          {jogo.categoria}
        </span>
        <span>
          Tentativas restantes: <strong>{MAX_ERROS - jogo.erros}</strong>
        </span>
      </div>

      <ForcaSvg erros={jogo.erros} />

      <PalavraDisplay
        palavra={jogo.palavra}
        letrasTentadas={jogo.letrasTentadas}
        revelarTudo={jogoFinalizado}
      />

      {jogo.letrasErradas.length > 0 && (
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Letras erradas:{' '}
          <span className="font-medium text-red-500">{jogo.letrasErradas.join(', ')}</span>
        </p>
      )}

      {jogoFinalizado ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-3 rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-lg dark:border-slate-800 dark:bg-slate-900"
        >
          {jogo.status === 'vitoria' ? (
            <>
              <Trophy className="text-amber-500" size={40} />
              <p className="text-xl font-bold">Voce venceu!</p>
              <p className="text-slate-500 dark:text-slate-400">
                +{jogo.pontosGanhos} pontos em {formatTime(jogo.tempoSegundos)}
              </p>
            </>
          ) : (
            <>
              <XCircle className="text-red-500" size={40} />
              <p className="text-xl font-bold">Voce perdeu!</p>
              <p className="text-slate-500 dark:text-slate-400">A palavra era: {jogo.palavra}</p>
            </>
          )}
        </motion.div>
      ) : (
        <Teclado
          letrasTentadas={jogo.letrasTentadas}
          palavra={jogo.palavra}
          desabilitado={jogoFinalizado}
          onTentarLetra={jogo.tentarLetra}
        />
      )}

      <div className="mt-2 flex gap-3">
        <button
          type="button"
          onClick={handleReiniciar}
          className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500"
        >
          <RotateCcw size={16} />
          Reiniciar
        </button>
        <button
          type="button"
          onClick={handleSair}
          className="flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold transition hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
        >
          <LogOut size={16} />
          Sair
        </button>
      </div>
    </main>
  );
}
