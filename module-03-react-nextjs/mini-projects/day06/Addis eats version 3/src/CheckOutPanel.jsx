import { useCart } from './CartContext';

function CheckoutPanel() {
  const { items, dispatch, total } = useCart();

  if (items.length === 0) {
    return <p className="empty-state">Your cart is empty.</p>;
  }

  return (
    <div className="checkout-panel">
      <h2>Your order</h2>
      <ul className="checkout-list">
        {items.map((dish, index) => (
          <li key={`${dish.id}-${index}`} className="checkout-item">
            <span>{dish.name}</span>
            <span>{dish.price} ETB</span>
            <button
              className="remove-btn"
              onClick={() => dispatch({ type: 'remove', id: dish.id })}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <p className="checkout-total">Total: {total} ETB</p>
      <button className="clear-btn" onClick={() => dispatch({ type: 'clear' })}>
        Clear cart
      </button>
    </div>
  );
}

export default CheckoutPanel;
