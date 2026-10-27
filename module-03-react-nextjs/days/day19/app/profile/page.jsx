'use client';

import { User, Package, MapPin, CreditCard, Settings, LogOut, ChevronRight, LogIn } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Link from 'next/link';

export default function ProfilePage() {
  const { isAuthenticated, logout } = useAuth();

  const user = {
    name: "Abebe Kebede",
    email: "abebe.kebede@example.com",
    phone: "+251 911 234 567",
    joined: "September 2026"
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 font-sans pb-24 md:pb-8 transition-colors">
      <div className="max-w-3xl mx-auto">

        <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-8">My Profile</h1>

        {/* User Info Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-6 mb-8">
          <div className="w-20 h-20 bg-orange-100 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400 rounded-full flex items-center justify-center flex-shrink-0">
            <User className="w-10 h-10" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">{user.name}</h2>
            <p className="text-slate-500 dark:text-slate-400">{user.email}</p>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Member since {user.joined}</p>
          </div>
        </div>

        {/* Menu Options */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden mb-8">

          <button className="w-full flex items-center justify-between p-4 md:p-6 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border-b border-slate-100 dark:border-slate-800 cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center">
                <Package className="w-5 h-5" />
              </div>
              <span className="font-semibold text-slate-800 dark:text-white">Order History</span>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </button>

          <button className="w-full flex items-center justify-between p-4 md:p-6 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border-b border-slate-100 dark:border-slate-800 cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-green-50 dark:bg-green-950/50 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <span className="font-semibold text-slate-800 dark:text-white">Delivery Addresses</span>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </button>

          <button className="w-full flex items-center justify-between p-4 md:p-6 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border-b border-slate-100 dark:border-slate-800 cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center">
                <CreditCard className="w-5 h-5" />
              </div>
              <span className="font-semibold text-slate-800 dark:text-white">Payment Methods</span>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </button>

          <button className="w-full flex items-center justify-between p-4 md:p-6 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full flex items-center justify-center">
                <Settings className="w-5 h-5" />
              </div>
              <span className="font-semibold text-slate-800 dark:text-white">Account Settings</span>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </button>

        </div>

        {/* Log In / Log Out Button */}
        {isAuthenticated ? (
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 py-4 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-950/50 font-bold rounded-2xl transition-colors cursor-pointer"
          >
            <LogOut className="w-5 h-5" />
            Log Out
          </button>
        ) : (
          <Link
            href="/login"
            className="w-full flex items-center justify-center gap-2 py-4 bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-950/50 font-bold rounded-2xl transition-colors cursor-pointer"
          >
            <LogIn className="w-5 h-5" />
            Sign In
          </Link>
        )}

      </div>
    </div>
  );
}
