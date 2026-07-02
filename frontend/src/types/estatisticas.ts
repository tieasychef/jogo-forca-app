export interface Estatisticas {
  totalJogadores: number;
  totalPartidas: number;
  taxaVitoria: number;
  categoriaMaisJogada: { categoria: string; total: number } | null;
  palavraMaisSorteada: { palavra: string; total: number } | null;
  maiorPontuacao: number;
}
