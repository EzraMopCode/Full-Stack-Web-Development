'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCartStore } from '../store/cartStore';

export default function DishDetailClient({ dish }) {
  const router = useRouter();
  const addToCart = useCartStore((state) => state.addToCart);
  const { favorites, toggleFavorite } = useCartStore();

  if (!dish) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="text-center p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm max-w-md">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Dish not found</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-6">We couldn&apos;t find the dish you were looking for.</p>
          <button
            onClick={() => router.push('/menu')}
            className="px-6 py-3 bg-orange-600 text-white font-bold rounded-full shadow-md hover:bg-orange-700 transition-colors cursor-pointer"
          >
            Back to Menu
          </button>
        </div>
      </div>
    );
  }

  const isFavorite = favorites.some((item) => item.id === dish.id);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 font-sans transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-orange-600 dark:hover:text-orange-500 mb-8 transition-colors font-medium cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Menu
        </button>

        <div className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-xl shadow-slate-200/40 dark:shadow-none border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row">

          {/* Image Section */}
          <div className="md:w-1/2 relative h-64 md:h-auto bg-slate-100 dark:bg-slate-800">
            <Image
              src={dish.image}
              alt={`Detailed photo of ${dish.name}`}
              width={600}
              height={450}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => toggleFavorite(dish)}
              className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm p-3 rounded-full shadow-md hover:bg-orange-50 dark:hover:bg-slate-800 transition-colors z-10 cursor-pointer"
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <svg className={`w-6 h-6 ${isFavorite ? 'text-red-500 fill-current' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>

          {/* Details Section */}
          <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <div className="mb-2 flex items-center gap-3">
              <span className="bg-orange-100 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400 px-3 py-1 rounded-full text-sm font-bold tracking-wide">
                {dish.category}
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-slate-800 dark:text-white mb-4">{dish.name}</h1>
            <p className="text-3xl font-extrabold text-orange-600 dark:text-orange-500 mb-6">{dish.price} ETB</p>

            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl mb-8 border border-slate-100 dark:border-slate-800">
              <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
                {dish.description}
              </p>
            </div>

            <button
              onClick={() => {
                addToCart(dish);
                router.push('/cart');
              }}
              className="w-full py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-orange-600/30 flex items-center justify-center gap-2 text-lg active:scale-95 cursor-pointer"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Add to Order
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
