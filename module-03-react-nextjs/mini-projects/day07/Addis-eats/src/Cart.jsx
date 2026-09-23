import { Link } from 'react-router-dom';
import CheckoutPanel from './CheckoutPanel';

function Cart() {
  return (
    <div className="cart-page">
      <h2>Your cart</h2>
      <CheckoutPanel />
      <Link className="add-btn" to="/checkout">Go to checkout</Link>
    </div>
  );
}

export default Cart;
