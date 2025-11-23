'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import type { CategoryData } from '@/types/dashboard.types';

interface CategoryChartProps {
  data: CategoryData[];
}

/**
 * Bar chart component showing indicators distribution by category
 */
export function CategoryChart({ data }: CategoryChartProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">
        Indicadores por Categoría
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="category"
            angle={-45}
            textAnchor="end"
            height={100}
            fontSize={12}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#3b82f6" name="Indicadores" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

