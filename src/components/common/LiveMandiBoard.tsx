import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Search, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  Filter, 
  Info,
  CheckCircle2,
  Calendar,
  Building2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { usePickup } from '../../context/PickupContext';
import { ScrapItem } from '../../types';

interface MandiItem {
  id: string;
  name: string;
  category: 'metal' | 'paper' | 'plastic' | 'ewaste';
  categoryLabel: string;
  grade: string;
  pricePerKg: number;
  change24h: number;
  dayLow: number;
  dayHigh: number;
  minLotKg: number;
  destination: string;
  co2SavingsKg: number;
  imageUrl: string;
}

const MANDI_ITEMS: MandiItem[] = [
  {
    id: 'm1',
    name: 'Copper Berry / Heavy Wiring',
    category: 'metal',
    categoryLabel: 'Non-Ferrous Metals',
    grade: '99.5% Pure Bright Wire',
    pricePerKg: 580,
    change24h: 2.4,
    dayLow: 565,
    dayHigh: 585,
    minLotKg: 2,
    destination: 'Bhiwadi Copper Refineries',
    co2SavingsKg: 6.8,
    imageUrl: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 'm2',
    name: 'Aluminium Section & Casings (6063)',
    category: 'metal',
    categoryLabel: 'Non-Ferrous Metals',
    grade: 'Clean Extrusion / No Iron Screws',
    pricePerKg: 145,
    change24h: -0.8,
    dayLow: 142,
    dayHigh: 148,
    minLotKg: 5,
    destination: 'Alwar Smelting Complex',
    co2SavingsKg: 5.2,
    imageUrl: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 'm3',
    name: 'Heavy Melting Steel (HMS 1 & 2)',
    category: 'metal',
    categoryLabel: 'Ferrous Metals',
    grade: 'IS-2062 Rebar & Structural Cutoffs',
    pricePerKg: 34,
    change24h: 1.2,
    dayLow: 33,
    dayHigh: 35,
    minLotKg: 15,
    destination: 'RIICO Induction Furnaces',
    co2SavingsKg: 2.1,
    imageUrl: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 'm4',
    name: 'Corrugated Cardboard (OCC)',
    category: 'paper',
    categoryLabel: 'Paper & Packaging',
    grade: 'Clean Baled Cartons / Dry',
    pricePerKg: 16.5,
    change24h: 1.5,
    dayLow: 15.5,
    dayHigh: 17.0,
    minLotKg: 10,
    destination: 'Bhiwadi Kraft Paper Mills',
    co2SavingsKg: 1.3,
    imageUrl: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 'm5',
    name: 'Office Kraft & Ledger Paper',
    category: 'paper',
    categoryLabel: 'Paper & Packaging',
    grade: 'White Office Shreds & Exam Sheets',
    pricePerKg: 14,
    change24h: 0.0,
    dayLow: 13.8,
    dayHigh: 14.2,
    minLotKg: 10,
    destination: 'Circular Pulp Products Node',
    co2SavingsKg: 1.1,
    imageUrl: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 'm6',
    name: 'Clear PET Plastic Beverage Bottles',
    category: 'plastic',
    categoryLabel: 'Polymers',
    grade: 'Grade 1 Resin (Caps & Labels allowed)',
    pricePerKg: 28,
    change24h: 1.8,
    dayLow: 27,
    dayHigh: 28.5,
    minLotKg: 5,
    destination: 'EcoGreen Flake Facility',
    co2SavingsKg: 2.4,
    imageUrl: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 'm7',
    name: 'Rigid HDPE Drums & Crates',
    category: 'plastic',
    categoryLabel: 'Polymers',
    grade: 'Grade 2 High-Density Crates',
    pricePerKg: 26,
    change24h: 0.9,
    dayLow: 25,
    dayHigh: 26.5,
    minLotKg: 8,
    destination: 'Polyester Pelletizing Units',
    co2SavingsKg: 2.2,
    imageUrl: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 'm8',
    name: 'Server & PC Motherboards (Class A)',
    category: 'ewaste',
    categoryLabel: 'E-Waste & IT',
    grade: 'Gold-Pin High Yield Circuitry',
    pricePerKg: 850,
    change24h: 3.2,
    dayLow: 820,
    dayHigh: 860,
    minLotKg: 1,
    destination: 'CPCB Authorized E-Waste Smelter',
    co2SavingsKg: 12.5,
    imageUrl: 'https://images.unsplash.com/photo-1597733336794-12d05021d510?w=300&auto=format&fit=crop&q=80'
  }
];

