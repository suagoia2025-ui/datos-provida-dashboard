import { Request, Response } from 'express';
import { dataPointsService } from '../services/dataPoints.service';
import { asyncHandler } from '../utils/asyncHandler';

/**
 * Get all data points
 * GET /api/v1/data-points
 */
export const getDataPoints = asyncHandler(
  async (req: Request, res: Response) => {
    const { indicatorId, regionId, startDate, endDate, page, limit } = req.query;

    const result = await dataPointsService.findAll({
      indicatorId: indicatorId as string,
      regionId: regionId as string,
      startDate: startDate as string,
      endDate: endDate as string,
      page: page ? Number(page) : undefined,
      limit: limit ? Number(limit) : undefined,
    });

    res.status(200).json({
      success: true,
      data: result.data,
      pagination: result.pagination,
    });
  },
);

/**
 * Get data point by ID
 * GET /api/v1/data-points/:id
 */
export const getDataPointById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const dataPoint = await dataPointsService.findById(id);

    res.status(200).json({
      success: true,
      data: dataPoint,
    });
  },
);

