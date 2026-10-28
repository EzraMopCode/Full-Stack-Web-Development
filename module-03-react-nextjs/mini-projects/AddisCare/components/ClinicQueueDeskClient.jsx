'use client';

import { useState } from 'react';
import Link from 'next/link';
import { updateTriage, cancelAppointment } from '@/actions/appointmentActions';
import { etb } from '@/lib/format';

export default function ClinicQueueDeskClient({ initialAppointments }) {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [loadingId, setLoadingId] = useState(null);
  const [message, setMessage] = useState(null);

  const handleAdvance = async (aptId, currentStage) => {
    setLoadingId(aptId);
    setMessage(null);

    let nextStage = 'vitals_taken';
    let nextStatus = 'in-consultation';

    if (currentStage === 'vitals_taken') {
      nextStage = 'with_doctor';
      nextStatus = 'in-consultation';
    } else if (currentStage === 'with_doctor') {
      nextStage = 'discharged';
      nextStatus = 'completed';
    } else if (currentStage === 'checked_in') {
      nextStage = 'vitals_taken';
      nextStatus = 'in-consultation';
    }

    try {
      const res = await updateTriage(aptId, nextStage, nextStatus, 'Updated via clinical triage desk.');
      if (res.success) {
        setAppointments((prev) =>
          prev.map((a) => (a.id === aptId ? { ...a, triageStage: nextStage, status: nextStatus } : a))
        );
        setMessage(res.message);
      }
    } catch (err) {
      // Handled
    } finally {
      setLoadingId(null);
    }
  };

  const activeQueue = appointments.filter((a) => a.status !== 'cancelled' && a.status !== 'completed');
  const finishedQueue = appointments.filter((a) => a.status === 'completed' || a.status === 'cancelled');

  return (
    <div className="space-y-6">
      
      {message && (
        <div className="p-4 rounded-2xl bg-teal-50 dark:bg-teal-950/50 border border-teal-200 dark:border-teal-800 text-teal-800 dark:text-teal-300 text-xs font-semibold">
          ✓ {message}
        </div>
      )}

      {/* Active Queue Section */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Active Triage & Waiting Room Queue
            </h2>
            <p className="text-xs text-slate-500">
              Patients currently checked in at AddisCare reception desks.
            </p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 border border-teal-200/50">
            {activeQueue.length} Active Patients
          </span>
        </div>

        {activeQueue.length === 0 ? (
          <p className="py-8 text-center text-xs text-slate-400">
            No patients currently in triage queue. All checked-in patients have completed consultation!
          </p>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {activeQueue.map((apt) => {
              const isProcessing = loadingId === apt.id;
              return (
                <div key={apt.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs text-teal-700 dark:text-teal-400">
                        #{apt.id}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-200/50">
                        {apt.triageStage.replace('_', ' ')}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-400">
                        {apt.urgency} Urgency
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                      {apt.patientName} ({apt.patientAge}y, {apt.patientGender})
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Doctor: <strong>{apt.doctorName}</strong> ({apt.specialty}) · {apt.room}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 italic mt-0.5">
                      &ldquo;{apt.reason}&rdquo;
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={isProcessing}
                      onClick={() => handleAdvance(apt.id, apt.triageStage)}
                      className="min-h-[44px] px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl shadow-sm transition-colors disabled:opacity-50 cursor-pointer flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
                    >
                      {isProcessing ? 'Updating...' : 'Advance Triage Stage &rarr;'}
                    </button>
                    <Link
                      href={`/portal/appointments/${apt.id}/live`}
                      className="min-h-[44px] px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-xl flex items-center"
                    >
                      View Live Tracker
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Completed & Archive Section */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
          Discharged & Cancelled Records Today ({finishedQueue.length})
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-400">
                <th className="py-2 px-3">ID</th>
                <th className="py-2 px-3">Patient</th>
                <th className="py-2 px-3">Attending Doctor</th>
                <th className="py-2 px-3">Fee</th>
                <th className="py-2 px-3 text-right">Final Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
              {finishedQueue.map((apt) => (
                <tr key={apt.id}>
                  <td className="py-2 px-3 font-mono font-bold text-teal-600">#{apt.id}</td>
                  <td className="py-2 px-3 font-medium text-slate-900 dark:text-white">{apt.patientName}</td>
                  <td className="py-2 px-3">{apt.doctorName} ({apt.specialty})</td>
                  <td className="py-2 px-3 font-mono">{etb(apt.fee)}</td>
                  <td className="py-2 px-3 text-right">
                    <span className="px-2 py-0.5 rounded-full text-[10px] uppercase font-bold bg-slate-100 dark:bg-slate-800 text-slate-500">
                      {apt.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
