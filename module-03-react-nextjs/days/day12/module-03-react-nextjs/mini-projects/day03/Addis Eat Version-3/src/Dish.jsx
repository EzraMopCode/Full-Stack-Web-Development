import { useState } from "react";
import PropTypes from "prop-types";

function Dish({ name, price, currency = "ETB", spicy = false, onAdd }) {
  const [count, setCount] = useState(0);

  const handleAdd = () => {
    setCount(count + 1);
    onAdd(price);
  };

  return (
    <div className="dish">
      <h3>
        {name} {count > 0 && <span>({count})</span>} {spicy && <span>• Spicy</span>}
      </h3>
      <p>{price} {currency}</p>
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}

Dish.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  spicy: PropTypes.bool,
  currency: PropTypes.string,
  onAdd: PropTypes.func.isRequired
};

export default Dish;
