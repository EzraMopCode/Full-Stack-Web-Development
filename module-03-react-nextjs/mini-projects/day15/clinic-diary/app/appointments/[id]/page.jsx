import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fetchAppointmentById } from '../../../data/appointments';

export async function generateMetadata({ params }) {
  const { id } = await params;
  const appointment = await fetchAppointmentById(id);
  if (!appointment) return { title: 'Appointment Not Found | Clinic Diary' };
  return {
    title: `${appointment.patient} — Appointment #${appointment.id} | Clinic Diary`,
    description: `Appointment details for ${appointment.patient} with ${appointment.doctor}.`
  };
}

// Converted to async Server Component — fetching hook & client state completely deleted
export default async function AppointmentDetailPage({ params }) {
  const { id } = await params;
  const appointment = await fetchAppointmentById(id);

  if (!appointment) {
    notFound();
  }

  const { patient, doctor, date, time, duration, reason, status } = appointment;

  return (
    <section>
      <Link href="/diary" className="btn" style={{ marginBottom: '1.5rem', display: 'inline-block' }}>
        &larr; Back to diary
      </Link>
      <h1>{patient}</h1>
      <dl>
        <dt>Doctor</dt>
        <dd>{doctor}</dd>
        <dt>When</dt>
        <dd>
          {date} at {time} ({duration} min)
        </dd>
        <dt>Reason</dt>
        <dd>{reason}</dd>
        <dt>Status</dt>
        <dd className={`status status-${status}`} style={{ fontWeight: 600, textTransform: 'capitalize' }}>
          {status}
        </dd>
      </dl>
    </section>
  );
}
