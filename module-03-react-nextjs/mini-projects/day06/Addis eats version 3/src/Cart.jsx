import { Link } from "react-router-dom";
import { useCart } from "./CartProvider";

export default function Cart() {
  const { items, total, dispatch } = useCart();

  if (items.length === 0) {
    return (
      <div className="checkout-panel">
        <h2>Your Cart</h2>
        <p>Your cart is empty.</p>
        <Link to="/menu" className="button-link">Return to Menu</Link>
      </div>
    );
  }

  return (
    <div className="checkout-panel">
      <h2>Your Cart</h2>
      <ul>
        {items.map((item, index) => (
          <li key={`${item.id}-${index}`}>
            {item.name} - {item.price} ETB
            <button onClick={() => dispatch({ type: "remove", id: item.id })}>Remove</button>
          </li>
        ))}
      </ul>
      <p><strong>Total: {total} ETB</strong></p>
      <div className="card-actions">
        <button onClick={() => dispatch({ type: "clear" })}>Clear Cart</button>
        <Link to="/checkout" className="button-link">Proceed to Checkout</Link>
      </div>
    </div>
  );
}
