'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';

/**
 * Exercise 7 Requirement:
 * Demonstrable Error State for the dashboard with retry and recovery actions.
 */
export default function DashboardError({ error, reset }) {
  useEffect(() => {
    console.error('Dashboard Error Caught:', error);
  }, [error]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-6">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400 text-2xl font-black">
        !
      </div>
      
      <div className="space-y-2">
        <h2 className="text-2xl font-black text-stone-900 dark:text-stone-100">
          Failed to Load Analytics Dashboard
        </h2>
        <p className="text-sm text-stone-600 dark:text-stone-400 max-w-md mx-auto">
          {error?.message || 'An unexpected failure occurred while aggregating order analytics on the server.'}
        </p>
      </div>

      <div className="flex items-center justify-center gap-3 pt-2">
        <button
          onClick={() => reset()}
          className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500"
        >
          Try Aggregating Again
        </button>
        <Link
          href="/dashboard"
          className="px-4 py-2 border border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 rounded-lg text-sm font-semibold transition-colors"
        >
          Reset to Populated State
        </Link>
      </div>
    </div>
  );
}
