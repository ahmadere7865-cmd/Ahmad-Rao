import React from 'react';
import { 
  ShoppingBag, 
  Coins, 
  Star, 
  Truck, 
  ShieldCheck, 
  MessageSquareHeart,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

interface WhyChooseUsProps {
  onExploreProducts: () => void;
  onOpenSupport: () => void;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({
  onExploreProducts,
  onOpenSupport
}) => {
  const pillars = [
    {
      icon: ShoppingBag,
      emoji: '🛍️',
      title: 'Wide Range of Products',
      subtitle: 'Curated Multicategory Selection',
      description: 'Explore high-grade personal audio, smart wear, intelligent home gadgets, and lifestyle essentials meticulously chosen for utility and durability.',
      badge: 'Diverse Catalog',
      iconBg: 'bg-blue-50 text-blue-600 border-blue-200'
    },
    {
      icon: Coins,
      emoji: '💰',
      title: 'Competitive Prices',
      subtitle: 'Maximum Value Guarantee',
      description: 'Direct supply-chain partnerships let us deliver premium craftsmanship at affordable, market-leading prices with frequent bundle promotions.',
      badge: 'Price-Match Value',
      iconBg: 'bg-emerald-50 text-emerald-600 border-emerald-200'
    },
    {
      icon: Star,
      emoji: '⭐',
      title: 'Quality-Focused Products',
      subtitle: 'Multi-Point Inspection',
      description: 'Every product is backed by a minimum 12-to-60 month warranty and undergoes stringent durability tests before receiving the Nobel Conect seal.',
      badge: 'Verified Standards',
      iconBg: 'bg-amber-50 text-amber-600 border-amber-200'
    },
    {
      icon: Truck,
      emoji: '🚚',
      title: 'Convenient Delivery',
      subtitle: 'Expedited & Live-Tracked',
      description: 'Choose Standard, Express Priority, or Same-Day delivery with real-time GPS tracking and transparent milestone updates right to your door.',
      badge: 'On-Time Dispatch',
      iconBg: 'bg-indigo-50 text-indigo-600 border-indigo-200'
    },
    {
      icon: ShieldCheck,
      emoji: '🔒',
      title: 'Secure & Simple Shopping',
      subtitle: '256-Bit SSL & 3D Secure Gateways',
      description: 'Shop with absolute peace of mind. We integrate Visa, Mastercard, Apple Pay, Google Pay, PayPal, and Klarna with zero data retention and tokenized checkout.',
      badge: 'Bank-Grade Security',
      iconBg: 'bg-purple-50 text-purple-600 border-purple-200'
    },
    {
      icon: MessageSquareHeart,
      emoji: '💬',
      title: 'Friendly Customer Support',
      subtitle: '24/7 Human-Centered Care',
      description: 'Our customer support team is always just a click away to assist with order tracking, product recommendations, or frictionless returns.',
      badge: 'Instant Assistance',
      iconBg: 'bg-rose-50 text-rose-600 border-rose-200'
    }
  ];

  return (
    <section id="why-choose-us-section" className="py-16 sm:py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider border border-indigo-100">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            The Nobel Conect Advantage
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-['Outfit']">
            Why Choose Nobel Conect?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            <span className="font-semibold text-slate-900">Nobel Conect — Your Connection to Quality, Value & Convenience.</span> We eliminate the guesswork from online shopping through dependable products, fortified payment processing, and real-time shipment transparency.
          </p>
        </div>

        {/* 6 Core Pillars Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                id={`why-choose-card-${idx}`}
                className="group relative bg-slate-50/70 hover:bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Icon & Badge */}
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border shadow-xs ${pillar.iconBg} group-hover:scale-110 transition-transform duration-200`}>
                      <Icon className="w-6 h-6 stroke-[2]" />
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-white text-slate-700 border border-slate-200 shadow-2xs">
                      {pillar.badge}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 group-hover:text-indigo-600 transition-colors font-['Outfit']">
                      <span>{pillar.emoji}</span>
                      <span>{pillar.title}</span>
                    </h3>
                    <div className="text-xs font-semibold text-indigo-600/90 mt-0.5">
                      {pillar.subtitle}
                    </div>
                  </div>

                  {/* Body text */}
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                {/* Subtle quality check indicator */}
                <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1 text-slate-600 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    Verified Standard
                  </span>
                  <span className="text-[11px] text-slate-400">Pillar 0{idx + 1}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Banner Promise */}
        <div className="mt-12 rounded-2xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-bold font-['Outfit']">
              Experience the Nobel Conect Difference Today
            </h3>
            <p className="text-indigo-200 text-xs sm:text-sm max-w-xl">
              Enjoy verified quality batches, 100% encrypted multi-gateway payment protection, and real-time live GPS tracking on all shipments.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onExploreProducts}
              className="px-5 py-2.5 bg-white text-indigo-900 hover:bg-indigo-50 font-bold text-xs sm:text-sm rounded-xl transition-colors shadow-sm cursor-pointer"
            >
              Start Shopping
            </button>
            <button
              onClick={onOpenSupport}
              className="px-5 py-2.5 bg-indigo-700/60 hover:bg-indigo-700 text-white font-medium text-xs sm:text-sm rounded-xl border border-indigo-400/30 transition-colors cursor-pointer"
            >
              Contact Support
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
