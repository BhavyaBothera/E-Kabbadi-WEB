import React from 'react';
import { 
  Truck, 
  ShieldCheck, 
  Star, 
  BatteryCharging, 
  Phone, 
  MapPin, 
  CheckCircle2
} from 'lucide-react';

export const AdminCollectorsPage: React.FC = () => {
  const collectors = [
    { id: 'EK-704', name: 'Ramesh Kumar', vehicle: 'Electric Trike (EV-48)', battery: '82%', load: '38/150 kg', ward: 'Ward 4 • Sector 4', rating: 4.8, trips: 184, status: 'EN_ROUTE', phone: '+91 94140 88219' },
    { id: 'EK-711', name: 'Mukesh Saini', vehicle: 'EV Mini Loader (EV-90)', battery: '64%', load: '95/150 kg', ward: 'Ward 2 • Japanese Cluster', rating: 4.9, trips: 220, status: 'COLLECTING', phone: '+91 98291 33410' },
    { id: 'EK-723', name: 'Dinesh Yadav', vehicle: 'Electric Trike (EV-48)', battery: '95%', load: '12/150 kg', ward: 'Ward 5 • Recovery Hub', rating: 4.7, trips: 142, status: 'AVAILABLE', phone: '+91 99281 12940' },
    { id: 'EK-740', name: 'Sanjay Prajapat', vehicle: 'EV Cargo Van (EV-120)', battery: '78%', load: '64/150 kg', ward: 'Ward 1 • Industrial South', rating: 4.9, trips: 310, status: 'EN_ROUTE', phone: '+91 94142 90114' },
    { id: 'EK-755', name: 'Rajendra Meena', vehicle: 'Electric Trike (EV-48)', battery: '41%', load: '110/150 kg', ward: 'Ward 3 • City Center', rating: 4.6, trips: 98, status: 'RETURNING_TO_HUB', phone: '+91 98284 55109' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-200">
        <div>
          <span className="text-[11px] font-semibold text-emerald-800 uppercase tracking-tight">
            Operational Logistics Fleet
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900">
            Registered Electric Vehicle Collectors
          </h1>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <span className="px-3 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium">
            5/5 EV Units Active
          </span>
          <span className="px-3 py-1 rounded-lg bg-zinc-100 text-zinc-700 border border-zinc-200 font-medium">
            100% Electric Fleet
          </span>
        </div>
      </div>

      {/* Fleet Table */}
      <div className="rounded-xl bg-white border border-zinc-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 uppercase font-semibold text-[11px]">
              <tr>
                <th className="p-4">Collector & ID</th>
                <th className="p-4">Vehicle & Battery</th>
                <th className="p-4">Current Payload</th>
                <th className="p-4">Assigned Ward</th>
                <th className="p-4">Rating & Trips</th>
                <th className="p-4">Operational Status</th>
                <th className="p-4 text-right">Contact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 text-zinc-700">
              {collectors.map((c) => (
                <tr key={c.id} className="hover:bg-zinc-50/80 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center font-bold">
                        {c.id.split('-')[1]}
                      </div>
                      <div>
                        <strong className="text-zinc-900 block font-semibold">{c.name}</strong>
                        <span className="text-[11px] text-zinc-500">{c.phone}</span>
                      </div>
                    </div>
                  </td>

                  <td className="p-4">
                    <div>
                      <span className="text-zinc-900 block font-medium">{c.vehicle}</span>
                      <span className="text-[11px] text-emerald-800 font-medium flex items-center mt-0.5">
                        <BatteryCharging className="w-3.5 h-3.5 mr-1" /> {c.battery}
                      </span>
                    </div>
                  </td>

                  <td className="p-4 font-semibold text-zinc-900">
                    {c.load}
                  </td>

                  <td className="p-4 text-zinc-600">
                    <span className="flex items-center">
                      <MapPin className="w-3.5 h-3.5 text-zinc-400 mr-1" />
                      {c.ward}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="flex items-center space-x-1 text-amber-700">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      <strong>{c.rating}</strong>
                      <span className="text-zinc-400">({c.trips} trips)</span>
                    </div>
                  </td>

                  <td className="p-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {c.status.replace(/_/g, ' ')}
                    </span>
                  </td>

                  <td className="p-4 text-right">
                    <a
                      href={`tel:${c.phone}`}
                      className="inline-flex items-center px-2.5 py-1 rounded bg-zinc-100 hover:bg-zinc-200 text-zinc-700 font-medium transition-colors"
                    >
                      <Phone className="w-3 h-3 mr-1" /> Call
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
