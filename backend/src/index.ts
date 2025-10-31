import 'dotenv/config';
import { createServer } from './server';
import { env } from './config/env';
import { logger } from './utils/logger';

/**
 * Entry point for the Express application
 * Initializes the server and starts listening on the configured port
 */
const startServer = (): void => {
  try {
    const server = createServer();
    server.listen(env.PORT, () => {
      logger.info(`🚀 Server listening on port ${env.PORT}`);
      logger.info(`📍 Environment: ${env.NODE_ENV}`);
      logger.info(`🌐 CORS enabled for: ${env.CORS_ORIGIN}`);
    });

    // Graceful shutdown
    process.on('SIGTERM', () => {
      logger.info('SIGTERM signal received: closing HTTP server');
      server.close(() => {
        logger.info('HTTP server closed');
        process.exit(0);
      });
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();