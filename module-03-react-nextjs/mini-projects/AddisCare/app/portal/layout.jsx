import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/session';
import { StethoscopeIcon, CalendarIcon, PillIcon, ActivityIcon } from '@/components/Icons';

export default async function PatientPortalLayout({ children }) {
  const session = await getSession();

  if (!session) {
    redirect('/login?next=/portal/appointments');
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Portal Greeting Banner */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-teal-100 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <StethoscopeIcon className="w-5 h-5 text-teal-600" />
              <span className="text-xs font-bold uppercase tracking-wider text-teal-600">
                Patient Medical Portal
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              Welcome, {session.name}
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Account ID: <code className="bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded font-mono">{session.userId}</code> · Medical Record Enforced
            </p>
          </div>

          <Link
            href="/doctors"
            className="min-h-[44px] px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl shadow-sm transition-colors flex items-center justify-center self-start sm:self-auto"
          >
            + Book New Consultation
          </Link>
        </div>

        {/* Portal Navigation Tabs */}
        <nav className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto no-scrollbar">
          <Link
            href="/portal/appointments"
            className="min-h-[44px] px-5 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-900 transition-colors flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
          >
            <CalendarIcon className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <span>My Appointments</span>
          </Link>
          <Link
            href="/portal/prescriptions"
            className="min-h-[44px] px-5 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-900 transition-colors flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
          >
            <PillIcon className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <span>Prescriptions & History</span>
          </Link>
          <Link
            href="/portal/vitals"
            className="min-h-[44px] px-5 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-900 transition-colors flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
          >
            <ActivityIcon className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <span>Vitals & Health Trends</span>
          </Link>
        </nav>

        {/* Child Views */}
        <div>{children}</div>

      </div>
    </div>
  );
}
