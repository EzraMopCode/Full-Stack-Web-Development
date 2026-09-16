import { useSearchParams } from "react-router-dom";
import { useFetch } from "./useFetch";
import { useCart } from "./CartProvider";
import Dish from "./Dish";

export default function Menu() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") || "All";

  const { data, loading, error } = useFetch("/dishes.json");
  const { dispatch } = useCart();

  const categories = ["All", "Main", "Vegan", "Grill"];

  if (loading) return <p>Loading menu...</p>;
  if (error) return <p>Error: {error}</p>;

  const filteredDishes = category === "All" ? data : data?.filter(d => d.category === category);

  return (
    <div className="menu-layout">
      <div className="category-bar">
        {categories.map(cat => (
          <button
            key={cat}
            className={category === cat ? "active" : ""}
            onClick={() => setSearchParams({ category: cat })}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="dish-list">
        {filteredDishes?.map(d => (
          <Dish key={d.id} dish={d} onAdd={(dish) => dispatch({ type: "add", dish })} />
        ))}
      </div>
    </div>
  );
}
