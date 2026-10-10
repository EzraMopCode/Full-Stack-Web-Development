import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ dish }) => {
  // Safety check to ensure the component doesn't crash if data is missing
  if (!dish) return null;

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md shadow-slate-200/50 border border-slate-100 flex flex-col transition-all hover:-translate-y-1 hover:shadow-xl duration-300 group">

      {/* Image Container */}
      <div className="relative h-48 overflow-hidden bg-slate-100">
        <img
          src={dish.image}
          alt={dish.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          // Fallback just in case an image is missing from the public folder
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x300/f8fafc/f97316?text=Addis+Eats';
          }}
        />
        {/* Floating Price Tag */}
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-extrabold text-slate-800 shadow-sm">
          {dish.price} ETB
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-slate-800 mb-2">{dish.name}</h3>
        <p className="text-slate-500 text-sm mb-6 flex-grow line-clamp-2">
          {dish.description}
        </p>

        {/* Action Button */}
        <Link
          to="/menu"
          className="w-full py-3 bg-orange-50 hover:bg-orange-600 text-orange-600 hover:text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Order Now
        </Link>
      </div>

    </div>
  );
};

export default Card;
