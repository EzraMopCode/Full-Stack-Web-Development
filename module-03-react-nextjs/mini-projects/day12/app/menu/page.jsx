'use client';

import { useState } from 'react';
import CategoryBar from '../../components/CategoryBar';
import DishList from '../../components/DishList';
import { menuData } from '../../data/menuData';

export default function MenuPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [dishes] = useState(menuData);

  const filteredDishes = dishes.filter(dish => {
    const matchesCategory = activeCategory === 'All' || dish.category === activeCategory;
    const matchesSearch = dish.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-8 pb-20 font-sans transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

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
              className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none shadow-sm text-slate-700 dark:text-slate-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="sticky top-20 z-30 bg-slate-50/95 dark:bg-slate-950/95 backdrop-blur-md py-4 mb-6 border-b border-slate-200/50 dark:border-slate-800/50 -mx-4 px-4 sm:mx-0 sm:px-0">
          <CategoryBar
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
        </div>

        <div className="mb-6 flex justify-between items-center">
          <span className="text-slate-500 dark:text-slate-400 font-medium">
            Showing {filteredDishes.length} {filteredDishes.length === 1 ? 'dish' : 'dishes'}
          </span>
        </div>

        {filteredDishes.length > 0 ? (
          <DishList dishes={filteredDishes} />
        ) : (
          <div className="text-center py-24 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">No dishes found</h3>
            <p className="text-slate-500 dark:text-slate-400">We couldn&apos;t find anything matching your search.</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
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
