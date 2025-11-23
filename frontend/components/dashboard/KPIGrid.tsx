'use client';

import { KPICard } from './KPICard';
import { useKPIs } from '@/hooks/useKPIs';
import type { DashboardStats } from '@/types/dashboard.types';

interface KPIGridProps {
  stats: DashboardStats;
}

/**
 * Grid component displaying 4 KPI cards
 */
export function KPIGrid({ stats }: KPIGridProps) {
  const kpis = useKPIs(stats);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpis.map((kpi) => (
        <KPICard key={kpi.id} kpi={kpi} />
      ))}
    </div>
  );
}

