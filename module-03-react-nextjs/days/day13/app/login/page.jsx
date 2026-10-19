'use client';

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';

function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const from = searchParams.get('from') || '/checkout';

  function handleLogin() {
    login();
    router.replace(from);
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4 font-sans transition-colors">
      <div className="bg-white dark:bg-slate-900 p-8 md:p-10 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none max-w-md w-full text-center">

        {/* Lock Icon */}
        <div className="w-16 h-16 bg-orange-100 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Sign In Required</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-8">Sign in to continue to checkout and complete your order.</p>

        <button
          onClick={handleLogin}
          className="w-full py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl shadow-lg shadow-orange-600/30 transition-all flex justify-center items-center gap-2 cursor-pointer"
        >
          Sign In to Continue
        </button>

      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-10 h-10 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin"></div></div>}>
      <LoginForm />
    </Suspense>
  );
}
