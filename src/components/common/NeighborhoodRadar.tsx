import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Truck, 
  MapPin, 
  ShieldCheck, 
  Star, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  Radio,
  Navigation,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface ActiveCollector {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  pickupsDone: number;
  vehicle: string;
  location: string;
  eta: string;
  status: 'AVAILABLE' | 'ON_JOB';
  coords: { x: number; y: number }; // percentages
}

const ACTIVE_COLLECTORS: ActiveCollector[] = [
  {
    id: 'c1',
    name: 'Ramesh Kumar',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    rating: 4.9,
    pickupsDone: 1420,
    vehicle: 'Electric Cargo Trike (RJ-32-EA-4412)',
    location: 'Sector 4 Residential Hub',
    eta: '8 - 12 mins',
    status: 'AVAILABLE',
    coords: { x: 38, y: 44 }
  },
  {
    id: 'c2',
    name: 'Sunil Yadav',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    rating: 4.8,
    pickupsDone: 980,
    vehicle: 'EV Mini-Truck (1.2 Ton)',
    location: 'RIICO Industrial Phase II',
    eta: '18 - 25 mins',
    status: 'AVAILABLE',
    coords: { x: 68, y: 32 }
  },
  {
    id: 'c3',
    name: 'Amit Meena',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80',
    rating: 4.7,
    pickupsDone: 650,
    vehicle: 'Heavy Commercial Cargo',
    location: 'Japanese Zone Corridor',
    eta: 'In Pickup • 35 mins',
    status: 'ON_JOB',
    coords: { x: 52, y: 72 }
  }
];

