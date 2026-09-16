import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Recycle, 
  Truck, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  IndianRupee, 
  Leaf, 
  Scale, 
  MapPin, 
  Building2, 
  Check, 
  TrendingUp,
  FileCheck2,
  Clock,
  Boxes,
  Camera,
  Star,
  ChevronDown,
  ChevronUp,
  Award,
  Users,
  Search,
  PhoneCall,
  Zap,
  ArrowUpRight
} from 'lucide-react';
import { HeroBookingConsole } from '../components/common/HeroBookingConsole';
import { MandiTicker } from '../components/common/MandiTicker';
import { SYSTEM_METRICS } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

const FADE_UP_VARIANT = {
  hidden: { opacity: 0, y: 24 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  }
};

const STAGGER_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
};

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { switchRole } = useAuth();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [pincodeCheck, setPincodeCheck] = useState('');
  const [pincodeResult, setPincodeResult] = useState<string | null>(null);

  // Scroll Progress Bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const handleStartSell = async () => {
    await switchRole('USER');
    navigate('/user/sell');
  };

  const handleOpenBulkUpload = async () => {
    await switchRole('USER');
    navigate('/user/bulk-upload');
  };

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = pincodeCheck.trim();
    if (['301705', '301019', '301030', '123106', '122001', '122002', '122018', '302001', '302012'].includes(clean) || clean.startsWith('301') || clean.startsWith('122') || clean.startsWith('110')) {
      setPincodeResult(`Active Doorstep Service: Verified EV Fleet operating in Pincode ${clean}. Average arrival: 35 mins.`);
    } else if (clean.length === 6) {
      setPincodeResult(`Service Available on Demand for Pincode ${clean}. Next scheduled fleet run: Tomorrow.`);
    } else {
      setPincodeResult('Please enter a valid 6-digit postal pincode.');
    }
  };

  const faqs = [
    {
      q: 'How do you guarantee that scrap weight is accurate and fair?',
      a: 'Every E-KABAADI collector carries a Legal Metrology (Department of Consumer Affairs) certified Bluetooth electronic floor scale. The digital scale displays zero tare weight in front of you and broadcasts live to your mobile screen before any payment is initiated.'
    },
    {
      q: 'How does instant payment work at my doorstep?',
      a: 'Once weights are locked in, our payment gateway initiates an immediate automated UPI transfer (Google Pay, PhonePe, Paytm, or BHIM) to your VPA. Funds land in your bank within 15 seconds before the collector departs.'
    },
    {
      q: 'Can I upload a photo of a large mixed scrap pile?',
      a: 'Yes! Our Bulk Pile AI Estimator allows factories, offices, and households to snap a photo of any storage room or yard pile. Our computer vision model segments cardboard, metals, and plastics, providing a volume estimate and weight appraisal.'
    },
    {
      q: 'What scrap materials are accepted for collection?',
      a: 'We accept newspapers, corrugated cartons (OCC), textbooks, office paper, PET bottles, HDPE containers, iron grills, steel rebars, copper wiring, brass utensils, aluminium sections, batteries, old computers, and large appliances like ACs and refrigerators.'
    },
    {
      q: 'Can housing societies (RWAs) organize weekend drives?',
      a: 'Yes. We set up calibrated weighing booths at society clubhouses or visit tower-by-tower. Payouts can be distributed individually to flat owners or deposited collectively into the RWA Maintenance Fund.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAF8] text-zinc-900 flex flex-col selection:bg-emerald-200 selection:text-emerald-950 relative">
      
      {/* Scroll Progress Bar */}
      <motion.div 
        style={{ scaleX }} 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-400 z-50 origin-left"
      />

      {/* Live Mandi Ticker Strip */}
      <MandiTicker />

      {/* Hero Section with Ambient Glow */}
      <section className="relative pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-zinc-200/80 bg-white overflow-hidden">
        
        {/* Subtle radial emerald background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[550px] bg-radial-gradient-emerald pointer-events-none -z-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content (7 cols) */}
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={STAGGER_CONTAINER}
              className="lg:col-span-7 space-y-6"
            >
              
              <motion.div variants={FADE_UP_VARIANT} className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-50/90 border border-emerald-200/90 text-emerald-900 text-xs font-semibold shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                <span>Rajasthan-NCR Circular Logistics Network</span>
                <span className="text-zinc-300">•</span>
                <span className="text-emerald-800 font-bold">Neemrana Node</span>
              </motion.div>

              <motion.div variants={FADE_UP_VARIANT} className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-zinc-950 tracking-tight leading-[1.12]">
                  Doorstep scrap collection with <span className="text-emerald-800 underline decoration-emerald-300 decoration-wavy underline-offset-4">instant UPI payout</span>.
                </h1>
                <p className="text-base sm:text-lg text-zinc-600 max-w-xl leading-relaxed">
                  Book in 30 seconds. A verified collector arrives in an electric cargo trike with a calibrated digital floor scale, transparently weighs your recyclables, and transfers funds directly to your bank account.
                </p>
              </motion.div>

              {/* Action Buttons with Micro Transitions */}
              <motion.div variants={FADE_UP_VARIANT} className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <button
                  type="button"
                  onClick={handleStartSell}
                  className="px-7 py-4 rounded-2xl bg-emerald-800 hover:bg-emerald-700 active:scale-[0.98] text-white text-sm font-extrabold shadow-lg shadow-emerald-950/15 flex items-center justify-center space-x-2.5 transition-all hover:-translate-y-0.5"
                >
                  <Sparkles className="w-4 h-4 text-emerald-300" />
                  <span>Book Doorstep Pickup (30s)</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>

                <Link
                  to="/rates"
                  className="px-6 py-4 rounded-2xl bg-zinc-100 hover:bg-zinc-200/80 active:scale-[0.98] text-zinc-900 border border-zinc-200/90 text-sm font-bold flex items-center justify-center space-x-2 transition-all hover:-translate-y-0.5"
                >
                  <Scale className="w-4 h-4 text-zinc-700" />
                  <span>Today's Scrap Rates</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400" />
                </Link>
              </motion.div>

              {/* Credibility Micro Points */}
              <motion.div variants={FADE_UP_VARIANT} className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3.5 border-t border-zinc-100 text-xs text-zinc-600">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                  <span className="font-semibold text-zinc-800">Legal Metrology Calibrated</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                  <span className="font-semibold text-zinc-800">15-Sec Direct UPI Credit</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                  <span className="font-semibold text-zinc-800">CPCB Zero-Landfill Certified</span>
                </div>
              </motion.div>

            </motion.div>

            {/* Right: Interactive Console (5 cols) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 flex justify-center"
            >
              <HeroBookingConsole />
            </motion.div>

          </div>
        </div>
      </section>

      {/* Industrial & Society Trust Strip */}
      <section className="py-6 bg-zinc-100/70 border-b border-zinc-200/80 text-xs text-zinc-500 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-bold text-zinc-600 uppercase tracking-wider text-[11px] whitespace-nowrap">
            Trusted by Communities & Industrial Parks:
          </span>
          <div className="flex items-center flex-wrap gap-6 sm:gap-8 text-zinc-700 font-semibold text-xs">
            <span className="flex items-center space-x-1.5 hover:text-emerald-800 transition-colors">
              <Building2 className="w-3.5 h-3.5 text-emerald-700" />
              <span>RIICO Japanese Zone</span>
            </span>
            <span className="flex items-center space-x-1.5 hover:text-emerald-800 transition-colors">
              <Building2 className="w-3.5 h-3.5 text-emerald-700" />
              <span>Ashiana Greens Society</span>
            </span>
            <span className="flex items-center space-x-1.5 hover:text-emerald-800 transition-colors">
              <Building2 className="w-3.5 h-3.5 text-emerald-700" />
              <span>Havells Logistics Unit</span>
            </span>
            <span className="flex items-center space-x-1.5 hover:text-emerald-800 transition-colors">
              <Building2 className="w-3.5 h-3.5 text-emerald-700" />
              <span>Gulmohar Enclave RWAs</span>
            </span>
          </div>
        </div>
      </section>

      {/* Live System Metrics Bar */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6 }}
        className="py-8 bg-white border-b border-zinc-200/80"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 text-center">
            
            <div className="p-5 rounded-2xl bg-zinc-50/70 border border-zinc-200/80 shadow-xs">
              <p className="text-2xl sm:text-3xl font-black text-zinc-950 font-mono">
                {(SYSTEM_METRICS.scrapCollectedKg / 1000).toFixed(1)} MT
              </p>
              <p className="text-xs font-semibold text-zinc-600 mt-1">Scrap Collected & Diverted</p>
              <span className="text-[11px] text-emerald-700 font-bold mt-0.5 inline-block">+12% this month</span>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-50/70 border border-zinc-200/80 shadow-xs">
              <p className="text-2xl sm:text-3xl font-black text-emerald-800 font-mono">
                {(SYSTEM_METRICS.co2SavedKg / 1000).toFixed(1)} MT
              </p>
              <p className="text-xs font-semibold text-zinc-600 mt-1">CO₂ Emissions Abated</p>
              <span className="text-[11px] text-emerald-700 font-bold mt-0.5 inline-block">CPCB Verified Audit</span>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-50/70 border border-zinc-200/80 shadow-xs">
              <p className="text-2xl sm:text-3xl font-black text-zinc-950 font-mono">
                ₹{(SYSTEM_METRICS.totalTransactionValue / 100000).toFixed(1)} Lakh
              </p>
              <p className="text-xs font-semibold text-zinc-600 mt-1">Directly Transferred via UPI</p>
              <span className="text-[11px] text-zinc-500 font-medium mt-0.5 inline-block">Zero Intermediary Fees</span>
            </div>

            <div className="p-5 rounded-2xl bg-zinc-50/70 border border-zinc-200/80 shadow-xs">
              <p className="text-2xl sm:text-3xl font-black text-emerald-800 font-mono">
                {SYSTEM_METRICS.recyclingRatePercent}%
              </p>
              <p className="text-xs font-semibold text-zinc-600 mt-1">Closed-Loop Recovery Rate</p>
              <span className="text-[11px] text-zinc-500 font-medium mt-0.5 inline-block">Zero Waste to Landfill</span>
            </div>

          </div>
        </div>
      </motion.section>

      {/* Four Dedicated Portals for Every Audience */}
      <section className="py-20 bg-[#F8FAF8] border-b border-zinc-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto space-y-2.5"
          >
            <span className="text-xs font-bold text-emerald-800 tracking-wider uppercase px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200">
              Clean-Tech Circular Logistics
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-zinc-950 tracking-tight">
              Tailored Solutions for Every Scrap Stream
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
              Designed for individual households, residential societies, heavy manufacturing plants, and brand compliance managers.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1: For Households */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.05 }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="bg-white rounded-3xl border border-zinc-200/90 p-6 flex flex-col justify-between hover:border-emerald-300 hover:shadow-[0_10px_30px_-10px_rgba(4,78,56,0.1)] transition-all space-y-5 group"
            >
              <div className="space-y-3.5">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold shadow-xs border border-emerald-100">
                  <Truck className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-zinc-950 text-base group-hover:text-emerald-800 transition-colors">
                  Households & Flats
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Free doorstep pickup for old newspapers, cartons, plastic bottles, iron, and appliances. Instant direct UPI payout at zero tare.
                </p>
              </div>

              <Link
                to="/user/sell"
                className="inline-flex items-center space-x-1.5 text-xs font-bold text-emerald-800 group-hover:text-emerald-950 pt-2"
              >
                <span>Book Household Pickup</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Card 2: For Housing Societies */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.12 }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="bg-white rounded-3xl border border-zinc-200/90 p-6 flex flex-col justify-between hover:border-emerald-300 hover:shadow-[0_10px_30px_-10px_rgba(4,78,56,0.1)] transition-all space-y-5 group"
            >
              <div className="space-y-3.5">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold shadow-xs border border-emerald-100">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-zinc-950 text-base group-hover:text-emerald-800 transition-colors">
                  Housing Societies & RWAs
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Organize weekend society scrap drives. Club payouts directly into RWA Maintenance funds and receive CPCB Green Community certificates.
                </p>
              </div>

              <Link
                to="/societies"
                className="inline-flex items-center space-x-1.5 text-xs font-bold text-emerald-800 group-hover:text-emerald-950 pt-2"
              >
                <span>Organize Society Drive</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Card 3: For Factories & B2B */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.18 }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="bg-white rounded-3xl border border-zinc-200/90 p-6 flex flex-col justify-between hover:border-emerald-300 hover:shadow-[0_10px_30px_-10px_rgba(4,78,56,0.1)] transition-all space-y-5 group"
            >
              <div className="space-y-3.5">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold shadow-xs border border-emerald-100">
                  <Building2 className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-zinc-950 text-base group-hover:text-emerald-800 transition-colors">
                  Factories & Warehouses
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Heavy tonnage offtake, 60-ton certified weighbridge slips, hydraulic tippers, GST invoices, and CPCB Form IV regulatory manifests.
                </p>
              </div>

              <Link
                to="/bulk"
                className="inline-flex items-center space-x-1.5 text-xs font-bold text-emerald-800 group-hover:text-emerald-950 pt-2"
              >
                <span>Request Industrial RFQ</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Card 4: For Brands (EPR) */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: 0.24 }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="bg-white rounded-3xl border border-zinc-200/90 p-6 flex flex-col justify-between hover:border-emerald-300 hover:shadow-[0_10px_30px_-10px_rgba(4,78,56,0.1)] transition-all space-y-5 group"
            >
              <div className="space-y-3.5">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold shadow-xs border border-emerald-100">
                  <FileCheck2 className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-zinc-950 text-base group-hover:text-emerald-800 transition-colors">
                  EPR Brand Compliance
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Direct online credit transfers on the central CPCB portal for PIBOs under Plastic & E-Waste Management Rules 2022.
                </p>
              </div>

              <Link
                to="/epr"
                className="inline-flex items-center space-x-1.5 text-xs font-bold text-emerald-800 group-hover:text-emerald-950 pt-2"
              >
                <span>Procure EPR Credits</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

          </div>

        </div>
      </section>

      {/* Popular Scrap Rates Snapshot */}
      <section className="py-20 bg-white border-b border-zinc-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-4"
          >
            <div>
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
                Today's Benchmark Rates
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-zinc-950 tracking-tight">
                Transparent Mandi Scrap Index
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 mt-1">
                Updated every morning based on secondary smelting auctions and paper mill procurement prices.
              </p>
            </div>

            <Link
              to="/rates"
              className="inline-flex items-center space-x-1.5 text-xs font-bold text-emerald-900 hover:text-emerald-950 bg-emerald-50 hover:bg-emerald-100 px-4 py-2.5 rounded-xl border border-emerald-200 transition-colors self-start md:self-auto shadow-xs"
            >
              <span>View Full 15+ Item Directory & Calculator</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>

          {/* 4 Preview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                name: 'Newspaper (Raddi)',
                cat: 'Paper & Books',
                price: '₹15.5',
                change: '+0.5%',
                image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=200&auto=format&fit=crop&q=80'
              },
              {
                name: 'Corrugated Cartons (OCC)',
                cat: 'Packaging Boxes',
                price: '₹17.0',
                change: '+1.2%',
                image: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=200&auto=format&fit=crop&q=80'
              },
              {
                name: 'Copper Berry Wire',
                cat: 'Metals & Cables',
                price: '₹585.0',
                change: '+3.5%',
                image: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?w=200&auto=format&fit=crop&q=80'
              },
              {
                name: 'Split ACs (Complete)',
                cat: 'Large Appliances',
                price: '₹85.0',
                change: '+2.0%',
                image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=200&auto=format&fit=crop&q=80'
              }
            ].map((r, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-[#F8FAF8] p-4 rounded-2xl border border-zinc-200/90 shadow-xs flex items-center justify-between gap-3 hover:border-emerald-300 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <img src={r.image} alt={r.name} className="w-12 h-12 rounded-xl object-cover border border-zinc-200/80 flex-shrink-0" />
                  <div>
                    <span className="text-[10px] text-zinc-400 font-bold block uppercase">{r.cat}</span>
                    <h4 className="font-bold text-zinc-950 text-xs">{r.name}</h4>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-base font-black text-zinc-950 font-mono">{r.price}<span className="text-[11px] font-normal text-zinc-500">/kg</span></p>
                  <span className="text-[10px] text-emerald-700 font-bold">{r.change} 24h</span>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Feature Spotlight: Bulk Scrap Pile Estimator with Deep Obsidian-Emerald Palette */}
      <section className="py-20 bg-gradient-to-br from-[#061A13] via-[#09291E] to-[#04150F] text-white border-b border-emerald-950/80 relative overflow-hidden">
        
        {/* Subtle radial emerald background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-[500px] bg-radial-dark-emerald pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <motion.div 
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 space-y-5"
            >
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/90 text-emerald-300 border border-emerald-700/60 shadow-inner">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>Bulk Pile AI Vision Model</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                Have a large mixed pile of scrap?
                <span className="block text-emerald-400">Get an instant appraisal from a single snapshot.</span>
              </h2>

              <p className="text-zinc-300 text-sm leading-relaxed max-w-xl">
                Don't waste days manually sorting warehouse cartons or factory turnings. Snap one photo with your smartphone. Our spatial computer vision model estimates volume in cubic meters, segments individual materials, and recommends the exact right transport fleet.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3.5">
                <button
                  type="button"
                  onClick={handleOpenBulkUpload}
                  className="px-7 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] text-white text-xs font-extrabold shadow-lg shadow-emerald-950/30 transition-all flex items-center space-x-2"
                >
                  <Camera className="w-4 h-4" />
                  <span>Scan Scrap Pile with Camera</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>

                <Link
                  to="/bulk"
                  className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 text-zinc-200 border border-white/15 text-xs font-bold transition-colors"
                >
                  Industrial Quotation (5+ MT)
                </Link>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95, x: 25 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5"
            >
              <div className="rounded-3xl overflow-hidden border border-emerald-700/40 shadow-2xl bg-zinc-950 aspect-[4/3] relative">
                <img
                  src="https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800&auto=format&fit=crop&q=80"
                  alt="Scrap pile volumetric scan"
                  className="w-full h-full object-cover opacity-85"
                />
                
                <div className="absolute top-[18%] left-[8%] w-[52%] h-[55%] border-2 border-amber-400 rounded-xl bg-amber-500/10">
                  <span className="absolute -top-3 left-2 px-2 py-0.5 rounded text-[9px] font-bold bg-amber-500 text-black shadow-xs">
                    OCC Cartons (62%) • ~125 kg
                  </span>
                </div>

                <div className="absolute top-[28%] left-[65%] w-[27%] h-[42%] border-2 border-emerald-400 rounded-xl bg-emerald-500/10">
                  <span className="absolute -top-3 left-2 px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-500 text-black shadow-xs">
                    Metals (24%) • ~48 kg
                  </span>
                </div>

                <div className="absolute bottom-3 inset-x-3 bg-zinc-950/85 backdrop-blur-md rounded-2xl p-3.5 border border-emerald-700/30 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-zinc-400 uppercase font-semibold">Total Projected Value</span>
                    <p className="font-black text-emerald-400 text-sm">₹5,420 Guaranteed Spot</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-600/30 text-emerald-300 font-mono text-[11px] border border-emerald-500/40">
                    ±4.8% Margin
                  </span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Hyperlocal Pincode Coverage Checker */}
      <section className="py-16 bg-white border-b border-zinc-200/80">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6"
        >
          <div className="space-y-2">
            <span className="text-xs font-bold text-emerald-800 tracking-wider uppercase px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200">
              Hyperlocal EV Fleet Service
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-zinc-950">
              Check if an EV Collector is patrolling your sector
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 max-w-lg mx-auto">
              We operate daily zero-emission electric cargo trikes across Neemrana, Bhiwadi, Alwar, Dharuhera, Gurgaon, and Jaipur.
            </p>
          </div>

          <form onSubmit={handleCheckPincode} className="max-w-md mx-auto flex items-center gap-2">
            <div className="relative flex-1">
              <MapPin className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                placeholder="Enter 6-digit Pincode (e.g. 301705)"
                value={pincodeCheck}
                onChange={(e) => setPincodeCheck(e.target.value)}
                maxLength={6}
                className="w-full pl-9 pr-3 py-3 rounded-2xl border border-zinc-300 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent transition-all shadow-xs"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 rounded-2xl bg-zinc-950 hover:bg-zinc-800 active:scale-[0.98] text-white font-bold text-xs shadow-xs transition-colors whitespace-nowrap"
            >
              Check Pincode
            </button>
          </form>

          <AnimatePresence>
            {pincodeResult && (
              <motion.div 
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-950 max-w-md mx-auto text-left flex items-start space-x-2.5 shadow-xs"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
                <span>{pincodeResult}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Verified Customer Testimonials */}
      <section className="py-20 bg-[#F8FAF8] border-b border-zinc-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto space-y-2"
          >
            <span className="text-xs font-bold text-emerald-800 tracking-wider uppercase px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200">
              Verified Social Proof
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-zinc-950 tracking-tight">
              Trusted by Over 45,000 Homes & Facilities
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600">
              How households, housing societies, and industrial managers modernized their scrap disposal.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Pooja Agarwal',
                role: 'Resident, Ashiana Greens, Neemrana',
                avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
                quote: 'Normally local kabadiwalas adjust the mechanical spring balance. With E-KABAADI, the collector showed me the 0.00 tare on his digital floor scale and ₹640 was transferred to my Google Pay before he even walked out of the gate.',
                payout: '₹640 received via UPI',
                badge: 'Verified Resident'
              },
              {
                name: 'Kavita Sengupta',
                role: 'Secretary, Sector 4 RWA, Bhiwadi',
                avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
                quote: 'We organized a society-wide dry waste drive. Collected over 420 kg of cardboard boxes and old textbooks. E-KABAADI dispatched an EV Mini-Truck and distributed Eco Points to every flat owner.',
                payout: '420 kg recycled',
                badge: 'RWA Partner'
              },
              {
                name: 'Harshwardhan Joshi',
                role: 'Operations Head, RIICO Phase II',
                avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80',
                quote: 'The Bulk Scrap Pile AI Estimator is phenomenal. We snapped our packaging pile in the receiving warehouse, received an immediate estimate of 180 kg OCC, and booked an authorized recycler pickup compliant with CPCB Form IV.',
                payout: '₹2,880 payout',
                badge: 'Industrial Facility'
              }
            ].map((t, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.25 } }}
                className="p-6 sm:p-7 rounded-3xl bg-white border border-zinc-200/90 shadow-xs flex flex-col justify-between space-y-5 hover:border-emerald-300 transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center space-x-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-600 italic leading-relaxed">
                    "{t.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-zinc-100 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img src={t.avatar} alt={t.name} className="w-9 h-9 rounded-full object-cover border border-zinc-200" />
                    <div>
                      <p className="font-bold text-xs text-zinc-950">{t.name}</p>
                      <p className="text-[10px] text-zinc-500">{t.role}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                    {t.badge}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Frequently Asked Questions with Animated Height */}
      <section className="py-20 bg-white border-b border-zinc-200/80">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8"
        >
          
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-emerald-800 tracking-wider uppercase px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200">
              Clear & Transparent
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-zinc-950">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="divide-y divide-zinc-200 border-y border-zinc-200">
            {faqs.map((f, i) => (
              <div key={i} className="py-4 sm:py-5">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left flex items-center justify-between space-x-4 font-bold text-sm sm:text-base text-zinc-950 hover:text-emerald-800 transition-colors"
                >
                  <span>{f.q}</span>
                  <motion.div
                    animate={{ rotate: openFaq === i ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <ChevronDown className="w-4 h-4 text-zinc-500 flex-shrink-0" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="mt-3 text-xs sm:text-sm text-zinc-600 leading-relaxed pr-8">
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

        </motion.div>
      </section>

      {/* Bottom Conversion Banner with Deep Obsidian Emerald Backdrop */}
      <section className="py-20 bg-gradient-to-br from-[#061A13] via-[#0A291E] to-[#04150F] text-white text-center relative overflow-hidden">
        
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/10 blur-3xl pointer-events-none" />

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto px-4 space-y-6 relative z-10"
        >
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700/60 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Zero Booking Fee • Free Doorstep Collection</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Ready to turn clutter into verified cash?
          </h2>

          <p className="text-xs sm:text-sm text-zinc-300 max-w-lg mx-auto leading-relaxed">
            Schedule a collector visit in 30 seconds. Legal metrology certified scales, friendly staff, and instant UPI payout.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-3.5 pt-2">
            <button
              type="button"
              onClick={handleStartSell}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 active:scale-[0.98] text-emerald-950 font-black text-xs shadow-xl shadow-emerald-950/40 transition-all flex items-center justify-center space-x-2"
            >
              <span>Book Doorstep Pickup Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <Link
              to="/rates"
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white/10 hover:bg-white/15 active:scale-[0.98] text-white border border-white/20 font-bold text-xs transition-colors"
            >
              Check Today's Rates
            </Link>
          </div>
        </motion.div>
      </section>

    </div>
  );
};
