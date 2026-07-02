import type { Prisma, PrismaClient, Partida } from '@prisma/client';
import { prisma } from '../lib/prisma';
import type { CreatePartidaDto } from '../dtos/partida.dto';

export class PartidaRepository {
  constructor(private readonly db: PrismaClient | Prisma.TransactionClient = prisma) {}

  create(data: CreatePartidaDto): Promise<Partida> {
    return this.db.partida.create({ data });
  }

  findByUsuario(usuarioId: string): Promise<Partida[]> {
    return this.db.partida.findMany({
      where: { usuarioId },
      orderBy: { createdAt: 'desc' },
    });
  }

  findAll(limit: number): Promise<Partida[]> {
    return this.db.partida.findMany({
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }

  count(): Promise<number> {
    return this.db.partida.count();
  }

  countVitorias(): Promise<number> {
    return this.db.partida.count({ where: { resultado: 'VITORIA' } });
  }

  categoriaMaisJogada(): Promise<{ categoria: string; total: number } | null> {
    return this.db.partida
      .groupBy({
        by: ['categoria'],
        _count: { categoria: true },
        orderBy: { _count: { categoria: 'desc' } },
        take: 1,
      })
      .then((rows) =>
        rows.length ? { categoria: rows[0].categoria, total: rows[0]._count.categoria } : null,
      );
  }

  palavraMaisSorteada(): Promise<{ palavra: string; total: number } | null> {
    return this.db.partida
      .groupBy({
        by: ['palavra'],
        _count: { palavra: true },
        orderBy: { _count: { palavra: 'desc' } },
        take: 1,
      })
      .then((rows) =>
        rows.length ? { palavra: rows[0].palavra, total: rows[0]._count.palavra } : null,
      );
  }
}
