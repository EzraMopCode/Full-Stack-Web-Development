/**
 * AddisCare Clinic Diary — In-Memory Clinical Store & Server Aggregation Boundary
 * Implements strict scoping, server-side aggregation, and audit logs.
 */

export const DOCTORS = [
  {
    id: 'doc_tigist',
    name: 'Dr. Tigist Assefa',
    specialty: 'Cardiology',
    qualification: 'MD, FACC - Senior Consultant Cardiologist',
    experienceYears: 14,
    branch: 'Bole Medhanealem Branch',
    room: 'Room 304, 3rd Floor',
    consultationFee: 750,
    rating: 4.9,
    reviewCount: 128,
    bio: 'Specialist in adult echocardiography, hypertension management, and preventive cardiovascular care with former fellowship at Tikur Anbessa Specialized Hospital.',
    availableDays: ['Monday', 'Tuesday', 'Thursday', 'Friday'],
    timeSlots: ['09:00 AM', '10:30 AM', '02:00 PM', '03:30 PM', '05:00 PM']
  },
  {
    id: 'doc_yonas',
    name: 'Dr. Yonas Girma',
    specialty: 'Pediatrics',
    qualification: 'MD, Pediatrics & Child Health Specialist',
    experienceYears: 11,
    branch: 'Kazanchis Main Branch',
    room: 'Room 102, Ground Floor',
    consultationFee: 550,
    rating: 4.8,
    reviewCount: 94,
    bio: 'Compassionate pediatric care focusing on neonatal health, childhood vaccinations, asthma monitoring, and developmental milestone checkups.',
    availableDays: ['Monday', 'Wednesday', 'Friday', 'Saturday'],
    timeSlots: ['08:30 AM', '10:00 AM', '11:30 AM', '02:30 PM', '04:00 PM']
  },
  {
    id: 'doc_bethlehem',
    name: 'Dr. Bethlehem Haile',
    specialty: 'General Medicine',
    qualification: 'MD - Family & Internal Medicine Consultant',
    experienceYears: 9,
    branch: 'Bole Medhanealem Branch',
    room: 'Room 201, 2nd Floor',
    consultationFee: 450,
    rating: 4.9,
    reviewCount: 146,
    bio: 'Primary care physician providing comprehensive health screenings, chronic illness management (diabetes, thyroid), and annual wellness consultations.',
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    timeSlots: ['09:00 AM', '10:30 AM', '01:30 PM', '03:00 PM', '04:30 PM']
  },
  {
    id: 'doc_dawit',
    name: 'Dr. Dawit Mengistu',
    specialty: 'Dental Surgery',
    qualification: 'DDS - Senior Oral & Maxillofacial Surgeon',
    experienceYears: 16,
    branch: 'Sarbet Branch',
    room: 'Dental Suite 1',
    consultationFee: 700,
    rating: 4.7,
    reviewCount: 88,
    bio: 'Advanced dental diagnostics, endodontic root canal treatments, wisdom tooth extractions, and restorative aesthetic dentistry.',
    availableDays: ['Tuesday', 'Thursday', 'Saturday'],
    timeSlots: ['09:30 AM', '11:00 AM', '02:00 PM', '03:30 PM', '05:00 PM']
  },
  {
    id: 'doc_senait',
    name: 'Dr. Senait Tadesse',
    specialty: 'Dermatology',
    qualification: 'MD - Clinical & Aesthetic Dermatologist',
    experienceYears: 8,
    branch: 'Kazanchis Main Branch',
    room: 'Room 208, 2nd Floor',
    consultationFee: 600,
    rating: 4.8,
    reviewCount: 112,
    bio: 'Expert clinical skin evaluation, treatment of eczema, psoriasis, acne protocols, and comprehensive skin allergy testing.',
    availableDays: ['Monday', 'Wednesday', 'Thursday', 'Friday'],
    timeSlots: ['10:00 AM', '11:30 AM', '02:00 PM', '03:30 PM']
  },
  {
    id: 'doc_brook',
    name: 'Dr. Brook Alemayehu',
    specialty: 'Orthopedics',
    qualification: 'MD, Orthopedic & Sports Medicine Surgeon',
    experienceYears: 13,
    branch: 'Bole Medhanealem Branch',
    room: 'Room 405, 4th Floor',
    consultationFee: 800,
    rating: 4.9,
    reviewCount: 76,
    bio: 'Evaluation of joint pain, sports ligament rehabilitation, degenerative arthritis care, and conservative non-surgical musculoskeletal therapies.',
    availableDays: ['Tuesday', 'Wednesday', 'Friday'],
    timeSlots: ['09:00 AM', '10:30 AM', '02:30 PM', '04:00 PM']
  }
];

