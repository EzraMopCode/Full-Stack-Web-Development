import React from 'react';

/**
 * Exercise 7 Requirement:
 * Loading state for the dashboard demonstrating skeleton UI during server aggregation.
 */
export default function DashboardLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="pb-6 border-b border-stone-200 dark:border-stone-800 space-y-3">
        <div className="h-5 w-32 bg-stone-200 dark:bg-stone-800 rounded-full" />
        <div className="h-8 w-64 bg-stone-300 dark:bg-stone-700 rounded-lg" />
        <div className="h-4 w-96 bg-stone-200 dark:bg-stone-800 rounded" />
      </div>

      {/* KPI Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-28 bg-stone-100 dark:bg-stone-800/60 rounded-xl p-5 border border-stone-200 dark:border-stone-800" />
        ))}
      </div>

      {/* Charts Skeleton Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="h-80 bg-stone-100 dark:bg-stone-800/60 rounded-xl p-6 border border-stone-200 dark:border-stone-800" />
        <div className="h-80 bg-stone-100 dark:bg-stone-800/60 rounded-xl p-6 border border-stone-200 dark:border-stone-800" />
      </div>

      {/* Table Skeleton */}
      <div className="h-72 bg-stone-100 dark:bg-stone-800/60 rounded-xl border border-stone-200 dark:border-stone-800" />
    </div>
  );
}
