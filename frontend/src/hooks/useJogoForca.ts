import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { sortearPalavra } from '../data/palavras';

export const MAX_ERROS = 6;
const PONTOS_BASE = 100;
const PENALIDADE_POR_ERRO = 10;
const PENALIDADE_POR_SEGUNDO_EXTRA = 1;
const SEGUNDOS_SEM_PENALIDADE = 30;
const PONTUACAO_MINIMA = 20;

export type StatusJogo = 'jogando' | 'vitoria' | 'derrota';

function calcularPontos(erros: number, tempoSegundos: number): number {
  const penalidadeTempo =
    Math.max(0, tempoSegundos - SEGUNDOS_SEM_PENALIDADE) * PENALIDADE_POR_SEGUNDO_EXTRA;
  const pontos = PONTOS_BASE - erros * PENALIDADE_POR_ERRO - penalidadeTempo;
  return Math.max(PONTUACAO_MINIMA, Math.round(pontos));
}

export function useJogoForca() {
  const [rodada, setRodada] = useState(() => sortearPalavra());
  const [letrasTentadas, setLetrasTentadas] = useState<Set<string>>(new Set());
  const [tempoSegundos, setTempoSegundos] = useState(0);
  const [status, setStatus] = useState<StatusJogo>('jogando');

  useEffect(() => {
    if (status !== 'jogando') return;
    const intervalo = setInterval(() => setTempoSegundos((atual) => atual + 1), 1000);
    return () => clearInterval(intervalo);
  }, [status]);

  const letrasErradas = useMemo(
    () => [...letrasTentadas].filter((letra) => !rodada.palavra.includes(letra)),
    [letrasTentadas, rodada.palavra],
  );
  const erros = letrasErradas.length;

  useEffect(() => {
    if (erros >= MAX_ERROS) {
      setStatus('derrota');
      return;
    }
    const venceu = [...new Set(rodada.palavra)].every((letra) => letrasTentadas.has(letra));
    setStatus(venceu ? 'vitoria' : 'jogando');
  }, [letrasTentadas, rodada.palavra, erros]);

  const tentarLetra = useCallback((letraBruta: string) => {
    const letra = letraBruta.toUpperCase();
    setLetrasTentadas((atual) => {
      if (atual.has(letra)) return atual;
      return new Set(atual).add(letra);
    });
  }, []);

  const reiniciar = useCallback(() => {
    setRodada(sortearPalavra());
    setLetrasTentadas(new Set());
    setTempoSegundos(0);
    setStatus('jogando');
  }, []);

  const pontosGanhos = status === 'vitoria' ? calcularPontos(erros, tempoSegundos) : 0;

  return {
    palavra: rodada.palavra,
    categoria: rodada.categoria,
    letrasTentadas,
    letrasErradas,
    erros,
    tempoSegundos,
    status,
    pontosGanhos,
    tentarLetra,
    reiniciar,
  };
}

export function useJogoResultadoUnico() {
  const jaEnviado = useRef(false);
  const marcarComoEnviado = useCallback(() => {
    if (jaEnviado.current) return false;
    jaEnviado.current = true;
    return true;
  }, []);
  const resetar = useCallback(() => {
    jaEnviado.current = false;
  }, []);
  return { marcarComoEnviado, resetar };
}
