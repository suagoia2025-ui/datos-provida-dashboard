import { Router } from 'express';
import {
  getRegions,
  getRegionById,
  getRegionHierarchy,
} from '../controllers/regions.controller';

const router = Router();

/**
 * @route   GET /api/v1/regions
 * @desc    Get all regions
 * @access  Public
 */
router.get('/', getRegions);

/**
 * @route   GET /api/v1/regions/hierarchy
 * @desc    Get region hierarchy (tree structure)
 * @access  Public
 */
router.get('/hierarchy', getRegionHierarchy);

/**
 * @route   GET /api/v1/regions/:id
 * @desc    Get region by ID
 * @access  Public
 */
router.get('/:id', getRegionById);

export default router;

