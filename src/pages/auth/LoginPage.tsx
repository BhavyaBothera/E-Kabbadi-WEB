import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Recycle, 
  Lock, 
  Mail, 
  ArrowRight, 
  ShieldCheck,
  User,
  Truck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, switchRole } = useAuth();
  const [email, setEmail] = useState('user@ekabaadi.com');
  const [password, setPassword] = useState('user123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      if (email.includes('merchant')) navigate('/merchant/dashboard');
      else if (email.includes('admin')) navigate('/admin/dashboard');
      else navigate('/user/dashboard');
    } else {
      setError(res.error || 'Invalid credentials');
    }
  };

  const handleQuickDemoLogin = async (role: UserRole) => {
    setLoading(true);
    await switchRole(role);
    setLoading(false);
    if (role === 'USER') navigate('/user/dashboard');
    if (role === 'MERCHANT') navigate('/merchant/dashboard');
    if (role === 'ADMIN') navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 sm:p-6 bg-zinc-50">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-12 rounded-xl bg-white border border-zinc-200 shadow-sm overflow-hidden">
        
        {/* Left: Platform Overview */}
        <div className="md:col-span-5 p-7 bg-zinc-50 flex flex-col justify-between border-b md:border-b-0 md:border-r border-zinc-200">
          <div>
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-700 flex items-center justify-center text-white">
                <Recycle className="w-4 h-4" />
              </div>
              <span className="text-base font-bold text-zinc-900 tracking-tight">
                E-KABAADI
              </span>
            </div>

            <div className="mt-8 space-y-2">
              <span className="text-[11px] font-semibold uppercase tracking-tight text-emerald-800">
                Civic Recycling Logistics
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 leading-snug">
                Transparent doorstep scrap recycling.
              </h2>
              <p className="text-xs text-zinc-600 leading-relaxed pt-1">
                Fair real-time market rates, calibrated digital scales, instant UPI bank transfers, and verified zero-landfill processing.
              </p>
            </div>
          </div>

          {/* Quick Demo Role Switcher */}
          <div className="my-6 space-y-2.5">
            <span className="text-[11px] font-semibold uppercase text-zinc-500 block">
              Quick 1-Click Role Login:
            </span>

            <button
              type="button"
              onClick={() => handleQuickDemoLogin('USER')}
              className="w-full p-2.5 rounded-lg bg-white border border-zinc-200 hover:border-emerald-700 text-left text-xs transition-colors flex items-center justify-between"
            >
              <div className="flex items-center space-x-2">
                <User className="w-3.5 h-3.5 text-emerald-700" />
                <span className="font-semibold text-zinc-800">Citizen / Household</span>
              </div>
              <span className="text-[11px] text-zinc-400">Ananya Sharma →</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemoLogin('MERCHANT')}
              className="w-full p-2.5 rounded-lg bg-white border border-zinc-200 hover:border-amber-700 text-left text-xs transition-colors flex items-center justify-between"
            >
              <div className="flex items-center space-x-2">
                <Truck className="w-3.5 h-3.5 text-amber-700" />
                <span className="font-semibold text-zinc-800">EV Collector Trike</span>
              </div>
              <span className="text-[11px] text-zinc-400">Ramesh Kumar →</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickDemoLogin('ADMIN')}
              className="w-full p-2.5 rounded-lg bg-white border border-zinc-200 hover:border-zinc-800 text-left text-xs transition-colors flex items-center justify-between"
            >
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-3.5 h-3.5 text-zinc-700" />
                <span className="font-semibold text-zinc-800">Smart City Municipal Admin</span>
              </div>
              <span className="text-[11px] text-zinc-400">ULB-08 Officer →</span>
            </button>
          </div>

          <div className="text-[11px] text-zinc-500 flex items-center space-x-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            <span>Rajasthan Pollution Control Board Compliant</span>
          </div>
        </div>

        {/* Right: Sign In Form */}
        <div className="md:col-span-7 p-7 sm:p-9 flex flex-col justify-center space-y-5 bg-white">
          <div>
            <h3 className="text-xl font-bold text-zinc-900">Sign in to your account</h3>
            <p className="text-xs text-zinc-500 mt-1">
              Access scheduled pickups, digital scale slips, and eco rewards.
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="font-semibold text-zinc-700">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-2.5 text-zinc-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="user@ekabaadi.com"
                  className="w-full pl-9 pr-3 py-2 rounded-lg border border-zinc-300 text-zinc-900 focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="font-semibold text-zinc-700">Password</label>
                <Link to="/auth/forgot-password" className="text-xs text-emerald-800 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-2.5 text-zinc-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 rounded-lg border border-zinc-300 text-zinc-900 focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs transition-colors shadow-xs flex items-center justify-center space-x-1.5"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          <div className="pt-2 text-center text-xs text-zinc-500">
            Don't have an account?{' '}
            <Link to="/auth/signup" className="text-emerald-800 font-semibold hover:underline">
              Create citizen account
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
