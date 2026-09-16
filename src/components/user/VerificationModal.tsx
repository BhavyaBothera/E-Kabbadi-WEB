import React, { useState } from 'react';
import { 
  Scale, 
  IndianRupee, 
  CheckCircle2, 
  AlertCircle, 
  Bluetooth, 
  ShieldCheck,
  ChevronRight,
  Info,
  X
} from 'lucide-react';
import { PickupRequest, ScrapItem } from '../../types';

interface VerificationModalProps {
  pickup: PickupRequest;
  onAccept: (actualWeight: number, finalAmount: number) => void;
  onClose: () => void;
}

export const VerificationModal: React.FC<VerificationModalProps> = ({
  pickup,
  onAccept,
  onClose
}) => {
  const item: ScrapItem = pickup.scrapItems[0] || {
    category: 'plastic',
    materialName: 'Polyethylene Terephthalate (PET Grade 1)',
    estimatedWeightKg: 4.5,
    ratePerKg: 28,
    imageUrl: ''
  };

  const initialVerifiedWeight = Number((item.estimatedWeightKg * 1.05).toFixed(1));
  const ratePerKg = item.ratePerKg || 28;
  const initialFinalAmount = Math.round(initialVerifiedWeight * ratePerKg);

  const [verifiedWeight, setVerifiedWeight] = useState<number>(initialVerifiedWeight);
  const [finalAmount, setFinalAmount] = useState<number>(initialFinalAmount);
  const [condition, setCondition] = useState<'Clean' | 'Sorted' | 'Mixed'>('Clean');
  const [submitting, setSubmitting] = useState(false);

  const handleWeightChange = (newWeight: number) => {
    const w = Math.max(0.5, Number(newWeight.toFixed(1)));
    setVerifiedWeight(w);
    setFinalAmount(Math.round(w * ratePerKg));
  };

  const handleConfirm = () => {
    setSubmitting(true);
    setTimeout(() => {
      onAccept(verifiedWeight, finalAmount);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="w-full max-w-lg rounded-xl bg-white border border-zinc-200 shadow-xl p-6 space-y-5">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-zinc-900">
                Doorstep Weighment Slip
              </h3>
              <p className="text-xs text-zinc-500">
                Collector: {pickup.collector?.name || 'Ramesh Kumar'} (RJ-02-EC-4910)
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-1 text-xs text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 font-medium">
            <Bluetooth className="w-3.5 h-3.5 mr-1" />
            <span>Digital Scale Paired</span>
          </div>
        </div>

        {/* Side-by-Side: Estimate vs Verified */}
        <div className="grid grid-cols-2 gap-3">
          
          {/* Estimate Card */}
          <div className="p-3.5 rounded-lg bg-zinc-50 border border-zinc-200 space-y-1">
            <span className="text-[10px] text-zinc-500 font-semibold uppercase">Initial Photo Estimate</span>
            <p className="text-xs font-semibold text-zinc-800 truncate">{item.materialName}</p>
            <div className="pt-1">
              <span className="text-lg font-bold text-zinc-700">
                {item.estimatedWeightKg} kg
              </span>
              <p className="text-[11px] text-zinc-500">
                At ₹{ratePerKg}/kg
              </p>
            </div>
          </div>

          {/* Scale Weight Card */}
          <div className="p-3.5 rounded-lg bg-emerald-50/70 border border-emerald-300 space-y-1">
            <span className="text-[10px] text-emerald-800 font-semibold uppercase">Verified Net Scale Weight</span>
            <p className="text-xs font-semibold text-emerald-950">Tare Deducted (-50g)</p>
            <div className="pt-1">
              <span className="text-xl font-black text-emerald-900">
                {verifiedWeight} kg
              </span>
              <p className="text-[11px] text-emerald-800 font-semibold">
                Total Payout: ₹{finalAmount}
              </p>
            </div>
          </div>

        </div>

        {/* Live Weight Slider Adjuster */}
        <div className="p-4 rounded-lg bg-zinc-50 border border-zinc-200 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-zinc-800">Calibrated Scale Reading:</span>
            <span className="font-bold text-zinc-900 text-sm">{verifiedWeight} kg</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="40"
            step="0.1"
            value={verifiedWeight}
            onChange={(e) => handleWeightChange(parseFloat(e.target.value))}
            className="w-full accent-emerald-700 bg-zinc-200 h-2 rounded cursor-pointer"
          />
          <p className="text-[11px] text-zinc-500">
            Certified Bluetooth Scale Model #CS-200, calibrated per Legal Metrology Act standards.
          </p>
        </div>

        {/* Condition Check */}
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-zinc-800">Material Segregation:</span>
          <div className="flex space-x-1.5">
            {(['Clean', 'Sorted', 'Mixed'] as const).map((cond) => (
              <button
                key={cond}
                type="button"
                onClick={() => setCondition(cond)}
                className={`px-2.5 py-1 rounded text-xs font-medium border transition-colors ${
                  condition === cond
                    ? 'bg-emerald-700 text-white border-emerald-700'
                    : 'bg-white text-zinc-700 border-zinc-200 hover:bg-zinc-50'
                }`}
              >
                {cond}
              </button>
            ))}
          </div>
        </div>

        {/* Payout Callout */}
        <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-between">
          <div>
            <span className="text-xs text-emerald-900 font-semibold">Instant UPI Credit</span>
            <p className="text-2xl font-bold text-emerald-950">₹{finalAmount}</p>
          </div>
          <div className="text-right text-xs text-emerald-800 font-medium">
            <span>+50 Eco Points</span>
            <p className="text-[11px] text-zinc-500 font-normal">Transferred to Bank Account</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-semibold text-zinc-600 hover:text-zinc-900"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleConfirm}
            disabled={submitting}
            className="px-5 py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-xs transition-colors flex items-center space-x-2"
          >
            <span>{submitting ? 'Processing Payout...' : 'Confirm Weight & Receive Payout'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
