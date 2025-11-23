'use client';

import { useState, useEffect, useCallback } from 'react';
import { dashboardAPI } from '@/services/api';
import type { DashboardStats } from '@/types/dashboard.types';

/**
 * Custom hook to fetch and manage dashboard data
 */
export function useDashboardData() {
  const [data, setData] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Use real API call
      const stats = await dashboardAPI.getStats();
      setData(stats);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Error al cargar los datos',
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

