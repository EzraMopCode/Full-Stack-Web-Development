'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';
import CategoryBar from './CategoryBar';
import Dish from './Dish';

export default function FilterShell({
  currentCategory = 'All',
  currentQuery = '',
  currentPage = 1,
  totalCount,
  totalPages = 1,
  children
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Local state for debounced search
  const [searchTerm, setSearchTerm] = useState(currentQuery);
  const [debouncedTerm, setDebouncedTerm] = useState(currentQuery);

  // 300ms debounce timer: typing 5 fast characters fires 1 network request instead of 5
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Requirement 5 & 6:
  // - Null key when term is empty (SWR does not fetch on empty term)
  // - keepPreviousData enabled so previous results remain visible while next request resolves (no flashing!)
  const activeKey = debouncedTerm.trim()
    ? `/api/dishes?q=${encodeURIComponent(debouncedTerm.trim())}&category=${currentCategory}&page=${currentPage}&limit=6`
    : null;

  const { data: searchData, isValidating } = useSWR(activeKey, fetcher, {
    keepPreviousData: true,
    revalidateOnFocus: false
  });

  // Requirement 7: Paging with page number in query string (linkable & shareable)
  const setPage = (newPage) => {
    const params = new URLSearchParams(searchParams ? searchParams.toString() : '');
    params.set('page', String(newPage));
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const updateCategory = (category) => {
    const params = new URLSearchParams(searchParams ? searchParams.toString() : '');
    if (category && category !== 'All') {
      params.set('category', category);
    } else {
      params.delete('category');
    }
    params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // Determine whether to show live debounced SWR results or server-rendered children
  const isLiveSearchActive = Boolean(debouncedTerm.trim());
  const activeDishes = isLiveSearchActive ? searchData?.dishes : null;
  const activeTotal = isLiveSearchActive ? (searchData?.total ?? 0) : totalCount;
  const activeTotalPages = isLiveSearchActive ? (searchData?.totalPages ?? 1) : totalPages;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-8 pb-20 font-sans transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header & Debounced Search Input */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white">Our Menu</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">
              Live SWR search with debouncing &amp; zero-flash pagination
            </p>
          </div>

          <div className="relative w-full md:w-96">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Type to search (debounced 300ms)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-10 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none shadow-sm text-slate-700 dark:text-slate-200"
            />
            {isValidating && (
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                <span className="w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </div>
        </div>

        {/* Sticky Category Bar */}
        <div className="sticky top-20 z-30 bg-slate-50/95 dark:bg-slate-950/95 backdrop-blur-md py-4 mb-6 border-b border-slate-200/50 dark:border-slate-800/50 -mx-4 px-4 sm:mx-0 sm:px-0">
          <CategoryBar
            activeCategory={currentCategory}
            setActiveCategory={updateCategory}
          />
        </div>

        {/* Status bar */}
        <div className="mb-6 flex justify-between items-center text-sm">
          <span className="text-slate-500 dark:text-slate-400 font-medium">
            Showing {activeTotal} {activeTotal === 1 ? 'dish' : 'dishes'}
            {isLiveSearchActive && <span className="ml-2 text-xs bg-orange-100 dark:bg-orange-950/50 text-orange-600 px-2 py-0.5 rounded-full font-medium">Live SWR Query</span>}
          </span>
          <span className="text-slate-400 text-xs">
            Page {currentPage} of {activeTotalPages}
          </span>
        </div>

        {/* Dish Grid Display */}
        {isLiveSearchActive ? (
          activeDishes && activeDishes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeDishes.map((dish) => (
                <Dish key={dish.id} dish={dish} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
              <div className="text-5xl mb-3">🍽️</div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-1">No matching dishes</h3>
              <p className="text-slate-500 text-sm">Try typing another Ethiopian dish like &quot;Tibs&quot; or &quot;Shiro&quot;.</p>
            </div>
          )
        ) : (
          children
        )}

        {/* Pagination Bar */}
        {activeTotalPages > 1 && (
          <div className="mt-12 flex justify-center items-center gap-3">
            <button
              onClick={() => setPage(Math.max(1, currentPage - 1))}
              disabled={currentPage <= 1}
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-semibold text-slate-700 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm"
            >
              &larr; Previous
            </button>

            {[...Array(activeTotalPages)].map((_, i) => {
              const p = i + 1;
              return (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${
                    currentPage === p
                      ? 'bg-orange-600 text-white shadow-md shadow-orange-600/30'
                      : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {p}
                </button>
              );
            })}

            <button
              onClick={() => setPage(Math.min(activeTotalPages, currentPage + 1))}
              disabled={currentPage >= activeTotalPages}
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-semibold text-slate-700 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-sm"
            >
              Next &rarr;
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
