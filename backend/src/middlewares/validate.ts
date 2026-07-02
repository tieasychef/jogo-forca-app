import type { NextFunction, Request, RequestHandler, Response } from 'express';
import { z, ZodSchema } from 'zod';

type ValidationTarget = 'body' | 'params' | 'query';

export function validate(schema: ZodSchema, target: ValidationTarget = 'body'): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[target]);
    if (!result.success) {
      res.status(400).json({
        error: 'Dados invalidos',
        issues: result.error.issues.map((issue) => ({
          path: issue.path.join('.'),
          message: issue.message,
        })),
      });
      return;
    }
    req[target] = result.data;
    next();
  };
}

export const uuidParamSchema = z.object({
  id: z.string().uuid('id deve ser um UUID valido'),
});

export const usuarioIdParamSchema = z.object({
  usuarioId: z.string().uuid('usuarioId deve ser um UUID valido'),
});

export const paginationQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(200).optional(),
});
