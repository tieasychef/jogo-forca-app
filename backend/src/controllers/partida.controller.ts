import type { Request, Response } from 'express';
import { PartidaService } from '../services/partida.service';
import type { CreatePartidaDto } from '../dtos/partida.dto';

const partidaService = new PartidaService();

export const partidaController = {
  async registrar(req: Request, res: Response): Promise<void> {
    const partida = await partidaService.registrar(req.body as CreatePartidaDto);
    res.status(201).json(partida);
  },

  async historicoPorUsuario(req: Request, res: Response): Promise<void> {
    const { usuarioId } = req.params as { usuarioId: string };
    const historico = await partidaService.historicoPorUsuario(usuarioId);
    res.json(historico);
  },
};
