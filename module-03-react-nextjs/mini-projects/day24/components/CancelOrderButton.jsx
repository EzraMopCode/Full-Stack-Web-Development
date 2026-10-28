'use client';

import { useState, useTransition } from 'react';
import { cancelOrder } from '../actions/orderActions';

/**
 * Hardened for Day 23:
 * - Minimum touch target >= 44px
 * - Visible focus rings
 * - Accessible disabled states while action pending
 */
export default function CancelOrderButton({ orderId, isCancelled }) {
  const [isPending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState(null);

  const handleCancel = (targetId) => {
    setFeedback(null);
    startTransition(async () => {
      const result = await cancelOrder(targetId);
      if (result.success) {
        setFeedback({ type: 'success', message: result.message });
      } else {
        setFeedback({ type: 'error', message: `${result.error}: ${result.message}` });
      }
    });
  };

  if (isCancelled) {
    return (
      <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-semibold bg-red-100 dark:bg-red-950/50 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-900">
        Cancelled
      </span>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <button
          onClick={() => handleCancel(orderId)}
          disabled={isPending}
          className="min-h-[44px] px-4 py-2 text-xs font-bold rounded-xl bg-red-600 hover:bg-red-700 text-white transition-colors disabled:opacity-50 cursor-pointer shadow-sm flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          {isPending ? 'Cancelling...' : 'Cancel Order'}
        </button>

        {/* Security verification test button: attempts to cancel with someone else's order ID */}
        <button
          onClick={() => handleCancel('unauthorized_foreign_order_999')}
          disabled={isPending}
          title="Tests server-side authorization check (Simulates console/attacker attack)"
          className="min-h-[44px] px-3.5 py-2 text-xs font-medium rounded-xl border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-slate-500"
        >
          Test Hack (Spoof ID)
        </button>
      </div>

      {feedback && (
        <p className={`text-xs font-medium ${feedback.type === 'success' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
          {feedback.message}
        </p>
      )}
    </div>
  );
}
