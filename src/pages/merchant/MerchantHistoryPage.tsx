import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  IndianRupee, 
  Calendar, 
  MapPin, 
  Scale, 
  Star, 
  Truck, 
  Download, 
  ArrowLeft 
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { pickupService } from '../../services/pickupService';
import { PickupRequest } from '../../types';

export const MerchantHistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const [pickups, setPickups] = useState<PickupRequest[]>([]);

  useEffect(() => {
    async function load() {
      const data = await pickupService.getAllPickups();
      setPickups(data.filter(p => p.status === 'COMPLETED'));
    }
    load();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-200">
        <div>
          <span className="text-[11px] font-semibold text-amber-900 uppercase tracking-tight">
            Collector Dispatch History
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900">
            Completed Collection Trips
          </h1>
        </div>

        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-lg bg-white border border-zinc-200 text-xs shadow-xs">
            <span className="text-zinc-500 font-medium">Total Trips: </span>
            <strong className="text-zinc-900 ml-1">{pickups.length + 18}</strong>
          </div>
          <div className="p-2.5 rounded-lg bg-white border border-zinc-200 text-xs shadow-xs">
            <span className="text-zinc-500 font-medium">Net Earnings: </span>
            <strong className="text-emerald-800 font-bold ml-1">₹14,820</strong>
          </div>
        </div>
      </div>

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pickups.map((p) => {
          const item = p.scrapItems[0];
          return (
            <div
              key={p.id}
              className="p-5 rounded-xl bg-white border border-zinc-200 shadow-xs space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-zinc-700 font-mono">{p.id}</span>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                  Verified & Paid
                </span>
              </div>

              <div className="text-xs space-y-1">
                <h4 className="font-bold text-zinc-900 text-sm">{item?.materialName || 'Scrap Material'}</h4>
                <p className="text-zinc-600">
                  Citizen: <strong className="text-zinc-900">{p.userName}</strong>
                </p>
                <p className="text-zinc-500">
                  Actual Scale Weight: <strong>{item?.actualWeightKg || 4.5} kg</strong>
                </p>
              </div>

              <div className="pt-3 border-t border-zinc-100 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-zinc-500 block uppercase font-medium">Settlement</span>
                  <span className="text-sm font-bold text-emerald-800">
                    ₹{p.finalAmount || 126} UPI
                  </span>
                </div>

                <div className="flex items-center text-amber-700">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500 mr-1" />
                  <span className="font-bold">5.0</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
