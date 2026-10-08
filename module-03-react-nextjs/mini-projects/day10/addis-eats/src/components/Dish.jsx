import { memo } from 'react';
import PropTypes from 'prop-types';

function getDishImage(name) {
  const lower = name.toLowerCase();

  if (lower.includes('doro') || lower.includes('chicken')) {
    return '/image_doro.jpg';
  }

  if (lower.includes('tibs') || lower.includes('awaze') || lower.includes('meat')) {
    return '/image_tibs.jpg';
  }

  // Added 'misir', 'wot', and 'wat' to load the rich red stew image
  if (lower.includes('shiro') || lower.includes('shiro') || lower.includes('wot') || lower.includes('wat')) {
    return '/image_shiro.jpg';
  }

  // Added 'veggie' and 'combo' to load the fasting platter image
  if (lower.includes('vegan') || lower.includes('beyaynetu') || lower.includes('fasting') || lower.includes('veggie') || lower.includes('combo')) {
    return '/image_vegan.jpg';
  }

  if (lower.includes('genfo') || lower.includes('porridge')) {
    return '/image_genfo.jpg';
  }

  if (lower.includes('kikil') || lower.includes('alicha') || lower.includes('soup')) {
    return '/image_kikil.jpg';
  }

  if (lower.includes('kitfo') || lower.includes('special') || lower.includes('platter')) {
    return '/image_kitfo.jpg';
  }

  // Updated fallback to an image that actually exists in your public folder
  return '/image_vegan.jpg';
}

function Dish({ name, price, currency, spicy }) {
  return (
    <div className="dish">
      <div className="dish-image-wrapper">
        <img
          src={getDishImage(name)}
          alt={name}
          className="dish-photo"
          loading="lazy"
        />
      </div>
      <div className="dish-info">
        <h3 className="dish-name">
          {name}
        </h3>
        <div className="dish-meta">
          <p className="dish-price">{price} {currency}</p>
          {spicy && <span className="spicy-badge">🌶️ Spicy</span>}
        </div>
      </div>
    </div>
  );
}

Dish.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  currency: PropTypes.string,
  spicy: PropTypes.bool,
};

Dish.defaultProps = {
  currency: 'ETB',
  spicy: false,
};

export default memo(Dish);
