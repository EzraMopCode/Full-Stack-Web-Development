import { getVitalsLog } from '@/data/clinicStore';
import { getSession } from '@/lib/session';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Health Vitals & Physiological Trends | AddisCare',
  description: 'Track clinical blood pressure, resting heart rate, and weight progression.'
};

export default async function VitalsPage() {
  const session = await getSession();
  const vitals = getVitalsLog();

  const latest = vitals[vitals.length - 1];

  return (
    <div className="space-y-8">
      
      {/* Title */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Physiological Vitals & Health Trends
        </h2>
        <p className="text-xs text-slate-500">
          Recorded during clinical triage assessments across AddisCare health facilities.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-teal-100 dark:border-slate-800 shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Latest Blood Pressure</span>
          <span className="text-xl font-black text-teal-700 dark:text-teal-400 font-mono block mt-1">
            {latest.systolic}/{latest.diastolic}
          </span>
          <span className="text-[10px] text-slate-400">mmHg (Normal Range)</span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-teal-100 dark:border-slate-800 shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Resting Heart Rate</span>
          <span className="text-xl font-black text-teal-700 dark:text-teal-400 font-mono block mt-1">
            {latest.pulse}
          </span>
          <span className="text-[10px] text-slate-400">BPM (Resting)</span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-teal-100 dark:border-slate-800 shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Recorded Weight</span>
          <span className="text-xl font-black text-teal-700 dark:text-teal-400 font-mono block mt-1">
            {latest.weightKg}
          </span>
          <span className="text-[10px] text-slate-400">kg (Target: 75.0 kg)</span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-teal-100 dark:border-slate-800 shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Clinical Assessment</span>
          <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 block mt-1.5">
            Optimal Control
          </span>
          <span className="text-[10px] text-slate-400">EFDA Standard</span>
        </div>
      </div>

      {/* SVG Trend Chart with Fixed Height Container (288px) */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-100 dark:border-slate-800 shadow-sm space-y-6">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Systolic & Diastolic Blood Pressure Progression
          </h3>
          <p className="text-xs text-slate-500">Unit: mmHg · Measured across scheduled outpatient checkups</p>
        </div>

        <div className="h-72 w-full relative">
          <svg viewBox="0 0 600 200" className="w-full h-full overflow-visible" role="img" aria-label="Line chart of patient blood pressure trend">
            {/* Grid */}
            {[60, 80, 100, 120, 140].map((val) => {
              const y = 180 - ((val - 60) / 80) * 140;
              return (
                <g key={val}>
                  <line x1="45" y1={y} x2="575" y2={y} stroke="#e2e8f0" strokeDasharray="3 3" />
                  <text x="40" y={y + 4} textAnchor="end" className="text-[10px] fill-slate-400 font-mono">{val}</text>
                </g>
              );
            })}

            {/* Baseline */}
            <line x1="45" y1="180" x2="575" y2="180" stroke="#94a3b8" strokeWidth="1.5" />

            {/* Systolic Line */}
            {(() => {
              const pts = vitals.map((v, i) => {
                const x = 60 + i * (490 / (vitals.length - 1));
                const y = 180 - ((v.systolic - 60) / 80) * 140;
                return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
              }).join(' ');
              return <path d={pts} fill="none" stroke="#0d9488" strokeWidth="3" strokeLinecap="round" />;
            })()}

            {/* Diastolic Line */}
            {(() => {
              const pts = vitals.map((v, i) => {
                const x = 60 + i * (490 / (vitals.length - 1));
                const y = 180 - ((v.diastolic - 60) / 80) * 140;
                return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
              }).join(' ');
              return <path d={pts} fill="none" stroke="#64748b" strokeWidth="2.5" strokeDasharray="4 4" strokeLinecap="round" />;
            })()}

            {/* Data Points */}
            {vitals.map((v, i) => {
              const x = 60 + i * (490 / (vitals.length - 1));
              const ySys = 180 - ((v.systolic - 60) / 80) * 140;
              const yDia = 180 - ((v.diastolic - 60) / 80) * 140;
              return (
                <g key={i}>
                  <circle cx={x} cy={ySys} r="4" fill="#0d9488" />
                  <circle cx={x} cy={yDia} r="4" fill="#64748b" />
                  <text x={x} y="198" textAnchor="middle" className="text-[10px] fill-slate-500 font-mono">{v.date.slice(5)}</text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 text-xs pt-2">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-teal-600"></span>
            <span className="font-semibold text-slate-700 dark:text-slate-300">Systolic (Target &lt; 130)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-slate-500"></span>
            <span className="font-semibold text-slate-700 dark:text-slate-300">Diastolic (Target &lt; 85)</span>
          </div>
        </div>

        {/* Accessible Table */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
            Recorded Vitals Log Table
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <caption className="sr-only">Historical blood pressure, pulse, and weight records</caption>
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                  <th scope="col" className="py-2.5 px-4 font-bold text-slate-700 dark:text-slate-200">Date</th>
                  <th scope="col" className="py-2.5 px-4 font-bold text-slate-700 dark:text-slate-200 text-center">BP (mmHg)</th>
                  <th scope="col" className="py-2.5 px-4 font-bold text-slate-700 dark:text-slate-200 text-center">Pulse (BPM)</th>
                  <th scope="col" className="py-2.5 px-4 font-bold text-slate-700 dark:text-slate-200 text-center">Weight</th>
                  <th scope="col" className="py-2.5 px-4 font-bold text-slate-700 dark:text-slate-200">Clinical Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {vitals.map((row) => (
                  <tr key={row.date} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                    <td className="py-2.5 px-4 font-mono font-medium text-slate-800 dark:text-slate-200">{row.date}</td>
                    <td className="py-2.5 px-4 text-center font-mono font-bold text-teal-700 dark:text-teal-400">{row.systolic}/{row.diastolic}</td>
                    <td className="py-2.5 px-4 text-center font-mono text-slate-600 dark:text-slate-400">{row.pulse}</td>
                    <td className="py-2.5 px-4 text-center font-mono text-slate-600 dark:text-slate-400">{row.weightKg} kg</td>
                    <td className="py-2.5 px-4 text-slate-500 italic">{row.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
}
