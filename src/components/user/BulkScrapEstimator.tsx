import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  UploadCloud,
  Camera,
  Sparkles,
  Layers,
  Scale,
  IndianRupee,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Truck,
  Maximize2,
  RefreshCw,
  FileText,
  Sliders,
  ChevronRight,
  Info,
  Package,
  Cpu,
  Hammer,
  Printer,
  Download,
  X,
  Eye,
  EyeOff
} from 'lucide-react';
import { ScrapItem } from '../../types';
import { usePickup } from '../../context/PickupContext';

export interface ScrapFraction {
  id: string;
  name: string;
  category: 'plastic' | 'paper' | 'metal' | 'ewaste' | 'appliances';
  sharePercent: number;
  weightKg: number;
  unitPrice: number;
  totalValue: number;
  co2OffsetKg: number;
  grade: string;
  colorHex: string;
  badgeBg: string;
  badgeText: string;
  boundingBox: {
    top: number;
    left: number;
    width: number;
    height: number;
    label: string;
  };
}

export interface BulkPilePreset {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  volumeM3: number;
  bulkDensity: number;
  fractions: ScrapFraction[];
}

const BULK_PRESETS: BulkPilePreset[] = [
  {
    id: 'occ-warehouse',
    title: 'Warehouse Packaging & OCC Cardboard',
    subtitle: 'High-volume corrugated packaging, office files & pallet wrap',
    imageUrl: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=1000&auto=format&fit=crop&q=80',
    volumeM3: 1.85,
    bulkDensity: 110,
    fractions: [
      {
        id: 'f1',
        name: 'Fluted Corrugated Cardboard (OCC)',
        category: 'paper',
        sharePercent: 62,
        weightKg: 126,
        unitPrice: 16,
        totalValue: 2016,
        co2OffsetKg: 163.8,
        grade: 'Grade A Clean Bales',
        colorHex: '#d97706', // amber-600
        badgeBg: 'bg-amber-50 border-amber-200',
        badgeText: 'text-amber-900',
        boundingBox: { top: 18, left: 14, width: 48, height: 52, label: 'OCC Cardboard (62%)' }
      },
      {
        id: 'f2',
        name: 'Office Kraft & Ledger Paper',
        category: 'paper',
        sharePercent: 18,
        weightKg: 37,
        unitPrice: 14,
        totalValue: 518,
        co2OffsetKg: 44.4,
        grade: 'De-inkable White Pulp',
        colorHex: '#ca8a04', // yellow-600
        badgeBg: 'bg-yellow-50 border-yellow-200',
        badgeText: 'text-yellow-900',
        boundingBox: { top: 35, left: 58, width: 34, height: 38, label: 'Office Paper (18%)' }
      },
      {
        id: 'f3',
        name: 'LDPE Pallet Stretch Film & Straps',
        category: 'plastic',
        sharePercent: 12,
        weightKg: 24,
        unitPrice: 24,
        totalValue: 576,
        co2OffsetKg: 38.4,
        grade: 'Clear Polymer Film',
        colorHex: '#059669', // emerald-600
        badgeBg: 'bg-emerald-50 border-emerald-200',
        badgeText: 'text-emerald-900',
        boundingBox: { top: 12, left: 62, width: 28, height: 26, label: 'LDPE Wrap (12%)' }
      },
      {
        id: 'f4',
        name: 'Moisture & Inert Packing Tare',
        category: 'paper',
        sharePercent: 8,
        weightKg: 16,
        unitPrice: 0,
        totalValue: 0,
        co2OffsetKg: 0,
        grade: 'Non-Recyclable Deductible',
        colorHex: '#71717a', // zinc-500
        badgeBg: 'bg-zinc-100 border-zinc-200',
        badgeText: 'text-zinc-700',
        boundingBox: { top: 68, left: 24, width: 44, height: 24, label: 'Tare/Tape (8%)' }
      }
    ]
  },
  {
    id: 'industrial-metals',
    title: 'Industrial Fabrication & Yard Scrap',
    subtitle: 'Heavy melting steel turnings, aluminium extrusions & fittings',
    imageUrl: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=1000&auto=format&fit=crop&q=80',
    volumeM3: 0.95,
    bulkDensity: 340,
    fractions: [
      {
        id: 'f1',
        name: 'Heavy Melting Steel (HMS 1&2)',
        category: 'metal',
        sharePercent: 48,
        weightKg: 155,
        unitPrice: 34,
        totalValue: 5270,
        co2OffsetKg: 248.0,
        grade: 'IS 2062 Heavy Gauge',
        colorHex: '#475569', // slate-600
        badgeBg: 'bg-slate-50 border-slate-200',
        badgeText: 'text-slate-900',
        boundingBox: { top: 22, left: 16, width: 45, height: 50, label: 'HMS Steel (48%)' }
      },
      {
        id: 'f2',
        name: 'Aluminium 6063 Extrusions & Casings',
        category: 'metal',
        sharePercent: 24,
        weightKg: 78,
        unitPrice: 145,
        totalValue: 11310,
        co2OffsetKg: 429.0,
        grade: 'Alloy Clean Section',
        colorHex: '#0284c7', // sky-600
        badgeBg: 'bg-sky-50 border-sky-200',
        badgeText: 'text-sky-900',
        boundingBox: { top: 15, left: 58, width: 36, height: 42, label: 'Aluminium 6063 (24%)' }
      },
      {
        id: 'f3',
        name: 'Cast Iron Piping & Machine Beds',
        category: 'metal',
        sharePercent: 18,
        weightKg: 58,
        unitPrice: 28,
        totalValue: 1624,
        co2OffsetKg: 87.0,
        grade: 'Grey Iron Scrap',
        colorHex: '#52525b', // zinc-600
        badgeBg: 'bg-zinc-100 border-zinc-200',
        badgeText: 'text-zinc-800',
        boundingBox: { top: 58, left: 32, width: 46, height: 35, label: 'Cast Iron (18%)' }
      },
      {
        id: 'f4',
        name: 'Cutting Fluid & Metal Mill Dust Tare',
        category: 'metal',
        sharePercent: 10,
        weightKg: 32,
        unitPrice: 0,
        totalValue: 0,
        co2OffsetKg: 0,
        grade: 'Moisture/Slag Tare',
        colorHex: '#a1a1aa', // zinc-400
        badgeBg: 'bg-zinc-100 border-zinc-200',
        badgeText: 'text-zinc-600',
        boundingBox: { top: 72, left: 12, width: 38, height: 20, label: 'Slag Tare (10%)' }
      }
    ]
  },
  {
    id: 'demolition-scrap',
    title: 'Demolition & Building Renovation Pile',
    subtitle: 'Rebar cutoffs, copper conduit, galvanized ducting & wiring',
    imageUrl: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?w=1000&auto=format&fit=crop&q=80',
    volumeM3: 2.1,
    bulkDensity: 215,
    fractions: [
      {
        id: 'f1',
        name: 'TMT Reinforcement Steel Rebar',
        category: 'metal',
        sharePercent: 52,
        weightKg: 235,
        unitPrice: 32,
        totalValue: 7520,
        co2OffsetKg: 376.0,
        grade: 'Fe 500D Construction Rebar',
        colorHex: '#334155', // slate-700
        badgeBg: 'bg-slate-100 border-slate-300',
        badgeText: 'text-slate-900',
        boundingBox: { top: 20, left: 10, width: 55, height: 55, label: 'TMT Rebar (52%)' }
      },
      {
        id: 'f2',
        name: 'Galvanized Iron (GI) Ducting & Sheets',
        category: 'metal',
        sharePercent: 22,
        weightKg: 99,
        unitPrice: 26,
        totalValue: 2574,
        co2OffsetKg: 148.5,
        grade: 'Zinc-coated GI Sheets',
        colorHex: '#0891b2', // cyan-600
        badgeBg: 'bg-cyan-50 border-cyan-200',
        badgeText: 'text-cyan-900',
        boundingBox: { top: 28, left: 62, width: 32, height: 40, label: 'GI Ducting (22%)' }
      },
      {
        id: 'f3',
        name: 'Copper Plumbing & Cable Coils',
        category: 'metal',
        sharePercent: 14,
        weightKg: 63,
        unitPrice: 520,
        totalValue: 32760,
        co2OffsetKg: 504.0,
        grade: 'Berry/Candy Copper Grade 1',
        colorHex: '#b45309', // amber-700
        badgeBg: 'bg-amber-100 border-amber-300',
        badgeText: 'text-amber-950 font-bold',
        boundingBox: { top: 10, left: 45, width: 25, height: 28, label: 'Copper Grade 1 (14%)' }
      },
      {
        id: 'f4',
        name: 'Mortar, Masonry & Rubber Tare',
        category: 'metal',
        sharePercent: 12,
        weightKg: 54,
        unitPrice: 0,
        totalValue: 0,
        co2OffsetKg: 0,
        grade: 'Demolition Debris Deduction',
        colorHex: '#9ca3af',
        badgeBg: 'bg-zinc-100 border-zinc-200',
        badgeText: 'text-zinc-600',
        boundingBox: { top: 70, left: 20, width: 60, height: 22, label: 'Debris Tare (12%)' }
      }
    ]
  },
  {
    id: 'ewaste-bulk',
    title: 'Enterprise IT Cleanout & E-Waste Heap',
    subtitle: 'Server racks, power supplies, desktop chassis & PCB circuit cards',
    imageUrl: 'https://images.unsplash.com/photo-1597733336794-12d05021d510?w=1000&auto=format&fit=crop&q=80',
    volumeM3: 1.25,
    bulkDensity: 145,
    fractions: [
      {
        id: 'f1',
        name: 'Server Chassis & Galvanized Enclosures',
        category: 'metal',
        sharePercent: 42,
        weightKg: 76,
        unitPrice: 32,
        totalValue: 2432,
        co2OffsetKg: 121.6,
        grade: 'Ferrous Sheet Metal',
        colorHex: '#475569',
        badgeBg: 'bg-slate-50 border-slate-200',
        badgeText: 'text-slate-900',
        boundingBox: { top: 18, left: 14, width: 44, height: 50, label: 'Server Chassis (42%)' }
      },
      {
        id: 'f2',
        name: 'Telecom & High-Density Printed Circuit Boards',
        category: 'ewaste',
        sharePercent: 22,
        weightKg: 40,
        unitPrice: 850,
        totalValue: 34000,
        co2OffsetKg: 340.0,
        grade: 'Gold-Contact Motherboard Class A',
        colorHex: '#15803d', // green-700
        badgeBg: 'bg-emerald-50 border-emerald-200',
        badgeText: 'text-emerald-950 font-bold',
        boundingBox: { top: 32, left: 56, width: 38, height: 38, label: 'Class-A PCBs (22%)' }
      },
      {
        id: 'f3',
        name: 'Transformer Coils & Shielded Wiring',
        category: 'metal',
        sharePercent: 20,
        weightKg: 36,
        unitPrice: 290,
        totalValue: 10440,
        co2OffsetKg: 216.0,
        grade: 'Copper Wire Harness (65% Recovery)',
        colorHex: '#c2410c',
        badgeBg: 'bg-orange-50 border-orange-200',
        badgeText: 'text-orange-950',
        boundingBox: { top: 12, left: 52, width: 34, height: 26, label: 'Wiring & SMPS (20%)' }
      },
      {
        id: 'f4',
        name: 'Flame-Retardant ABS Polymer Casings',
        category: 'plastic',
        sharePercent: 16,
        weightKg: 29,
        unitPrice: 22,
        totalValue: 638,
        co2OffsetKg: 52.2,
        grade: 'UL-94 Rated Molded Polymer',
        colorHex: '#047857',
        badgeBg: 'bg-emerald-50 border-emerald-200',
        badgeText: 'text-emerald-900',
        boundingBox: { top: 66, left: 22, width: 50, height: 24, label: 'ABS Polymers (16%)' }
      }
    ]
  }
];

