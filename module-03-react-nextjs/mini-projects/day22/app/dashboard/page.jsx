import React from 'react';
import Link from 'next/link';
import {
  aggregateRevenueByNeighbourhood,
  aggregateOrdersByDay,
  getPagedAndSortedOrders
} from '@/data/orderStore';
import RevenueBarChart from '@/components/dashboard/RevenueBarChart';
import OrdersLineChart from '@/components/dashboard/OrdersLineChart';
import OrderDataTable from '@/components/dashboard/OrderDataTable';

export const metadata = {
  title: 'Operations Dashboard | Addis Eats',
  description: 'Aggregated revenue by neighbourhood, daily order volumes, and order ledger.'
};

/**
 * Exercise 1:
 * Server Component performing data aggregation on the server.
 * Only small summary objects (5-10 rows) cross the network boundary to client charts.
 * 
 * Supports the 4 Demonstrable States:
 * 1. Populated: default live view
 * 2. Empty: /dashboard?state=empty
 * 3. Error: /dashboard?state=error (handled by app/dashboard/error.jsx)
 * 4. Loading: app/dashboard/loading.jsx
 */
export default async function DashboardPage({ searchParams }) {
  const params = await searchParams;
  const state = params?.state || 'default';

  // State 2 Demonstration: Force error state
  if (state === 'error') {
    throw new Error('Forced simulation of server dashboard aggregation failure.');
  }

  const isForceEmpty = state === 'empty';

  // Server-side aggregations: Only summary objects cross to client components
  const neighbourhoodRevenue = isForceEmpty ? [] : aggregateRevenueByNeighbourhood();
  const dailyOrders = isForceEmpty ? [] : aggregateOrdersByDay();

  // Paged and sorted table data
  const page = parseInt(params?.page, 10) || 1;
  const sort = params?.sort || 'createdAt';
  const order = params?.order || 'desc';

  const { orders, totalOrders, totalPages, currentPage } = getPagedAndSortedOrders({
    page,
    limit: 5,
    sort,
    order,
    forceEmpty: isForceEmpty
  });

  // Calculate top-level summary metrics
  const totalRevenue = neighbourhoodRevenue.reduce((acc, curr) => acc + curr.revenue, 0);
  const totalCompletedOrders = dailyOrders.reduce((acc, curr) => acc + curr.count, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Dashboard Top Header */}
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-stone-200 dark:border-stone-800">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 mb-2">
            Operations & Analytics
          </div>
          <h1 className="text-3xl font-extrabold text-stone-900 dark:text-stone-100 tracking-tight">
            Addis Eats Executive Dashboard
          </h1>
          <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
            Server-aggregated revenue by neighbourhood and daily order volumes.
          </p>
        </div>

        {/* State Switcher Demonstrator (Interactive Testing Toolbar) */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-stone-100 dark:bg-stone-800/80 rounded-lg text-xs font-medium">
          <span className="text-stone-500 dark:text-stone-400 px-2 font-mono">Force State:</span>
          <Link
            href="/dashboard"
            className={`px-3 py-1 rounded transition-colors ${
              state === 'default'
                ? 'bg-white dark:bg-stone-700 text-amber-700 dark:text-amber-300 shadow-xs font-bold'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            Populated
          </Link>
          <Link
            href="/dashboard?state=empty"
            className={`px-3 py-1 rounded transition-colors ${
              state === 'empty'
                ? 'bg-white dark:bg-stone-700 text-amber-700 dark:text-amber-300 shadow-xs font-bold'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            Empty
          </Link>
          <Link
            href="/dashboard?state=error"
            className="px-3 py-1 rounded text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
          >
            Error
          </Link>
        </div>
      </header>

      {/* Summary KPI Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4" aria-label="Key Performance Indicators">
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-5 shadow-xs">
          <span className="text-xs font-medium text-stone-500 uppercase tracking-wider">Total Revenue</span>
          <div className="mt-2 text-2xl font-black text-amber-700 dark:text-amber-400 font-mono">
            {totalRevenue.toLocaleString()} ETB
          </div>
          <span className="text-xs text-stone-500 mt-1 block">Past 14 Days Aggregation</span>
        </div>

        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-5 shadow-xs">
          <span className="text-xs font-medium text-stone-500 uppercase tracking-wider">Orders Processed</span>
          <div className="mt-2 text-2xl font-black text-stone-900 dark:text-stone-100 font-mono">
            {totalCompletedOrders}
          </div>
          <span className="text-xs text-stone-500 mt-1 block">Across all 7 neighbourhoods</span>
        </div>

        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-5 shadow-xs">
          <span className="text-xs font-medium text-stone-500 uppercase tracking-wider">Average Ticket</span>
          <div className="mt-2 text-2xl font-black text-stone-900 dark:text-stone-100 font-mono">
            {totalCompletedOrders > 0 ? Math.round(totalRevenue / totalCompletedOrders).toLocaleString() : 0} ETB
          </div>
          <span className="text-xs text-stone-500 mt-1 block">Per customer order</span>
        </div>
      </section>

      {/* The Two Charts Grid (Client leaves on Server page) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chart 1: Revenue by Neighbourhood */}
        <RevenueBarChart data={neighbourhoodRevenue} />

        {/* Chart 2: Daily Order Volume */}
        <OrdersLineChart data={dailyOrders} />
      </div>

      {/* Paged and Sorted Semantic Orders Table */}
      <OrderDataTable
        orders={orders}
        totalOrders={totalOrders}
        totalPages={totalPages}
        currentPage={currentPage}
        currentSort={sort}
        currentOrder={order}
      />
    </div>
  );
}
