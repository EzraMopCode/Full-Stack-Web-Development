"use client";

import { useState } from "react";
import Link from "next/link";
import { foods } from "../data/foods";

export default function DishList({ activeCategory, searchTerm, onAddToCart }) {
  const [quantities, setQuantities] = useState({});

  const filtered = foods.filter((food) => {
    const matchesCategory =
      activeCategory === "All" || food.category === activeCategory;

    const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  function increaseQuantity(id) {
    setQuantities((current) => ({
      ...current,
      [id]: (current[id] || 1) + 1,
    }));
  }

  function decreaseQuantity(id) {
    setQuantities((current) => ({
      ...current,
      [id]: Math.max((current[id] || 1) - 1, 1),
    }));
  }

  return (
    <div className="food-grid">
      {filtered.map((food) => {
        const quantity = quantities[food.id] || 1;

        return (
          <div key={food.id} className="food-card">
            <div className="food-image">
              <img src={food.image} alt={food.name} />

              <button type="button" className="favorite-btn">
                ♡
              </button>
            </div>

            <div className="food-info">
              <span className="food-category">{food.category}</span>

              <h3>{food.name}</h3>

              <p className="food-description">{food.description}</p>

              <div className="food-bottom">
                <p className="food-price">{food.price} ETB</p>

                <div className="quantity">
                  <button
                    type="button"
                    onClick={() => decreaseQuantity(food.id)}
                  >
                    −
                  </button>

                  <span>{quantity}</span>

                  <button
                    type="button"
                    onClick={() => increaseQuantity(food.id)}
                  >
                    +
                  </button>
                </div>
              </div>
              <Link href={`/menu/${food.id}`} className="view-details-btn">
                View Details
              </Link>
              <button
                type="button"
                className="add-to-cart-btn"
                onClick={() => onAddToCart(food, quantity)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
