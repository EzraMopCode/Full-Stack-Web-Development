'use server';

import { revalidatePath } from 'next/cache';
import { getSession } from '@/lib/session';
import {
  createAppointment,
  getAppointmentById,
  cancelAppointmentRecord,
  updateAppointmentTriage
} from '@/data/clinicStore';
import { validateBooking } from '@/utils/Validate';

/**
 * Server Action: bookAppointment
 * Requirement: Session verified on every write mutation (Blocks Attack 1).
 */
export async function bookAppointment(prevState, formData) {
  // Check 1: Session verification (Stops Attack 1)
  const session = await getSession();
  if (!session) {
    return {
      success: false,
      error: 'Unauthorized',
      message: 'You must be signed in to book a medical appointment.',
      fieldErrors: {}
    };
  }

  let rawData = {};
  if (formData instanceof FormData) {
    rawData = {
      patientId: session.userId,
      patientName: (formData.get('patientName') || session.name || '').toString(),
      patientPhone: (formData.get('patientPhone') || '').toString(),
      patientAge: Number(formData.get('patientAge')) || 30,
      patientGender: (formData.get('patientGender') || 'Other').toString(),
      doctorId: (formData.get('doctorId') || '').toString(),
      date: (formData.get('date') || '').toString(),
      timeSlot: (formData.get('timeSlot') || '').toString(),
      urgency: (formData.get('urgency') || 'Routine').toString(),
      reason: (formData.get('reason') || '').toString(),
      notes: (formData.get('notes') || '').toString(),
      paymentMethod: (formData.get('paymentMethod') || 'telebirr').toString()
    };
  } else if (typeof formData === 'object' && formData !== null) {
    rawData = {
      ...formData,
      patientId: session.userId
    };
  }

  // Validate using schema
  const fieldErrors = validateBooking(rawData);
  if (Object.keys(fieldErrors).length > 0) {
    return {
      success: false,
      error: 'Unprocessable Entity',
      message: 'Please resolve the highlighted validation errors.',
      fieldErrors
    };
  }

  const newApt = createAppointment(rawData);
  revalidatePath('/portal/appointments');
  revalidatePath('/clinic/queue');
  revalidatePath('/clinic/dashboard');

  return {
    success: true,
    appointmentId: newApt.id,
    appointment: newApt,
    message: `Appointment #${newApt.id} scheduled successfully with ${newApt.doctorName}.`,
    fieldErrors: {}
  };
}

/**
 * Server Action: cancelAppointment
 * Requirement:
 * Check 1: Session verification (Stops Attack 1).
 * Check 2: Patient record ownership matching session.userId (Stops Attack 2).
 */
export async function cancelAppointment(appointmentId) {
  // Check 1: Verify session (Stops Attack 1)
  const session = await getSession();
  if (!session || !session.userId) {
    return {
      success: false,
      error: 'Unauthorized',
      message: 'Session missing: You must be logged in to cancel a consultation.'
    };
  }

  // Fetch target record
  const appointment = getAppointmentById(appointmentId);
  if (!appointment) {
    return {
      success: false,
      error: 'Not Found',
      message: `Appointment #${appointmentId} was not found in clinic records.`
    };
  }

  // Check 2: Ownership validation (Stops Attack 2)
  if (appointment.patientId !== session.userId && session.role !== 'staff' && session.role !== 'doctor') {
    return {
      success: false,
      error: 'Forbidden',
      message: `Access Denied: Appointment #${appointmentId} belongs to another patient.`
    };
  }

  if (appointment.status === 'cancelled') {
    return {
      success: false,
      error: 'Conflict',
      message: `Appointment #${appointmentId} has already been cancelled.`
    };
  }

  const updated = cancelAppointmentRecord(appointmentId);
  revalidatePath('/portal/appointments');
  revalidatePath('/clinic/queue');
  revalidatePath('/clinic/dashboard');

  return {
    success: true,
    message: `Appointment #${appointmentId} has been successfully cancelled.`,
    appointment: updated
  };
}

/**
 * Server Action: updateTriage
 * Requirement: Enforces clinical staff authorization (doctor/staff only).
 */
export async function updateTriage(appointmentId, newStage, newStatus, clinicalNotes) {
  const session = await getSession();
  if (!session || (session.role !== 'doctor' && session.role !== 'staff')) {
    return {
      success: false,
      error: 'Forbidden',
      message: 'Access Denied: Only attending physicians or clinical triage nurses can update patient visit states.'
    };
  }

  const updated = updateAppointmentTriage(appointmentId, newStage, newStatus, clinicalNotes);
  if (!updated) {
    return { success: false, error: 'Not Found', message: 'Appointment not found.' };
  }

  revalidatePath('/clinic/queue');
  revalidatePath('/clinic/dashboard');
  revalidatePath(`/portal/appointments/${appointmentId}/live`);

  return {
    success: true,
    message: `Patient #${appointmentId} triage updated to ${newStage}.`,
    appointment: updated
  };
}
