import { useCallback } from "react";
import { useCart } from "./CartProvider";
import { useFetch } from "./useFetch";
import Dish from "./Dish";

function Menu() {
  const { data, loading, error } = useFetch("/dishes.json");
  const { dispatch } = useCart();

  const handleAdd = useCallback((dish) => {
    dispatch({ type: "add", dish });
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <div>
      {data && data.map((d) => (
        <Dish key={d.id} dish={d} onAdd={handleAdd} />
      ))}
    </div>
  );
}

export default Menu;
