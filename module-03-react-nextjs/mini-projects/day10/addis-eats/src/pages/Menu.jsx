import React, { useState, useEffect } from 'react';
import CategoryBar from '../components/CategoryBar';
import DishList from '../components/DishList';

const Menu = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [dishes, setDishes] = useState([]);

  // Fetching the exact files from your public folder
  useEffect(() => {
    const fetchDishes = async () => {
      // If you are using dishes.json, make sure the "image" values inside it match these exactly.
      const menuData = [
        { id: 1, name: "Doro Wat", price: 240, category: "Traditional", image: "/image_doro.jpg", description: "Spicy chicken stew slow-cooked in berbere sauce." },
        { id: 2, name: "Tibs", price: 220, category: "Traditional", image: "/image_tibs.jpg", description: "Sizzling meat pan-fried with onions and jalapeños." },
        { id: 3, name: "Shiro", price: 150, category: "Vegan", image: "/image_shiro.jpg", description: "Rich, bubbling chickpea stew served hot." },
        { id: 4, name: "Kitfo", price: 260, category: "Traditional", image: "/image_kitfo.jpg", description: "Minced lean beef seasoned with mitmita." },
        { id: 5, name: "Veggie Combo", price: 180, category: "Vegan", image: "/image_vegan.jpg", description: "Assorted vegan stews served on fresh injera." },
        { id: 6, name: "Kikil", price: 740, category: "Traditional", image: "/image_kikil.jpg", description: "Traditional Ethiopian boiled meat soup." }
      ];
      setDishes(menuData);
    };
    fetchDishes();
  }, []);

  // Search and Category Filter Logic
  const filteredDishes = dishes.filter(dish => {
    const matchesCategory = activeCategory === 'All' || dish.category === activeCategory;
    const matchesSearch = dish.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 pt-8 pb-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Menu Header & Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800">Our Menu</h1>
            <p className="text-slate-500 mt-2 text-lg">Discover the authentic flavors of Addis</p>
          </div>

          {/* Styled Search Bar */}
          <div className="relative w-full md:w-96">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search dishes (e.g. Tibs)..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 bg-white focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all outline-none shadow-sm text-slate-700"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Sticky Category Bar */}
        <div className="sticky top-20 z-30 bg-slate-50/95 backdrop-blur-md py-4 mb-6 border-b border-slate-200/50 -mx-4 px-4 sm:mx-0 sm:px-0">
          <CategoryBar
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
        </div>

        {/* Results Count */}
        <div className="mb-6 flex justify-between items-center">
          <span className="text-slate-500 font-medium">
            Showing {filteredDishes.length} {filteredDishes.length === 1 ? 'dish' : 'dishes'}
          </span>
        </div>

        {/* Dish Grid or Empty State */}
        {filteredDishes.length > 0 ? (
          <DishList dishes={filteredDishes} />
        ) : (
          <div className="text-center py-24 bg-white rounded-3xl border border-slate-100 shadow-sm">
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">No dishes found</h3>
            <p className="text-slate-500">We couldn't find anything matching your search.</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
              className="mt-6 px-6 py-2 bg-orange-50 text-orange-600 font-semibold rounded-full hover:bg-orange-100 transition-colors"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
