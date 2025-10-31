import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import { env } from '../config/env';

/**
 * Health check controller
 * Returns server status, uptime, and environment information
 */
export const healthCheck = asyncHandler(
  (_req: Request, res: Response): void => {
    res.json({
      success: true,
      data: {
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: Math.floor(process.uptime()),
        environment: env.NODE_ENV,
      },
    });
  },
);