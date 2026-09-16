import { memo } from "react";

const Dish = memo(function Dish({ dish, onAdd }) {
  return (
    <div className="card">
      <h3>{dish.name} {dish.spicy && "🌶️"}</h3>
      <p>{dish.price} ETB</p>
      <button onClick={() => onAdd(dish)}>Add to Cart</button>
    </div>
  );
});

export default Dish;
