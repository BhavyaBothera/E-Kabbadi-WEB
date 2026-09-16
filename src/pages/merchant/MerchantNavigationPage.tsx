import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Navigation, 
  MapPin, 
  Phone, 
  CheckCircle2, 
  ArrowLeft, 
  Compass, 
  Scale
} from 'lucide-react';
import { usePickup } from '../../context/PickupContext';
import { VerificationModal } from '../../components/user/VerificationModal';
import { pickupService } from '../../services/pickupService';

export const MerchantNavigationPage: React.FC = () => {
  const navigate = useNavigate();
  const { activePickup, setActivePickup } = usePickup();
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [arrived, setArrived] = useState(false);

  const pickup = activePickup || {
    id: 'PK-991',
    userName: 'Ananya Sharma',
    userPhone: '+91 98290 14820',
    userAddress: 'Flat 402, Royal Palms, Sector 4',
    city: 'Neemrana',
    status: 'ON_THE_WAY' as const,
    scheduledDate: 'Today',
    scheduledTimeSlot: '11:00 AM – 01:00 PM',
    scrapItems: [
      {
        category: 'plastic' as const,
        materialName: 'Polyethylene Terephthalate (PET Grade 1)',
        estimatedWeightKg: 4.5,
        estimatedPriceMin: 120,
        estimatedPriceMax: 140,
        confidence: 94,
        imageUrl: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=500'
      }
    ],
    createdAt: new Date().toISOString()
  };

  const handleArrived = () => {
    setArrived(true);
    setShowVerifyModal(true);
  };

  const handleVerifyConfirm = async (actualWeight: number, finalPrice: number) => {
    setShowVerifyModal(false);
    const txn = `UPI-${Math.floor(100000 + Math.random() * 900000)}-EK`;
    await pickupService.completePickup(pickup.id, actualWeight, finalPrice, txn);
    navigate('/merchant/history');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-zinc-200">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigate('/merchant/dashboard')}
            className="p-2 rounded-lg bg-white border border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-amber-600 animate-ping" />
              <span className="text-[11px] font-semibold text-amber-900 uppercase">
                Active Turn-by-Turn Route
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-zinc-900">
              En Route to {pickup.userName}
            </h1>
          </div>
        </div>

        <a
          href={`tel:${pickup.userPhone}`}
          className="px-3.5 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold flex items-center space-x-1.5 shadow-xs transition-colors"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>Call Citizen</span>
        </a>
      </div>

      {/* Turn instruction banner */}
      <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between shadow-xs">
        <div className="flex items-center space-x-3.5">
          <div className="w-11 h-11 rounded-lg bg-amber-200/70 text-amber-900 flex items-center justify-center font-bold">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-amber-900 uppercase tracking-tight">Next Turn in 200m</p>
            <h3 className="text-base font-bold text-zinc-900">Turn right onto Sector 4 Avenue, Gate 2</h3>
            <p className="text-xs text-zinc-600 mt-0.5">Destination on the left (Royal Palms Flat 402)</p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-2xl font-bold text-zinc-900">4 min</span>
          <p className="text-xs text-zinc-500 font-medium">0.8 km remaining</p>
        </div>
      </div>

      {/* Map + Customer Info Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Visual Map Canvas Simulation */}
        <div className="lg:col-span-2 rounded-xl bg-white border border-zinc-200 shadow-xs h-96 relative overflow-hidden flex flex-col justify-between p-4">
          <svg className="absolute inset-0 w-full h-full bg-zinc-100" viewBox="0 0 600 400">
            {/* Grid */}
            <defs>
              <pattern id="nav-grid" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#e4e4e7" strokeWidth="0.8" />
              </pattern>
            </defs>
            <rect width="600" height="400" fill="url(#nav-grid)" />

            {/* Roads */}
            <path d="M 50 350 L 250 350 L 350 200 L 520 200" fill="none" stroke="#ffffff" strokeWidth="20" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 50 350 L 250 350 L 350 200 L 520 200" fill="none" stroke="#10b981" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />

            {/* Trike Position */}
            <circle cx="280" cy="305" r="14" fill="#047857" stroke="#ffffff" strokeWidth="2.5" />
            <circle cx="520" cy="200" r="12" fill="#b91c1c" stroke="#ffffff" strokeWidth="2.5" />
            <text x="520" y="180" fill="#991b1b" fontSize="11" fontWeight="bold" textAnchor="middle">Destination</text>
          </svg>

          <div className="relative z-10 flex justify-between items-center bg-white/90 backdrop-blur-xs p-3 rounded-lg border border-zinc-200 max-w-sm text-xs shadow-xs">
            <div>
              <span className="text-zinc-500 font-medium">Citizen Location:</span>
              <p className="font-bold text-zinc-900">{pickup.userAddress}</p>
            </div>
            <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-1 rounded">
              OTP: 4821
            </span>
          </div>

          <div className="relative z-10 flex justify-end">
            <button
              onClick={handleArrived}
              className="px-5 py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-xs flex items-center space-x-2 transition-colors"
            >
              <Scale className="w-4 h-4" />
              <span>Mark Arrived & Weigh Scrap</span>
            </button>
          </div>
        </div>

        {/* Customer & Item Details */}
        <div className="p-5 rounded-xl bg-white border border-zinc-200 shadow-xs space-y-4">
          <div>
            <h3 className="text-sm font-bold text-zinc-900">Pickup Manifest</h3>
            <p className="text-xs text-zinc-500">Order ID: {pickup.id}</p>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-lg bg-zinc-50 border border-zinc-200 space-y-1">
              <span className="text-zinc-500 font-medium">Customer Details</span>
              <p className="font-bold text-zinc-900">{pickup.userName}</p>
              <p className="text-zinc-600">{pickup.userPhone}</p>
              <p className="text-zinc-600">{pickup.userAddress}</p>
            </div>

            <div className="p-3 rounded-lg bg-zinc-50 border border-zinc-200 space-y-1">
              <span className="text-zinc-500 font-medium">Scrap Expected</span>
              <p className="font-bold text-zinc-900">{pickup.scrapItems[0]?.materialName || 'Polymer Packaging'}</p>
              <p className="text-zinc-600">
                Est. Weight: <strong>{pickup.scrapItems[0]?.estimatedWeightKg || 4.5} kg</strong>
              </p>
            </div>

            <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 space-y-1">
              <span className="text-emerald-900 font-medium">Target Recycler Dispatch</span>
              <p className="font-bold text-emerald-950">RIICO Neemrana Hub 2</p>
              <p className="text-[11px] text-emerald-800">Direct buy-back rate ₹28/kg</p>
            </div>
          </div>

          <button
            onClick={handleArrived}
            className="w-full py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-xs flex items-center justify-center space-x-1.5 transition-colors"
          >
            <Scale className="w-4 h-4" />
            <span>Open Digital Weighing Slip</span>
          </button>
        </div>

      </div>

      {/* Verification modal */}
      {showVerifyModal && (
        <VerificationModal
          pickup={pickup}
          onAccept={handleVerifyConfirm}
          onClose={() => setShowVerifyModal(false)}
        />
      )}

    </div>
  );
};
