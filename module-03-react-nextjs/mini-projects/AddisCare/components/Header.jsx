import Link from 'next/link';
import Image from 'next/image';
import { getSession } from '@/lib/session';
import { logout } from '@/actions/authActions';
import ThemeToggle from '@/components/ThemeToggle';
import { LogOutIcon } from '@/components/Icons';

export default async function Header() {
  const session = await getSession();

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-teal-100 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo & Brand Identity */}
          <Link
            href="/"
            className="flex items-center gap-3.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 rounded-xl p-1.5 group"
          >
            <div className="relative w-12 h-12 md:w-14 md:h-14 flex-shrink-0 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
              <Image
                src="/logo.png"
                alt="AddisCare Emblem"
                width={56}
                height={56}
                className="w-full h-full object-contain drop-shadow-sm"
                priority
              />
            </div>
            <div>
              <span className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-none inline-block">
                Addis<span className="text-teal-600">Care</span>
              </span>
              <span className="text-[11px] uppercase font-bold tracking-wider text-teal-700 dark:text-teal-400 block mt-1">
                Clinic Diary
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

          {/* User Status / Auth Controls / Theme Toggle */}
          <div className="flex items-center gap-2.5">
            <ThemeToggle />

            {session ? (
              <div className="flex items-center gap-3 pl-2.5 border-l border-slate-200 dark:border-slate-800">
                {/* User Identity Pill with Avatar Initials */}
                <div className="flex items-center gap-2.5">
                  <div className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-teal-700 to-teal-500 text-white font-bold text-xs flex items-center justify-center shadow-sm">
                    {session.name.replace(/^(Dr\.|Nurse)\s*/i, '').split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()}
                    <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900" title="Active Clinical Session"></span>
                  </div>
                  <div className="hidden sm:block text-left">
                    <span className="text-xs font-bold text-slate-900 dark:text-white block leading-tight">
                      {session.name}
                    </span>
                    <span className={`inline-block mt-0.5 text-[9px] px-2 py-0.5 rounded-full uppercase font-extrabold tracking-wider ${
                      session.role === 'doctor'
                        ? 'bg-teal-50 dark:bg-teal-950/80 text-teal-700 dark:text-teal-300 border border-teal-200/60 dark:border-teal-800/80'
                        : session.role === 'staff'
                        ? 'bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/80'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700'
                    }`}>
                      {session.role}
                    </span>
                  </div>
                </div>

                {/* Refined Ghost Sign Out Button */}
                <form action={logout}>
                  <button
                    type="submit"
                    title="Sign out of AddisCare"
                    className="px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 bg-slate-100 hover:bg-red-50 dark:bg-slate-800/80 dark:hover:bg-red-950/40 border border-slate-200/80 dark:border-slate-700 hover:border-red-200 dark:hover:border-red-900/60 rounded-xl transition-all duration-150 flex items-center gap-1.5 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 min-h-[36px]"
                  >
                    <LogOutIcon className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
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
