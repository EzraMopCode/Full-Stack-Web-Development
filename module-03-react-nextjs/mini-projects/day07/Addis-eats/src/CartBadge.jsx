import { useCartCount, useCartTotal } from './cartStore';

function CartBadge() {
  const count = useCartCount();
  const total = useCartTotal();

  return (
    <div className="cart-badge">
      <span className="cart-count">{count}</span>
      <span className="cart-total">{total} ETB</span>
    </div>
  );
}

export default CartBadge;
