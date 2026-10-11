import { NavLink, Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { useThemeStore } from '../store/themeStore';
import { Heart, ShoppingCart, User, Sun, Moon } from 'lucide-react';

const Header = () => {
  const { cart, favorites } = useCartStore();
  const { theme, toggleTheme } = useThemeStore();

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const favoritesCount = favorites.length;

  return (
    <header className="bg-white dark:bg-slate-900 shadow-sm border-b border-slate-100 dark:border-slate-800 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">


          <Link to="/" className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Addis Eats Logo"
              className="h-17 w-17"
            />
            <span className="font-bold text-2xl tracking-tight text-slate-800 dark:text-white hidden sm:block">
              Addis<span className="text-orange-600">Eats</span>
            </span>
          </Link>

          {/* Center Navigation */}
          <nav className="hidden md:flex gap-2 lg:gap-6 items-center">
            <NavLink
              to="/"
              className={({isActive}) => isActive
                ? "bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-500 font-bold px-4 py-2 rounded-full transition-colors"
                : "text-slate-600 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-500 font-medium px-4 py-2 transition-colors"}
            >
              Home
            </NavLink>
            <NavLink
              to="/menu"
              className={({isActive}) => isActive
                ? "bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-500 font-bold px-4 py-2 rounded-full transition-colors"
                : "text-slate-600 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-500 font-medium px-4 py-2 transition-colors"}
            >
              Menu
            </NavLink>
            <NavLink
              to="/favorites"
              className={({isActive}) => isActive
                ? "bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-500 font-bold px-4 py-2 rounded-full transition-colors"
                : "text-slate-600 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-500 font-medium px-4 py-2 transition-colors"}
            >
              Favorites
            </NavLink>
          </nav>

          {/* Right Side Icons */}
          <div className="hidden md:flex items-center gap-4">

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 text-slate-400 hover:text-orange-600 transition-colors flex items-center justify-center"
              aria-label="Toggle Dark Mode"
            >
              {theme === 'dark' ? <Sun className="w-6 h-6 text-orange-500" /> : <Moon className="w-6 h-6" />}
            </button>

            {/* Favorites Icon */}
            <Link to="/favorites" className="relative p-2 text-slate-400 hover:text-red-500 transition-colors flex items-center justify-center">
              <Heart className="w-6 h-6" />
              {favoritesCount > 0 && (
                <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border-2 border-white dark:border-slate-900">
                  {favoritesCount}
                </span>
              )}
            </Link>

            {/* Profile Icon */}
            <Link to="/profile" className="p-2 text-slate-400 hover:text-orange-600 transition-colors flex items-center justify-center">
              <User className="w-6 h-6" />
            </Link>

            {/* Cart Badge */}
            <Link to="/cart" className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 px-5 py-2.5 rounded-full transition-colors shadow-sm ml-2">
              <div className="relative flex items-center">
                <ShoppingCart className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2.5 -right-3 bg-orange-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-slate-50 dark:border-slate-800">
                    {cartItemsCount}
                  </span>
                )}
              </div>
              <span className="font-bold text-slate-800 dark:text-white text-sm ml-2">{cartTotal} ETB</span>
            </Link>

          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;
