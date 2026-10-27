import Link from 'next/link';
import { getOrders } from '@/data/orderStore';
import { getSession } from '@/lib/session';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Kitchen Dashboard | Addis Eats Staff',
  description: 'Staff-only kitchen order processing.'
};

export default async function KitchenPage() {
  // Requirement 7: Checked server-side rather than in the markup!
  const session = await getSession();

  if (!session || session.role !== 'staff') {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 text-center font-sans">
        <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white mb-2">403 — Forbidden</h1>
        <p className="text-slate-500 max-w-md mb-6">
          Access Denied: The kitchen dashboard is strictly restricted to staff members with the <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">staff</code> role.
        </p>
        <Link href="/login" className="px-6 py-2.5 bg-orange-600 text-white font-semibold rounded-xl text-sm">
          Sign In as Staff (chef / kitchen123)
        </Link>
      </div>
    );
  }

  const allOrders = getOrders();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 font-sans transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Kitchen Order Queue</h1>
              <span className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                Staff Only
              </span>
            </div>
            <p className="text-sm text-slate-500 mt-1">
              Logged in as <strong className="text-slate-700 dark:text-slate-200">{session.name}</strong> · Role: <code className="text-xs bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 px-1 py-0.5 rounded">{session.role}</code>
            </p>
          </div>

          <Link
            href="/orders"
            className="px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            &larr; Customer View
          </Link>
        </div>

        {/* Kitchen Ticket Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span className="font-mono font-bold text-lg text-slate-900 dark:text-white">
                    #{order.id}
                  </span>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase ${
                    order.status === 'cancelled' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {order.status}
                  </span>
                </div>

                <p className="text-xs text-slate-500 mb-4">
                  For: <strong>{order.name}</strong> ({order.phone})
                </p>

                <div className="border-t border-b border-slate-100 dark:border-slate-800 py-3 my-3">
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Ticket Items</h4>
                  <ul className="text-xs space-y-1.5 text-slate-700 dark:text-slate-300">
                    {order.items?.map((item, idx) => (
                      <li key={idx} className="flex justify-between">
                        <span><strong>{item.quantity}x</strong> {item.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {order.notes && (
                  <p className="text-xs italic text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/30 p-2.5 rounded-lg mb-4">
                    Special notes: &quot;{order.notes}&quot;
                  </p>
                )}
              </div>

              <div className="pt-2 text-right">
                <span className="text-xs text-slate-400">Total: {order.total} ETB</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