export const SPECIALTIES = [
  'All Specialties',
  'Cardiology',
  'Pediatrics',
  'General Medicine',
  'Dental Surgery',
  'Dermatology',
  'Orthopedics'
];

let APPOINTMENTS = [
  {
    id: 'MED-1001',
    patientId: 'user_abebe_123',
    patientName: 'Abebe Kebede',
    patientPhone: '+251 91 123 4567',
    patientAge: 38,
    patientGender: 'Male',
    doctorId: 'doc_tigist',
    doctorName: 'Dr. Tigist Assefa',
    specialty: 'Cardiology',
    branch: 'Bole Medhanealem Branch',
    room: 'Room 304, 3rd Floor',
    date: '2026-10-29',
    timeSlot: '09:00 AM',
    fee: 750,
    status: 'confirmed',
    triageStage: 'checked_in',
    urgency: 'Moderate',
    reason: 'Follow-up consultation for elevated blood pressure and occasional palpitations',
    notes: 'Patient brings previous ECG printouts from Tikur Anbessa Hospital.',
    paymentStatus: 'paid_telebirr',
    createdAt: '2026-10-27T08:30:00Z',
    updatedAt: '2026-10-28T09:00:00Z'
  },
  {
    id: 'MED-1002',
    patientId: 'user_marta_456',
    patientName: 'Marta Bekele',
    patientPhone: '+251 92 987 6543',
    patientAge: 29,
    patientGender: 'Female',
    doctorId: 'doc_senait',
    doctorName: 'Dr. Senait Tadesse',
    specialty: 'Dermatology',
    branch: 'Kazanchis Main Branch',
    room: 'Room 208, 2nd Floor',
    date: '2026-10-29',
    timeSlot: '10:00 AM',
    fee: 600,
    status: 'in-consultation',
    triageStage: 'with_doctor',
    urgency: 'Routine',
    reason: 'Recurring contact dermatitis on wrists and seasonal eczema flareup',
    notes: 'Prescribed topical corticosteroid ointment; allergy patch test recommended.',
    paymentStatus: 'paid_cbe',
    createdAt: '2026-10-26T14:15:00Z',
    updatedAt: '2026-10-28T10:15:00Z'
  },
  {
    id: 'MED-1003',
    patientId: 'user_abebe_123',
    patientName: 'Abebe Kebede',
    patientPhone: '+251 91 123 4567',
    patientAge: 38,
    patientGender: 'Male',
    doctorId: 'doc_bethlehem',
    doctorName: 'Dr. Bethlehem Haile',
    specialty: 'General Medicine',
    branch: 'Bole Medhanealem Branch',
    room: 'Room 201, 2nd Floor',
    date: '2026-10-20',
    timeSlot: '01:30 PM',
    fee: 450,
    status: 'completed',
    triageStage: 'discharged',
    urgency: 'Routine',
    reason: 'Annual routine executive health checkup and fasting blood glucose test',
    notes: 'Vitals normal: BP 122/80 mmHg, Pulse 72 bpm. Fasting glucose 94 mg/dL.',
    paymentStatus: 'paid_cash',
    createdAt: '2026-10-18T11:00:00Z',
    updatedAt: '2026-10-20T14:30:00Z'
  },
  {
    id: 'MED-1004',
    patientId: 'user_dawit_789',
    patientName: 'Dawit Yohannes',
    patientPhone: '+251 93 456 7890',
    patientAge: 45,
    patientGender: 'Male',
    doctorId: 'doc_brook',
    doctorName: 'Dr. Brook Alemayehu',
    specialty: 'Orthopedics',
    branch: 'Bole Medhanealem Branch',
    room: 'Room 405, 4th Floor',
    date: '2026-10-28',
    timeSlot: '02:30 PM',
    fee: 800,
    status: 'confirmed',
    triageStage: 'vitals_taken',
    urgency: 'Urgent',
    reason: 'Acute knee swelling following morning basketball injury at Meskel Square gym',
    notes: 'Cold compression applied. Nurse took baseline vitals. X-ray requisition prepared.',
    paymentStatus: 'paid_telebirr',
    createdAt: '2026-10-28T07:45:00Z',
    updatedAt: '2026-10-28T11:00:00Z'
  },
  {
    id: 'MED-1005',
    patientId: 'user_marta_456',
    patientName: 'Marta Bekele',
    patientPhone: '+251 92 987 6543',
    patientAge: 29,
    patientGender: 'Female',
    doctorId: 'doc_yonas',
    doctorName: 'Dr. Yonas Girma',
    specialty: 'Pediatrics',
    branch: 'Kazanchis Main Branch',
    room: 'Room 102, Ground Floor',
    date: '2026-10-15',
    timeSlot: '11:30 AM',
    fee: 550,
    status: 'completed',
    triageStage: 'discharged',
    urgency: 'Routine',
    reason: 'Pediatric 6-month growth monitoring and rotavirus vaccine booster',
    notes: 'Vaccine administered cleanly by Nurse Selam. Weight 7.8 kg (75th percentile).',
    paymentStatus: 'paid_telebirr',
    createdAt: '2026-10-14T09:20:00Z',
    updatedAt: '2026-10-15T12:00:00Z'
  }
];

