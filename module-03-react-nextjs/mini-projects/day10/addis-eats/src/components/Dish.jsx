import React from 'react';
import { useCartStore } from '../store/cartStore';

const Dish = ({ dish, isBestseller }) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const { favorites, toggleFavorite } = useCartStore();

  if (!dish) return null;

  // Check if this specific dish is in the favorites array
  const isFavorite = favorites.some((item) => item.id === dish.id);

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md shadow-slate-200/50 border border-slate-100 flex flex-col transition-transform hover:-translate-y-1 hover:shadow-xl duration-300 group">

      <div className="relative h-48 overflow-hidden bg-slate-100">
        <img
          src={dish.image}
          alt={dish.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => { e.target.src = 'https://via.placeholder.com/400x300/f8fafc/f97316?text=Addis+Eats'; }}
        />

        {/* Top Left: Favorite Heart Button */}
        <button
          onClick={() => toggleFavorite(dish)}
          className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-sm hover:bg-orange-50 transition-colors z-10"
        >
          <svg className={`w-5 h-5 ${isFavorite ? 'text-red-500 fill-current' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>

        {/* Top Right: Bestseller Badge OR Price */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 items-end">
          {isBestseller && (
            <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm flex items-center gap-1">
              🔥 Bestseller
            </span>
          )}
          <span className="bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-slate-800 shadow-sm">
            {dish.price} ETB
          </span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-slate-800 mb-2">{dish.name}</h3>
        <p className="text-slate-500 text-sm mb-6 flex-grow line-clamp-2">
          {dish.description}
        </p>

        <button
          onClick={() => addToCart(dish)}
          className="w-full py-3 bg-orange-50 hover:bg-orange-600 text-orange-600 hover:text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 active:scale-95"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Dish;
