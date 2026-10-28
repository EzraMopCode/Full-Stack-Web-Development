'use client';

import { AlertCircleIcon } from '@/components/Icons';

export default function ClinicDashboardError({ error, reset }) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-red-100 dark:border-red-950/40 shadow-sm max-w-lg mx-auto space-y-4">
      <div className="w-16 h-16 rounded-2xl bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center mx-auto">
        <AlertCircleIcon className="w-8 h-8" />
      </div>
      <h2 className="text-xl font-bold text-red-600 dark:text-red-400">
        Clinical Analytics Ledger Error
      </h2>
      <p className="text-xs text-slate-500 leading-relaxed">
        {error?.message || 'An error occurred while compiling clinical analytics summaries.'}
      </p>
      <div className="pt-2 flex items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="min-h-[44px] px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
        >
          Retry Ledger Sync
        </button>
        <a
          href="/clinic/dashboard"
          className="min-h-[44px] px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-xl transition-colors flex items-center"
        >
          Reset State
        </a>
      </div>
    </div>
  );
}
