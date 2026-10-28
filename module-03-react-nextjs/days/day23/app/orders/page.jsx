import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getOrdersByUserId } from '@/data/orderStore';
import { getSession } from '@/lib/session';
import CancelOrderButton from '@/components/CancelOrderButton';
import CsvExportButton from '@/components/CsvExportButton';
import { etb, when, relative } from '@/lib/format';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Your Orders | Addis Eats',
  description: 'View authenticated user orders and live courier tracking'
};

export default async function OrdersPage() {
  // Requirement: Every private page verifying the session while rendering
  const session = await getSession();
  if (!session) {
    redirect('/login?next=/orders');
  }

  // Requirement: Queries strictly scoped to session.userId (prevents IDOR attacks)
  const orders = getOrdersByUserId(session.userId, session.role);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 font-sans transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Bar with CSV Export */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-stone-200 dark:border-stone-800">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Your Orders</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Signed in as <strong className="text-slate-700 dark:text-slate-200">{session.name}</strong> ({session.role}) · Account: <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">{session.userId}</code>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Exercise 7 Requirement: CSV Export Button */}
            <CsvExportButton orders={orders} />

            {session.role === 'staff' && (
              <Link
                href="/kitchen"
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-xl text-xs transition-colors shadow-sm"
              >
                Kitchen Dashboard &rarr;
              </Link>
            )}
            <Link
              href="/menu"
              className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-xl text-xs transition-colors shadow-sm"
            >
              Order Dishes &rarr;
            </Link>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-100 dark:border-slate-800 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">No orders recorded for your account</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">Explore our menu and place your first authentic meal order!</p>
            <Link
              href="/menu"
              className="px-6 py-3 bg-orange-600 text-white font-semibold rounded-xl inline-block"
            >
              Browse Menu
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const isCancelled = order.status === 'cancelled';
              return (
                <div
                  key={order.id}
                  className={`bg-white dark:bg-slate-900 rounded-2xl p-6 border transition-all shadow-sm ${
                    isCancelled
                      ? 'border-red-200/60 dark:border-red-900/30 opacity-75'
                      : 'border-slate-100 dark:border-slate-800'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                    <div>
                      <div className="flex items-center gap-3">
                        <Link
                          href={`/orders/${order.id}`}
                          className="font-mono font-bold text-base text-orange-600 hover:underline"
                        >
                          Order #{order.id}
                        </Link>
                        <span
                          className={`text-xs px-2.5 py-0.5 rounded-full font-semibold uppercase tracking-wider ${
                            isCancelled
                              ? 'bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400'
                              : 'bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400'
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">
                        Placed {when(order.createdAt)} ({relative(order.createdAt)}) · {order.name} ({order.phone})
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-xs text-slate-400 block">Total Amount</span>
                      <span className="text-lg font-bold text-orange-600 dark:text-orange-500 font-mono">
                        {etb(order.total, true)}
                      </span>
                    </div>
                  </div>

                  <div className="py-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-600 dark:text-slate-400">
                    <div>
                      <span className="font-medium text-slate-800 dark:text-slate-200">Delivery Address:</span>
                      <p className="text-xs mt-0.5 capitalize">{order.area} — {order.address}</p>
                      {order.notes && (
                        <p className="text-xs text-stone-500 mt-1 italic">Note: &ldquo;{order.notes}&rdquo;</p>
                      )}
                    </div>
                    <div>
                      <span className="font-medium text-slate-800 dark:text-slate-200">Items:</span>
                      <ul className="text-xs space-y-1 mt-0.5">
                        {order.items?.map((item, idx) => (
                          <li key={idx} className="flex justify-between">
                            <span>{item.quantity}x {item.name}</span>
                            <span className="font-mono">{etb(item.price * item.quantity)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/orders/${order.id}`}
                        className="text-xs font-semibold text-stone-600 dark:text-stone-300 hover:text-amber-600"
                      >
                        Order Summary &rarr;
                      </Link>
                      <Link
                        href={`/orders/${order.id}/tracking`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 text-xs font-bold transition-colors"
                      >
                        <span>🛵</span> Track Live Courier (SSE Map) &rarr;
                      </Link>
                    </div>
                    <CancelOrderButton orderId={order.id} isCancelled={isCancelled} />
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
