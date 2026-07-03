import { useCallback, useMemo, useState } from 'react'
import type { Categoria, Dificuldade } from '@/types/palavra'
import { MAX_ERROS, type EstadoJogo } from '@/types/jogo'
import { sortearPalavra } from '@/utils/palavras'

interface UseGameParams {
  categoria: Categoria
  dificuldade: Dificuldade
}

export function useGame({ categoria, dificuldade }: UseGameParams) {
  const [rodada, setRodada] = useState(0)
  const palavraAtual = useMemo(
    () => sortearPalavra(categoria, dificuldade),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [categoria, dificuldade, rodada],
  )
  const [letrasUsadas, setLetrasUsadas] = useState<Set<string>>(new Set())

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
    },
    [estado],
  )

  const reiniciar = useCallback(() => {
    setLetrasUsadas(new Set())
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
    usarLetra,
    reiniciar,
  }
}
