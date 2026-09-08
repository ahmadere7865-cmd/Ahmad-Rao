import React from 'react';
import { Star, ShoppingCart, Eye, Shield, Check, Heart } from 'lucide-react';
import { Product, Currency } from '../types';
import { formatPrice } from '../utils/formatters';

interface ProductCardProps {
  product: Product;
  currency: Currency;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product, tab?: 'details' | 'reviews') => void;
  isAdded?: boolean;
  isFavorited?: boolean;
  onToggleWishlist?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  currency,
  onAddToCart,
  onQuickView,
  isAdded = false,
  isFavorited = false,
  onToggleWishlist
}) => {
  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <div 
      id={`product-card-${product.id}`}
      className="group bg-white rounded-2xl border border-slate-200/90 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 overflow-hidden flex flex-col justify-between"
    >
      <div>
        {/* Product Image Container */}
        <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />

          {/* Badge */}
          {product.badge && (
            <div className="absolute top-3 left-3 z-10">
              <span className={`px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider rounded-lg shadow-xs ${
                product.badge === 'Quality Pick' 
                  ? 'bg-amber-500 text-white'
                  : product.badge === 'Bestseller'
                  ? 'bg-indigo-600 text-white'
                  : product.badge === 'Best Value'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-900 text-white'
              }`}>
                {product.badge}
              </span>
            </div>
          )}

          {/* Top Right: Savings Pill & Wishlist Heart Button */}
          <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5">
            {discountPercent > 0 && (
              <span className="px-2 py-0.5 text-[11px] font-bold bg-rose-50 text-rose-600 border border-rose-200 rounded-md shadow-2xs">
                Save {discountPercent}%
              </span>
            )}

            {/* Heart Wishlist Button */}
            {onToggleWishlist && (
              <button
                id={`wishlist-btn-${product.id}`}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleWishlist(product);
                }}
                aria-label={isFavorited ? `Remove ${product.name} from favorites` : `Save ${product.name} to favorites`}
                title={isFavorited ? 'Remove from favorites' : 'Save to favorites'}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 shadow-xs border cursor-pointer ${
                  isFavorited
                    ? 'bg-white text-rose-500 border-rose-200 shadow-rose-500/20 scale-105'
                    : 'bg-white/90 hover:bg-white text-slate-500 hover:text-rose-500 border-slate-200/80 hover:border-rose-200 hover:scale-105'
                }`}
              >
                <Heart
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isFavorited ? 'fill-rose-500 text-rose-500' : 'stroke-[2]'
                  }`}
                />
              </button>
            )}
          </div>

          {/* Quick View Hover Button */}
          <div className="absolute inset-0 bg-slate-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none group-hover:pointer-events-auto">
            <button
              onClick={() => onQuickView(product, 'details')}
              className="px-4 py-2 bg-white/95 hover:bg-white text-slate-800 text-xs font-bold rounded-xl shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-all cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-indigo-600" />
              <span>Quick Preview</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-2.5">
          {/* Rating & Stock */}
          <div className="flex items-center justify-between text-xs">
            <button
              onClick={() => onQuickView(product, 'reviews')}
              className="flex items-center gap-1 text-amber-500 font-semibold hover:text-indigo-600 transition-colors cursor-pointer group/rate"
              title="Click to view verified customer reviews"
            >
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating.toFixed(1)}</span>
              <span className="text-slate-400 font-normal group-hover/rate:text-indigo-600 group-hover/rate:underline">({product.reviewCount})</span>
            </button>
            <span className="text-[11px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
              {product.stockCount < 10 ? `Only ${product.stockCount} left` : 'In Stock'}
            </span>
          </div>

          {/* Title & Tagline */}
          <div>
            <h3 
              onClick={() => onQuickView(product, 'details')}
              className="font-bold text-slate-900 text-base group-hover:text-indigo-600 transition-colors cursor-pointer line-clamp-1 font-['Outfit']"
            >
              {product.name}
            </h3>
            <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
              {product.tagline}
            </p>
          </div>

          {/* Warranty tag */}
          <div className="flex items-center gap-1 text-[11px] text-slate-500 pt-1">
            <Shield className="w-3 h-3 text-indigo-500" />
            <span>{product.warrantyMonths}-Month Nobel Guarantee</span>
          </div>
        </div>
      </div>

      {/* Footer Price & Add To Cart Button */}
      <div className="p-5 pt-0 mt-auto">
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-black text-slate-900 font-['Outfit']">
                {formatPrice(product.price, currency)}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-slate-400 line-through">
                  {formatPrice(product.originalPrice, currency)}
                </span>
              )}
            </div>
            <span className="text-[10px] text-slate-400 block">Free delivery eligible</span>
          </div>

          <button
            id={`add-to-cart-btn-${product.id}`}
            onClick={() => onAddToCart(product)}
            className={`px-3.5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs cursor-pointer ${
              isAdded 
                ? 'bg-emerald-600 text-white' 
                : 'bg-slate-900 hover:bg-indigo-600 text-white hover:shadow-indigo-500/20'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
