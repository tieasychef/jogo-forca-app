import { Router } from 'express';
import { rankingController } from '../controllers/ranking.controller';
import { asyncHandler } from '../middlewares/asyncHandler';
import { validate, paginationQuerySchema } from '../middlewares/validate';

export const rankingRoutes = Router();

rankingRoutes.get(
  '/',
  validate(paginationQuerySchema, 'query'),
  asyncHandler(rankingController.listar),
);
