import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react'
import type { Categoria, Dificuldade } from '@/types/palavra'
import { MAX_ERROS, type EstadoJogo } from '@/types/jogo'
import type { ModoJogo } from '@/types/modo'
import { sortearPalavra } from '@/utils/palavras'
import { calcularGanhoPorAcerto, PONTOS_ERRO, PONTOS_VITORIA } from '@/utils/pontuacao'

const ATRASO_PROXIMA_PALAVRA_MS = 1200

interface UseGameParams {
  categoria: Categoria
  dificuldade: Dificuldade
  modo?: ModoJogo
  aoAcertarLetra?: () => void
  aoErrarLetra?: () => void
  aoVencer?: () => void
  aoPerder?: () => void
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

export function useGame({
  categoria,
  dificuldade,
  modo = 'classico',
  aoAcertarLetra,
  aoErrarLetra,
  aoVencer,
  aoPerder,
}: UseGameParams) {
  const [rodada, setRodada] = useState(0)
  const palavraAtual = useMemo(
    () => sortearPalavra(categoria, dificuldade),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [categoria, dificuldade, rodada],
  )
  const [letrasUsadas, setLetrasUsadas] = useState<Set<string>>(new Set())
  const [placar, despacharPlacar] = useReducer(placarReducer, PLACAR_INICIAL)
  const [derrotaForcada, setDerrotaForcada] = useState(false)
  const fimDeJogoAplicado = useRef(false)

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
  const perdeu = !venceu && (erros >= MAX_ERROS || derrotaForcada)

  const estado: EstadoJogo = venceu ? 'venceu' : perdeu ? 'perdeu' : 'jogando'

  const usarLetra = useCallback(
    (letra: string) => {
      if (estado !== 'jogando') return
      setLetrasUsadas((atual) => {
        if (atual.has(letra)) return atual
        return new Set(atual).add(letra)
      })

      if (palavraAtual.palavra.includes(letra)) {
        despacharPlacar({ tipo: 'acerto' })
        aoAcertarLetra?.()
      } else {
        despacharPlacar({ tipo: 'erro' })
        aoErrarLetra?.()
      }
    },
    [estado, palavraAtual, aoAcertarLetra, aoErrarLetra],
  )

  const forcarDerrota = useCallback(() => {
    setDerrotaForcada(true)
  }, [])

  useEffect(() => {
    if (venceu && !fimDeJogoAplicado.current) {
      fimDeJogoAplicado.current = true
      despacharPlacar({ tipo: 'vitoria' })
      aoVencer?.()

      if (modo === 'infinito') {
        const id = setTimeout(() => {
          setLetrasUsadas(new Set())
          setRodada((valor) => valor + 1)
          fimDeJogoAplicado.current = false
        }, ATRASO_PROXIMA_PALAVRA_MS)
        return () => clearTimeout(id)
      }
    } else if (perdeu && !fimDeJogoAplicado.current) {
      fimDeJogoAplicado.current = true
      aoPerder?.()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [venceu, perdeu, modo])

  const reiniciar = useCallback(() => {
    setLetrasUsadas(new Set())
    despacharPlacar({ tipo: 'reset' })
    setDerrotaForcada(false)
    fimDeJogoAplicado.current = false
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
    rodada,
    usarLetra,
    forcarDerrota,
    reiniciar,
  }
}
