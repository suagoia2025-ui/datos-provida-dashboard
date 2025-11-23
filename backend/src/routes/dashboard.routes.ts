import { Router } from 'express';
import {
  getStats,
  getIndicatorsByCategory,
} from '../controllers/dashboard.controller';

const router = Router();

/**
 * @route   GET /api/v1/dashboard/stats
 * @desc    Get dashboard statistics (KPIs)
 * @access  Public
 */
router.get('/stats', getStats);

/**
 * @route   GET /api/v1/dashboard/indicators/by-category
 * @desc    Get indicators grouped by category
 * @access  Public
 */
router.get('/indicators/by-category', getIndicatorsByCategory);

export default router;

