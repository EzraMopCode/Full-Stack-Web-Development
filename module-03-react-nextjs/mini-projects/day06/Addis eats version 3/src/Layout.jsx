import { NavLink, Outlet } from "react-router-dom";
import CartBadge from "./CartBadge";

export default function Layout() {
  return (
    <div className="app-container">
      <header className="header">
        <h1>Addis Eats</h1>
        <nav className="nav-tabs">
          <NavLink to="/" end className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink>
          <NavLink to="/menu" className={({ isActive }) => isActive ? "active" : ""}>Menu</NavLink>
          <NavLink to="/cart" className={({ isActive }) => isActive ? "active" : ""}>Cart</NavLink>
        </nav>
        <CartBadge />
      </header>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
