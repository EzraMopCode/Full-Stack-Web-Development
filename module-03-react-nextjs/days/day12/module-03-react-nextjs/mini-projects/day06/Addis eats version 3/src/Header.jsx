import CartBadge from './CartBadge';

function Header() {
  return (
    <header className="header">
      <div className="header-top">
        <h1>Addis Eats</h1>
        <CartBadge />
      </div>
      <p>Ethiopian food, delivered fast</p>
    </header>
  );
}

export default Header;
