import { dashboardRepository } from '../repositories/dashboard.repository';
import { logger } from '../utils/logger';

/**
 * Service for dashboard operations
 */
export class DashboardService {
  /**
   * Get dashboard statistics
   */
  async getStats() {
    try {
      const stats = await dashboardRepository.getStats();

      // Calculate percentages for categories
      const totalIndicators = stats.totalIndicators;
      const categoriesWithPercentage = stats.categoriesDistribution.map((cat) => ({
        ...cat,
        percentage: totalIndicators > 0
          ? Number(((cat.count / totalIndicators) * 100).toFixed(1))
          : 0,
      }));

      // Get top regions
      const topRegions = await dashboardRepository.getTopRegions(10);

      return {
        totalCountries: stats.totalCountries,
        totalIndicators: stats.totalIndicators,
        totalDataPoints: stats.totalDataPoints,
        lastUpdate: stats.lastUpdate,
        categoriesDistribution: categoriesWithPercentage,
        timeSeriesData: [], // Will be populated when needed
        topRegions,
      };
    } catch (error) {
      logger.error('Error getting dashboard stats:', error);
      throw error;
    }
  }

  /**
   * Get indicators grouped by category
   */
  async getIndicatorsByCategory() {
    try {
      return await dashboardRepository.getIndicatorsByCategory();
    } catch (error) {
      logger.error('Error getting indicators by category:', error);
      throw error;
    }
  }

  /**
   * Get time series data
   */
  async getTimeSeriesData(params: {
    indicatorId?: string;
    regionId?: string;
    startDate?: string;
    endDate?: string;
    limit?: number;
  }) {
    try {
      const startDate = params.startDate ? new Date(params.startDate) : undefined;
      const endDate = params.endDate ? new Date(params.endDate) : undefined;

      return await dashboardRepository.getTimeSeriesData({
        indicatorId: params.indicatorId,
        regionId: params.regionId,
        startDate,
        endDate,
        limit: params.limit,
      });
    } catch (error) {
      logger.error('Error getting time series data:', error);
      throw error;
    }
  }
}

export const dashboardService = new DashboardService();

