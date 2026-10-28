export default function PatientVolumeChart({ data = [] }) {
  const maxCount = Math.max(...data.map((d) => d.count), 15);
  const totalConsultations = data.reduce((sum, d) => sum + d.count, 0);

  // Calculate SVG line path points
  const points = data.map((d, i) => {
    const x = 60 + i * (480 / (data.length - 1 || 1));
    const y = 180 - (d.count / maxCount) * 140;
    return { x, y, ...d };
  });

  const pathD = points.reduce((acc, pt, i) => {
    return i === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`;
  }, '');

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-100 dark:border-slate-800 shadow-sm space-y-6">
      
      {/* Heading naming range and unit */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Daily Patient Consultation Volume
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Range: Past 7 Days · Unit: Patient Visits per Day
          </p>
        </div>
        <div className="text-right">
          <span className="text-xs text-slate-400 block font-semibold uppercase">Total Visits</span>
          <span className="text-xl font-bold text-teal-700 dark:text-teal-400 font-mono">
            {totalConsultations} Patients
          </span>
        </div>
      </div>

      {/* Fixed Height Container (288px = h-72) */}
      <div className="h-72 w-full relative">
        <svg
          viewBox="0 0 600 220"
          className="w-full h-full overflow-visible"
          role="img"
          aria-label="Line chart showing daily patient consultations over the past 7 days"
        >
          {/* Y-Axis Grid Lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => {
            const y = 180 - pct * 140;
            const val = Math.round(maxCount * pct);
            return (
              <g key={i}>
                <line x1="50" y1={y} x2="570" y2={y} stroke="#e2e8f0" strokeDasharray="3 3" />
                <text x="45" y={y + 4} textAnchor="end" className="text-[10px] fill-slate-400 font-mono">
                  {val}
                </text>
              </g>
            );
          })}

          {/* Baseline */}
          <line x1="50" y1="180" x2="570" y2="180" stroke="#94a3b8" strokeWidth="1.5" />

          {/* Line Chart Path */}
          <path d={pathD} fill="none" stroke="#0d9488" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

          {/* Geometric Markers on Data Points */}
          {points.map((pt, i) => (
            <g key={i} className="group">
              <circle
                cx={pt.x}
                cy={pt.y}
                r="5"
                fill="#ffffff"
                stroke="#0d9488"
                strokeWidth="2.5"
                className="transition-transform group-hover:scale-125"
              />
              <text
                x={pt.x}
                y={pt.y - 10}
                textAnchor="middle"
                className="text-[10px] font-bold fill-teal-800 dark:fill-teal-300 font-mono"
              >
                {pt.count}
              </text>
              <text
                x={pt.x}
                y="198"
                textAnchor="middle"
                className="text-[10px] fill-slate-500 font-medium"
              >
                {pt.label}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* Accessible Table Beneath the SVG */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
          Daily Consultation Data Table
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <caption className="sr-only">Daily patient consultation counts and recorded revenue</caption>
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                <th scope="col" className="py-2.5 px-4 font-bold text-slate-700 dark:text-slate-200">Date Range</th>
                <th scope="col" className="py-2.5 px-4 font-bold text-slate-700 dark:text-slate-200 text-center">Patient Visits</th>
                <th scope="col" className="py-2.5 px-4 font-bold text-slate-700 dark:text-slate-200 text-right">Daily Volume (ETB)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {data.map((row) => (
                <tr key={row.label} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                  <td className="py-2.5 px-4 font-medium text-slate-800 dark:text-slate-200">{row.label}</td>
                  <td className="py-2.5 px-4 text-center font-mono font-bold text-teal-700 dark:text-teal-400">{row.count} patients</td>
                  <td className="py-2.5 px-4 text-right font-mono text-slate-600 dark:text-slate-400">{row.revenue.toLocaleString()} ETB</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
