import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchAppointmentById } from "../api/appointments.js";
import { Spinner } from "../ui/Spinner.jsx";

export default function AppointmentDetail() {
  const { id } = useParams();
  const [state, setState] = useState({ data: null, status: "loading", error: null });

  useEffect(() => {
    const controller = new AbortController();
    setState({ data: null, status: "loading", error: null });

    fetchAppointmentById(id, { signal: controller.signal })
      .then((data) => setState({ data, status: "success", error: null }))
      .catch((err) => {
        if (err.name === "AbortError") return;
        setState({ data: null, status: "error", error: err.message });
      });

    return () => controller.abort();
  }, [id]);

  if (state.status === "loading") return <Spinner label="Loading appointment…" />;

  if (state.status === "error") {
    return (
      <div>
        <p className="error-text" role="alert">
          {state.error}
        </p>
        <Link to="/diary">Back to diary</Link>
      </div>
    );
  }

  const { patient, doctor, date, time, duration, reason, status } = state.data;

  return (
    <section>
      <Link to="/diary">&larr; Back to diary</Link>
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
        <dd className={`status status-${status}`}>{status}</dd>
      </dl>
    </section>
  );
}
