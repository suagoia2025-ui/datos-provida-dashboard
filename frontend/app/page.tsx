'use client';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { KPIGrid } from '@/components/dashboard/KPIGrid';
import { CategoryChart } from '@/components/dashboard/CategoryChart';
import { TimeSeriesChart } from '@/components/dashboard/TimeSeriesChart';
import { RegionMap } from '@/components/dashboard/RegionMap';
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import { useDashboardData } from '@/hooks/useDashboardData';

/**
 * Main dashboard page
 * Displays KPIs, charts, and statistics about pro-life indicators
 */
export default function DashboardPage() {
  const { data, loading, error, refetch } = useDashboardData();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <LoadingSkeleton />
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ErrorBoundary error={error || 'Error desconocido'} retry={refetch} />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* KPIs Section */}
        <section className="mb-8">
          <KPIGrid stats={data} />
        </section>

        {/* Charts Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <CategoryChart data={data.categoriesDistribution} />
          {data.timeSeriesData.length > 0 ? (
            <TimeSeriesChart data={data.timeSeriesData} />
          ) : (
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Tendencia Temporal
              </h2>
              <p className="text-gray-600">
                Los datos temporales estarán disponibles cuando se conecte con
                la API
              </p>
            </div>
          )}
        </section>

        {/* Additional Sections */}
        {data.topRegions.length > 0 && (
          <section className="mb-8">
            <RegionMap data={data.topRegions} />
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
