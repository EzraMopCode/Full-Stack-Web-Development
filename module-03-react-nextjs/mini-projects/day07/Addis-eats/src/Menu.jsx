import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useFetch } from './useFetch';
import CategoryBar from './CategoryBar';
import DishList from './DishList';

const categories = ['All', 'Main', 'Vegan', 'Grill'];

function Menu() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category') || 'All';
  const [search, setSearch] = useState('');
  const searchRef = useRef(null);

  const { data, loading, error } = useFetch(`/dishes.json?category=${category}`);

  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  const dishes = data ?? [];

  const filtered = useMemo(
    () =>
      dishes
        .filter((dish) => category === 'All' || dish.category === category)
        .filter((dish) => dish.name.toLowerCase().includes(search.toLowerCase())),
    [dishes, category, search]
  );

  function handleCategorySelect(next) {
    setSearchParams(next === 'All' ? {} : { category: next });
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

      <CategoryBar categories={categories} selected={category} onSelect={handleCategorySelect} />

      {loading && <p className="status-message">Loading the menu…</p>}
      {!loading && error && <p className="status-message error">{error}</p>}
      {!loading && !error && <DishList dishes={filtered} />}
    </div>
  );
}

export default Menu;
