import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, Layers, ShieldCheck, Scale, Truck } from 'lucide-react';
import { BulkScrapEstimator } from '../../components/user/BulkScrapEstimator';

export const BulkUploadPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Navigation Breadcrumb */}
      <div className="flex items-center justify-between">
        <Link
          to="/user/sell"
          className="inline-flex items-center space-x-1.5 text-xs font-semibold text-zinc-600 hover:text-zinc-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Sell Scrap Menu</span>
        </Link>

        <div className="flex items-center space-x-2 text-xs text-zinc-500 hidden sm:flex">
          <ShieldCheck className="w-4 h-4 text-emerald-700" />
          <span>CPCB Registered Clean-Tech Aggregator</span>
        </div>
      </div>

      {/* Main Bulk Scrap Estimator Component */}
      <div className="bg-white rounded-2xl border border-zinc-200 p-5 sm:p-7 shadow-xs">
        <BulkScrapEstimator />
      </div>

      {/* Industrial & Commercial Collection FAQ / Assurance Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 space-y-1.5">
          <div className="flex items-center space-x-2 text-zinc-900 font-bold text-xs">
            <Scale className="w-4 h-4 text-emerald-700" />
            <span>Digital Floor Scales</span>
          </div>
          <p className="text-xs text-zinc-600 leading-relaxed">
            Collectors bring Bluetooth platform load-cells calibrated every 30 days under the Legal Metrology Act.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 space-y-1.5">
          <div className="flex items-center space-x-2 text-zinc-900 font-bold text-xs">
            <Truck className="w-4 h-4 text-emerald-700" />
            <span>High-Capacity Heavy Fleet</span>
          </div>
          <p className="text-xs text-zinc-600 leading-relaxed">
            Electric mini-trucks and hydraulic tail-lift vehicles dispatched automatically for loads over 100 kg.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200 space-y-1.5">
          <div className="flex items-center space-x-2 text-zinc-900 font-bold text-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>Instant Commercial Ledger</span>
          </div>
          <p className="text-xs text-zinc-600 leading-relaxed">
            Direct RTGS / UPI settlement with automated GST e-waste manifest and recycling certificate generation.
          </p>
        </div>
      </div>

    </div>
  );
};
