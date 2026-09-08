import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  ShieldCheck, 
  Tag, 
  Truck,
  Sparkles,
  Lock
} from 'lucide-react';
import { CartItem, Currency } from '../types';
import { formatPrice } from '../utils/formatters';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: Currency;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: (discountAmount: number, promoCode: string) => void;
  onExploreProducts: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  currency,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  onExploreProducts
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  
  // Free shipping threshold = $50
  const freeShippingThreshold = 50;
  const progressToFreeShipping = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  // Discount calculation
  let discount = 0;
  if (appliedPromo === 'NOBEL10') {
    discount = subtotal * 0.10;
  } else if (appliedPromo === 'WELCOME20') {
    discount = subtotal * 0.20;
  }

  const handleApplyPromo = () => {
    setPromoError(null);
    const code = promoInput.trim().toUpperCase();
    if (code === 'NOBEL10' || code === 'WELCOME20') {
      setAppliedPromo(code);
      setPromoInput('');
    } else {
      setPromoError('Invalid coupon. Try NOBEL10 for 10% off.');
    }
  };

  const handleCheckoutClick = () => {
    onCheckout(discount, appliedPromo || '');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div 
        id="cart-slideover-drawer"
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-slate-200 animate-in slide-in-from-right duration-300"
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-bold text-slate-900 text-base font-['Outfit']">
                Your Shopping Cart
              </h2>
              <span className="text-xs text-slate-500">
                {items.reduce((sum, item) => sum + item.quantity, 0)} items selected
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="px-5 py-3 bg-indigo-50/80 border-b border-indigo-100 text-xs text-indigo-900">
          <div className="flex items-center justify-between font-semibold pb-1.5">
            <span className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-indigo-600" />
              {amountNeededForFreeShipping === 0 ? (
                <span className="text-emerald-700 font-bold">You unlocked Free Express Delivery!</span>
              ) : (
                <span>
                  Add <strong className="text-indigo-700">{formatPrice(amountNeededForFreeShipping, currency)}</strong> more for FREE shipping
                </span>
              )}
            </span>
            <span>{progressToFreeShipping}%</span>
          </div>
          <div className="w-full h-1.5 bg-indigo-200/80 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full transition-all duration-300"
              style={{ width: `${progressToFreeShipping}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-base">Your cart is empty</h4>
                <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                  Discover quality products, great value, and reliable service from Nobel Conect.
                </p>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onExploreProducts();
                }}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl shadow-md cursor-pointer transition-colors"
              >
                Browse Catalog
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.product.id}
                id={`cart-item-${item.product.id}`}
                className="flex items-center gap-3 p-3 bg-slate-50/80 rounded-xl border border-slate-200/80 hover:bg-slate-50 transition-colors"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-16 rounded-lg object-cover bg-white border border-slate-200 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 truncate font-['Outfit']">
                    {item.product.name}
                  </h4>
                  <div className="text-xs font-extrabold text-indigo-700 mt-0.5">
                    {formatPrice(item.product.price, currency)}
                  </div>
                  
                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center border border-slate-300 rounded-lg bg-white text-xs">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                        className="px-2 py-0.5 text-slate-600 hover:text-slate-900 font-bold"
                      >
                        -
                      </button>
                      <span className="px-2 font-bold text-slate-800 min-w-[20px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="px-2 py-0.5 text-slate-600 hover:text-slate-900 font-bold"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="text-slate-400 hover:text-rose-600 text-[11px] flex items-center gap-1 transition-colors p-1"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs font-bold text-slate-900 block font-['Outfit']">
                    {formatPrice(item.product.price * item.quantity, currency)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer with summary & checkout */}
        {items.length > 0 && (
          <div className="p-5 border-t border-slate-200 bg-slate-50/70 space-y-4">
            
            {/* Promo code input */}
            <div className="space-y-1.5">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Coupon code (e.g. NOBEL10)"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 bg-white border border-slate-300 rounded-xl text-xs placeholder-slate-400 uppercase font-medium focus:outline-hidden focus:border-indigo-500"
                  />
                  <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                </div>
                <button
                  onClick={handleApplyPromo}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-900 text-white font-semibold text-xs rounded-xl transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </div>

              {/* Sample Promo Badge */}
              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span>Try discount code:</span>
                <button
                  onClick={() => {
                    setAppliedPromo('NOBEL10');
                    setPromoError(null);
                  }}
                  className="inline-flex items-center gap-1 font-bold text-indigo-600 hover:underline"
                >
                  <Sparkles className="w-3 h-3" />
                  NOBEL10 (10% OFF)
                </button>
              </div>

              {promoError && (
                <p className="text-[11px] text-rose-600">{promoError}</p>
              )}
              {appliedPromo && (
                <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                  ✓ Code {appliedPromo} applied!
                </p>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-200">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-800">{formatPrice(subtotal, currency)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Discount ({appliedPromo})</span>
                  <span>-{formatPrice(discount, currency)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated Shipping</span>
                <span className="font-medium text-slate-800">
                  {amountNeededForFreeShipping === 0 ? 'FREE (Express eligible)' : 'Calculated at checkout'}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-200 text-sm font-black text-slate-900">
                <span>Estimated Total</span>
                <span className="text-base text-indigo-700 font-['Outfit']">
                  {formatPrice(Math.max(0, subtotal - discount), currency)}
                </span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              id="proceed-to-checkout-btn"
              onClick={handleCheckoutClick}
              className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-indigo-600/25 hover:shadow-indigo-500/40 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Lock className="w-4 h-4" />
              <span>Proceed to Secure Payment</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Security Guarantee badge */}
            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>256-Bit SSL Encrypted • 3D Secure Protection</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
