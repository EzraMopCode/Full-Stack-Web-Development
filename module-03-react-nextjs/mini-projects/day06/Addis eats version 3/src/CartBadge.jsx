import { useCart } from "./CartProvider";

export default function CartBadge() {
  const { items, total } = useCart();
  return (
    <div className="cart-badge">
      <strong>{items.length} items</strong> | {total} ETB
    </div>
  );
}
