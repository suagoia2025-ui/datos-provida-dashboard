import { prisma } from '../config/database';
import type { Prisma } from '@prisma/client';

/**
 * Repository for data points operations
 */
export class DataPointsRepository {
  /**
   * Get data points with filters
   */
  async findAll(params: {
    indicatorId?: string;
    regionId?: string;
    startDate?: string;
    endDate?: string;
    page?: number;
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
        where.date.lte = new Date(params.endDate);
      }
    }

    const page = params.page || 1;
    const limit = params.limit || 50;
    const skip = (page - 1) * limit;

    const [dataPoints, total] = await Promise.all([
      prisma.dataPoint.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          date: 'desc',
        },
        include: {
          indicator: {
            select: {
              id: true,
              name: true,
              category: true,
              unit: true,
            },
          },
          region: {
            select: {
              id: true,
              name: true,
              code: true,
              type: true,
            },
          },
          source: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      }),
      prisma.dataPoint.count({ where }),
    ]);

    return {
      data: dataPoints,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Get data point by ID
   */
  async findById(id: string) {
    return prisma.dataPoint.findUnique({
      where: { id },
      include: {
        indicator: true,
        region: true,
        source: true,
      },
    });
  }
}

export const dataPointsRepository = new DataPointsRepository();

