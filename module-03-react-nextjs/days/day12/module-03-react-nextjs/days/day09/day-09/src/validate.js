export const validate = (form) => {
  const errors = {};

  if (!form.name.trim()) {
    errors.name = "Name is required";
  }
  if (!form.phone.trim()) {
    errors.phone = "TeleBirr phone is required";
  } else if (!/^\d{9,10}$/.test(form.phone.trim())) {
    errors.phone = "Please enter a valid 9 or 10 digit number";
  }
  if (!form.area) {
    errors.area = "Please select a delivery area";
  }

  return errors;
};
