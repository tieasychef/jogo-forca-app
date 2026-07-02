import type { Request, Response } from 'express';
import { UsuarioService } from '../services/usuario.service';

const usuarioService = new UsuarioService();

export const rankingController = {
  async listar(req: Request, res: Response): Promise<void> {
    const { limit } = req.query as { limit?: number };
    const ranking = await usuarioService.listarRanking(limit ?? 20);
    res.json(ranking);
  },
};
