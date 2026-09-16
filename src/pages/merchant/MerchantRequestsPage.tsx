import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Truck, 
  MapPin, 
  IndianRupee, 
  Search, 
  Clock, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { usePickup } from '../../context/PickupContext';
import { useAuth } from '../../context/AuthContext';
import { pickupService } from '../../services/pickupService';
import { PickupRequest } from '../../types';

export const MerchantRequestsPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { setActivePickup } = usePickup();
  const [pickups, setPickups] = useState<PickupRequest[]>([]);
  const [selectedFilter, setSelectedFilter] = useState('ALL');

  useEffect(() => {
    async function load() {
      const data = await pickupService.getAllPickups();
      setPickups(data);
    }
    load();
  }, []);

  const handleAccept = async (pickup: PickupRequest) => {
    const updated = await pickupService.assignCollector(pickup.id, {
      id: user?.id || 'COL-704',
      name: user?.name || 'Ramesh Kumar',
      rating: 4.8,
      distanceKm: 1.1,
      etaMinutes: 7,
      vehicleType: 'EV Cargo Trike',
      phone: user?.phone || '+91 94140 88219',
      verified: true
    });

    if (updated) {
      setActivePickup(updated);
      navigate('/merchant/navigation');
    }
  };

  const filtered = pickups.filter(p => {
    if (selectedFilter === 'ALL') return true;
    return p.scrapItems.some(it => it.category.toLowerCase() === selectedFilter.toLowerCase());
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-200">
        <div>
          <span className="text-[11px] font-semibold text-amber-900 uppercase tracking-tight">
            Logistics Dispatch Feed
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900">
            Available Citizen Pickups
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5">
            Neemrana Ward 4 & RIICO Industrial Zone (3.0 km active coverage)
          </p>
        </div>

        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0">
          {['ALL', 'PLASTIC', 'PAPER', 'METAL', 'EWASTE'].map((f) => (
            <button
              key={f}
              onClick={() => setSelectedFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedFilter === f
                  ? 'bg-amber-700 text-white shadow-xs'
                  : 'bg-white text-zinc-700 border border-zinc-300 hover:bg-zinc-50'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((p) => {
          const item = p.scrapItems[0];
          return (
            <div
              key={p.id}
              className="p-5 rounded-xl bg-white border border-zinc-200 hover:border-zinc-300 shadow-xs transition-colors space-y-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-zinc-100 text-zinc-700 font-mono">
                    {p.id}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-900 border border-amber-200">
                    {p.scheduledTimeSlot}
                  </span>
                </div>

                <div className="mt-3">
                  <h4 className="text-sm font-bold text-zinc-900">{p.userName}</h4>
                  <p className="text-xs text-zinc-600 flex items-center space-x-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
                    <span>{p.userAddress}</span>
                  </p>
                </div>

                <div className="mt-3 p-3 rounded-lg bg-zinc-50 border border-zinc-200 space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-zinc-500 font-medium">Material:</span>
                    <strong className="text-zinc-900">{item?.materialName || 'Polymer Packaging'}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500 font-medium">Estimated Weight:</span>
                    <strong className="text-zinc-900">{item?.estimatedWeightKg || 4.5} kg</strong>
                  </div>
                  <div className="flex justify-between text-emerald-800 font-medium pt-1 border-t border-zinc-200">
                    <span>Citizen Payout Est:</span>
                    <span className="font-bold">₹{Math.round((item?.estimatedWeightKg || 4.5) * 28)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleAccept(p)}
                className="w-full py-2 px-4 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-xs flex items-center justify-center space-x-1.5 transition-colors"
              >
                <span>Accept Pickup Request</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>

    </div>
  );
};
