import { Router } from 'express';
import healthRoutes from './health.routes';
import dashboardRoutes from './dashboard.routes';
import indicatorsRoutes from './indicators.routes';
import regionsRoutes from './regions.routes';
import dataPointsRoutes from './dataPoints.routes';

const router = Router();

// Health check routes
router.use('/health', healthRoutes);

// Dashboard routes
router.use('/dashboard', dashboardRoutes);

// Indicators routes
router.use('/indicators', indicatorsRoutes);

// Regions routes
router.use('/regions', regionsRoutes);

// Data points routes
router.use('/data-points', dataPointsRoutes);

export default router;