import { useCart } from './CartContext';

function CartBadge() {
  const { items, total } = useCart();

  return (
    <div className="cart-badge">
      <span className="cart-count">{items.length}</span>
      <span className="cart-total">{total} ETB</span>
    </div>
  );
}

export default CartBadge;
