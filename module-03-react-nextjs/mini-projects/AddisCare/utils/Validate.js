/**
 * Validation schema for appointment booking.
 * Returns an object with field-specific errors, or an empty object if valid.
 */
export function validateBooking(data) {
  const errors = {};

  if (!data.patientName || data.patientName.trim().length < 3) {
    errors.patientName = 'Full Name must be at least 3 characters.';
  }

  const phoneRegex = /^(\+251|0)[79]\d{8}$/;
  const cleanPhone = (data.patientPhone || '').replace(/\s+/g, '');
  if (!cleanPhone) {
    errors.patientPhone = 'Phone number is required for appointment confirmation SMS.';
  } else if (!phoneRegex.test(cleanPhone)) {
    errors.patientPhone = 'Please provide a valid Ethiopian mobile number (e.g. 0911234567 or +251911234567).';
  }

  if (!data.date) {
    errors.date = 'Please select an appointment consultation date.';
  }

  if (!data.timeSlot) {
    errors.timeSlot = 'Please choose a morning or afternoon time slot.';
  }

  if (!data.reason || data.reason.trim().length < 5) {
    errors.reason = 'Please provide a brief reason for visit or primary symptoms (min 5 characters).';
  }

  return errors;
}
