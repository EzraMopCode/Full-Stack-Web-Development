import Header from './Header';
import Dish from './Dish';
import './App.css';

const menu = [
  { id: 1, name: 'Doro Wat', price: 240 },
  { id: 2, name: 'Tibs', price: 220 },
  { id: 3, name: 'Shiro', price: 150 },
  { id: 4, name: 'Kitfo', price: 260 },
  { id: 5, name: 'Injera with Veggie Combo', price: 180 },
  { id: 6, name: 'Misir Wot', price: 140 },
];

function App() {
  return (
    <div className="app">
      <Header />
      <main className="menu">
        {menu.map((dish) => (
          <Dish key={dish.id} name={dish.name} price={dish.price} />
        ))}
      </main>
    </div>
  );
}

export default App;
