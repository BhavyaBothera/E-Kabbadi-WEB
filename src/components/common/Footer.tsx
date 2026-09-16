import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Recycle, 
  PhoneCall, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Award, 
  ExternalLink,
  Scale,
  FileCheck2,
  Building2,
  CheckCircle2
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-zinc-950 text-zinc-400 text-xs border-t border-zinc-800">
      
      {/* Upper Assurance Strip */}
      <div className="border-b border-zinc-800/80 py-6 bg-zinc-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center space-x-3 text-zinc-300">
              <Scale className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <div>
                <p className="font-bold text-white text-xs">Legal Metrology Calibrated</p>
                <p className="text-[11px] text-zinc-500">Certified digital Bluetooth scales (0.05kg)</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 text-zinc-300">
              <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <div>
                <p className="font-bold text-white text-xs">15-Sec Direct UPI Credit</p>
                <p className="text-[11px] text-zinc-500">PhonePe, GPay, Paytm or Cash at doorstep</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 text-zinc-300">
              <FileCheck2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <div>
                <p className="font-bold text-white text-xs">CPCB Form IV Certified</p>
                <p className="text-[11px] text-zinc-500">100% Zero-landfill industrial offtake</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 text-zinc-300">
              <Building2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <div>
                <p className="font-bold text-white text-xs">Rajasthan-NCR Node</p>
                <p className="text-[11px] text-zinc-500">Neemrana, Alwar, Bhiwadi, Gurgaon</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Multi-Column Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          
          {/* Brand Col (2 cols wide on desktop) */}
          <div className="col-span-2 space-y-4">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold text-base shadow-sm">
                <Recycle className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-base font-extrabold text-white tracking-tight">E-KABAADI</span>
                <p className="text-[10px] text-emerald-400 font-semibold tracking-wider uppercase">
                  Clean-Tech Circular Logistics
                </p>
              </div>
            </Link>

            <p className="text-zinc-400 text-xs leading-relaxed max-w-sm">
              India's first smart doorstep scrap collection platform with government-calibrated scales, instant UPI payouts, and direct supply chains to authorized secondary metal smelters and paper mills.
            </p>

            <div className="space-y-1.5 pt-2 text-xs text-zinc-400">
              <div className="flex items-center space-x-2">
                <PhoneCall className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                <span className="text-zinc-300 font-mono font-bold">1800-202-KABAADI</span>
                <span className="text-zinc-500 text-[10px]">(Toll Free • 8 AM - 8 PM)</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                <span className="text-zinc-300">support@e-kabaadi.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                <span>Plot 42, RIICO Phase II, Neemrana, Alwar, Rajasthan 301705</span>
              </div>
            </div>
          </div>

          {/* Col 2: Services for Citizens */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-white uppercase tracking-wider">Individuals</p>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/user/sell" className="hover:text-emerald-400 transition-colors">
                  Book Doorstep Pickup
                </Link>
              </li>
              <li>
                <Link to="/rates" className="hover:text-emerald-400 transition-colors">
                  Today's Scrap Rates
                </Link>
              </li>
              <li>
                <Link to="/user/bulk-upload" className="hover:text-emerald-400 transition-colors flex items-center space-x-1">
                  <span>Bulk Pile AI Scanner</span>
                  <span className="px-1 py-0.2 rounded text-[9px] bg-emerald-900 text-emerald-300 font-bold">AI</span>
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-emerald-400 transition-colors">
                  How Weighing Works
                </Link>
              </li>
              <li>
                <Link to="/user/rewards" className="hover:text-emerald-400 transition-colors">
                  Eco Points & Rewards
                </Link>
              </li>
              <li>
                <Link to="/user/orders" className="hover:text-emerald-400 transition-colors">
                  Track My Pickup
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Business & Industrial */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-white uppercase tracking-wider">Enterprise & B2B</p>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/bulk" className="hover:text-emerald-400 transition-colors">
                  Industrial Scrap Offtake
                </Link>
              </li>
              <li>
                <Link to="/bulk" className="hover:text-emerald-400 transition-colors">
                  Demolition Metal Procurement
                </Link>
              </li>
              <li>
                <Link to="/epr" className="hover:text-emerald-400 transition-colors">
                  EPR Credits & Fulfillment
                </Link>
              </li>
              <li>
                <Link to="/societies" className="hover:text-emerald-400 transition-colors">
                  RWA Society Drives
                </Link>
              </li>
              <li>
                <Link to="/bulk" className="hover:text-emerald-400 transition-colors">
                  Weighbridge RFQ
                </Link>
              </li>
              <li>
                <Link to="/centers" className="hover:text-emerald-400 transition-colors">
                  Drop-off Yards & Hubs
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Operations & Standards */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-white uppercase tracking-wider">Transparency</p>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/how-it-works" className="hover:text-emerald-400 transition-colors">
                  Legal Metrology Standard
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-emerald-400 transition-colors">
                  CPCB Recycler Network
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-emerald-400 transition-colors">
                  Collector Dignity Charter
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-emerald-400 transition-colors">
                  Swachh Bharat Clean Tech
                </Link>
              </li>
              <li>
                <Link to="/rates" className="hover:text-emerald-400 transition-colors">
                  Mandi Index Methodology
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Company & Legal */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-white uppercase tracking-wider">Platform</p>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/about" className="hover:text-emerald-400 transition-colors">
                  About E-KABAADI
                </Link>
              </li>
              <li>
                <Link to="/centers" className="hover:text-emerald-400 transition-colors">
                  Facility Yard Locations
                </Link>
              </li>
              <li>
                <Link to="/merchant/dashboard" className="hover:text-emerald-400 transition-colors">
                  Collector Partner Login
                </Link>
              </li>
              <li>
                <Link to="/admin/dashboard" className="hover:text-emerald-400 transition-colors">
                  ULB Admin Command
                </Link>
              </li>
              <li>
                <Link to="/auth/login" className="hover:text-emerald-400 transition-colors">
                  Sign In / Register
                </Link>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Copyright & Legal Strip */}
      <div className="border-t border-zinc-800/80 py-6 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <div>
            <span>© 2026 E-KABAADI Clean-Tech Pvt. Ltd. All rights reserved. Registered under Companies Act, 2013.</span>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <span>CPCB Reg: PRO/PL/2024/RJ-142</span>
            <span>•</span>
            <span>Legal Metrology Act, 2009 Compliant</span>
            <span>•</span>
            <span>GSTIN: 08AAECE4412M1ZK</span>
          </div>
        </div>
      </div>

    </footer>
  );
};
