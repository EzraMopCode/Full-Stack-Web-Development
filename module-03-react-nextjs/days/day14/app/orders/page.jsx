import Link from 'next/link';
import { getOrders } from '@/data/orderStore';
import CancelOrderButton from '@/components/CancelOrderButton';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Orders | Addis Eats',
  description: 'View active and past orders'
};

export default async function OrdersPage() {
  const orders = getOrders();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 font-sans transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Orders Management</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Real-time server component cache revalidated via <code className="text-orange-600 bg-orange-50 dark:bg-orange-950/50 px-1.5 py-0.5 rounded">revalidatePath(&apos;/orders&apos;)</code>
            </p>
          </div>
          <Link
            href="/menu"
            className="inline-flex items-center justify-center px-4 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-xl text-sm transition-colors shadow-sm"
          >
            Order More Dishes &rarr;
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-100 dark:border-slate-800 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">No orders recorded yet</h3>
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
                        <span className="font-mono font-bold text-base text-slate-900 dark:text-white">
                          Order #{order.id}
                        </span>
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
                        Placed by <span className="font-semibold text-slate-600 dark:text-slate-300">{order.name}</span> ({order.phone}) · Owner ID: <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">{order.userId}</code>
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-xs text-slate-400 block">Total Amount</span>
                      <span className="text-lg font-bold text-orange-600 dark:text-orange-500">
                        {order.total} ETB
                      </span>
                    </div>
                  </div>

                  <div className="py-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-600 dark:text-slate-400">
                    <div>
                      <span className="font-medium text-slate-800 dark:text-slate-200">Delivery Address:</span>
                      <p className="text-xs mt-0.5 capitalize">{order.area} — {order.address}</p>
                      {order.notes && (
                        <p className="text-xs italic text-slate-500 mt-1">&quot;{order.notes}&quot;</p>
                      )}
                    </div>
                    <div>
                      <span className="font-medium text-slate-800 dark:text-slate-200">Items:</span>
                      <ul className="text-xs space-y-1 mt-0.5">
                        {order.items?.map((item, idx) => (
                          <li key={idx} className="flex justify-between">
                            <span>{item.quantity}x {item.name}</span>
                            <span>{item.price * item.quantity} ETB</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-xs text-slate-400">Payment: <strong className="uppercase text-slate-600 dark:text-slate-300">{order.paymentMethod}</strong></span>
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
