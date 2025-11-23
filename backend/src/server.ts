import http from 'http';
import app from './app';

/**
 * Creates and returns an HTTP server instance
 * @returns HTTP server configured with Express app
 */
export function createServer(): http.Server {
  return http.createServer(app);
}