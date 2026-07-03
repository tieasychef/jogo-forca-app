export interface Estatisticas {
  partidasJogadas: number
  vitorias: number
  derrotas: number
  sequenciaAtual: number
  maiorSequenciaVitorias: number
  melhorPontuacao: number
  totalPalavrasAcertadas: number
  partidasSemErro: number
  venceuModoDesafio: boolean
  venceuModoTempo: boolean
}

export const ESTATISTICAS_INICIAIS: Estatisticas = {
  partidasJogadas: 0,
  vitorias: 0,
  derrotas: 0,
  sequenciaAtual: 0,
  maiorSequenciaVitorias: 0,
  melhorPontuacao: 0,
  totalPalavrasAcertadas: 0,
  partidasSemErro: 0,
  venceuModoDesafio: false,
  venceuModoTempo: false,
}
