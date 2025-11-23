'use client';

import { AlertCircle } from 'lucide-react';

interface ErrorBoundaryProps {
  error: string;
  retry?: () => void;
}

/**
 * Error boundary component to display errors gracefully
 */
export function ErrorBoundary({ error, retry }: ErrorBoundaryProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
      <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Error al cargar datos
      </h2>
      <p className="text-gray-600 mb-6 text-center max-w-md">{error}</p>
      {retry && (
        <button
          onClick={retry}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Reintentar
        </button>
      )}
    </div>
  );
}

