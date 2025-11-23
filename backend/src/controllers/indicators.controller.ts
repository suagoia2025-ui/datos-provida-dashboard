import { Request, Response } from 'express';
import { indicatorsService } from '../services/indicators.service';
import { asyncHandler } from '../utils/asyncHandler';

/**
 * Get all indicators
 * GET /api/v1/indicators
 */
export const getIndicators = asyncHandler(async (req: Request, res: Response) => {
  const { category, search, page, limit } = req.query;

  const result = await indicatorsService.findAll({
    category: category as string,
    search: search as string,
    page: page ? Number(page) : undefined,
    limit: limit ? Number(limit) : undefined,
  });

  res.status(200).json({
    success: true,
    data: result.data,
    pagination: result.pagination,
  });
});

/**
 * Get indicator by ID
 * GET /api/v1/indicators/:id
 */
export const getIndicatorById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const indicator = await indicatorsService.findById(id);

    res.status(200).json({
      success: true,
      data: indicator,
    });
  },
);

