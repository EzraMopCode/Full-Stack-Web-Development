import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="home">
      <h1>Run the day without the paper diary</h1>
      <p>
        A receptionist's view of today's appointments — see who's booked, open
        any appointment, and add a new booking without double-booking a
        doctor.
      </p>
      <Link className="btn btn-primary" to="/diary">
        Open today's diary
      </Link>
    </section>
  );
}
