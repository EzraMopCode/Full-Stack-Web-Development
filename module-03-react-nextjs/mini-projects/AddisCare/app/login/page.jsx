'use client';

import { useActionState, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { login } from '@/actions/authActions';

export default function LoginPage() {
  const searchParams = useSearchParams();
  const rawNext = searchParams.get('next') || '/portal/appointments';

  const [username, setUsername] = useState('abebe');
  const [password, setPassword] = useState('password123');

  const [state, formAction, isPending] = useActionState(login, {
    success: false,
    error: null
  });

  const selectAccount = (u, p) => {
    setUsername(u);
    setPassword(p);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans transition-colors">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="relative w-16 h-16 mx-auto mb-3 flex items-center justify-center">
          <Image
            src="/logo.png"
            alt="AddisCare Emblem"
            width={64}
            height={64}
            className="w-full h-full object-contain drop-shadow-md"
            priority
          />
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          Sign In to AddisCare
        </h2>
        <p className="mt-2 text-xs text-slate-500">
          Protected healthcare portal with secure HttpOnly cryptographic session cookies.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white dark:bg-slate-900 py-8 px-6 shadow-sm rounded-3xl sm:px-10 border border-slate-100 dark:border-slate-800 space-y-6">

          {state?.error && (
            <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-xl text-red-700 dark:text-red-400 text-xs font-semibold">
              {state.error}
            </div>
          )}

          <form action={formAction} className="space-y-4">
            <input type="hidden" name="next" value={rawNext} />

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Username
              </label>
              <input
                name="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs outline-none focus:border-teal-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Password
              </label>
              <input
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs outline-none focus:border-teal-500 font-mono"
              />
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full min-h-[44px] py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-xs transition-colors shadow-sm disabled:opacity-50 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
            >
              {isPending ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>

          {/* Quick Credential Test Switcher Pills */}
          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 text-xs space-y-3">
            <span className="font-bold text-slate-700 dark:text-slate-300 block">
              1-Click Assessor Test Accounts:
            </span>
            <div className="grid grid-cols-1 gap-2">
              <button
                type="button"
                onClick={() => selectAccount('abebe', 'password123')}
                className="p-2.5 text-left rounded-xl bg-slate-50 hover:bg-teal-50/50 dark:bg-slate-800/60 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-slate-700 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white">Patient Abebe</span>
                  <span className="text-[10px] font-bold uppercase text-teal-600 bg-teal-50 dark:bg-teal-950 px-1.5 py-0.5 rounded">patient</span>
                </div>
                <span className="text-[11px] text-slate-400 font-mono">abebe / password123</span>
              </button>

              <button
                type="button"
                onClick={() => selectAccount('marta', 'password123')}
                className="p-2.5 text-left rounded-xl bg-slate-50 hover:bg-teal-50/50 dark:bg-slate-800/60 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-slate-700 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white">Patient Marta</span>
                  <span className="text-[10px] font-bold uppercase text-teal-600 bg-teal-50 dark:bg-teal-950 px-1.5 py-0.5 rounded">patient</span>
                </div>
                <span className="text-[11px] text-slate-400 font-mono">marta / password123</span>
              </button>

              <button
                type="button"
                onClick={() => selectAccount('dr_tigist', 'doctor123')}
                className="p-2.5 text-left rounded-xl bg-slate-50 hover:bg-teal-50/50 dark:bg-slate-800/60 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-slate-700 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white">Dr. Tigist Assefa</span>
                  <span className="text-[10px] font-bold uppercase text-purple-600 bg-purple-50 dark:bg-purple-950 px-1.5 py-0.5 rounded">doctor</span>
                </div>
                <span className="text-[11px] text-slate-400 font-mono">dr_tigist / doctor123</span>
              </button>

              <button
                type="button"
                onClick={() => selectAccount('nurse_selam', 'nurse123')}
                className="p-2.5 text-left rounded-xl bg-slate-50 hover:bg-teal-50/50 dark:bg-slate-800/60 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-slate-700 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white">Nurse Selamawit</span>
                  <span className="text-[10px] font-bold uppercase text-blue-600 bg-blue-50 dark:bg-blue-950 px-1.5 py-0.5 rounded">staff</span>
                </div>
                <span className="text-[11px] text-slate-400 font-mono">nurse_selam / nurse123</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
