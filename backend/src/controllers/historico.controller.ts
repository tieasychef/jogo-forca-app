import type { Request, Response } from 'express';
import { PartidaService } from '../services/partida.service';

const partidaService = new PartidaService();

export const historicoController = {
  async listar(req: Request, res: Response): Promise<void> {
    const { limit } = req.query as { limit?: number };
    const historico = await partidaService.historicoGeral(limit ?? 50);
    res.json(historico);
  },
};
