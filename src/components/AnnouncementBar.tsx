import React from 'react';
import { ShieldCheck, Truck, MapPin, Sparkles } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  return (
    <div id="announcement-bar" className="bg-slate-900 text-slate-200 text-xs py-2 px-4 border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-medium text-[11px] border border-indigo-400/30">
            <Sparkles className="w-3 h-3 text-indigo-400" />
            Nobel Conect
          </span>
          <span className="hidden sm:inline text-slate-400">|</span>
          <span className="font-medium text-slate-300">
            Connecting You to Better Shopping
          </span>
        </div>

        <div className="flex items-center gap-4 text-[11px] text-slate-400 ml-auto flex-wrap">
          <span className="flex items-center gap-1 hover:text-white transition-colors">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>256-Bit SSL Encrypted Gateways</span>
          </span>
          <span className="hidden md:flex items-center gap-1 hover:text-white transition-colors">
            <Truck className="w-3.5 h-3.5 text-sky-400" />
            <span>Free Express Delivery over $50</span>
          </span>
          <span className="flex items-center gap-1 hover:text-white transition-colors">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>Live GPS Order Tracking</span>
          </span>
        </div>
      </div>
    </div>
  );
};
