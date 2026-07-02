import { Router } from 'express';
import { usuarioController } from '../controllers/usuario.controller';
import { asyncHandler } from '../middlewares/asyncHandler';
import { validate, uuidParamSchema } from '../middlewares/validate';
import { createUsuarioSchema } from '../dtos/usuario.dto';

export const usuarioRoutes = Router();

usuarioRoutes.post('/', validate(createUsuarioSchema), asyncHandler(usuarioController.criar));
usuarioRoutes.get(
  '/:id',
  validate(uuidParamSchema, 'params'),
  asyncHandler(usuarioController.buscarPorId),
);
