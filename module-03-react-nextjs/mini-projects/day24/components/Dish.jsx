'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from '../store/cartStore';

/**
 * Hardened for Day 23 (Accessibility & Touch Targets >= 44px):
 * - Touch targets >= 44x44px on all interactive buttons
 * - Visible focus rings (focus:ring-2 focus:ring-orange-500)
 * - Zero clickable divs (all semantic buttons and links)
 * - Accessible aria-labels and keyboard navigation
 */
export default function Dish({ dish, isBestseller = false }) {
  const { addToCart, toggleFavorite, favorites } = useCartStore();
  const isFavorite = favorites.some((item) => item.id === dish.id);

  return (
    <article className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-700/60 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
      <div className="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-700">
        <Image
          src={dish.image}
          alt={`Authentic Ethiopian ${dish.name}`}
          width={400}
          height={300}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
        />

        {/* Favorite Button: Touch target strictly >= 44x44px with visible focus */}
        <button
          onClick={() => toggleFavorite(dish)}
          className="absolute top-2 left-2 min-h-[44px] min-w-[44px] bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm rounded-full shadow-sm hover:bg-orange-50 dark:hover:bg-slate-800 flex items-center justify-center transition-colors z-10 cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          aria-label={isFavorite ? `Remove ${dish.name} from favorites` : `Save ${dish.name} to favorites`}
        >
          <svg className={`w-5 h-5 ${isFavorite ? 'text-red-500 fill-current' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>

        <div className="absolute top-3 right-3 flex flex-col gap-2 items-end pointer-events-none">
          {isBestseller && (
            <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm flex items-center gap-1">
              🔥 Bestseller
            </span>
          )}
          <span className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-slate-800 dark:text-white shadow-sm font-mono">
            {dish.price} ETB
          </span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <Link
          href={`/menu/${dish.id}`}
          className="focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-lg"
        >
          <h3 className="font-bold text-lg text-slate-800 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-500 transition-colors">
            {dish.name}
          </h3>
        </Link>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 line-clamp-2">
          {dish.description}
        </p>

        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
          <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
            {dish.category}
          </span>
          {/* Add to Cart: Touch target >= 44px with visible focus */}
          <button
            onClick={() => addToCart(dish)}
            className="min-h-[44px] px-4 py-2.5 bg-orange-50 hover:bg-orange-600 text-orange-600 hover:text-white dark:bg-slate-700 dark:hover:bg-orange-600 dark:text-orange-400 dark:hover:text-white text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            aria-label={`Add ${dish.name} to order cart`}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}
