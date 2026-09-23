import { useEffect, useRef, useState } from 'react';
import { fetchDishes } from './api';
import CategoryBar from './CategoryBar';
import DishList from './DishList';
import OrderForm from './OrderForm';

const categories = ['All', 'Main', 'Vegan', 'Grill'];

function Menu() {
  const [category, setCategory] = useState('All');
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [total, setTotal] = useState(0);

  const searchRef = useRef(null);

  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchDishes(controller.signal);
        setDishes(data);
      } catch (e) {
        if (e.name !== 'AbortError') {
          setError(e.message);
        }
      } finally {
        setLoading(false);
      }
    }

    load();

    return () => controller.abort();
  }, [category]);

  function handleAdd(price) {
    setTotal((prev) => prev + price);
  }

  const filtered = dishes
    .filter((dish) => category === 'All' || dish.category === category)
    .filter((dish) => dish.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="menu-page">
      <input
        ref={searchRef}
        className="search-input"
        type="text"
        placeholder="Search dishes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <CategoryBar categories={categories} selected={category} onSelect={setCategory} />
      <p className="order-total">Order total: {total} ETB</p>

      {loading && <p className="status-message">Loading the menu…</p>}
      {!loading && error && <p className="status-message error">{error}</p>}
      {!loading && !error && <DishList dishes={filtered} onAdd={handleAdd} />}

      <OrderForm />
    </div>
  );
}

export default Menu;
