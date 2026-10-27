'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '../store/cartStore';

const Dish = ({ dish, isBestseller }) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const { favorites, toggleFavorite } = useCartStore();

  if (!dish) return null;

  const isFavorite = favorites.some((item) => item.id === dish.id);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-md shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700 flex flex-col transition-transform hover:-translate-y-1 hover:shadow-xl duration-300 group">

      <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-700">
        <Link href={`/menu/${dish.id}`}>
          {/* Day 18 Requirement: next/image with real dimensions, honest sizes, and meaningful alt */}
          <Image
            src={dish.image}
            alt={`Authentic Ethiopian dish: ${dish.name}`}
            width={400}
            height={300}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
          />
        </Link>

        <button
          onClick={() => toggleFavorite(dish)}
          className="absolute top-3 left-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm p-2 rounded-full shadow-sm hover:bg-orange-50 dark:hover:bg-slate-800 transition-colors z-10 cursor-pointer"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
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
          <span className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-slate-800 dark:text-white shadow-sm">
            {dish.price} ETB
          </span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <Link href={`/menu/${dish.id}`}>
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
          <button
            onClick={() => addToCart(dish)}
            className="px-4 py-2 bg-orange-50 hover:bg-orange-600 text-orange-600 hover:text-white dark:bg-slate-700 dark:hover:bg-orange-600 dark:text-orange-400 dark:hover:text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
          >
            Add to Cart
          </button>
        </div>
      </div>

    </div>
  );
};

export default Dish;
