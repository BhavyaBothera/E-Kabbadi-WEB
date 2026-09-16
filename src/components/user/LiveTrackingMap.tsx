import React, { useEffect, useState } from 'react';

export const LiveTrackingMap: React.FC = () => {
  // Simulating coordinates (e.g., Jaipur area)
  const [location, setLocation] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Simulate WebSocket/Socket.io real-time coordinate updates
    const interval = setInterval(() => {
      setLocation(prev => ({
        x: prev.x + (Math.random() - 0.5) * 10,
        y: prev.y + (Math.random() - 0.5) * 10
      }));
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-64 bg-slate-800 rounded-lg flex items-center justify-center relative overflow-hidden border border-slate-600">
      <span className="absolute top-2 left-2 text-xs font-mono text-green-400">
        Live GPS Tracking: Active
      </span>
      
      {/* Mock Map Element - Replace with Mapbox/Leaflet */}
      <div className="absolute w-full h-full opacity-30 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-700 to-slate-900" />
      
      {/* The Collector Marker */}
      <div
        className="w-4 h-4 bg-green-500 rounded-full absolute shadow-[0_0_15px_rgba(34,197,94,0.8)] transition-all duration-1000 ease-in-out"
        style={{ transform: `translate(${location.x}px, ${location.y}px)` }}
      />
    </div>
  );
};