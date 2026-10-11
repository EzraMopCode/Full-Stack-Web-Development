import { User, Package, MapPin, CreditCard, Settings, LogOut, ChevronRight } from 'lucide-react';

const Profile = () => {
  // Placeholder user data until the backend is connected
  const user = {
    name: "Abebe Kebede",
    email: "abebe.kebede@example.com",
    phone: "+251 911 234 567",
    joined: "September 2026"
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 font-sans pb-24 md:pb-8">
      <div className="max-w-3xl mx-auto">

        <h1 className="text-3xl font-bold text-slate-800 mb-8">My Profile</h1>

        {/* User Info Card */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm flex items-center gap-6 mb-8">
          <div className="w-20 h-20 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
            <User className="w-10 h-10" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">{user.name}</h2>
            <p className="text-slate-500">{user.email}</p>
            <p className="text-slate-500 text-sm mt-1">Member since {user.joined}</p>
          </div>
        </div>

        {/* Menu Options */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden mb-8">

          <button className="w-full flex items-center justify-between p-4 md:p-6 hover:bg-slate-50 transition-colors border-b border-slate-100">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                <Package className="w-5 h-5" />
              </div>
              <span className="font-semibold text-slate-800">Order History</span>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </button>

          <button className="w-full flex items-center justify-between p-4 md:p-6 hover:bg-slate-50 transition-colors border-b border-slate-100">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-green-50 text-green-600 rounded-full flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <span className="font-semibold text-slate-800">Delivery Addresses</span>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </button>

          <button className="w-full flex items-center justify-between p-4 md:p-6 hover:bg-slate-50 transition-colors border-b border-slate-100">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center">
                <CreditCard className="w-5 h-5" />
              </div>
              <span className="font-semibold text-slate-800">Payment Methods</span>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </button>

          <button className="w-full flex items-center justify-between p-4 md:p-6 hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-slate-100 text-slate-600 rounded-full flex items-center justify-center">
                <Settings className="w-5 h-5" />
              </div>
              <span className="font-semibold text-slate-800">Account Settings</span>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </button>

        </div>

        {/* Log Out Button */}
        <button className="w-full flex items-center justify-center gap-2 py-4 bg-red-50 text-red-600 hover:bg-red-100 font-bold rounded-2xl transition-colors">
          <LogOut className="w-5 h-5" />
          Log Out
        </button>

      </div>
    </div>
  );
};

export default Profile;
