import { useEffect, useState } from 'react'

interface UseCountdownParams {
  duracaoSegundos: number
  ativo: boolean
  chaveReset: number | string
  aoZerar: () => void
}

export function useCountdown({
  duracaoSegundos,
  ativo,
  chaveReset,
  aoZerar,
}: UseCountdownParams) {
  const [restante, setRestante] = useState(duracaoSegundos)

  useEffect(() => {
    setRestante(duracaoSegundos)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chaveReset, duracaoSegundos])

  useEffect(() => {
    if (!ativo) return

    if (restante <= 0) {
      aoZerar()
      return
    }

    const id = setTimeout(() => setRestante((valor) => valor - 1), 1000)
    return () => clearTimeout(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ativo, restante])

  return restante
}
