import { useParams, Link } from "react-router-dom";
import { useFetch } from "./useFetch";

export default function DishDetail() {
  const { id } = useParams();
  const { data, loading, error } = useFetch("/dishes.json");

  if (loading) return <p>Loading details...</p>;
  if (error) return <p>Error: {error}</p>;

  const dish = data?.find((d) => d.id === Number(id));

  if (!dish) return <p>Dish not found.</p>;

  return (
    <div className="dish-detail">
      <h2>{dish.name} {dish.spicy && "🌶️"}</h2>
      <p className="price">{dish.price} ETB</p>
      <p>Category: {dish.category}</p>

      <Link to="/menu" className="button-link">
        &larr; Back to Menu
      </Link>
    </div>
  );
}
