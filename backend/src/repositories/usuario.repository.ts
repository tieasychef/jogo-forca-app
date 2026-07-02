import type { Prisma, PrismaClient, Usuario } from '@prisma/client';
import { prisma } from '../lib/prisma';

export class UsuarioRepository {
  constructor(private readonly db: PrismaClient | Prisma.TransactionClient = prisma) {}

  create(nome: string): Promise<Usuario> {
    return this.db.usuario.create({ data: { nome } });
  }

  findById(id: string): Promise<Usuario | null> {
    return this.db.usuario.findUnique({ where: { id } });
  }

  findAll(): Promise<Usuario[]> {
    return this.db.usuario.findMany({ orderBy: { pontuacao: 'desc' } });
  }

  findRanking(limit: number): Promise<Usuario[]> {
    return this.db.usuario.findMany({
      orderBy: { pontuacao: 'desc' },
      take: limit,
    });
  }

  count(): Promise<number> {
    return this.db.usuario.count();
  }

  registrarResultadoPartida(
    usuarioId: string,
    params: { pontosGanhos: number; venceu: boolean },
  ): Promise<Usuario> {
    return this.db.usuario.update({
      where: { id: usuarioId },
      data: {
        pontuacao: { increment: params.pontosGanhos },
        partidas: { increment: 1 },
        vitorias: { increment: params.venceu ? 1 : 0 },
        derrotas: { increment: params.venceu ? 0 : 1 },
      },
    });
  }

  maiorPontuacao(): Promise<number> {
    return this.db.usuario
      .aggregate({ _max: { pontuacao: true } })
      .then((result) => result._max.pontuacao ?? 0);
  }
}
