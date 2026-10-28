'use client';

import React from 'react';

/**
 * Exercise 3 & 4:
 * Orders-per-day line chart with fixed-height container,
 * explicit heading naming the date range and unit ('in Orders'),
 * high-contrast markers readable without color, and an accessible table underneath.
 */
export default function OrdersLineChart({ data = [] }) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-6 text-center text-stone-500">
        No daily orders data to display.
      </div>
    );
  }

  const maxOrders = Math.max(...data.map(d => d.count), 5);
  const chartHeight = 240;
  const chartWidth = 560;
  const paddingLeft = 50;
  const paddingBottom = 40;
  const paddingTop = 25;
  const paddingRight = 30;

  const innerWidth = chartWidth - paddingLeft - paddingRight;
  const innerHeight = chartHeight - paddingTop - paddingBottom;
  const step = data.length > 1 ? innerWidth / (data.length - 1) : innerWidth;

  // Build coordinate points
  const points = data.map((item, index) => {
    const x = paddingLeft + index * step;
    const y = paddingTop + innerHeight - (item.count / maxOrders) * innerHeight;
    return { x, y, count: item.count, date: item.date };
  });

  const pathD = points.reduce((acc, curr, idx) => {
    return `${acc} ${idx === 0 ? 'M' : 'L'} ${curr.x} ${curr.y}`;
  }, '');

  // Ticks for Y axis (starting at 0)
  const ticks = [0, Math.ceil(maxOrders * 0.33), Math.ceil(maxOrders * 0.66), maxOrders];

  return (
    <section className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-6 shadow-sm">
      <header className="mb-4">
        <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
          Orders Over Time (Oct 22 - Oct 28, in Orders)
        </h3>
        <p className="text-xs text-stone-500 dark:text-stone-400">
          Unit: Total Completed and In-flight Orders · Visible without colour via geometric dot markers & direct counts
        </p>
      </header>

      {/* Fixed height container (h-72 = 288px) */}
      <div className="h-72 w-full flex items-center justify-center overflow-x-auto">
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="w-full h-full max-w-xl select-none"
          role="img"
          aria-label="Line chart showing orders per day in orders unit"
        >
          {/* Y Axis Grid lines */}
          {ticks.map((tick, i) => {
            const y = paddingTop + innerHeight - (tick / maxOrders) * innerHeight;
            return (
              <g key={i}>
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={chartWidth - paddingRight}
                  y2={y}
                  stroke="#e7e5e4"
                  strokeDasharray="2 2"
                  className="dark:stroke-stone-800"
                />
                <text
                  x={paddingLeft - 8}
                  y={y + 4}
                  textAnchor="end"
                  className="text-[11px] fill-stone-500 dark:fill-stone-400 font-mono"
                >
                  {tick}
                </text>
              </g>
            );
          })}

          {/* Axes */}
          <line
            x1={paddingLeft}
            y1={paddingTop + innerHeight}
            x2={chartWidth - paddingRight}
            y2={paddingTop + innerHeight}
            stroke="#78716c"
            strokeWidth="1.5"
          />
          <line
            x1={paddingLeft}
            y1={paddingTop}
            x2={paddingLeft}
            y2={paddingTop + innerHeight}
            stroke="#78716c"
            strokeWidth="1.5"
          />

          {/* Line path with distinct stroke */}
          <path
            d={pathD}
            fill="none"
            stroke="#b45309"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data Points with geometric markers + direct labels */}
          {points.map((pt, index) => (
            <g key={pt.date}>
              <circle
                cx={pt.x}
                cy={pt.y}
                r="5"
                fill="#ffffff"
                stroke="#b45309"
                strokeWidth="2.5"
              />
              {/* Text label with exact count */}
              <text
                x={pt.x}
                y={pt.y - 10}
                textAnchor="middle"
                className="text-[10px] font-bold fill-stone-900 dark:fill-stone-100 font-mono"
              >
                {pt.count}
              </text>
              {/* Date label */}
              <text
                x={pt.x}
                y={chartHeight - 12}
                textAnchor="middle"
                className="text-[10px] font-medium fill-stone-600 dark:fill-stone-400"
              >
                {pt.date.slice(5)}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* Exercise 4 Requirement: Data table beneath chart */}
      <div className="mt-4 pt-4 border-t border-stone-100 dark:border-stone-800">
        <details className="text-xs text-stone-600 dark:text-stone-400">
          <summary className="cursor-pointer font-medium hover:text-amber-600 focus:outline-none focus:ring-1 focus:ring-amber-500 rounded p-1">
            View Table Representation of Daily Orders Data
          </summary>
          <div className="mt-2 overflow-x-auto">
            <table className="min-w-full divide-y divide-stone-200 dark:divide-stone-800 text-left">
              <caption className="sr-only">Orders per Day tabular summary</caption>
              <thead>
                <tr>
                  <th scope="col" className="py-2 px-3 font-semibold text-stone-900 dark:text-stone-100">Date</th>
                  <th scope="col" className="py-2 px-3 font-semibold text-stone-900 dark:text-stone-100 text-right">Order Count</th>
                  <th scope="col" className="py-2 px-3 font-semibold text-stone-900 dark:text-stone-100 text-right">Revenue (ETB)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                {data.map((row) => (
                  <tr key={row.date}>
                    <td className="py-1.5 px-3 font-mono">{row.date}</td>
                    <td className="py-1.5 px-3 text-right font-medium">{row.count} orders</td>
                    <td className="py-1.5 px-3 text-right font-mono">{row.revenue.toLocaleString()} ETB</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
      </div>
    </section>
  );
}
