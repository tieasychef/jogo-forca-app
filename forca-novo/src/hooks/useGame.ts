import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react'
import type { Categoria, Dificuldade } from '@/types/palavra'
import { MAX_ERROS, type EstadoJogo } from '@/types/jogo'
import { sortearPalavra } from '@/utils/palavras'
import { calcularGanhoPorAcerto, PONTOS_ERRO, PONTOS_VITORIA } from '@/utils/pontuacao'
import { useLocalStorage } from '@/hooks/useLocalStorage'

interface UseGameParams {
  categoria: Categoria
  dificuldade: Dificuldade
}

interface Placar {
  pontuacao: number
  combo: number
}

type AcaoPlacar = { tipo: 'acerto' } | { tipo: 'erro' } | { tipo: 'vitoria' } | { tipo: 'reset' }

const PLACAR_INICIAL: Placar = { pontuacao: 0, combo: 0 }

function placarReducer(estado: Placar, acao: AcaoPlacar): Placar {
  switch (acao.tipo) {
    case 'acerto':
      return {
        pontuacao: estado.pontuacao + calcularGanhoPorAcerto(estado.combo),
        combo: estado.combo + 1,
      }
    case 'erro':
      return { pontuacao: Math.max(0, estado.pontuacao - PONTOS_ERRO), combo: 0 }
    case 'vitoria':
      return { ...estado, pontuacao: estado.pontuacao + PONTOS_VITORIA }
    case 'reset':
      return PLACAR_INICIAL
  }
}

export function useGame({ categoria, dificuldade }: UseGameParams) {
  const [rodada, setRodada] = useState(0)
  const palavraAtual = useMemo(
    () => sortearPalavra(categoria, dificuldade),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [categoria, dificuldade, rodada],
  )
  const [letrasUsadas, setLetrasUsadas] = useState<Set<string>>(new Set())
  const [placar, despacharPlacar] = useReducer(placarReducer, PLACAR_INICIAL)
  const [melhorPontuacao, setMelhorPontuacao] = useLocalStorage('forca:melhor-pontuacao', 0)
  const bonusVitoriaAplicado = useRef(false)

  const letrasCorretas = useMemo(
    () => new Set([...letrasUsadas].filter((letra) => palavraAtual.palavra.includes(letra))),
    [letrasUsadas, palavraAtual],
  )
  const letrasErradas = useMemo(
    () => [...letrasUsadas].filter((letra) => !palavraAtual.palavra.includes(letra)),
    [letrasUsadas, palavraAtual],
  )
  const erros = letrasErradas.length
  const tentativasRestantes = MAX_ERROS - erros

  const venceu = palavraAtual.palavra
    .split('')
    .every((letra) => letrasCorretas.has(letra))
  const perdeu = !venceu && erros >= MAX_ERROS

  const estado: EstadoJogo = venceu ? 'venceu' : perdeu ? 'perdeu' : 'jogando'

  const usarLetra = useCallback(
    (letra: string) => {
      if (estado !== 'jogando') return
      setLetrasUsadas((atual) => {
        if (atual.has(letra)) return atual
        return new Set(atual).add(letra)
      })

      despacharPlacar({ tipo: palavraAtual.palavra.includes(letra) ? 'acerto' : 'erro' })
    },
    [estado, palavraAtual],
  )

  useEffect(() => {
    if (venceu && !bonusVitoriaAplicado.current) {
      bonusVitoriaAplicado.current = true
      despacharPlacar({ tipo: 'vitoria' })
    }
  }, [venceu])

  useEffect(() => {
    if (placar.pontuacao > melhorPontuacao) {
      setMelhorPontuacao(placar.pontuacao)
    }
  }, [placar.pontuacao, melhorPontuacao, setMelhorPontuacao])

  const reiniciar = useCallback(() => {
    setLetrasUsadas(new Set())
    despacharPlacar({ tipo: 'reset' })
    bonusVitoriaAplicado.current = false
    setRodada((valor) => valor + 1)
  }, [])

  return {
    palavraAtual,
    letrasUsadas,
    letrasCorretas,
    letrasErradas,
    erros,
    tentativasRestantes,
    estado,
    pontuacao: placar.pontuacao,
    combo: placar.combo,
    melhorPontuacao,
    usarLetra,
    reiniciar,
  }
}
