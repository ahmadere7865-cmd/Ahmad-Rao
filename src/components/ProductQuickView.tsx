import React, { useState, useEffect } from 'react';
import { 
  X, 
  Star, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Check, 
  ShoppingCart, 
  Zap,
  CheckCircle2,
  MessageSquare,
  Sparkles,
  Info,
  Award,
  Heart
} from 'lucide-react';
import { Product, Currency } from '../types';
import { formatPrice } from '../utils/formatters';
import { ProductReviewsSection } from './ProductReviewsSection';
import { getProductRatingStats } from '../data/reviewsData';

interface ProductQuickViewProps {
  product: Product | null;
  currency: Currency;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onBuyNow: (product: Product, quantity: number) => void;
  defaultTab?: 'details' | 'reviews';
  isFavorited?: boolean;
  onToggleWishlist?: (product: Product) => void;
}

export const ProductQuickView: React.FC<ProductQuickViewProps> = ({
  product,
  currency,
  onClose,
  onAddToCart,
  onBuyNow,
  defaultTab = 'details',
  isFavorited = false,
  onToggleWishlist
}) => {
  const [activeTab, setActiveTab] = useState<'details' | 'reviews'>('details');
  const [quantity, setQuantity] = useState(1);
  const [addedSuccess, setAddedSuccess] = useState(false);
  const [reviewCount, setReviewCount] = useState<number>(0);
  const [currentRating, setCurrentRating] = useState<number>(0);

  useEffect(() => {
    if (product) {
      setActiveTab(defaultTab);
      setQuantity(1);
      const stats = getProductRatingStats(product.id, product.rating, product.reviewCount);
      setReviewCount(stats.totalReviews);
      setCurrentRating(stats.averageRating);
    }
  }, [product, defaultTab]);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 1500);
  };

  const handleBuy = () => {
    onBuyNow(product, quantity);
  };

  const handleRefreshStats = () => {
    const stats = getProductRatingStats(product.id, product.rating, product.reviewCount);
    setReviewCount(stats.totalReviews);
    setCurrentRating(stats.averageRating);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        id="product-quickview-modal"
        className="relative bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]"
      >
        {/* Top Header Bar */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs uppercase font-extrabold tracking-widest text-indigo-300 font-mono">
              Nobel Conect Product Intelligence
            </span>
          </div>
          
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 pt-3 flex items-center gap-4 shrink-0">
          <button
            onClick={() => setActiveTab('details')}
            className={`pb-3 text-xs sm:text-sm font-bold transition-all border-b-2 cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'details'
                ? 'border-indigo-600 text-indigo-700'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Info className="w-4 h-4" />
            <span>Product Specifications & Highlights</span>
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-3 text-xs sm:text-sm font-bold transition-all border-b-2 cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'reviews'
                ? 'border-indigo-600 text-indigo-700'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Verified Customer Reviews & Ratings</span>
            <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-extrabold">
              {reviewCount || product.reviewCount}
            </span>
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {activeTab === 'details' ? (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              
              {/* Product Visual */}
              <div className="md:col-span-5 space-y-3">
                <div className="relative bg-slate-100 rounded-2xl aspect-square overflow-hidden border border-slate-200 flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {product.badge && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 bg-indigo-600 text-white text-[11px] font-bold uppercase rounded-lg shadow-sm">
                      {product.badge}
                    </span>
                  )}
                </div>

                {/* Batch Inspection Guarantee */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-slate-800">
                    <Award className="w-4 h-4 text-emerald-600" />
                    <span>Nobel Conect Certified Batch</span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Multi-point electrical, acoustic, and stress tested before warehouse intake.
                  </p>
                </div>
              </div>

              {/* Product Info & Actions */}
              <div className="md:col-span-7 space-y-5">
                <div>
                  {/* Rating & Stock row */}
                  <div className="flex items-center justify-between mb-2">
                    <button
                      onClick={() => setActiveTab('reviews')}
                      className="flex items-center gap-1.5 text-amber-500 font-bold text-xs hover:underline cursor-pointer group"
                    >
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span>{currentRating ? currentRating.toFixed(1) : product.rating.toFixed(1)}</span>
                      <span className="text-slate-400 group-hover:text-indigo-600">
                        ({reviewCount || product.reviewCount} reviews) →
                      </span>
                    </button>
                    <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                      In Stock ({product.stockCount} left in current batch)
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-['Outfit']">
                    {product.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    {product.tagline}
                  </p>
                </div>

                {/* Pricing with Savings */}
                <div className="flex items-baseline gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                  <span className="text-2xl sm:text-3xl font-black text-slate-900 font-['Outfit']">
                    {formatPrice(product.price, currency)}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-sm text-slate-400 line-through">
                      {formatPrice(product.originalPrice, currency)}
                    </span>
                  )}
                  <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md ml-auto">
                    Save {formatPrice(product.originalPrice - product.price, currency)}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {product.description}
                </p>

                {/* Key Features */}
                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                    Engineered Features
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {product.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Specifications Grid */}
                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                    Technical Specifications
                  </span>
                  <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
                    {Object.entries(product.specs).map(([key, val]) => (
                      <div key={key}>
                        <span className="text-slate-400 text-[10px] block uppercase">{key}</span>
                        <span className="font-semibold text-slate-800">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Guarantees */}
                <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 text-[11px] text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{product.warrantyMonths}m Warranty</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-indigo-500 shrink-0" />
                    <span>Real-Time GPS Tracking</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <RotateCcw className="w-4 h-4 text-sky-500 shrink-0" />
                    <span>30-Day Returns</span>
                  </div>
                </div>

                {/* Actions: Quantity & Add/Buy */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3">
                    {/* Quantity Control */}
                    <div className="flex items-center border border-slate-300 rounded-xl bg-slate-50">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3 py-2 text-slate-600 hover:text-slate-900 font-bold text-sm cursor-pointer"
                      >
                        -
                      </button>
                      <span className="px-2 font-bold text-sm text-slate-900 min-w-[28px] text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                        className="px-3 py-2 text-slate-600 hover:text-slate-900 font-bold text-sm cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    {/* Add to Cart */}
                    <button
                      id="modal-add-to-cart-btn"
                      onClick={handleAdd}
                      className={`flex-1 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        addedSuccess
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-900 hover:bg-slate-800 text-white'
                      }`}
                    >
                      {addedSuccess ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Added to Cart</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-4 h-4" />
                          <span>Add to Cart</span>
                        </>
                      )}
                    </button>

                    {/* Wishlist Heart Button */}
                    {onToggleWishlist && (
                      <button
                        id="modal-wishlist-toggle-btn"
                        onClick={() => onToggleWishlist(product)}
                        className={`p-3 rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                          isFavorited
                            ? 'bg-rose-50 border-rose-200 text-rose-600 shadow-xs'
                            : 'bg-slate-50 border-slate-300 text-slate-600 hover:text-rose-600 hover:bg-rose-50/50'
                        }`}
                        title={isFavorited ? 'Remove from favorites' : 'Save to favorites'}
                        aria-label={isFavorited ? 'Remove from favorites' : 'Save to favorites'}
                      >
                        <Heart className={`w-5 h-5 transition-transform ${isFavorited ? 'fill-rose-500 text-rose-500' : 'stroke-[2]'}`} />
                      </button>
                    )}
                  </div>

                  {/* Instant Buy Now Button */}
                  <button
                    id="modal-buy-now-btn"
                    onClick={handleBuy}
                    className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2 cursor-pointer transition-all"
                  >
                    <Zap className="w-4 h-4 fill-white" />
                    <span>Instant Secure Checkout with Stripe, PayPal or Square</span>
                  </button>
                </div>

              </div>
            </div>
          ) : (
            <div>
              <ProductReviewsSection
                product={product}
                onReviewAdded={handleRefreshStats}
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <span>Nobel Conect Verified Product ID: {product.id}</span>
          <button
            onClick={onClose}
            className="font-semibold text-slate-700 hover:text-slate-900 cursor-pointer"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};
