import { Router } from 'express';
import {
  getDataPoints,
  getDataPointById,
} from '../controllers/dataPoints.controller';
import { getTimeSeriesData } from '../controllers/dashboard.controller';

const router = Router();

/**
 * @route   GET /api/v1/data-points
 * @desc    Get all data points
 * @access  Public
 */
router.get('/', getDataPoints);

/**
 * @route   GET /api/v1/data-points/time-series
 * @desc    Get time series data
 * @access  Public
 */
router.get('/time-series', getTimeSeriesData);

/**
 * @route   GET /api/v1/data-points/:id
 * @desc    Get data point by ID
 * @access  Public
 */
router.get('/:id', getDataPointById);

export default router;

