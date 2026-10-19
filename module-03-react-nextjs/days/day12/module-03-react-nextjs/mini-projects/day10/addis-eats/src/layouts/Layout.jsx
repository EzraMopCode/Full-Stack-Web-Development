import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import MobileNav from '../components/MobileNav';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-900">
      <Header />

      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="bg-slate-900 text-slate-400 text-center py-6 mt-auto">
        <p>© {new Date().getFullYear()} Addis Eats. All rights reserved.</p>
      </footer>
      <MobileNav/>
    </div>
  );
};

export default Layout;
