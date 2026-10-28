import { etb } from '@/lib/format';

export default function DepartmentRevenueChart({ data = [] }) {
  const maxRevenue = Math.max(...data.map((d) => d.revenueETB), 8000);
  const totalRevenue = data.reduce((acc, curr) => acc + curr.revenueETB, 0);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-100 dark:border-slate-800 shadow-sm space-y-6">
      
      {/* Chart Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Revenue by Clinical Specialty
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Range: Active Clinical Cycle · Unit: Ethiopian Birr (ETB)
          </p>
        </div>
        <div className="text-right">
          <span className="text-xs text-slate-400 block font-semibold uppercase">Total Specialty Revenue</span>
          <span className="text-xl font-bold text-teal-700 dark:text-teal-400 font-mono">
            {etb(totalRevenue, true)}
          </span>
        </div>
      </div>

      {/* SVG Bar Chart with Fixed Height Container (288px = h-72) */}
      <div className="h-72 w-full relative">
        <svg
          viewBox="0 0 600 240"
          className="w-full h-full overflow-visible"
          role="img"
          aria-label="Bar chart showing consultation revenue by medical specialty in Ethiopian Birr"
        >
          <defs>
            {/* Diagonal Hatch Pattern for No-Color Accessibility */}
            <pattern id="diag-teal-pattern" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="8" stroke="#0d9488" strokeWidth="2.5" />
            </pattern>
            <pattern id="diag-slate-pattern" width="8" height="8" patternTransform="rotate(-45 0 0)" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="8" stroke="#64748b" strokeWidth="2" />
            </pattern>
          </defs>

          {/* Zero-Based Y-Axis Grid Lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => {
            const y = 200 - pct * 180;
            const val = Math.round(maxRevenue * pct);
            return (
              <g key={i}>
                <line x1="55" y1={y} x2="585" y2={y} stroke="#e2e8f0" strokeDasharray="3 3" />
                <text x="50" y={y + 4} textAnchor="end" className="text-[10px] fill-slate-400 font-mono">
                  {val.toLocaleString()}
                </text>
              </g>
            );
          })}

          {/* Baseline */}
          <line x1="55" y1="200" x2="585" y2="200" stroke="#94a3b8" strokeWidth="1.5" />

          {/* Department Bars */}
          {data.map((item, index) => {
            const barWidth = 52;
            const gap = (530 - data.length * barWidth) / (data.length + 1);
            const x = 55 + gap + index * (barWidth + gap);
            const barHeight = maxRevenue > 0 ? (item.revenueETB / maxRevenue) * 180 : 0;
            const y = 200 - barHeight;

            return (
              <g key={item.department} className="group">
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  rx="4"
                  fill={index % 2 === 0 ? 'url(#diag-teal-pattern)' : 'url(#diag-slate-pattern)'}
                  stroke="#0d9488"
                  strokeWidth="1.5"
                  className="transition-opacity hover:opacity-80"
                />
                {/* Bar Value Label */}
                <text
                  x={x + barWidth / 2}
                  y={y - 6}
                  textAnchor="middle"
                  className="text-[10px] font-bold fill-slate-700 dark:fill-slate-200 font-mono"
                >
                  {item.revenueETB > 0 ? item.revenueETB : '0'}
                </text>
                {/* Category Label (Truncated) */}
                <text
                  x={x + barWidth / 2}
                  y="218"
                  textAnchor="middle"
                  className="text-[10px] fill-slate-500 font-medium"
                >
                  {item.department.slice(0, 7)}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Accessible Companion Table Underneath (Built with real table, caption, thead, th scope) */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
          Accessible Department Revenue Ledger
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <caption className="sr-only">Consultation revenue and booking count by department</caption>
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                <th scope="col" className="py-2.5 px-4 font-bold text-slate-700 dark:text-slate-200">Department</th>
                <th scope="col" className="py-2.5 px-4 font-bold text-slate-700 dark:text-slate-200 text-center">Appointments</th>
                <th scope="col" className="py-2.5 px-4 font-bold text-slate-700 dark:text-slate-200 text-right">Revenue (ETB)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {data.map((row) => (
                <tr key={row.department} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                  <td className="py-2.5 px-4 font-medium text-slate-800 dark:text-slate-200">{row.department}</td>
                  <td className="py-2.5 px-4 text-center font-mono text-slate-600 dark:text-slate-400">{row.appointmentCount}</td>
                  <td className="py-2.5 px-4 text-right font-mono font-bold text-teal-700 dark:text-teal-400">{etb(row.revenueETB, true)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
