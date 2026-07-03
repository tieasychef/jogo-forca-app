import { useCallback } from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { TAMANHO_MAXIMO_RANKING, type EntradaRanking } from '@/types/ranking'

export function useRanking() {
  const [ranking, setRanking] = useLocalStorage<EntradaRanking[]>('forca:ranking', [])

  const entraNoRanking = useCallback(
    (pontuacao: number) => {
      if (pontuacao <= 0) return false
      if (ranking.length < TAMANHO_MAXIMO_RANKING) return true
      const menorPontuacao = ranking[ranking.length - 1]?.pontuacao ?? 0
      return pontuacao > menorPontuacao
    },
    [ranking],
  )

  const adicionarEntrada = useCallback(
    (entrada: EntradaRanking) => {
      setRanking((atual) =>
        [...atual, entrada]
          .sort((a, b) => b.pontuacao - a.pontuacao)
          .slice(0, TAMANHO_MAXIMO_RANKING),
      )
    },
    [setRanking],
  )

  return { ranking, entraNoRanking, adicionarEntrada }
}
