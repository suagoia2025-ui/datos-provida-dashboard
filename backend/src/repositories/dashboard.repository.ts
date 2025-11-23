import { prisma } from '../config/database';
import { logger } from '../utils/logger';
import type { Prisma } from '@prisma/client';

/**
 * Repository for dashboard statistics and aggregations
 */
export class DashboardRepository {
  /**
   * Get dashboard statistics (KPIs)
   */
  async getStats() {
    try {
      // Execute queries sequentially to avoid potential issues
      const totalCountries = await prisma.region.count({
        where: { type: 'country' },
      });

      const totalIndicators = await prisma.indicator.count();

      const totalDataPoints = await prisma.dataPoint.count();

      // Get categories distribution - use findMany instead of groupBy
      const allIndicators = await prisma.indicator.findMany({
        select: {
          category: true,
        },
      });

      // Count by category manually
      const categoryCounts = allIndicators.reduce(
        (acc, indicator) => {
          const cat = indicator.category;
          acc[cat] = (acc[cat] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>,
      );

      const categories = Object.entries(categoryCounts).map(([category, count]) => ({
        category,
        count,
        percentage: 0, // Will be calculated in service
      }));

      // Get last update
      const lastUpdateRecord = await prisma.dataPoint.findFirst({
        orderBy: { createdAt: 'desc' },
        select: { createdAt: true },
      });

      return {
        totalCountries,
        totalIndicators,
        totalDataPoints,
        categoriesDistribution: categories,
        lastUpdate:
          lastUpdateRecord?.createdAt.toISOString() || new Date().toISOString(),
      };
    } catch (error) {
      logger.error('Error in getStats:', error);
      // Return default values on error
      return {
        totalCountries: 0,
        totalIndicators: 0,
        totalDataPoints: 0,
        categoriesDistribution: [],
        lastUpdate: new Date().toISOString(),
      };
    }
  }

  /**
   * Get indicators grouped by category
   */
  async getIndicatorsByCategory() {
    const indicators = await prisma.indicator.findMany({
      select: {
        id: true,
        name: true,
        category: true,
        unit: true,
        description: true,
      },
      orderBy: {
        category: 'asc',
      },
    });

    // Group by category
    const grouped = indicators.reduce(
      (acc, indicator) => {
        const category = indicator.category;
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(indicator);
        return acc;
      },
      {} as Record<string, typeof indicators>,
    );

    return grouped;
  }

  /**
   * Get time series data for an indicator and region
   */
  async getTimeSeriesData(params: {
    indicatorId?: string;
    regionId?: string;
    startDate?: Date;
    endDate?: Date;
    limit?: number;
  }) {
    const where: Prisma.DataPointWhereInput = {};

    if (params.indicatorId) {
      where.indicatorId = params.indicatorId;
    }

    if (params.regionId) {
      where.regionId = params.regionId;
    }

    if (params.startDate || params.endDate) {
      where.date = {};
      if (params.startDate) {
        where.date.gte = params.startDate;
      }
      if (params.endDate) {
        where.date.lte = params.endDate;
      }
    }

    const dataPoints = await prisma.dataPoint.findMany({
      where,
      select: {
        date: true,
        value: true,
        indicator: {
          select: {
            category: true,
            name: true,
          },
        },
      },
      orderBy: {
        date: 'asc',
      },
      take: params.limit || 1000,
    });

    return dataPoints.map((dp) => ({
      date: dp.date.toISOString().split('T')[0], // Format as YYYY-MM-DD
      value: dp.value,
      category: dp.indicator.category,
      indicatorName: dp.indicator.name,
    }));
  }

  /**
   * Get top regions by data points count
   * Simplified version to avoid crashes
   */
  async getTopRegions(limit: number = 10) {
    try {
      // Get a sample of countries (limit to avoid too many queries)
      const countries = await prisma.region.findMany({
        where: {
          type: 'country',
        },
        select: {
          id: true,
          name: true,
          code: true,
        },
        take: 30, // Limit initial query
      });

      // Get counts for each country (with error handling)
      const regionsWithCounts: Array<{
        id: string;
        name: string;
        code: string;
        dataPoints: number;
      }> = [];

      for (const country of countries) {
        try {
          const count = await prisma.dataPoint.count({
            where: { regionId: country.id },
          });
          if (count > 0) {
            // Only include regions with data
            regionsWithCounts.push({
              ...country,
              dataPoints: count,
            });
          }
        } catch (err) {
          // Skip on error, continue with next
          logger.warn(`Error counting data points for region ${country.id}:`, err);
          continue;
        }
      }

      // Sort and return top N
      return regionsWithCounts
        .sort((a, b) => b.dataPoints - a.dataPoints)
        .slice(0, limit)
        .map((region) => ({
          region: region.name,
          country: region.code,
          value: 0,
          dataPoints: region.dataPoints,
        }));
    } catch (error) {
      // Return empty array on any error to prevent crashes
      logger.error('Error in getTopRegions:', error);
      return [];
    }
  }
}

export const dashboardRepository = new DashboardRepository();
