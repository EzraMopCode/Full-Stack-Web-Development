import { Link } from "react-router-dom";

export function AppointmentCard({ appointment }) {
  const { id, time, patient, doctor, reason, status } = appointment;

  return (
    <li className={`appointment-card status-${status}`}>
      <Link to={`/appointments/${id}`}>
        <span className="time">{time}</span>
        <span className="patient">{patient}</span>
        <span className="doctor">{doctor}</span>
        <span className="reason">{reason}</span>
        <span className="status">{status}</span>
      </Link>
    </li>
  );
}
