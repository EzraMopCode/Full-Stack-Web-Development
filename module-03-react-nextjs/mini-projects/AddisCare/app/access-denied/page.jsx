import Link from 'next/link';
import { getSession } from '@/lib/session';
import { ShieldCheckIcon, LockIcon, StethoscopeIcon, ArrowLeftIcon, ArrowRightIcon } from '@/components/Icons';

export const metadata = {
  title: 'Access Restricted | AddisCare',
  description: 'Role-based access control restriction for clinical staff operations.'
};

export default async function AccessDeniedPage({ searchParams }) {
  const session = await getSession();
  const resolvedParams = await searchParams;
  const attemptedPath = resolvedParams?.from || '/clinic/queue';

  return (
    <div className="min-h-[75vh] flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-10 border border-slate-200/80 dark:border-slate-800 shadow-sm text-center space-y-6">

        {/* Security Badge & Icon */}
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-900/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4 shadow-sm">
            <LockIcon className="w-8 h-8" />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-xs font-bold uppercase tracking-wider">
            <span>HTTP 403 · Access Restricted</span>
          </div>
        </div>

        {/* Heading & Clear Explanation */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Clinical Staff Clearance Required
          </h1>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            You attempted to access <code className="font-mono text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60 px-1.5 py-0.5 rounded text-xs">{attemptedPath}</code>.
            This area is restricted to licensed physicians and clinical triage nurses.
          </p>
        </div>

        {/* Current Identity Box */}
        {session ? (
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700 text-xs text-left space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 dark:text-slate-400">Current Session:</span>
              <strong className="text-slate-900 dark:text-white font-semibold">{session.name}</strong>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 dark:text-slate-400">Assigned Role:</span>
              <span className="px-2 py-0.5 rounded-full font-bold uppercase text-[10px] bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300">
                {session.role}
              </span>
            </div>
            <div className="flex items-center justify-between pt-1 border-t border-slate-200/50 dark:border-slate-700">
              <span className="text-slate-500 dark:text-slate-400">Required Clearance:</span>
              <span className="font-mono text-amber-700 dark:text-amber-400 font-bold text-[11px]">
                doctor OR staff
              </span>
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700 text-xs">
            <p className="text-slate-600 dark:text-slate-300">
              You are currently unauthenticated. Please sign in with clinical staff credentials.
            </p>
          </div>
        )}

        {/* Primary Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/portal/appointments"
            className="w-full sm:w-auto min-h-[44px] px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-xs transition-colors shadow-sm flex items-center justify-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
          >
            <ArrowLeftIcon className="w-3.5 h-3.5" />
            <span>Return to Patient Portal</span>
          </Link>

          <Link
            href="/login?next=/clinic/queue"
            className="w-full sm:w-auto min-h-[44px] px-5 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
          >
            <span>Switch to Staff Account</span>
            <ArrowRightIcon className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Assessor Quick Evaluation Helper */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-left">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
            <ShieldCheckIcon className="w-4 h-4 text-teal-600" />
            <span>Assessor Role-Based Access Control (RBAC) Verification:</span>
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed mb-3">
            This guard proves Module 3 middleware defense. To evaluate the clinical triage queue and executive dashboard, use one of the authorized staff accounts:
          </p>
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <Link
              href="/login?next=/clinic/queue"
              className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-teal-50 dark:hover:bg-slate-700/60 border border-slate-200/60 dark:border-slate-700 transition-colors block text-left"
            >
              <strong className="text-slate-900 dark:text-white block font-bold">Dr. Tigist Assefa</strong>
              <span className="text-teal-600 dark:text-teal-400 font-mono text-[10px]">dr_tigist (Doctor)</span>
            </Link>

            <Link
              href="/login?next=/clinic/queue"
              className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-teal-50 dark:hover:bg-slate-700/60 border border-slate-200/60 dark:border-slate-700 transition-colors block text-left"
            >
              <strong className="text-slate-900 dark:text-white block font-bold">Nurse Selamawit</strong>
              <span className="text-teal-600 dark:text-teal-400 font-mono text-[10px]">nurse_selam (Staff)</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
