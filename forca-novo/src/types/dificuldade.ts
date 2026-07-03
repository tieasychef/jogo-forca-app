import type { Dificuldade } from './palavra'

export interface OpcaoDificuldade {
  valor: Dificuldade
  label: string
  descricao: string
}

export const OPCOES_DIFICULDADE: OpcaoDificuldade[] = [
  { valor: 'facil', label: 'Fácil', descricao: 'Palavras curtas' },
  { valor: 'medio', label: 'Médio', descricao: 'Palavras médias' },
  { valor: 'dificil', label: 'Difícil', descricao: 'Palavras longas' },
]
