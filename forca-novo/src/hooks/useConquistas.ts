import { useCallback, useEffect, useState } from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { CONQUISTAS, type Conquista } from '@/types/conquista'
import type { Estatisticas } from '@/types/estatisticas'

export function useConquistas(estatisticas: Estatisticas) {
  const [desbloqueadas, setDesbloqueadas] = useLocalStorage<string[]>('forca:conquistas', [])
  const [notificacoes, setNotificacoes] = useState<Conquista[]>([])

  useEffect(() => {
    const novas = CONQUISTAS.filter(
      (conquista) => !desbloqueadas.includes(conquista.id) && conquista.condicao(estatisticas),
    )
    if (novas.length === 0) return

    setDesbloqueadas((atual) => [...atual, ...novas.map((conquista) => conquista.id)])
    setNotificacoes((atual) => [...atual, ...novas])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [estatisticas])

  const dispensarNotificacao = useCallback((id: string) => {
    setNotificacoes((atual) => atual.filter((conquista) => conquista.id !== id))
  }, [])

  return { desbloqueadas, notificacoes, dispensarNotificacao }
}
