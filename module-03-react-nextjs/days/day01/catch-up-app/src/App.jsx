import { Header } from "./Header";
import { Dish } from "./Dish";

const menuDishes = [
  { id: 1, name: "Kitfo", price: 12.99 },
  { id: 2, name: "Caesar Salad", price: 8.95 },
  { id: 3, name: "Chocolate Cake", price: 6.50 },
  { id: 4, name: "Garlic Bread", price: 4.99 }
];

function App() {
  return (
    <div>
      <Header />
      <main>
        <h2>Menu</h2>
        {menuDishes.map((dish) => (
          <Dish key={dish.id} name={dish.name} price={dish.price} />
        ))}
      </main>
    </div>
  );
}

export default App;
