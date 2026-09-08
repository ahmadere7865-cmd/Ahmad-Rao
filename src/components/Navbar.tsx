import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Search, 
  MapPin, 
  Headphones, 
  Menu, 
  X, 
  Sparkles,
  ShieldCheck,
  ChevronDown,
  Heart
} from 'lucide-react';
import { Currency } from '../types';
import { CURRENCY_RATES } from '../utils/formatters';

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  wishlistCount?: number;
  onOpenFavorites?: () => void;
  onOpenTracker: () => void;
  onOpenSupport: () => void;
  onNavigateToWhyUs: () => void;
  currentCurrency: Currency;
  onCurrencyChange: (currency: Currency) => void;
  activeOrdersCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  searchQuery,
  onSearchChange,
  cartCount,
  onOpenCart,
  wishlistCount = 0,
  onOpenFavorites,
  onOpenTracker,
  onOpenSupport,
  onNavigateToWhyUs,
  currentCurrency,
  onCurrencyChange,
  activeOrdersCount = 1
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  return (
    <header id="main-header" className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Brand Logo */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-3 group text-left cursor-pointer"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-700 flex items-center justify-center text-white shadow-md shadow-indigo-600/20 group-hover:scale-105 transition-transform duration-200">
                <ShoppingBag className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-xl tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors font-['Outfit']">
                    Nobel Conect
                  </span>
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                    PRO
                  </span>
                </div>
                <span className="text-[11px] font-medium text-slate-500 tracking-wide">
                  Connecting You to Better Shopping
                </span>
              </div>
            </button>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-lg mx-4">
            <div className="relative w-full">
              <input
                id="search-input"
                type="text"
                placeholder="Search quality products, electronics, sound, lifestyle..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-9 py-2.5 bg-slate-100/90 border border-slate-200 rounded-xl text-sm placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all shadow-2xs"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 text-xs p-0.5 rounded-full hover:bg-slate-200"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Nav Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Currency Selector */}
            <div className="relative hidden sm:block">
              <button
                id="currency-selector-button"
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-indigo-600 rounded-lg hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200"
              >
                <span>{CURRENCY_RATES[currentCurrency].symbol} {currentCurrency}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>
              {currencyDropdownOpen && (
                <div className="absolute right-0 mt-1.5 w-28 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
                  {(['USD', 'EUR', 'GBP'] as Currency[]).map((curr) => (
                    <button
                      key={curr}
                      onClick={() => {
                        onCurrencyChange(curr);
                        setCurrencyDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-1.5 text-xs font-medium flex items-center justify-between hover:bg-indigo-50 hover:text-indigo-600 ${
                        currentCurrency === curr ? 'text-indigo-600 font-semibold bg-indigo-50/50' : 'text-slate-700'
                      }`}
                    >
                      <span>{curr}</span>
                      <span className="text-slate-400">{CURRENCY_RATES[curr].symbol}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Why Choose Us link */}
            <button
              id="why-choose-us-nav-btn"
              onClick={onNavigateToWhyUs}
              className="hidden lg:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-indigo-600 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
              <span>Why Choose Us</span>
            </button>

            {/* Track Order Button */}
            <button
              id="track-order-nav-btn"
              onClick={onOpenTracker}
              className="flex items-center gap-2 px-3 sm:px-3.5 py-2 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200/80 rounded-xl transition-all shadow-2xs group cursor-pointer"
              title="Real-Time Order Tracking"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <MapPin className="w-3.5 h-3.5 text-indigo-600 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline">Track Order</span>
              {activeOrdersCount > 0 && (
                <span className="ml-0.5 px-1.5 py-0.2 rounded-full bg-indigo-600 text-white text-[10px] font-bold">
                  {activeOrdersCount}
                </span>
              )}
            </button>

            {/* Customer Support Trigger */}
            <button
              id="support-nav-btn"
              onClick={onOpenSupport}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-indigo-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              title="Friendly Customer Support"
            >
              <Headphones className="w-3.5 h-3.5 text-slate-500" />
              <span>Support</span>
            </button>

            {/* Dedicated Favorites Section */}
            <button
              id="favorites-nav-btn"
              onClick={onOpenFavorites}
              className="relative flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-rose-600 rounded-xl hover:bg-rose-50 border border-transparent hover:border-rose-100 transition-all cursor-pointer group"
              title="View Saved Favorites"
            >
              <Heart 
                className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                  wishlistCount > 0 
                    ? 'text-rose-500 fill-rose-500' 
                    : 'text-slate-500 group-hover:text-rose-500 stroke-[2]'
                }`} 
              />
              <span className="hidden sm:inline">Favorites</span>
              {wishlistCount > 0 && (
                <span className="px-1.5 py-0.2 text-[10px] font-bold bg-rose-500 text-white rounded-full min-w-[18px] text-center shadow-2xs">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Cart Button */}
            <button
              id="open-cart-button"
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-3.5 sm:px-4 py-2 bg-slate-900 hover:bg-indigo-600 text-white rounded-xl text-xs font-semibold transition-all shadow-sm hover:shadow-indigo-500/25 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <span className="px-1.5 py-0.5 text-[11px] font-bold bg-indigo-500 text-white rounded-full min-w-[20px] text-center border-2 border-slate-900">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-indigo-600 md:hidden rounded-lg hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search & Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200 space-y-3 animate-in fade-in duration-150">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:bg-white"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
              <button
                id="mobile-favorites-btn"
                onClick={() => {
                  onOpenFavorites?.();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 p-2.5 bg-rose-50 text-rose-700 rounded-lg font-medium border border-rose-200"
              >
                <Heart className={`w-3.5 h-3.5 ${wishlistCount > 0 ? 'fill-rose-500 text-rose-500' : 'text-rose-600'}`} />
                <span>Favorites {wishlistCount > 0 ? `(${wishlistCount})` : ''}</span>
              </button>
              <button
                onClick={() => {
                  onNavigateToWhyUs();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 p-2.5 bg-slate-100 rounded-lg font-medium text-slate-800"
              >
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>Why Choose Us</span>
              </button>
              <button
                onClick={() => {
                  onOpenTracker();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 p-2.5 bg-indigo-50 text-indigo-700 rounded-lg font-medium border border-indigo-200"
              >
                <MapPin className="w-3.5 h-3.5 text-indigo-600" />
                <span>Track Order</span>
              </button>
              <button
                onClick={() => {
                  onOpenSupport();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 p-2.5 bg-slate-100 rounded-lg font-medium text-slate-800"
              >
                <Headphones className="w-3.5 h-3.5 text-slate-600" />
                <span>Customer Support</span>
              </button>
              <div className="col-span-2 flex items-center justify-center gap-1.5 p-2 bg-slate-100 rounded-lg font-medium text-slate-800">
                <span className="text-slate-500">Currency:</span>
                {(['USD', 'EUR', 'GBP'] as Currency[]).map((c) => (
                  <button
                    key={c}
                    onClick={() => onCurrencyChange(c)}
                    className={`px-1.5 py-0.5 rounded text-[11px] ${currentCurrency === c ? 'bg-indigo-600 text-white font-bold' : 'text-slate-600'}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
