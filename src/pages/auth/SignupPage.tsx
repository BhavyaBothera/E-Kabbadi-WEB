import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Recycle, User, Truck, Mail, Lock, Phone, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'USER' | 'MERCHANT'>('USER');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError(null);

    const res = await signup({ name, email, phone, role });
    setLoading(false);

    if (res.success) {
      if (role === 'MERCHANT') navigate('/merchant/dashboard');
      else navigate('/user/dashboard');
    } else {
      setError(res.error || 'Registration failed');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 sm:p-6 bg-zinc-50">
      <div className="w-full max-w-xl rounded-xl bg-white border border-zinc-200 shadow-sm p-6 sm:p-8 space-y-6">
        
        <div className="text-center space-y-1.5">
          <div className="inline-flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-700 flex items-center justify-center text-white">
              <Recycle className="w-4 h-4" />
            </div>
            <span className="text-lg font-bold text-zinc-900 tracking-tight">
              E-KABAADI
            </span>
          </div>
          <h2 className="text-xl font-bold text-zinc-900">
            Create Your Account
          </h2>
          <p className="text-xs text-zinc-500">
            Already registered? <Link to="/auth/login" className="text-emerald-800 hover:underline font-semibold">Sign In</Link>
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          {/* Role Choice */}
          <div className="space-y-1.5">
            <label className="text-zinc-700 font-semibold">Select Account Type</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole('USER')}
                className={`p-3 rounded-lg border text-left transition-colors flex items-start space-x-2.5 ${
                  role === 'USER'
                    ? 'bg-emerald-50 border-emerald-700 text-emerald-950 ring-1 ring-emerald-700'
                    : 'bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50'
                }`}
              >
                <User className={`w-4 h-4 mt-0.5 ${role === 'USER' ? 'text-emerald-700' : 'text-zinc-400'}`} />
                <div>
                  <p className="font-bold text-zinc-900 text-xs">Citizen / Household</p>
                  <p className="text-[11px] text-zinc-500 mt-0.5">Sell scrap & earn instant UPI</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setRole('MERCHANT')}
                className={`p-3 rounded-lg border text-left transition-colors flex items-start space-x-2.5 ${
                  role === 'MERCHANT'
                    ? 'bg-amber-50 border-amber-700 text-amber-950 ring-1 ring-amber-700'
                    : 'bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50'
                }`}
              >
                <Truck className={`w-4 h-4 mt-0.5 ${role === 'MERCHANT' ? 'text-amber-700' : 'text-zinc-400'}`} />
                <div>
                  <p className="font-bold text-zinc-900 text-xs">Scrap Collector</p>
                  <p className="text-[11px] text-zinc-500 mt-0.5">Accept pickups & digital weighing</p>
                </div>
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-semibold text-zinc-700">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Ramesh Kumar or Ananya Sharma"
              className="w-full px-3 py-2 rounded-lg border border-zinc-300 text-zinc-900 focus:ring-2 focus:ring-emerald-700 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-semibold text-zinc-700">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-3 py-2 rounded-lg border border-zinc-300 text-zinc-900 focus:ring-2 focus:ring-emerald-700 focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-zinc-700">Phone Number</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98290 12345"
                className="w-full px-3 py-2 rounded-lg border border-zinc-300 text-zinc-900 focus:ring-2 focus:ring-emerald-700 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="font-semibold text-zinc-700">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2 rounded-lg border border-zinc-300 text-zinc-900 focus:ring-2 focus:ring-emerald-700 focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="font-semibold text-zinc-700">Confirm Password</label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2 rounded-lg border border-zinc-300 text-zinc-900 focus:ring-2 focus:ring-emerald-700 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs transition-colors shadow-xs flex items-center justify-center space-x-1.5"
          >
            <span>{loading ? 'Registering...' : 'Create Account'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

      </div>
    </div>
  );
};
