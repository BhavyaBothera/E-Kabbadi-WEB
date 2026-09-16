import React, { useState } from 'react';
import { 
  ShieldCheck, 
  FileCheck2, 
  Award, 
  Recycle, 
  Building2, 
  CheckCircle2, 
  ArrowRight, 
  Download, 
  BarChart3, 
  Layers,
  Sparkles,
  Send
} from 'lucide-react';

export const EPRCompliancePage: React.FC = () => {
  const [brandName, setBrandName] = useState('');
  const [wasteStream, setWasteStream] = useState('plastic_cat1');
  const [targetTonnage, setTargetTonnage] = useState('100');
  const [contactEmail, setContactEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-zinc-50 min-h-screen text-zinc-900 selection:bg-emerald-100">
      
      {/* Header */}
      <section className="bg-zinc-900 text-white border-b border-zinc-800 py-16 sm:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>CPCB Registered Producer Responsibility Organization (PRO)</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                Extended Producer Responsibility (EPR) Fulfillment
              </h1>

              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed max-w-xl">
                End-to-end statutory compliance for Brand Owners, Importers, and Manufacturers under the Plastic Waste Management & E-Waste Management Rules 2022. Digitally traceable recycling credits with online CPCB portal filing.
              </p>

              <div className="pt-4 grid grid-cols-3 gap-4 border-t border-zinc-800 text-xs text-zinc-400">
                <div>
                  <p className="text-white font-bold text-base font-mono">100% Legal</p>
                  <p className="text-[11px]">CPCB Portal Credited</p>
                </div>
                <div>
                  <p className="text-white font-bold text-base font-mono">Category I-IV</p>
                  <p className="text-[11px]">Rigid & Flexible Polymers</p>
                </div>
                <div>
                  <p className="text-white font-bold text-base font-mono">Form 4 Verified</p>
                  <p className="text-[11px]">E-Waste Destruction Slips</p>
                </div>
              </div>
            </div>

            {/* Right Card */}
            <div className="lg:col-span-5">
              <div className="bg-white text-zinc-900 rounded-2xl p-6 sm:p-7 shadow-2xl border border-zinc-200">
                <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block mb-1">
                  EPR Target Consultation
                </span>
                <h3 className="text-lg font-black text-zinc-950 mb-1">
                  Procure Verified EPR Credits
                </h3>
                <p className="text-xs text-zinc-500 mb-5">
                  Get certified plastic or e-waste recycling credits transferred to your CPCB account.
                </p>

                {submitted ? (
                  <div className="py-8 text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-base text-zinc-900">EPR Dossier Dispatched</h4>
                    <p className="text-xs text-zinc-600 max-w-xs mx-auto">
                      Our Chief Environmental Officer will review {brandName}'s target of {targetTonnage} MT and send verified unit costs and auditor slips to {contactEmail}.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleInquiry} className="space-y-3.5">
                    <div>
                      <label className="text-[11px] font-bold text-zinc-700 block mb-1">
                        Brand / Company Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Consumer Electronics Ltd"
                        value={brandName}
                        onChange={(e) => setBrandName(e.target.value)}
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-bold text-zinc-700 block mb-1">
                          EPR Stream
                        </label>
                        <select
                          value={wasteStream}
                          onChange={(e) => setWasteStream(e.target.value)}
                          className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        >
                          <option value="plastic_cat1">Plastic Cat I (Rigid)</option>
                          <option value="plastic_cat2">Plastic Cat II (Flexible)</option>
                          <option value="plastic_cat3">Plastic Cat III (Multi-layer)</option>
                          <option value="ewaste_it">E-Waste (IT & Telecom)</option>
                          <option value="battery">Battery Waste Rules</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-zinc-700 block mb-1">
                          Target (MT)
                        </label>
                        <input
                          type="number"
                          value={targetTonnage}
                          onChange={(e) => setTargetTonnage(e.target.value)}
                          className="w-full px-3.5 py-2 text-xs rounded-xl border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-zinc-700 block mb-1">
                        Corporate Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="compliance@brand.com"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        className="w-full px-3.5 py-2 text-xs rounded-xl border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center space-x-2 mt-2"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Request EPR Credit Transfer Proposal</span>
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-950">
            Guaranteed Audit-Proof Compliance
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 mt-1">
            We operate fully authorized Material Recovery Facilities (MRFs) with continuous geo-tagged video recording.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-zinc-900 text-base">Direct Portal Credit Transfers</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              We execute online credit transactions on the central CPCB EPR portal directly into your PIBO dashboard with zero intermediary friction.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-zinc-900 text-base">Audited Material Traceability</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Every kilogram is mapped from the doorstep collector to the certified secondary re-pelletizer or smelting plant, preventing dual counting.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-zinc-900 text-base">Annual Return Filing Support</h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Our in-house environmental attorneys and auditors draft your annual EPR return filings, answering any show-cause queries from state pollution boards.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};
