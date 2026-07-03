import type { Categoria, Dificuldade } from './palavra'

export interface EntradaRanking {
  nome: string
  pontuacao: number
  categoria: Categoria
  dificuldade: Dificuldade
  data: string
}

export const TAMANHO_MAXIMO_RANKING = 10
