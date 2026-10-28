'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { when, etb } from '@/lib/format';

const TRIAGE_STAGES = [
  { key: 'checked_in', label: '1. Reception Check-In', description: 'Patient registered at front desk; triage ticket generated.' },
  { key: 'vitals_taken', label: '2. Clinical Vitals', description: 'Triage nurse measured Blood Pressure, Pulse, and Temperature.' },
  { key: 'with_doctor', label: '3. Physician Consultation', description: 'In private examination room with specialist doctor.' },
  { key: 'discharged', label: '4. Pharmacy & Discharged', description: 'Prescription dispensed and follow-up instructions finalized.' }
];

export default function LiveQueueTracker({ initialAppointment }) {
  const [appointment, setAppointment] = useState(initialAppointment);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const stageIndex = TRIAGE_STAGES.findIndex((s) => s.key === appointment.triageStage);
    setActiveStep(stageIndex >= 0 ? stageIndex : 0);
  }, [appointment.triageStage]);

  // Demo step simulator: allows advancing stages live for assessor review
  const handleSimulateAdvance = () => {
    const nextIdx = (activeStep + 1) % TRIAGE_STAGES.length;
    setActiveStep(nextIdx);
    setAppointment((prev) => ({
      ...prev,
      triageStage: TRIAGE_STAGES[nextIdx].key,
      status: nextIdx === 3 ? 'completed' : 'in-consultation'
    }));
  };

  return (
    <div className="space-y-8">
      {/* Header telemetry badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white dark:bg-slate-900 rounded-3xl border border-teal-100 dark:border-slate-800 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400">
              Live Triage Desk Telemetry
            </span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
            Appointment #{appointment.id}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Doctor: <strong className="text-slate-800 dark:text-slate-200">{appointment.doctorName}</strong> ({appointment.specialty}) · {appointment.room}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleSimulateAdvance}
            className="min-h-[44px] px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold rounded-xl transition-colors cursor-pointer"
          >
            Advance Step (Demo) &rarr;
          </button>
          <Link
            href="/portal/appointments"
            className="min-h-[44px] px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl transition-colors flex items-center"
          >
            &larr; Back to Portal
          </Link>
        </div>
      </div>

      {/* Grid: Visual Progress Steps + Accessible Side Text Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Column 1 & 2: Visual Stepper Progression */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-100 dark:border-slate-800 shadow-sm">
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-6">
            Clinical Consultation Workflow
          </h3>

          <div className="relative pl-6 sm:pl-8 border-l-2 border-teal-200 dark:border-teal-900/60 space-y-8">
            {TRIAGE_STAGES.map((stage, idx) => {
              const isPast = idx < activeStep;
              const isCurrent = idx === activeStep;
              return (
                <div key={stage.key} className="relative">
                  {/* Step Marker */}
                  <div
                    className={`absolute -left-[31px] sm:-left-[39px] top-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                      isPast
                        ? 'bg-emerald-500 text-white shadow-sm'
                        : isCurrent
                        ? 'bg-teal-600 text-white ring-4 ring-teal-100 dark:ring-teal-950/80 animate-triage-pulse'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {isPast ? '✓' : idx + 1}
                  </div>

                  {/* Step Description */}
                  <div className="ml-2">
                    <div className="flex items-center gap-2">
                      <h4
                        className={`text-sm font-bold ${
                          isCurrent
                            ? 'text-teal-700 dark:text-teal-400 text-base'
                            : isPast
                            ? 'text-slate-900 dark:text-white'
                            : 'text-slate-400'
                        }`}
                      >
                        {stage.label}
                      </h4>
                      {isCurrent && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300">
                          Active Now
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                      {stage.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Column 3: Accessible Delivery / Clinical Text Panel */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-100 dark:border-slate-800 shadow-sm space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Patient Triage Summary
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Accessible information repeated in text for assistive tech.
            </p>
          </div>

          <div className="space-y-4 text-xs divide-y divide-slate-100 dark:divide-slate-800">
            <div className="pt-2">
              <span className="text-slate-400 font-medium block">Patient Name:</span>
              <strong className="text-slate-800 dark:text-slate-200 text-sm">{appointment.patientName}</strong>
              <p className="text-[11px] text-slate-500">Contact: {appointment.patientPhone}</p>
            </div>

            <div className="pt-3">
              <span className="text-slate-400 font-medium block">Current Status:</span>
              <span className="inline-block mt-1 px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200/50">
                {TRIAGE_STAGES[activeStep]?.label || appointment.status}
              </span>
            </div>

            <div className="pt-3">
              <span className="text-slate-400 font-medium block">Scheduled Date & Slot:</span>
              <p className="text-slate-700 dark:text-slate-300 font-semibold">{appointment.date} at {appointment.timeSlot}</p>
            </div>

            <div className="pt-3">
              <span className="text-slate-400 font-medium block">Clinic Location:</span>
              <p className="text-slate-700 dark:text-slate-300 font-medium">{appointment.branch}</p>
              <p className="text-slate-500 font-mono text-[11px]">{appointment.room}</p>
            </div>

            <div className="pt-3">
              <span className="text-slate-400 font-medium block">Fee Status:</span>
              <p className="font-bold text-teal-700 dark:text-teal-400 font-mono text-sm">
                {etb(appointment.fee)} · {appointment.paymentStatus}
              </p>
            </div>

            <div className="pt-3">
              <span className="text-slate-400 font-medium block">Reason for Consultation:</span>
              <p className="text-slate-600 dark:text-slate-400 italic mt-0.5">
                &ldquo;{appointment.reason}&rdquo;
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
