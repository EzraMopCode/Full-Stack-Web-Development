import Link from 'next/link';
import { getAppointmentsByPatient } from '@/data/clinicStore';
import { getSession } from '@/lib/session';
import CancelAppointmentButton from '@/components/CancelAppointmentButton';
import CsvExportButton from '@/components/CsvExportButton';
import { etb, when, relative } from '@/lib/format';
import { StethoscopeIcon, LightningIcon } from '@/components/Icons';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'My Medical Appointments | AddisCare',
  description: 'View scheduled doctor consultations, track live triage status, and manage clinic appointments.'
};

export default async function MyAppointmentsPage({ searchParams }) {
  const session = await getSession();
  const resolvedParams = await searchParams;
  const newId = resolvedParams?.newId || null;

  // Scoped Query: Strictly queries appointments belonging to session.userId (Stops IDOR)
  const appointments = getAppointmentsByPatient(session.userId, session.role);

  return (
    <div className="space-y-6">
      
      {/* Successful Booking Notification Banner */}
      {newId && (
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-semibold flex items-center justify-between">
          <span>✓ Consultation #{newId} scheduled successfully! The clinic triage team has been notified.</span>
          <Link
            href={`/portal/appointments/${newId}/live`}
            className="text-emerald-700 dark:text-emerald-300 underline font-bold"
          >
            Track Live Status &rarr;
          </Link>
        </div>
      )}

      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Scheduled Consultations & Visits
          </h2>
          <p className="text-xs text-slate-500">
            Total Consultations on File: <span className="font-mono font-bold text-teal-600">{appointments.length}</span>
          </p>
        </div>

        <CsvExportButton records={appointments} type="consultations" />
      </div>

      {/* Appointment Cards / Empty State */}
      {appointments.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-100 dark:border-slate-800 shadow-sm max-w-lg mx-auto">
          <StethoscopeIcon className="w-12 h-12 text-teal-600 dark:text-teal-400 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-800 dark:text-white">
            No consultations recorded for your account
          </h3>
          <p className="text-xs text-slate-500 mt-1 mb-6">
            You do not have any active or past medical visits scheduled. Browse our medical directory to book your first consultation with a specialist.
          </p>
          <Link
            href="/doctors"
            className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl shadow-sm transition-colors inline-block"
          >
            Find a Specialist &rarr;
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {appointments.map((apt) => {
            const isCancelled = apt.status === 'cancelled';
            const isCompleted = apt.status === 'completed';

            return (
              <div
                key={apt.id}
                className={`bg-white dark:bg-slate-900 rounded-3xl p-6 border transition-all shadow-sm ${
                  isCancelled
                    ? 'border-red-200/50 dark:border-red-950/30 opacity-70'
                    : 'border-slate-100 dark:border-slate-800'
                }`}
              >
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-sm text-teal-700 dark:text-teal-400">
                        #{apt.id}
                      </span>
                      <span
                        className={`text-[11px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                          isCancelled
                            ? 'bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400'
                            : isCompleted
                            ? 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                            : 'bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300'
                        }`}
                      >
                        {apt.status}
                      </span>
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 font-semibold">
                        {apt.urgency} Urgency
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1.5">
                      {apt.doctorName} · <span className="text-teal-600">{apt.specialty}</span>
                    </h3>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Consultation Fee</span>
                    <span className="text-base font-bold text-teal-700 dark:text-teal-400 font-mono">
                      {etb(apt.fee)}
                    </span>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="py-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-600 dark:text-slate-300">
                  <div>
                    <strong className="text-slate-800 dark:text-slate-200 block mb-0.5">Date & Time:</strong>
                    <p className="font-mono">{apt.date} at {apt.timeSlot}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">Booked {relative(apt.createdAt)}</p>
                  </div>
                  <div>
                    <strong className="text-slate-800 dark:text-slate-200 block mb-0.5">Clinic Location:</strong>
                    <p>{apt.branch}</p>
                    <p className="text-[11px] text-slate-400">{apt.room}</p>
                  </div>
                  <div>
                    <strong className="text-slate-800 dark:text-slate-200 block mb-0.5">Chief Complaint:</strong>
                    <p className="italic text-slate-500">&ldquo;{apt.reason}&rdquo;</p>
                  </div>
                </div>

                {/* Actions Row */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
                  <Link
                    href={`/portal/appointments/${apt.id}/live`}
                    className="min-h-[44px] px-4 py-2 rounded-xl bg-teal-50 dark:bg-teal-950/60 hover:bg-teal-100 dark:hover:bg-teal-900/60 text-teal-700 dark:text-teal-300 text-xs font-bold transition-colors flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
                  >
                    <LightningIcon className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                    <span>Track Live Triage Progression &rarr;</span>
                  </Link>

                  <CancelAppointmentButton appointmentId={apt.id} isCancelled={isCancelled} />
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
