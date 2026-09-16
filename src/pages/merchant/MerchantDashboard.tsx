import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Truck, 
  IndianRupee, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  Mic, 
  Battery, 
  Scale, 
  ArrowRight, 
  Navigation, 
  Phone, 
  ShieldCheck, 
  Award,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { usePickup } from '../../context/PickupContext';
import { pickupService } from '../../services/pickupService';
import { PickupRequest } from '../../types';
import { VoiceAssistantModal } from '../../components/merchant/VoiceAssistantModal';

export const MerchantDashboard: React.FC = () => {
  const { user } = useAuth();
  const { setActivePickup } = usePickup();
  const navigate = useNavigate();

  const [pickups, setPickups] = useState<PickupRequest[]>([]);
  const [voiceOpen, setVoiceOpen] = useState(false);

  useEffect(() => {
    async function load() {
      const data = await pickupService.getAllPickups();
      setPickups(data);
    }
    load();
  }, []);

  const pendingRequests = pickups.filter(p => p.status === 'MATCHING' || p.status === 'ASSIGNED');
  const activeTrip = pickups.find(p => p.status === 'ON_THE_WAY');

  const handleAcceptPickup = async (pickup: PickupRequest) => {
    const updated = await pickupService.assignCollector(pickup.id, {
      id: user?.id || 'COL-704',
      name: user?.name || 'Ramesh Kumar',
      rating: 4.8,
      distanceKm: 0.9,
      etaMinutes: 6,
      vehicleType: 'EV Cargo Trike',
      phone: user?.phone || '+91 94140 88219',
      verified: true
    });

    if (updated) {
      setActivePickup(updated);
      navigate('/merchant/navigation');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-200">
        <div>
          <div className="flex items-center space-x-2 text-xs text-amber-800 font-semibold">
            <span className="w-2 h-2 rounded-full bg-amber-600" />
            <span>Collector Field Console</span>
            <span className="text-zinc-300">•</span>
            <span className="text-zinc-500 font-normal">Neemrana Ward 4</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight mt-1">
            Namaste, {user?.name.split(' ')[0] || 'Ramesh'}
          </h1>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setVoiceOpen(true)}
            className="px-3.5 py-2 rounded-lg bg-amber-700 hover:bg-amber-800 text-white text-xs font-semibold shadow-xs flex items-center space-x-1.5 transition-colors"
          >
            <Mic className="w-4 h-4" />
            <span>Voice Copilot (Hindi/Eng)</span>
          </button>

          <div className="flex items-center space-x-2 bg-white px-3 py-2 rounded-lg border border-zinc-200 text-xs text-zinc-700 shadow-xs">
            <Battery className="w-4 h-4 text-emerald-700" />
            <span className="font-semibold">EV Battery: 82%</span>
          </div>
        </div>
      </div>

      {/* Active Trip Banner if currently en-route */}
      {activeTrip && (
        <div className="p-5 rounded-xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center flex-shrink-0">
              <Navigation className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[11px] font-bold uppercase text-amber-900">
                  Active Dispatch
                </span>
                <span className="text-zinc-400">•</span>
                <span className="text-xs text-zinc-600">Citizen: <strong>{activeTrip.userName}</strong></span>
              </div>
              <p className="text-sm font-bold text-zinc-900 mt-0.5">
                {activeTrip.userAddress}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2.5">
            <button
              onClick={() => {
                setActivePickup(activeTrip);
                navigate('/merchant/navigation');
              }}
              className="px-4 py-2 rounded-lg bg-amber-700 hover:bg-amber-800 text-white text-xs font-semibold shadow-xs transition-colors flex items-center space-x-1.5"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Resume GPS Navigation</span>
            </button>
          </div>
        </div>
      )}

      {/* Shift Overview Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-4 rounded-xl bg-white border border-zinc-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-zinc-500 text-xs font-medium">
            <span>Today's Weight</span>
            <Scale className="w-4 h-4 text-emerald-700" />
          </div>
          <p className="text-2xl font-bold text-zinc-900 mt-1">
            48.5 <span className="text-xs font-normal text-zinc-500">kg</span>
          </p>
          <span className="text-[11px] text-emerald-800 font-medium">+14 kg from last slot</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-zinc-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-zinc-500 text-xs font-medium">
            <span>Pickups Finished</span>
            <Truck className="w-4 h-4 text-amber-700" />
          </div>
          <p className="text-2xl font-bold text-zinc-900 mt-1">
            6 <span className="text-xs font-normal text-zinc-500">trips</span>
          </p>
          <span className="text-[11px] text-zinc-500">2 pending in Sector 4</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-zinc-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-zinc-500 text-xs font-medium">
            <span>Aggregator Payout</span>
            <IndianRupee className="w-4 h-4 text-emerald-700" />
          </div>
          <p className="text-2xl font-bold text-zinc-900 mt-1">
            ₹1,840
          </p>
          <span className="text-[11px] text-emerald-800 font-medium">Net margin ₹420</span>
        </div>

        <div className="p-4 rounded-xl bg-white border border-zinc-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-zinc-500 text-xs font-medium">
            <span>Partner Rating</span>
            <Award className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-2xl font-bold text-zinc-900 mt-1">
            4.8 <span className="text-xs text-amber-700 font-bold">★</span>
          </p>
          <span className="text-[11px] text-zinc-500">184 total reviews</span>
        </div>

      </div>

      {/* Available Doorstep Pickup Requests */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-zinc-900">Nearby Pickup Requests in Neemrana</h3>
            <p className="text-xs text-zinc-500">Accept requests to reserve navigation and route prioritization</p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded bg-zinc-100 text-zinc-700">
            {pendingRequests.length} pending nearby
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pendingRequests.map((p) => {
            const item = p.scrapItems[0];
            return (
              <div
                key={p.id}
                className="p-5 rounded-xl bg-white border border-zinc-200 hover:border-zinc-300 shadow-xs transition-colors space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-zinc-100 text-zinc-700 font-mono">
                      {p.id}
                    </span>
                    <span className="text-xs text-zinc-500">{p.scheduledTimeSlot}</span>
                  </div>

                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                    ~0.9 km away
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-zinc-900">{p.userName}</h4>
                  <p className="text-xs text-zinc-600 flex items-center space-x-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-zinc-400 flex-shrink-0" />
                    <span>{p.userAddress}</span>
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-zinc-50 border border-zinc-200 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-zinc-500 font-medium">Scrap:</span>
                    <strong className="text-zinc-900 ml-1">{item?.materialName || 'PET Bottles'}</strong>
                  </div>
                  <div>
                    <span className="text-zinc-500 font-medium">Weight:</span>
                    <strong className="text-zinc-900 ml-1">{item?.estimatedWeightKg || 4.5} kg</strong>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <a
                    href={`tel:${p.userPhone}`}
                    className="p-2 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-700 transition-colors"
                    title="Call Citizen"
                  >
                    <Phone className="w-4 h-4" />
                  </a>

                  <button
                    onClick={() => handleAcceptPickup(p)}
                    className="px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-xs flex items-center space-x-1.5 transition-colors"
                  >
                    <span>Accept & Navigate</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Voice Assistant Modal */}
      {voiceOpen && (
        <VoiceAssistantModal onClose={() => setVoiceOpen(false)} />
      )}

    </div>
  );
};
