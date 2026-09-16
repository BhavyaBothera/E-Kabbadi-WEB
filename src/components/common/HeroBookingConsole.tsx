import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Layers, 
  Scale, 
  IndianRupee, 
  Truck, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Package, 
  FileText, 
  Hammer, 
  Cpu, 
  Flame,
  Boxes,
  Camera,
  Calendar,
  Zap
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { usePickup } from '../../context/PickupContext';
import { ScrapCategoryType, ScrapItem } from '../../types';

interface MaterialOption {
  id: ScrapCategoryType;
  name: string;
  rate: number;
  unit: string;
  co2PerKg: number;
  icon: React.ReactNode;
  tag: string;
}

const MATERIAL_OPTIONS: MaterialOption[] = [
  {
    id: 'paper',
    name: 'Cartons & Paper',
    rate: 16.5,
    unit: 'kg',
    co2PerKg: 1.3,
    icon: <FileText className="w-4 h-4 text-amber-700" />,
    tag: 'Popular'
  },
  {
    id: 'metal',
    name: 'Metals & Iron',
    rate: 38.0,
    unit: 'kg',
    co2PerKg: 3.5,
    icon: <Hammer className="w-4 h-4 text-emerald-800" />,
    tag: 'High Demand'
  },
  {
    id: 'plastic',
    name: 'PET Polymers',
    rate: 28.0,
    unit: 'kg',
    co2PerKg: 1.8,
    icon: <Package className="w-4 h-4 text-teal-700" />,
    tag: 'Clean'
  },
  {
    id: 'ewaste',
    name: 'E-Waste & IT',
    rate: 140.0,
    unit: 'kg',
    co2PerKg: 6.2,
    icon: <Cpu className="w-4 h-4 text-emerald-900" />,
    tag: 'Premium'
  }
];

