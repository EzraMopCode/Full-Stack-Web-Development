import { useState } from 'react';

const phonePattern = /^(09\d{8}|\+2519\d{8})$/;

function OrderForm() {
  const [form, setForm] = useState({ name: '', phone: '', area: '' });

  const phoneValid = phonePattern.test(form.phone);
  const canSubmit = form.name.trim() !== '' && phoneValid && form.area.trim() !== '';

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;
    alert(`Order placed for ${form.name}!`);
  }

  return (
    <form className="order-form" onSubmit={handleSubmit}>
      <label>
        Name
        <input name="name" value={form.name} onChange={handleChange} />
      </label>

      <label>
        TeleBirr number
        <input name="phone" value={form.phone} onChange={handleChange} />
        {form.phone && !phoneValid && (
          <span className="field-error">Use 09XXXXXXXX or +2519XXXXXXXX</span>
        )}
      </label>

      <label>
        Delivery area
        <input name="area" value={form.area} onChange={handleChange} />
      </label>

      <button type="submit" disabled={!canSubmit}>
        Place order
      </button>
    </form>
  );
}

export default OrderForm;
