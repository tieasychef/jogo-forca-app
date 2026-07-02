import type { NextFunction, Request, Response } from 'express';
import { Prisma } from '@prisma/client';
import { UsuarioNotFoundError } from '../services/usuario.service';

export function notFoundHandler(_req: Request, res: Response): void {
  res.status(404).json({ error: 'Rota nao encontrada' });
}

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  if (err instanceof UsuarioNotFoundError) {
    res.status(404).json({ error: err.message });
    return;
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2025') {
      res.status(404).json({ error: 'Registro nao encontrado' });
      return;
    }
    if (err.code === 'P2003') {
      res.status(400).json({ error: 'Referencia invalida (chave estrangeira)' });
      return;
    }
  }

  console.error(err);
  res.status(500).json({ error: 'Erro interno do servidor' });
}
