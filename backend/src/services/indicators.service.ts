import { indicatorsRepository } from '../repositories/indicators.repository';
import { logger } from '../utils/logger';
import { AppError } from '../utils/AppError';

/**
 * Service for indicators operations
 */
export class IndicatorsService {
  /**
   * Get all indicators
   */
  async findAll(params: {
    category?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) {
    try {
      return await indicatorsRepository.findAll(params);
    } catch (error) {
      logger.error('Error getting indicators:', error);
      throw error;
    }
  }

  /**
   * Get indicator by ID
   */
  async findById(id: string) {
    try {
      const indicator = await indicatorsRepository.findById(id);

      if (!indicator) {
        throw new AppError(404, `Indicator with ID ${id} not found`, 'NOT_FOUND');
      }

      return indicator;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      logger.error('Error getting indicator:', error);
      throw error;
    }
  }
}

export const indicatorsService = new IndicatorsService();

