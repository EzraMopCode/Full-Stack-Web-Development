const Header = () => {
  return (
    <header>
      <h1>Menu</h1>
    </header>
  );
};

const Dish = ({ name, price }) => {
  return (
    <div>
      <h2>{name}</h2>
      <p>{price}</p>
    </div>
  );
};

function App() {
  const dishes = [
    { id: 1, name: "Tacos", price: 5 },
    { id: 2, name: "Burger", price: 10 },
    { id: 3, name: "Pasta", price: 12 }
  ];

  return (
    <div>
      <Header />
      <h1>Welcome</h1>
      <p>Here are our dishes for today.</p>
      {dishes.map((dish) => (
        <Dish key={dish.id} name={dish.name} price={dish.price} />
      ))}
    </div>
  );
}

export default App;
