import { regionsRepository } from '../repositories/regions.repository';
import { logger } from '../utils/logger';
import { AppError } from '../utils/AppError';

/**
 * Service for regions operations
 */
export class RegionsService {
  /**
   * Get all regions
   */
  async findAll(params: {
    type?: string;
    parentId?: string;
    search?: string;
  }) {
    try {
      return await regionsRepository.findAll(params);
    } catch (error) {
      logger.error('Error getting regions:', error);
      throw error;
    }
  }

  /**
   * Get region by ID
   */
  async findById(id: string) {
    try {
      const region = await regionsRepository.findById(id);

      if (!region) {
        throw new AppError(404, `Region with ID ${id} not found`, 'NOT_FOUND');
      }

      return region;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      logger.error('Error getting region:', error);
      throw error;
    }
  }

  /**
   * Get region hierarchy
   */
  async getHierarchy() {
    try {
      return await regionsRepository.getHierarchy();
    } catch (error) {
      logger.error('Error getting region hierarchy:', error);
      throw error;
    }
  }
}

export const regionsService = new RegionsService();

