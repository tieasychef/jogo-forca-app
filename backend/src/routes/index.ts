import { Router } from 'express';
import { usuarioRoutes } from './usuario.routes';
import { partidaRoutes } from './partida.routes';
import { rankingRoutes } from './ranking.routes';
import { historicoRoutes } from './historico.routes';
import { estatisticasRoutes } from './estatisticas.routes';

export const apiRouter = Router();

apiRouter.use('/usuarios', usuarioRoutes);
apiRouter.use('/partidas', partidaRoutes);
apiRouter.use('/ranking', rankingRoutes);
apiRouter.use('/historico', historicoRoutes);
apiRouter.use('/estatisticas', estatisticasRoutes);
