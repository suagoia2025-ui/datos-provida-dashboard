import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';

/**
 * 404 Not Found middleware
 * Handles requests to non-existent routes
 */
export function notFound(
  _req: Request,
  _res: Response,
  next: NextFunction,
): void {
  next(new AppError(404, 'Resource not found', 'NOT_FOUND'));
}