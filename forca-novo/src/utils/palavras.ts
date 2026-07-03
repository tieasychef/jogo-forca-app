import { PALAVRAS } from '@/data/palavras'
import type { Categoria, Dificuldade, Palavra } from '@/types/palavra'

const LIMITE_FACIL = 5
const LIMITE_MEDIO = 9

export function calcularDificuldade(palavra: string): Dificuldade {
  if (palavra.length <= LIMITE_FACIL) return 'facil'
  if (palavra.length <= LIMITE_MEDIO) return 'medio'
  return 'dificil'
}

export function listarCategorias(): Categoria[] {
  return Array.from(new Set(PALAVRAS.map((item) => item.categoria)))
}

export function buscarPorCategoria(categoria: Categoria): Palavra[] {
  return PALAVRAS.filter((item) => item.categoria === categoria)
}

export function buscarPorDificuldade(dificuldade: Dificuldade): Palavra[] {
  return PALAVRAS.filter((item) => calcularDificuldade(item.palavra) === dificuldade)
}

export function buscarPorCategoriaEDificuldade(
  categoria: Categoria,
  dificuldade: Dificuldade,
): Palavra[] {
  return PALAVRAS.filter(
    (item) =>
      item.categoria === categoria && calcularDificuldade(item.palavra) === dificuldade,
  )
}

export function sortearPalavra(categoria?: Categoria, dificuldade?: Dificuldade): Palavra {
  let candidatas = PALAVRAS

  if (categoria) {
    candidatas = candidatas.filter((item) => item.categoria === categoria)
  }

  if (dificuldade) {
    candidatas = candidatas.filter(
      (item) => calcularDificuldade(item.palavra) === dificuldade,
    )
  }

  if (candidatas.length === 0) {
    candidatas = PALAVRAS
  }

  const indice = Math.floor(Math.random() * candidatas.length)
  return candidatas[indice]
}
