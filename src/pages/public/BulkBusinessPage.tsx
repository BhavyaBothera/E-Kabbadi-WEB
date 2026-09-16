import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, 
  Truck, 
  FileCheck2, 
  Scale, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  IndianRupee, 
  Boxes, 
  Award, 
  PhoneCall, 
  Send,
  Factory,
  Layers,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const BulkBusinessPage: React.FC = () => {
  const navigate = useNavigate();
  const { switchRole } = useAuth();

  const [companyName, setCompanyName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [scrapType, setScrapType] = useState('industrial_metal');
  const [estimatedTonnage, setEstimatedTonnage] = useState('5');
  const [city, setCity] = useState('Neemrana / RIICO Phase II');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitRfq = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleOpenAIEstimator = async () => {
    await switchRole('USER');
    navigate('/user/bulk-upload');
  };

  return (
    <div className="bg-zinc-50 min-h-screen text-zinc-900 selection:bg-emerald-100">
      
      {/* Hero */}
      <section className="bg-zinc-900 text-white border-b border-zinc-800 py-16 lg:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs font-semibold">
                <Factory className="w-3.5 h-3.5 text-emerald-400" />
                <span>Enterprise & Industrial Recycling Solutions</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                Industrial Scrap Offtake & Tonnage Procurement
              </h1>

              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed max-w-xl">
                Reliable scrap disposal for manufacturing facilities, logistics warehouses, and commercial IT parks. Direct weighbridge integration, heavy logistics dispatch, GST invoices, and CPCB Form IV manifests.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleOpenAIEstimator}
                  className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md transition-all flex items-center space-x-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Use Bulk Pile AI Scanner (Upload Photo)</span>
                </button>

                <a
                  href="#rfq-form"
                  className="px-5 py-3.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 text-xs font-semibold transition-colors"
                >
                  Request Industrial Quotation
                </a>
              </div>

              <div className="pt-6 border-t border-zinc-800 grid grid-cols-3 gap-4 text-xs text-zinc-400">
                <div>
                  <p className="text-white font-bold text-base font-mono">15,000+ MT</p>
                  <p className="text-[11px]">Industrial Scrap Diverted</p>
                </div>
                <div>
                  <p className="text-white font-bold text-base font-mono">100% CPCB</p>
                  <p className="text-[11px]">Form IV Compliance</p>
                </div>
                <div>
                  <p className="text-white font-bold text-base font-mono">T+0 Payout</p>
                  <p className="text-[11px]">RTGS / NEFT Clearance</p>
                </div>
              </div>
            </div>

            {/* Right RFQ Form Card */}
            <div id="rfq-form" className="lg:col-span-5">
              <div className="bg-white text-zinc-900 rounded-2xl p-6 sm:p-7 shadow-2xl border border-zinc-200">
                <div className="space-y-1 mb-5">
                  <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
                    B2B Scrap Tender & Quotation
                  </span>
                  <h3 className="text-lg font-black text-zinc-950">
                    Get an Industrial Scrap Quote
                  </h3>
                  <p className="text-xs text-zinc-500">
                    Direct dispatch within 4 hours in Rajasthan-NCR industrial clusters.
                  </p>
                </div>

                {submitted ? (
                  <div className="py-8 text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-base text-zinc-900">RFQ Received Successfully</h4>
                    <p className="text-xs text-zinc-600 max-w-xs mx-auto">
                      Our Industrial Operations Head for {city} will contact {contactPerson} at {phone} within 45 minutes with customized pricing & logistics manifest.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="text-xs text-emerald-700 font-semibold underline"
                    >
                      Submit another inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitRfq} className="space-y-3.5">
                    <div>
                      <label className="text-[11px] font-bold text-zinc-700 block mb-1">
                        Company / Factory Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g., Havells Manufacturing Unit 2"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-bold text-zinc-700 block mb-1">
                          Contact Person *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Store Incharge / Purchase"
                          value={contactPerson}
                          onChange={(e) => setContactPerson(e.target.value)}
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
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full px-3.5 py-2 text-xs rounded-xl border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-bold text-zinc-700 block mb-1">
                          Primary Scrap Stream
                        </label>
                        <select
                          value={scrapType}
                          onChange={(e) => setScrapType(e.target.value)}
                          className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        >
                          <option value="industrial_metal">HMS Iron & Steel Scrap</option>
                          <option value="corrugated_cartons">Baled OCC Cartons</option>
                          <option value="copper_wire">Copper Wire & Turnings</option>
                          <option value="aluminium_section">Aluminium Extrusions</option>
                          <option value="plastic_hdpe">HDPE Drums & Carboys</option>
                          <option value="it_ewaste">Corporate IT E-Waste</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-zinc-700 block mb-1">
                          Estimated Tonnage
                        </label>
                        <select
                          value={estimatedTonnage}
                          onChange={(e) => setEstimatedTonnage(e.target.value)}
                          className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        >
                          <option value="1-3">1 - 3 Metric Tons</option>
                          <option value="5">5 - 10 Metric Tons</option>
                          <option value="15">15 - 25 Metric Tons</option>
                          <option value="50+">50+ Metric Tons (Ongoing Contract)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-zinc-700 block mb-1">
                        Facility Location / Industrial Area
                      </label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="e.g. RIICO Japanese Zone, Neemrana"
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center space-x-2 mt-2"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit RFQ for Instant Tonnage Rate</span>
                    </button>
                  </form>
                )}

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Industrial Capabilities Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-950">
            Why Enterprise Plants Partner with E-KABAADI
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 mt-1">
            End-to-end industrial waste management compliant with State Pollution Control Boards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
              <Scale className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-zinc-900 text-base">Certified Weighbridge Integration</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Weigh gross and tare on certified 60-ton industrial weighbridges with gross-tare slips provided instantly. Zero deviation guarantees with camera recording.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-zinc-900 text-base">CPCB Form IV & EPR Certificates</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Full regulatory chain-of-custody documentation required for annual environmental audits, ISO 14001 certification, and ESG investor reporting.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
              <Truck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-zinc-900 text-base">Heavy Logistics Fleet</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Fleet of 14-feet Canters, 10-ton flatbeds, and hydraulic tippers with professional loading crews equipped with industrial PPE and insurance.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};
