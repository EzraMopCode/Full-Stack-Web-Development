export function validate(values) {
  const errors = {};

  if (!values.patient.trim()) errors.patient = "Patient name is required.";
  if (!values.doctor) errors.doctor = "Choose a doctor.";
  if (!values.date) errors.date = "Choose a date.";
  if (!values.time) errors.time = "Choose a time.";
  if (!values.reason.trim()) errors.reason = "Give a short reason for the visit.";

  return errors;
}
