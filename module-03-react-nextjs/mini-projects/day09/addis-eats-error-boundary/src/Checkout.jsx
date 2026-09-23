import { useNavigate } from 'react-router-dom';
import { useCartItems, useCartTotal, useClearCart } from './cartStore';
import CheckoutForm from './CheckoutForm';

function Checkout() {
  const items = useCartItems();
  const total = useCartTotal();
  const clearCart = useClearCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return <p className="empty-state">Your cart is empty.</p>;
  }

  function handleOrderPlaced() {
    clearCart();
    navigate('/receipt', { state: { total } });
  }

  return (
    <div className="checkout-page">
      <CheckoutForm total={total} onOrderPlaced={handleOrderPlaced} />
    </div>
  );
}

export default Checkout;
