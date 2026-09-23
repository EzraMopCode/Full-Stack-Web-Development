import { useSearchParams } from "react-router-dom";
import { useAppointments } from "../hooks/useAppointments.js";
import { getDoctors } from "../api/appointments.js";
import { DiaryFilters } from "./DiaryFilters.jsx";
import { AppointmentList } from "./AppointmentList.jsx";
import { Spinner } from "../ui/Spinner.jsx";

const TODAY = "2026-09-23";

export default function Diary() {

  const [params, setParams] = useSearchParams();
  const date = params.get("date") || TODAY;
  const doctor = params.get("doctor") || "";

  const { data: appointments, status, error } = useAppointments({ date, doctor });

  function updateFilter(next) {
    const merged = { date, doctor, ...next };
    const cleaned = Object.fromEntries(
      Object.entries(merged).filter(([, v]) => v)
    );
    setParams(cleaned);
  }

  return (
    <section>
      <h1>Diary</h1>
      <DiaryFilters
        date={date}
        doctor={doctor}
        doctors={getDoctors()}
        onChange={updateFilter}
      />

      {status === "loading" && <Spinner label="Loading appointments…" />}

      {status === "error" && (
        <p className="error-text" role="alert">
          Couldn't load the schedule: {error}
        </p>
      )}

      {status === "success" && appointments.length === 0 && (
        <p className="empty-text">No appointments for this filter.</p>
      )}

      {status === "success" && appointments.length > 0 && (
        <AppointmentList appointments={appointments} />
      )}
    </section>
  );
}
