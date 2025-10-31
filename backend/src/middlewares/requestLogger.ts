import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

/**
 * Request logging middleware
 * Logs all incoming HTTP requests with method and URL
 */
export function requestLogger(
  req: Request,
  _res: Response,
  next: NextFunction,
): void {
  logger.http(`${req.method} ${req.originalUrl}`, {
    ip: req.ip,
    userAgent: req.get('user-agent'),
  });
  next();
}