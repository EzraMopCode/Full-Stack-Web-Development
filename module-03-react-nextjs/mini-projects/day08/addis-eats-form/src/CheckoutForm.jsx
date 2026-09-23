import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { validate } from './validate';
import Field from './Field';

const initialForm = { name: '', phone: '', area: '', notes: '' };
const fieldOrder = ['name', 'phone', 'area', 'notes'];

function CheckoutForm({ total, onOrderPlaced }) {
  const [form, setForm] = useState(initialForm);
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const isSubmittingRef = useRef(false);
  const fieldRefs = {
    name: useRef(null),
    phone: useRef(null),
    area: useRef(null),
    notes: useRef(null),
  };

  const errors = validate(form);
  const hasErrors = Object.keys(errors).length > 0;

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleBlur(field) {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }

  async function fakeSubmitOrder() {
    await new Promise((resolve) => setTimeout(resolve, 900));
    if (Math.random() < 0.3) {
      throw new Error('The order could not be sent. Please try again.');
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setTouched({ name: true, phone: true, area: true, notes: true });

    if (hasErrors) {
      const firstInvalid = fieldOrder.find((f) => errors[f]);
      fieldRefs[firstInvalid]?.current?.focus();
      return;
    }

    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;
    setSubmitting(true);
    setSubmitError('');

    try {
      await fakeSubmitOrder();
      setSubmitted(true);
      setForm(initialForm);
      setTouched({});
      onOrderPlaced();
    } catch (err) {
      setSubmitError(err.message);
      fieldRefs.name?.current?.focus();
    } finally {
      setSubmitting(false);
      isSubmittingRef.current = false;
    }
  }

  if (submitted) {
    return (
      <div className="checkout-success" role="status">
        <h2>Order placed!</h2>
        <p>We&apos;ll text you when it&apos;s on the way.</p>
      </div>
    );
  }

  return (
    <form className="checkout-form" onSubmit={handleSubmit} noValidate>
      <h2>Checkout</h2>

      <Field
        id="name"
        label="Name"
        value={form.name}
        error={errors.name}
        touched={touched.name}
        onChange={handleChange}
        onBlur={() => handleBlur('name')}
        inputRef={fieldRefs.name}
        autoFocus
      />

      <Field
        id="phone"
        label="TeleBirr number"
        value={form.phone}
        error={errors.phone}
        touched={touched.phone}
        onChange={handleChange}
        onBlur={() => handleBlur('phone')}
        inputRef={fieldRefs.phone}
      />

      <Field
        id="area"
        label="Delivery area"
        value={form.area}
        error={errors.area}
        touched={touched.area}
        onChange={handleChange}
        onBlur={() => handleBlur('area')}
        inputRef={fieldRefs.area}
      />

      <Field
        id="notes"
        label="Delivery notes (optional)"
        value={form.notes}
        error={errors.notes}
        touched={touched.notes}
        onChange={handleChange}
        onBlur={() => handleBlur('notes')}
        inputRef={fieldRefs.notes}
      />

      {submitError && (
        <p role="alert" className="field-error submit-error">
          {submitError}
        </p>
      )}

      <button type="submit" className="add-btn" disabled={submitting}>
        {submitting ? `Placing order — ${total} ETB…` : `Place order — ${total} ETB`}
      </button>
    </form>
  );
}

CheckoutForm.propTypes = {
  total: PropTypes.number.isRequired,
  onOrderPlaced: PropTypes.func.isRequired,
};

export default CheckoutForm;
