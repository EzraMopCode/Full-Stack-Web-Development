import { fetchAppointments, getDoctors } from '../../data/appointments';
import DiaryFilters from '../../components/DiaryFilters';
import AppointmentList from '../../components/AppointmentList';

const TODAY = '2026-09-23';

export const metadata = {
  title: 'Diary | Clinic Diary',
  description: 'View scheduled appointments by date and doctor.',
};

export default async function DiaryPage({ searchParams }) {
  const resolvedParams = await searchParams;
  const date = resolvedParams?.date || TODAY;
  const doctor = resolvedParams?.doctor || '';

  // Server Component: fetches data on the server without client fetching hooks
  const appointments = await fetchAppointments({ date, doctor });
  const doctors = getDoctors();

  return (
    <section>
      <h1>Clinic Schedule Diary</h1>
      <DiaryFilters date={date} doctor={doctor} doctors={doctors} />

      {appointments.length === 0 ? (
        <p className="empty-text">No appointments found for this filter.</p>
      ) : (
        <AppointmentList appointments={appointments} />
      )}
    </section>
  );
}
