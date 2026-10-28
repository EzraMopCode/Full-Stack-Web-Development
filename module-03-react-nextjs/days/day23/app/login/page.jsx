'use client';

import { useActionState } from 'react';
import { useSearchParams } from 'next/navigation';
import { login } from '@/actions/authActions';

export default function LoginPage() {
  const searchParams = useSearchParams();
  const rawNext = searchParams.get('next') || '/orders';

  const [state, formAction, isPending] = useActionState(login, {
    success: false,
    error: null
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans transition-colors">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          Sign in to Addis Eats
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Protected authentication with secure HttpOnly session cookies
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white dark:bg-slate-900 py-8 px-6 shadow-sm rounded-3xl sm:px-10 border border-slate-100 dark:border-slate-800">

          {state?.error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-xl text-red-700 dark:text-red-400 text-xs">
              {state.error}
            </div>
          )}

          <form action={formAction} className="space-y-4">
            <input type="hidden" name="next" value={rawNext} />

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Username
              </label>
              <input
                name="username"
                type="text"
                required
                defaultValue="abebe"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white text-sm outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Password
              </label>
              <input
                name="password"
                type="password"
                required
                defaultValue="password123"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white text-sm outline-none focus:border-orange-500"
              />
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl text-sm transition-colors shadow-sm disabled:opacity-50 cursor-pointer"
            >
              {isPending ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Quick Credential Test Pills */}
          <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 space-y-2">
            <p className="font-semibold text-slate-700 dark:text-slate-300">Test Accounts:</p>
            <div className="flex flex-col gap-1 text-[11px]">
              <span>Customer: <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">abebe / password123</code></span>
              <span>Kitchen Staff: <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">chef / kitchen123</code></span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
