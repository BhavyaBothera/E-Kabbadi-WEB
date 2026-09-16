import React from 'react';
import { useNavigate } from 'react-router-dom';

export const QuickDemoBar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-slate-900/90 backdrop-blur-md border border-slate-700 rounded-full px-4 py-2 shadow-2xl flex items-center gap-3 text-xs text-white">
      <span className="font-semibold text-green-400 uppercase tracking-wider">Demo Controls:</span>
      <button 
        onClick={() => navigate('/')}
        className="px-3 py-1 bg-slate-800 hover:bg-slate-700 rounded-full transition"
      >
        User View
      </button>
      <button 
        onClick={() => navigate('/merchant')}
        className="px-3 py-1 bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 rounded-full border border-emerald-500/30 transition"
      >
        Merchant View
      </button>
      <button 
        onClick={() => navigate('/admin')}
        className="px-3 py-1 bg-purple-600/30 hover:bg-purple-600/50 text-purple-300 rounded-full border border-purple-500/30 transition"
      >
        Admin Console
      </button>
    </div>
  );
};