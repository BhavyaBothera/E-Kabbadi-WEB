import React from 'react';
import { 
  CheckCircle2, 
  Clock, 
  MapPin, 
  User, 
  Truck, 
  Building2, 
  Recycle, 
  Award, 
  ShieldCheck,
  ExternalLink
} from 'lucide-react';
import { PickupRequest, ScrapJourneyStage } from '../../types';

interface ScrapJourneyTimelineProps {
  pickup: PickupRequest;
}

export const ScrapJourneyTimeline: React.FC<ScrapJourneyTimelineProps> = ({ pickup }) => {
  const item = pickup.scrapItems[0] || {
    materialName: 'Polyethylene Terephthalate (PET)',
    actualWeightKg: 4.5,
    category: 'plastic'
  };

  const stages: ScrapJourneyStage[] = pickup.journeyStages && pickup.journeyStages.length > 0 ? pickup.journeyStages : [
    {
      stage: 'CITIZEN_SUBMITTED',
      title: 'Scrap Submitted & Catalogued',
      description: 'Material photo verified, category registered with digital identity token.',
      timestamp: '10:15 AM',
      actor: `${pickup.userName} (Citizen)`,
      location: pickup.userAddress,
      completed: true
    },
    {
      stage: 'COLLECTOR_PICKED',
      title: 'Collected & Weight Authenticated',
      description: `Smart-scale verified at ${item.actualWeightKg || 4.5} kg. Instant digital UPI payout transferred.`,
      timestamp: '11:42 AM',
      actor: pickup.collector ? `${pickup.collector.name} (Collector #${pickup.collector.id})` : 'Ramesh Kumar (Collector #704)',
      location: 'Neemrana Sector 4 Ward Hub',
      completed: true
    },
    {
      stage: 'FACILITY_VERIFIED',
      title: 'Aggregated & Optical Sorted',
      description: 'Near-infrared optical sorting separating clear vs colored flake streams.',
      timestamp: '03:15 PM',
      actor: 'RIICO Material Recovery Node 02',
      location: 'Neemrana Industrial Cluster',
      completed: true
    },
    {
      stage: 'RECYCLER_PROCESSING',
      title: 'Handoff to Certified Recycler',
      description: 'Shredded, hot-washed, and extruded into circular grade pellets.',
      timestamp: 'Next Day, 09:30 AM',
      actor: pickup.recycler?.name || 'EcoGreen Circular Polymers Ltd.',
      location: 'Neemrana Green Zone, Plant A',
      completed: true
    },
    {
      stage: 'NEW_PRODUCT_CREATED',
      title: 'Zero-Landfill Circular Output',
      description: 'Formed into 100% rPET textile yarn & recycled preforms. 0% landfill diversion.',
      timestamp: 'Completed',
      actor: 'Closed-Loop Manufacturing Hub',
      location: 'Circular Supply Chain',
      completed: true,
      badge: 'CPCB Zero Landfill Certified'
    }
  ];

  const stageIcons = {
    CITIZEN_SUBMITTED: User,
    COLLECTOR_PICKED: Truck,
    FACILITY_VERIFIED: Building2,
    RECYCLER_PROCESSING: Recycle,
    NEW_PRODUCT_CREATED: Award
  };

  return (
    <div className="space-y-6">
      
      {/* Overview Card */}
      <div className="p-6 rounded-xl bg-white border border-zinc-200 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-zinc-200">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                CPCB TRACEABILITY PASSPORT
              </span>
              <span className="text-xs text-zinc-500 font-mono">{pickup.id}</span>
            </div>
            <h3 className="text-base font-bold text-zinc-900 mt-1.5">
              {item.materialName} ({item.actualWeightKg || item.estimatedWeightKg || 4.5} kg)
            </h3>
            <p className="text-xs text-zinc-500 mt-0.5">
              Collected from {pickup.userAddress}, {pickup.city}
            </p>
          </div>

          <div className="flex items-center space-x-3 bg-zinc-50 p-3 rounded-lg border border-zinc-200">
            <ShieldCheck className="w-6 h-6 text-emerald-700" />
            <div>
              <p className="text-xs font-bold text-zinc-900">100% Landfill Diverted</p>
              <p className="text-[11px] text-zinc-500">CPCB Registered Recycler #RJ-PCB-9921</p>
            </div>
          </div>
        </div>

        {/* 5-Stage Step Flow */}
        <div className="pt-6 relative">
          <div className="space-y-6 relative before:absolute before:inset-0 before:left-5 before:w-0.5 before:bg-zinc-200">
            {stages.map((st, idx) => {
              const Icon = stageIcons[st.stage] || CheckCircle2;
              return (
                <div key={idx} className="relative flex items-start space-x-4">
                  {/* Step Dot */}
                  <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    st.completed ? 'bg-emerald-700 text-white shadow-xs' : 'bg-zinc-200 text-zinc-500'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Step Details */}
                  <div className="flex-1 bg-zinc-50 rounded-lg p-4 border border-zinc-200">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="text-sm font-bold text-zinc-900">{st.title}</h4>
                        {st.badge && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                            {st.badge}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-zinc-500 font-mono">{st.timestamp}</span>
                    </div>

                    <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                      {st.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-zinc-500 mt-3 pt-2 border-t border-zinc-200">
                      <span className="flex items-center space-x-1">
                        <User className="w-3.5 h-3.5 text-zinc-400" />
                        <span>{st.actor}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center space-x-1">
                        <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                        <span>{st.location}</span>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
};
