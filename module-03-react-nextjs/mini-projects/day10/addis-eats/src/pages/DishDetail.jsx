import  { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { menuData } from '../data/menuData'; // <-- Import the new data

const DishDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dish, setDish] = useState(null);

  const addToCart = useCartStore((state) => state.addToCart);
  const { favorites, toggleFavorite } = useCartStore();

  useEffect(() => {
    const foundDish = menuData.find(d => d.id === parseInt(id));
    setDish(foundDish);
  }, [id]);

  if (!dish) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin mb-4"></div>
          <p className="text-slate-500 font-medium">Loading dish details...</p>
        </div>
      </div>
    );
  }

  const isFavorite = favorites.some((item) => item.id === dish.id);

  return (
    <div className="min-h-screen bg-slate-50 py-12 font-sans">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-500 hover:text-orange-600 mb-8 transition-colors font-medium"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Menu
        </button>

        <div className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-slate-200/40 border border-slate-100 flex flex-col md:flex-row">

          {/* Image Section */}
          <div className="md:w-1/2 relative h-64 md:h-auto bg-slate-100">
            <img
              src={dish.image}
              alt={dish.name}
              className="w-full h-full object-cover"
              onError={(e) => { e.target.src = 'https://via.placeholder.com/600x600/f8fafc/f97316?text=Image'; }}
            />
            <button
              onClick={() => toggleFavorite(dish)}
              className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-md hover:bg-orange-50 transition-colors z-10"
            >
              <svg className={`w-6 h-6 ${isFavorite ? 'text-red-500 fill-current' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>

          {/* Details Section */}
          <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <div className="mb-2 flex items-center gap-3">
              <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-bold tracking-wide">
                {dish.category}
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-slate-800 mb-4">{dish.name}</h1>
            <p className="text-3xl font-extrabold text-orange-600 mb-6">{dish.price} ETB</p>

            <div className="bg-slate-50 p-4 rounded-2xl mb-8 border border-slate-100">
              <p className="text-slate-600 text-lg leading-relaxed">
                {dish.description}
              </p>
            </div>

            <button
              onClick={() => {
                addToCart(dish);
                navigate('/cart'); // Optional: Instantly take them to the cart after adding
              }}
              className="w-full py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-orange-600/30 flex items-center justify-center gap-2 text-lg active:scale-95"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Add to Order
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DishDetail;
