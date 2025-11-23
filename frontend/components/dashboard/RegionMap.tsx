'use client';

import type { RegionData } from '@/types/dashboard.types';

interface RegionMapProps {
  data: RegionData[];
}

/**
 * Basic region map component
 * TODO: Implement interactive map with react-simple-maps or similar
 */
export function RegionMap({ data }: RegionMapProps) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Distribución Geográfica
        </h2>
        <p className="text-gray-600 text-center py-12">
          Mapa interactivo próximamente
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">
        Distribución Geográfica
      </h2>
      <div className="space-y-2">
        {data.slice(0, 10).map((region, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <span className="font-medium text-gray-900">{region.region}</span>
            <span className="text-sm text-gray-600">
              {region.dataPoints} datos
            </span>
          </div>
        ))}
      </div>
      <p className="text-sm text-gray-500 mt-4 text-center">
        Mapa interactivo en desarrollo
      </p>
    </div>
  );
}

