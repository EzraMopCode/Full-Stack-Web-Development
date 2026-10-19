import { useCartItems, useCartTotal, useClearCart } from './cartStore';
import CheckoutForm from './CheckoutForm';

function Checkout() {
  const items = useCartItems();
  const total = useCartTotal();
  const clearCart = useClearCart();

  if (items.length === 0) {
    return <p className="empty-state">Your cart is empty.</p>;
  }

  return (
    <div className="checkout-page">
      <CheckoutForm total={total} onOrderPlaced={clearCart} />
    </div>
  );
}

export default Checkout;
