import { useState } from "react";
import { dishes } from "./data";
import CategoryBar from "./Category";
import DishList from "./DishList";
import OrderForm from "./OrderForm";

function Menu() {
  const [category, setCategory] = useState("All");
  const [total, setTotal] = useState(0);

  const cats = ["All", "Main", "Vegan", "Grill"];

  const shown = category === "All"
    ? dishes
    : dishes.filter((d) => d.category === category);

  const handleAddToTotal = (price) => {
    setTotal(total + price);
  };

  return (
    <div>
      <CategoryBar
        categories={cats}
        selected={category}
        onSelect={setCategory}
      />

      <h2>Total: {total} ETB</h2>

      <DishList items={shown} onAdd={handleAddToTotal} />

      <OrderForm />
    </div>
  );
}

export default Menu;
