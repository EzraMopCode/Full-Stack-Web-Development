import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card'; // Assuming your Card component is here

const Home = () => {
  // Mock data for the featured section - replace with a fetch to your dishes.json later
  const featuredDishes = [
    { id: 1, name: "Special Kitfo", price: 350, image: "/image_kitfo.jpg", description: "Minced lean beef seasoned with mitmita and niter kibbeh." },
    { id: 2, name: "Shekla Tibs", price: 300, image: "/image_tibs.jpg", description: "Sizzling meat pan-fried with onions, garlic, and jalapeños." },
    { id: 3, name: "Doro Wat", price: 400, image: "/image_doro.jpg", description: "Spicy chicken stew slow-cooked in berbere sauce with a boiled egg." },
    { id: 4, name: "Shiro Tegabino", price: 150, image: "/image_shiro.jpg", description: "Rich, bubbling chickpea stew served in a traditional clay pot." }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      {/* Hero Section */}
      <section className="relative w-full h-[600px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/image_tibs.jpg')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-900/50"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto mt-16">
          <span className="text-orange-500 font-semibold tracking-wider uppercase text-sm mb-4 block">
            Authentic Ethiopian Cuisine
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Craving <span className="text-orange-500">Addis?</span><br />
            We Deliver.
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-10">
            From sizzling Tibs to comforting Shiro, get your favorite traditional dishes delivered hot and fresh to your door.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/menu"
              className="px-8 py-4 bg-orange-600 hover:bg-orange-700 transition-colors text-white font-bold rounded-full shadow-lg shadow-orange-500/30 text-lg"
            >
              Order Now
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 px-4 max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">How It Works</h2>
          <p className="text-slate-500">Your favorite meals in three simple steps</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="p-8 rounded-3xl bg-white border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col items-center text-center transition-transform hover:-translate-y-2">
            <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">1. Choose a Dish</h3>
            <p className="text-slate-500 text-sm">Browse our menu of authentic, locally sourced Ethiopian meals.</p>
          </div>

          {/* Step 2 */}
          <div className="p-8 rounded-3xl bg-white border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col items-center text-center transition-transform hover:-translate-y-2">
            <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">2. Place Order</h3>
            <p className="text-slate-500 text-sm">Add items to your cart and seamlessly checkout in seconds.</p>
          </div>

          {/* Step 3 */}
          <div className="p-8 rounded-3xl bg-white border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col items-center text-center transition-transform hover:-translate-y-2">
            <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">3. Fast Delivery</h3>
            <p className="text-slate-500 text-sm">Our drivers ensure your food arrives hot, fresh, and on time.</p>
          </div>
        </div>
      </section>

      {/* Popular Dishes Section */}
      <section className="py-16 px-4 bg-white w-full">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">Popular Dishes</h2>
              <p className="text-slate-500">Customer favorites you don't want to miss</p>
            </div>
            <Link to="/menu" className="hidden sm:block text-orange-600 font-semibold hover:text-orange-700">
              View Full Menu &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredDishes.map((dish) => (
              <Card key={dish.id} dish={dish} />
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link to="/menu" className="text-orange-600 font-semibold hover:text-orange-700">
              View Full Menu &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-20 px-4 bg-orange-600 text-center w-full">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to enjoy a taste of home?</h2>
          <p className="text-orange-100 text-lg mb-10">Join thousands of happy customers ordering from Addis Eats every day.</p>
          <Link
            to="/menu"
            className="inline-block px-10 py-4 bg-white text-orange-600 hover:bg-slate-50 transition-colors font-bold rounded-full shadow-xl text-lg"
          >
            Start Your Order
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
