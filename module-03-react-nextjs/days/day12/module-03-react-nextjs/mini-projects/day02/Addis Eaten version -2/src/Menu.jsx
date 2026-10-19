import PropTypes from 'prop-types';
import Dish from './Dish';
import Card from './Card';
import menu from './data';

function Menu({ category }) {
  const filtered = category
    ? menu.filter((dish) => dish.category === category)
    : menu;

  if (filtered.length === 0) {
    return <p className="empty-state">No dishes found in this category.</p>;
  }

  return (
    <div className="menu">
      {filtered.map((dish) => (
        <Card key={dish.id}>
          <Dish name={dish.name} price={dish.price} spicy={dish.spicy} />
        </Card>
      ))}
    </div>
  );
}

Menu.propTypes = {
  category: PropTypes.string,
};

export default Menu;
