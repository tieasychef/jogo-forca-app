import { Router } from 'express';
import { estatisticasController } from '../controllers/estatisticas.controller';
import { asyncHandler } from '../middlewares/asyncHandler';

export const estatisticasRoutes = Router();

estatisticasRoutes.get('/', asyncHandler(estatisticasController.obter));
