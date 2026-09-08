import React, { useState } from 'react';
import { 
  X, 
  Heart, 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  Check, 
  Eye, 
  Sparkles,
  ShieldCheck,
  Star
} from 'lucide-react';
import { Product, Currency } from '../types';
import { formatPrice } from '../utils/formatters';

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  currency: Currency;
  onAddToCart: (product: Product, quantity?: number) => void;
  onRemoveFavorite: (productId: string) => void;
  onClearFavorites: () => void;
  onAddAllToCart: () => void;
  onExploreProducts: () => void;
  onQuickView: (product: Product) => void;
}

export const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({
  isOpen,
  onClose,
  products,
  currency,
  onAddToCart,
  onRemoveFavorite,
  onClearFavorites,
  onAddAllToCart,
  onExploreProducts,
  onQuickView
}) => {
  const [addedItemIds, setAddedItemIds] = useState<Record<string, boolean>>({});

  if (!isOpen) return null;

  const handleSingleAddToCart = (product: Product) => {
    onAddToCart(product, 1);
    setAddedItemIds(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItemIds(prev => ({ ...prev, [product.id]: false }));
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Dimmed backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out border-l border-slate-200">
          
          {/* Drawer Header */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-rose-50/50 via-slate-50/80 to-white">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shadow-xs">
                <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-bold text-slate-900 text-base font-['Outfit']">
                    Saved Favorites
                  </h2>
                  <span className="px-2 py-0.5 text-[11px] font-bold bg-rose-100 text-rose-700 rounded-full">
                    {products.length} {products.length === 1 ? 'item' : 'items'}
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  Quick access to items you love on Nobel Conect
                </p>
              </div>
            </div>

            <button
              id="close-favorites-drawer"
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              aria-label="Close favorites drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Action Header when items exist */}
          {products.length > 0 && (
            <div className="px-5 py-2.5 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-xs">
              <button
                id="favorites-add-all-btn"
                onClick={onAddAllToCart}
                className="inline-flex items-center gap-1.5 font-bold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Move All to Bag</span>
              </button>

              <button
                id="favorites-clear-all-btn"
                onClick={onClearFavorites}
                className="text-slate-400 hover:text-rose-600 transition-colors cursor-pointer text-[11px]"
              >
                Clear all favorites
              </button>
            </div>
          )}

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {products.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4 space-y-4">
                <div className="w-20 h-20 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-400">
                  <Heart className="w-10 h-10 stroke-[1.5]" />
                </div>
                <div className="space-y-1 max-w-xs">
                  <h3 className="font-bold text-slate-900 text-base font-['Outfit']">
                    Your Wishlist is Empty
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Click the heart icon on any product card across Nobel Conect to save items here for fast ordering or price tracking.
                  </p>
                </div>
                <button
                  id="favorites-empty-explore-btn"
                  onClick={() => {
                    onClose();
                    onExploreProducts();
                  }}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-600/20 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Discover Products</span>
                </button>
              </div>
            ) : (
              products.map((product) => {
                const isJustAdded = addedItemIds[product.id];
                const discountPercent = Math.round(
                  ((product.originalPrice - product.price) / product.originalPrice) * 100
                );

                return (
                  <div
                    key={product.id}
                    id={`favorite-item-${product.id}`}
                    className="p-3.5 bg-white rounded-2xl border border-slate-200/90 hover:border-slate-300 hover:shadow-md transition-all flex gap-3.5 group"
                  >
                    {/* Thumbnail */}
                    <div 
                      className="relative w-20 h-20 rounded-xl overflow-hidden bg-slate-100 shrink-0 cursor-pointer"
                      onClick={() => onQuickView(product)}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      {discountPercent > 0 && (
                        <span className="absolute bottom-1 left-1 bg-rose-600 text-white text-[9px] font-bold px-1 py-0.2 rounded-sm shadow-xs">
                          -{discountPercent}%
                        </span>
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 
                            onClick={() => onQuickView(product)}
                            className="font-bold text-slate-900 text-sm hover:text-indigo-600 transition-colors line-clamp-1 cursor-pointer font-['Outfit']"
                          >
                            {product.name}
                          </h4>
                          <button
                            id={`remove-favorite-btn-${product.id}`}
                            onClick={() => onRemoveFavorite(product.id)}
                            className="text-slate-300 hover:text-rose-500 transition-colors p-1 -mr-1 cursor-pointer"
                            title="Remove from favorites"
                            aria-label={`Remove ${product.name} from favorites`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                          {product.tagline}
                        </p>

                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center gap-1 text-amber-500 text-[11px] font-semibold">
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                            <span>{product.rating.toFixed(1)}</span>
                          </div>
                          <span className="text-[10px] text-slate-300">•</span>
                          <span className="text-[10px] font-medium text-emerald-600">
                            {product.stockCount < 10 ? `Only ${product.stockCount} left` : 'In Stock'}
                          </span>
                        </div>
                      </div>

                      {/* Price & Action Row */}
                      <div className="flex items-center justify-between pt-2 mt-1 border-t border-slate-100">
                        <div className="flex items-baseline gap-1.5">
                          <span className="font-extrabold text-sm text-slate-900 font-['Outfit']">
                            {formatPrice(product.price, currency)}
                          </span>
                          {product.originalPrice > product.price && (
                            <span className="text-[11px] text-slate-400 line-through">
                              {formatPrice(product.originalPrice, currency)}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => onQuickView(product)}
                            className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                            title="Quick preview"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>

                          <button
                            id={`fav-add-to-cart-${product.id}`}
                            onClick={() => handleSingleAddToCart(product)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                              isJustAdded
                                ? 'bg-emerald-600 text-white'
                                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs'
                            }`}
                          >
                            {isJustAdded ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                <span>Added</span>
                              </>
                            ) : (
                              <>
                                <ShoppingBag className="w-3.5 h-3.5" />
                                <span>Add to Bag</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Drawer Footer */}
          {products.length > 0 && (
            <div className="p-5 border-t border-slate-100 bg-slate-50/80 space-y-3">
              <div className="flex items-center gap-2 text-[11px] text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Items in your favorites remain saved in your browser. Prices and promotional codes apply at checkout.</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  id="favorites-continue-shopping-btn"
                  onClick={onClose}
                  className="py-2.5 px-3 rounded-xl border border-slate-200 hover:bg-white text-slate-700 font-bold text-xs transition-colors cursor-pointer text-center"
                >
                  Continue Browsing
                </button>
                <button
                  id="favorites-add-all-bottom-btn"
                  onClick={onAddAllToCart}
                  className="py-2.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/20 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add All to Cart</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
