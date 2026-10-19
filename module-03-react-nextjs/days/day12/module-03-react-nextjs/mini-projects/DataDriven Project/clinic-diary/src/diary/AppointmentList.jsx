import { AppointmentCard } from "./AppointmentCard.jsx";

export function AppointmentList({ appointments }) {
  return (
    <ul className="appointment-list">
      {appointments.map((a) => (
        <AppointmentCard key={a.id} appointment={a} />
      ))}
    </ul>
  );
}
