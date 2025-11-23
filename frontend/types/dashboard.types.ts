/**
 * Types for dashboard components and data
 */

/**
 * Key Performance Indicator card data
 */
export interface KPI {
  id: string;
  title: string;
  value: string | number;
  change?: number;
  changeType?: 'increase' | 'decrease' | 'neutral';
  icon: string;
  color: string;
}

/**
 * Category distribution data
 */
export interface CategoryData {
  category: string;
  count: number;
  percentage: number;
}

/**
 * Time series data point
 */
export interface TimeSeriesData {
  date: string;
  value: number;
  category: string;
}

/**
 * Region data with statistics
 */
export interface RegionData {
  region: string;
  country?: string;
  value: number;
  dataPoints: number;
}

/**
 * Complete dashboard statistics
 */
export interface DashboardStats {
  totalCountries: number;
  totalIndicators: number;
  totalDataPoints: number;
  lastUpdate: string;
  categoriesDistribution: CategoryData[];
  timeSeriesData: TimeSeriesData[];
  topRegions: RegionData[];
}

