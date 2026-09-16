import React, { useState } from 'react';
import { 
  Truck, 
  MapPin, 
  Layers, 
  RefreshCw, 
  ShieldCheck, 
  Phone,
  CheckCircle2
} from 'lucide-react';

export const LiveOperationsMap: React.FC = () => {
  const [filter, setFilter] = useState<'ALL' | 'COLLECTORS' | 'PICKUPS'>('ALL');
  const [selectedCollector, setSelectedCollector] = useState<any>(null);

  const collectors = [
    { id: 'EK-704', name: 'Ramesh Kumar', x: 260, y: 340, status: 'EN_ROUTE', loadKg: 38, capacityKg: 150, battery: '82%', phone: '+91 94140 88219', vehicle: 'EV Cargo Trike' },
    { id: 'EK-711', name: 'Mukesh Saini', x: 480, y: 210, status: 'COLLECTING', loadKg: 95, capacityKg: 150, battery: '64%', phone: '+91 98291 33410', vehicle: 'EV Mini Loader' },
    { id: 'EK-723', name: 'Dinesh Yadav', x: 620, y: 390, status: 'AVAILABLE', loadKg: 12, capacityKg: 150, battery: '95%', phone: '+91 99281 12940', vehicle: 'Electric Trike' },
    { id: 'EK-740', name: 'Sanjay Prajapat', x: 310, y: 140, status: 'EN_ROUTE', loadKg: 64, capacityKg: 150, battery: '78%', phone: '+91 94142 90114', vehicle: 'EV Cargo Van' },
  ];

  const pickups = [
    { id: 'PK-991', citizen: 'Ananya Sharma', x: 280, y: 310, type: 'PET Plastic', weight: '4.5 kg', status: 'IN_PROGRESS' },
    { id: 'PK-992', citizen: 'Rohit Verma', x: 460, y: 190, type: 'E-Waste', weight: '3.2 kg', status: 'SCHEDULED' },
    { id: 'PK-993', citizen: 'Sunil Chhabra', x: 640, y: 410, type: 'Cardboard', weight: '22 kg', status: 'SCHEDULED' },
    { id: 'PK-994', citizen: 'Meenakshi S.', x: 190, y: 180, type: 'Iron/Metals', weight: '18.5 kg', status: 'COMPLETED' }
  ];

  return (
    <div className="rounded-xl bg-white border border-zinc-200 shadow-xs overflow-hidden">
      
      {/* Map Control Bar */}
      <div className="p-4 bg-zinc-50 border-b border-zinc-200 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
          <h3 className="text-sm font-bold text-zinc-900">
            Neemrana Urban Waste GIS Operations Grid
          </h3>
          <span className="text-xs px-2 py-0.5 rounded bg-zinc-200/80 text-zinc-700 font-medium">
            Zone: RIICO & Municipal Wards 1–8
          </span>
        </div>

        <div className="flex items-center space-x-1.5">
          {(['ALL', 'COLLECTORS', 'PICKUPS'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                filter === f
                  ? 'bg-zinc-900 text-white'
                  : 'bg-white text-zinc-700 hover:bg-zinc-100 border border-zinc-300'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="relative w-full h-[480px] bg-[#f8fafc]">
        
        {/* SVG Smart City Grid */}
        <svg viewBox="0 0 900 480" className="w-full h-full object-cover">
          <defs>
            <pattern id="gridPatternAdmin" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="900" height="480" fill="url(#gridPatternAdmin)" />

          {/* City Ward zones */}
          <g fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1">
            <polygon points="40,40 280,30 290,210 50,230" />
            <polygon points="310,30 620,40 600,210 310,200" />
            <polygon points="640,40 860,50 850,230 630,210" />
            <polygon points="50,250 290,240 300,450 60,460" />
            <polygon points="320,240 600,250 610,450 320,460" />
            <polygon points="630,240 860,260 850,460 630,460" />
          </g>

          {/* Arterial Road Lines */}
          <g stroke="#ffffff" strokeWidth="18" fill="none" strokeLinecap="round">
            <line x1="0" y1="220" x2="900" y2="220" />
            <line x1="300" y1="0" x2="300" y2="480" />
            <line x1="620" y1="0" x2="620" y2="480" />
            <line x1="0" y1="340" x2="900" y2="340" />
          </g>
          <g stroke="#cbd5e1" strokeWidth="1" fill="none">
            <line x1="0" y1="211" x2="900" y2="211" />
            <line x1="0" y1="229" x2="900" y2="229" />
            <line x1="291" y1="0" x2="291" y2="480" />
            <line x1="309" y1="0" x2="309" y2="480" />
          </g>

          {/* Zone Labels */}
          <text x="120" y="75" fill="#64748b" fontSize="10" fontWeight="600">Ward 1 • Industrial South</text>
          <text x="390" y="75" fill="#64748b" fontSize="10" fontWeight="600">Ward 2 • Japanese Cluster</text>
          <text x="690" y="75" fill="#64748b" fontSize="10" fontWeight="600">Ward 3 • City Center</text>
          <text x="120" y="290" fill="#64748b" fontSize="10" fontWeight="600">Ward 4 • Sector 4 Residential</text>
          <text x="400" y="290" fill="#64748b" fontSize="10" fontWeight="600">Ward 5 • Recovery Hub 02</text>

          {/* Pickups */}
          {(filter === 'ALL' || filter === 'PICKUPS') && pickups.map(p => (
            <g key={p.id} transform={`translate(${p.x}, ${p.y})`}>
              <circle r="7" fill={p.status === 'COMPLETED' ? '#059669' : '#d97706'} stroke="#ffffff" strokeWidth="2" />
              <text x="0" y="-10" fill="#334155" fontSize="9" fontWeight="bold" textAnchor="middle">
                {p.citizen} ({p.weight})
              </text>
            </g>
          ))}

          {/* Collectors */}
          {(filter === 'ALL' || filter === 'COLLECTORS') && collectors.map(c => (
            <g 
              key={c.id} 
              transform={`translate(${c.x}, ${c.y})`}
              className="cursor-pointer"
              onClick={() => setSelectedCollector(c)}
            >
              <circle r="15" fill="#047857" stroke="#ffffff" strokeWidth="2.5" />
              <foreignObject x="-8" y="-8" width="16" height="16">
                <div className="w-full h-full flex items-center justify-center text-white">
                  <Truck className="w-3.5 h-3.5" />
                </div>
              </foreignObject>
              <text x="0" y="22" fill="#0f172a" fontSize="10" fontWeight="bold" textAnchor="middle">
                {c.name.split(' ')[0]} ({c.battery})
              </text>
            </g>
          ))}
        </svg>

        {/* Selected Collector Panel */}
        {selectedCollector && (
          <div className="absolute right-4 top-4 z-10 w-72 p-4 rounded-xl bg-white border border-zinc-200 shadow-xl space-y-3 animate-in fade-in">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-100">
              <div>
                <h4 className="text-xs font-bold text-zinc-900">{selectedCollector.name}</h4>
                <span className="text-[10px] text-zinc-500">{selectedCollector.vehicle} ({selectedCollector.id})</span>
              </div>
              <button
                onClick={() => setSelectedCollector(null)}
                className="text-zinc-400 hover:text-zinc-700 text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-zinc-500">Status:</span>
                <span className="font-semibold text-emerald-800">{selectedCollector.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Current Payload:</span>
                <span className="font-semibold text-zinc-800">{selectedCollector.loadKg} / {selectedCollector.capacityKg} kg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Battery Level:</span>
                <span className="font-semibold text-zinc-800">{selectedCollector.battery}</span>
              </div>
            </div>

            <a
              href={`tel:${selectedCollector.phone}`}
              className="w-full py-1.5 px-3 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold flex items-center justify-center space-x-1 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Contact Collector</span>
            </a>
          </div>
        )}

      </div>
    </div>
  );
};
