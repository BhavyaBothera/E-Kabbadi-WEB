import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  IndianRupee, 
  Sparkles, 
  ArrowRight, 
  FileText, 
  Check,
  ShieldCheck,
  Award
} from 'lucide-react';
import { PickupRequest } from '../../types';

interface PaymentSuccessModalProps {
  pickup: PickupRequest;
  amount: number;
  ecoPoints: number;
  transactionId: string;
  onViewJourney: () => void;
  onDone: () => void;
}

export const PaymentSuccessModal: React.FC<PaymentSuccessModalProps> = ({
  pickup,
  amount,
  ecoPoints,
  transactionId,
  onViewJourney,
  onDone
}) => {
  useEffect(() => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#059669', '#10b981', '#34d399', '#f59e0b']
      });
    } catch {
      // Fallback
    }
  }, []);

  const nowString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="w-full max-w-md rounded-xl bg-white border border-zinc-200 shadow-xl p-6 sm:p-7 text-center space-y-5">
        
        {/* Animated Checkmark Circle */}
        <div className="mx-auto w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center">
          <Check className="w-8 h-8 stroke-[2.5]" />
        </div>

        <div>
          <span className="inline-flex items-center text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5 mr-1" />
            UPI Settlement Verified
          </span>
          <h2 className="text-xl font-bold text-zinc-900 mt-2">
            Payment Completed!
          </h2>
          <p className="text-xs text-zinc-500 mt-0.5">
            Credited directly to your registered UPI handle
          </p>
        </div>

        {/* Amount Display */}
        <div className="py-4 px-6 rounded-lg bg-zinc-50 border border-zinc-200 flex flex-col items-center justify-center">
          <div className="flex items-baseline space-x-1 text-3xl sm:text-4xl font-black text-zinc-900">
            <IndianRupee className="w-7 h-7 text-emerald-700" />
            <span>{amount}</span>
          </div>
          <div className="flex items-center space-x-2 text-xs text-zinc-500 mt-2">
            <span className="font-mono font-medium">{transactionId}</span>
            <span>•</span>
            <span>{nowString}</span>
          </div>
        </div>

        {/* Eco Points Reward */}
        <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2">
            <Award className="w-4 h-4 text-amber-700" />
            <span className="font-semibold text-amber-900">+{ecoPoints} Eco Points Earned</span>
          </div>
          <span className="text-[11px] text-amber-800">Added to your ledger</span>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
          <button
            onClick={onViewJourney}
            className="flex-1 py-2.5 px-4 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-xs flex items-center justify-center space-x-1.5 transition-colors"
          >
            <FileText className="w-4 h-4" />
            <span>View Waste Journey</span>
          </button>

          <button
            onClick={onDone}
            className="py-2.5 px-4 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-semibold border border-zinc-300 transition-colors"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
