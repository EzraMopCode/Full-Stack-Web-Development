const CategoryBar = ({ activeCategory, setActiveCategory }) => {
  const categories = ['All', 'Traditional', 'Fast Food', 'Vegan', 'Drinks'];

  return (
    <div className="flex gap-3 overflow-x-auto pb-2 pt-1 no-scrollbar snap-x" role="tablist" aria-label="Menu food categories">
      {categories.map((category) => (
        <button
          key={category}
          role="tab"
          aria-selected={activeCategory === category}
          onClick={() => setActiveCategory(category)}
          className={`whitespace-nowrap min-h-[44px] px-6 py-2.5 rounded-full font-bold text-sm transition-all snap-start cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 flex items-center justify-center
            ${
              activeCategory === category
                ? 'bg-orange-600 text-white shadow-md shadow-orange-600/30 border-transparent'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-orange-50 dark:hover:bg-slate-700 hover:text-orange-600 dark:hover:text-orange-500 border border-slate-200 dark:border-slate-700'
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
