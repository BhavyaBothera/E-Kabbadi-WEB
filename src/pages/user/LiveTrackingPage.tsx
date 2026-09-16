import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  LiveTrackingMap 
} from '../../components/user/LiveTrackingMap';
import { 
  VerificationModal 
} from '../../components/user/VerificationModal';
import { 
  PaymentSuccessModal 
} from '../../components/user/PaymentSuccessModal';
import { usePickup } from '../../context/PickupContext';
import { pickupService } from '../../services/pickupService';
import { PickupRequest } from '../../types';
import { ArrowLeft, Clock, MapPin, Scale } from 'lucide-react';

export const LiveTrackingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { activePickup, setActivePickup } = usePickup();

  const [pickup, setPickup] = useState<PickupRequest | null>(activePickup);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  const [settledAmount, setSettledAmount] = useState(126);
  const [settledTxnId, setSettledTxnId] = useState('UPI-982410-EK');

  useEffect(() => {
    async function load() {
      if (id) {
        const found = await pickupService.getPickupById(id);
        if (found) {
          setPickup(found);
          setActivePickup(found);
        }
      }
    }
    load();
  }, [id]);

  if (!pickup) {
    return (
      <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center p-4">
        <div className="text-center space-y-3 bg-white p-6 rounded-xl border border-zinc-200 shadow-xs">
          <p className="text-sm text-zinc-600">Loading pickup telemetry...</p>
          <button onClick={() => navigate('/user/dashboard')} className="text-xs text-emerald-800 font-semibold underline">
            Return to Citizen Dashboard
          </button>
        </div>
      </div>
    );
  }

  const handleCollectorArrived = () => {
    setShowVerifyModal(true);
  };

  const handleVerifyConfirm = (actualWeight: number, finalPrice: number) => {
    setShowVerifyModal(false);
    setSettledAmount(finalPrice);
    const txn = `UPI-${Math.floor(100000 + Math.random() * 900000)}-EK`;
    setSettledTxnId(txn);

    pickupService.completePickup(pickup.id, actualWeight, finalPrice, txn).then((updated) => {
      if (updated) {
        setPickup(updated);
        setActivePickup(updated);
      }
    });

    setShowPaymentSuccess(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-200">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigate('/user/dashboard')}
            className="p-2 rounded-lg bg-white border border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span className="text-[11px] font-semibold text-emerald-800 uppercase tracking-tight">
                Live Doorstep Dispatch
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-zinc-900">
              Collector On The Way
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-3 text-xs text-zinc-500">
          <span className="font-mono font-semibold text-zinc-700">ID: {pickup.id}</span>
          <span>•</span>
          <span className="text-zinc-800">{pickup.userAddress}</span>
        </div>
      </div>

      {/* The Live Interactive Map Component */}
      <LiveTrackingMap
        pickup={pickup}
        onArrived={handleCollectorArrived}
      />

      {/* Verification / Smart Weighing Modal */}
      {showVerifyModal && (
        <VerificationModal
          pickup={pickup}
          onAccept={handleVerifyConfirm}
          onClose={() => setShowVerifyModal(false)}
        />
      )}

      {/* Payment Success Modal */}
      {showPaymentSuccess && (
        <PaymentSuccessModal
          pickup={pickup}
          amount={settledAmount}
          ecoPoints={pickup.ecoPointsAwarded || 50}
          transactionId={settledTxnId}
          onViewJourney={() => {
            setShowPaymentSuccess(false);
            navigate(`/user/orders/${pickup.id}`);
          }}
          onDone={() => {
            setShowPaymentSuccess(false);
            navigate('/user/dashboard');
          }}
        />
      )}

    </div>
  );
};
