import React, { useState } from 'react';
import { 
  MapPin, 
  Clock, 
  PhoneCall, 
  Truck, 
  Scale, 
  ShieldCheck, 
  CheckCircle2, 
  Navigation, 
  Search,
  Building2,
  ExternalLink
} from 'lucide-react';

interface YardCenter {
  id: string;
  name: string;
  type: 'Material Recovery Facility (MRF)' | 'Secondary Yard' | 'Weighbridge Hub';
  address: string;
  city: string;
  state: string;
  pincode: string;
  weighbridgeCapacity: string;
  hours: string;
  phone: string;
  manager: string;
  acceptedMaterials: string[];
  spotPremium: string;
}

const COLLECTION_CENTERS: YardCenter[] = [
  {
    id: 'c1',
    name: 'RIICO Central MRF & Smelter Yard',
    type: 'Material Recovery Facility (MRF)',
    address: 'Plot 42-45, Phase II Industrial Corridor, Near Havells Plant',
    city: 'Neemrana',
    state: 'Rajasthan',
    pincode: '301705',
    weighbridgeCapacity: '60 Metric Tons (Pitless Digital)',
    hours: 'Monday - Saturday: 07:30 AM - 08:30 PM (Sunday open for bulk)',
    phone: '+91 1494 282400',
    manager: 'Devendra Singh (Yard Master)',
    acceptedMaterials: ['Ferrous & HMS Iron', 'Copper & Brass', 'Aluminium Extrusions', 'Baled OCC Cartons', 'E-Waste & IT'],
    spotPremium: '+₹1.50/kg Self-Drop Bonus'
  },
  {
    id: 'c2',
    name: 'Bhiwadi Secondary Metal & Paper Depot',
    type: 'Weighbridge Hub',
    address: 'Sector 8 Industrial Area, Near Kaharani Smelting Complex',
    city: 'Bhiwadi',
    state: 'Rajasthan',
    pincode: '301019',
    weighbridgeCapacity: '50 Metric Tons',
    hours: 'Monday - Saturday: 08:00 AM - 07:00 PM',
    phone: '+91 1493 241900',
    manager: 'Mahesh Singhal',
    acceptedMaterials: ['Kraft Paper', 'OCC Boxes', 'Aluminium Utensils', 'Iron Turnings', 'Rigid Polymers'],
    spotPremium: '+₹1.25/kg Self-Drop Bonus'
  },
  {
    id: 'c3',
    name: 'Alwar City Green Recovery Yard',
    type: 'Secondary Yard',
    address: 'Matsya Industrial Area (MIA), Old Delhi Road',
    city: 'Alwar',
    state: 'Rajasthan',
    pincode: '301030',
    weighbridgeCapacity: '30 Metric Tons',
    hours: 'All Days: 08:00 AM - 08:00 PM',
    phone: '+91 144 2881200',
    manager: 'Pradeep Sharma',
    acceptedMaterials: ['Household Scrap', 'Newspapers', 'Plastic Crates', 'Old Batteries', 'White Goods'],
    spotPremium: '+₹1.00/kg Self-Drop Bonus'
  },
  {
    id: 'c4',
    name: 'Dharuhera Logistics Scrap Terminal',
    type: 'Material Recovery Facility (MRF)',
    address: 'NH-48 Corridor, Sector 6 Gateway',
    city: 'Dharuhera',
    state: 'Haryana',
    pincode: '123106',
    weighbridgeCapacity: '60 Metric Tons',
    hours: '24 Hours Gate Open for Commercial Trucks',
    phone: '+91 1274 245300',
    manager: 'Rajesh Mehra',
    acceptedMaterials: ['Automotive Turnings', 'Warehouse Cartons', 'Pallets', 'Heavy Machinery Scrap'],
    spotPremium: '+₹2.00/kg Commercial Volume Bonus'
  }
];

export const CentersPage: React.FC = () => {
  const [search, setSearch] = useState('');

  const filteredCenters = COLLECTION_CENTERS.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.city.toLowerCase().includes(search.toLowerCase()) ||
    c.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-zinc-50 min-h-screen text-zinc-900 selection:bg-emerald-100">
      
      <section className="bg-white border-b border-zinc-200 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
                <Building2 className="w-3.5 h-3.5 text-emerald-700" />
                <span>Authorized Material Recovery Facilities & Yards</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-zinc-950 tracking-tight">
                Collection Hubs & Weighbridge Yards
              </h1>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Prefer to drop off scrap yourself in your vehicle or tractor-trolley? Visit our authorized yards to get an immediate self-drop cash bonus with computerized weighbridge slips.
              </p>
            </div>

            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                placeholder="Search city, area, or road..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-zinc-50 border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Centers Listing */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCenters.map(center => (
            <div 
              key={center.id}
              className="bg-white rounded-2xl border border-zinc-200/90 p-6 shadow-xs hover:border-emerald-300 transition-all space-y-5 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 uppercase tracking-wider inline-block mb-1.5">
                      {center.type}
                    </span>
                    <h3 className="text-lg font-bold text-zinc-950">
                      {center.name}
                    </h3>
                    <p className="text-xs text-zinc-600 mt-1 flex items-start space-x-1.5">
                      <MapPin className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0 mt-0.5" />
                      <span>{center.address}, {center.city} ({center.pincode})</span>
                    </p>
                  </div>

                  <span className="text-xs font-bold text-emerald-800 bg-emerald-100/70 px-2.5 py-1 rounded-lg border border-emerald-200 whitespace-nowrap">
                    {center.spotPremium}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-zinc-100 text-xs">
                  <div>
                    <span className="text-[10px] text-zinc-400 font-semibold block">Weighbridge Spec:</span>
                    <p className="font-bold text-zinc-800 flex items-center space-x-1 mt-0.5">
                      <Scale className="w-3.5 h-3.5 text-emerald-700" />
                      <span>{center.weighbridgeCapacity}</span>
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-400 font-semibold block">Yard Master:</span>
                    <p className="font-bold text-zinc-800 mt-0.5">{center.manager}</p>
                  </div>
                </div>

                <div className="text-xs text-zinc-600 space-y-1">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
                    <span>{center.hours}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <PhoneCall className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
                    <span className="font-mono font-medium">{center.phone}</span>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-1.5">
                    Accepted Streams at this Gate:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {center.acceptedMaterials.map((mat, i) => (
                      <span key={i} className="text-[11px] font-medium bg-zinc-100 text-zinc-700 px-2 py-0.5 rounded">
                        {mat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-100 flex items-center justify-between">
                <span className="text-xs text-emerald-800 font-semibold flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Immediate Cash or RTGS at Gate</span>
                </span>

                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(center.name + ' ' + center.city)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs shadow-xs transition-colors inline-flex items-center space-x-1.5"
                >
                  <Navigation className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Get Directions</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
