"use client";
import { useState } from 'react';
import CategoryBar from './CategoryBar';

export default function MenuLayout({ children }) {
  const [clickCount, setClickCount] = useState(0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col md:flex-row gap-8 min-h-screen">

      <aside className="w-full md:w-64 shrink-0">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 sticky top-24">

          <CategoryBar />


          <div className="mt-8 p-4 bg-slate-50 rounded-xl border border-slate-200 text-center">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Layout State Test</p>
            <button
              onClick={() => setClickCount(c => c + 1)}
              className="w-full py-3 bg-orange-100 hover:bg-orange-200 text-orange-700 font-bold rounded-lg transition-colors shadow-sm">
              Sidebar Clicks: {clickCount}
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1">
        {children}
      </main>

    </div>
  );
}
