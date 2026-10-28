'use client';

import React from 'react';
import dynamic from 'next/dynamic';

/**
 * Exercise 1 Requirement: Sized placeholder component.
 * Exact same height (h-96 / 384px) as the real map to guarantee ZERO layout jump (CLS = 0.00).
 */
function MapPlaceholder() {
  return (
    <div
      className="w-full h-96 rounded-2xl bg-stone-100 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-800 flex flex-col items-center justify-center p-6 text-center animate-pulse"
      role="status"
      aria-label="Loading interactive delivery map"
    >
      <div className="w-12 h-12 rounded-full bg-amber-200 dark:bg-amber-900/50 flex items-center justify-center text-2xl mb-3">
        🗺️
      </div>
      <p className="text-sm font-bold text-stone-700 dark:text-stone-300">
        Loading Addis Ababa Courier Map...
      </p>
      <p className="text-xs text-stone-400 mt-1">
        SSR disabled · Reserving 384px height to prevent Cumulative Layout Shift
      </p>
    </div>
  );
}

/**
 * Exercise 1 & Requirement:
 * Map loaded as a dynamic component with ssr: false and an exact-sized placeholder.
 */
const DeliveryMapClient = dynamic(
  () => import('./DeliveryMapClient'),
  {
    ssr: false,
    loading: () => <MapPlaceholder />
  }
);

export default function DeliveryMap(props) {
  return <DeliveryMapClient {...props} />;
}
