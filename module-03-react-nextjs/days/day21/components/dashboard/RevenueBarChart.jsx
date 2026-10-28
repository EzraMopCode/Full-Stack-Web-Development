'use client';

import React from 'react';

/**
 * Exercise 2 & 4:
 * Revenue Bar Chart with fixed-height container, ETB tick formatting,
 * zero-based Y-axis, readable without color (using contrast, distinct hatch/stripe SVG patterns, and direct data labels),
 * accompanied by an accessible HTML table beneath it.
 */
export default function RevenueBarChart({ data = [] }) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-6 text-center text-stone-500">
        No revenue data to display.
      </div>
    );
  }

  // Calculate scales (Y-axis strictly starts at 0)
  const maxRevenue = Math.max(...data.map(d => d.revenue), 1000);
  const roundedMax = Math.ceil(maxRevenue / 1000) * 1000;
  const ticks = [0, Math.round(roundedMax * 0.25), Math.round(roundedMax * 0.5), Math.round(roundedMax * 0.75), roundedMax];

  const chartHeight = 240;
  const chartWidth = 560;
  const paddingLeft = 70;
  const paddingBottom = 40;
  const paddingTop = 20;
  const paddingRight = 20;

  const innerWidth = chartWidth - paddingLeft - paddingRight;
  const innerHeight = chartHeight - paddingTop - paddingBottom;
  const barWidth = Math.max(24, Math.floor((innerWidth / data.length) * 0.6));
  const step = innerWidth / data.length;

  return (
    <section className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-6 shadow-sm">
      <header className="mb-4">
        <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
          Revenue by Neighbourhood (Last 14 Days, in ETB)
        </h3>
        <p className="text-xs text-stone-500 dark:text-stone-400">
          Fixed-height SVG container · Y-axis starts strictly at 0 · Patterned fills for black-and-white readability
        </p>
      </header>

      {/* Fixed height container (h-72 = 288px) */}
      <div className="h-72 w-full flex items-center justify-center overflow-x-auto">
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="w-full h-full max-w-xl select-none"
          role="img"
          aria-label="Bar chart showing revenue by neighbourhood in Ethiopian Birr"
        >
          <defs>
            {/* High-contrast diagonal stripe pattern for color-blind / print readability */}
            <pattern id="hatch-bole" width="6" height="6" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="6" stroke="#b45309" strokeWidth="2.5" />
            </pattern>
            <pattern id="hatch-other" width="6" height="6" patternTransform="rotate(-45 0 0)" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="6" stroke="#44403c" strokeWidth="2" />
            </pattern>
          </defs>

          {/* Grid lines and ETB Y-axis ticks */}
          {ticks.map((tick, i) => {
            const y = paddingTop + innerHeight - (tick / roundedMax) * innerHeight;
            return (
              <g key={i}>
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={chartWidth - paddingRight}
                  y2={y}
                  stroke="#e7e5e4"
                  strokeDasharray="3 3"
                  className="dark:stroke-stone-800"
                />
                <text
                  x={paddingLeft - 8}
                  y={y + 4}
                  textAnchor="end"
                  className="text-[11px] fill-stone-500 dark:fill-stone-400 font-mono"
                >
                  {tick.toLocaleString()} ETB
                </text>
              </g>
            );
          })}

          {/* X and Y Axis lines */}
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

          {/* Bars */}
          {data.map((item, index) => {
            const barHeight = (item.revenue / roundedMax) * innerHeight;
            const x = paddingLeft + index * step + (step - barWidth) / 2;
            const y = paddingTop + innerHeight - barHeight;

            return (
              <g key={item.area} className="group">
                {/* Visual bar with border and patterned fill */}
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  fill={index === 0 ? 'url(#hatch-bole)' : 'url(#hatch-other)'}
                  stroke="#1c1917"
                  strokeWidth="1.5"
                  rx="3"
                />
                {/* Direct value label above bar */}
                <text
                  x={x + barWidth / 2}
                  y={y - 5}
                  textAnchor="middle"
                  className="text-[10px] font-bold fill-stone-900 dark:fill-stone-100 font-mono"
                >
                  {item.revenue}
                </text>
                {/* Neighbourhood label */}
                <text
                  x={x + barWidth / 2}
                  y={chartHeight - 12}
                  textAnchor="middle"
                  className="text-[11px] font-medium fill-stone-700 dark:fill-stone-300"
                >
                  {item.area}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Exercise 4 Requirement: Data table beneath the chart for accessibility & screen readers */}
      <div className="mt-4 pt-4 border-t border-stone-100 dark:border-stone-800">
        <details className="text-xs text-stone-600 dark:text-stone-400">
          <summary className="cursor-pointer font-medium hover:text-amber-600 focus:outline-none focus:ring-1 focus:ring-amber-500 rounded p-1">
            View Table Representation of Revenue Data
          </summary>
          <div className="mt-2 overflow-x-auto">
            <table className="min-w-full divide-y divide-stone-200 dark:divide-stone-800 text-left">
              <caption className="sr-only">Revenue by Neighbourhood tabular summary</caption>
              <thead>
                <tr>
                  <th scope="col" className="py-2 px-3 font-semibold text-stone-900 dark:text-stone-100">Neighbourhood</th>
                  <th scope="col" className="py-2 px-3 font-semibold text-stone-900 dark:text-stone-100">Orders</th>
                  <th scope="col" className="py-2 px-3 font-semibold text-stone-900 dark:text-stone-100 text-right">Revenue (ETB)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                {data.map((row) => (
                  <tr key={row.area}>
                    <td className="py-1.5 px-3">{row.area}</td>
                    <td className="py-1.5 px-3">{row.ordersCount}</td>
                    <td className="py-1.5 px-3 text-right font-mono font-medium">{row.revenue.toLocaleString()} ETB</td>
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
