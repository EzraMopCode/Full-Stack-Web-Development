import { useCart } from "./CartProvider";

export default function CheckoutPanel() {
  const { items, total, dispatch } = useCart();

  if (items.length === 0) {
    return <div className="checkout-panel">Cart is empty</div>;
  }

  return (
    <div className="checkout-panel">
      <h2>Checkout</h2>
      <ul>
        {items.map((item, index) => (
          <li key={`${item.id}-${index}`}>
            {item.name} - {item.price} ETB
            <button onClick={() => dispatch({ type: "remove", id: item.id })}>Remove</button>
          </li>
        ))}
      </ul>
      <p><strong>Total: {total} ETB</strong></p>
      <button onClick={() => dispatch({ type: "clear" })}>Clear Cart</button>
    </div>
  );
}
