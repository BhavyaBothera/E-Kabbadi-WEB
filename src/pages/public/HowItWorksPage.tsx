import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Truck, 
  Scale, 
  IndianRupee, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  FileCheck2, 
  QrCode, 
  PhoneCall, 
  Clock, 
  Smartphone,
  Recycle,
  Building2,
  Award
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const HowItWorksPage: React.FC = () => {
  const navigate = useNavigate();
  const { switchRole } = useAuth();

  const handleStartBooking = async () => {
    await switchRole('USER');
    navigate('/user/sell');
  };

  return (
    <div className="bg-zinc-50 min-h-screen text-zinc-900 selection:bg-emerald-100">
      
      {/* Header Banner */}
      <section className="bg-white border-b border-zinc-200 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>100% Calibrated & Transparent Recycling Process</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-zinc-950 tracking-tight leading-tight">
              How Doorstep Scrap Collection Works
            </h1>
            <p className="text-base text-zinc-600 leading-relaxed">
              No haggling, no manipulated mechanical spring balances, and no delayed cash. Here is the step-by-step journey of your recyclables from your doorstep to authorized secondary mills.
            </p>
          </div>
        </div>
      </section>

      {/* 4 Deep Dive Steps */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        
        {/* Step 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-lg bg-zinc-100 text-zinc-700 text-xs font-mono font-bold">
              <span>STEP 01</span>
              <span>•</span>
              <span className="text-emerald-800">30-SECOND BOOKING</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-950">
              Schedule Your Free Pickup Slot
            </h2>
            <p className="text-sm text-zinc-600 leading-relaxed">
              Choose the scrap categories you have at home or office (old newspapers, delivery cartons, plastic bottles, iron grills, old ACs, or computer parts). Pick your preferred date and 2-hour doorstep arrival slot.
            </p>
            <ul className="space-y-2 text-xs text-zinc-700">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                <span>Zero pickup fees or hidden handling charges</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                <span>Optional photo upload for bulk scrap pile AI appraisal</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                <span>Immediate WhatsApp & SMS confirmation with booking token</span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-2xl overflow-hidden border border-zinc-200 shadow-sm bg-white aspect-[4/3] relative">
              <img
                src="https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=800&auto=format&fit=crop&q=80"
                alt="Smartphone booking doorstep scrap pickup"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-xs p-3.5 rounded-xl border border-zinc-200/80 shadow-md text-xs flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase font-semibold">Slot Confirmed</span>
                  <p className="font-bold text-zinc-900">Today, 02:00 PM - 04:00 PM</p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200">
                  Instant Dispatch
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="rounded-2xl overflow-hidden border border-zinc-200 shadow-sm bg-white aspect-[4/3] relative">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80"
                alt="Verified uniform collector with electric cargo vehicle"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-xs p-3.5 rounded-xl border border-zinc-200/80 shadow-md text-xs flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-xs">
                    RK
                  </div>
                  <div>
                    <p className="font-bold text-zinc-900">Ramesh Kumar (Collector)</p>
                    <p className="text-[10px] text-zinc-500">Police Verified • EV Trike RJ-32-EA-4412</p>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-1 rounded">
                  OTP: 4892
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-lg bg-zinc-100 text-zinc-700 text-xs font-mono font-bold">
              <span>STEP 02</span>
              <span>•</span>
              <span className="text-emerald-800">FLEET DISPATCH</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-950">
              Verified Collector Arrives with EV Fleet
            </h2>
            <p className="text-sm text-zinc-600 leading-relaxed">
              A background-checked, trained collector in uniform is assigned to your neighborhood. Track their live GPS route on your screen with live ETA and share a one-time security OTP before they enter your premises.
            </p>
            <ul className="space-y-2 text-xs text-zinc-700">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                <span>100% Zero-emission electric cargo trikes</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                <span>Official government ID and police verification badge</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                <span>Collector handles all lifting, sorting, and bagging</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Step 3 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-lg bg-zinc-100 text-zinc-700 text-xs font-mono font-bold">
              <span>STEP 03</span>
              <span>•</span>
              <span className="text-emerald-800">PRECISION WEIGHING</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-950">
              Legal Metrology Certified Bluetooth Scale
            </h2>
            <p className="text-sm text-zinc-600 leading-relaxed">
              Traditional street scrap dealers often use rigged manual spring balances with 15%–30% weight manipulation. We use calibrated digital floor scales certified by the Department of Consumer Affairs (Weights & Measures).
            </p>
            <ul className="space-y-2 text-xs text-zinc-700">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                <span>True 0.00 kg zero tare verified in front of you</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                <span>Live weight broadcasts via Bluetooth straight to your smartphone screen</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                <span>Accurate to 50 grams with government stamped seal</span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-2xl overflow-hidden border border-zinc-200 shadow-sm bg-white aspect-[4/3] relative">
              <img
                src="https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=800&auto=format&fit=crop&q=80"
                alt="Electronic digital weighing scale scrap sorting"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-zinc-900 text-white p-3.5 rounded-xl border border-zinc-700 shadow-md text-xs flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-zinc-400 uppercase font-semibold">Live Bluetooth Scale</span>
                  <p className="font-extrabold text-emerald-400 font-mono text-base">24.85 KG (OCC Box)</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-zinc-400">Total Scrap Value</span>
                  <p className="font-bold text-white text-sm">₹422.45</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Step 4 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="rounded-2xl overflow-hidden border border-zinc-200 shadow-sm bg-white aspect-[4/3] relative">
              <img
                src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&auto=format&fit=crop&q=80"
                alt="Instant UPI payment notification phone screenshot"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-xs p-3.5 rounded-xl border border-zinc-200/80 shadow-md text-xs flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase font-semibold">UPI Transaction Successful</span>
                  <p className="font-bold text-emerald-800 text-sm">₹840.00 Received from E-KABAADI</p>
                </div>
                <span className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-900 font-bold text-[10px]">
                  12 SECONDS
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-lg bg-zinc-100 text-zinc-700 text-xs font-mono font-bold">
              <span>STEP 04</span>
              <span>•</span>
              <span className="text-emerald-800">INSTANT UPI TRANSFER</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-950">
              15-Second Direct Payout & Green Certificate
            </h2>
            <p className="text-sm text-zinc-600 leading-relaxed">
              Once weights are locked on the digital scale, our payment gateway triggers an instant direct UPI transfer (Google Pay, PhonePe, Paytm, or BHIM) to your VPA. The money lands in your bank before our collector steps out of your gate.
            </p>
            <ul className="space-y-2 text-xs text-zinc-700">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                <span>Instant bank account settlement with zero deduction</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                <span>Cash payment option available upon request</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                <span>Digital CPCB Green Impact Certificate sent to your WhatsApp</span>
              </li>
            </ul>
          </div>
        </div>

      </section>

      {/* CTA Box */}
      <section className="bg-white border-t border-zinc-200 py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h3 className="text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight">
            Ready to clean your storeroom and earn instant cash?
          </h3>
          <p className="text-sm text-zinc-600 max-w-xl mx-auto">
            Book your free doorstep pickup in 30 seconds. No minimum charge, certified weights, and friendly service.
          </p>
          <div className="flex justify-center gap-3">
            <button
              type="button"
              onClick={handleStartBooking}
              className="px-6 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md transition-all flex items-center space-x-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Book Doorstep Pickup Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
