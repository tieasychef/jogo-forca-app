import { useCallback, useEffect } from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { setSomHabilitado, tocarSom, type SomId } from '@/utils/sounds'

export function useSom() {
  const [somAtivo, setSomAtivo] = useLocalStorage('forca:som-ativo', true)

  useEffect(() => {
    setSomHabilitado(somAtivo)
  }, [somAtivo])

  const alternarSom = useCallback(() => {
    setSomAtivo((atual) => !atual)
  }, [setSomAtivo])

  const reproduzir = useCallback((id: SomId) => {
    tocarSom(id)
  }, [])

  return { somAtivo, alternarSom, reproduzir }
}
