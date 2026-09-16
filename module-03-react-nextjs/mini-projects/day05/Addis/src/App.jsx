import { CartProvider } from "./CartProvider";
import CartBadge from "./CartBadge";
import Menu from "./Menu";

function App() {
  return (
    <CartProvider>
      <div className="app-container">
        <header className="header">
          <h1>Addis Eats</h1>
          <CartBadge />
        </header>
        <Menu />
      </div>
    </CartProvider>
  );
}

export default App;
