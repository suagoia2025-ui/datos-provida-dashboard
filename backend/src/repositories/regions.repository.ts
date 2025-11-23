import { prisma } from '../config/database';
import type { Prisma, RegionType } from '@prisma/client';

/**
 * Repository for regions operations
 */
export class RegionsRepository {
  /**
   * Get all regions with optional filters
   */
  async findAll(params: {
    type?: string;
    parentId?: string;
    search?: string;
  }) {
    const where: Prisma.RegionWhereInput = {};

    if (params.type) {
      where.type = params.type as RegionType;
    }

    if (params.parentId) {
      where.parentId = params.parentId;
    }

    if (params.search) {
      where.OR = [
        { name: { contains: params.search, mode: 'insensitive' } },
        { code: { contains: params.search, mode: 'insensitive' } },
      ];
    }

    const regions = await prisma.region.findMany({
      where,
      orderBy: [
        { type: 'asc' },
        { name: 'asc' },
      ],
      include: {
        parent: {
          select: {
            id: true,
            name: true,
            type: true,
          },
        },
        _count: {
          select: {
            dataPoints: true,
            children: true,
          },
        },
      },
    });

    return regions;
  }

  /**
   * Get region by ID
   */
  async findById(id: string) {
    return prisma.region.findUnique({
      where: { id },
      include: {
        parent: {
          select: {
            id: true,
            name: true,
            type: true,
          },
        },
        children: {
          select: {
            id: true,
            name: true,
            type: true,
            code: true,
          },
        },
        _count: {
          select: {
            dataPoints: true,
          },
        },
      },
    });
  }

  /**
   * Get region hierarchy (tree structure)
   */
  async getHierarchy() {
    const global = await prisma.region.findFirst({
      where: { type: 'global' },
      include: {
        children: {
          include: {
            children: {
              include: {
                _count: {
                  select: {
                    dataPoints: true,
                  },
                },
              },
            },
            _count: {
              select: {
                dataPoints: true,
              },
            },
          },
        },
        _count: {
          select: {
            dataPoints: true,
          },
        },
      },
    });

    return global;
  }
}

export const regionsRepository = new RegionsRepository();

