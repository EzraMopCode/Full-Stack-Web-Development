'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { bookAppointment } from '@/actions/appointmentActions';
import TimeSlotPicker from '@/components/TimeSlotPicker';
import { etb } from '@/lib/format';

export default function BookingFormClient({ doctor, session }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [date, setDate] = useState('2026-10-29');
  const [selectedSlot, setSelectedSlot] = useState(doctor.timeSlots[0] || '09:00 AM');
  const [urgency, setUrgency] = useState('Routine');
  const [fieldErrors, setFieldErrors] = useState({});
  const [serverError, setServerError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting || isPending) return; // Immediate double-submit defense

    setIsSubmitting(true);
    setFieldErrors({});
    setServerError(null);

    const formData = new FormData(e.currentTarget);
    formData.set('doctorId', doctor.id);
    formData.set('date', date);
    formData.set('timeSlot', selectedSlot);
    formData.set('urgency', urgency);

    startTransition(async () => {
      try {
        const res = await bookAppointment(null, formData);
        if (!res.success) {
          if (res.fieldErrors) setFieldErrors(res.fieldErrors);
          setServerError(res.message || 'Validation failed');
          setIsSubmitting(false);
        } else {
          router.push(`/portal/appointments?newId=${res.appointmentId}`);
        }
      } catch (err) {
        setServerError('An unexpected error occurred during submission.');
        setIsSubmitting(false);
      }
    });
  };

  const isLocked = isSubmitting || isPending;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      
      {serverError && (
        <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-700 dark:text-red-400 text-xs font-semibold">
          {serverError}
        </div>
      )}

      {/* Patient Information */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
            Patient Full Name *
          </label>
          <input
            name="patientName"
            type="text"
            required
            defaultValue={session?.name || 'Abebe Kebede'}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
          />
          {fieldErrors.patientName && (
            <p className="text-[11px] text-red-500 mt-1">{fieldErrors.patientName}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
            Ethiopian Phone Number *
          </label>
          <input
            name="patientPhone"
            type="tel"
            required
            defaultValue="+251 91 123 4567"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 font-mono"
          />
          {fieldErrors.patientPhone && (
            <p className="text-[11px] text-red-500 mt-1">{fieldErrors.patientPhone}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
            Patient Age
          </label>
          <input
            name="patientAge"
            type="number"
            min="1"
            max="120"
            defaultValue="38"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs outline-none focus:border-teal-500 font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
            Gender
          </label>
          <select
            name="patientGender"
            defaultValue="Male"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs outline-none focus:border-teal-500 cursor-pointer"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      {/* Date & Time Slot Picker */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
            Consultation Date *
          </label>
          <input
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs outline-none focus:border-teal-500 font-mono"
          />
          {fieldErrors.date && (
            <p className="text-[11px] text-red-500 mt-1">{fieldErrors.date}</p>
          )}
        </div>

        <TimeSlotPicker
          slots={doctor.timeSlots}
          selectedSlot={selectedSlot}
          onSelect={setSelectedSlot}
        />
        {fieldErrors.timeSlot && (
          <p className="text-[11px] text-red-500 mt-1">{fieldErrors.timeSlot}</p>
        )}
      </div>

      {/* Urgency & Symptoms */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
            Consultation Triage Urgency
          </label>
          <div className="grid grid-cols-3 gap-2">
            {['Routine', 'Moderate', 'Urgent'].map((lvl) => (
              <button
                key={lvl}
                type="button"
                onClick={() => setUrgency(lvl)}
                className={`min-h-[44px] py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 ${
                  urgency === lvl
                    ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-teal-400'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
            Reason for Consultation / Symptoms *
          </label>
          <textarea
            name="reason"
            rows="3"
            required
            defaultValue="Follow-up consultation for blood pressure and routine review."
            placeholder="Describe your primary discomfort, symptoms, or visit purpose..."
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs outline-none focus:border-teal-500"
          ></textarea>
          {fieldErrors.reason && (
            <p className="text-[11px] text-red-500 mt-1">{fieldErrors.reason}</p>
          )}
        </div>
      </div>

      {/* Payment Selection */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
          Consultation Payment Method
        </label>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <label className="flex items-center gap-2 p-3.5 rounded-xl border border-teal-500/50 bg-teal-50/30 dark:bg-teal-950/30 cursor-pointer">
            <input type="radio" name="paymentMethod" value="telebirr" defaultChecked className="text-teal-600" />
            <span className="font-semibold text-slate-800 dark:text-slate-200">Telebirr Mobile Payment</span>
          </label>
          <label className="flex items-center gap-2 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 cursor-pointer">
            <input type="radio" name="paymentMethod" value="cash" className="text-teal-600" />
            <span className="font-semibold text-slate-800 dark:text-slate-200">Pay on Arrival at Reception</span>
          </label>
        </div>
      </div>

      {/* Double-Submit Protected Submit Button */}
      <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
        <div>
          <span className="text-[11px] uppercase font-bold text-slate-400 block">Total Due</span>
          <span className="text-xl font-bold text-teal-700 dark:text-teal-400 font-mono">
            {etb(doctor.consultationFee, true)}
          </span>
        </div>

        <button
          type="submit"
          disabled={isLocked}
          className="min-h-[48px] px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-2xl shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center gap-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
        >
          {isLocked ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              <span>Scheduling Consultation...</span>
            </>
          ) : (
            <span>Confirm & Book Appointment &rarr;</span>
          )}
        </button>
      </div>

    </form>
  );
}
