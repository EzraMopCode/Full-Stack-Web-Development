import { useCartItems, useCartTotal, useRemoveItem, useClearCart } from '../store/cartStore';

function CheckoutPanel() {
  const items = useCartItems();
  const total = useCartTotal();
  const remove = useRemoveItem();
  const clear = useClearCart();

  if (items.length === 0) {
    return (
      <div className="empty-state card">
        <span style={{ fontSize: '4rem', display: 'block', marginBottom: '15px' }}>🛒</span>
        <h3>Your cart is empty</h3>
        <p>Looks like you haven't added any delicious food yet.</p>
      </div>
    );
  }

  return (
    <div className="checkout-panel">
      <div className="panel-header">
        <h2>Order Summary</h2>
        <button className="clear-btn" onClick={clear}>Clear All</button>
      </div>

      <ul className="checkout-list">
        {items.map((dish, index) => (
          <li key={`${dish.id}-${index}`} className="checkout-item">
            <div className="item-details">
              <span className="item-name">{dish.name}</span>
              <span className="item-price">{dish.price} ETB</span>
            </div>
            <button className="remove-btn" onClick={() => remove(dish.id)} aria-label="Remove item">
              ✕
            </button>
          </li>
        ))}
      </ul>

      <div className="checkout-footer">
        <div className="checkout-total">
          <span>Total to pay</span>
          <span className="total-amount">{total} ETB</span>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPanel;
