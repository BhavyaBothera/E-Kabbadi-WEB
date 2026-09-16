import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  MapPin, 
  Layers, 
  Leaf, 
  Scale, 
  Building2, 
  IndianRupee 
} from 'lucide-react';
import { WARD_COLLECTION_DATA } from '../../data/mockData';

export const AdminAnalyticsPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-200">
        <div>
          <span className="text-[11px] font-semibold text-emerald-800 uppercase tracking-tight">
            Municipal Geospatial Intelligence
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900">
            Ward Waste Analytics & Recovery Metrics
          </h1>
        </div>

        <div className="text-xs text-zinc-500 font-medium">
          Neemrana Smart City Pilot (8 Wards Monitored)
        </div>
      </div>

      {/* Ward Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {WARD_COLLECTION_DATA.map((ward) => (
          <div
            key={ward.wardId}
            className="p-5 rounded-xl bg-white border border-zinc-200 hover:border-zinc-300 shadow-xs transition-colors space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-zinc-700 font-mono">
                {ward.wardId}
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-zinc-100 text-zinc-700">
                {ward.activePickups} Pickups Today
              </span>
            </div>

            <div>
              <h3 className="text-sm font-bold text-zinc-900">{ward.name}</h3>
              <p className="text-xs text-zinc-500 mt-0.5">
                Primary Scrap: <strong className="text-zinc-800 font-medium">{ward.dominantMaterial}</strong>
              </p>
            </div>

            <div className="pt-2 border-t border-zinc-100 grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 rounded-lg bg-zinc-50 border border-zinc-200">
                <span className="text-[10px] text-zinc-500 block uppercase font-medium">Recovered</span>
                <span className="text-sm font-bold text-zinc-900">{ward.totalKg} kg</span>
              </div>
              <div className="p-2 rounded-lg bg-zinc-50 border border-zinc-200">
                <span className="text-[10px] text-zinc-500 block uppercase font-medium">Yield Rate</span>
                <span className="text-sm font-bold text-emerald-800">{ward.recoveryRate}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Carbon Offset & Material Yield Comparative Section */}
      <div className="p-6 rounded-xl bg-white border border-zinc-200 shadow-xs space-y-3">
        <h3 className="text-base font-bold text-zinc-900">
          State Pollution Control Board Environmental Offset Multipliers
        </h3>
        <p className="text-xs text-zinc-500">
          Algorithms calibrated against Central Pollution Control Board (CPCB) Circular Economy Guidelines.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-lg bg-zinc-50 border border-zinc-200 space-y-1">
            <span className="text-xs font-semibold text-emerald-900">PET Plastic Factor</span>
            <p className="text-xl font-bold text-zinc-900">2.4 kg CO₂e / kg</p>
            <p className="text-[11px] text-zinc-500">Includes crude cracking energy substitution offset</p>
          </div>

          <div className="p-4 rounded-lg bg-zinc-50 border border-zinc-200 space-y-1">
            <span className="text-xs font-semibold text-amber-900">Metals & Aluminium Factor</span>
            <p className="text-xl font-bold text-zinc-900">9.2 kg CO₂e / kg</p>
            <p className="text-[11px] text-zinc-500">95% electricity saved vs raw bauxite smelting</p>
          </div>

          <div className="p-4 rounded-lg bg-zinc-50 border border-zinc-200 space-y-1">
            <span className="text-xs font-semibold text-zinc-800">Cardboard & Pulp Factor</span>
            <p className="text-xl font-bold text-zinc-900">1.1 kg CO₂e / kg</p>
            <p className="text-[11px] text-zinc-500">Diverts 17 commercial trees per metric ton recycled</p>
          </div>
        </div>
      </div>

    </div>
  );
};
