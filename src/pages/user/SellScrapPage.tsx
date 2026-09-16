import React, { useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Camera, 
  UploadCloud, 
  Sparkles, 
  Layers, 
  CheckCircle2, 
  ArrowRight,
  Package,
  FileText,
  Hammer,
  Cpu,
  Tv,
  Refrigerator,
  Info,
  Boxes
} from 'lucide-react';
import { SCRAP_CATEGORIES } from '../../data/mockData';
import { ScrapCategoryType } from '../../types';
import { usePickup } from '../../context/PickupContext';
import { BulkScrapEstimator } from '../../components/user/BulkScrapEstimator';

export const SellScrapPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const initialMode = searchParams.get('mode') === 'bulk' ? 'BULK_PILE' : 'INDIVIDUAL';
  const [sellMode, setSellMode] = useState<'INDIVIDUAL' | 'BULK_PILE'>(initialMode);

  const [selectedCategory, setSelectedCategory] = useState<ScrapCategoryType>('plastic');
  const [previewImage, setPreviewImage] = useState<string>(
    'https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=700&auto=format&fit=crop&q=80'
  );
  const [isProcessing, setIsProcessing] = useState(false);

  // Pre-configured realistic scrap samples
  const sampleScrapPresets: { category: ScrapCategoryType; label: string; img: string; title: string }[] = [
    {
      category: 'plastic',
      label: 'PET Plastic Bottles',
      title: 'Water & beverage containers',
      img: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=600&auto=format&fit=crop&q=80'
    },
    {
      category: 'paper',
      label: 'Corrugated Cardboard',
      title: 'Packaging boxes & office paper',
      img: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=600&auto=format&fit=crop&q=80'
    },
    {
      category: 'metal',
      label: 'Metals & Utensils',
      title: 'Aluminium frames & iron scrap',
      img: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=600&auto=format&fit=crop&q=80'
    },
    {
      category: 'ewaste',
      label: 'E-Waste & Appliances',
      title: 'Smartphones & electronic boards',
      img: 'https://images.unsplash.com/photo-1597733336794-12d05021d510?w=600&auto=format&fit=crop&q=80'
    }
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPreviewImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectSample = (sample: typeof sampleScrapPresets[0]) => {
    setSelectedCategory(sample.category);
    setPreviewImage(sample.img);
  };

  const handleProceedToAI = () => {
    setIsProcessing(true);
    sessionStorage.setItem('ekabaadi_active_scan_img', previewImage);
    sessionStorage.setItem('ekabaadi_active_scan_cat', selectedCategory);
    navigate('/user/sell/analyze');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      
      {/* Title Header & Mode Switcher */}
      <div className="border-b border-zinc-200 pb-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/80 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              <span>Smart Scrap Valuation & Booking</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">
              Sell Your Scrap
            </h1>
            <p className="text-xs sm:text-sm text-zinc-600 mt-0.5">
              Upload scrap photos for instant AI spot valuation, digital weight estimation, and doorstep collection.
            </p>
          </div>

          {/* Mode Switcher Buttons */}
          <div className="bg-zinc-100 p-1 rounded-xl border border-zinc-200/80 flex items-center space-x-1 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setSellMode('INDIVIDUAL')}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all ${
                sellMode === 'INDIVIDUAL'
                  ? 'bg-white text-zinc-900 shadow-xs border border-zinc-200/60'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Single Item Scan</span>
            </button>

            <button
              type="button"
              onClick={() => setSellMode('BULK_PILE')}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all ${
                sellMode === 'BULK_PILE'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
            >
              <Boxes className="w-3.5 h-3.5" />
              <span>Bulk Pile Estimator</span>
              <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-800 text-emerald-100">
                AI Volumetric
              </span>
            </button>
          </div>
        </div>
      </div>

      {sellMode === 'BULK_PILE' ? (
        <div className="bg-white rounded-2xl border border-zinc-200 p-5 sm:p-7 shadow-xs">
          <BulkScrapEstimator />
        </div>
      ) : (
        <div className="max-w-4xl mx-auto space-y-6">

      {/* 1. Scrap Category Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-zinc-800 uppercase tracking-tight">
            Step 1: Select Scrap Category
          </span>
          <span className="text-xs text-zinc-500">
            Current Mandi Benchmark
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {SCRAP_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`p-3 rounded-lg border text-center transition-all flex flex-col items-center justify-center space-y-1.5 ${
                  isSelected
                    ? 'bg-emerald-50/70 border-emerald-600 text-emerald-950 shadow-xs ring-1 ring-emerald-600'
                    : 'bg-white border-zinc-200 text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50'
                }`}
              >
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                  isSelected ? 'bg-emerald-100 text-emerald-800' : 'bg-zinc-100 text-zinc-600'
                }`}>
                  {cat.id === 'plastic' && <Package className="w-4 h-4" />}
                  {cat.id === 'paper' && <FileText className="w-4 h-4" />}
                  {cat.id === 'metal' && <Hammer className="w-4 h-4" />}
                  {cat.id === 'ewaste' && <Cpu className="w-4 h-4" />}
                  {cat.id === 'electronics' && <Tv className="w-4 h-4" />}
                  {cat.id === 'appliances' && <Refrigerator className="w-4 h-4" />}
                </div>
                <div>
                  <p className="text-xs font-semibold truncate max-w-[100px]">{cat.name.split(' ')[0]}</p>
                  <p className="text-[11px] text-emerald-700 font-bold">
                    ₹{cat.avgPricePerKg}/kg
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Drag & Drop Upload / Camera Area */}
      <div className="space-y-3">
        <span className="text-xs font-bold text-zinc-800 uppercase tracking-tight">
          Step 2: Provide Scrap Photo
        </span>

        <div className="rounded-xl bg-white border border-zinc-200 p-5 sm:p-6 shadow-xs">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Image Preview Box */}
            <div className="md:col-span-5 relative aspect-square sm:aspect-video md:aspect-square rounded-lg overflow-hidden bg-zinc-100 border border-zinc-200 flex items-center justify-center">
              <img
                src={previewImage}
                alt="Uploaded scrap"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-2.5">
                <span className="text-[11px] text-white font-medium flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Photo Ready for Valuation</span>
                </span>
              </div>
            </div>

            {/* Upload Controls & Guidance */}
            <div className="md:col-span-7 space-y-4">
              <div className="space-y-1">
                <h3 className="text-base font-bold text-zinc-900">
                  Accurate photo ensures fastest doorstep handoff
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Make sure items are visible in good lighting. Digital scales will do final verification at your door.
                </p>
              </div>

              <div className="flex flex-wrap gap-2.5">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3.5 py-2 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-semibold flex items-center space-x-2 transition-colors border border-zinc-300"
                >
                  <UploadCloud className="w-4 h-4 text-zinc-700" />
                  <span>Upload from Device</span>
                </button>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3.5 py-2 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-semibold flex items-center space-x-2 transition-colors border border-zinc-300"
                >
                  <Camera className="w-4 h-4 text-zinc-700" />
                  <span>Take Live Photo</span>
                </button>
              </div>

              {/* Sample Presets */}
              <div className="pt-3 border-t border-zinc-100 space-y-2">
                <span className="text-[11px] text-zinc-500 font-semibold uppercase">
                  Or Test with Sample Presets:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {sampleScrapPresets.map((sp, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectSample(sp)}
                      className={`p-2 rounded-lg text-left border text-xs flex items-center space-x-2 transition-colors ${
                        previewImage === sp.img
                          ? 'bg-emerald-50 border-emerald-600 text-emerald-950 font-medium'
                          : 'bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50'
                      }`}
                    >
                      <img src={sp.img} alt={sp.label} className="w-7 h-7 rounded object-cover" />
                      <span className="truncate text-[11px]">{sp.label}</span>
                    </button>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>

          {/* Step 3: Action Buttons */}
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => navigate('/user/dashboard')}
              className="text-xs text-zinc-500 hover:text-zinc-800 font-semibold"
            >
              Back to Dashboard
            </button>

            <button
              type="button"
              onClick={handleProceedToAI}
              disabled={isProcessing}
              className="py-2.5 px-6 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-xs transition-colors flex items-center space-x-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Analyze Material & Value</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
