import React from 'react';
import { Link } from 'react-router-dom';

const Receipt = () => {
  // Generate a random 6-digit order number for realism
  const orderNumber = Math.floor(100000 + Math.random() * 900000);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 font-sans">
      <div className="bg-white p-8 md:p-12 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 max-w-lg w-full text-center">

        {/* Success Icon */}
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-slate-800 mb-2">Order Confirmed!</h1>
        <p className="text-slate-500 mb-8 text-lg">
          Thank you for ordering with Addis Eats. Your authentic Ethiopian meal is being prepared and will be on its way soon.
        </p>

        {/* Order Details Box */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 mb-8 text-center flex flex-col items-center">
          <span className="text-sm text-slate-500 mb-1 font-medium">Order Number</span>
          <span className="font-mono font-bold text-slate-800 text-xl tracking-wider">#{orderNumber}</span>
        </div>

        {/* Action Button */}
        <Link
          to="/"
          className="block w-full py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl shadow-lg shadow-orange-600/30 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Receipt;
