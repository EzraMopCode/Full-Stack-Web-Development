import { getAllAppointments } from '@/data/clinicStore';
import ClinicQueueDeskClient from '@/components/ClinicQueueDeskClient';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Clinical Triage & Patient Waiting Queue | AddisCare',
  description: 'Manage checked-in patients, update triage status, and advance clinical workflows.'
};

export default async function ClinicQueuePage() {
  const appointments = getAllAppointments();

  return (
    <div className="space-y-6">
      <ClinicQueueDeskClient initialAppointments={appointments} />
    </div>
  );
}
