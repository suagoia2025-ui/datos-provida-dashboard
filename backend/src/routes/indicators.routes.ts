import { Router } from 'express';
import { getIndicators, getIndicatorById } from '../controllers/indicators.controller';

const router = Router();

/**
 * @route   GET /api/v1/indicators
 * @desc    Get all indicators
 * @access  Public
 */
router.get('/', getIndicators);

/**
 * @route   GET /api/v1/indicators/:id
 * @desc    Get indicator by ID
 * @access  Public
 */
router.get('/:id', getIndicatorById);

export default router;

