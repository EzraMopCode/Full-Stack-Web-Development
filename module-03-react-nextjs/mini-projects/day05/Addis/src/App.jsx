import Header from './Header';
import Menu from './Menu';
import CheckoutPanel from './CheckoutPanel';
import OrderForm from './OrderForm';
import CartProvider from './CartProvider';
import './App.css';

function App() {
  return (
    <CartProvider>
      <div className="app">
        <Header />
        <Menu />
        <CheckoutPanel />
        <OrderForm />
      </div>
    </CartProvider>
  );
}

export default App;
