import React from 'react';
import { 
  ShoppingBag, 
  ShieldCheck, 
  Lock, 
  Truck, 
  Headphones, 
  CreditCard, 
  Sparkles,
  MapPin
} from 'lucide-react';

interface FooterProps {
  onOpenTracker: () => void;
  onOpenSupport: () => void;
  onNavigateToWhyUs: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenTracker,
  onOpenSupport,
  onNavigateToWhyUs
}) => {
  return (
    <footer id="main-footer" className="bg-slate-950 text-slate-300 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-column Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-700 flex items-center justify-center text-white shadow-md shadow-indigo-600/30">
                <ShoppingBag className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-xl text-white font-['Outfit']">
                  Nobel Conect
                </span>
                <span className="text-xs text-indigo-400 font-medium">
                  Connecting You to Better Shopping
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Welcome to Nobel Conect, your trusted online shopping destination for quality products, great value, and a convenient shopping experience. Our goal is to connect customers with products they love while making online shopping simple, secure, and enjoyable.
            </p>

            {/* Pillar badges */}
            <div className="flex flex-wrap gap-2 pt-1 text-[11px] text-slate-300">
              <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800">
                ⭐ Quality-Focused
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800">
                💰 Competitive Prices
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800">
                🔒 Secure Gateways
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800">
                🚚 Real-Time Tracking
              </span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-['Outfit']">
              Shopping & Exploration
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="hover:text-indigo-400 transition-colors"
                >
                  Featured Collections
                </button>
              </li>
              <li>
                <button
                  onClick={onNavigateToWhyUs}
                  className="hover:text-indigo-400 transition-colors"
                >
                  Why Choose Nobel Conect
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenTracker}
                  className="hover:text-indigo-400 transition-colors flex items-center gap-1.5"
                >
                  <MapPin className="w-3 h-3 text-emerald-400" />
                  <span>Real-Time Order Tracking</span>
                </button>
              </li>
              <li>
                <span className="text-slate-500">Curated Multi-Category</span>
              </li>
              <li>
                <span className="text-slate-500">Quality Batch Verifications</span>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-['Outfit']">
              Customer Satisfaction
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={onOpenSupport}
                  className="hover:text-indigo-400 transition-colors flex items-center gap-1.5"
                >
                  <Headphones className="w-3 h-3 text-indigo-400" />
                  <span>24/7 Friendly Support</span>
                </button>
              </li>
              <li>
                <span className="hover:text-slate-300">30-Day Money-Back Guarantee</span>
              </li>
              <li>
                <span className="hover:text-slate-300">Hassle-Free Returns</span>
              </li>
              <li>
                <span className="hover:text-slate-300">Warranty Registration</span>
              </li>
              <li>
                <span className="hover:text-slate-300">Delivery Speed Options</span>
              </li>
            </ul>
          </div>

          {/* Payment Gateways & Trust */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-['Outfit']">
              Verified Security
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2 text-slate-300">
                <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>256-Bit SSL Bank Encryption</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0" />
                <span>PCI-DSS Level 1 Compliant</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CreditCard className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>3D Secure Fraud Protection</span>
              </div>
            </div>

            {/* Gateway Brands */}
            <div className="pt-2 flex flex-wrap gap-2 text-[10px] font-bold text-slate-300">
              <span className="px-2 py-1 bg-slate-900 rounded border border-slate-800">VISA</span>
              <span className="px-2 py-1 bg-slate-900 rounded border border-slate-800">Mastercard</span>
              <span className="px-2 py-1 bg-slate-900 rounded border border-slate-800">Apple Pay</span>
              <span className="px-2 py-1 bg-slate-900 rounded border border-slate-800">Google Pay</span>
              <span className="px-2 py-1 bg-slate-900 rounded border border-slate-800">PayPal</span>
              <span className="px-2 py-1 bg-slate-900 rounded border border-slate-800">Klarna</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Nobel Conect. All rights reserved. Connecting You to Better Shopping.
          </div>
          <div className="flex items-center gap-6">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Security Compliance</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
