import { useParams, Link } from "react-router-dom";
import { useFetch } from "./useFetch";
import { useCart } from "./CartProvider";

export default function DishDetail() {
  const { id } = useParams();
  const { data, loading, error } = useFetch("/dishes.json");
  const { dispatch } = useCart();

  if (loading) return <p>Loading details...</p>;
  if (error) return <p>Error: {error}</p>;

  const dish = data?.find((d) => d.id === Number(id));

  if (!dish) {
    return (
      <div className="not-found">
        <h2>Dish Not Found</h2>
        <p>We couldn't find the dish you are looking for.</p>
        <Link to="/menu" className="button-link">&larr; Back to Menu</Link>
      </div>
    );
  }

  return (
    <div className="dish-detail card">
      <h2>{dish.name} {dish.spicy && "🌶️"}</h2>
      <p className="price">{dish.price} ETB</p>
      <p>Category: {dish.category}</p>
      <div className="card-actions">
        <button onClick={() => dispatch({ type: "add", dish })}>Add to Cart</button>
        <Link to="/menu" className="button-link">&larr; Back to Menu</Link>
      </div>
    </div>
  );
}
