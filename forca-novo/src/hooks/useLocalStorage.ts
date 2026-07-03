import { useEffect, useState } from 'react'

export function useLocalStorage<T>(chave: string, valorInicial: T) {
  const [valor, setValor] = useState<T>(() => {
    try {
      const armazenado = window.localStorage.getItem(chave)
      return armazenado ? (JSON.parse(armazenado) as T) : valorInicial
    } catch {
      return valorInicial
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(chave, JSON.stringify(valor))
    } catch {
      // armazenamento indisponível (ex: modo privado); ignora silenciosamente
    }
  }, [chave, valor])

  return [valor, setValor] as const
}
