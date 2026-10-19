'use client';

import Link from 'next/link';

const Card = ({ dish }) => {
  if (!dish) return null;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-md shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700 flex flex-col transition-all hover:-translate-y-1 hover:shadow-xl duration-300 group">

      <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-700">
        <img
          src={dish.image}
          alt={dish.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/400x300/f8fafc/f97316?text=Addis+Eats';
          }}
        />
        <div className="absolute top-3 right-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-extrabold text-slate-800 dark:text-white shadow-sm">
          {dish.price} ETB
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">{dish.name}</h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 flex-grow line-clamp-2">
          {dish.description}
        </p>

        <Link
          href={`/menu/${dish.id}`}
          className="w-full py-3 bg-orange-50 dark:bg-orange-950/40 hover:bg-orange-600 hover:text-white text-orange-600 dark:text-orange-400 font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
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
