import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Scale, 
  Sparkles, 
  MapPin, 
  ShieldCheck, 
  ArrowRight, 
  Building2, 
  Info, 
  Calendar,
  CheckCircle2,
  FileSpreadsheet,
  Download,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { usePickup } from '../../context/PickupContext';
import { ScrapItem } from '../../types';

interface ScrapRateDetail {
  id: string;
  name: string;
  category: 'paper' | 'metal' | 'plastic' | 'ewaste' | 'appliances';
  categoryLabel: string;
  pricePerKg: number;
  change24h: number;
  grade: string;
  description: string;
  minLotKg: number;
  typicalHouseholdQty: string;
  recyclingDestination: string;
  image: string;
  co2SavedPerKg: number;
}

const ALL_SCRAP_RATES: ScrapRateDetail[] = [
  // Paper
  {
    id: 'p1',
    name: 'Newspaper (Raddi)',
    category: 'paper',
    categoryLabel: 'Paper & Books',
    pricePerKg: 15.5,
    change24h: 0.5,
    grade: 'Dry & Bundled (English/Hindi)',
    description: 'Old daily newspapers. Must be dry and free from grease or water damage.',
    minLotKg: 5,
    typicalHouseholdQty: '8 - 20 kg',
    recyclingDestination: 'Bhiwadi Newsprint Paper Mills',
    image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=300&auto=format&fit=crop&q=80',
    co2SavedPerKg: 1.2
  },
  {
    id: 'p2',
    name: 'Corrugated Cartons (OCC)',
    category: 'paper',
    categoryLabel: 'Paper & Books',
    pricePerKg: 17.0,
    change24h: 1.2,
    grade: 'Brown Delivery & Packaging Boxes',
    description: 'Amazon, Flipkart, groceries, and electronics packing cartons flattened and dry.',
    minLotKg: 10,
    typicalHouseholdQty: '10 - 45 kg',
    recyclingDestination: 'RIICO Kraftboard Recycling Facility',
    image: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=300&auto=format&fit=crop&q=80',
    co2SavedPerKg: 1.5
  },
  {
    id: 'p3',
    name: 'Office & Notebook Paper',
    category: 'paper',
    categoryLabel: 'Paper & Books',
    pricePerKg: 14.0,
    change24h: -0.2,
    grade: 'White Shreds, School Books, Records',
    description: 'Textbooks, notebooks, loose office stationery (spiral pins removed preferred).',
    minLotKg: 5,
    typicalHouseholdQty: '15 - 30 kg',
    recyclingDestination: 'Pulp and Board Reprocessing Unit',
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=300&auto=format&fit=crop&q=80',
    co2SavedPerKg: 1.1
  },
  // Metals
  {
    id: 'm1',
    name: 'Copper Berry / Heavy Wire',
    category: 'metal',
    categoryLabel: 'Metals & Alloys',
    pricePerKg: 585.0,
    change24h: 3.5,
    grade: '99.5% Electrolytic Bright Copper',
    description: 'Electrical stripped wire, motor windings, water heater coils, copper vessels.',
    minLotKg: 1,
    typicalHouseholdQty: '2 - 8 kg',
    recyclingDestination: 'Bhiwadi Copper Continuous Casting Plant',
    image: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?w=300&auto=format&fit=crop&q=80',
    co2SavedPerKg: 7.2
  },
  {
    id: 'm2',
    name: 'Brass & Bronze (Peetal / Kaasa)',
    category: 'metal',
    categoryLabel: 'Metals & Alloys',
    pricePerKg: 425.0,
    change24h: 2.1,
    grade: 'Utensils, Valves, Hardware Fittings',
    description: 'Old puja utensils, broken bathroom taps, door handles, gas valve fittings.',
    minLotKg: 1,
    typicalHouseholdQty: '1 - 6 kg',
    recyclingDestination: 'Moradabad Certified Ingot Foundry',
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=300&auto=format&fit=crop&q=80',
    co2SavedPerKg: 5.6
  },
  {
    id: 'm3',
    name: 'Aluminium Casings & Utensils',
    category: 'metal',
    categoryLabel: 'Metals & Alloys',
    pricePerKg: 148.0,
    change24h: 0.8,
    grade: 'Section 6063 / Household Pure Alloy',
    description: 'Old pressure cookers, window sliding frame cutoffs, clean aluminium cans.',
    minLotKg: 2,
    typicalHouseholdQty: '3 - 12 kg',
    recyclingDestination: 'Alwar Smelting Complex',
    image: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=300&auto=format&fit=crop&q=80',
    co2SavedPerKg: 6.0
  },
  {
    id: 'm4',
    name: 'Iron & Steel (Loha / TMT Scrap)',
    category: 'metal',
    categoryLabel: 'Metals & Alloys',
    pricePerKg: 34.5,
    change24h: 1.0,
    grade: 'Heavy Melting Steel (HMS 1 & 2)',
    description: 'Grills, gates, iron bed frames, rusted rebars, cycle frames, machine plates.',
    minLotKg: 10,
    typicalHouseholdQty: '15 - 80 kg',
    recyclingDestination: 'RIICO Secondary Induction Furnaces',
    image: 'https://images.unsplash.com/photo-1535813547-99c456a41d4a?w=300&auto=format&fit=crop&q=80',
    co2SavedPerKg: 2.2
  },
  // Plastics
  {
    id: 'pl1',
    name: 'PET Beverage Bottles (Clear)',
    category: 'plastic',
    categoryLabel: 'Polymers & Plastic',
    pricePerKg: 28.0,
    change24h: 1.5,
    grade: 'Grade 1 Resin (Clean Flakes)',
    description: 'Water bottles, soft drink transparent bottles (labels & caps allowed).',
    minLotKg: 3,
    typicalHouseholdQty: '3 - 10 kg',
    recyclingDestination: 'EcoGreen Polyester Fiber Mill',
    image: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=300&auto=format&fit=crop&q=80',
    co2SavedPerKg: 2.3
  },
  {
    id: 'pl2',
    name: 'Rigid HDPE Plastics & Crates',
    category: 'plastic',
    categoryLabel: 'Polymers & Plastic',
    pricePerKg: 26.5,
    change24h: 0.0,
    grade: 'Grade 2 High Density Polyethylene',
    description: 'Milk crates, laundry detergent jugs, oil carboys, plastic drums and tubs.',
    minLotKg: 5,
    typicalHouseholdQty: '5 - 20 kg',
    recyclingDestination: 'Circular Polymers Repelletizer',
    image: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=300&auto=format&fit=crop&q=80',
    co2SavedPerKg: 2.1
  },
  // E-Waste
  {
    id: 'ew1',
    name: 'PC / Server Motherboards & RAM',
    category: 'ewaste',
    categoryLabel: 'E-Waste & IT',
    pricePerKg: 850.0,
    change24h: 4.2,
    grade: 'Class A Gold-Plated Printed Boards',
    description: 'Desktop motherboards, laptop boards, high-density telecom server PCB boards.',
    minLotKg: 1,
    typicalHouseholdQty: '1 - 5 kg',
    recyclingDestination: 'CPCB Authorized Precious Metal Refinery',
    image: 'https://images.unsplash.com/photo-1597733336794-12d05021d510?w=300&auto=format&fit=crop&q=80',
    co2SavedPerKg: 14.5
  },
  {
    id: 'ew2',
    name: 'Lead-Acid Inverter & Car Batteries',
    category: 'ewaste',
    categoryLabel: 'E-Waste & IT',
    pricePerKg: 95.0,
    change24h: 0.8,
    grade: 'Intact Sealed Secondary Cells',
    description: 'Home inverter batteries (150Ah / 200Ah), two-wheeler and car starter batteries.',
    minLotKg: 10,
    typicalHouseholdQty: '15 - 60 kg',
    recyclingDestination: 'CPCB Authorized Hydrometallurgical Smelter',
    image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=300&auto=format&fit=crop&q=80',
    co2SavedPerKg: 4.8
  },
  // Appliances
  {
    id: 'ap1',
    name: 'Split & Window Air Conditioners (Complete)',
    category: 'appliances',
    categoryLabel: 'Large Appliances',
    pricePerKg: 85.0,
    change24h: 2.0,
    grade: '1.5 Ton complete with copper compressor',
    description: 'Both indoor and outdoor units intact. Flat rate or per-kg copper recovery valuation.',
    minLotKg: 25,
    typicalHouseholdQty: '35 - 55 kg',
    recyclingDestination: 'Certified Appliance Dismantling Facility',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=300&auto=format&fit=crop&q=80',
    co2SavedPerKg: 9.2
  },
  {
    id: 'ap2',
    name: 'Old Washing Machines & Refrigerators',
    category: 'appliances',
    categoryLabel: 'Large Appliances',
    pricePerKg: 42.0,
    change24h: 0.0,
    grade: 'Complete Unit (Compressor & Metal Drum)',
    description: 'Double-door or single-door fridges, front load / top load washing machines.',
    minLotKg: 20,
    typicalHouseholdQty: '30 - 70 kg',
    recyclingDestination: 'Authorized E-Waste Dismantler',
    image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=300&auto=format&fit=crop&q=80',
    co2SavedPerKg: 5.5
  }
];

