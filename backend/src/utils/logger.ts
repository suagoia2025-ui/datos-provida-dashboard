import { createLogger, transports, format } from 'winston';
import { env } from '../config/env';

/**
 * Winston logger configuration
 * Provides structured logging with different levels and transports
 */
export const logger = createLogger({
  level: env.LOG_LEVEL,
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    format.splat(),
    format.json(),
  ),
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.printf(
          ({ timestamp, level, message, ...metadata }) =>
            `${timestamp} [${level}]: ${message} ${
              Object.keys(metadata).length ? JSON.stringify(metadata, null, 2) : ''
            }`,
        ),
      ),
    }),
  ],
  // Log only errors in production, everything in development
  silent: env.NODE_ENV === 'test',
});