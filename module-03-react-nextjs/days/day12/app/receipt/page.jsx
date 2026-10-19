'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function ReceiptPage() {
  const [orderNumber, setOrderNumber] = useState('');

  useEffect(() => {
    setOrderNumber(Math.floor(100000 + Math.random() * 900000).toString());
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4 font-sans transition-colors">
      <div className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none max-w-lg w-full text-center">

        {/* Success Icon */}
        <div className="w-20 h-20 bg-green-100 dark:bg-green-950/50 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">Order Confirmed!</h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8 text-lg">
          Thank you for ordering with Addis Eats. Your authentic Ethiopian meal is being prepared and will be on its way soon.
        </p>

        {/* Order Details Box */}
        <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 mb-8 text-center flex flex-col items-center">
          <span className="text-sm text-slate-500 dark:text-slate-400 mb-1 font-medium">Order Number</span>
          <span className="font-mono font-bold text-slate-800 dark:text-white text-xl tracking-wider">
            #{orderNumber || '------'}
          </span>
        </div>

        {/* Action Button */}
        <Link
          href="/"
          className="block w-full py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl shadow-lg shadow-orange-600/30 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
