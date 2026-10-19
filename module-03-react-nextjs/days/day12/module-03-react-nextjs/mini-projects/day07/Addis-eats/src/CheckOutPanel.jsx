import { useCartItems, useCartTotal, useRemoveItem, useClearCart } from './cartStore';

function CheckoutPanel() {
  const items = useCartItems();
  const total = useCartTotal();
  const remove = useRemoveItem();
  const clear = useClearCart();

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
            <button className="remove-btn" onClick={() => remove(dish.id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      <p className="checkout-total">Total: {total} ETB</p>
      <button className="clear-btn" onClick={clear}>
        Clear cart
      </button>
    </div>
  );
}

export default CheckoutPanel;