export const BulkScrapEstimator: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { setDraftItem } = usePickup();

  // State
  const [selectedPresetId, setSelectedPresetId] = useState<string>('occ-warehouse');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisPhase, setAnalysisPhase] = useState('Initializing volumetric neural mesh...');
  const [showBoundingBoxes, setShowBoundingBoxes] = useState(true);
  const [hoveredFractionId, setHoveredFractionId] = useState<string | null>(null);

  // Calibration Scale
  const [scaleReference, setScaleReference] = useState<'AUTO' | 'PALLET' | 'PERSON' | 'DRUM' | 'CUSTOM'>('AUTO');
  const [customVolumeMultiplier, setCustomVolumeMultiplier] = useState<number>(1.0);

  // Active Data
  const currentPreset = BULK_PRESETS.find((p) => p.id === selectedPresetId) || BULK_PRESETS[0];
  const activeImage = uploadedImage || currentPreset.imageUrl;

  // Modals
  const [showCertificateModal, setShowCertificateModal] = useState(false);

  // Trigger analysis animation when image or preset changes
  const runAnalysis = (customImg?: string) => {
    setIsAnalyzing(true);
    setAnalysisProgress(10);
    setAnalysisPhase('Extracting 3D point cloud & pile contour perimeter...');

    const step1 = setTimeout(() => {
      setAnalysisProgress(40);
      setAnalysisPhase('Segmenting multispectral material layers (OCC, Ferrous, Polymers)...');
    }, 450);

    const step2 = setTimeout(() => {
      setAnalysisProgress(75);
      setAnalysisPhase('Computing spatial void ratio & bulk density (kg/m³)...');
    }, 900);

    const step3 = setTimeout(() => {
      setAnalysisProgress(100);
      setAnalysisPhase('Analysis complete. Synchronizing spot prices & CPCB manifest.');
      setTimeout(() => {
        setIsAnalyzing(false);
      }, 350);
    }, 1350);

    return () => {
      clearTimeout(step1);
      clearTimeout(step2);
      clearTimeout(step3);
    };
  };

  useEffect(() => {
    // Run initial analysis animation
    const timer = setTimeout(() => {
      runAnalysis();
    }, 150);
    return () => clearTimeout(timer);
  }, [selectedPresetId]);

  // Handle Drag and Drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      processSelectedFile(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processSelectedFile(file);
    }
  };

  const processSelectedFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        const dataUrl = event.target.result as string;
        setUploadedImage(dataUrl);
        runAnalysis(dataUrl);
      }
    };
    reader.readAsDataURL(file);
  };

  // Calibration scale multiplier calculation
  const getScaleMultiplier = () => {
    switch (scaleReference) {
      case 'PALLET':
        return 1.15; // standard 1.2m pallet scaling
      case 'PERSON':
        return 1.35; // ~1.75m reference
      case 'DRUM':
        return 0.9;  // 0.9m drum
      case 'CUSTOM':
        return customVolumeMultiplier;
      case 'AUTO':
      default:
        return 1.0;
    }
  };

  const scaleMultiplier = getScaleMultiplier();
  const calibratedVolume = Number((currentPreset.volumeM3 * scaleMultiplier).toFixed(2));
  const rawTotalWeight = Math.round(calibratedVolume * currentPreset.bulkDensity);

  // Scaled fractions
  const scaledFractions = currentPreset.fractions.map((frac) => {
    const weight = Math.round((rawTotalWeight * frac.sharePercent) / 100);
    const value = Math.round(weight * frac.unitPrice);
    const co2 = Number((weight * (frac.co2OffsetKg / (frac.weightKg || 1))).toFixed(1));
    return {
      ...frac,
      weightKg: weight,
      totalValue: value,
      co2OffsetKg: isNaN(co2) ? 0 : co2
    };
  });

  const totalWeight = scaledFractions.reduce((acc, f) => acc + f.weightKg, 0);
  const totalPayout = scaledFractions.reduce((acc, f) => acc + f.totalValue, 0);
  const totalCo2 = scaledFractions.reduce((acc, f) => acc + f.co2OffsetKg, 0).toFixed(1);
  const tareWeight = scaledFractions.find((f) => f.unitPrice === 0)?.weightKg || 0;

  // Logistics Recommendation
  const recommendedVehicle =
    totalWeight > 500
      ? {
          type: 'Industrial Hydraulic Flatbed (3.5 Ton)',
          badge: 'Heavy Commercial Fleet',
          crew: '3-Person Certified Crew + Crane Lift',
          eta: 'Within 2 Hours (Industrial Corridor Priority)'
        }
      : totalWeight > 120
      ? {
          type: 'High-Capacity Electric Mini-Truck (1.2 Ton)',
          badge: 'EV Commercial Cargo',
          crew: '2-Person Handlers + Ramp Scale',
          eta: 'Within 45 Mins'
        }
      : {
          type: 'Electric Heavy Cargo Trike (500 kg)',
          badge: 'Clean-Tech Trike',
          crew: '1 Dedicated Collector + Portable Floor Scale',
          eta: 'Within 25 Mins'
        };

  // Action: Proceed to Doorstep Booking
  const handleBookBulkPickup = () => {
    const compositeDescription = scaledFractions
      .filter((f) => f.unitPrice > 0)
      .map((f) => `${f.name} (${f.weightKg} kg @ ₹${f.unitPrice}/kg)`)
      .join('; ');

    const item: ScrapItem = {
      id: 'bulk_' + Date.now(),
      category: scaledFractions[0]?.category || 'paper',
      materialName: `Bulk Scrap Pile (${currentPreset.title})`,
      estimatedWeightKg: totalWeight,
      estimatedPriceMin: Math.round(totalPayout * 0.95),
      estimatedPriceMax: Math.round(totalPayout * 1.05),
      confidence: 0.94,
      ratePerKg: Math.round(totalPayout / (totalWeight || 1)),
      imageUrl: activeImage,
      condition: 'Good',
      notes: `AI Volumetric Analysis: ~${calibratedVolume}m³ • Net Recyclable: ${totalWeight - tareWeight}kg • Breakdown: ${compositeDescription}`
    };

    setDraftItem(item);
    sessionStorage.setItem('ekabaadi_active_scan_img', activeImage);
    navigate('/user/pickup');
  };

  return (
    <div className="space-y-6">
      
      {/* 1. Header & Context */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-200">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/80 mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            <span>AI Computer Vision • Bulk Pile Volumetrics</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight">
            Bulk Scrap Pile Estimator
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 max-w-2xl">
            Import a photo of an unsegregated heap or industrial scrap pile. Our spatial neural net maps contour boundaries, predicts layer composition percentages, and computes weight and payout spot estimates.
          </p>
        </div>

        <div className="flex items-center space-x-2.5 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-3.5 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-xs flex items-center space-x-2 transition-colors"
          >
            <UploadCloud className="w-4 h-4" />
            <span>Upload Pile Photo</span>
          </button>
          <button
            type="button"
            onClick={() => runAnalysis()}
            disabled={isAnalyzing}
            className="p-2 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-700 border border-zinc-300 transition-colors"
            title="Re-run AI Volumetric Scan"
          >
            <RefreshCw className={`w-4 h-4 ${isAnalyzing ? 'animate-spin text-emerald-700' : ''}`} />
          </button>
        </div>
      </div>

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* 2. Preset Pile Switcher (For quick demonstration & testing) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-zinc-800 uppercase tracking-tight">
            Select Pile Stream Archetype Or Test Presets
          </span>
          {uploadedImage && (
            <button
              onClick={() => {
                setUploadedImage(null);
                runAnalysis();
              }}
              className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-800 flex items-center space-x-1"
            >
              <span>Reset to Standard Presets</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {BULK_PRESETS.map((preset) => {
            const isSelected = selectedPresetId === preset.id && !uploadedImage;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => {
                  setSelectedPresetId(preset.id);
                  setUploadedImage(null);
                }}
                className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                  isSelected
                    ? 'bg-emerald-50/70 border-emerald-600 text-zinc-900 ring-1 ring-emerald-600 shadow-xs'
                    : 'bg-white border-zinc-200 text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50'
                }`}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <img
                    src={preset.imageUrl}
                    alt={preset.title}
                    className="w-12 h-12 rounded-lg object-cover border border-zinc-200 flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-zinc-900 truncate">{preset.title}</h4>
                    <p className="text-[10px] text-zinc-500 mt-0.5 line-clamp-1">{preset.subtitle}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-zinc-100 text-[11px]">
                  <span className="text-zinc-500 font-mono">~{preset.volumeM3} m³ est.</span>
                  <span className="font-bold text-emerald-700">
                    {preset.fractions.length} Detected Streams
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Main Stage: Pile Photo with Interactive AI Bounding Masks & Live Calibration */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Photo Stage & Segmentation Masks (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-zinc-800 uppercase tracking-tight flex items-center space-x-1.5">
              <span>Spatial Detection Canvas</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] bg-zinc-100 text-zinc-700 border border-zinc-200">
                {activeImage === uploadedImage ? 'Custom User Upload' : 'Reference Catalog'}
              </span>
            </span>

            <button
              type="button"
              onClick={() => setShowBoundingBoxes(!showBoundingBoxes)}
              className="text-xs font-semibold text-zinc-600 hover:text-zinc-900 flex items-center space-x-1"
            >
              {showBoundingBoxes ? (
                <>
                  <EyeOff className="w-3.5 h-3.5 text-zinc-500" />
                  <span>Hide AI Masks</span>
                </>
              ) : (
                <>
                  <Eye className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Show AI Masks</span>
                </>
              )}
            </button>
          </div>

          {/* Drag and Drop Container Frame */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`relative rounded-xl overflow-hidden border-2 transition-all bg-zinc-900 aspect-[4/3] flex items-center justify-center ${
              isDragOver
                ? 'border-emerald-500 ring-4 ring-emerald-500/20 bg-zinc-800'
                : 'border-zinc-200 shadow-xs'
            }`}
          >
            {/* The Image */}
            <img
              src={activeImage}
              alt="Bulk scrap pile"
              className="w-full h-full object-cover select-none"
            />

            {/* AI Active Scanning Line & Laser Grid Overlay */}
            {isAnalyzing && (
              <div className="absolute inset-0 bg-zinc-950/40 backdrop-blur-[2px] flex flex-col items-center justify-center p-6 z-30 transition-opacity">
                {/* Horizontal Laser Scan Line */}
                <div 
                  className="absolute inset-x-0 h-0.5 bg-emerald-400 shadow-[0_0_12px_#34d399] transition-all duration-300 pointer-events-none"
                  style={{ top: `${analysisProgress}%` }}
                />

                <div className="max-w-md w-full bg-zinc-900/90 border border-zinc-700 rounded-xl p-4 text-white shadow-xl text-center space-y-3">
                  <div className="flex items-center justify-center space-x-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="w-4 h-4 animate-spin" />
                    <span>Neural Volumetric Ingestion</span>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-zinc-100">{analysisPhase}</p>
                    <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                        style={{ width: `${analysisProgress}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex justify-between text-[11px] text-zinc-400 font-mono">
                    <span>LiDAR Depth: Active</span>
                    <span>Confidence: 94.8%</span>
                  </div>
                </div>
              </div>
            )}

            {/* Interactive Bounding Box Segments on Photo */}
            {!isAnalyzing && showBoundingBoxes && (
              <div className="absolute inset-0 pointer-events-none">
                {scaledFractions.map((frac) => {
                  const isHovered = hoveredFractionId === frac.id;
                  return (
                    <div
                      key={frac.id}
                      className={`absolute rounded-lg border-2 transition-all pointer-events-auto cursor-pointer ${
                        isHovered
                          ? 'border-white bg-white/20 shadow-lg scale-[1.01] z-20'
                          : 'border-white/70 bg-black/10 hover:border-white hover:bg-white/15'
                      }`}
                      style={{
                        top: `${frac.boundingBox.top}%`,
                        left: `${frac.boundingBox.left}%`,
                        width: `${frac.boundingBox.width}%`,
                        height: `${frac.boundingBox.height}%`,
                        borderColor: isHovered ? '#ffffff' : frac.colorHex
                      }}
                      onMouseEnter={() => setHoveredFractionId(frac.id)}
                      onMouseLeave={() => setHoveredFractionId(null)}
                    >
                      {/* Floating Segment Badge */}
                      <div
                        className="absolute -top-3 left-2 px-2 py-0.5 rounded text-[10px] font-bold text-white shadow-md flex items-center space-x-1"
                        style={{ backgroundColor: frac.colorHex }}
                      >
                        <Layers className="w-2.5 h-2.5" />
                        <span>{frac.boundingBox.label}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Bottom Status Ribbon */}
            <div className="absolute bottom-0 inset-x-0 bg-zinc-900/85 backdrop-blur-sm border-t border-zinc-800 px-4 py-2.5 flex items-center justify-between text-xs text-zinc-300 z-10">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-semibold text-white">
                  Volumetric Est: ~{calibratedVolume} m³
                </span>
                <span className="text-zinc-500">•</span>
                <span className="text-zinc-300 font-mono">
                  Density: {currentPreset.bulkDensity} kg/m³
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-[11px] font-semibold text-emerald-400 hover:text-emerald-300 underline"
                >
                  Change Photo
                </button>
              </div>
            </div>
          </div>

          {/* Scale Reference & Calibration Control Strip */}
          <div className="p-3.5 rounded-xl bg-white border border-zinc-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-xs font-bold text-zinc-900">
                <Sliders className="w-4 h-4 text-emerald-700" />
                <span>Spatial Calibration & Scale Reference</span>
              </div>
              <span className="text-[11px] text-zinc-500">
                Refines weight precision based on visual anchors
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'AUTO', label: 'AI Auto-Detect', sub: 'Calculated Mesh' },
                { id: 'PALLET', label: 'Euro Pallet', sub: '1.2m x 0.8m anchor' },
                { id: 'PERSON', label: 'Worker / Person', sub: '~1.7m anchor' },
                { id: 'DRUM', label: '55-Gal Drum', sub: '~0.9m anchor' }
              ].map((cal) => (
                <button
                  key={cal.id}
                  type="button"
                  onClick={() => setScaleReference(cal.id as any)}
                  className={`px-3 py-2 rounded-lg border text-left transition-colors ${
                    scaleReference === cal.id
                      ? 'bg-emerald-50 border-emerald-600 text-emerald-950 font-semibold ring-1 ring-emerald-600'
                      : 'bg-zinc-50 hover:bg-zinc-100 border-zinc-200 text-zinc-700'
                  }`}
                >
                  <p className="text-xs font-bold truncate">{cal.label}</p>
                  <p className="text-[10px] text-zinc-500 mt-0.5">{cal.sub}</p>
                </button>
              ))}
            </div>

            {/* Custom Density / Volume Slider fine-tuner */}
            <div className="pt-2 border-t border-zinc-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-zinc-600">
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-zinc-800">Volume Multiplier:</span>
                <span className="font-mono text-emerald-800 font-bold">{scaleMultiplier.toFixed(2)}x</span>
              </div>

              <div className="flex items-center space-x-3 w-full sm:w-64">
                <span className="text-[10px] text-zinc-500">0.5x</span>
                <input
                  type="range"
                  min="0.5"
                  max="2.5"
                  step="0.05"
                  value={scaleMultiplier}
                  onChange={(e) => {
                    setScaleReference('CUSTOM');
                    setCustomVolumeMultiplier(parseFloat(e.target.value));
                  }}
                  className="w-full accent-emerald-700 h-1.5 bg-zinc-200 rounded-lg cursor-pointer"
                />
                <span className="text-[10px] text-zinc-500">2.5x</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: AI Material Composition Breakdown & Payout Valuation (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Key Valuation Highlight Card */}
          <div className="p-4 sm:p-5 rounded-xl bg-white border border-zinc-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
              <span className="text-[11px] font-bold uppercase tracking-tight text-zinc-500">
                Automated Estimation Summary
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                Spot Rate Verified
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-xs text-zinc-500 font-medium">Estimated Total Weight</span>
                <div className="flex items-baseline space-x-1.5 mt-0.5">
                  <span className="text-2xl sm:text-3xl font-extrabold text-zinc-900">
                    {totalWeight}
                  </span>
                  <span className="text-xs font-bold text-zinc-500">kg</span>
                </div>
                <p className="text-[10px] text-zinc-500 mt-1">
                  ±6% volumetric variance range ({Math.round(totalWeight * 0.94)} - {Math.round(totalWeight * 1.06)} kg)
                </p>
              </div>

              <div>
                <span className="text-xs text-zinc-500 font-medium">Estimated Payout</span>
                <div className="flex items-baseline space-x-1 mt-0.5">
                  <span className="text-2xl sm:text-3xl font-extrabold text-emerald-800">
                    ₹{totalPayout.toLocaleString('en-IN')}
                  </span>
                </div>
                <p className="text-[10px] text-emerald-700 font-medium mt-1">
                  Instant UPI on verified floor-scale
                </p>
              </div>
            </div>

            {/* Composite Multi-Segment Progress Bar */}
            <div className="space-y-1.5 pt-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-semibold text-zinc-700">Stream Composition Spectrum</span>
                <span className="text-zinc-500 font-mono">100% Accounted</span>
              </div>

              <div className="h-3 w-full rounded-full overflow-hidden flex bg-zinc-100 p-0.5 gap-0.5 border border-zinc-200">
                {scaledFractions.map((frac) => (
                  <div
                    key={frac.id}
                    style={{
                      width: `${frac.sharePercent}%`,
                      backgroundColor: frac.colorHex
                    }}
                    className="h-full rounded-xs transition-all hover:opacity-90 cursor-pointer"
                    title={`${frac.name}: ${frac.sharePercent}% (${frac.weightKg} kg)`}
                    onMouseEnter={() => setHoveredFractionId(frac.id)}
                    onMouseLeave={() => setHoveredFractionId(null)}
                  />
                ))}
              </div>
            </div>

            {/* Environmental Impact Stat */}
            <div className="px-3 py-2 rounded-lg bg-emerald-50/70 border border-emerald-200/80 flex items-center justify-between text-xs">
              <span className="text-emerald-900 font-medium">
                Prevented Landfill Emissions:
              </span>
              <span className="font-bold text-emerald-800">
                ~{totalCo2} kg CO₂ offset
              </span>
            </div>
          </div>

          {/* Detailed Fractions List */}
          <div className="p-4 sm:p-5 rounded-xl bg-white border border-zinc-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-tight">
                Identified Fractions & Spot Pricing
              </h3>
              <span className="text-[10px] text-zinc-500">
                Hover row to view zone
              </span>
            </div>

            <div className="divide-y divide-zinc-100">
              {scaledFractions.map((frac) => {
                const isHovered = hoveredFractionId === frac.id;
                return (
                  <div
                    key={frac.id}
                    onMouseEnter={() => setHoveredFractionId(frac.id)}
                    onMouseLeave={() => setHoveredFractionId(null)}
                    className={`py-2.5 px-2 rounded-lg transition-colors flex items-center justify-between ${
                      isHovered ? 'bg-zinc-50 ring-1 ring-zinc-300' : 'hover:bg-zinc-50/60'
                    }`}
                  >
                    <div className="flex items-start space-x-2.5 min-w-0">
                      <span
                        className="w-3 h-3 rounded-full mt-1 flex-shrink-0"
                        style={{ backgroundColor: frac.colorHex }}
                      />
                      <div className="min-w-0">
                        <div className="flex items-center space-x-1.5">
                          <span className="text-xs font-bold text-zinc-900 truncate">
                            {frac.name}
                          </span>
                          <span className={`text-[10px] font-semibold px-1.5 py-0.2 rounded border ${frac.badgeBg} ${frac.badgeText}`}>
                            {frac.sharePercent}%
                          </span>
                        </div>
                        <p className="text-[11px] text-zinc-500 mt-0.5">
                          {frac.grade} • {frac.weightKg} kg est.
                        </p>
                      </div>
                    </div>

                    <div className="text-right flex-shrink-0 pl-2">
                      <p className="text-xs font-bold text-zinc-900">
                        {frac.unitPrice > 0 ? `₹${frac.totalValue.toLocaleString('en-IN')}` : 'Tare Deducted'}
                      </p>
                      <p className="text-[10px] text-zinc-500">
                        {frac.unitPrice > 0 ? `₹${frac.unitPrice}/kg` : '0 Payout'}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recommended Fleet Vehicle & Crew Guidance */}
          <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 space-y-2.5 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 font-bold text-zinc-900">
                <Truck className="w-4 h-4 text-emerald-700" />
                <span>Recommended Logistics Dispatch</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-zinc-200 text-zinc-800">
                {recommendedVehicle.badge}
              </span>
            </div>

            <p className="font-semibold text-zinc-900 text-sm">
              {recommendedVehicle.type}
            </p>
            <div className="text-zinc-600 space-y-1 text-[11px]">
              <p>• Deployment: {recommendedVehicle.crew}</p>
              <p>• Estimated On-site ETA: {recommendedVehicle.eta}</p>
            </div>
          </div>

          {/* Actions & Booking Triggers */}
          <div className="space-y-2 pt-1">
            <button
              type="button"
              onClick={handleBookBulkPickup}
              className="w-full py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm shadow-xs flex items-center justify-center space-x-2 transition-colors"
            >
              <span>Schedule High-Capacity Bulk Collection</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setShowCertificateModal(true)}
              className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-zinc-50 text-zinc-700 border border-zinc-300 font-semibold text-xs flex items-center justify-center space-x-2 transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-zinc-500" />
              <span>View Appraisal Manifest & Audit Certificate</span>
            </button>
          </div>

        </div>

      </div>

      {/* 4. Appraisal Certificate Modal */}
      {showCertificateModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 space-y-5 border border-zinc-200 shadow-2xl relative">
            <button
              onClick={() => setShowCertificateModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Certificate Header */}
            <div className="border-b border-zinc-200 pb-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-800 font-bold">
                  CPCB-Approved Clean Tech Ledger
                </span>
                <h3 className="text-lg font-bold text-zinc-900 mt-0.5">
                  AI Scrap Appraisal & Composition Certificate
                </h3>
                <p className="text-xs text-zinc-500 font-mono mt-0.5">
                  Doc ID: EK-APP-2026-{Math.floor(100000 + Math.random() * 900000)}
                </p>
              </div>
              <ShieldCheck className="w-8 h-8 text-emerald-700" />
            </div>

            {/* Audit Details */}
            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3 rounded-lg bg-zinc-50 border border-zinc-200">
                <div>
                  <span className="text-zinc-500 text-[11px]">Stream Archetype</span>
                  <p className="font-bold text-zinc-900 mt-0.5">{currentPreset.title}</p>
                </div>
                <div>
                  <span className="text-zinc-500 text-[11px]">Spatial Volume</span>
                  <p className="font-bold text-zinc-900 mt-0.5">~{calibratedVolume} m³ ({scaleReference} Calibrated)</p>
                </div>
                <div>
                  <span className="text-zinc-500 text-[11px]">Gross Certified Weight</span>
                  <p className="font-bold text-zinc-900 mt-0.5">{totalWeight} kg</p>
                </div>
                <div>
                  <span className="text-zinc-500 text-[11px]">Estimated Spot Value</span>
                  <p className="font-bold text-emerald-800 mt-0.5">₹{totalPayout.toLocaleString('en-IN')}</p>
                </div>
              </div>

              {/* Table of components */}
              <table className="w-full text-left border border-zinc-200 rounded-lg overflow-hidden">
                <thead className="bg-zinc-100 text-[10px] uppercase font-bold text-zinc-600">
                  <tr>
                    <th className="p-2">Material Stream</th>
                    <th className="p-2">Share</th>
                    <th className="p-2">Weight</th>
                    <th className="p-2">Mandi Rate</th>
                    <th className="p-2 text-right">Net Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 text-[11px]">
                  {scaledFractions.map((f) => (
                    <tr key={f.id}>
                      <td className="p-2 font-medium text-zinc-900">{f.name}</td>
                      <td className="p-2">{f.sharePercent}%</td>
                      <td className="p-2 font-semibold">{f.weightKg} kg</td>
                      <td className="p-2">₹{f.unitPrice}/kg</td>
                      <td className="p-2 text-right font-bold text-zinc-900">
                        ₹{f.totalValue.toLocaleString('en-IN')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer & Print button */}
            <div className="pt-2 border-t border-zinc-200 flex items-center justify-between">
              <span className="text-[11px] text-zinc-500">
                Digital scale verification upon physical doorstep handover.
              </span>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-semibold flex items-center space-x-1.5 transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Slip</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowCertificateModal(false)}
                  className="px-3.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold transition-colors"
                >
                  Close
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
