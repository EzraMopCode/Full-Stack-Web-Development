'use client';

import useSWR from 'swr';
import Link from 'next/link';
import { fetcher } from '@/lib/fetcher';
import CancelOrderButton from '@/components/CancelOrderButton';

export default function OrderStatusTracker({ initialOrder, orderId }) {
  // SWR Polling query:
  // - fallbackData: renders instantly on first paint with ZERO spinner!
  // - refreshInterval: polls every 5000ms (5s) for real-time kitchen status updates
  const { data: order, error, isValidating } = useSWR(
    orderId ? `/api/orders/${orderId}` : null,
    fetcher,
    {
      fallbackData: initialOrder,
      refreshInterval: 5000,
      revalidateOnFocus: true
    }
  );

  if (error) {
    return (
      <div className="p-6 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-2xl text-center">
        <h3 className="text-lg font-bold text-red-600 mb-2">Unable to load order status</h3>
        <p className="text-sm text-slate-500 mb-4">{error.message || 'Order could not be retrieved.'}</p>
        <Link href="/orders" className="text-orange-600 font-semibold hover:underline">
          &larr; Back to all orders
        </Link>
      </div>
    );
  }

  const currentOrder = order || initialOrder;
  const isCancelled = currentOrder?.status === 'cancelled';

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 border border-slate-100 dark:border-slate-800 shadow-sm">
      {/* Polling Header Indicator */}
      <div className="flex items-center justify-between pb-6 border-b border-slate-100 dark:border-slate-800">
        <div>
          <span className="text-xs uppercase tracking-wider font-semibold text-slate-400">Live Status Tracking</span>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mt-1">
            Order #{currentOrder.id}
          </h2>
        </div>

        {/* Polling pulse indicator */}
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full text-xs font-medium text-slate-600 dark:text-slate-300">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Polling live (every 5s)</span>
          {isValidating && <span className="text-orange-600 text-[10px] ml-1">syncing…</span>}
        </div>
      </div>

      {/* Status Progress Display */}
      <div className="py-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-slate-500">Status</span>
          <span
            className={`text-sm px-3 py-1 rounded-full font-bold uppercase tracking-wide ${
              isCancelled
                ? 'bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-400'
                : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400'
            }`}
          >
            {currentOrder.status}
          </span>
        </div>

        <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ${
              isCancelled
                ? 'bg-red-500 w-full'
                : currentOrder.status === 'confirmed'
                ? 'bg-orange-500 w-1/3'
                : currentOrder.status === 'preparing'
                ? 'bg-amber-500 w-2/3'
                : 'bg-emerald-500 w-full'
            }`}
          />
        </div>
      </div>

      {/* Order Summary Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-100 dark:border-slate-800 text-sm">
        <div>
          <h4 className="font-semibold text-slate-800 dark:text-white mb-2">Customer & Destination</h4>
          <p className="text-slate-600 dark:text-slate-300">{currentOrder.name} ({currentOrder.phone})</p>
          <p className="text-slate-500 dark:text-slate-400 text-xs mt-1 capitalize">{currentOrder.area} — {currentOrder.address}</p>
          {currentOrder.notes && (
            <p className="text-xs italic text-slate-400 mt-2">&quot;{currentOrder.notes}&quot;</p>
          )}
        </div>

        <div>
          <h4 className="font-semibold text-slate-800 dark:text-white mb-2">Items Ordered</h4>
          <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
            {currentOrder.items?.map((item, idx) => (
              <li key={idx} className="flex justify-between">
                <span>{item.quantity}x {item.name}</span>
                <span className="font-medium text-slate-800 dark:text-slate-200">{item.price * item.quantity} ETB</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between items-center pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 font-bold">
            <span className="text-slate-800 dark:text-white">Total</span>
            <span className="text-orange-600 text-base">{currentOrder.total} ETB</span>
          </div>
        </div>
      </div>

      <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <Link href="/orders" className="text-xs text-slate-500 hover:text-orange-600 font-medium">
          &larr; Back to all orders
        </Link>
        <CancelOrderButton orderId={currentOrder.id} isCancelled={isCancelled} />
      </div>
    </div>
  );
}
