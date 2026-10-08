import CartBadge from '../components/CartBadge';

function Header() {
  return (
    <header className="header">
      <div className="header-top">
        <h1 className="logo">
          <span className="logo-icon">🍽️</span> Addis Eats
        </h1>
        <CartBadge />
      </div>
      <p>Ethiopian food, delivered fast</p>
    </header>
  );
}

export default Header;
