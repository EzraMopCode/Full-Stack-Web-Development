const DOCTORS = ["Dr. Abebe", "Dr. Kassa", "Dr. Fikru"];

let DB = [
  { id: "1", patient: "Selam Tesfaye", doctor: "Dr. Abebe", date: "2026-09-23", time: "09:00", duration: 20, reason: "Follow-up", status: "booked" },
  { id: "2", patient: "Dawit Mekonnen", doctor: "Dr. Abebe", date: "2026-09-23", time: "09:30", duration: 20, reason: "New patient consult", status: "booked" },
  { id: "3", patient: "Hana Girma", doctor: "Dr. Kassa", date: "2026-09-23", time: "10:00", duration: 30, reason: "Vaccination", status: "completed" },
  { id: "4", patient: "Yonas Alemu", doctor: "Dr. Fikru", date: "2026-09-23", time: "11:00", duration: 15, reason: "Prescription renewal", status: "cancelled" },
  { id: "5", patient: "Marta Bekele", doctor: "Dr. Kassa", date: "2026-09-24", time: "09:00", duration: 20, reason: "Follow-up", status: "booked" },
  { id: "6", patient: "Elias Worku", doctor: "Dr. Fikru", date: "2026-09-24", time: "09:45", duration: 30, reason: "New patient consult", status: "booked" },
];

export function getDoctors() {
  return DOCTORS;
}

export async function fetchAppointments({ date, doctor } = {}) {
  return DB.filter((a) => (date ? a.date === date : true)).filter((a) =>
    doctor ? a.doctor === doctor : true
  );
}

export async function fetchAppointmentById(id) {
  const found = DB.find((a) => a.id === String(id));
  return found || null;
}

export async function createAppointment(data) {
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

export async function updateAppointmentStatus(id, status) {
  const found = DB.find((a) => a.id === String(id));
  if (!found) return null;
  found.status = status;
  return found;
}
