// Simulated backend. In a real app this file is the only thing that would
// change if you swapped in a real API — nothing else in src/ knows the data
// is fake.

const DOCTORS = ["Dr. Abebe", "Dr. Kassa", "Dr. Fikru"];

let DB = [
  { id: "1", patient: "Selam Tesfaye", doctor: "Dr. Abebe", date: "2026-09-23", time: "09:00", duration: 20, reason: "Follow-up", status: "booked" },
  { id: "2", patient: "Dawit Mekonnen", doctor: "Dr. Abebe", date: "2026-09-23", time: "09:30", duration: 20, reason: "New patient consult", status: "booked" },
  { id: "3", patient: "Hana Girma", doctor: "Dr. Kassa", date: "2026-09-23", time: "10:00", duration: 30, reason: "Vaccination", status: "completed" },
  { id: "4", patient: "Yonas Alemu", doctor: "Dr. Fikru", date: "2026-09-23", time: "11:00", duration: 15, reason: "Prescription renewal", status: "cancelled" },
  { id: "5", patient: "Marta Bekele", doctor: "Dr. Kassa", date: "2026-09-24", time: "09:00", duration: 20, reason: "Follow-up", status: "booked" },
  { id: "6", patient: "Elias Worku", doctor: "Dr. Fikru", date: "2026-09-24", time: "09:45", duration: 30, reason: "New patient consult", status: "booked" },
];

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getDoctors() {
  return DOCTORS;
}

// Simulates a network call with a signal so callers can abort it on unmount,
// exactly like the Day 29 fetch-in-an-effect-with-cleanup pattern.
export async function fetchAppointments({ date, doctor, signal }) {
  await delay(500);
  if (signal?.aborted) throw new DOMException("Aborted", "AbortError");

  // Uncomment to rehearse the error state described in the brief:
  // throw new Error("Could not reach the clinic schedule service");

  return DB.filter((a) => (date ? a.date === date : true)).filter((a) =>
    doctor ? a.doctor === doctor : true
  );
}

export async function fetchAppointmentById(id, { signal } = {}) {
  await delay(400);
  if (signal?.aborted) throw new DOMException("Aborted", "AbortError");
  const found = DB.find((a) => a.id === id);
  if (!found) throw new Error("No appointment with that id");
  return found;
}

export async function createAppointment(data) {
  await delay(500);
  const clash = DB.some(
    (a) =>
      a.doctor === data.doctor &&
      a.date === data.date &&
      a.time === data.time &&
      a.status !== "cancelled"
  );
  if (clash) {
    throw new Error(`${data.doctor} already has a booking at ${data.time} on ${data.date}.`);
  }
  const record = { id: String(DB.length + 1), status: "booked", ...data };
  DB = [...DB, record];
  return record;
}
