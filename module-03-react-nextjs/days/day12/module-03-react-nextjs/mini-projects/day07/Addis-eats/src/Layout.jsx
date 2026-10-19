import { NavLink, Outlet } from 'react-router-dom';
import CartBadge from './CartBadge';
import { useTheme } from './ThemeContext';

function navClass({ isActive }) {
  return isActive ? 'nav-link nav-active' : 'nav-link';
}

function Layout() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="app" data-theme={theme}>
      <header className="header">
        <div className="header-top">
          <h1>Addis Eats</h1>
          <div className="header-actions">
            <button className="theme-toggle" onClick={toggleTheme}>
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            <CartBadge />
          </div>
        </div>
        <nav className="main-nav">
          <NavLink to="/" end className={navClass}>Home</NavLink>
          <NavLink to="/menu" className={navClass}>Menu</NavLink>
          <NavLink to="/cart" className={navClass}>Cart</NavLink>
          <NavLink to="/checkout" className={navClass}>Checkout</NavLink>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
