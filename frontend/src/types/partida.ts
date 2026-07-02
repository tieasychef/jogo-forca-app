export interface Partida {
  id: string;
  usuarioId: string;
  palavra: string;
  categoria: string;
  resultado: 'VITORIA' | 'DERROTA';
  tentativas: number;
  erros: number;
  tempoPartida: number;
  pontosGanhos: number;
  createdAt: string;
}
