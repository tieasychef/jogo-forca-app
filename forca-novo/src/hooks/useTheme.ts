import { useCallback, useEffect } from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage'

export type Tema = 'claro' | 'escuro'

export function useTheme() {
  const [tema, setTema] = useLocalStorage<Tema>('forca:tema', 'escuro')

  useEffect(() => {
    document.documentElement.classList.toggle('dark', tema === 'escuro')
  }, [tema])

  const alternarTema = useCallback(() => {
    setTema((atual) => (atual === 'escuro' ? 'claro' : 'escuro'))
  }, [setTema])

  return { tema, alternarTema }
}
