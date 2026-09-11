import PropTypes from "prop-types";
import Dish from "./Dish";
import Card from "./Card";

function Menu({ dishes, category }) {
  const filteredDishes = dishes.filter(
    (dish) => dish.category === category
  );

  if (filteredDishes.length === 0) {
    return <p>No dishes found.</p>;
  }

  return (
    <div>
      {filteredDishes.map((dish) => (
        <Card key={dish.id}>
          <Dish
            name={dish.name}
            price={dish.price}
            spicy={dish.spicy}
          />
        </Card>
      ))}
    </div>
  );
}

Menu.propTypes = {
  dishes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
      spicy: PropTypes.bool.isRequired
    })
  ).isRequired,
  category: PropTypes.string.isRequired
};

export default Menu;
