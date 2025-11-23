import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import { corsOptions } from './config/cors';
import routes from './routes';
import { notFound } from './middlewares/notFound';
import { errorHandler } from './middlewares/errorHandler';
import { requestLogger } from './middlewares/requestLogger';

/**
 * Express application configuration
 * Sets up middleware stack in the correct order
 */
const app = express();

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors(corsOptions));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// HTTP request logging
app.use(morgan('dev'));

// Custom request logger
app.use(requestLogger);

// API routes
app.use('/api/v1', routes);

// 404 handler (must be before error handler)
app.use(notFound);

// Global error handler (must be last)
app.use(errorHandler);

export default app;

