import Link from 'next/link';
import { etb } from '@/lib/format';

export default function DoctorCard({ doctor }) {
  return (
    <article className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-teal-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
      <div>
        {/* Specialty Tag & Rating */}
        <div className="flex items-center justify-between mb-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-50 text-teal-700 dark:bg-teal-950/60 dark:text-teal-300 border border-teal-200/50 dark:border-teal-900/40">
            {doctor.specialty}
          </span>
          <div className="flex items-center gap-1 text-xs font-bold text-amber-600 dark:text-amber-400">
            <span>★</span>
            <span>{doctor.rating.toFixed(1)}</span>
            <span className="text-slate-400 font-normal">({doctor.reviewCount})</span>
          </div>
        </div>

        {/* Doctor Identity */}
        <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
          <Link
            href={`/doctors/${doctor.id}`}
            className="hover:text-teal-600 dark:hover:text-teal-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 rounded"
          >
            {doctor.name}
          </Link>
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
          {doctor.qualification}
        </p>

        {/* Clinical Branch & Room */}
        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
          <p className="flex items-center gap-2">
            <span className="text-teal-600">📍</span>
            <span>{doctor.branch}</span>
          </p>
          <p className="flex items-center gap-2 text-slate-500">
            <span>🚪</span>
            <span>{doctor.room}</span>
          </p>
          <p className="flex items-center gap-2 text-slate-500">
            <span>⏳</span>
            <span>{doctor.experienceYears} Years Clinical Experience</span>
          </p>
        </div>
      </div>

      {/* Fee & Action Bar */}
      <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
        <div>
          <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-semibold">
            Consultation Fee
          </span>
          <span className="text-lg font-bold text-teal-700 dark:text-teal-400 font-mono">
            {etb(doctor.consultationFee)}
          </span>
        </div>

        <Link
          href={`/book/${doctor.id}`}
          className="min-h-[44px] min-w-[44px] px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl shadow-sm transition-colors flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
        >
          Book Visit &rarr;
        </Link>
      </div>
    </article>
  );
}
