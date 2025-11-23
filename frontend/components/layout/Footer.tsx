'use client';

/**
 * Footer component for the dashboard
 */
export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center text-gray-600 text-sm">
          <p>Dashboard Pro-Vida • Datos actualizados en tiempo real</p>
          <p className="mt-2 text-xs text-gray-500">
            Fuentes: WHO, World Bank, UN Data, PubMed, Data.gov
          </p>
        </div>
      </div>
    </footer>
  );
}

