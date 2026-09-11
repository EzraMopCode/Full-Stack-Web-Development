// src/Dish.jsx
export function Dish({ name, price }) {
  return (
    <div className="dish-card" style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
      <h3>{name}</h3>
      <p>Price: ${price}</p>
    </div>
  );
}
