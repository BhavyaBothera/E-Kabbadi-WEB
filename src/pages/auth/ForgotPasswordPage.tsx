import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Recycle, Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-zinc-50">
      <div className="w-full max-w-md rounded-xl bg-white border border-zinc-200 p-6 sm:p-7 shadow-sm space-y-4 text-xs">
        <Link to="/auth/login" className="inline-flex items-center space-x-1.5 text-zinc-600 hover:text-zinc-900 font-medium">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Login</span>
        </Link>

        <div>
          <h2 className="text-lg font-bold text-zinc-900">Reset Password</h2>
          <p className="text-zinc-500 mt-1">
            Enter your registered email address to receive password reset instructions.
          </p>
        </div>

        {sent ? (
          <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-center space-y-2">
            <CheckCircle2 className="w-6 h-6 text-emerald-700 mx-auto" />
            <p className="font-bold text-zinc-900 text-sm">Reset Link Dispatched</p>
            <p className="text-zinc-600 text-xs">
              We sent verification instructions to <strong className="text-zinc-900">{email}</strong>.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-zinc-700 font-semibold">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-2.5 text-zinc-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-9 pr-3 py-2 rounded-lg border border-zinc-300 text-zinc-900 focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold transition-colors shadow-xs"
            >
              Send Reset Instructions
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
