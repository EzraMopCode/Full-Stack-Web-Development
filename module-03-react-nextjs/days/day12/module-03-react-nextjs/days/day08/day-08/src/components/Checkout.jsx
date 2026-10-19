import { useState, useRef } from "react";
import { useCartStore } from "../store/cartStore";
import { validate } from "../validate";

export const Checkout = () => {
  const items = useCartStore((state) => state.items);
  const totalETB = items.reduce((sum, item) => sum + item.price, 0);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    area: "",
    notes: "",
  });
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const areaRef = useRef(null);

  const errors = validate(form);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    const errorKeys = Object.keys(errors);
    if (errorKeys.length > 0) {
      setTouched({ name: true, phone: true, area: true });

      const firstErrorField = errorKeys[0];
      const fieldRefs = { name: nameRef, phone: phoneRef, area: areaRef };
      fieldRefs[firstErrorField]?.current?.focus();

      return;
    }

    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setServerError("Connection timeout with TeleBirr gateway. Please verify your details.");
    setIsSubmitting(false);

    phoneRef.current?.focus();
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>

      {serverError && (
        <div className="error-banner" role="alert">
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            name="name"
            type="text"
            ref={nameRef}
            value={form.name}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={touched.name && !!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {touched.name && errors.name && (
            <span id="name-error" className="field-error" role="alert">
              {errors.name}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="phone">TeleBirr Phone Number</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            ref={phoneRef}
            value={form.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={touched.phone && !!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
          />
          {touched.phone && errors.phone && (
            <span id="phone-error" className="field-error" role="alert">
              {errors.phone}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="area">Delivery Area</label>
          <select
            id="area"
            name="area"
            ref={areaRef}
            value={form.area}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={touched.area && !!errors.area}
            aria-describedby={errors.area ? "area-error" : undefined}
          >
            <option value="">Select an area...</option>
            <option value="Bole">Bole</option>
            <option value="Kazanchis">Kazanchis</option>
            <option value="Megenagna">Megenagna</option>
            <option value="Piassa">Piassa</option>
          </select>
          {touched.area && errors.area && (
            <span id="area-error" className="field-error" role="alert">
              {errors.area}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="notes">Order Notes (Optional)</label>
          <textarea
            id="notes"
            name="notes"
            value={form.notes}
            onChange={handleChange}
            onBlur={handleBlur}
            rows="3"
          />
        </div>

        <button
          type="submit"
          className="submit-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Processing..." : `Pay ${totalETB} ETB with TeleBirr`}
        </button>
      </form>
    </div>
  );
};
