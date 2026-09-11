import Card from "./Card";
import Dish from "./Dish";

function DishList({ items, onAdd }) {
  if (items.length === 0) {
    return <p>No dishes in this category yet.</p>;
  }

  return (
    <div className="dish-list">
      {items.map((item) => (
        <Card key={item.id}>
          <Dish
            name={item.name}
            price={item.price}
            spicy={item.spicy}
            onAdd={onAdd}
          />
        </Card>
      ))}
    </div>
  );
}

export default DishList;
