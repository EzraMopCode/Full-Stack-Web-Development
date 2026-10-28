import { notFound, redirect } from 'next/navigation';
import { getAppointmentById } from '@/data/clinicStore';
import { getSession } from '@/lib/session';
import LiveQueueTracker from '@/components/LiveQueueTracker';

export async function generateMetadata({ params }) {
  const { id } = await params;
  return {
    title: `Live Triage Queue #${id} | AddisCare`,
    description: `Track real-time clinical triage and consultation progress for appointment #${id}.`
  };
}

export default async function LiveTriagePage({ params }) {
  const { id } = await params;
  const session = await getSession();

  if (!session) {
    redirect(`/login?next=/portal/appointments/${id}/live`);
  }

  const appointment = getAppointmentById(id);
  if (!appointment) {
    notFound();
  }

  // Refusal against changing ID in private URL (Ownership Authorization Layer):
  if (appointment.patientId !== session.userId && session.role !== 'staff' && session.role !== 'doctor') {
    redirect('/portal/appointments');
  }

  return (
    <div className="space-y-6">
      <LiveQueueTracker initialAppointment={appointment} />
    </div>
  );
}
