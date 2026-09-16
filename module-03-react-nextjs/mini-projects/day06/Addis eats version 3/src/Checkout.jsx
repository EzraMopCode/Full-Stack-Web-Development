import { useCart } from "./CartProvider";

export default function Checkout() {
  const { total, dispatch } = useCart();

  return (
    <div className="checkout-panel">
      <h2>Secure Checkout</h2>
      <p>Your total is <strong>{total} ETB</strong>.</p>
      <button
        onClick={() => {
          alert("Order Placed!");
          dispatch({ type: "clear" });
        }}
      >
        Place Order
      </button>
    </div>
  );
}
