import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  IndianRupee, 
  Globe, 
  ShieldCheck, 
  LogOut, 
  Check, 
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const UserProfilePage: React.FC = () => {
  const { user, logout, switchRole } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || 'Ananya Sharma');
  const [upiVpa, setUpiVpa] = useState('ananya@okhdfcbank');
  const [address, setAddress] = useState(user?.address || 'Flat 402, Royal Palms, Sector 4, Neemrana');
  const [language, setLanguage] = useState<'EN' | 'HI'>('EN');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleLogout = () => {
    logout();
    navigate('/auth/login');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-zinc-200">
        <div>
          <span className="text-[11px] font-semibold text-emerald-800 uppercase tracking-tight">
            Account & Payout Settings
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900">
            Citizen Profile
          </h1>
        </div>

        <button
          onClick={handleLogout}
          className="px-3 py-1.5 rounded-lg border border-zinc-300 bg-white hover:bg-zinc-50 text-zinc-700 text-xs font-semibold flex items-center space-x-1.5 transition-colors shadow-xs"
        >
          <LogOut className="w-3.5 h-3.5 text-zinc-500" />
          <span>Sign Out</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Profile Card Left */}
        <div className="md:col-span-4 p-5 rounded-xl bg-white border border-zinc-200 text-center space-y-4 shadow-xs">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-900 mx-auto flex items-center justify-center text-xl font-bold">
            {name.charAt(0)}
          </div>
          <div>
            <h2 className="text-base font-bold text-zinc-900">{name}</h2>
            <p className="text-xs text-zinc-500">{user?.email || 'ananya.s@gmail.com'}</p>
            <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-semibold border border-emerald-200">
              Verified Citizen Account
            </span>
          </div>

          <div className="pt-3 border-t border-zinc-100 grid grid-cols-2 gap-2 text-center text-xs">
            <div className="p-2 rounded-lg bg-zinc-50 border border-zinc-200">
              <span className="text-[10px] text-zinc-500 block uppercase font-medium">Recycled</span>
              <strong className="text-zinc-900">{user?.totalKgRecycled || 12.5} kg</strong>
            </div>
            <div className="p-2 rounded-lg bg-zinc-50 border border-zinc-200">
              <span className="text-[10px] text-zinc-500 block uppercase font-medium">Eco Points</span>
              <strong className="text-amber-800 font-bold">{user?.ecoPoints || 840}</strong>
            </div>
          </div>

          <div className="pt-2 text-left space-y-2">
            <span className="text-[11px] font-bold text-zinc-700 uppercase">
              Role Switcher
            </span>
            <button
              onClick={() => { switchRole('MERCHANT'); navigate('/merchant/dashboard'); }}
              className="w-full py-2 px-3 rounded-lg bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 text-xs text-zinc-700 flex items-center justify-between transition-colors"
            >
              <span>Switch to Collector View</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-700" />
            </button>
            <button
              onClick={() => { switchRole('ADMIN'); navigate('/admin/dashboard'); }}
              className="w-full py-2 px-3 rounded-lg bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 text-xs text-zinc-700 flex items-center justify-between transition-colors"
            >
              <span>Switch to Smart City Admin</span>
              <ArrowRight className="w-3.5 h-3.5 text-zinc-600" />
            </button>
          </div>
        </div>

        {/* Edit Form Right */}
        <div className="md:col-span-8 p-6 rounded-xl bg-white border border-zinc-200 shadow-xs">
          <form onSubmit={handleSave} className="space-y-4 text-xs">
            
            <div className="space-y-1">
              <label className="font-semibold text-zinc-700">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-zinc-300 text-zinc-900 focus:ring-2 focus:ring-emerald-700 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-zinc-700 flex items-center justify-between">
                <span>Direct UPI ID for Instant Payouts</span>
                <span className="text-emerald-800 font-normal">Verified VPA</span>
              </label>
              <div className="relative">
                <IndianRupee className="w-4 h-4 absolute left-3 top-2.5 text-zinc-400" />
                <input
                  type="text"
                  value={upiVpa}
                  onChange={(e) => setUpiVpa(e.target.value)}
                  placeholder="e.g. mobile@upi or name@bank"
                  className="w-full pl-9 pr-3 py-2 rounded-lg border border-zinc-300 text-zinc-900 focus:ring-2 focus:ring-emerald-700 focus:outline-none font-mono"
                />
              </div>
              <p className="text-[11px] text-zinc-500">
                Payouts are wired to this account immediately after your doorstep weighing slip is confirmed.
              </p>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-zinc-700">Default Pickup Address</label>
              <textarea
                rows={2}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-zinc-300 text-zinc-900 focus:ring-2 focus:ring-emerald-700 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-zinc-700">Preferred Language</label>
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setLanguage('EN')}
                  className={`px-3.5 py-1.5 rounded-lg border text-xs font-semibold ${
                    language === 'EN'
                      ? 'bg-emerald-700 text-white border-emerald-700'
                      : 'bg-white text-zinc-700 border-zinc-300'
                  }`}
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('HI')}
                  className={`px-3.5 py-1.5 rounded-lg border text-xs font-semibold ${
                    language === 'HI'
                      ? 'bg-emerald-700 text-white border-emerald-700'
                      : 'bg-white text-zinc-700 border-zinc-300'
                  }`}
                >
                  हिन्दी (Hindi)
                </button>
              </div>
            </div>

            <div className="pt-3 border-t border-zinc-100 flex items-center justify-between">
              {saved && (
                <span className="text-emerald-800 font-semibold flex items-center space-x-1">
                  <Check className="w-4 h-4" />
                  <span>Settings updated successfully!</span>
                </span>
              )}
              <button
                type="submit"
                className="ml-auto py-2 px-5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-xs transition-colors"
              >
                Save Preferences
              </button>
            </div>

          </form>
        </div>

      </div>

    </div>
  );
};
