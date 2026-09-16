import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Recycle, 
  Sparkles, 
  Bell, 
  User, 
  LogOut, 
  ChevronDown, 
  ShieldCheck, 
  Truck, 
  MapPin, 
  Flame, 
  CheckCircle2, 
  X,
  Menu,
  Building2,
  Users,
  Scale,
  FileCheck2,
  ArrowRight,
  PhoneCall
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';

export const Navbar: React.FC = () => {
  const { user, role, logout, switchRole } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [businessDropdownOpen, setBusinessDropdownOpen] = useState(false);
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState('Neemrana / Alwar');
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const notifications = [
    {
      id: 'n1',
      title: 'Scrap Processed & Verified',
      desc: 'Your 21.6 kg paper scrap completed CPCB-certified recycling.',
      time: '12m ago'
    },
    {
      id: 'n2',
      title: '50 Eco-Points Credited',
      desc: 'Rewarded for clean sorting and verified PET plastic handoff.',
      time: '2h ago'
    }
  ];

  const handleRoleChange = async (newRole: UserRole) => {
    setProfileDropdownOpen(false);
    setMobileMenuOpen(false);
    await switchRole(newRole);
    if (newRole === 'USER') navigate('/user/dashboard');
    if (newRole === 'MERCHANT') navigate('/merchant/dashboard');
    if (newRole === 'ADMIN') navigate('/admin/dashboard');
  };

  const handleLogout = async () => {
    setProfileDropdownOpen(false);
    setMobileMenuOpen(false);
    await logout();
    navigate('/auth/login');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200/90 bg-white/95 backdrop-blur-md">
      
      {/* Top micro announcement bar */}
      <div className="bg-zinc-900 text-zinc-300 text-[11px] py-1.5 px-4 hidden sm:block border-b border-zinc-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1.5 text-emerald-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Doorstep Pickup Active in Rajasthan-NCR Corridor</span>
            </span>
            <span className="text-zinc-600">|</span>
            <span className="text-zinc-400">Zero Tare Fraud Guaranteed with Bluetooth Scales</span>
          </div>

          <div className="flex items-center space-x-4 text-zinc-400">
            <Link to="/rates" className="hover:text-emerald-400 transition-colors">
              Today's Mandi Benchmark: OCC Cartons ₹17/kg • Copper ₹585/kg
            </Link>
            <span className="text-zinc-600">|</span>
            <span className="flex items-center space-x-1 text-zinc-300">
              <PhoneCall className="w-3 h-3 text-emerald-400" />
              <span>1800-202-KABAADI</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between">
        
        {/* Left: Brand + City Picker */}
        <div className="flex items-center space-x-4 lg:space-x-6">
          <Link to="/" className="flex items-center space-x-2.5 group">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-700 flex items-center justify-center text-white shadow-xs group-hover:bg-emerald-800 transition-colors">
              <Recycle className="w-5 h-5 sm:w-6 sm:h-6 text-white stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-base sm:text-lg font-black tracking-tight text-zinc-950">
                  E-KABAADI
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
                  Clean-Tech
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-zinc-500 font-medium hidden sm:block -mt-0.5">
                Doorstep Scrap & Circular Logistics
              </p>
            </div>
          </Link>

          {/* City Selector Dropdown */}
          <div className="relative hidden xl:block">
            <button
              onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-zinc-100 hover:bg-zinc-200/70 border border-zinc-200 text-xs font-semibold text-zinc-800 transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-emerald-700" />
              <span>{selectedCity}</span>
              <ChevronDown className="w-3 h-3 text-zinc-400" />
            </button>

            {cityDropdownOpen && (
              <div className="absolute left-0 mt-2 w-52 rounded-xl bg-white border border-zinc-200 shadow-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150 text-xs">
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider px-2 py-1">
                  Active Service Regions
                </p>
                {['Neemrana / Alwar', 'Bhiwadi / Dharuhera', 'Delhi NCR / Gurgaon', 'Jaipur Hub'].map((city) => (
                  <button
                    key={city}
                    onClick={() => {
                      setSelectedCity(city);
                      setCityDropdownOpen(false);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors font-medium ${
                      selectedCity === city
                        ? 'bg-emerald-50 text-emerald-900 font-bold'
                        : 'text-zinc-700 hover:bg-zinc-100'
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Center: Full Website Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-6 text-xs font-semibold text-zinc-700">
          
          <Link
            to="/rates"
            className={`transition-colors hover:text-emerald-700 ${
              isActive('/rates') ? 'text-emerald-800 font-bold' : ''
            }`}
          >
            Scrap Rates
          </Link>

          <Link
            to="/how-it-works"
            className={`transition-colors hover:text-emerald-700 ${
              isActive('/how-it-works') ? 'text-emerald-800 font-bold' : ''
            }`}
          >
            How It Works
          </Link>

          {/* Business Dropdown */}
          <div className="relative">
            <button
              onClick={() => setBusinessDropdownOpen(!businessDropdownOpen)}
              onMouseEnter={() => setBusinessDropdownOpen(true)}
              className={`flex items-center space-x-1 hover:text-emerald-700 transition-colors ${
                isActive('/bulk') || isActive('/epr') ? 'text-emerald-800 font-bold' : ''
              }`}
            >
              <span>For Business</span>
              <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
            </button>

            {businessDropdownOpen && (
              <div 
                onMouseLeave={() => setBusinessDropdownOpen(false)}
                className="absolute left-0 mt-2 w-64 rounded-xl bg-white border border-zinc-200 shadow-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150 text-xs"
              >
                <Link
                  to="/bulk"
                  onClick={() => setBusinessDropdownOpen(false)}
                  className="flex items-start space-x-2.5 p-2 rounded-lg hover:bg-zinc-50 transition-colors"
                >
                  <Building2 className="w-4 h-4 text-emerald-700 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-zinc-900">Industrial Scrap Offtake</p>
                    <p className="text-[11px] text-zinc-500 font-normal">Tonnage quotes for factories & warehouses</p>
                  </div>
                </Link>

                <Link
                  to="/epr"
                  onClick={() => setBusinessDropdownOpen(false)}
                  className="flex items-start space-x-2.5 p-2 rounded-lg hover:bg-zinc-50 transition-colors"
                >
                  <FileCheck2 className="w-4 h-4 text-emerald-700 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-zinc-900">EPR Compliance & Credits</p>
                    <p className="text-[11px] text-zinc-500 font-normal">Plastic & E-Waste CPCB portal credits</p>
                  </div>
                </Link>
              </div>
            )}
          </div>

          <Link
            to="/societies"
            className={`transition-colors hover:text-emerald-700 ${
              isActive('/societies') ? 'text-emerald-800 font-bold' : ''
            }`}
          >
            Society Drives
          </Link>

          <Link
            to="/centers"
            className={`transition-colors hover:text-emerald-700 ${
              isActive('/centers') ? 'text-emerald-800 font-bold' : ''
            }`}
          >
            Drop-off Yards
          </Link>

          <Link
            to="/about"
            className={`transition-colors hover:text-emerald-700 ${
              isActive('/about') ? 'text-emerald-800 font-bold' : ''
            }`}
          >
            About Us
          </Link>

        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-3">
          
          {/* Main Book Pickup CTA Button */}
          <Link
            to="/user/sell"
            className="inline-flex items-center space-x-1.5 px-4 py-2 sm:py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs transition-all hover:shadow-sm hover:-translate-y-0.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Book Pickup</span>
          </Link>

          {/* User Account / Profile Menu */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center space-x-2 p-1 sm:px-2.5 sm:py-1.5 rounded-xl hover:bg-zinc-100 border border-zinc-200 transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">
                  {user.name.charAt(0)}
                </div>
                <span className="text-xs font-semibold text-zinc-800 hidden md:block max-w-[100px] truncate">
                  {user.name.split(' ')[0]}
                </span>
                <ChevronDown className="w-3 h-3 text-zinc-400 hidden sm:block" />
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-xl bg-white border border-zinc-200 shadow-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150 text-xs">
                  <div className="px-3 py-2 border-b border-zinc-100">
                    <p className="font-bold text-zinc-900">{user.name}</p>
                    <p className="text-[11px] text-zinc-500 truncate">{user.email}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {role === 'ADMIN' ? 'Smart City Admin' : role === 'MERCHANT' ? 'Collector Partner' : 'Citizen'}
                    </span>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => handleRoleChange('USER')}
                      className={`w-full text-left px-3 py-1.5 rounded-lg flex items-center justify-between ${
                        role === 'USER' ? 'bg-emerald-50 text-emerald-900 font-bold' : 'hover:bg-zinc-50 text-zinc-700'
                      }`}
                    >
                      <span>Citizen Dashboard</span>
                      {role === 'USER' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />}
                    </button>

                    <button
                      onClick={() => handleRoleChange('MERCHANT')}
                      className={`w-full text-left px-3 py-1.5 rounded-lg flex items-center justify-between ${
                        role === 'MERCHANT' ? 'bg-amber-50 text-amber-900 font-bold' : 'hover:bg-zinc-50 text-zinc-700'
                      }`}
                    >
                      <span>Collector Duty Mode</span>
                      {role === 'MERCHANT' && <CheckCircle2 className="w-3.5 h-3.5 text-amber-700" />}
                    </button>

                    <button
                      onClick={() => handleRoleChange('ADMIN')}
                      className={`w-full text-left px-3 py-1.5 rounded-lg flex items-center justify-between ${
                        role === 'ADMIN' ? 'bg-zinc-100 text-zinc-900 font-bold' : 'hover:bg-zinc-50 text-zinc-700'
                      }`}
                    >
                      <span>Admin Command Center</span>
                      {role === 'ADMIN' && <CheckCircle2 className="w-3.5 h-3.5 text-zinc-700" />}
                    </button>
                  </div>

                  <div className="pt-1 border-t border-zinc-100">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-1.5 rounded-lg text-rose-600 hover:bg-rose-50 font-medium flex items-center space-x-2"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/auth/login"
              className="text-xs font-bold text-zinc-700 hover:text-zinc-950 px-3 py-2 rounded-lg hover:bg-zinc-100 transition-colors"
            >
              Sign In
            </Link>
          )}

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-zinc-700 hover:bg-zinc-100 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>

      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-zinc-200 bg-white px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-150 text-xs">
          
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-zinc-100">
            <Link
              to="/user/sell"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-xl bg-emerald-700 text-white font-bold text-center flex items-center justify-center space-x-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Book Pickup</span>
            </Link>
            <Link
              to="/rates"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-xl bg-zinc-100 text-zinc-900 font-bold text-center border border-zinc-200"
            >
              Scrap Rates
            </Link>
          </div>

          <div className="space-y-1 font-semibold text-zinc-800">
            <Link
              to="/rates"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg hover:bg-zinc-50"
            >
              Today's Scrap Mandi Rates
            </Link>

            <Link
              to="/how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg hover:bg-zinc-50"
            >
              How Doorstep Weighing Works
            </Link>

            <Link
              to="/bulk"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg hover:bg-zinc-50 text-emerald-800 font-bold"
            >
              For Business & Industrial Offtake
            </Link>

            <Link
              to="/epr"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg hover:bg-zinc-50"
            >
              EPR Compliance & Certificates
            </Link>

            <Link
              to="/societies"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg hover:bg-zinc-50"
            >
              RWA Society Scrap Drives
            </Link>

            <Link
              to="/centers"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg hover:bg-zinc-50"
            >
              Physical Drop-off Yards & Hubs
            </Link>

            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg hover:bg-zinc-50"
            >
              About E-KABAADI
            </Link>
          </div>

          <div className="pt-3 border-t border-zinc-100 flex items-center justify-between text-[11px] text-zinc-500">
            <span>Helpline: 1800-202-KABAADI</span>
            <span className="font-semibold text-emerald-700">CPCB Registered</span>
          </div>

        </div>
      )}

    </header>
  );
};
