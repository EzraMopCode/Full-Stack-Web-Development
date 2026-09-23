import { useCart } from './CartContext';
import OrderForm from './OrderForm';

function Checkout() {
  const { items, total } = useCart();

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>
      {items.length === 0 ? (
        <p className="empty-state">Your cart is empty.</p>
      ) : (
        <p className="checkout-total">Order total: {total} ETB</p>
      )}
      <OrderForm />
    </div>
  );
}

export default Checkout;
