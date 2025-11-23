'use client';

import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { KPI } from '@/types/dashboard.types';

interface KPICardProps {
  kpi: KPI;
}

/**
 * Individual KPI card component
 * Displays a single metric with icon, value, and optional trend
 */
export function KPICard({ kpi }: KPICardProps) {
  const getTrendIcon = () => {
    if (!kpi.change) {
      return <Minus className="w-4 h-4 text-gray-400" />;
    }
    if (kpi.changeType === 'increase') {
      return <TrendingUp className="w-4 h-4 text-green-600" />;
    }
    if (kpi.changeType === 'decrease') {
      return <TrendingDown className="w-4 h-4 text-red-600" />;
    }
    return <Minus className="w-4 h-4 text-gray-400" />;
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${kpi.color}`}>
          <span className="text-2xl">{kpi.icon}</span>
        </div>
        {kpi.change !== undefined && (
          <div className="flex items-center gap-1">
            {getTrendIcon()}
            <span
              className={`text-sm font-medium ${
                kpi.changeType === 'increase'
                  ? 'text-green-600'
                  : kpi.changeType === 'decrease'
                    ? 'text-red-600'
                    : 'text-gray-400'
              }`}
            >
              {Math.abs(kpi.change)}%
            </span>
          </div>
        )}
      </div>
      <h3 className="text-gray-600 text-sm font-medium mb-1">{kpi.title}</h3>
      <p className="text-3xl font-bold text-gray-900">{kpi.value}</p>
    </div>
  );
}

