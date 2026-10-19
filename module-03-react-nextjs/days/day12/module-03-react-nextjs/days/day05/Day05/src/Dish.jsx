import { memo } from "react";

const Dish = memo(function Dish({ dish, onAdd }) {
  return (
    <div>
      <h3>{dish.name}</h3>
      <p>{dish.price}</p>
      <button onClick={() => onAdd(dish)}>Add</button>
    </div>
  );
});

export default Dish;
