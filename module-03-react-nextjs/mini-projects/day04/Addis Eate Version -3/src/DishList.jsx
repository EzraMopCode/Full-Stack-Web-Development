import PropTypes from "prop-types";
import Dish from "./Dish";

function DishList({ dishes }) {
  if (dishes.length === 0) {
    return <p>No dishes found in this category.</p>;
  }

  return (
    <div>
      {dishes.map((dish) => (
        <Dish
          key={dish.id}
          name={dish.name}
          price={dish.price}
          spicy={dish.spicy}
        />
      ))}
    </div>
  );
}

DishList.propTypes = {
  dishes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
      spicy: PropTypes.bool.isRequired
    })
  ).isRequired
};

export default DishList;
