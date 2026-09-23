import { useState, useRef } from "react";
import { useCartStore } from "../store/cartStore";
import { validate } from "../validate";
import { Field } from "./Field";

export const Checkout = () => {
  const items = useCartStore((state) => state.items);
  const totalETB = items.reduce((sum, item) => sum + item.price, 0);

  const [form, setForm] = useState({ name: "", phone: "", area: "", notes: "" });
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
      {serverError && <div className="error-banner" role="alert">{serverError}</div>}
      <form onSubmit={handleSubmit} noValidate>
        <Field
          ref={nameRef} id="name" name="name" label="Full Name"
          value={form.name} onChange={handleChange} onBlur={handleBlur}
          error={errors.name} touched={touched.name}
        />
        <Field
          ref={phoneRef} id="phone" name="phone" type="tel" label="TeleBirr Phone Number"
          value={form.phone} onChange={handleChange} onBlur={handleBlur}
          error={errors.phone} touched={touched.phone}
        />
        <Field
          ref={areaRef} id="area" name="area" as="select" label="Delivery Area"
          value={form.area} onChange={handleChange} onBlur={handleBlur}
          error={errors.area} touched={touched.area}
          options={["Bole", "Kazanchis", "Megenagna", "Piassa"]}
        />
        <Field
          id="notes" name="notes" as="textarea" label="Order Notes (Optional)"
          value={form.notes} onChange={handleChange} onBlur={handleBlur}
        />
        <button type="submit" className="submit-btn" disabled={isSubmitting}>
          {isSubmitting ? "Processing..." : `Pay ${totalETB} ETB with TeleBirr`}
        </button>
      </form>
    </div>
  );
};
