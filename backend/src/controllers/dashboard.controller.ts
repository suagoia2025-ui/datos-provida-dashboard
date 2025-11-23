import { Request, Response } from 'express';
import { dashboardService } from '../services/dashboard.service';
import { asyncHandler } from '../utils/asyncHandler';

/**
 * Get dashboard statistics
 * GET /api/v1/dashboard/stats
 */
export const getStats = asyncHandler(async (_req: Request, res: Response) => {
  const stats = await dashboardService.getStats();

  res.status(200).json({
    success: true,
    data: stats,
  });
});

/**
 * Get indicators grouped by category
 * GET /api/v1/indicators/by-category
 */
export const getIndicatorsByCategory = asyncHandler(
  async (_req: Request, res: Response) => {
    const grouped = await dashboardService.getIndicatorsByCategory();

    res.status(200).json({
      success: true,
      data: grouped,
    });
  },
);

/**
 * Get time series data
 * GET /api/v1/data-points/time-series
 */
export const getTimeSeriesData = asyncHandler(
  async (req: Request, res: Response) => {
    const { indicatorId, regionId, startDate, endDate, limit } = req.query;

    const data = await dashboardService.getTimeSeriesData({
      indicatorId: indicatorId as string,
      regionId: regionId as string,
      startDate: startDate as string,
      endDate: endDate as string,
      limit: limit ? Number(limit) : undefined,
    });

    res.status(200).json({
      success: true,
      data,
    });
  },
);