export const HeroBookingConsole: React.FC = () => {
  const navigate = useNavigate();
  const { switchRole } = useAuth();
  const { setDraftItem } = usePickup();

  const [activeTab, setActiveTab] = useState<'ESTIMATE' | 'AI_SCAN'>('ESTIMATE');
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialOption>(MATERIAL_OPTIONS[0]);
  const [weightKg, setWeightKg] = useState<number>(25);

  const estimatedValue = Math.round(weightKg * selectedMaterial.rate);
  const carbonOffset = (weightKg * selectedMaterial.co2PerKg).toFixed(1);

  const handleBookNow = async () => {
    await switchRole('USER');
    
    const draft: ScrapItem = {
      id: 'item_' + Date.now(),
      category: selectedMaterial.id,
      materialName: selectedMaterial.name,
      estimatedWeightKg: weightKg,
      estimatedPriceMin: Math.round(estimatedValue * 0.95),
      estimatedPriceMax: Math.round(estimatedValue * 1.05),
      confidence: 0.98,
      ratePerKg: selectedMaterial.rate,
      imageUrl: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=300&auto=format&fit=crop&q=80',
      notes: `Instant estimation via Homepage Console (${selectedMaterial.name})`
    };

    setDraftItem(draft);
    navigate('/user/pickup');
  };

  const handleOpenBulkAI = async () => {
    await switchRole('USER');
    navigate('/user/bulk-upload');
  };

  return (
    <div className="w-full max-w-md bg-white rounded-3xl border border-emerald-900/10 shadow-[0_12px_40px_-10px_rgba(4,78,56,0.12)] p-6 sm:p-7 space-y-6 relative overflow-hidden backdrop-blur-xs">
      
      {/* Subtle top ambient glow */}
      <div className="absolute -top-16 -right-16 w-36 h-36 rounded-full bg-emerald-400/20 blur-2xl pointer-events-none" />

      {/* Header Pill & Tabs */}
      <div className="flex items-center justify-between gap-2 border-b border-zinc-100 pb-4">
        <div>
          <span className="text-[10px] font-bold tracking-wider uppercase text-emerald-800 flex items-center space-x-1">
            <Zap className="w-3 h-3 text-emerald-600 fill-emerald-500" />
            <span>Instant Valuation</span>
          </span>
          <h3 className="text-base font-black text-zinc-950">
            Book Doorstep Pickup
          </h3>
        </div>

        {/* Tab Switcher with animated pill */}
        <div className="bg-zinc-100/80 p-1 rounded-xl flex items-center text-xs font-semibold relative">
          <button
            type="button"
            onClick={() => setActiveTab('ESTIMATE')}
            className={`px-3 py-1.5 rounded-lg transition-colors relative z-10 ${
              activeTab === 'ESTIMATE' ? 'text-emerald-950 font-bold' : 'text-zinc-500 hover:text-zinc-900'
            }`}
          >
            {activeTab === 'ESTIMATE' && (
              <motion.div 
                layoutId="heroTab" 
                className="absolute inset-0 bg-white rounded-lg shadow-xs -z-10" 
                transition={{ type: "spring", stiffness: 450, damping: 35 }}
              />
            )}
            <span>Calculator</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('AI_SCAN')}
            className={`px-3 py-1.5 rounded-lg transition-colors relative z-10 flex items-center space-x-1 ${
              activeTab === 'AI_SCAN' ? 'text-emerald-950 font-bold' : 'text-zinc-500 hover:text-zinc-900'
            }`}
          >
            {activeTab === 'AI_SCAN' && (
              <motion.div 
                layoutId="heroTab" 
                className="absolute inset-0 bg-white rounded-lg shadow-xs -z-10" 
                transition={{ type: "spring", stiffness: 450, damping: 35 }}
              />
            )}
            <Sparkles className="w-3 h-3 text-emerald-600" />
            <span>AI Scan</span>
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'ESTIMATE' ? (
          <motion.div
            key="estimate"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-5"
          >
            {/* Stream Selector Grid */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-zinc-600 uppercase tracking-wider block">
                1. Select Primary Stream:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {MATERIAL_OPTIONS.map((m) => {
                  const isSelected = selectedMaterial.id === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setSelectedMaterial(m)}
                      className={`p-2.5 rounded-2xl border text-left transition-all flex items-start space-x-2 relative ${
                        isSelected
                          ? 'border-emerald-700 bg-emerald-50/60 ring-1 ring-emerald-700 shadow-xs'
                          : 'border-zinc-200/80 bg-zinc-50/50 hover:bg-zinc-100/80 hover:border-zinc-300'
                      }`}
                    >
                      <div className={`p-1.5 rounded-xl ${isSelected ? 'bg-white text-emerald-800 shadow-xs' : 'bg-zinc-200/60 text-zinc-600'}`}>
                        {m.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-zinc-900 truncate">{m.name}</p>
                        <p className="text-[11px] text-zinc-500 font-mono font-medium">₹{m.rate}/kg</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Interactive Weight Slider */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-zinc-600 uppercase text-[11px] tracking-wider">
                  2. Estimated Scrap Weight:
                </span>
                <span className="font-black text-emerald-800 text-sm font-mono bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  {weightKg} kg
                </span>
              </div>

              <input
                type="range"
                min="5"
                max="150"
                step="5"
                value={weightKg}
                onChange={(e) => setWeightKg(Number(e.target.value))}
                className="w-full accent-emerald-700 h-2 bg-zinc-200 rounded-lg cursor-pointer"
              />

              <div className="flex justify-between text-[10px] font-semibold text-zinc-400">
                <span>5 kg (Min Free)</span>
                <span>50 kg</span>
                <span>100 kg</span>
                <span>150 kg (Trolley)</span>
              </div>
            </div>

            {/* Payout Summary Box */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-950 via-[#06291C] to-emerald-900 text-white space-y-3 shadow-md relative overflow-hidden">
              <div className="flex items-center justify-between relative z-10">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-300 block">
                    Instant Doorstep UPI Payout
                  </span>
                  <div className="flex items-baseline space-x-1">
                    <span className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-white">
                      ₹{estimatedValue.toLocaleString('en-IN')}
                    </span>
                    <span className="text-[11px] text-emerald-300 font-medium">approx</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-300 block">
                    CO₂ Abated
                  </span>
                  <p className="text-sm font-bold font-mono text-emerald-200">
                    {carbonOffset} kg
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-emerald-800/60 flex items-center justify-between text-[10px] text-emerald-200 relative z-10">
                <span className="flex items-center space-x-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>0.00 Tare Weight Guarantee</span>
                </span>
                <span className="text-emerald-300 font-semibold">Free Doorstep Weighing</span>
              </div>
            </div>

            {/* Primary Action Button */}
            <button
              type="button"
              onClick={handleBookNow}
              className="w-full py-3.5 px-4 rounded-2xl bg-emerald-700 hover:bg-emerald-800 active:scale-[0.99] text-white font-bold text-xs shadow-md shadow-emerald-900/10 transition-all flex items-center justify-center space-x-2"
            >
              <Calendar className="w-4 h-4 text-emerald-200" />
              <span>Schedule Free Pickup Slot</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="ai-scan"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-4 py-2"
          >
            <div className="p-5 rounded-2xl border-2 border-dashed border-emerald-400/80 bg-emerald-50/40 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-white text-emerald-700 shadow-xs flex items-center justify-center mx-auto border border-emerald-100">
                <Camera className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-zinc-950">Bulk Pile AI Scanner</h4>
                <p className="text-xs text-zinc-600 mt-1 max-w-xs mx-auto leading-relaxed">
                  Have a storeroom or warehouse full of unsorted scrap? Snap one photo for automatic weight, volume, and material segmentation.
                </p>
              </div>

              <button
                type="button"
                onClick={handleOpenBulkAI}
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-sm transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Upload Scrap Photo</span>
              </button>
            </div>

            <div className="text-[11px] text-zinc-500 space-y-1 px-1">
              <p className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                <span>Segments Cardboard, Iron, Plastics, and Electronics</span>
              </p>
              <p className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                <span>Dispatches right vehicle size (EV Trike vs 14ft Canter)</span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
