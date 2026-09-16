import React from 'react';
import { 
  Recycle, 
  ShieldCheck, 
  Heart, 
  Users, 
  Award, 
  CheckCircle2, 
  Scale, 
  Leaf, 
  Building2,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-zinc-50 min-h-screen text-zinc-900 selection:bg-emerald-100">
      
      {/* Hero Header */}
      <section className="bg-white border-b border-zinc-200 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
              <Recycle className="w-3.5 h-3.5 text-emerald-700" />
              <span>Dignity, Fair Weights & Zero Waste to Landfill</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-zinc-950 tracking-tight leading-tight">
              Organizing India's Informal Recycling Economy
            </h1>
            <p className="text-base text-zinc-600 leading-relaxed">
              India generates over 62 million metric tons of waste annually. Behind this lies a shadow workforce of 5 million informal waste pickers and local kabadiwalas who single-handedly divert 70% of dry recyclables from our landfills, yet endure social stigma, rigged weight balances, and predatory middleman pricing.
            </p>
          </div>
        </div>
      </section>

      {/* The Story & Three Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
              Our Founding Purpose
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-950">
              Transforming the Traditional Kabadiwala into a Tech-Enabled Green Logistics Partner
            </h2>
            <p className="text-sm text-zinc-600 leading-relaxed">
              E-KABAADI was founded in Rajasthan's Neemrana industrial corridor to bridge the trust gap between citizens, collectors, and recyclers. By outfitting local collectors with zero-emission electric cargo trikes, government-calibrated digital Bluetooth scales, and instant UPI payouts, we eliminate weight fraud and ensure fair earnings for both households and field workers.
            </p>
            <p className="text-sm text-zinc-600 leading-relaxed">
              Instead of scrap bouncing through 4 layers of informal middlemen, scrap collected on our platform is routed straight to verified secondary smelters, paper mills, and CPCB-authorized e-waste dismantling facilities.
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-2xl overflow-hidden border border-zinc-200 shadow-md aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1590069261209-f8e9b8642343?w=800&auto=format&fit=crop&q=80"
                alt="Recycling plant and formal scrap worker"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* 3 Core Commitments */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
              <Scale className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-zinc-900 text-base">1. Legal Metrology Accuracy</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Every digital hanging and floor scale carried by our fleet is stamped and certified under the Legal Metrology Act, 2009. We guarantee absolute zero tare weights before placing any scrap.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-zinc-900 text-base">2. Collector Dignity & Security</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Our partner collectors receive standardized uniforms, safety equipment, health insurance, banking integration, and earn up to 40% higher daily wages than traditional street hawking.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
              <Leaf className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-zinc-900 text-base">3. 100% Circular Offtake</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Not a single scrap item gathered on E-KABAADI ends up in municipal dump yards or water bodies. We partner exclusively with registered recyclers holding valid CPCB Consent-to-Operate (CTO).
            </p>
          </div>
        </div>

      </section>

      {/* Numbers that Matter */}
      <section className="bg-zinc-900 text-white py-16 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono">45,000+</p>
              <p className="text-xs text-zinc-400 mt-1">Households Served</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-black text-white font-mono">15,800 MT</p>
              <p className="text-xs text-zinc-400 mt-1">Recyclables Diverted</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono">1,400+</p>
              <p className="text-xs text-zinc-400 mt-1">Formalized Collectors</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-black text-white font-mono">₹4.8 Cr+</p>
              <p className="text-xs text-zinc-400 mt-1">Transferred via UPI</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-white border-t border-zinc-200 text-center">
        <div className="max-w-3xl mx-auto px-4 space-y-4">
          <h3 className="text-2xl font-bold text-zinc-950">
            Join the Cleanest Recycling Network in Rajasthan & NCR
          </h3>
          <p className="text-xs sm:text-sm text-zinc-600">
            Whether you want to sell 10 kg of old books or 50 tons of industrial rebar, we're ready.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <Link
              to="/user/sell"
              className="px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs transition-colors"
            >
              Book Doorstep Pickup
            </Link>
            <Link
              to="/rates"
              className="px-6 py-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-bold text-xs transition-colors"
            >
              View Today's Scrap Rates
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
