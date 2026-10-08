import { useParams, Link, useNavigate } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { useAddItem } from '../store/cartStore'

// Maps dish keywords to your local public images
function getDishImage(name) {
  const lower = name.toLowerCase();
  if (lower.includes('doro') || lower.includes('chicken')) return '/image_doro.jpg';
  if (lower.includes('tibs') || lower.includes('awaze') || lower.includes('meat')) return '/image_tibs.jpg';
  if (lower.includes('shiro') || lower.includes('misir') || lower.includes('wot') || lower.includes('wat')) return '/image_shiro.jpg';
  if (lower.includes('vegan') || lower.includes('beyaynetu') || lower.includes('fasting') || lower.includes('veggie') || lower.includes('combo')) return '/image_vegan.jpg';
  if (lower.includes('genfo') || lower.includes('porridge')) return '/image_genfo.jpg';
  if (lower.includes('kikil') || lower.includes('alicha') || lower.includes('soup')) return '/image_kikil.jpg';
  if (lower.includes('kitfo') || lower.includes('special') || lower.includes('platter')) return '/image_kitfo.jpg';
  return '/image_vegan.jpg';
}

function DishDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading, error } = useFetch('/dishes.json');
  const addItem = useAddItem();

  if (loading) return <p className="status-message">Loading dish…</p>;
  if (error) return <p className="status-message error">{error}</p>;

  const dish = data?.find((d) => String(d.id) === id);

  if (!dish) {
    return (
      <div className="empty-state">
        <p>Sorry, we couldn't find that dish.</p>
        <Link to="/menu" className="add-btn">Back to menu</Link>
      </div>
    );
  }

  return (
    <div className="dish-detail-container">
      <button className="quick-view-btn back-btn" onClick={() => navigate(-1)}>
        ← Back to Menu
      </button>

      <div className="dish-detail-card card">
        <div className="dish-detail-image">
          <img src={getDishImage(dish.name)} alt={dish.name} />
        </div>

        <div className="dish-detail-info">
          <h2>{dish.name} {dish.spicy && <span className="spicy-badge">🌶️ Spicy</span>}</h2>
          <p className="dish-price-large">{dish.price} ETB</p>

          <div className="dish-category">
            Category: <span>{dish.category}</span>
          </div>

          <p className="dish-description">
            Experience the authentic taste of our freshly prepared {dish.name}. Made with traditional spices and locally sourced ingredients for the perfect flavor.
          </p>

          <button className="add-btn large-btn" onClick={() => addItem(dish)}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default DishDetail;
