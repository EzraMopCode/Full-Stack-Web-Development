import { useState } from "react";
import PropTypes from "prop-types";

function Dish({ name, price, currency = "ETB", spicy = false }) {
  const [count, setCount] = useState(0);

  function handleAdd() {
    setCount(count + 1);
  }

  return (
    <div className="dish">
      <h3>
        {name} {spicy === true && <span>• Spicy</span>} {count}
      </h3>
      <p>
        {price} {currency}
      </p>
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}

Dish.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  spicy: PropTypes.bool
};

export default Dish;
