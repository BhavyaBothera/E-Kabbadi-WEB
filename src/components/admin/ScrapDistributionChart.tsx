import React from 'react';
import { SCRAP_ANALYTICS_BREAKDOWN } from '../../data/mockData';
import { IndianRupee, TrendingUp } from 'lucide-react';

export const ScrapDistributionChart: React.FC = () => {
  const totalVolume = SCRAP_ANALYTICS_BREAKDOWN.reduce((acc, item) => acc + item.weightKg, 0);

  return (
    <div className="rounded-xl bg-white border border-zinc-200 p-5 shadow-xs">
      <div className="flex items-center justify-between pb-4 border-b border-zinc-200">
        <div>
          <h3 className="text-sm font-bold text-zinc-900">
            Material Composition & Recovery Yield
          </h3>
          <p className="text-xs text-zinc-500">
            Automated optical sorting and doorstep aggregation streams
          </p>
        </div>
        <div className="flex items-center space-x-1.5 text-xs text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 font-medium">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>+14.8% MoM Recovery</span>
        </div>
      </div>

      {/* Multi-segmented visual bar */}
      <div className="mt-4">
        <div className="flex items-center justify-between text-xs text-zinc-500 mb-2 font-medium">
          <span>Aggregated Volume: <strong className="text-zinc-900">{(totalVolume / 1000).toFixed(1)} MT</strong></span>
          <span className="text-emerald-800 font-semibold">91.9% Closed-Loop Diversion</span>
        </div>

        <div className="w-full h-3 rounded-full overflow-hidden flex bg-zinc-100 border border-zinc-200">
          {SCRAP_ANALYTICS_BREAKDOWN.map((item, idx) => (
            <div
              key={idx}
              className="h-full hover:opacity-85 transition-opacity"
              style={{
                width: `${item.percentage}%`,
                backgroundColor: item.color
              }}
              title={`${item.material}: ${item.weightKg} kg (${item.percentage}%)`}
            />
          ))}
        </div>
      </div>

      {/* Breakdown Items List */}
      <div className="mt-5 space-y-2.5">
        {SCRAP_ANALYTICS_BREAKDOWN.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-3 rounded-lg bg-zinc-50 border border-zinc-200 hover:bg-zinc-100 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <div>
                <h4 className="text-xs font-semibold text-zinc-900">{item.material}</h4>
                <span className="text-[11px] text-zinc-500 font-mono">
                  {(item.weightKg / 1000).toFixed(2)} Metric Tons
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-sm font-bold text-zinc-900">
                {item.percentage}%
              </span>
              <p className="text-[11px] text-emerald-800 font-medium flex items-center justify-end">
                <IndianRupee className="w-3 h-3 mr-0.5" />
                {(item.valueRupees / 1000).toFixed(1)}k
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
