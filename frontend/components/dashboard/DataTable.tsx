'use client';

import type { RegionData } from '@/types/dashboard.types';

interface DataTableProps {
  data: RegionData[];
  title?: string;
}

/**
 * Data table component for displaying recent data points
 */
export function DataTable({ data, title = 'Datos Recientes' }: DataTableProps) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">{title}</h2>
        <p className="text-gray-600 text-center py-8">
          No hay datos disponibles
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6 overflow-x-auto">
      <h2 className="text-xl font-bold text-gray-900 mb-6">{title}</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Región
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              País
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Valor
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Puntos de Datos
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((region, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {region.region}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                {region.country || '-'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {region.value.toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                {region.dataPoints}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

