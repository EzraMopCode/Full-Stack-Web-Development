'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error('App Router caught error:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center font-sans">
      <div className="w-16 h-16 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mb-6">
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>

      <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mb-2">Something went wrong</h2>
      <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md">
        We encountered an issue loading this page. Please try again.
      </p>

      <button
        onClick={() => reset()}
        className="px-8 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-full shadow-lg shadow-orange-600/30 transition-colors cursor-pointer"
      >
        Try Again
      </button>
    </div>
  );
}
