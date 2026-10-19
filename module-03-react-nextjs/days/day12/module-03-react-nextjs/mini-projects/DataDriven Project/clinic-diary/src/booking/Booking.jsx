import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAppointment, getDoctors } from "../api/appointments.js";
import { validate } from "./validate.js";
import { Button } from "../ui/Button.jsx";

const EMPTY = { patient: "", doctor: "", date: "", time: "", reason: "" };


export default function Booking() {
  const [values, setValues] = useState(EMPTY);
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [done, setDone] = useState(false);
  const navigate = useNavigate();

  const errors = validate(values);

  function handleChange(field) {
    return (e) => setValues((v) => ({ ...v, [field]: e.target.value }));
  }

  function handleBlur(field) {
    return () => setTouched((t) => ({ ...t, [field]: true }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setTouched({ patient: true, doctor: true, date: true, time: true, reason: true });
    if (Object.keys(errors).length > 0) return;

    setSubmitting(true);
    setSubmitError(null);
    try {
      const created = await createAppointment(values);
      setDone(true);
      setTimeout(() => navigate(`/appointments/${created.id}`), 800);
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (done) return <p role="status">Booked — taking you to the appointment…</p>;

  return (
    <section>
      <h1>Book an appointment</h1>
      <form onSubmit={handleSubmit} noValidate>
        <label>
          Patient name
          <input
            value={values.patient}
            onChange={handleChange("patient")}
            onBlur={handleBlur("patient")}
          />
          {touched.patient && errors.patient && (
            <span className="field-error">{errors.patient}</span>
          )}
        </label>

        <label>
          Doctor
          <select
            value={values.doctor}
            onChange={handleChange("doctor")}
            onBlur={handleBlur("doctor")}
          >
            <option value="">Select a doctor</option>
            {getDoctors().map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          {touched.doctor && errors.doctor && (
            <span className="field-error">{errors.doctor}</span>
          )}
        </label>

        <label>
          Date
          <input
            type="date"
            value={values.date}
            onChange={handleChange("date")}
            onBlur={handleBlur("date")}
          />
          {touched.date && errors.date && <span className="field-error">{errors.date}</span>}
        </label>

        <label>
          Time
          <input
            type="time"
            value={values.time}
            onChange={handleChange("time")}
            onBlur={handleBlur("time")}
          />
          {touched.time && errors.time && <span className="field-error">{errors.time}</span>}
        </label>

        <label>
          Reason for visit
          <input
            value={values.reason}
            onChange={handleChange("reason")}
            onBlur={handleBlur("reason")}
          />
          {touched.reason && errors.reason && (
            <span className="field-error">{errors.reason}</span>
          )}
        </label>

        {submitError && (
          <p className="error-text" role="alert">
            {submitError}
          </p>
        )}

        <Button type="submit" disabled={submitting}>
          {submitting ? "Booking…" : "Book appointment"}
        </Button>
      </form>
    </section>
  );
}
