import type { Request, Response } from 'express';
import { UsuarioService } from '../services/usuario.service';
import type { CreateUsuarioDto } from '../dtos/usuario.dto';

const usuarioService = new UsuarioService();

export const usuarioController = {
  async criar(req: Request, res: Response): Promise<void> {
    const { nome } = req.body as CreateUsuarioDto;
    const usuario = await usuarioService.criar(nome);
    res.status(201).json(usuario);
  },

  async buscarPorId(req: Request, res: Response): Promise<void> {
    const { id } = req.params as { id: string };
    const usuario = await usuarioService.buscarPorId(id);
    res.json(usuario);
  },
};
