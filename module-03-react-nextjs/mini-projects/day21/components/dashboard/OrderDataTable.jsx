import React from 'react';
import Link from 'next/link';

/**
 * Exercise 5, 6 & 7:
 * Accessible Order Table built strictly from <table>, <caption>, <thead>, and <th scope="col"> (NO DIVS).
 * - Right-aligned monetary totals with ETB currency
 * - Sorting via URL searchParams with aria-sort on active column header
 * - Paging using Next.js <Link> elements
 * - Clean structure that survives direct clipboard copying into Excel/Google Sheets
 */
export default function OrderDataTable({
  orders = [],
  totalOrders = 0,
  totalPages = 1,
  currentPage = 1,
  currentSort = 'createdAt',
  currentOrder = 'desc'
}) {
  // Helper to build sort links that toggle ascending/descending
  function getSortHref(field) {
    const isCurrent = currentSort === field;
    const nextOrder = isCurrent && currentOrder === 'asc' ? 'desc' : 'asc';
    return `/dashboard?page=1&sort=${field}&order=${nextOrder}`;
  }

  // Helper to build page links preserving sort & order
  function getPageHref(page) {
    return `/dashboard?page=${page}&sort=${currentSort}&order=${currentOrder}`;
  }

  function getAriaSort(field) {
    if (currentSort !== field) return 'none';
    return currentOrder === 'asc' ? 'ascending' : 'descending';
  }

  function getSortIndicator(field) {
    if (currentSort !== field) return ' ↕';
    return currentOrder === 'asc' ? ' ▲' : ' ▼';
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-8 text-center">
        <h4 className="text-base font-semibold text-stone-800 dark:text-stone-200">No Orders Recorded</h4>
        <p className="text-sm text-stone-500 mt-1">
          When customer orders are submitted, they will appear in this paged and sorted ledger.
        </p>
      </div>
    );
  }

  return (
    <section className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl shadow-sm overflow-hidden">
      <div className="p-4 sm:p-6 border-b border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
            Order History Ledger
          </h3>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Showing {orders.length} of {totalOrders} total orders · Sortable by clicking column headers
          </p>
        </div>
        <div className="text-xs font-mono text-stone-600 dark:text-stone-400 bg-stone-100 dark:bg-stone-800 px-3 py-1.5 rounded-md self-start sm:self-auto">
          Sorted by: <span className="font-bold text-amber-700 dark:text-amber-400">{currentSort} ({currentOrder})</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        {/* Semantic HTML Table */}
        <table className="min-w-full divide-y divide-stone-200 dark:divide-stone-800 border-collapse text-left text-sm">
          <caption className="sr-only">
            Addis Eats customer orders table with sorting and pagination
          </caption>
          <thead className="bg-stone-50 dark:bg-stone-800/60 text-xs uppercase tracking-wider text-stone-600 dark:text-stone-400">
            <tr>
              <th
                scope="col"
                aria-sort={getAriaSort('id')}
                className="py-3 px-4 font-semibold hover:bg-stone-100 dark:hover:bg-stone-800"
              >
                <Link href={getSortHref('id')} className="inline-flex items-center gap-1 focus:outline-none focus:underline">
                  Order ID
                  <span aria-hidden="true">{getSortIndicator('id')}</span>
                </Link>
              </th>
              <th
                scope="col"
                aria-sort={getAriaSort('name')}
                className="py-3 px-4 font-semibold hover:bg-stone-100 dark:hover:bg-stone-800"
              >
                <Link href={getSortHref('name')} className="inline-flex items-center gap-1 focus:outline-none focus:underline">
                  Customer
                  <span aria-hidden="true">{getSortIndicator('name')}</span>
                </Link>
              </th>
              <th
                scope="col"
                aria-sort={getAriaSort('area')}
                className="py-3 px-4 font-semibold hover:bg-stone-100 dark:hover:bg-stone-800"
              >
                <Link href={getSortHref('area')} className="inline-flex items-center gap-1 focus:outline-none focus:underline">
                  Neighbourhood
                  <span aria-hidden="true">{getSortIndicator('area')}</span>
                </Link>
              </th>
              <th
                scope="col"
                aria-sort={getAriaSort('status')}
                className="py-3 px-4 font-semibold hover:bg-stone-100 dark:hover:bg-stone-800"
              >
                <Link href={getSortHref('status')} className="inline-flex items-center gap-1 focus:outline-none focus:underline">
                  Status
                  <span aria-hidden="true">{getSortIndicator('status')}</span>
                </Link>
              </th>
              <th
                scope="col"
                aria-sort={getAriaSort('createdAt')}
                className="py-3 px-4 font-semibold hover:bg-stone-100 dark:hover:bg-stone-800"
              >
                <Link href={getSortHref('createdAt')} className="inline-flex items-center gap-1 focus:outline-none focus:underline">
                  Date
                  <span aria-hidden="true">{getSortIndicator('createdAt')}</span>
                </Link>
              </th>
              <th
                scope="col"
                aria-sort={getAriaSort('total')}
                className="py-3 px-4 font-semibold text-right hover:bg-stone-100 dark:hover:bg-stone-800"
              >
                <Link href={getSortHref('total')} className="inline-flex items-center justify-end gap-1 focus:outline-none focus:underline w-full">
                  Total (ETB)
                  <span aria-hidden="true">{getSortIndicator('total')}</span>
                </Link>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100 dark:divide-stone-800/80 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-stone-50/80 dark:hover:bg-stone-800/40 transition-colors">
                <td className="py-3 px-4 font-mono font-medium text-amber-700 dark:text-amber-400">
                  #{order.id}
                </td>
                <td className="py-3 px-4 font-medium">
                  {order.name}
                </td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                    {order.area}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${
                    order.status === 'delivered'
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300'
                      : order.status === 'preparing'
                      ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300'
                      : 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="py-3 px-4 font-mono text-xs text-stone-500 dark:text-stone-400">
                  {order.createdAt ? order.createdAt.split('T')[0] : '—'}
                </td>
                {/* Exercise 5 Requirement: Right-aligned totals */}
                <td className="py-3 px-4 text-right font-mono font-bold text-stone-900 dark:text-stone-100">
                  {Number(order.total).toLocaleString()} ETB
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Exercise 7 Requirement: Paging with Link elements */}
      <footer className="p-4 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-xs">
        <div className="text-stone-500 dark:text-stone-400">
          Page <span className="font-bold text-stone-800 dark:text-stone-200">{currentPage}</span> of{' '}
          <span className="font-bold text-stone-800 dark:text-stone-200">{totalPages}</span>
        </div>

        <nav aria-label="Order pagination" className="flex items-center gap-1">
          {currentPage > 1 ? (
            <Link
              href={getPageHref(currentPage - 1)}
              className="px-3 py-1.5 border border-stone-300 dark:border-stone-700 rounded-md font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              ← Previous
            </Link>
          ) : (
            <span className="px-3 py-1.5 border border-stone-200 dark:border-stone-800 rounded-md text-stone-400 cursor-not-allowed">
              ← Previous
            </span>
          )}

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
            const isCurrent = p === currentPage;
            return (
              <Link
                key={p}
                href={getPageHref(p)}
                aria-current={isCurrent ? 'page' : undefined}
                className={`px-3 py-1.5 rounded-md font-mono font-medium ${
                  isCurrent
                    ? 'bg-amber-600 text-white font-bold'
                    : 'border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                }`}
              >
                {p}
              </Link>
            );
          })}

          {currentPage < totalPages ? (
            <Link
              href={getPageHref(currentPage + 1)}
              className="px-3 py-1.5 border border-stone-300 dark:border-stone-700 rounded-md font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              Next →
            </Link>
          ) : (
            <span className="px-3 py-1.5 border border-stone-200 dark:border-stone-800 rounded-md text-stone-400 cursor-not-allowed">
              Next →
            </span>
          )}
        </nav>
      </footer>
    </section>
  );
}
