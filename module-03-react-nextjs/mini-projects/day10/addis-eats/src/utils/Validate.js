const phonePattern = /^(09\d{8}|\+2519\d{8})$/;

export function validate(form) {
  const errors = {};

  if (!form.name.trim()) {
    errors.name = 'Enter the name for this order.';
  } else if (form.name.trim().length < 2) {
    errors.name = 'Name looks too short.';
  }

  if (!form.phone.trim()) {
    errors.phone = 'Enter a TeleBirr number.';
  } else if (!phonePattern.test(form.phone.trim())) {
    errors.phone = 'Use 09XXXXXXXX or +2519XXXXXXXX.';
  }

  if (!form.area.trim()) {
    errors.area = 'Enter a delivery area.';
  }

  if (form.notes.length > 140) {
    errors.notes = 'Keep notes under 140 characters.';
  }

  return errors;
}
