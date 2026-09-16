import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  PlusCircle, 
  Package, 
  Flame, 
  User, 
  Truck, 
  Navigation, 
  Wallet, 
  Clock 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const BottomNav: React.FC = () => {
  const { role } = useAuth();

  if (!role) return null;

  if (role === 'USER') {
    const userLinks = [
      { to: '/user/dashboard', label: 'Home', icon: Home },
      { to: '/user/sell', label: 'Sell Scrap', icon: PlusCircle, isSpecial: true },
      { to: '/user/orders', label: 'Pickups', icon: Package },
      { to: '/user/rewards', label: 'Rewards', icon: Flame },
      { to: '/user/profile', label: 'Account', icon: User },
    ];

    return (
      <nav 
        aria-label="Mobile Navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-zinc-200 px-3 py-1.5 shadow-lg"
      >
        <div className="flex items-center justify-around">
          {userLinks.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex flex-col items-center justify-center py-1 px-2 text-[11px] font-medium transition-colors ${
                    item.isSpecial
                      ? 'text-emerald-800 font-bold'
                      : isActive
                      ? 'text-emerald-700 font-semibold'
                      : 'text-zinc-500 hover:text-zinc-900'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className={item.isSpecial ? 'p-2 rounded-full bg-emerald-700 text-white -mt-4 shadow-md' : ''}>
                      <Icon className={item.isSpecial ? 'w-5 h-5' : 'w-4 h-4'} />
                    </div>
                    <span className="mt-1 whitespace-nowrap">{item.label}</span>
                    {isActive && !item.isSpecial && (
                      <span className="w-1 h-1 rounded-full bg-emerald-700 mt-0.5" />
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </div>
      </nav>
    );
  }

  if (role === 'MERCHANT') {
    const merchantLinks = [
      { to: '/merchant/dashboard', label: 'Duty', icon: Home },
      { to: '/merchant/requests', label: 'Pickups', icon: Package },
      { to: '/merchant/navigation', label: 'Route', icon: Navigation, isSpecial: true },
      { to: '/merchant/earnings', label: 'Earnings', icon: Wallet },
      { to: '/merchant/history', label: 'History', icon: Clock },
    ];

    return (
      <nav 
        aria-label="Collector Mobile Navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-zinc-200 px-3 py-1.5 shadow-lg"
      >
        <div className="flex items-center justify-around">
          {merchantLinks.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex flex-col items-center justify-center py-1 px-2 text-[11px] font-medium transition-colors ${
                    item.isSpecial
                      ? 'text-amber-900 font-bold'
                      : isActive
                      ? 'text-amber-800 font-semibold'
                      : 'text-zinc-500 hover:text-zinc-900'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className={item.isSpecial ? 'p-2 rounded-full bg-amber-600 text-white -mt-4 shadow-md' : ''}>
                      <Icon className={item.isSpecial ? 'w-5 h-5' : 'w-4 h-4'} />
                    </div>
                    <span className="mt-1 whitespace-nowrap">{item.label}</span>
                    {isActive && !item.isSpecial && (
                      <span className="w-1 h-1 rounded-full bg-amber-600 mt-0.5" />
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </div>
      </nav>
    );
  }

  return null;
};
