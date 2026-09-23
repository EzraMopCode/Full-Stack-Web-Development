import { useParams, Link } from 'react-router-dom';
import { useFetch } from './useFetch';
import { useAddItem } from './cartStore';

function DishDetail() {
  const { id } = useParams();
  const { data, loading, error } = useFetch('/dishes.json');
  const addItem = useAddItem();

  if (loading) return <p className="status-message">Loading dish…</p>;
  if (error) return <p className="status-message error">{error}</p>;

  const dish = data?.find((d) => String(d.id) === id);

  if (!dish) {
    return (
      <div className="dish-detail">
        <p className="empty-state">Sorry, we couldn't find that dish.</p>
        <Link to="/menu" className="add-btn">Back to menu</Link>
      </div>
    );
  }

  return (
    <div className="dish-detail">
      <h2>{dish.name} {dish.spicy && <span className="spicy-badge">• Spicy</span>}</h2>
      <p className="dish-price">{dish.price} ETB</p>
      <p>Category: {dish.category}</p>
      <button className="add-btn" onClick={() => addItem(dish)}>
        Add to cart
      </button>
    </div>
  );
}

export default DishDetail;
