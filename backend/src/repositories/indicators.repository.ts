import { prisma } from '../config/database';
import type { Prisma, Category } from '@prisma/client';

/**
 * Repository for indicators operations
 */
export class IndicatorsRepository {
  /**
   * Get all indicators with optional filters
   */
  async findAll(params: {
    category?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) {
    const where: Prisma.IndicatorWhereInput = {};

    if (params.category) {
      where.category = params.category as Category;
    }

    if (params.search) {
      where.OR = [
        { name: { contains: params.search, mode: 'insensitive' } },
        { description: { contains: params.search, mode: 'insensitive' } },
      ];
    }

    const page = params.page || 1;
    const limit = params.limit || 20;
    const skip = (page - 1) * limit;

    const [indicators, total] = await Promise.all([
      prisma.indicator.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          name: 'asc',
        },
        include: {
          _count: {
            select: {
              dataPoints: true,
            },
          },
        },
      }),
      prisma.indicator.count({ where }),
    ]);

    return {
      data: indicators,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Get indicator by ID
   */
  async findById(id: string) {
    return prisma.indicator.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            dataPoints: true,
          },
        },
      },
    });
  }
}

export const indicatorsRepository = new IndicatorsRepository();

