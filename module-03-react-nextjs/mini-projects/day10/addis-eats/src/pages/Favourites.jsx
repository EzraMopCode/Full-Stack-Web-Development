import React from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import DishList from '../components/DishList';

const Favorites = () => {
  const favorites = useCartStore((state) => state.favorites);

  return (
    <div className="min-h-screen bg-slate-50 py-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800">Saved Favorites</h1>
          <p className="text-slate-500 mt-2 text-lg">Your top picks, ready to order.</p>
        </div>

        {favorites.length > 0 ? (
          <DishList dishes={favorites} />
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
            <div className="text-6xl mb-4 text-slate-300">❤️</div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">No favorites yet</h3>
            <p className="text-slate-500 mb-8 max-w-sm mx-auto">
              Tap the heart icon on any dish in the menu to save it here for quick ordering later.
            </p>
            <Link
              to="/menu"
              className="px-8 py-3 bg-orange-600 text-white font-bold rounded-full shadow-md hover:bg-orange-700 transition-colors"
            >
              Explore the Menu
            </Link>
          </div>
        )}

      </div>
    </div>
  );
};

export default Favorites;
