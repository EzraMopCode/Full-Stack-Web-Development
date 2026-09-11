import { useState } from "react";
import Card from "./Card";
import Dish from "./Dish";
import CategoryBar from "./Catagory";
import DeliveryForm from "./Delivery";

function Menu({ items }) {
  const [category, setCategory] = useState("all");
  const [total, setTotal] = useState(0);

  const categories = ["all", "meat", "vegan"];

  const filteredItems = category === "all"
    ? items
    : items.filter(item => item.category === category);

  const handleAddToTotal = (price) => {
    setTotal(total + price);
  };

  return (
    <div className="menu-container">
      <CategoryBar
        categories={categories}
        selected={category}
        onSelect={setCategory}
      />

      <div className="order-total">
        <h2>Total: {total} ETB</h2>
      </div>

      {filteredItems.length === 0 ? (
        <p className="empty-state">No dishes match this category.</p>
      ) : (
        <div className="menu-list">
          {filteredItems.map((item) => (
            <Card key={item.id}>
              <Dish
                name={item.name}
                price={item.price}
                spicy={item.spicy}
                onAdd={handleAddToTotal}
              />
            </Card>
          ))}
        </div>
      )}

      <DeliveryForm />
    </div>
  );
}

export default Menu;
