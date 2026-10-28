'use client';

export default function GlobalError({ error, reset }) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center space-y-4">
      <span className="text-5xl">⚠️</span>
      <h2 className="text-xl font-bold text-slate-900 dark:text-white">
        Something went wrong
      </h2>
      <p className="text-xs text-slate-500 max-w-md">
        {error?.message || 'A clinical system error occurred. Please try again.'}
      </p>
      <div className="pt-2 flex items-center gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="min-h-[44px] px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
        >
          Try Again
        </button>
        <a
          href="/"
          className="min-h-[44px] px-5 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-xl flex items-center"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
}
