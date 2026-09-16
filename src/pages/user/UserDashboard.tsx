import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  PlusCircle, 
  Calendar, 
  MapPin, 
  Leaf, 
  Scale, 
  Award, 
  Package, 
  IndianRupee, 
  ArrowRight, 
  TrendingUp, 
  ShieldCheck, 
  Clock, 
  ChevronRight,
  Recycle,
  CheckCircle2,
  Truck,
  FileCheck2,
  Coins
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { usePickup } from '../../context/PickupContext';
import { pickupService } from '../../services/pickupService';
import { PickupRequest } from '../../types';
import { SCRAP_CATEGORIES } from '../../data/mockData';

export const UserDashboard: React.FC = () => {
  const { user } = useAuth();
  const { setActivePickup } = usePickup();
  const navigate = useNavigate();
  const [recentPickups, setRecentPickups] = useState<PickupRequest[]>([]);

  useEffect(() => {
    async function loadData() {
      if (user) {
        const pickups = await pickupService.getUserPickups(user.id);
        setRecentPickups(pickups);
      }
    }
    loadData();
  }, [user]);

  const activeTrackingPickup = recentPickups.find(
    p => p.status === 'ON_THE_WAY' || p.status === 'ASSIGNED' || p.status === 'MATCHING'
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight">
            Welcome back, {user?.name.split(' ')[0] || 'Ananya'}
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 mt-0.5">
            Neemrana Sector 4 • Verified Citizen Account
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            to="/user/sell"
            className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-xs transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Book New Pickup</span>
          </Link>
        </div>
      </div>

      {/* Active Live Tracking Banner if any pickup is active */}
      {activeTrackingPickup && (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center flex-shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[11px] font-bold text-amber-900 uppercase">
                  Pickup In Progress
                </span>
                <span className="text-zinc-400">•</span>
                <span className="text-xs text-zinc-700 font-medium">OTP: <strong className="text-zinc-900 font-mono">4821</strong></span>
              </div>
              <p className="text-sm font-semibold text-zinc-900">
                Collector Ramesh Kumar is on the way (ETA ~8 mins)
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setActivePickup(activeTrackingPickup);
              navigate(`/user/pickup/${activeTrackingPickup.id}/tracking`);
            }}
            className="px-4 py-2 rounded-lg bg-amber-700 hover:bg-amber-800 text-white text-xs font-semibold shadow-xs transition-colors self-start sm:self-auto"
          >
            Open Live Map
          </button>
        </div>
      )}

      {/* Quick Action Card: Sell Scrap Callout */}
      <div className="rounded-xl bg-white border border-zinc-200 p-6 sm:p-7 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-3">
            <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              <span>Doorstep Collection Network Active</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-zinc-900">
              Ready to clear recyclables and get paid?
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 max-w-xl leading-relaxed">
              Upload a snapshot of your cardboard, plastics, or old electronics. Our system calculates spot mandi value, assigns a verified collector with a certified scale, and pays directly via UPI.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                to="/user/sell"
                className="px-5 py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-xs transition-colors flex items-center space-x-2"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Book Pickup</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>

              <Link
                to="/user/bulk-upload"
                className="px-4 py-2.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-950 border border-emerald-300 text-xs font-semibold transition-colors flex items-center space-x-2"
              >
                <Sparkles className="w-4 h-4 text-emerald-700" />
                <span>Bulk Pile AI Estimator</span>
                <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-200 text-emerald-900">
                  Heavy/Mixed
                </span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-4 bg-zinc-50 rounded-lg p-4 border border-zinc-200 space-y-3">
            <div className="flex items-center space-x-2 text-zinc-800 text-xs font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Guaranteed Standards</span>
            </div>
            <ul className="text-xs text-zinc-600 space-y-2">
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 mt-0.5 flex-shrink-0" />
                <span>Calibrated digital scales with tare deduction</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 mt-0.5 flex-shrink-0" />
                <span>Direct UPI deposit before collector leaves</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 mt-0.5 flex-shrink-0" />
                <span>Digital CPCB recycling certificate generated</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Environmental & Financial Metrics Grid */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-tight text-zinc-600">
            Citizen Ledger & Environmental Offset
          </h3>
          <Link to="/user/rewards" className="text-xs text-emerald-700 hover:text-emerald-800 font-semibold flex items-center">
            <span>Redeem Rewards</span>
            <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Total Scrap Recycled */}
          <div className="p-4 rounded-xl bg-white border border-zinc-200 shadow-xs space-y-1.5">
            <div className="flex items-center justify-between text-zinc-500 text-xs">
              <span className="font-medium">Total Recycled</span>
              <Scale className="w-4 h-4 text-emerald-700" />
            </div>
            <div className="flex items-baseline space-x-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-zinc-900">
                {user?.totalKgRecycled || 12.5}
              </span>
              <span className="text-xs font-semibold text-zinc-500">kg</span>
            </div>
            <p className="text-[11px] text-emerald-700 font-medium">
              +2.4 kg this month
            </p>
          </div>

          {/* Card 2: Carbon Diverted */}
          <div className="p-4 rounded-xl bg-white border border-zinc-200 shadow-xs space-y-1.5">
            <div className="flex items-center justify-between text-zinc-500 text-xs">
              <span className="font-medium">CO₂ Diverted</span>
              <Leaf className="w-4 h-4 text-emerald-700" />
            </div>
            <div className="flex items-baseline space-x-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-zinc-900">
                {user?.co2SavedKg || 23.4}
              </span>
              <span className="text-xs font-semibold text-zinc-500">kg</span>
            </div>
            <p className="text-[11px] text-zinc-500">
              Equiv. to 1.2 trees planted
            </p>
          </div>

          {/* Card 3: Eco Points */}
          <div className="p-4 rounded-xl bg-white border border-zinc-200 shadow-xs space-y-1.5">
            <div className="flex items-center justify-between text-zinc-500 text-xs">
              <span className="font-medium">Eco Points</span>
              <Award className="w-4 h-4 text-amber-600" />
            </div>
            <div className="flex items-baseline space-x-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-zinc-900">
                {user?.ecoPoints || 840}
              </span>
              <span className="text-xs font-semibold text-zinc-500">pts</span>
            </div>
            <p className="text-[11px] text-amber-700 font-medium">
              ₹84 voucher ready to redeem
            </p>
          </div>

          {/* Card 4: Pickups Completed */}
          <div className="p-4 rounded-xl bg-white border border-zinc-200 shadow-xs space-y-1.5">
            <div className="flex items-center justify-between text-zinc-500 text-xs">
              <span className="font-medium">Completed Trips</span>
              <Package className="w-4 h-4 text-zinc-500" />
            </div>
            <div className="flex items-baseline space-x-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-zinc-900">
                {recentPickups.length > 0 ? recentPickups.length : 4}
              </span>
              <span className="text-xs font-semibold text-zinc-500">pickups</span>
            </div>
            <p className="text-[11px] text-zinc-500">
              100% On-time doorstep pickup
            </p>
          </div>

        </div>
      </div>

      {/* Live Mandi Rate Card Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-zinc-900">Today's Scrap Rate Card</h3>
            <p className="text-xs text-zinc-500">Updated hourly from Neemrana Mandi benchmark</p>
          </div>
          <Link to="/user/sell" className="text-xs text-emerald-700 hover:text-emerald-800 font-semibold flex items-center">
            <span>Sell Any Scrap</span>
            <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {SCRAP_CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to="/user/sell"
              className="p-3.5 rounded-lg bg-white border border-zinc-200 hover:border-emerald-600 hover:shadow-xs transition-all text-left group"
            >
              <p className="text-xs font-semibold text-zinc-800 truncate group-hover:text-emerald-800">
                {cat.name}
              </p>
              <p className="text-base font-bold text-emerald-800 mt-1">
                ₹{cat.avgPricePerKg}
                <span className="text-[10px] text-zinc-500 font-normal"> / {cat.unit}</span>
              </p>
              <p className="text-[10px] text-zinc-500 mt-1 line-clamp-1">
                {cat.examples[0]}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Orders & Scrap Journey */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-zinc-900">Recent Pickups & Waste Journey</h3>
            <p className="text-xs text-zinc-500">Track weighing slips, UPI payouts, and recycling status</p>
          </div>
          <Link to="/user/orders" className="text-xs text-emerald-700 hover:text-emerald-800 font-semibold flex items-center">
            <span>View All Pickups</span>
            <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recentPickups.map((p) => {
            const firstItem = p.scrapItems[0];
            return (
              <div
                key={p.id}
                className="p-5 rounded-xl bg-white border border-zinc-200 hover:border-zinc-300 shadow-xs transition-colors space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-zinc-100 text-zinc-700 font-mono">
                      {p.id}
                    </span>
                    <span className="text-xs text-zinc-500">{p.scheduledDate}</span>
                  </div>

                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                    p.status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' :
                    p.status === 'ON_THE_WAY' ? 'bg-amber-50 text-amber-900 border border-amber-200' :
                    'bg-zinc-100 text-zinc-800 border border-zinc-200'
                  }`}>
                    {p.status.replace(/_/g, ' ')}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div>
                    <h4 className="text-sm font-bold text-zinc-900">
                      {firstItem?.materialName || 'Polymer Packaging'}
                    </h4>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      Collector: {p.collector?.name || 'Ramesh Kumar'} • {firstItem?.actualWeightKg || firstItem?.estimatedWeightKg || 12.0} kg
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-base font-bold text-zinc-900 flex items-center justify-end">
                      <IndianRupee className="w-4 h-4 text-emerald-700" />
                      <span>{p.finalAmount || 450}</span>
                    </span>
                    <span className="text-[11px] text-amber-700 font-semibold">
                      +{p.ecoPointsAwarded || 50} pts
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-zinc-100 flex items-center justify-between text-xs">
                  <span className="text-zinc-600 flex items-center">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 mr-1.5" />
                    EcoGreen Circular Hub
                  </span>
                  
                  <Link
                    to={`/user/orders/${p.id}`}
                    className="text-emerald-700 hover:text-emerald-800 font-semibold flex items-center space-x-1"
                  >
                    <span>View Traceability</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