export const LiveMandiBoard: React.FC = () => {
  const navigate = useNavigate();
  const { switchRole } = useAuth();
  const { setDraftItem } = usePickup();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredItems = MANDI_ITEMS.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.grade.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSellDirect = async (item: MandiItem) => {
    await switchRole('USER');
    const draft: ScrapItem = {
      id: 'mandi_' + item.id + '_' + Date.now(),
      category: item.category,
      materialName: item.name,
      estimatedWeightKg: item.minLotKg * 2,
      estimatedPriceMin: Math.round(item.minLotKg * 2 * item.pricePerKg * 0.95),
      estimatedPriceMax: Math.round(item.minLotKg * 2 * item.pricePerKg * 1.05),
      confidence: 0.98,
      ratePerKg: item.pricePerKg,
      imageUrl: item.imageUrl,
      notes: `${item.grade} • Destination: ${item.destination}`
    };

    setDraftItem(draft);
    navigate('/user/pickup');
  };

  return (
    <div className="space-y-6">
      
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/80 mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            <span>Mandi Trade Index • Rajasthan-NCR Corridor</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">
            Live Spot Scrap Exchange Board
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 max-w-xl">
            Real-time procurement benchmarks updated every morning at 08:30 AM based on secondary smelter and paper mill auctions.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            placeholder="Search material or grade..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl border border-zinc-300 bg-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 no-scrollbar text-xs font-semibold">
        {[
          { id: 'all', label: 'All Recyclable Streams' },
          { id: 'metal', label: 'Metals & Alloys' },
          { id: 'paper', label: 'Paper & Packaging' },
          { id: 'plastic', label: 'Polymers & Bottles' },
          { id: 'ewaste', label: 'E-Waste & IT' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveCategory(tab.id)}
            className={`px-3.5 py-2 rounded-lg whitespace-nowrap transition-all ${
              activeCategory === tab.id
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Mandi Table */}
      <div className="bg-white rounded-2xl border border-zinc-200/90 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-zinc-50 border-b border-zinc-200 text-zinc-600 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">Material Stream & Grade</th>
                <th className="py-3 px-4">Current Spot Rate</th>
                <th className="py-3 px-4 hidden sm:table-cell">24h Shift</th>
                <th className="py-3 px-4 hidden md:table-cell">Today's Range</th>
                <th className="py-3 px-4 hidden lg:table-cell">Authorized End-Destination</th>
                <th className="py-3 px-4 text-right">Doorstep Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-zinc-50/70 transition-colors">
                  
                  {/* Name & Grade */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-10 h-10 rounded-lg object-cover border border-zinc-200 flex-shrink-0"
                      />
                      <div>
                        <p className="font-bold text-zinc-900 text-xs sm:text-sm">{item.name}</p>
                        <p className="text-[11px] text-zinc-500 mt-0.5 flex items-center space-x-1">
                          <span>{item.grade}</span>
                          <span className="text-zinc-300">•</span>
                          <span className="text-emerald-700 font-medium">{item.categoryLabel}</span>
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Spot Rate */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <div className="flex items-baseline space-x-1">
                      <span className="text-base sm:text-lg font-extrabold text-zinc-900 font-mono">
                        ₹{item.pricePerKg}
                      </span>
                      <span className="text-[11px] text-zinc-500 font-medium">/ kg</span>
                    </div>
                    <span className="text-[10px] text-zinc-400">Min {item.minLotKg} kg pickup</span>
                  </td>

                  {/* 24h Trend */}
                  <td className="py-3.5 px-4 hidden sm:table-cell whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold ${
                        item.change24h > 0
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : item.change24h < 0
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : 'bg-zinc-100 text-zinc-600'
                      }`}
                    >
                      {item.change24h > 0 && <TrendingUp className="w-3 h-3 mr-1" />}
                      {item.change24h < 0 && <TrendingDown className="w-3 h-3 mr-1" />}
                      {item.change24h === 0 && <Minus className="w-3 h-3 mr-1" />}
                      {item.change24h > 0 ? `+${item.change24h}%` : `${item.change24h}%`}
                    </span>
                  </td>

                  {/* Day's Range */}
                  <td className="py-3.5 px-4 hidden md:table-cell whitespace-nowrap text-zinc-600 font-mono text-[11px]">
                    <span>₹{item.dayLow}</span>
                    <span className="text-zinc-300 mx-1.5">—</span>
                    <span>₹{item.dayHigh}</span>
                  </td>

                  {/* Destination */}
                  <td className="py-3.5 px-4 hidden lg:table-cell text-zinc-600 text-[11px]">
                    <div className="flex items-center space-x-1.5">
                      <Building2 className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
                      <span className="truncate max-w-[180px]">{item.destination}</span>
                    </div>
                  </td>

                  {/* Action */}
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => handleSellDirect(item)}
                      className="px-3.5 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs transition-colors shadow-xs inline-flex items-center space-x-1.5"
                    >
                      <span>Sell Scrap</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mandi Footer Guarantee */}
        <div className="bg-zinc-50 px-5 py-3 border-t border-zinc-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-zinc-500">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-700 flex-shrink-0" />
            <span>Prices indexed directly against Indian Bureau of Mines & Recycler Auctions.</span>
          </div>
          <span className="text-[11px] font-medium text-zinc-600">
            Last Mandi Audit: Today 08:30 AM IST
          </span>
        </div>
      </div>

    </div>
  );
};
