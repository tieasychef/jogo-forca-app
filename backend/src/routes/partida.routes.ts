import { Router } from 'express';
import { partidaController } from '../controllers/partida.controller';
import { asyncHandler } from '../middlewares/asyncHandler';
import { validate, usuarioIdParamSchema } from '../middlewares/validate';
import { createPartidaSchema } from '../dtos/partida.dto';

export const partidaRoutes = Router();

partidaRoutes.post('/', validate(createPartidaSchema), asyncHandler(partidaController.registrar));
partidaRoutes.get(
  '/usuario/:usuarioId',
  validate(usuarioIdParamSchema, 'params'),
  asyncHandler(partidaController.historicoPorUsuario),
);
