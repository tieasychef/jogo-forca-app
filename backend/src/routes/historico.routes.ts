import { Router } from 'express';
import { historicoController } from '../controllers/historico.controller';
import { asyncHandler } from '../middlewares/asyncHandler';
import { validate, paginationQuerySchema } from '../middlewares/validate';

export const historicoRoutes = Router();

historicoRoutes.get(
  '/',
  validate(paginationQuerySchema, 'query'),
  asyncHandler(historicoController.listar),
);
