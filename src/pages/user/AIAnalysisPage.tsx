import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AIScannerOverlay } from '../../components/user/AIScannerOverlay';
import { usePickup } from '../../context/PickupContext';
import { ScrapCategoryType, ScrapItem } from '../../types';

export const AIAnalysisPage: React.FC = () => {
  const navigate = useNavigate();
  const { setDraftItem } = usePickup();

  const imageSrc = sessionStorage.getItem('ekabaadi_active_scan_img') || 
    'https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=700&auto=format&fit=crop&q=80';
  const category = (sessionStorage.getItem('ekabaadi_active_scan_cat') as ScrapCategoryType) || 'plastic';

  const handleConfirm = (item: ScrapItem) => {
    setDraftItem(item);
    navigate('/user/pickup');
  };

  const handleRetake = () => {
    navigate('/user/sell');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      
      <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
        <div>
          <span className="text-[11px] font-semibold text-emerald-800 uppercase tracking-tight">
            Step 2 of 3: Material Analysis
          </span>
          <h1 className="text-xl sm:text-2xl font-bold text-zinc-900">
            Valuation & Classification
          </h1>
        </div>

        <button
          onClick={handleRetake}
          className="text-xs font-semibold text-zinc-600 hover:text-zinc-900"
        >
          ← Retake Photo
        </button>
      </div>

      <AIScannerOverlay
        imageSrc={imageSrc}
        category={category}
        onConfirm={handleConfirm}
        onRetake={handleRetake}
      />

    </div>
  );
};
