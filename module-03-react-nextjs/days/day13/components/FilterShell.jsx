'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useTransition } from 'react';
import CategoryBar from './CategoryBar';

export default function FilterShell({ currentCategory = 'All', currentQuery = '', totalCount, children }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const updateFilters = (newCategory, newQuery) => {
    const params = new URLSearchParams(searchParams ? searchParams.toString() : '');
    if (newCategory && newCategory !== 'All') {
      params.set('category', newCategory);
    } else {
      params.delete('category');
    }

    if (newQuery && newQuery.trim()) {
      params.set('q', newQuery.trim());
    } else {
      params.delete('q');
    }

    startTransition(() => {
      const queryString = params.toString();
      router.replace(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false });
    });
  };

  const handleCategoryChange = (category) => {
    updateFilters(category, currentQuery);
  };

  const handleSearchChange = (query) => {
    updateFilters(currentCategory, query);
  };

  const clearFilters = () => {
    startTransition(() => {
      router.replace(pathname, { scroll: false });
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-8 pb-20 font-sans transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white">Our Menu</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">Discover the authentic flavors of Addis</p>
          </div>

          <div className="relative w-full md:w-96">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search dishes (e.g. Tibs)..."
              defaultValue={currentQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none shadow-sm text-slate-700 dark:text-slate-200"
            />
          </div>
        </div>

        {/* Sticky Category Bar */}
        <div className="sticky top-20 z-30 bg-slate-50/95 dark:bg-slate-950/95 backdrop-blur-md py-4 mb-6 border-b border-slate-200/50 dark:border-slate-800/50 -mx-4 px-4 sm:mx-0 sm:px-0">
          <CategoryBar
            activeCategory={currentCategory}
            setActiveCategory={handleCategoryChange}
          />
        </div>

        {/* Dish Count & Transition State */}
        <div className="mb-6 flex justify-between items-center">
          <span className="text-slate-500 dark:text-slate-400 font-medium">
            Showing {totalCount} {totalCount === 1 ? 'dish' : 'dishes'}
            {isPending && <span className="ml-2 text-orange-600 dark:text-orange-400 text-sm animate-pulse">(Updating...)</span>}
          </span>
        </div>

        {/* Server-Rendered Content (Children) */}
        {totalCount > 0 ? (
          children
        ) : (
          <div className="text-center py-24 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">No dishes found</h3>
            <p className="text-slate-500 dark:text-slate-400">We couldn&apos;t find anything matching your search.</p>
            <button
              onClick={clearFilters}
              className="mt-6 px-6 py-2 bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 font-semibold rounded-full hover:bg-orange-100 transition-colors cursor-pointer"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
