import Link from 'next/link';
import Image from 'next/image';
import { getSession } from '@/lib/session';
import { logout } from '@/actions/authActions';

export default async function Header() {
  const session = await getSession();

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-teal-100 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo & Brand Identity */}
          <Link
            href="/"
            className="flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 rounded-lg p-1 group"
          >
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-teal-50 dark:bg-slate-800 border border-teal-200/60 dark:border-teal-900/40 shadow-sm flex items-center justify-center group-hover:scale-105 transition-transform">
              <Image
                src="/logo.png"
                alt="AddisCare Clinic Diary Official Emblem"
                width={40}
                height={40}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
                Addis<span className="text-teal-600">Care</span>
              </span>
              <span className="text-[10px] uppercase font-semibold tracking-wider text-teal-700 dark:text-teal-400 block -mt-1">
                Clinic Diary · Addis Ababa
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/"
              className="px-3.5 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-50/50 dark:hover:bg-slate-800 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
            >
              Home
            </Link>
            <Link
              href="/doctors"
              className="px-3.5 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-50/50 dark:hover:bg-slate-800 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
            >
              Doctors & Specialists
            </Link>
            <Link
              href="/portal/appointments"
              className="px-3.5 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-50/50 dark:hover:bg-slate-800 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
            >
              Patient Portal
            </Link>
            <Link
              href="/clinic/queue"
              className="px-3.5 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-teal-50/50 dark:hover:bg-slate-800 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
            >
              Clinical Staff
            </Link>
          </nav>

          {/* User Status / Auth Controls */}
          <div className="flex items-center gap-3">
            {session ? (
              <div className="flex items-center gap-2">
                <div className="hidden sm:block text-right">
                  <span className="text-xs font-semibold text-slate-900 dark:text-white block">
                    {session.name}
                  </span>
                  <span className="text-[10px] text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60 px-1.5 py-0.5 rounded-full uppercase font-bold tracking-wider">
                    {session.role}
                  </span>
                </div>
                <form action={logout}>
                  <button
                    type="submit"
                    className="px-3 py-1.5 text-xs font-semibold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 dark:bg-red-950/40 dark:hover:bg-red-900/40 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 cursor-pointer min-h-[36px]"
                  >
                    Sign Out
                  </button>
                </form>
              </div>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl shadow-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 min-h-[40px] flex items-center"
              >
                Sign In
              </Link>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}
