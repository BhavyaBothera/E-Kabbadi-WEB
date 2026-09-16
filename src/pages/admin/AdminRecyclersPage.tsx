import React from 'react';
import { 
  Building2, 
  Recycle, 
  ShieldCheck, 
  MapPin, 
  CheckCircle2
} from 'lucide-react';
import { RECYCLER_FACILITIES } from '../../data/mockData';

export const AdminRecyclersPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-200">
        <div>
          <span className="text-[11px] font-semibold text-emerald-800 uppercase tracking-tight">
            CPCB Authorized Recycling Network
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900">
            Downstream Circular Processing Hubs
          </h1>
        </div>

        <div className="text-xs text-zinc-500 font-medium">
          3 Authorized Industrial Plants Connected in Rajasthan
        </div>
      </div>

      {/* Recyclers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {RECYCLER_FACILITIES.map((facility) => (
          <div
            key={facility.id}
            className="p-6 rounded-xl bg-white border border-zinc-200 shadow-xs flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-zinc-500 font-mono">{facility.id}</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center space-x-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-700" />
                  <span>CPCB CERTIFIED</span>
                </span>
              </div>

              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>

              <div>
                <h3 className="text-base font-bold text-zinc-900 leading-snug">{facility.name}</h3>
                <p className="text-xs text-zinc-500 mt-0.5 flex items-center">
                  <MapPin className="w-3.5 h-3.5 text-zinc-400 mr-1 flex-shrink-0" />
                  <span>{facility.location}</span>
                </p>
              </div>

              <div className="pt-2">
                <span className="text-[11px] text-zinc-500 uppercase font-semibold block">
                  Accepted Circular Streams:
                </span>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {facility.acceptedMaterials.map((mat, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-zinc-100 text-zinc-700 text-xs font-medium border border-zinc-200">
                      {mat}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-100 space-y-1.5 text-xs">
              <div className="flex justify-between text-zinc-600">
                <span>Annual Processing Capacity:</span>
                <strong className="text-zinc-900">{facility.capacityTonsPerYear.toLocaleString()} Tons/Yr</strong>
              </div>
              <div className="flex justify-between text-zinc-600">
                <span>Compliance License:</span>
                <strong className="text-emerald-800 font-mono">{facility.cpcbLicense}</strong>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
