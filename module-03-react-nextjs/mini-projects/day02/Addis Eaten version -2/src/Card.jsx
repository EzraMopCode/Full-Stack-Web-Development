import PropTypes from 'prop-types';

function Dish({ name, price, currency = 'ETB', spicy = false }) {
  return (
    <div className="dish">
      <h3 className="dish-name">
        {name} {spicy && <span className="spicy-badge">• Spicy</span>}
      </h3>
      <p className="dish-price">{price} {currency}</p>
    </div>
  );
}

Dish.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  currency: PropTypes.string,
  spicy: PropTypes.bool,
};

export default Dish;
