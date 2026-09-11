import { useState } from "react";

function OrderForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    area: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const isPhoneValid =
    (formData.phone.length === 10 && formData.phone.startsWith("09")) ||
    (formData.phone.length === 13 && formData.phone.startsWith("+2519"));

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="order-form">
      <h3>Delivery Details</h3>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        type="text"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="TeleBirr Number"
      />
      <input
        type="text"
        name="area"
        value={formData.area}
        onChange={handleChange}
        placeholder="Area"
      />
      <button type="submit" disabled={!isPhoneValid}>
        Submit Order
      </button>
    </form>
  );
}

export default OrderForm;
