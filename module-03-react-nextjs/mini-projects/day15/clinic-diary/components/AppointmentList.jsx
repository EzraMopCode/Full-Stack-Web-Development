import Link from 'next/link';

export default function AppointmentList({ appointments }) {
  return (
    <ul className="appointment-list">
      {appointments.map((a) => (
        <li key={a.id} className={`appointment-card status-${a.status}`}>
          <Link href={`/appointments/${a.id}`}>
            <span className="time">{a.time}</span>
            <span className="patient">{a.patient}</span>
            <span className="doctor">{a.doctor}</span>
            <span className="reason">{a.reason}</span>
            <span className="status">{a.status}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
