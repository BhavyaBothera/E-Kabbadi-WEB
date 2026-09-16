import React, { useState } from 'react';
import { 
  Building2, 
  Truck, 
  Recycle, 
  Leaf, 
  IndianRupee, 
  Download, 
  ShieldCheck, 
  TrendingUp, 
  FileSpreadsheet,
  CheckCircle2
} from 'lucide-react';
import { SYSTEM_METRICS, RECENT_TRANSACTIONS } from '../../data/mockData';
import { LiveOperationsMap } from '../../components/admin/LiveOperationsMap';
import { ScrapDistributionChart } from '../../components/admin/ScrapDistributionChart';

export const AdminDashboard: React.FC = () => {
  const [exporting, setExporting] = useState(false);
  const [exportedSuccess, setExportedSuccess] = useState(false);

  const handleExportCPCB = () => {
    setExporting(true);
    setTimeout(() => {
      setExporting(false);
      setExportedSuccess(true);
      setTimeout(() => setExportedSuccess(false), 3000);
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
      
      {/* Command Center Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200">
        <div>
          <div className="flex items-center space-x-2 text-xs text-zinc-600 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span className="font-semibold text-emerald-800">Neemrana Smart City Municipal Grid</span>
            <span className="text-zinc-300">•</span>
            <span className="text-zinc-500">ULB-08 Solid Waste Command</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight mt-1">
            Urban Scrap & Circular Logistics Control
          </h1>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleExportCPCB}
            disabled={exporting}
            className="px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-xs flex items-center space-x-2 transition-colors"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>{exporting ? 'Compiling CPCB Form IV...' : 'Export CPCB Audit Log'}</span>
          </button>
        </div>
      </div>

      {exportedSuccess && (
        <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-700" />
          <span>CPCB Form IV Solid Waste Audit Log downloaded successfully for Rajasthan State Pollution Control Board.</span>
        </div>
      )}

      {/* KPI Stats Ribbon */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
        
        {/* KPI 1: Scrap Collected */}
        <div className="p-4 rounded-xl bg-white border border-zinc-200 shadow-xs space-y-1">
          <span className="text-[11px] text-zinc-500 font-semibold uppercase">Total Scrap Diverted</span>
          <div className="flex items-baseline space-x-1">
            <span className="text-2xl sm:text-3xl font-bold text-zinc-900">
              {(SYSTEM_METRICS.scrapCollectedKg / 1000).toFixed(1)}
            </span>
            <span className="text-xs font-semibold text-zinc-500">MT</span>
          </div>
          <span className="text-[11px] text-emerald-800 flex items-center font-medium">
            <TrendingUp className="w-3 h-3 mr-1" /> +18.4% this month
          </span>
        </div>

        {/* KPI 2: Landfill CO2 Prevented */}
        <div className="p-4 rounded-xl bg-white border border-zinc-200 shadow-xs space-y-1">
          <span className="text-[11px] text-zinc-500 font-semibold uppercase">Carbon Avoided</span>
          <div className="flex items-baseline space-x-1">
            <span className="text-2xl sm:text-3xl font-bold text-emerald-800">
              {(SYSTEM_METRICS.co2SavedKg / 1000).toFixed(1)}
            </span>
            <span className="text-xs font-semibold text-emerald-800">MT CO₂</span>
          </div>
          <span className="text-[11px] text-zinc-500">Zero-landfill certified</span>
        </div>

        {/* KPI 3: Active Fleet */}
        <div className="p-4 rounded-xl bg-white border border-zinc-200 shadow-xs space-y-1">
          <span className="text-[11px] text-zinc-500 font-semibold uppercase">Active EV Fleet</span>
          <div className="flex items-baseline space-x-1">
            <span className="text-2xl sm:text-3xl font-bold text-zinc-900">
              {SYSTEM_METRICS.activeCollectors}
            </span>
            <span className="text-xs text-zinc-500">trikes</span>
          </div>
          <span className="text-[11px] text-zinc-500">100% electric cargo</span>
        </div>

        {/* KPI 4: Partner Recyclers */}
        <div className="p-4 rounded-xl bg-white border border-zinc-200 shadow-xs space-y-1">
          <span className="text-[11px] text-zinc-500 font-semibold uppercase">Authorized Recyclers</span>
          <div className="flex items-baseline space-x-1">
            <span className="text-2xl sm:text-3xl font-bold text-zinc-900">
              {SYSTEM_METRICS.partnerRecyclers}
            </span>
            <span className="text-xs text-zinc-500">plants</span>
          </div>
          <span className="text-[11px] text-emerald-800 font-medium">CPCB authorized</span>
        </div>

        {/* KPI 5: Citizen Payouts */}
        <div className="p-4 rounded-xl bg-white border border-zinc-200 shadow-xs space-y-1 col-span-2 lg:col-span-1">
          <span className="text-[11px] text-zinc-500 font-semibold uppercase">Direct UPI Payouts</span>
          <div className="flex items-baseline space-x-1">
            <span className="text-2xl sm:text-3xl font-bold text-zinc-900">
              ₹{(SYSTEM_METRICS.payoutsDistributed / 1000).toFixed(0)}k
            </span>
          </div>
          <span className="text-[11px] text-emerald-800 font-medium">99.8% instant settle</span>
        </div>

      </div>

      {/* Main Grid: GIS Map & Material Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <LiveOperationsMap />
        </div>
        <div className="lg:col-span-4">
          <ScrapDistributionChart />
        </div>
      </div>

      {/* Real-time Doorstep Transactions Audit */}
      <div className="rounded-xl bg-white border border-zinc-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-zinc-200 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-zinc-900">
              Live Municipal Transactions & Weighment Audit
            </h3>
            <p className="text-xs text-zinc-500">
              Legal metrology authenticated records with digital transaction receipts
            </p>
          </div>
          <span className="text-xs text-zinc-500">Auto-refresh active</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-zinc-700">
            <thead className="bg-zinc-50 text-zinc-500 text-[11px] uppercase font-semibold border-b border-zinc-200">
              <tr>
                <th className="px-4 py-3">Order ID</th>
                <th className="px-4 py-3">Collector</th>
                <th className="px-4 py-3">Material Stream</th>
                <th className="px-4 py-3">Scale Weight</th>
                <th className="px-4 py-3">Payout</th>
                <th className="px-4 py-3">Destination Facility</th>
                <th className="px-4 py-3">Time</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {RECENT_TRANSACTIONS.map((tx) => (
                <tr key={tx.id} className="hover:bg-zinc-50/80 transition-colors">
                  <td className="px-4 py-3 font-mono font-semibold text-zinc-900">{tx.id}</td>
                  <td className="px-4 py-3 font-medium text-zinc-900">{tx.collector}</td>
                  <td className="px-4 py-3 text-zinc-600">{tx.material}</td>
                  <td className="px-4 py-3 font-semibold text-zinc-900">{tx.weightKg} kg</td>
                  <td className="px-4 py-3 font-semibold text-emerald-800">₹{tx.amountPaid}</td>
                  <td className="px-4 py-3 text-zinc-500">{tx.recycler}</td>
                  <td className="px-4 py-3 text-zinc-400 font-mono text-[11px]">{tx.timestamp}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      VERIFIED
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
