import { CorsOptions } from 'cors';
import { env } from './env';

/**
 * CORS configuration
 * Allows requests from the configured frontend origin
 */
export const corsOptions: CorsOptions = {
  origin: env.CORS_ORIGIN,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
