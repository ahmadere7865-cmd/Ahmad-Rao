import React from 'react';
import { 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  MapPin, 
  Award, 
  ArrowRight,
  Headphones,
  CheckCircle2,
  Lock
} from 'lucide-react';

interface HeroSectionProps {
  onExploreClick: () => void;
  onOpenTracker: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onOpenTracker
}) => {
  return (
    <section id="hero-section" className="relative overflow-hidden bg-gradient-to-b from-indigo-900 via-slate-900 to-slate-950 text-white pt-12 pb-16 sm:pt-16 sm:pb-20">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-indigo-500/15 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-blue-500/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Copy */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Official Online Store • Connecting You to Better Shopping
            </div>

            <h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight font-['Outfit'] leading-[1.15]"
              style={{ color: '#02ff09' }}
            >
              Connecting You to <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-sky-200 to-white">
                Better Shopping
              </span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Welcome to <span className="font-semibold text-white">Nobel Conect</span>, your trusted online destination for quality products, great value, and a seamless shopping journey. We focus on <span className="text-indigo-200 font-medium">quality, affordability, customer satisfaction, and reliable service</span> — making every step from discovery to doorstep simple and secure.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                id="hero-explore-catalog-btn"
                onClick={onExploreClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold text-sm shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/50 transition-all duration-200 cursor-pointer group"
              >
                <span>Browse Products</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-track-order-btn"
                onClick={onOpenTracker}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-800/80 hover:bg-slate-700/90 text-slate-200 hover:text-white rounded-xl font-semibold text-sm border border-slate-700 hover:border-slate-600 backdrop-blur-sm transition-all duration-200 cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>Live Order Tracking</span>
              </button>
            </div>

            {/* Quick Guarantees Pill List */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Verified Quality Batch Testing</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-sky-400" />
                <span>256-Bit SSL Encrypted Gateways</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-indigo-400" />
                <span>Doorstep GPS Tracking</span>
              </div>
            </div>
          </div>

          {/* Interactive Hero Visual Card: Live Shopping & Tracking Snapshot */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md bg-slate-800/60 border border-slate-700/70 rounded-2xl p-5 shadow-2xl backdrop-blur-md">
              {/* Floating notification badge */}
              <div className="absolute -top-3.5 -right-2 sm:right-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5 border border-emerald-300/30">
                <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                Live Order Radar Active
              </div>

              {/* Sample Dispatch Tracker Card */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-700/70 pb-3">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Active Dispatch</span>
                    <h2 className="text-sm font-bold text-white flex items-center gap-2">
                      <span>Order #NC-88421</span>
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-md border border-emerald-500/30 font-semibold">
                        Out for Delivery
                      </span>
                    </h2>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block">Estimated Arrival</span>
                    <span className="text-xs font-bold text-indigo-300">Within 35 mins</span>
                  </div>
                </div>

                {/* Mini Visual Route Representation */}
                <div className="bg-slate-900/80 rounded-xl p-3.5 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-300 font-medium">
                    <span className="flex items-center gap-1.5 text-slate-400">
                      <Truck className="w-3.5 h-3.5 text-indigo-400" />
                      Nobel Express Logistics
                    </span>
                    <span className="text-emerald-400 font-semibold">80% Completed</span>
                  </div>
                  {/* Progress bar */}
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-indigo-500 via-sky-400 to-emerald-400 rounded-full w-[80%]" />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                    <span>Fulfillment Center #3</span>
                    <span className="text-slate-200 font-medium">Driver: Marcus V.</span>
                    <span className="text-emerald-400">Doorstep Near</span>
                  </div>
                </div>

                {/* Gateway Verification Ribbon */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/20">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-300">
                      <CreditCard className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Verified Payment Gateways</div>
                      <div className="text-[10px] text-slate-400">Visa, Mastercard, Apple Pay, PayPal, Klarna</div>
                    </div>
                  </div>
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                </div>

                {/* Quick Action */}
                <button
                  id="hero-preview-tracker-action"
                  onClick={onOpenTracker}
                  className="w-full py-2.5 bg-slate-700/70 hover:bg-slate-700 text-xs font-semibold text-slate-200 hover:text-white rounded-lg transition-colors border border-slate-600/50 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Open Interactive Tracker & Simulation</span>
                  <ArrowRight className="w-3.5 h-3.5 text-indigo-400" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
