/**
 * API-specific type definitions
 * Types for request/response payloads
 */

/**
 * Query parameters for paginated endpoints
 */
export interface PaginationQuery {
  page?: string;
  limit?: string;
}

/**
 * Date range query parameters
 */
export interface DateRangeQuery {
  startDate?: string;
  endDate?: string;
}

/**
 * Sort order
 */
export type SortOrder = 'asc' | 'desc';

/**
 * Sort query parameters
 */
export interface SortQuery {
  sortBy?: string;
  sortOrder?: SortOrder;
}

