import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { AppError } from '../utils/AppError';

/**
 * Validation middleware factory
 * Validates request body, query, or params using Zod schemas
 *
 * @param schema - Zod schema to validate against
 * @param source - Where to validate from: 'body', 'query', or 'params'
 * @returns Express middleware function
 *
 * @example
 * router.post('/users', validate(userSchema, 'body'), createUser)
 */
export const validate =
  (schema: ZodSchema, source: 'body' | 'query' | 'params' = 'body') =>
  (req: Request, _res: Response, next: NextFunction): void => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const dataToValidate = req[source];
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const validated = schema.parse(dataToValidate);

      // Replace original data with validated (transformed) data
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      req[source] = validated as never;

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        }));

        const errorMessage =
          errors.length > 0
            ? errors.map((e) => `${e.field}: ${e.message}`).join(', ')
            : 'Validation error';

        next(
          new AppError(400, errorMessage, 'VALIDATION_ERROR'),
        );
      } else {
        next(error);
      }
    }
  };

