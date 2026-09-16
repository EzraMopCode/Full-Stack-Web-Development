import { useState, useCallback } from "react";
import { useFetch } from "./useFetch";
import { useCart } from "./CartProvider";
import Dish from "./Dish";
import CheckoutPanel from "./CheckoutPanel";

function Menu() {
  const [category, setCategory] = useState("All");

  // Adding the category to the URL changes the hook dependency, forcing the AbortController to cancel the previous request
  const { data, loading, error } = useFetch(`/dishes.json?category=${category}`);
  const { dispatch } = useCart();

  // useCallback keeps this function reference stable, allowing React.memo to properly skip re-renders on the Dish component
  const handleAdd = useCallback((dish) => {
    dispatch({ type: "add", dish });
  }, [dispatch]);

  const categories = ["All", "Main", "Vegan", "Grill"];

  if (loading) return <p>Loading menu...</p>;
  if (error) return <p>Error: {error}</p>;

  const filteredDishes = category === "All"
    ? data
    : data.filter(d => d.category === category);

  return (
    <div className="menu-layout">
      <div className="category-bar">
        {categories.map(cat => (
          <button
            key={cat}
            className={category === cat ? "active" : ""}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="dish-list">
        {filteredDishes && filteredDishes.map(d => (
          <Dish key={d.id} dish={d} onAdd={handleAdd} />
        ))}
      </div>

      <CheckoutPanel />
    </div>
  );
}

export default Menu;
