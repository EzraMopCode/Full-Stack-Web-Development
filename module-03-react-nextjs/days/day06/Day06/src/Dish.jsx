import { memo } from "react";
import { Link } from "react-router-dom";

const Dish = memo(function Dish({ dish, onAdd }) {
  return (
    <div className="card">
      <h3>{dish.name} {dish.spicy && "🌶️"}</h3>
      <p>{dish.price} ETB</p>

      <div className="card-actions">
        <button onClick={() => onAdd(dish)}>Add to Cart</button>
        <Link to={`/menu/${dish.id}`} className="button-link">
          Details
        </Link>
      </div>
    </div>
  );
});

export default Dish;
