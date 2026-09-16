import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Minus, Sparkles, MapPin, ShieldCheck } from 'lucide-react';

interface TickerItem {
  id: string;
  name: string;
  price: number;
  unit: string;
  change: number; // percentage
  trend: 'up' | 'down' | 'neutral';
}

const TICKER_ITEMS: TickerItem[] = [
  { id: 'copper', name: 'Copper Wiring (Grade 1)', price: 580, unit: 'kg', change: 2.4, trend: 'up' },
  { id: 'cardboard', name: 'Fluted OCC Cardboard', price: 16.5, unit: 'kg', change: 1.2, trend: 'up' },
  { id: 'aluminium', name: 'Aluminium Section (6063)', price: 145, unit: 'kg', change: -0.6, trend: 'down' },
  { id: 'pet', name: 'PET Plastic Bottles', price: 28, unit: 'kg', change: 1.8, trend: 'up' },
  { id: 'brass', name: 'Honey Brass Utensils', price: 410, unit: 'kg', change: 0.0, trend: 'neutral' },
  { id: 'steel', name: 'HMS Heavy Steel Scrap', price: 34, unit: 'kg', change: 0.9, trend: 'up' },
  { id: 'ewaste', name: 'Green Motherboards (Class A)', price: 850, unit: 'kg', change: 3.5, trend: 'up' },
  { id: 'iron', name: 'Cast Iron Piping', price: 29, unit: 'kg', change: -0.4, trend: 'down' },
  { id: 'hdpe', name: 'HDPE Crates & Drums', price: 26, unit: 'kg', change: 1.1, trend: 'up' },
  { id: 'newspaper', name: 'Old Newspaper (ONP)', price: 15, unit: 'kg', change: 0.0, trend: 'neutral' }
];

export const MandiTicker: React.FC = () => {
  const [items, setItems] = useState<TickerItem[]>(TICKER_ITEMS);

  // Subtle live price jitter to simulate live mandi trade updates
  useEffect(() => {
    const interval = setInterval(() => {
      setItems((prev) =>
        prev.map((item) => {
          if (Math.random() > 0.7) {
            const jitter = (Math.random() - 0.5) * 0.4;
            const newPrice = Number((item.price + jitter).toFixed(1));
            return {
              ...item,
              price: newPrice,
              change: Number((item.change + jitter * 0.2).toFixed(1)),
              trend: jitter > 0 ? 'up' : jitter < 0 ? 'down' : item.trend
            };
          }
          return item;
        })
      );
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-zinc-900 text-zinc-300 border-b border-zinc-800 text-[11px] py-1.5 px-4 overflow-hidden relative select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left Indicator Pill */}
        <div className="flex items-center space-x-2 flex-shrink-0 z-10 bg-zinc-900 pr-3 border-r border-zinc-800">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-bold text-white uppercase tracking-wider text-[10px]">
            Live Mandi Index
          </span>
          <span className="text-[10px] text-zinc-500 hidden sm:inline">Neemrana-NCR</span>
        </div>

        {/* Scrolling Ticker Strip */}
        <div className="overflow-x-auto no-scrollbar flex items-center space-x-6 mx-4 whitespace-nowrap text-[11px]">
          {items.map((item) => (
            <div key={item.id} className="inline-flex items-center space-x-1.5 flex-shrink-0">
              <span className="text-zinc-400 font-medium">{item.name}:</span>
              <span className="font-bold text-white font-mono">₹{item.price}/{item.unit}</span>
              <span
                className={`inline-flex items-center text-[10px] font-semibold ${
                  item.trend === 'up'
                    ? 'text-emerald-400'
                    : item.trend === 'down'
                    ? 'text-rose-400'
                    : 'text-zinc-400'
                }`}
              >
                {item.trend === 'up' && <TrendingUp className="w-2.5 h-2.5 mr-0.5" />}
                {item.trend === 'down' && <TrendingDown className="w-2.5 h-2.5 mr-0.5" />}
                {item.trend === 'neutral' && <Minus className="w-2.5 h-2.5 mr-0.5" />}
                {item.change > 0 ? `+${item.change}%` : `${item.change}%`}
              </span>
            </div>
          ))}
        </div>

        {/* Right Badge */}
        <div className="hidden md:flex items-center space-x-2 flex-shrink-0 z-10 bg-zinc-900 pl-3 border-l border-zinc-800 text-[10px] text-zinc-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Legal Metrology Calibrated</span>
        </div>

      </div>
    </div>
  );
};
