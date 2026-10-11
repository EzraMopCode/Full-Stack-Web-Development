import { NavLink, Link, useLocation } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { Home, Utensils, Heart, ShoppingCart, User } from 'lucide-react';

const MobileNav = () => {
  const { cart, favorites } = useCartStore();
  const location = useLocation();

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);
  const favoritesCount = favorites.length;

  if (location.pathname === '/checkout' || location.pathname === '/receipt') {
    return null;
  }

  return (
    <div className="md:hidden">

      {/* Floating Action Button (FAB) */}
      <Link
        to="/cart"
        className="fixed bottom-20 right-4 z-50 bg-orange-600 text-white p-4 rounded-full shadow-xl shadow-orange-600/40 transition-transform active:scale-95 flex items-center justify-center border-4 border-white/50 backdrop-blur-sm"
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
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 pb-safe">
        <div className="flex justify-around items-center h-16 px-2">

          <NavLink to="/" className={({isActive}) => `flex flex-col items-center justify-center w-full h-full space-y-1 ${isActive ? 'text-orange-600' : 'text-slate-400 hover:text-slate-600'}`}>
            <Home className="w-6 h-6" />
            <span className="text-[10px] font-bold">Home</span>
          </NavLink>

          <NavLink to="/menu" className={({isActive}) => `flex flex-col items-center justify-center w-full h-full space-y-1 ${isActive ? 'text-orange-600' : 'text-slate-400 hover:text-slate-600'}`}>
            <Utensils className="w-6 h-6" />
            <span className="text-[10px] font-bold">Menu</span>
          </NavLink>

          <NavLink to="/favorites" className={({isActive}) => `relative flex flex-col items-center justify-center w-full h-full space-y-1 ${isActive ? 'text-red-500' : 'text-slate-400 hover:text-slate-600'}`}>
            {({ isActive }) => (
              <>
                <div className="relative">
                  <Heart className="w-6 h-6" fill={isActive ? "currentColor" : "none"} />
                  {favoritesCount > 0 && (
                    <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full border border-white">
                      {favoritesCount}
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-bold">Saved</span>
              </>
            )}
          </NavLink>

          {/* New Profile Tab */}
          <NavLink to="/profile" className={({isActive}) => `flex flex-col items-center justify-center w-full h-full space-y-1 ${isActive ? 'text-orange-600' : 'text-slate-400 hover:text-slate-600'}`}>
            <User className="w-6 h-6" />
            <span className="text-[10px] font-bold">Profile</span>
          </NavLink>

        </div>
      </div>

    </div>
  );
};

export default MobileNav;
