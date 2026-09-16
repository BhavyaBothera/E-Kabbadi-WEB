import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Package, 
  IndianRupee, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  ShieldCheck, 
  Search, 
  Filter, 
  Truck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { pickupService } from '../../services/pickupService';
import { PickupRequest } from '../../types';

export const UserOrdersPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [pickups, setPickups] = useState<PickupRequest[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  useEffect(() => {
    async function load() {
      if (user) {
        const data = await pickupService.getUserPickups(user.id);
        setPickups(data);
      }
    }
    load();
  }, [user]);

  const filteredPickups = pickups.filter(p => {
    const matchesSearch = p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.scrapItems.some(item => item.materialName.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'ALL' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-200">
        <div>
          <span className="text-[11px] font-semibold text-emerald-800 uppercase tracking-tight">
            Circular Scrap Ledger
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900">
            Your Scrap Pickups & Weighment Records
          </h1>
        </div>

        <Link
          to="/user/sell"
          className="px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-xs flex items-center space-x-2 self-start sm:self-auto transition-colors"
        >
          <span>+ Book New Pickup</span>
        </Link>
      </div>

      {/* Filter / Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-zinc-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by pickup ID or scrap material..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white border border-zinc-300 focus:ring-2 focus:ring-emerald-700 focus:outline-none text-xs text-zinc-900 placeholder-zinc-400"
          />
        </div>

        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0">
          {['ALL', 'COMPLETED', 'ON_THE_WAY', 'ASSIGNED'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                statusFilter === st
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-white text-zinc-700 border border-zinc-300 hover:bg-zinc-50'
              }`}
            >
              {st.replace(/_/g, ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Pickups Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPickups.map((p) => {
          const item = p.scrapItems[0];
          const isCompleted = p.status === 'COMPLETED';

          return (
            <div
              key={p.id}
              className="p-5 rounded-xl bg-white border border-zinc-200 hover:border-zinc-300 shadow-xs transition-colors flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-zinc-100 text-zinc-700 font-mono">
                    {p.id}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                    isCompleted ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' :
                    p.status === 'ON_THE_WAY' ? 'bg-amber-50 text-amber-900 border border-amber-200' :
                    'bg-zinc-100 text-zinc-800'
                  }`}>
                    {p.status.replace(/_/g, ' ')}
                  </span>
                </div>

                <div className="mt-3">
                  <h4 className="text-sm font-bold text-zinc-900">{item?.materialName || 'Polymer Packaging'}</h4>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Net Weight: {item?.actualWeightKg || item?.estimatedWeightKg || 4.5} kg
                  </p>
                </div>

                <div className="mt-2 text-xs text-zinc-600 flex items-center space-x-2">
                  <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                  <span>{p.scheduledDate} ({p.scheduledTimeSlot})</span>
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-zinc-500 block uppercase font-medium">Payout</span>
                  <span className="text-sm font-bold text-zinc-900 flex items-center">
                    <IndianRupee className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{p.finalAmount || Math.round((item?.estimatedWeightKg || 4.5) * 28)}</span>
                  </span>
                </div>

                <Link
                  to={`/user/orders/${p.id}`}
                  className="px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-semibold flex items-center space-x-1 transition-colors"
                >
                  <span>Traceability</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
