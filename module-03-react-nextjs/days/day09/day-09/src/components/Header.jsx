import { useCartStore } from "../store/cartStore";

export const Header = () => {
  const cartCount = useCartStore((state) => state.items.length);

  return (
    <header className="header">
      <h1>Addis Eats</h1>
      <div className="controls">
        <span className="badge">Cart: {cartCount}</span>
      </div>
    </header>
  );
};
