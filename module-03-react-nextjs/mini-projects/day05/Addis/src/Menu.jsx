import { useEffect, useMemo, useRef, useState } from 'react';
import { useFetch } from './useFetch';
import { useCart } from './CartContext';
import CategoryBar from './CategoryBar';
import DishList from './DishList';

const categories = ['All', 'Main', 'Vegan', 'Grill'];

function Menu() {
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const { dispatch } = useCart();
  const searchRef = useRef(null);

  const { data, loading, error } = useFetch(`/dishes.json?category=${category}`);

  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  const dishes = data ?? [];

  // Justified useMemo: filtering runs on every keystroke/category change,
  // so we avoid re-filtering the whole list when unrelated state (e.g. cart) changes.
  const filtered = useMemo(
    () =>
      dishes
        .filter((dish) => category === 'All' || dish.category === category)
        .filter((dish) => dish.name.toLowerCase().includes(search.toLowerCase())),
    [dishes, category, search]
  );

  function handleAdd(dish) {
    dispatch({ type: 'add', dish });
  }

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

      {loading && <p className="status-message">Loading the menu…</p>}
      {!loading && error && <p className="status-message error">{error}</p>}
      {!loading && !error && <DishList dishes={filtered} onAdd={handleAdd} />}
    </div>
  );
}

export default Menu;
