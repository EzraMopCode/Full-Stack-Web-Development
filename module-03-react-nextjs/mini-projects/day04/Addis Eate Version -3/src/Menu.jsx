import { useEffect, useState } from "react";
import { useRef } from 'react';

import PropTypes from "prop-types";
import { getDishes } from "./api";
import DishList from "./DishList";

function SearchInput() {
  const searchRef = useRef(null);

  useEffect(() => {
    searchRef.current.focus();
  }, []);

  return <input ref={searchRef} placeholder="Search dishes" />;
}

function Menu({ category }) {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadDishes() {
      setLoading(true);
      setError(null);

      try {
        const data = await getDishes(category, controller.signal);
        setDishes(data);
      } catch (e) {
        if (e.name !== "AbortError") {
          setError(e.message);
        }
      } finally {
        setLoading(false);
      }
    }

    loadDishes();

    return () => {
      controller.abort();
    };
  }, [category]);

  if (loading) {
    return (
      <div>
        <SearchInput />
        <p>Loading the menu...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <SearchInput />
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <SearchInput />
      <DishList dishes={dishes} />
    </div>
  );
}

Menu.propTypes = {
  category: PropTypes.string.isRequired
};

export default Menu;
