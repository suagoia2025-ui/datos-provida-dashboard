'use client';

import { useMemo } from 'react';
import type { KPI } from '@/types/dashboard.types';
import type { DashboardStats } from '@/types/dashboard.types';

/**
 * Custom hook to transform dashboard stats into KPI format
 */
export function useKPIs(stats: DashboardStats | null): KPI[] {
  return useMemo(() => {
    if (!stats) return [];

    return [
      {
        id: '1',
        title: 'Países con Datos',
        value: stats.totalCountries,
        icon: '🌍',
        color: 'bg-blue-100',
        change: 5,
        changeType: 'increase',
      },
      {
        id: '2',
        title: 'Indicadores Activos',
        value: stats.totalIndicators,
        icon: '📊',
        color: 'bg-green-100',
      },
      {
        id: '3',
        title: 'Puntos de Datos',
        value: stats.totalDataPoints.toLocaleString(),
        icon: '📈',
        color: 'bg-purple-100',
        change: 12,
        changeType: 'increase',
      },
      {
        id: '4',
        title: 'Última Actualización',
        value: new Date(stats.lastUpdate).toLocaleDateString('es-ES', {
          day: '2-digit',
          month: 'short',
        }),
        icon: '🕒',
        color: 'bg-orange-100',
      },
    ];
  }, [stats]);
}

