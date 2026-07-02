import { z } from 'zod';
import type { Partida, ResultadoPartida } from '@prisma/client';

export const createPartidaSchema = z.object({
  usuarioId: z.string().uuid(),
  palavra: z.string().trim().min(1).max(60),
  categoria: z.string().trim().min(1).max(60),
  resultado: z.enum(['VITORIA', 'DERROTA']),
  tentativas: z.number().int().min(0),
  erros: z.number().int().min(0),
  tempoPartida: z.number().int().min(0),
  pontosGanhos: z.number().int().min(0),
});

export type CreatePartidaDto = z.infer<typeof createPartidaSchema>;

export interface PartidaResponseDto {
  id: string;
  usuarioId: string;
  palavra: string;
  categoria: string;
  resultado: ResultadoPartida;
  tentativas: number;
  erros: number;
  tempoPartida: number;
  pontosGanhos: number;
  createdAt: Date;
}

export function toPartidaResponseDto(partida: Partida): PartidaResponseDto {
  return {
    id: partida.id,
    usuarioId: partida.usuarioId,
    palavra: partida.palavra,
    categoria: partida.categoria,
    resultado: partida.resultado,
    tentativas: partida.tentativas,
    erros: partida.erros,
    tempoPartida: partida.tempoPartida,
    pontosGanhos: partida.pontosGanhos,
    createdAt: partida.createdAt,
  };
}
