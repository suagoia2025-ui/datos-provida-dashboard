'use client';

/**
 * Header component for the dashboard
 */
export function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Dashboard Pro-Vida
            </h1>
            <p className="text-gray-600 mt-1">
              Datos estadísticos en tiempo real
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              ● En vivo
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

