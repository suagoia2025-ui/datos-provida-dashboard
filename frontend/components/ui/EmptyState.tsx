'use client';

import { Inbox } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  message?: string;
}

/**
 * Empty state component when no data is available
 */
export function EmptyState({
  title = 'No hay datos disponibles',
  message = 'No se encontraron datos para mostrar en este momento.',
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] p-8">
      <Inbox className="w-16 h-16 text-gray-400 mb-4" />
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-center max-w-md">{message}</p>
    </div>
  );
}

