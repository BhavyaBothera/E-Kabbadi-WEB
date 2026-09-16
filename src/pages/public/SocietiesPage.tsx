import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, 
  Users, 
  Calendar, 
  Award, 
  Truck, 
  IndianRupee, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  PhoneCall,
  Send,
  FileCheck2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const SocietiesPage: React.FC = () => {
  const navigate = useNavigate();
  const { switchRole } = useAuth();

  const [societyName, setSocietyName] = useState('');
  const [flatsCount, setFlatsCount] = useState('250');
  const [contactName, setContactName] = useState('');
  const [mobile, setMobile] = useState('');
  const [preferredDate, setPreferredDate] = useState('This Sunday');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-zinc-50 min-h-screen text-zinc-900 selection:bg-emerald-100">
      
      {/* Hero */}
      <section className="bg-emerald-900 text-white border-b border-emerald-950 py-16 sm:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs font-semibold">
                <Users className="w-3.5 h-3.5 text-emerald-400" />
                <span>RWA & Gated Community Green Drives</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                Organize a Society Weekend Scrap Drive
              </h1>

              <p className="text-emerald-100 text-sm sm:text-base leading-relaxed max-w-xl">
                Turn your apartment complex or gated enclave into a zero-landfill green society. We set up calibrated digital weighing booths at your society clubhouse, buy old newspapers, appliances, and cartons from all residents, and credit cash directly to flat owners or to your RWA Maintenance Fund.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href="#book-drive"
                  className="px-6 py-3.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-emerald-950 font-black text-xs shadow-md transition-all flex items-center space-x-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Schedule Society Drive (This Weekend)</span>
                </a>
              </div>

              <div className="pt-6 border-t border-emerald-800/80 grid grid-cols-3 gap-4 text-xs text-emerald-200">
                <div>
                  <p className="text-white font-bold text-base font-mono">180+ RWAs</p>
                  <p className="text-[11px]">Enrolled across Rajasthan-NCR</p>
                </div>
                <div>
                  <p className="text-white font-bold text-base font-mono">₹4.2 Lakh</p>
                  <p className="text-[11px]">Earned by Society Funds</p>
                </div>
                <div>
                  <p className="text-white font-bold text-base font-mono">Green Society</p>
                  <p className="text-[11px]">CPCB Award Certification</p>
                </div>
              </div>
            </div>

            {/* Right Booking Card */}
            <div id="book-drive" className="lg:col-span-5">
              <div className="bg-white text-zinc-900 rounded-2xl p-6 sm:p-7 shadow-2xl border border-zinc-200">
                <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block mb-1">
                  RWA Partnership Request
                </span>
                <h3 className="text-lg font-black text-zinc-950 mb-1">
                  Book a Society Scrap Camp
                </h3>
                <p className="text-xs text-zinc-500 mb-5">
                  We supply 3 electric collection trikes, 2 digital floor scales, and certified staff.
                </p>

                {submitted ? (
                  <div className="py-8 text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-base text-zinc-900">Society Drive Scheduled!</h4>
                    <p className="text-xs text-zinc-600 max-w-xs mx-auto">
                      Thank you, {contactName}. Our Society Coordinator will call {mobile} to share customized resident WhatsApp announcement banners and logistics plan for {societyName}.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="text-xs text-emerald-700 font-semibold underline"
                    >
                      Book another society
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3.5">
                    <div>
                      <label className="text-[11px] font-bold text-zinc-700 block mb-1">
                        Society / Apartment Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ashiana Greens Phase 1"
                        value={societyName}
                        onChange={(e) => setSocietyName(e.target.value)}
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-bold text-zinc-700 block mb-1">
                          Approx. Flats / Houses
                        </label>
                        <select
                          value={flatsCount}
                          onChange={(e) => setFlatsCount(e.target.value)}
                          className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        >
                          <option value="50-100">50 - 100 Flats</option>
                          <option value="250">100 - 300 Flats</option>
                          <option value="500">300 - 600 Flats</option>
                          <option value="1000+">600+ Large Township</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-zinc-700 block mb-1">
                          Preferred Day
                        </label>
                        <select
                          value={preferredDate}
                          onChange={(e) => setPreferredDate(e.target.value)}
                          className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        >
                          <option value="This Saturday">Upcoming Saturday</option>
                          <option value="This Sunday">Upcoming Sunday</option>
                          <option value="Next Weekend">Next Weekend</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-bold text-zinc-700 block mb-1">
                          RWA Contact Person *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="President / Secretary"
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          className="w-full px-3.5 py-2 text-xs rounded-xl border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-zinc-700 block mb-1">
                          Mobile Number *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 98765 43210"
                          value={mobile}
                          onChange={(e) => setMobile(e.target.value)}
                          className="w-full px-3.5 py-2 text-xs rounded-xl border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center space-x-2 mt-2"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Confirm RWA Booking & Request Banners</span>
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Society Benefits Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-950">
            How Society Scrap Camps Work
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 mt-1">
            Zero effort for RWA committee members. We handle resident communication, weighing booths, and payouts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
              <Calendar className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-zinc-900 text-base">1. Pre-Drive Awareness Kit</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              We send customized digital WhatsApp flyers, notice board posters, and a schedule breakdown so residents have 48 hours to gather storeroom recyclables.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
              <Truck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-zinc-900 text-base">2. Door-to-Door & Clubhouse Booth</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Our uniformed collectors visit tower-by-tower with electric luggage trolleys or set up a centralized digital weighing booth near the main gate.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
              <IndianRupee className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-zinc-900 text-base">3. Individual UPI or RWA Fund</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Residents receive instant UPI payout on their phones, or can choose to donate their scrap value directly into the Society Maintenance or Welfare Fund.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};
