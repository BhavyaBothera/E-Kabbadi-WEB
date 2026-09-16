import React, { useState } from 'react';
import { 
  Award, 
  Leaf, 
  Sparkles, 
  Gift, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Check
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { USER_BADGES } from '../../data/mockData';

export const UserRewardsPage: React.FC = () => {
  const { user } = useAuth();
  const [redeemedVouchers, setRedeemedVouchers] = useState<Record<string, boolean>>({});

  const points = user?.ecoPoints || 840;
  const nextTarget = 1000;
  const progressPercent = Math.min(100, Math.round((points / nextTarget) * 100));

  const rewards = [
    {
      id: 'rw-1',
      title: '₹50 Green Utility Bill Rebate',
      vendor: 'JVVNL Neemrana Power Discom',
      points: 400,
      badge: 'Electricity Credit',
      desc: 'Applied directly to your next electricity or municipal water bill.'
    },
    {
      id: 'rw-2',
      title: '25% Off Certified Organic Compost',
      vendor: 'RIICO Agri Circular Hub',
      points: 300,
      badge: 'Bio-Fertilizer',
      desc: 'Enriched soil conditioner derived from urban biodegradable streams.'
    },
    {
      id: 'rw-3',
      title: '₹100 Amazon Gift Voucher',
      vendor: 'Eco Retail Store',
      points: 750,
      badge: 'Gift Card',
      desc: 'Instant voucher code redeemable for household sustainable goods.'
    },
    {
      id: 'rw-4',
      title: 'Free 2-Hour EV Charging Coupon',
      vendor: 'Neemrana Mobility Grid',
      points: 600,
      badge: 'Clean Transit',
      desc: 'Valid at any RIICO Sector 4 public EV charging station.'
    }
  ];

  const handleRedeem = (id: string, cost: number) => {
    if (points >= cost) {
      setRedeemedVouchers(prev => ({ ...prev, [id]: true }));
    } else {
      alert('You need more Eco Points to unlock this voucher!');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Top Banner */}
      <div className="p-6 sm:p-7 rounded-xl bg-white border border-zinc-200 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-2">
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded text-[11px] font-semibold bg-amber-50 text-amber-900 border border-amber-200">
              <Award className="w-3.5 h-3.5 text-amber-700" />
              <span>Community Impact Ledger</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900">
              Your Eco Points & Rewards
            </h1>
            <p className="text-xs sm:text-sm text-zinc-600">
              Every kilogram of scrap collected earns verifiable Eco Points redeemable for power bill rebates, organic compost, and local vouchers.
            </p>

            {/* Progress to next tier */}
            <div className="pt-2 space-y-1.5 max-w-md">
              <div className="flex justify-between text-xs text-zinc-600">
                <span>Tier: Silver Recycler</span>
                <span className="font-semibold text-zinc-900">{points} / {nextTarget} pts (Gold Tier)</span>
              </div>
              <div className="w-full bg-zinc-100 rounded-full h-2 overflow-hidden border border-zinc-200">
                <div 
                  className="bg-emerald-700 h-full rounded-full transition-all duration-500" 
                  style={{ width: `${progressPercent}%` }} 
                />
              </div>
            </div>
          </div>

          <div className="md:col-span-4 p-5 rounded-lg bg-zinc-50 border border-zinc-200 text-center space-y-1">
            <span className="text-xs text-zinc-500 uppercase font-semibold">
              Available Balance
            </span>
            <div className="flex items-center justify-center space-x-1.5 pt-1">
              <Award className="w-7 h-7 text-amber-600" />
              <span className="text-3xl sm:text-4xl font-black text-zinc-900">
                {points}
              </span>
              <span className="text-xs font-bold text-zinc-500">PTS</span>
            </div>
            <p className="text-[11px] text-emerald-800 font-medium pt-1">
              Equivalent to ₹84 instant value
            </p>
          </div>
        </div>
      </div>

      {/* Rewards Grid */}
      <div className="space-y-3">
        <h2 className="text-base font-bold text-zinc-900">
          Redeemable Vouchers & Rebates
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {rewards.map((rw) => {
            const isRedeemed = redeemedVouchers[rw.id];
            const canAfford = points >= rw.points;

            return (
              <div
                key={rw.id}
                className="p-5 rounded-xl bg-white border border-zinc-200 hover:border-zinc-300 shadow-xs flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded">
                      {rw.badge}
                    </span>
                    <span className="text-sm font-bold text-amber-800 flex items-center space-x-1">
                      <Award className="w-4 h-4 text-amber-600" />
                      <span>{rw.points} pts</span>
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-zinc-900 mt-2.5">
                    {rw.title}
                  </h3>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Partner: {rw.vendor}
                  </p>
                  <p className="text-xs text-zinc-600 mt-2 leading-relaxed">
                    {rw.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-100 flex items-center justify-between">
                  {isRedeemed ? (
                    <div className="flex items-center space-x-1.5 text-xs text-emerald-800 font-semibold">
                      <Check className="w-4 h-4" />
                      <span>Voucher Code: EK-{rw.id.toUpperCase()}-772</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleRedeem(rw.id, rw.points)}
                      disabled={!canAfford}
                      className={`py-2 px-4 rounded-lg text-xs font-semibold transition-colors flex items-center space-x-1.5 ${
                        canAfford
                          ? 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs'
                          : 'bg-zinc-100 text-zinc-400 cursor-not-allowed'
                      }`}
                    >
                      <Gift className="w-3.5 h-3.5" />
                      <span>{canAfford ? 'Redeem Voucher' : 'Not Enough Points'}</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Badges Section */}
      <div className="space-y-3">
        <h2 className="text-base font-bold text-zinc-900">
          Environmental Badges & Milestones
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {USER_BADGES.map((b) => (
            <div
              key={b.id}
              className={`p-4 rounded-xl border text-center space-y-2 ${
                b.unlocked
                  ? 'bg-white border-zinc-200 shadow-xs'
                  : 'bg-zinc-50 border-zinc-200 opacity-60'
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-800 mx-auto flex items-center justify-center">
                <Leaf className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-zinc-900">{b.name}</h4>
                <p className="text-[11px] text-zinc-500 mt-0.5 line-clamp-2">{b.description}</p>
              </div>
              <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${
                b.unlocked ? 'bg-emerald-50 text-emerald-800' : 'bg-zinc-200 text-zinc-600'
              }`}>
                {b.unlocked ? 'Unlocked' : 'In Progress'}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
