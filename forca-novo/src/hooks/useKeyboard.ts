import { useEffect } from 'react'

const LETRA_VALIDA = /^[A-Z]$/

export function useKeyboard(aoDigitarLetra: (letra: string) => void, ativo: boolean) {
  useEffect(() => {
    if (!ativo) return

    function aoPressionarTecla(evento: KeyboardEvent) {
      const letra = evento.key.toUpperCase()
      if (!LETRA_VALIDA.test(letra)) return
      aoDigitarLetra(letra)
    }

    window.addEventListener('keydown', aoPressionarTecla)
    return () => window.removeEventListener('keydown', aoPressionarTecla)
  }, [aoDigitarLetra, ativo])
}
