import { dataPointsRepository } from '../repositories/dataPoints.repository';
import { logger } from '../utils/logger';
import { AppError } from '../utils/AppError';

/**
 * Service for data points operations
 */
export class DataPointsService {
  /**
   * Get all data points
   */
  async findAll(params: {
    indicatorId?: string;
    regionId?: string;
    startDate?: string;
    endDate?: string;
    page?: number;
    limit?: number;
  }) {
    try {
      return await dataPointsRepository.findAll({
        indicatorId: params.indicatorId,
        regionId: params.regionId,
        startDate: params.startDate,
        endDate: params.endDate,
        page: params.page,
        limit: params.limit,
      });
    } catch (error) {
      logger.error('Error getting data points:', error);
      throw error;
    }
  }

  /**
   * Get data point by ID
   */
  async findById(id: string) {
    try {
      const dataPoint = await dataPointsRepository.findById(id);

      if (!dataPoint) {
        throw new AppError(404, `Data point with ID ${id} not found`, 'NOT_FOUND');
      }

      return dataPoint;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      logger.error('Error getting data point:', error);
      throw error;
    }
  }
}

export const dataPointsService = new DataPointsService();

