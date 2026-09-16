import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  FileText, 
  ArrowRight, 
  ShieldCheck, 
  IndianRupee, 
  Scale, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { usePickup } from '../../context/PickupContext';
import { pickupService } from '../../services/pickupService';
import { ScrapItem } from '../../types';

export const PickupSchedulePage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { draftItem, setActivePickup } = usePickup();

  const item: ScrapItem = draftItem || {
    category: 'plastic',
    materialName: 'Polyethylene Terephthalate (PET Grade 1)',
    estimatedWeightKg: 4.5,
    estimatedPriceMin: 115,
    estimatedPriceMax: 135,
    confidence: 0.94,
    ratePerKg: 28,
    imageUrl: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=500&auto=format&fit=crop&q=80'
  };

  const [dateOption, setDateOption] = useState<'Today' | 'Tomorrow' | 'Saturday'>('Today');
  const [timeSlot, setTimeSlot] = useState('11:00 AM – 01:00 PM');
  const [address, setAddress] = useState(user?.address || 'Flat 402, Royal Palms, Sector 4');
  const [city, setCity] = useState(user?.city || 'Neemrana');
  const [instructions, setInstructions] = useState('Please buzz intercom #402. Scrap is pre-sorted in boxes.');
  const [submitting, setSubmitting] = useState(false);

  const timeSlots = [
    '09:00 AM – 11:00 AM',
    '11:00 AM – 01:00 PM',
    '02:00 PM – 04:00 PM',
    '04:00 PM – 06:00 PM'
  ];

  const handleConfirmPickup = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const newPickup = await pickupService.createPickup({
      userId: user?.id || 'usr-101',
      userName: user?.name || 'Ananya Sharma',
      userPhone: user?.phone || '+91 98290 14820',
      userAddress: address,
      city: city,
      scrapItems: [item],
      scheduledDate: dateOption,
      scheduledTimeSlot: timeSlot
    });

    setActivePickup(newPickup);
    setSubmitting(false);
    navigate('/user/pickup/matching');
  };

  const estimatedValue = Math.round(item.estimatedWeightKg * (item.ratePerKg || 28));

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      
      {/* Title Header */}
      <div className="border-b border-zinc-200 pb-4 space-y-1">
        <span className="text-[11px] font-semibold text-emerald-800 uppercase tracking-tight">
          Step 3 of 3: Logistics & Address
        </span>
        <h1 className="text-2xl font-bold text-zinc-900">
          Schedule Doorstep Scrap Pickup
        </h1>
        <p className="text-xs sm:text-sm text-zinc-600">
          A background-verified collector with a calibrated digital scale will visit your doorstep.
        </p>
      </div>

      <form onSubmit={handleConfirmPickup} className="space-y-5">
        
        {/* Item Summary Card */}
        <div className="p-4 rounded-xl bg-white border border-zinc-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center space-x-3">
            <img
              src={item.imageUrl}
              alt={item.materialName}
              className="w-12 h-12 rounded-lg object-cover border border-zinc-200"
            />
            <div>
              <h4 className="text-sm font-bold text-zinc-900">{item.materialName}</h4>
              <p className="text-xs text-zinc-500 mt-0.5">
                Approx. {item.estimatedWeightKg} kg • ₹{item.ratePerKg || 28}/kg spot rate
              </p>
            </div>
          </div>

          <div className="bg-zinc-50 px-3.5 py-2 rounded-lg border border-zinc-200 text-left sm:text-right">
            <span className="text-[10px] text-zinc-500 uppercase font-semibold">Estimated Payout</span>
            <p className="text-base font-bold text-emerald-800">
              ₹{estimatedValue}
            </p>
          </div>
        </div>

        {/* 1. Date Selection */}
        <div className="space-y-2 bg-white p-5 rounded-xl border border-zinc-200 shadow-xs">
          <label className="text-xs font-bold text-zinc-800 uppercase tracking-tight flex items-center space-x-1.5">
            <Calendar className="w-3.5 h-3.5 text-zinc-500" />
            <span>Select Pickup Date</span>
          </label>
          <div className="grid grid-cols-3 gap-3">
            {(['Today', 'Tomorrow', 'Saturday'] as const).map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDateOption(d)}
                className={`py-2 px-3 rounded-lg border text-xs font-semibold text-center transition-colors ${
                  dateOption === d
                    ? 'bg-emerald-50 border-emerald-600 text-emerald-900 ring-1 ring-emerald-600'
                    : 'bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Time Slot Selection */}
        <div className="space-y-2 bg-white p-5 rounded-xl border border-zinc-200 shadow-xs">
          <label className="text-xs font-bold text-zinc-800 uppercase tracking-tight flex items-center space-x-1.5">
            <Clock className="w-3.5 h-3.5 text-zinc-500" />
            <span>Select 2-Hour Slot</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {timeSlots.map((slot) => (
              <button
                key={slot}
                type="button"
                onClick={() => setTimeSlot(slot)}
                className={`py-2 px-2.5 rounded-lg border text-xs font-medium text-center transition-colors ${
                  timeSlot === slot
                    ? 'bg-emerald-50 border-emerald-600 text-emerald-900 ring-1 ring-emerald-600 font-semibold'
                    : 'bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50'
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Address & Instructions */}
        <div className="space-y-3 bg-white p-5 rounded-xl border border-zinc-200 shadow-xs">
          <label className="text-xs font-bold text-zinc-800 uppercase tracking-tight flex items-center space-x-1.5">
            <MapPin className="w-3.5 h-3.5 text-zinc-500" />
            <span>Pickup Address & Landmark</span>
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="House / Flat No., Society or Street name"
                className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 bg-white text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                required
              />
            </div>
            <div>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
                className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-300 bg-white text-xs text-zinc-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] text-zinc-500 block mb-1">
              Instructions for collector (optional):
            </label>
            <input
              type="text"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="e.g. Ring doorbell, scrap is in blue bags"
              className="w-full px-3.5 py-2 rounded-lg border border-zinc-300 bg-white text-xs text-zinc-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
          </div>
        </div>

        {/* Assurance Box */}
        <div className="p-3.5 rounded-lg bg-emerald-50/60 border border-emerald-200 flex items-center space-x-2 text-xs text-emerald-900">
          <ShieldCheck className="w-4 h-4 text-emerald-700 flex-shrink-0" />
          <span>Zero doorstep cancellation fees. Pay via UPI only after scrap is weighed.</span>
        </div>

        {/* Submit Actions */}
        <div className="pt-2 flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate('/user/sell')}
            className="text-xs font-semibold text-zinc-600 hover:text-zinc-900"
          >
            ← Back to Material
          </button>

          <button
            type="submit"
            disabled={submitting}
            className="py-2.5 px-6 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-xs flex items-center space-x-2 transition-colors"
          >
            <span>{submitting ? 'Confirming...' : 'Confirm & Dispatch Collector'}</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>

      </form>

    </div>
  );
};
