import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-900">
      {/* The Header we styled earlier */}
      <Header />

      {/* The current page content (Home, Menu, Cart, etc.) will render here */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* We can build out a Footer here later */}
      <footer className="bg-slate-900 text-slate-400 text-center py-6 mt-auto">
        <p>© {new Date().getFullYear()} Addis Eats. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
