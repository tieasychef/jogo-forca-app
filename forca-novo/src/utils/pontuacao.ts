export const PONTOS_ACERTO = 10
export const PONTOS_ERRO = 5
export const PONTOS_VITORIA = 100
export const BONUS_POR_COMBO = 2

export function calcularGanhoPorAcerto(comboAtual: number): number {
  return PONTOS_ACERTO + comboAtual * BONUS_POR_COMBO
}