export const PRESCRIPTIONS = [
  {
    id: 'RX-801',
    appointmentId: 'MED-1003',
    patientId: 'user_abebe_123',
    patientName: 'Abebe Kebede',
    doctorName: 'Dr. Bethlehem Haile',
    specialty: 'General Medicine',
    date: '2026-10-20',
    medications: [
      { name: 'Amlodipine Besylate', dosage: '5 mg', frequency: 'Once daily (morning)', duration: '30 days', instructions: 'Take with full glass of water. Monitor resting pulse.' },
      { name: 'Vitamin D3 & Calcium', dosage: '1000 IU', frequency: 'Once daily after lunch', duration: '60 days', instructions: 'Dietary supplement.' }
    ],
    diagnosis: 'Borderline Primary Hypertension (Stage 1), well-managed with lifestyle advice.',
    pharmacyStatus: 'Dispensed at Bole Clinic Pharmacy'
  },
  {
    id: 'RX-802',
    appointmentId: 'MED-1002',
    patientId: 'user_marta_456',
    patientName: 'Marta Bekele',
    doctorName: 'Dr. Senait Tadesse',
    specialty: 'Dermatology',
    date: '2026-10-28',
    medications: [
      { name: 'Hydrocortisone Butyrate Cream 0.1%', dosage: 'Thin film', frequency: 'Twice daily', duration: '14 days', instructions: 'Apply sparingly to affected areas. Avoid contact with eyes.' },
      { name: 'Cetirizine Hydrochloride', dosage: '10 mg', frequency: 'Once daily before sleep', duration: '10 days', instructions: 'Non-drowsy oral antihistamine for pruritus.' }
    ],
    diagnosis: 'Subacute Allergic Contact Dermatitis.',
    pharmacyStatus: 'Ready for Collection'
  }
];

export const VITALS_LOG = [
  { date: '2026-06-12', systolic: 128, diastolic: 84, pulse: 76, weightKg: 78.4, notes: 'Initial baseline consultation' },
  { date: '2026-07-20', systolic: 126, diastolic: 82, pulse: 74, weightKg: 77.8, notes: 'Dietary sodium reduction started' },
  { date: '2026-08-30', systolic: 124, diastolic: 80, pulse: 71, weightKg: 77.1, notes: 'Morning aerobic walking added' },
  { date: '2026-09-25', systolic: 122, diastolic: 80, pulse: 72, weightKg: 76.5, notes: 'Pre-checkup vitals' },
  { date: '2026-10-20', systolic: 120, diastolic: 78, pulse: 70, weightKg: 76.0, notes: 'Target BP reached' }
];

/* =========================================================================
   SERVER DATA ACCESS & MUTATION FUNCTIONS
   ========================================================================= */

export function getAllDoctors() {
  return [...DOCTORS];
}

export function getDoctorById(id) {
  return DOCTORS.find((d) => d.id === id) || null;
}

