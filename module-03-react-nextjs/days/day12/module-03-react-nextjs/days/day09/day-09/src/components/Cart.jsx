import { useCartStore } from "../store/cartStore";

export const Cart = () => {
  const items = useCartStore((state) => state.items);
  const remove = useCartStore((state) => state.remove);
  const clear = useCartStore((state) => state.clear);

  if (items.length === 0) {
    return (
      <div className="cart-section">
        <h2>Your Order</h2>
        <p>Cart is empty</p>
      </div>
    );
  }

  return (
    <div className="cart-section">
      <h2>Your Order</h2>
      <ul>
        {items.map((item, index) => (
          <li key={`${item.id}-${index}`}>
            <span>{item.name}</span>
            <span>${item.price}</span>
            <button onClick={() => remove(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <button className="submit-btn clear-btn" onClick={clear} style={{ background: '#dc2626' }}>
        Clear Cart
      </button>
    </div>
  );
};