export const NeighborhoodRadar: React.FC = () => {
  const navigate = useNavigate();
  const { switchRole } = useAuth();
  const [selectedCollector, setSelectedCollector] = useState<ActiveCollector>(ACTIVE_COLLECTORS[0]);

  const handleBookWithCollector = async () => {
    await switchRole('USER');
    navigate('/user/sell');
  };

  return (
    <div className="bg-white rounded-2xl border border-zinc-200 shadow-xs overflow-hidden">
      
      {/* Top Bar */}
      <div className="p-5 sm:p-6 border-b border-zinc-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Live Fleet Telemetry
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-zinc-900 mt-1">
            Verified Collectors Active in Neemrana
          </h3>
          <p className="text-xs text-zinc-500">
            Background checked, Police verified, equipped with Legal Metrology certified Bluetooth scales.
          </p>
        </div>

        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 self-start sm:self-auto">
          <Truck className="w-3.5 h-3.5 mr-1.5" />
          <span>3 Collectors Active Now</span>
        </span>
      </div>

      {/* Grid: Map Area + Collector Profile */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        
        {/* Interactive Map Visual (7 cols) */}
        <div className="lg:col-span-7 bg-zinc-950 p-6 relative min-h-[340px] flex items-center justify-center overflow-hidden">
          
          {/* Faux Map Grid Lines */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px]" />
          
          {/* Simulated Roads */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-1/2 inset-x-0 h-1.5 bg-zinc-700 -rotate-6" />
            <div className="absolute inset-y-0 left-1/3 w-1.5 bg-zinc-700 rotate-12" />
            <div className="absolute inset-y-0 right-1/4 w-1.5 bg-zinc-700 -rotate-12" />
            <div className="absolute top-1/4 inset-x-0 h-1 bg-zinc-800" />
          </div>

          {/* Radar Sweep Animation */}
          <div className="absolute w-72 h-72 rounded-full border border-emerald-500/20 animate-ping pointer-events-none" />
          <div className="absolute w-44 h-44 rounded-full border border-emerald-500/30 pointer-events-none" />

          {/* User Location Anchor */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-center">
            <div className="w-6 h-6 rounded-full bg-emerald-500 border-4 border-white shadow-lg mx-auto flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-white" />
            </div>
            <span className="mt-1 px-2 py-0.5 rounded text-[9px] font-bold bg-zinc-900/90 text-white border border-zinc-700 inline-block shadow-md">
              Your Location (Sector 4)
            </span>
          </div>

          {/* Interactive Collector Pins */}
          {ACTIVE_COLLECTORS.map((c) => {
            const isSelected = selectedCollector.id === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelectedCollector(c)}
                className="absolute z-20 -translate-x-1/2 -translate-y-1/2 group transition-all"
                style={{ top: `${c.coords.y}%`, left: `${c.coords.x}%` }}
              >
                <div className="relative flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full border-2 p-0.5 transition-transform group-hover:scale-110 shadow-lg flex items-center justify-center ${
                      isSelected
                        ? 'border-emerald-400 bg-emerald-500 ring-4 ring-emerald-400/30'
                        : 'border-white bg-zinc-800'
                    }`}
                  >
                    <img
                      src={c.avatar}
                      alt={c.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>

                  <span className="mt-1 px-2 py-0.5 rounded text-[10px] font-bold bg-black/90 text-white border border-zinc-700 whitespace-nowrap shadow-md flex items-center space-x-1">
                    <Truck className="w-2.5 h-2.5 text-emerald-400" />
                    <span>{c.name.split(' ')[0]}</span>
                    <span className="text-zinc-400">({c.eta.split(' ')[0]})</span>
                  </span>
                </div>
              </button>
            );
          })}

          {/* Map Overlay Badge */}
          <div className="absolute top-3 left-3 bg-zinc-900/80 backdrop-blur-xs border border-zinc-800 rounded-lg px-2.5 py-1 text-[10px] text-zinc-400 font-mono">
            <span>RIICO Sector 4 Hub • Live Telemetry</span>
          </div>

        </div>

        {/* Selected Collector Detail Panel (5 cols) */}
        <div className="lg:col-span-5 p-5 sm:p-6 bg-zinc-50/70 border-t lg:border-t-0 lg:border-l border-zinc-200 flex flex-col justify-between space-y-4">
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3.5">
              <img
                src={selectedCollector.avatar}
                alt={selectedCollector.name}
                className="w-14 h-14 rounded-xl object-cover border border-zinc-300 shadow-xs"
              />
              <div>
                <div className="flex items-center space-x-1.5">
                  <h4 className="text-base font-bold text-zinc-900">{selectedCollector.name}</h4>
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                </div>
                <p className="text-xs text-zinc-500">{selectedCollector.vehicle}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="inline-flex items-center text-xs font-bold text-amber-700">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 mr-0.5" />
                    {selectedCollector.rating}
                  </span>
                  <span className="text-zinc-300">•</span>
                  <span className="text-xs text-zinc-600 font-medium">
                    {selectedCollector.pickupsDone} Clean Pickups
                  </span>
                </div>
              </div>
            </div>

            {/* Micro details grid */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-white border border-zinc-200">
                <span className="text-[10px] text-zinc-500 font-semibold block">Current Location</span>
                <p className="font-bold text-zinc-800 mt-0.5 truncate">{selectedCollector.location}</p>
              </div>
              <div className="p-2.5 rounded-lg bg-white border border-zinc-200">
                <span className="text-[10px] text-zinc-500 font-semibold block">Doorstep Arrival</span>
                <p className="font-bold text-emerald-800 mt-0.5">{selectedCollector.eta}</p>
              </div>
            </div>

            {/* Assurances */}
            <ul className="text-xs text-zinc-600 space-y-1.5">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 flex-shrink-0" />
                <span>Carries Bluetooth Smart Floor Scale (0.05kg accuracy)</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 flex-shrink-0" />
                <span>Immediate UPI Transfer before handover completion</span>
              </li>
            </ul>
          </div>

          <button
            type="button"
            onClick={handleBookWithCollector}
            className="w-full py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs flex items-center justify-center space-x-2 transition-colors"
          >
            <span>Request {selectedCollector.name.split(' ')[0]} for Doorstep Pickup</span>
            <ArrowRight className="w-4 h-4" />
          </button>

        </div>

      </div>

    </div>
  );
};
