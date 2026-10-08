import { NavLink, Outlet } from 'react-router-dom';
import CartBadge from '../components/CartBadge';

function navClass({ isActive }) {
  return isActive ? 'nav-link nav-active' : 'nav-link';
}

function Layout() {
  return (
    <div className="app">
      <header className="header">
        <div className="header-top">
          <h1 className="logo">
            <span className="logo-icon">🍽️</span> Addis Eats
          </h1>
          <div className="header-actions">
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
