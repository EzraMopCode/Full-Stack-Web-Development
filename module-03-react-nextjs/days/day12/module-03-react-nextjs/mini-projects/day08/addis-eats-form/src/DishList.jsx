import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Dish from './Dish';
import Card from './Card';
import { useAddItem } from './cartStore';

function DishList({ dishes }) {
  const addItem = useAddItem();

  if (dishes.length === 0) {
    return <p className="empty-state">No dishes in this category yet.</p>;
  }

  return (
    <div className="menu">
      {dishes.map((dish) => (
        <Card key={dish.id}>
          <Link to={`/menu/${dish.id}`} className="dish-link">
            <Dish name={dish.name} price={dish.price} spicy={dish.spicy} />
          </Link>
          <button className="add-btn" onClick={() => addItem(dish)}>
            Add — {dish.price} ETB
          </button>
        </Card>
      ))}
    </div>
  );
}

DishList.propTypes = {
  dishes: PropTypes.array.isRequired,
};

export default DishList;
