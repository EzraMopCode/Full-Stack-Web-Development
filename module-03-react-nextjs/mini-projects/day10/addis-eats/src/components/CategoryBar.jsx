import React from 'react';

const CategoryBar = ({ activeCategory, setActiveCategory }) => {
  // You can adjust these categories based on your actual dishes.json data
  const categories = ['All', 'Traditional', 'Fast Food', 'Vegan', 'Drinks'];

  return (
    <div className="flex gap-3 overflow-x-auto pb-2 pt-1 no-scrollbar snap-x">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setActiveCategory(category)}
          className={`whitespace-nowrap px-6 py-2.5 rounded-full font-semibold text-sm transition-all snap-start
            ${
              activeCategory === category
                ? 'bg-orange-600 text-white shadow-md shadow-orange-600/30 border-transparent'
                : 'bg-white text-slate-600 hover:bg-orange-50 hover:text-orange-600 border border-slate-200'
            }
          `}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryBar;
