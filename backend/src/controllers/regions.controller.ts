import { Request, Response } from 'express';
import { regionsService } from '../services/regions.service';
import { asyncHandler } from '../utils/asyncHandler';

/**
 * Get all regions
 * GET /api/v1/regions
 */
export const getRegions = asyncHandler(async (req: Request, res: Response) => {
  const { type, parentId, search } = req.query;

  const regions = await regionsService.findAll({
    type: type as string,
    parentId: parentId as string,
    search: search as string,
  });

  res.status(200).json({
    success: true,
    data: regions,
  });
});

/**
 * Get region by ID
 * GET /api/v1/regions/:id
 */
export const getRegionById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const region = await regionsService.findById(id);

    res.status(200).json({
      success: true,
      data: region,
    });
  },
);

/**
 * Get region hierarchy
 * GET /api/v1/regions/hierarchy
 */
export const getRegionHierarchy = asyncHandler(
  async (_req: Request, res: Response) => {
    const hierarchy = await regionsService.getHierarchy();

    res.status(200).json({
      success: true,
      data: hierarchy,
    });
  },
);

