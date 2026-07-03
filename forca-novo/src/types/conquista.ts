import type { Estatisticas } from './estatisticas'

export interface Conquista {
  id: string
  titulo: string
  descricao: string
  icone: string
  condicao: (estatisticas: Estatisticas) => boolean
}

export const CONQUISTAS: Conquista[] = [
  {
    id: 'dez-vitorias',
    titulo: '10 Vitórias',
    descricao: 'Vença 10 partidas',
    icone: '🏅',
    condicao: (e) => e.vitorias >= 10,
  },
  {
    id: 'cem-palavras',
    titulo: 'Vocabulário Vasto',
    descricao: 'Acerte 100 palavras',
    icone: '📚',
    condicao: (e) => e.totalPalavrasAcertadas >= 100,
  },
  {
    id: 'vinte-partidas',
    titulo: 'Veterano',
    descricao: 'Jogue 20 partidas',
    icone: '🎮',
    condicao: (e) => e.partidasJogadas >= 20,
  },
  {
    id: 'sem-erro',
    titulo: 'Perfeição',
    descricao: 'Vença sem errar nenhuma letra',
    icone: '💎',
    condicao: (e) => e.partidasSemErro >= 1,
  },
  {
    id: 'sequencia-cinco',
    titulo: 'Imparável',
    descricao: 'Vença 5 partidas seguidas',
    icone: '🔥',
    condicao: (e) => e.maiorSequenciaVitorias >= 5,
  },
  {
    id: 'quinhentos-pontos',
    titulo: 'Pontuador',
    descricao: 'Faça mais de 500 pontos em uma partida',
    icone: '⭐',
    condicao: (e) => e.melhorPontuacao >= 500,
  },
  {
    id: 'vitoria-desafio',
    titulo: 'Sem Medo',
    descricao: 'Vença no modo Desafio',
    icone: '🦁',
    condicao: (e) => e.venceuModoDesafio,
  },
  {
    id: 'vitoria-tempo',
    titulo: 'Contra o Relógio',
    descricao: 'Vença no modo Contra o Tempo',
    icone: '⏰',
    condicao: (e) => e.venceuModoTempo,
  },
]
