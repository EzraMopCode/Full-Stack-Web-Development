"use client";

import { Search } from "lucide-react";

export default function CategoryBar({
  activeCategory,
  setActiveCategory,
  searchTerm,
  setSearchTerm,
}) {
  const categories = [
    "All",
    "Traditional",
    "Healthy",
    "Fasting",
  ];

  return (
    <section className="menu-bar">
      <div className="search-bar">
        <Search size={15} className="search-icon" />

        <input
          className="search-input"
          type="search"
          placeholder="Search food"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="filter-buttons">
        {categories.map((category) => (
          <button
            key={category}
            className={`filter-btn ${
              activeCategory === category ? "active" : ""
            }`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </section>
  );
}
