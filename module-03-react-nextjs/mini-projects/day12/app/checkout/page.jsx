'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCartStore } from '../../store/cartStore';
import { useAuth } from '../../context/AuthContext';
import Skeleton from '../../components/Skeleton';

export default function CheckoutPage() {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();
  const { cart, clearCart } = useCartStore();

  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('telebirr');

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace('/login?from=/checkout');
    }
  }, [loading, isAuthenticated, router]);

  if (loading || !mounted) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4">
        <Skeleton />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const deliveryFee = 50;
  const total = subtotal + deliveryFee;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      clearCart();
      router.push('/receipt');
    }, 1500);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4 transition-colors">
        <div className="w-20 h-20 bg-slate-200 dark:bg-slate-800 text-slate-500 rounded-full flex items-center justify-center mb-6">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">No items to checkout</h2>
        <Link href="/menu" className="text-orange-600 dark:text-orange-500 font-semibold hover:underline">
          Return to Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 font-sans transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-8">Checkout</h1>

        <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-8">

          {/* Left Column: Form Details */}
          <div className="lg:w-2/3 space-y-6">

            {/* Contact Information */}
            <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
              <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
                <span className="bg-orange-100 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400 w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
                Contact Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                  <input required type="text" placeholder="Abebe Kebede" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 dark:focus:ring-orange-900/40 transition-all outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Phone Number</label>
                  <input required type="tel" placeholder="+251 911 234 567" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 dark:focus:ring-orange-900/40 transition-all outline-none" />
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
              <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
                <span className="bg-orange-100 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400 w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
                Delivery Address
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Subcity / Area</label>
                  <select required className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 dark:focus:ring-orange-900/40 transition-all outline-none">
                    <option value="">Select your area...</option>
                    <option value="bole">Bole</option>
                    <option value="piassa">Piassa</option>
                    <option value="kazanchis">Kazanchis</option>
                    <option value="sarbet">Sarbet</option>
                    <option value="cmc">CMC</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Street Address / House Number</label>
                  <input required type="text" placeholder="e.g. Next to Edna Mall, House No. 123" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 dark:focus:ring-orange-900/40 transition-all outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Delivery Instructions (Optional)</label>
                  <textarea placeholder="e.g. Call me when you arrive at the gate." rows={2} className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:border-orange-500 focus:ring-2 focus:ring-orange-200 dark:focus:ring-orange-900/40 transition-all outline-none resize-none"></textarea>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
              <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
                <span className="bg-orange-100 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400 w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span>
                Payment Method
              </h2>
              <div className="space-y-3">

                <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-colors ${paymentMethod === 'telebirr' ? 'border-orange-500 bg-orange-50/50 dark:bg-orange-950/30' : 'border-slate-200 dark:border-slate-700 hover:border-orange-200'}`}>
                  <input type="radio" name="payment" value="telebirr" checked={paymentMethod === 'telebirr'} onChange={() => setPaymentMethod('telebirr')} className="w-5 h-5 text-orange-600 focus:ring-orange-500" />
                  <span className="ml-3 font-semibold text-slate-800 dark:text-white">Telebirr</span>
                </label>

                <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-colors ${paymentMethod === 'cbe' ? 'border-orange-500 bg-orange-50/50 dark:bg-orange-950/30' : 'border-slate-200 dark:border-slate-700 hover:border-orange-200'}`}>
                  <input type="radio" name="payment" value="cbe" checked={paymentMethod === 'cbe'} onChange={() => setPaymentMethod('cbe')} className="w-5 h-5 text-orange-600 focus:ring-orange-500" />
                  <span className="ml-3 font-semibold text-slate-800 dark:text-white">CBE Birr</span>
                </label>

                <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-colors ${paymentMethod === 'cash' ? 'border-orange-500 bg-orange-50/50 dark:bg-orange-950/30' : 'border-slate-200 dark:border-slate-700 hover:border-orange-200'}`}>
                  <input type="radio" name="payment" value="cash" checked={paymentMethod === 'cash'} onChange={() => setPaymentMethod('cash')} className="w-5 h-5 text-orange-600 focus:ring-orange-500" />
                  <span className="ml-3 font-semibold text-slate-800 dark:text-white">Cash on Delivery</span>
                </label>

              </div>
            </div>

          </div>

          {/* Right Column: Order Review */}
          <div className="lg:w-1/3">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none sticky top-28">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Review Order</h3>

              {/* Item List Compact */}
              <div className="space-y-3 mb-6 max-h-60 overflow-y-auto pr-2">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400">
                      <span className="font-semibold text-slate-800 dark:text-white mr-2">{item.quantity}x</span>
                      {item.name}
                    </span>
                    <span className="font-medium text-slate-800 dark:text-white">{item.price * item.quantity} ETB</span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-3 text-slate-600 dark:text-slate-400 text-sm border-t border-slate-100 dark:border-slate-800 pt-4 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-800 dark:text-white">{subtotal} ETB</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className="font-semibold text-slate-800 dark:text-white">{deliveryFee} ETB</span>
                </div>
                <div className="flex justify-between items-center pt-3 mt-3 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-base font-bold text-slate-800 dark:text-white">Total</span>
                  <span className="text-xl font-bold text-orange-600 dark:text-orange-500">{total} ETB</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 text-white font-bold rounded-xl shadow-lg transition-all flex justify-center items-center gap-2 cursor-pointer
                  ${isSubmitting ? 'bg-slate-400 cursor-not-allowed shadow-none' : 'bg-orange-600 hover:bg-orange-700 shadow-orange-600/30'}
                `}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  'Place Order'
                )}
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}
