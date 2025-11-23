/**
 * Loading skeleton component for dashboard
 * Shows placeholder content while data is loading
 */
export function LoadingSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-gray-200 h-32 rounded-lg"></div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-200 h-64 rounded-lg"></div>
        <div className="bg-gray-200 h-64 rounded-lg"></div>
      </div>
    </div>
  );
}