export const RatesPage: React.FC = () => {
  const navigate = useNavigate();
  const { switchRole } = useAuth();
  const { setDraftItem } = usePickup();

  const [selectedCity, setSelectedCity] = useState<'neemrana' | 'delhi' | 'jaipur' | 'bhiwadi'>('neemrana');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Rate calculator state
  const [calcMaterial, setCalcMaterial] = useState<string>('p1');
  const [calcWeight, setCalcWeight] = useState<number>(25);

  const cityPriceAdjustment: Record<string, number> = {
    neemrana: 1.0,
    delhi: 1.03, // +3%
    jaipur: 0.99, // -1%
    bhiwadi: 1.02 // +2%
  };

  const filteredRates = ALL_SCRAP_RATES.filter(item => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesQuery = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.grade.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const selectedRateItem = ALL_SCRAP_RATES.find(r => r.id === calcMaterial) || ALL_SCRAP_RATES[0];
  const adjustedPrice = Math.round(selectedRateItem.pricePerKg * cityPriceAdjustment[selectedCity] * 10) / 10;
  const estimatedTotal = Math.round(adjustedPrice * calcWeight);
  const estimatedCo2 = Math.round(selectedRateItem.co2SavedPerKg * calcWeight * 10) / 10;

  const handleBookNow = async (item: ScrapRateDetail) => {
    await switchRole('USER');
    const adjustedRate = Math.round(item.pricePerKg * cityPriceAdjustment[selectedCity] * 10) / 10;
    const draft: ScrapItem = {
      id: 'rate_' + item.id + '_' + Date.now(),
      category: item.category as any,
      materialName: item.name,
      estimatedWeightKg: item.minLotKg * 2,
      estimatedPriceMin: Math.round(item.minLotKg * 2 * adjustedRate * 0.95),
      estimatedPriceMax: Math.round(item.minLotKg * 2 * adjustedRate * 1.05),
      confidence: 0.99,
      ratePerKg: adjustedRate,
      imageUrl: item.image,
      notes: `${item.grade} • City: ${selectedCity.toUpperCase()} Mandi`
    };
    setDraftItem(draft);
    navigate('/user/pickup');
  };

  return (
    <div className="bg-zinc-50 min-h-screen text-zinc-900 selection:bg-emerald-100">
      
      {/* Top Banner Header */}
      <section className="bg-white border-b border-zinc-200 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
                <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                <span>Today's Official Mandi Benchmark • Updated 08:30 AM IST</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-zinc-950 tracking-tight">
                Live Scrap Rates & Price Index
              </h1>
              <p className="text-sm text-zinc-600 leading-relaxed">
                Direct procurement rates based on secondary smelting auctions, paper mills, and industrial recovery indices. Free doorstep weighing with certified digital scales.
              </p>
            </div>

            {/* City Switcher */}
            <div className="bg-zinc-100 p-1 rounded-xl border border-zinc-200 flex items-center self-start md:self-auto text-xs font-semibold">
              <span className="px-3 py-1.5 text-zinc-500 flex items-center space-x-1">
                <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                <span>Mandi Node:</span>
              </span>
              {[
                { id: 'neemrana', label: 'Neemrana Hub' },
                { id: 'bhiwadi', label: 'Bhiwadi' },
                { id: 'delhi', label: 'Delhi NCR' },
                { id: 'jaipur', label: 'Jaipur' },
              ].map(c => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCity(c.id as any)}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    selectedCity === c.id
                      ? 'bg-white text-zinc-950 shadow-xs font-bold'
                      : 'text-zinc-600 hover:text-zinc-950'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Value Estimator Bar */}
      <section className="bg-emerald-900 text-white py-8 border-b border-emerald-950 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-emerald-950/60 rounded-2xl p-5 sm:p-6 border border-emerald-800/80 flex flex-col lg:flex-row items-center justify-between gap-6">
            
            <div className="w-full lg:w-1/3 space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300 flex items-center space-x-1.5">
                <Scale className="w-4 h-4" />
                <span>Instant Scrap Value Calculator</span>
              </span>
              <h3 className="text-lg font-bold text-white">How much will your scrap fetch?</h3>
              <p className="text-xs text-emerald-200">
                Select your item and slide to your estimated scrap weight.
              </p>
            </div>

            {/* Inputs */}
            <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] text-emerald-200 font-semibold block mb-1">
                  Select Material Stream:
                </label>
                <select
                  value={calcMaterial}
                  onChange={(e) => setCalcMaterial(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-emerald-700 text-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-400"
                >
                  {ALL_SCRAP_RATES.map(r => (
                    <option key={r.id} value={r.id}>
                      {r.name} (₹{Math.round(r.pricePerKg * cityPriceAdjustment[selectedCity])}/kg)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex items-center justify-between text-[11px] text-emerald-200 font-semibold mb-1">
                  <span>Weight:</span>
                  <span className="font-bold text-white font-mono">{calcWeight} kg</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="200"
                  value={calcWeight}
                  onChange={(e) => setCalcWeight(Number(e.target.value))}
                  className="w-full accent-emerald-400 h-2 bg-emerald-800 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-emerald-400 mt-1">
                  <span>2 kg</span>
                  <span>50 kg</span>
                  <span>100 kg</span>
                  <span>200 kg</span>
                </div>
              </div>
            </div>

            {/* Total Result + CTA */}
            <div className="w-full lg:w-auto flex items-center justify-between lg:justify-end gap-6 border-t lg:border-t-0 pt-4 lg:pt-0 border-emerald-800/80">
              <div className="text-right">
                <span className="text-[10px] uppercase tracking-wider text-emerald-300 font-bold block">
                  You'll Receive Direct UPI:
                </span>
                <p className="text-2xl sm:text-3xl font-black text-white font-mono">
                  ₹{estimatedTotal.toLocaleString('en-IN')}
                </p>
                <span className="text-[10px] text-emerald-300 block">
                  Abates {estimatedCo2} kg CO₂
                </span>
              </div>

              <button
                type="button"
                onClick={() => handleBookNow(selectedRateItem)}
                className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-extrabold text-xs shadow-md transition-all whitespace-nowrap flex items-center space-x-1.5"
              >
                <span>Book Pickup</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Main Rates Directory Table & Filter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
        
        {/* Search & Category Tabs */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-1 no-scrollbar text-xs font-semibold">
            {[
              { id: 'all', label: 'All Scrap Items' },
              { id: 'paper', label: 'Paper & Books' },
              { id: 'metal', label: 'Metals & Brass' },
              { id: 'plastic', label: 'Polymers & PET' },
              { id: 'ewaste', label: 'E-Waste & Batteries' },
              { id: 'appliances', label: 'Large Appliances' },
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-emerald-700 text-white shadow-xs font-bold'
                    : 'bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Search newspaper, copper, cartons, AC..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-white border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Rate Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredRates.map((item) => {
            const adjustedItemPrice = Math.round(item.pricePerKg * cityPriceAdjustment[selectedCity] * 10) / 10;
            return (
              <div 
                key={item.id} 
                className="bg-white rounded-2xl border border-zinc-200/90 p-5 shadow-xs hover:border-emerald-300 hover:shadow-sm transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-12 h-12 rounded-xl object-cover border border-zinc-200 flex-shrink-0"
                      />
                      <div>
                        <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
                          {item.categoryLabel}
                        </span>
                        <h4 className="font-bold text-zinc-950 text-sm group-hover:text-emerald-800 transition-colors">
                          {item.name}
                        </h4>
                      </div>
                    </div>

                    {/* Price Tag */}
                    <div className="text-right flex-shrink-0">
                      <div className="flex items-baseline space-x-1 justify-end">
                        <span className="text-xl font-black text-zinc-950 font-mono">
                          ₹{adjustedItemPrice}
                        </span>
                        <span className="text-xs text-zinc-500 font-medium">/kg</span>
                      </div>
                      <span className={`inline-flex items-center text-[10px] font-bold ${
                        item.change24h > 0 ? 'text-emerald-700' : item.change24h < 0 ? 'text-rose-700' : 'text-zinc-500'
                      }`}>
                        {item.change24h > 0 && <TrendingUp className="w-2.5 h-2.5 mr-0.5" />}
                        {item.change24h < 0 && <TrendingDown className="w-2.5 h-2.5 mr-0.5" />}
                        {item.change24h === 0 && <Minus className="w-2.5 h-2.5 mr-0.5" />}
                        {item.change24h > 0 ? `+${item.change24h}%` : `${item.change24h}%`} 24h
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-zinc-600 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="pt-2 border-t border-zinc-100 grid grid-cols-2 gap-2 text-[11px] text-zinc-500">
                    <div>
                      <span className="text-zinc-400 block text-[10px]">Quality Grade:</span>
                      <p className="font-semibold text-zinc-800 truncate">{item.grade}</p>
                    </div>
                    <div>
                      <span className="text-zinc-400 block text-[10px]">Min. Free Pickup:</span>
                      <p className="font-semibold text-zinc-800">{item.minLotKg} kg min lot</p>
                    </div>
                  </div>

                  <div className="p-2 rounded-lg bg-zinc-50 border border-zinc-200/60 flex items-center space-x-2 text-[11px] text-zinc-600">
                    <Building2 className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
                    <span className="truncate">Smelted at: {item.recyclingDestination}</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between gap-3">
                  <span className="text-[11px] text-emerald-800 font-semibold flex items-center space-x-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Free Digital Weighing</span>
                  </span>

                  <button
                    type="button"
                    onClick={() => handleBookNow(item)}
                    className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs transition-colors flex items-center space-x-1"
                  >
                    <span>Sell This Scrap</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Legal Metrology & Quality Note */}
        <div className="mt-10 p-6 rounded-2xl bg-zinc-100 border border-zinc-200 text-xs text-zinc-700 space-y-3">
          <div className="flex items-center space-x-2 text-zinc-900 font-bold text-sm">
            <ShieldCheck className="w-5 h-5 text-emerald-700" />
            <span>Legal Metrology Scale Accuracy & Quality Assurance</span>
          </div>
          <p className="leading-relaxed text-zinc-600">
            All prices listed above are subject to daily secondary metal and paper mill market variations. Every E-KABAADI collector carries a verified Bluetooth digital electronic floor scale calibrated under Section 24 of the Legal Metrology Act, 2009. We guarantee 0.00 tare weight transparency before placing scrap. If any discrepancy is found, customer is awarded 100% bonus scrap payout.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-zinc-600 font-semibold text-[11px] pt-1">
            <span>• No hidden deductions</span>
            <span>• Instant PhonePe / Google Pay transfer</span>
            <span>• 100% CPCB compliant recycling</span>
            <span>• GST compliant invoices for bulk commercial sales</span>
          </div>
        </div>

      </section>

    </div>
  );
};
