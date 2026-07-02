import type { Request, Response } from 'express';
import { UsuarioService } from '../services/usuario.service';
import { PartidaService } from '../services/partida.service';

const usuarioService = new UsuarioService();
const partidaService = new PartidaService();

export const estatisticasController = {
  async obter(_req: Request, res: Response): Promise<void> {
    const [
      totalJogadores,
      totalPartidas,
      taxaVitoria,
      categoriaMaisJogada,
      palavraMaisSorteada,
      maiorPontuacao,
    ] = await Promise.all([
      usuarioService.totalJogadores(),
      partidaService.totalPartidas(),
      partidaService.taxaVitoria(),
      partidaService.categoriaMaisJogada(),
      partidaService.palavraMaisSorteada(),
      usuarioService.maiorPontuacao(),
    ]);

    res.json({
      totalJogadores,
      totalPartidas,
      taxaVitoria,
      categoriaMaisJogada,
      palavraMaisSorteada,
      maiorPontuacao,
    });
  },
};
