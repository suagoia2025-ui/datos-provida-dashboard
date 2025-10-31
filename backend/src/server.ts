import http from 'http';
import app from './app';

export function createServer(): http.Server {
  return http.createServer(app);
}