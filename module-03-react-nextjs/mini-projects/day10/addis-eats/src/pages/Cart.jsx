import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';

const Cart = () => {
  // Pulling the cart data and action functions from Zustand
  const { cart, removeFromCart, updateQuantity } = useCartStore();

  // Calculations
  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const deliveryFee = 50; // Flat delivery fee for Addis Eats
  const total = subtotal + deliveryFee;

  // Render this if the cart is completely empty
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="w-24 h-24 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-6">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Your cart is empty</h2>
        <p className="text-slate-500 mb-8 text-center max-w-md">Looks like you haven't added any delicious Ethiopian dishes to your cart yet.</p>
        <Link
          to="/menu"
          className="px-8 py-3 bg-orange-600 text-white font-bold rounded-full shadow-md hover:bg-orange-700 transition-colors"
        >
          Browse Menu
        </Link>
      </div>
    );
  }

  // Render this if there are items in the cart
  return (
    <div className="min-h-screen bg-slate-50 py-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-8">Your Order</h1>

        <div className="flex flex-col lg:flex-row gap-8">

          {/* Left Column: List of Cart Items */}
          <div className="lg:w-2/3 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col sm:flex-row items-center gap-6">

                {/* Dish Image */}
                <div className="w-full sm:w-32 h-32 flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover rounded-xl"
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/150/f8fafc/f97316?text=Image'; }}
                  />
                </div>

                {/* Dish Details */}
                <div className="flex-grow text-center sm:text-left w-full">
                  <h3 className="text-xl font-bold text-slate-800 mb-1">{item.name}</h3>
                  <p className="text-orange-600 font-bold mb-4">{item.price} ETB</p>

                  {/* Controls: Quantity and Remove */}
                  <div className="flex items-center justify-center sm:justify-start gap-6">

                    {/* Plus/Minus Toggles */}
                    <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-10 h-10 flex items-center justify-center text-slate-500 hover:text-orange-600 hover:bg-orange-50 rounded-l-lg transition-colors"
                        disabled={item.quantity <= 1}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" /></svg>
                      </button>

                      <span className="w-10 text-center font-semibold text-slate-800">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-10 h-10 flex items-center justify-center text-slate-500 hover:text-orange-600 hover:bg-orange-50 rounded-r-lg transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-slate-400 hover:text-red-500 transition-colors flex items-center gap-1 text-sm font-medium"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      Remove
                    </button>
                  </div>
                </div>

                {/* Line Item Total */}
                <div className="hidden sm:block text-right">
                  <p className="text-slate-500 text-sm mb-1">Total</p>
                  <p className="text-xl font-bold text-slate-800">{item.price * item.quantity} ETB</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Order Summary Box */}
          <div className="lg:w-1/3">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 sticky top-28">
              <h3 className="text-2xl font-bold text-slate-800 mb-6">Order Summary</h3>

              <div className="space-y-4 mb-6 text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-800">{subtotal} ETB</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className="font-semibold text-slate-800">{deliveryFee} ETB</span>
                </div>

                <div className="border-t border-slate-100 pt-4 mt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-slate-800">Total</span>
                    <span className="text-2xl font-bold text-orange-600">{total} ETB</span>
                  </div>
                </div>
              </div>

              <Link
                to="/checkout"
                className="w-full block text-center py-4 bg-orange-600 text-white font-bold rounded-xl shadow-lg shadow-orange-600/30 hover:bg-orange-700 transition-colors"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Cart;
