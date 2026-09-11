import { useState } from "react";

function Delivery() {
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

  const isPhoneValid = formData.phone.length === 10 && formData.phone.startsWith("09");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="delivery-form">
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
        placeholder="TeleBirr Number (e.g., 0912345678)"
      />
      <input
        type="text"
        name="area"
        value={formData.area}
        onChange={handleChange}
        placeholder="Area"
      />
      <button type="submit" disabled={!isPhoneValid}>
        Complete Order
      </button>
    </form>
  );
}

export default Delivery;
