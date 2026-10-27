'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useCartStore } from '../store/cartStore';
import { Home, Utensils, Heart, ShoppingCart, User } from 'lucide-react';

const MobileNav = () => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const { cart, favorites } = useCartStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const cartItemsCount = mounted ? cart.reduce((total, item) => total + item.quantity, 0) : 0;
  const favoritesCount = mounted ? favorites.length : 0;

  if (pathname === '/checkout' || pathname === '/receipt') {
    return null;
  }

  const isActive = (path) => pathname === path;

  return (
    <div className="md:hidden">

      {/* Floating Action Button (FAB) */}
      <Link
        href="/cart"
        className="fixed bottom-20 right-4 z-50 bg-orange-600 text-white p-4 rounded-full shadow-xl shadow-orange-600/40 transition-transform active:scale-95 flex items-center justify-center border-4 border-white/50 backdrop-blur-sm"
        aria-label="View Cart"
      >
        <div className="relative">
          <ShoppingCart className="w-6 h-6" />
          {cartItemsCount > 0 && (
            <span className="absolute -top-3 -right-3 bg-white text-orange-600 text-[11px] font-extrabold w-5 h-5 flex items-center justify-center rounded-full shadow-sm">
              {cartItemsCount}
            </span>
          )}
        </div>
      </Link>

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pb-safe">
        <div className="flex justify-around items-center h-16 px-2">

          <Link
            href="/"
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${isActive('/') ? 'text-orange-600 dark:text-orange-500' : 'text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300'}`}
          >
            <Home className="w-6 h-6" />
            <span className="text-[10px] font-bold">Home</span>
          </Link>

          <Link
            href="/menu"
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${isActive('/menu') ? 'text-orange-600 dark:text-orange-500' : 'text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300'}`}
          >
            <Utensils className="w-6 h-6" />
            <span className="text-[10px] font-bold">Menu</span>
          </Link>

          <Link
            href="/favorites"
            className={`relative flex flex-col items-center justify-center w-full h-full space-y-1 ${isActive('/favorites') ? 'text-red-500' : 'text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300'}`}
          >
            <div className="relative">
              <Heart className="w-6 h-6" fill={isActive('/favorites') ? "currentColor" : "none"} />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full border border-white">
                  {favoritesCount}
                </span>
              )}
            </div>
            <span className="text-[10px] font-bold">Saved</span>
          </Link>

          <Link
            href="/profile"
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${isActive('/profile') ? 'text-orange-600 dark:text-orange-500' : 'text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300'}`}
          >
            <User className="w-6 h-6" />
            <span className="text-[10px] font-bold">Profile</span>
          </Link>

        </div>
      </div>

    </div>
  );
};

export default MobileNav;
