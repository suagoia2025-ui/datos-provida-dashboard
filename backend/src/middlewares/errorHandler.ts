import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';
import { logger } from '../utils/logger';
import { env } from '../config/env';

/**
 * Global error handling middleware
 * Captures all errors and returns consistent JSON responses
 */
export function errorHandler(
  err: Error | AppError,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  // Handle operational errors (AppError instances)
  if (err instanceof AppError) {
    logger.error('AppError:', {
      statusCode: err.statusCode,
      message: err.message,
      code: err.code,
    });

    res.status(err.statusCode).json({
      success: false,
      error: {
        message: err.message,
        code: err.code,
      },
    });
    return;
  }

  // Handle programming errors (unexpected errors)
  logger.error('Unexpected error:', {
    message: err.message,
    stack: err.stack,
    name: err.name,
  });

  const response: {
    success: false;
    error: {
      message: string;
      code: string;
      details?: unknown;
    };
  } = {
    success: false,
    error: {
      message: 'Internal Server Error',
      code: 'INTERNAL_ERROR',
    },
  };

  // Include stack trace in development
  if (env.NODE_ENV === 'development' && err.stack) {
    response.error.details = {
      stack: err.stack,
      name: err.name,
    };
  }

  res.status(500).json(response);
}