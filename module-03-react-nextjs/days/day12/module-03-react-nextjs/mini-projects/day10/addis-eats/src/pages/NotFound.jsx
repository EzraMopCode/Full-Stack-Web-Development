import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-[80vh] bg-slate-50 flex flex-col items-center justify-center p-4 font-sans text-center">

      {/* Fun 404 Graphic */}
      <div className="relative mb-8">
        <div className="text-8xl md:text-9xl font-extrabold text-slate-200">404</div>
        <div className="absolute inset-0 flex items-center justify-center text-6xl">
          🍽️
        </div>
      </div>

      <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
        Page not found
      </h1>

      <p className="text-slate-500 text-lg mb-8 max-w-md">
        Oops! We couldn't find what you were looking for. It looks like this dish has been taken off the menu.
      </p>

      {/* Guiding Action Button */}
      <Link
        to="/"
        className="px-8 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-full shadow-lg shadow-orange-600/30 transition-colors flex items-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Home
      </Link>

    </div>
  );
};

export default NotFound;
