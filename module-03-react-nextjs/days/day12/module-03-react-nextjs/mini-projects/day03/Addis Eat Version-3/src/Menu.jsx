import { useState } from 'react';
import menu from './data';
import CategoryBar from './CategoryBar';
import DishList from './DishList';
import OrderForm from './OrderForm';

const categories = ['All', 'Main', 'Vegan', 'Grill'];

function Menu() {
  const [category, setCategory] = useState('All');
  const [total, setTotal] = useState(0);

  const shown = category === 'All'
    ? menu
    : menu.filter((dish) => dish.category === category);

  function handleAdd(price) {
    setTotal((prev) => prev + price);
  }

  return (
    <div className="menu-page">
      <CategoryBar categories={categories} selected={category} onSelect={setCategory} />
      <p className="order-total">Order total: {total} ETB</p>
      <DishList dishes={shown} onAdd={handleAdd} />
      <OrderForm />
    </div>
  );
}

export default Menu;
