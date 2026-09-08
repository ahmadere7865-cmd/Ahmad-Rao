import React from 'react';
import { Truck, MapPin, Building, Navigation, Compass, CheckCircle2 } from 'lucide-react';
import { OrderTracking } from '../types';

interface LiveRouteRadarProps {
  tracking?: OrderTracking;
  liveRoute?: OrderTracking['liveRoute'];
}

export const LiveRouteRadar: React.FC<LiveRouteRadarProps> = ({ tracking, liveRoute }) => {
  const isDelivered = tracking?.currentStatus === 'delivered';
  const isOutForDelivery = tracking?.currentStatus === 'out_for_delivery';

  // Compute percentage along path
  const progress = tracking?.progressPercentage ?? 50;
  const trackingNumber = tracking?.trackingNumber ?? 'NC-LIVE-TELEMETRY';
  const carrierName = tracking?.carrierName ?? 'Nobel Express Logistics';
  const currentLocationName = tracking?.currentLocationName ?? 'Regional Transit Corridor';
  const estimatedArrival = tracking?.estimatedArrival ?? 'Scheduled Delivery';

  // SVG route path coordinates
  // Start: (80, 180) -> Waypoint 1: (200, 130) -> Waypoint 2: (350, 160) -> Waypoint 3: (480, 70) -> End: (620, 90)
  // Van position interpolated based on progress percentage
  const vanX = 80 + (progress / 100) * (620 - 80);
  // smooth curve interpolation
  const vanY = 180 - Math.sin((progress / 100) * Math.PI) * 90 + ((progress / 100) * -40);

  return (
    <div className="relative w-full rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-inner p-4 sm:p-5 text-white">
      {/* Map Grid Background */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#4f46e5 1px, transparent 1px), radial-gradient(#64748b 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          backgroundPosition: '0 0, 12px 12px'
        }}
      />

      {/* Top Map HUD Telemetry */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="font-bold text-slate-200">GPS Live Telemetry</span>
          <span className="text-[11px] text-slate-400 font-mono">
            {trackingNumber}
          </span>
        </div>

        <div className="flex items-center gap-4 text-[11px] font-mono text-slate-300">
          <span className="flex items-center gap-1 text-sky-400">
            <Compass className="w-3.5 h-3.5 animate-spin" />
            <span>Carrier: {carrierName}</span>
          </span>
          <span className="bg-slate-800 px-2 py-0.5 rounded text-emerald-400 border border-slate-700">
            Progress: {progress}%
          </span>
        </div>
      </div>

      {/* SVG Canvas Map */}
      <div className="relative z-10 my-4 h-48 sm:h-56 w-full flex items-center justify-center">
        <svg 
          viewBox="0 0 700 240" 
          className="w-full h-full select-none"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="50%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background Street lines / subtle geometry */}
          <path d="M 40 40 L 660 40" stroke="#334155" strokeWidth="1" strokeDasharray="4 6" opacity="0.4" />
          <path d="M 40 120 L 660 120" stroke="#334155" strokeWidth="1" strokeDasharray="4 6" opacity="0.4" />
          <path d="M 40 200 L 660 200" stroke="#334155" strokeWidth="1" strokeDasharray="4 6" opacity="0.4" />
          <path d="M 180 20 L 180 220" stroke="#334155" strokeWidth="1" strokeDasharray="4 6" opacity="0.4" />
          <path d="M 380 20 L 380 220" stroke="#334155" strokeWidth="1" strokeDasharray="4 6" opacity="0.4" />
          <path d="M 540 20 L 540 220" stroke="#334155" strokeWidth="1" strokeDasharray="4 6" opacity="0.4" />

          {/* Active Delivery Route Line */}
          <path
            d="M 80 180 Q 220 70 380 150 T 620 90"
            fill="none"
            stroke="#1e293b"
            strokeWidth="8"
            strokeLinecap="round"
          />

          {/* Glowing Tracked Route Progress */}
          <path
            d="M 80 180 Q 220 70 380 150 T 620 90"
            fill="none"
            stroke="url(#routeGradient)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="8 6"
            className="animate-pulse"
            filter="url(#glow)"
          />

          {/* Waypoint 1: Origin / Warehouse */}
          <g transform="translate(80, 180)">
            <circle r="14" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2.5" />
            <circle r="4" fill="#a5b4fc" />
            <text x="0" y="28" fill="#cbd5e1" fontSize="11" textAnchor="middle" fontWeight="bold">
              Nobel Hub #2
            </text>
            <text x="0" y="40" fill="#64748b" fontSize="9" textAnchor="middle">
              Origin Scan
            </text>
          </g>

          {/* Waypoint 2: Transit Hub */}
          <g transform="translate(260, 110)">
            <circle r="10" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
            <circle r="3" fill="#38bdf8" />
            <text x="0" y="24" fill="#94a3b8" fontSize="10" textAnchor="middle">
              Metro Sorting
            </text>
          </g>

          {/* Waypoint 3: Local Transit */}
          <g transform="translate(450, 135)">
            <circle r="10" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
            <circle r="3" fill="#38bdf8" />
            <text x="0" y="24" fill="#94a3b8" fontSize="10" textAnchor="middle">
              Local Dispatch
            </text>
          </g>

          {/* Waypoint 4: Destination */}
          <g transform="translate(620, 90)">
            <circle r="16" fill="#064e3b" stroke="#10b981" strokeWidth="2.5" />
            <circle r="5" fill="#6ee7b7" />
            <text x="0" y="30" fill="#6ee7b7" fontSize="11" textAnchor="middle" fontWeight="bold">
              Your Doorstep
            </text>
            <text x="0" y="42" fill="#94a3b8" fontSize="9" textAnchor="middle">
              {isDelivered ? 'Delivered ✓' : 'Destination'}
            </text>
          </g>

          {/* Animated Courier Van on Path */}
          <g transform={`translate(${vanX}, ${vanY})`}>
            {/* Pulsing Radar Ring */}
            <circle r="22" fill="#6366f1" opacity="0.25">
              <animate attributeName="r" values="16;28;16" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.4;0.1;0.4" dur="2s" repeatCount="indefinite" />
            </circle>
            
            {/* Courier icon pill */}
            <rect x="-18" y="-14" width="36" height="28" rx="8" fill="#4f46e5" stroke="#ffffff" strokeWidth="1.5" />
            
            {/* Mini van glyph */}
            <path
              d="M -10 -4 L -3 -4 L 1 -1 L 7 -1 L 7 5 L -10 5 Z"
              fill="#ffffff"
            />
            <circle cx="-6" cy="6" r="2" fill="#1e1b4b" />
            <circle cx="4" cy="6" r="2" fill="#1e1b4b" />

            {/* Live Tag floating above */}
            <g transform="translate(0, -22)">
              <rect x="-35" y="-12" width="70" height="16" rx="4" fill="#0f172a" stroke="#6366f1" strokeWidth="1" />
              <text x="0" y="0" fill="#a5b4fc" fontSize="8.5" textAnchor="middle" fontWeight="bold">
                {isDelivered ? 'DELIVERED' : isOutForDelivery ? 'VAN NEARBY' : 'IN TRANSIT'}
              </text>
            </g>
          </g>
        </svg>
      </div>

      {/* Bottom Live Status Info */}
      <div className="relative z-10 bg-slate-950/70 border border-slate-800 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
            <Navigation className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block uppercase font-medium">Current Checkpoint</span>
            <span className="font-semibold text-slate-200">
              {currentLocationName}
            </span>
          </div>
        </div>

        <div className="text-right">
          <span className="text-[10px] text-slate-400 block uppercase font-medium">Estimated Arrival</span>
          <span className="font-bold text-emerald-400 text-xs sm:text-sm font-['Outfit']">
            {estimatedArrival}
          </span>
        </div>
      </div>
    </div>
  );
};
