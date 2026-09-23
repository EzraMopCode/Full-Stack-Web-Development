import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Dish from './Dish';
import Card from './Card';
import Modal from './ui/Modal';
import { useAddItem } from './cartStore';

function DishList({ dishes }) {
  const addItem = useAddItem();
  const [activeDish, setActiveDish] = useState(null);
  const [crash, setCrash] = useState(false);

  if (crash) {
    throw new Error('Simulated menu crash (Day 34 demo)');
  }

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
          <div className="card-actions">
            <button className="quick-view-btn" onClick={() => setActiveDish(dish)}>
              Quick view
            </button>
            <button className="add-btn" onClick={() => addItem(dish)}>
              Add — {dish.price} ETB
            </button>
          </div>
        </Card>
      ))}

      <Modal isOpen={!!activeDish} onClose={() => setActiveDish(null)} title={activeDish?.name ?? ''}>
        {activeDish && (
          <div className="modal-body">
            <p className="dish-price">{activeDish.price} ETB</p>
            <p>Category: {activeDish.category}</p>
            {activeDish.spicy && <p className="spicy-badge">• Spicy</p>}
            <button
              className="add-btn"
              onClick={() => {
                addItem(activeDish);
                setActiveDish(null);
              }}
            >
              Add to cart
            </button>
          </div>
        )}
      </Modal>

      <button className="danger-btn" onClick={() => setCrash(true)}>
        💥 Simulate menu crash
      </button>
    </div>
  );
}

DishList.propTypes = {
  dishes: PropTypes.array.isRequired,
};

export default DishList;