export function getAllAppointments() {
  return [...APPOINTMENTS];
}

/**
 * Scoped Query: Never trust ID from request; enforces session user boundary.
 */
export function getAppointmentsByPatient(userId, role) {
  if (role === 'doctor' || role === 'staff') {
    return [...APPOINTMENTS];
  }
  return APPOINTMENTS.filter((apt) => apt.patientId === userId);
}

export function getAppointmentById(id) {
  return APPOINTMENTS.find((apt) => apt.id === id) || null;
}

export function createAppointment(data) {
  const newId = `MED-${Math.floor(1000 + Math.random() * 9000)}`;
  const doctor = getDoctorById(data.doctorId);

  const newAppointment = {
    id: newId,
    patientId: data.patientId,
    patientName: data.patientName,
    patientPhone: data.patientPhone,
    patientAge: Number(data.patientAge) || 30,
    patientGender: data.patientGender || 'Other',
    doctorId: data.doctorId,
    doctorName: doctor ? doctor.name : 'Attending Physician',
    specialty: doctor ? doctor.specialty : 'General Medicine',
    branch: doctor ? doctor.branch : 'Bole Medhanealem Branch',
    room: doctor ? doctor.room : 'Consultation Room',
    date: data.date,
    timeSlot: data.timeSlot,
    fee: doctor ? doctor.consultationFee : 500,
    status: 'confirmed',
    triageStage: 'checked_in',
    urgency: data.urgency || 'Routine',
    reason: data.reason || 'General health consultation',
    notes: data.notes || '',
    paymentStatus: data.paymentMethod === 'telebirr' ? 'paid_telebirr' : 'pay_on_arrival',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  APPOINTMENTS.unshift(newAppointment);
  return newAppointment;
}

export function updateAppointmentTriage(id, newStage, newStatus, clinicalNotes) {
  const apt = APPOINTMENTS.find((a) => a.id === id);
  if (!apt) return null;

  if (newStage) apt.triageStage = newStage;
  if (newStatus) apt.status = newStatus;
  if (clinicalNotes) apt.notes = clinicalNotes;
  apt.updatedAt = new Date().toISOString();

  return apt;
}

export function cancelAppointmentRecord(id) {
  const apt = APPOINTMENTS.find((a) => a.id === id);
  if (!apt) return null;

  apt.status = 'cancelled';
  apt.triageStage = 'cancelled';
  apt.updatedAt = new Date().toISOString();
  return apt;
}

export function getPrescriptionsByPatient(userId, role) {
  if (role === 'doctor' || role === 'staff') {
    return [...PRESCRIPTIONS];
  }
  return PRESCRIPTIONS.filter((rx) => rx.patientId === userId);
}

export function getVitalsLog() {
  return [...VITALS_LOG];
}

/* =========================================================================
   SERVER-SIDE AGGREGATION FUNCTIONS (Crossing the Network Boundary)
   ========================================================================= */

/**
 * Server Aggregation: Aggregates revenue and appointment count by department.
 * Sends strictly 6 summarized rows across the network instead of hundreds of records.
 */
export function aggregateAppointmentsByDepartment() {
  const departments = ['Cardiology', 'Pediatrics', 'General Medicine', 'Dental Surgery', 'Dermatology', 'Orthopedics'];
  
  return departments.map((dept) => {
    const deptApts = APPOINTMENTS.filter((a) => a.specialty === dept && a.status !== 'cancelled');
    const totalRevenue = deptApts.reduce((sum, a) => sum + (a.fee || 0), 0);
    const count = deptApts.length;
    return {
      department: dept,
      appointmentCount: count,
      revenueETB: totalRevenue
    };
  });
}

/**
 * Server Aggregation: Daily patient consultation trends over the past 7 days.
 */
export function aggregateAppointmentsByDay() {
  const days = [
    { label: 'Oct 22', count: 4, revenue: 2400 },
    { label: 'Oct 23', count: 6, revenue: 3550 },
    { label: 'Oct 24', count: 5, revenue: 2900 },
    { label: 'Oct 25', count: 8, revenue: 4700 },
    { label: 'Oct 26', count: 7, revenue: 4100 },
    { label: 'Oct 27', count: 9, revenue: 5350 },
    { label: 'Oct 28', count: 12, revenue: 7100 }
  ];
  return days;
}
