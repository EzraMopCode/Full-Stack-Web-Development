import Header from './Header';
import Dish from './Dish';
import Card from './Card';

function App() {
  const menuItems = [
    { id: 1, name: "Doro Wat", price: 240, category: "meat", spicy: true },
    { id: 2, name: "Shiro Tegamino", price: 150, category: "vegan", spicy: true },
    { id: 3, name: "Kitfo", price: 350, category: "meat", spicy: false },
    { id: 4, name: "Tibs", price: 280, category: "meat", spicy: false }
  ];

  const activeCategory = "vegan";
  const filteredItems = menuItems.filter(item => item.category === activeCategory);

  
  if (filteredItems.length === 0) {
    return (
      <div className="app-container">
        <Header />
        <p>Nothing matches this category.</p>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Header />
      <div className="menu-items">
        {filteredItems.map((item) => (
          <Card key={item.id}>
            <Dish
              name={item.name}
              price={item.price}
              spicy={item.spicy}
            />
          </Card>
        ))}
      </div>
    </div>
  );
}

export default App;
