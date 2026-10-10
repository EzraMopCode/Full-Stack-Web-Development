import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';

const Header = () => {
  // Grab both cart and favorites from Zustand
  const { cart, favorites } = useCartStore();

  // Calculations
  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const favoritesCount = favorites.length;

  return (
    <header className="bg-white shadow-sm border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/logo.jpg"
              alt="Addis Eats Logo"
              className="h-14 w-14 object-cover rounded-2xl shadow-sm"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="hidden bg-orange-600 text-white p-2 rounded-xl shadow-sm">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477-4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <span className="font-bold text-2xl tracking-tight text-slate-800 hidden sm:block">
              Addis<span className="text-orange-600">Eats</span>
            </span>
          </Link>

          {/* Center Navigation */}
          <nav className="hidden md:flex gap-2 lg:gap-6 items-center">
            <NavLink to="/" className={({isActive}) => isActive ? "bg-orange-50 text-orange-600 font-bold px-4 py-2 rounded-full transition-colors" : "text-slate-600 hover:text-orange-600 font-medium px-4 py-2 transition-colors"}>Home</NavLink>
            <NavLink to="/menu" className={({isActive}) => isActive ? "bg-orange-50 text-orange-600 font-bold px-4 py-2 rounded-full transition-colors" : "text-slate-600 hover:text-orange-600 font-medium px-4 py-2 transition-colors"}>Menu</NavLink>
            <NavLink to="/favorites" className={({isActive}) => isActive ? "bg-orange-50 text-orange-600 font-bold px-4 py-2 rounded-full transition-colors" : "text-slate-600 hover:text-orange-600 font-medium px-4 py-2 transition-colors"}>Favorites</NavLink>
            <NavLink to="/checkout" className={({isActive}) => isActive ? "bg-orange-50 text-orange-600 font-bold px-4 py-2 rounded-full transition-colors" : "text-slate-600 hover:text-orange-600 font-medium px-4 py-2 transition-colors"}>Checkout</NavLink>
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center gap-2 sm:gap-4">

            {/* Favorites Heart Icon */}
            <Link to="/favorites" className="relative p-2 text-slate-400 hover:text-red-500 transition-colors hidden sm:flex items-center justify-center">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {favoritesCount > 0 && (
                <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border-2 border-white">
                  {favoritesCount}
                </span>
              )}
            </Link>

            {/* Cart Badge */}
            <Link to="/cart" className="flex items-center gap-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full transition-colors shadow-sm">
              <div className="relative flex items-center">
                <svg className="w-5 h-5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2.5 -right-3 bg-orange-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-slate-50">
                    {cartItemsCount}
                  </span>
                )}
              </div>
              <span className="font-bold text-slate-800 text-sm ml-2 hidden sm:block">{cartTotal} ETB</span>
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;
