import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  Truck, 
  Star, 
  ShieldCheck, 
  MapPin, 
  Clock, 
  ArrowRight, 
  CheckCircle2,
  Navigation,
  Phone,
  Check
} from 'lucide-react';
import { usePickup } from '../../context/PickupContext';
import { pickupService } from '../../services/pickupService';

export const CollectorMatchingPage: React.FC = () => {
  const navigate = useNavigate();
  const { activePickup, setActivePickup } = usePickup();

  const [step, setStep] = useState(0);
  const [collectorFound, setCollectorFound] = useState(false);

  const searchStages = [
    'Locating certified collectors in Neemrana Sector 4...',
    'Checking EV trike payload capacity & digital scale calibration...',
    'Assigning shortest route & zero-emission transit...',
    'Confirmed! Dispatching partner...'
  ];

  useEffect(() => {
    const timer1 = setTimeout(() => setStep(1), 1100);
    const timer2 = setTimeout(() => setStep(2), 2200);
    const timer3 = setTimeout(() => setStep(3), 3300);
    const timer4 = setTimeout(() => {
      setCollectorFound(true);
      if (activePickup) {
        pickupService.assignCollector(activePickup.id, {
          id: 'COL-704',
          name: 'Ramesh Kumar',
          rating: 4.8,
          distanceKm: 1.2,
          etaMinutes: 8,
          vehicleType: 'EV Cargo Trike',
          phone: '+91 94140 88219',
          verified: true
        }).then((updated) => {
          if (updated) setActivePickup(updated);
        });
      }
    }, 4200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  const handleTrackCollector = () => {
    if (activePickup) {
      navigate(`/user/pickup/${activePickup.id}/tracking`);
    } else {
      navigate('/user/orders');
    }
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center p-4 sm:p-6 bg-zinc-50">
      <div className="w-full max-w-md rounded-xl bg-white border border-zinc-200 shadow-sm p-6 sm:p-8 text-center space-y-6">
        
        {!collectorFound ? (
          /* Radar / Searching State */
          <div className="space-y-6 py-4">
            
            <div className="relative mx-auto w-28 h-28 flex items-center justify-center">
              <span className="absolute inset-0 rounded-full border border-emerald-500/30 animate-ping" style={{ animationDuration: '2.5s' }} />
              <span className="absolute inset-3 rounded-full border border-emerald-500/40 animate-ping" style={{ animationDuration: '1.8s' }} />

              <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-300 flex items-center justify-center shadow-xs">
                <Truck className="w-7 h-7 text-emerald-700 animate-pulse" />
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-semibold">
                <Sparkles className="w-3 h-3 text-emerald-700" />
                <span>Doorstep Dispatch Engine</span>
              </span>
              <h2 className="text-xl font-bold text-zinc-900 tracking-tight">
                Matching Nearby Collector
              </h2>
              <p className="text-xs text-zinc-600 min-h-[32px]">
                {searchStages[step]}
              </p>
            </div>

            {/* Stepper bar */}
            <div className="flex justify-center space-x-1.5 pt-1">
              {searchStages.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx <= step ? 'w-7 bg-emerald-700' : 'w-2 bg-zinc-200'
                  }`}
                />
              ))}
            </div>

          </div>
        ) : (
          /* Collector Found State Card */
          <div className="space-y-5 animate-in zoom-in-95 duration-300 text-left">
            
            <div className="text-center space-y-1">
              <div className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-semibold border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                <span>Collector Assigned</span>
              </div>
              <h2 className="text-xl font-bold text-zinc-900">
                Ramesh Kumar is En Route!
              </h2>
              <p className="text-xs text-zinc-500">
                Estimated arrival in ~8 minutes
              </p>
            </div>

            {/* Verified Collector Card */}
            <div className="p-4 rounded-lg bg-zinc-50 border border-zinc-200 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center font-bold text-amber-900 text-base">
                    RK
                  </div>
                  <div>
                    <div className="flex items-center space-x-1">
                      <h4 className="text-sm font-bold text-zinc-900">Ramesh Kumar</h4>
                      <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    </div>
                    <p className="text-xs text-zinc-500">EV Cargo Trike • RJ-02-EC-4910</p>
                    <div className="flex items-center space-x-1 text-xs text-amber-700 mt-0.5">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                      <span className="font-bold">4.8</span>
                      <span className="text-zinc-400 font-normal">(184 pickups)</span>
                    </div>
                  </div>
                </div>

                <a
                  href="tel:+919414088219"
                  className="w-9 h-9 rounded-lg bg-white border border-zinc-200 text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 flex items-center justify-center transition-colors shadow-xs"
                  title="Call Collector"
                >
                  <Phone className="w-4 h-4" />
                </a>
              </div>

              {/* Distance & ETA Grid */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-200 text-xs">
                <div className="p-2 rounded bg-white border border-zinc-200">
                  <span className="text-[10px] text-zinc-500 block uppercase font-semibold">Distance</span>
                  <strong className="text-xs text-zinc-900">1.2 km away</strong>
                </div>

                <div className="p-2 rounded bg-white border border-zinc-200">
                  <span className="text-[10px] text-zinc-500 block uppercase font-semibold">OTP Verification</span>
                  <strong className="text-xs text-emerald-800 font-mono">4821</strong>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="text-[11px] text-zinc-500 bg-white p-3 rounded-lg border border-zinc-200 space-y-1">
              <p className="font-semibold text-zinc-800">What happens next?</p>
              <p>Keep your recyclables accessible. Provide the OTP <strong>4821</strong> to Ramesh once weighed on the digital scale.</p>
            </div>

            {/* CTA */}
            <button
              onClick={handleTrackCollector}
              className="w-full py-2.5 px-4 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-xs transition-colors flex items-center justify-center space-x-2"
            >
              <span>Track Collector on Live Map</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>
        )}

      </div>
    </div>
  );
};
