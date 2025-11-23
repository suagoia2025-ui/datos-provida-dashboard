import axios, { AxiosInstance } from 'axios';
import type { DashboardStats } from '@/types/dashboard.types';

const API_BASE_URL =
  process.env['NEXT_PUBLIC_API_URL'] || 'http://localhost:4000/api/v1';

let client: AxiosInstance | null = null;

/**
 * Get or create API client instance
 */
export function getApiClient(): AxiosInstance {
  if (client) return client;

  client = axios.create({
    baseURL: API_BASE_URL,
    timeout: 15000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Response interceptor for error handling
  client.interceptors.response.use(
    (response) => response,
    (error) => {
      // Only log in development
      if (process.env['NODE_ENV'] === 'development') {
        console.error('API Error:', error.response?.data || error.message);
      }
      return Promise.reject(error);
    },
  );

  return client;
}

/**
 * Dashboard API methods
 */
export const dashboardAPI = {
  /**
   * Health check endpoint
   */
  health: async () => {
    const apiClient = getApiClient();
    const response = await apiClient.get('/health');
    return response.data;
  },

  /**
   * Get dashboard statistics
   * TODO: Create this endpoint in backend
   */
  getStats: async (): Promise<DashboardStats> => {
    const apiClient = getApiClient();
    const response = await apiClient.get('/dashboard/stats');
    return response.data.data;
  },

  /**
   * Get indicators grouped by category
   * TODO: Create this endpoint in backend
   */
  getIndicatorsByCategory: async () => {
    const apiClient = getApiClient();
    const response = await apiClient.get('/indicators/by-category');
    return response.data.data;
  },

  /**
   * Get time series data
   * TODO: Create this endpoint in backend
   */
  getTimeSeriesData: async (params?: {
    startDate?: string;
    endDate?: string;
  }) => {
    const apiClient = getApiClient();
    const response = await apiClient.get('/data-points/time-series', {
      params,
    });
    return response.data.data;
  },
};

export default getApiClient();
