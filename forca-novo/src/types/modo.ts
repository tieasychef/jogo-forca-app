export type ModoJogo = 'classico' | 'infinito' | 'tempo' | 'desafio'

export interface OpcaoModo {
  valor: ModoJogo
  label: string
  descricao: string
  icone: string
}

export const OPCOES_MODO: OpcaoModo[] = [
  { valor: 'classico', label: 'Clássico', descricao: 'Uma palavra por partida', icone: '🎯' },
  { valor: 'infinito', label: 'Infinito', descricao: 'Jogue até errar demais', icone: '♾️' },
  { valor: 'tempo', label: 'Contra o tempo', descricao: '60s por palavra', icone: '⏱️' },
  { valor: 'desafio', label: 'Desafio', descricao: 'Sem dicas', icone: '🔥' },
]

export const TEMPO_LIMITE_SEGUNDOS = 60
