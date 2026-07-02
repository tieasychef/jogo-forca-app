import { z } from 'zod';
import type { Usuario } from '@prisma/client';

export const createUsuarioSchema = z.object({
  nome: z.string().trim().min(2, 'Nome deve ter ao menos 2 caracteres').max(60),
});

export type CreateUsuarioDto = z.infer<typeof createUsuarioSchema>;

export interface UsuarioResponseDto {
  id: string;
  nome: string;
  pontuacao: number;
  partidas: number;
  vitorias: number;
  derrotas: number;
  createdAt: Date;
  updatedAt: Date;
}

export function toUsuarioResponseDto(usuario: Usuario): UsuarioResponseDto {
  return {
    id: usuario.id,
    nome: usuario.nome,
    pontuacao: usuario.pontuacao,
    partidas: usuario.partidas,
    vitorias: usuario.vitorias,
    derrotas: usuario.derrotas,
    createdAt: usuario.createdAt,
    updatedAt: usuario.updatedAt,
  };
}
