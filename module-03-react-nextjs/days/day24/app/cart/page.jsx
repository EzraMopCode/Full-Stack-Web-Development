'use client';

import { useCartStore } from '../../store/cartStore';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const deliveryFee = subtotal > 0 ? 50 : 0;
  const total = subtotal + deliveryFee;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4 transition-colors">
        <div className="w-24 h-24 bg-orange-100 dark:bg-slate-800 text-orange-600 dark:text-orange-400 rounded-full flex items-center justify-center mb-6">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Your Cart is Empty</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-sm text-center">
          Looks like you haven&apos;t added any authentic Ethiopian meals to your cart yet.
        </p>
        <Link
          href="/menu"
          className="min-h-[44px] px-8 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl shadow-lg shadow-orange-600/30 transition-all flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
        >
          Explore Delicious Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Your Food Cart</h1>
          <button
            onClick={clearCart}
            className="min-h-[44px] px-3 py-2 text-sm text-slate-500 hover:text-red-500 dark:text-slate-400 dark:hover:text-red-400 font-medium transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500 rounded-lg"
          >
            Clear Entire Cart
          </button>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none mb-8">
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {cart.map((item) => (
              <div key={item.id} className="py-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="w-20 h-20 rounded-2xl object-cover shrink-0"
                  />
                  <div>
                    <h3 className="font-bold text-slate-800 dark:text-white text-lg">{item.name}</h3>
                    <p className="text-orange-600 dark:text-orange-500 font-bold font-mono">{item.price} ETB</p>
                  </div>
                </div>

                {/* Controls: Quantity and Remove (All touch targets >= 44x44px) */}
                <div className="flex items-center justify-center sm:justify-start gap-4">
                  <div className="flex items-center bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-slate-700 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500"
                      disabled={item.quantity <= 1}
                      aria-label={`Decrease quantity of ${item.name}`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" /></svg>
                    </button>

                    <span className="min-w-[44px] text-center font-bold text-slate-800 dark:text-white font-mono">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-slate-700 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500"
                      aria-label={`Increase quantity of ${item.name}`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="min-h-[44px] px-3 py-2 text-slate-400 hover:text-red-500 transition-colors flex items-center gap-1.5 text-sm font-semibold cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500 rounded-lg"
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-3">
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>Subtotal</span>
              <span className="font-bold text-slate-800 dark:text-white font-mono">{subtotal} ETB</span>
            </div>
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>Delivery Fee</span>
              <span className="font-bold text-slate-800 dark:text-white font-mono">{deliveryFee} ETB</span>
            </div>
            <div className="flex justify-between text-xl font-black text-slate-800 dark:text-white pt-3 border-t border-slate-100 dark:border-slate-800">
              <span>Grand Total</span>
              <span className="text-orange-600 dark:text-orange-500 font-mono">{total} ETB</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/menu"
            className="flex-1 min-h-[48px] py-3.5 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold rounded-xl text-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            ← Add More Dishes
          </Link>
          <Link
            href="/checkout"
            className="flex-1 min-h-[48px] py-3.5 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl text-center shadow-lg shadow-orange-600/30 transition-all flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            Proceed to Checkout &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
