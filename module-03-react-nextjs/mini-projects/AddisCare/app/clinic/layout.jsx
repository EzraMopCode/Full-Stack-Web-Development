import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/session';
import { StethoscopeIcon, ClockIcon, ActivityIcon } from '@/components/Icons';

export default async function ClinicStaffLayout({ children }) {
  const session = await getSession();

  if (!session) {
    redirect('/login?next=/clinic/queue');
  }

  // Refusal line: Enforces clinical staff role (doctor / staff)
  if (session.role !== 'doctor' && session.role !== 'staff') {
    redirect('/access-denied?from=/clinic/queue');
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Staff Greeting Banner */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <StethoscopeIcon className="w-5 h-5 text-teal-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
                Authorized Clinical Portal
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold mt-1">
              {session.name}
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Role: <strong className="text-teal-300 uppercase">{session.role}</strong> · AddisCare Healthcare System
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/clinic/queue"
              className="min-h-[44px] px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition-colors flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
            >
              <ClockIcon className="w-4 h-4 text-white" />
              <span>Patient Queue</span>
            </Link>
            <Link
              href="/clinic/dashboard"
              className="min-h-[44px] px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-colors flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <ActivityIcon className="w-4 h-4 text-teal-400" />
              <span>Executive Dashboard</span>
            </Link>
          </div>
        </div>

        <div>{children}</div>

      </div>
    </div>
  );
}
