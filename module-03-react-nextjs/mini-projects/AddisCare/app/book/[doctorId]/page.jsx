import { notFound, redirect } from 'next/navigation';
import { getDoctorById } from '@/data/clinicStore';
import { getSession } from '@/lib/session';
import BookingFormClient from '@/components/BookingFormClient';
import { etb } from '@/lib/format';

export async function generateMetadata({ params }) {
  const { doctorId } = await params;
  const doctor = getDoctorById(doctorId);
  if (!doctor) return { title: 'Doctor Not Found | AddisCare' };
  return {
    title: `Book Consultation with ${doctor.name} | AddisCare`,
    description: `Schedule clinical appointment with ${doctor.name} (${doctor.specialty}).`
  };
}

export default async function BookAppointmentPage({ params }) {
  const { doctorId } = await params;
  const session = await getSession();

  if (!session) {
    redirect(`/login?next=/book/${doctorId}`);
  }

  const doctor = getDoctorById(doctorId);
  if (!doctor) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header Banner */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-teal-600 block">
          Appointment Scheduling
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
          Book Consultation
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Complete the patient details below to secure your clinical time slot.
        </p>
      </div>

      {/* Selected Doctor Summary Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-teal-100 dark:border-slate-800 shadow-sm flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 dark:bg-teal-950 px-2 py-0.5 rounded-full">
            {doctor.specialty}
          </span>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
            {doctor.name}
          </h3>
          <p className="text-xs text-slate-500">{doctor.branch} · {doctor.room}</p>
        </div>
        <div className="text-right">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">Fee</span>
          <span className="text-lg font-bold text-teal-700 dark:text-teal-400 font-mono">
            {etb(doctor.consultationFee)}
          </span>
        </div>
      </div>

      {/* Client Booking Form */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-100 dark:border-slate-800 shadow-sm">
        <BookingFormClient doctor={doctor} session={session} />
      </div>

    </div>
  );
}
