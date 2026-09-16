import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Download, 
  Share2, 
  ShieldCheck, 
  Award,
  Recycle, 
  CheckCircle2,
  Check
} from 'lucide-react';
import { ScrapJourneyTimeline } from '../../components/user/ScrapJourneyTimeline';
import { pickupService } from '../../services/pickupService';
import { PickupRequest } from '../../types';

export const ScrapJourneyPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [pickup, setPickup] = useState<PickupRequest | null>(null);
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function load() {
      if (id) {
        const found = await pickupService.getPickupById(id);
        if (found) setPickup(found);
      }
    }
    load();
  }, [id]);

  if (!pickup) {
    return (
      <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center p-4">
        <div className="text-center space-y-3 bg-white p-6 rounded-xl border border-zinc-200">
          <p className="text-sm text-zinc-600">Loading scrap provenance ledger...</p>
          <Link to="/user/orders" className="text-xs text-emerald-800 font-semibold underline">
            Return to Orders
          </Link>
        </div>
      </div>
    );
  }

  const handleDownloadCertificate = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
    }, 1000);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText?.(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigate('/user/orders')}
            className="p-2 rounded-lg bg-white border border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              <span className="text-[11px] font-semibold text-emerald-800 uppercase tracking-tight">
                Traceability Provenance
              </span>
            </div>
            <h1 className="text-2xl font-bold text-zinc-900">
              Circular Waste Journey
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-2 self-start sm:self-auto">
          <button
            onClick={handleDownloadCertificate}
            disabled={downloading}
            className="px-3.5 py-2 rounded-lg bg-white hover:bg-zinc-50 border border-zinc-300 text-xs text-zinc-700 font-medium flex items-center space-x-1.5 transition-colors shadow-xs"
          >
            <Download className="w-3.5 h-3.5 text-zinc-600" />
            <span>{downloading ? 'Exporting PDF...' : 'Download Certificate'}</span>
          </button>

          <button
            onClick={handleShare}
            className="p-2 rounded-lg bg-white hover:bg-zinc-50 border border-zinc-300 text-zinc-600 hover:text-zinc-900 shadow-xs transition-colors"
            title="Copy Link"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-700" /> : <Share2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <ScrapJourneyTimeline pickup={pickup} />

    </div>
  );
};
