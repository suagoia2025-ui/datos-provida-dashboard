import { z } from 'zod';

/**
 * Environment variables schema validation using Zod
 * Fails fast if required environment variables are missing or invalid
 */
const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z
    .string()
    .default('4000')
    .transform((val) => parseInt(val, 10)),
  DATABASE_URL: z.string().url('DATABASE_URL must be a valid URL'),
  CORS_ORIGIN: z
    .string()
    .url('CORS_ORIGIN must be a valid URL')
    .default('http://localhost:3000'),
  LOG_LEVEL: z
    .enum(['error', 'warn', 'info', 'http', 'debug'])
    .default('info'),
});

/**
 * Validated environment variables
 * Throws error if validation fails
 */
export const env = envSchema.parse(process.env);