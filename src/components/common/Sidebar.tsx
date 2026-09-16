import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Truck, 
  PackageSearch, 
  CreditCard, 
  BarChart3, 
  Recycle, 
  Leaf, 
  MapPin, 
  Building2, 
  FileText, 
  Settings,
  Radio,
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  type?: 'ADMIN' | 'MERCHANT';
}

export const Sidebar: React.FC<SidebarProps> = ({ type }) => {
  const { role } = useAuth();
  const currentRole = type || (role === 'ADMIN' ? 'ADMIN' : 'MERCHANT');

  if (currentRole === 'ADMIN') {
    const adminNav = [
      { to: '/admin/dashboard', label: 'Command Center', icon: LayoutDashboard },
      { to: '/admin/live-ops', label: 'Live Operations Map', icon: Radio, badge: 'LIVE' },
      { to: '/admin/merchants', label: 'Collector Fleet', icon: Truck },
      { to: '/admin/scrap-analytics', label: 'Scrap Analytics', icon: BarChart3 },
      { to: '/admin/recycling', label: 'Recycling Facilities', icon: Recycle },
      { to: '/admin/impact', label: 'CO₂ & Eco Ledger', icon: Leaf },
      { to: '/admin/users', label: 'Citizen Directory', icon: Users },
      { to: '/admin/reports', label: 'CPCB Compliance', icon: FileText },
    ];

    return (
      <aside className="w-64 bg-white border-r border-zinc-200 h-[calc(100vh-4rem)] sticky top-16 hidden lg:flex flex-col justify-between p-4 select-none">
        <div className="space-y-4">
          <div className="px-3.5 py-2.5 rounded-lg bg-zinc-50 border border-zinc-200 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              <span className="text-xs font-semibold text-zinc-900 tracking-tight">
                Neemrana Urban Ops
              </span>
            </div>
            <span className="text-[10px] text-zinc-500 font-semibold uppercase">RIICO Node</span>
          </div>

          <nav className="space-y-1">
            {adminNav.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/admin/dashboard'}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                      isActive
                        ? 'bg-zinc-900 text-white font-semibold shadow-xs'
                        : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100'
                    }`
                  }
                >
                  <div className="flex items-center space-x-2.5">
                    <Icon className="w-4 h-4 opacity-80" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-100 text-emerald-800">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom System Status */}
        <div className="p-3.5 rounded-lg bg-zinc-50 border border-zinc-200 text-xs text-zinc-600">
          <div className="flex items-center justify-between text-[11px] mb-1.5">
            <span className="text-zinc-700 font-semibold">Fleet IoT Sensor Mesh</span>
            <span className="text-emerald-700 font-semibold">99.8% Active</span>
          </div>
          <div className="w-full bg-zinc-200 rounded-full h-1.5 overflow-hidden">
            <div className="bg-emerald-600 h-full rounded-full w-[94%]" />
          </div>
          <p className="text-[11px] text-zinc-500 mt-2">
            Automated Weighing Scale v3.1 Connected
          </p>
        </div>
      </aside>
    );
  }

  // Merchant sidebar
  const merchantNav = [
    { to: '/merchant/dashboard', label: 'Duty Overview', icon: LayoutDashboard },
    { to: '/merchant/requests', label: 'Nearby Pickups', icon: PackageSearch, badge: '3 NEW' },
    { to: '/merchant/navigation', label: 'Turn-by-Turn Route', icon: MapPin },
    { to: '/merchant/history', label: 'Completed Pickups', icon: Recycle },
    { to: '/merchant/earnings', label: 'Daily Payouts', icon: CreditCard },
  ];

  return (
    <aside className="w-64 bg-white border-r border-zinc-200 h-[calc(100vh-4rem)] sticky top-16 hidden lg:flex flex-col justify-between p-4 select-none">
      <div className="space-y-4">
        <div className="px-3.5 py-2.5 rounded-lg bg-amber-50 border border-amber-200/80 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Truck className="w-4 h-4 text-amber-800" />
            <span className="text-xs font-semibold text-amber-900">
              Collector On Duty
            </span>
          </div>
          <span className="w-2 h-2 rounded-full bg-emerald-600" />
        </div>

        <nav className="space-y-1">
          {merchantNav.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/merchant/dashboard'}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-amber-800 text-white font-semibold shadow-xs'
                      : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100'
                  }`
                }
              >
                <div className="flex items-center space-x-2.5">
                  <Icon className="w-4 h-4 opacity-80" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-100 text-amber-900">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className="p-3.5 rounded-lg bg-zinc-50 border border-zinc-200 text-xs">
        <p className="text-[11px] font-semibold text-zinc-900">Bluetooth Smart Scale</p>
        <p className="text-[11px] text-emerald-700 flex items-center space-x-1.5 mt-1 font-medium">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>EZ-Scale Pro #412 Paired</span>
        </p>
      </div>
    </aside>
  );
};
