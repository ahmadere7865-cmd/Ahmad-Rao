import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  CreditCard, 
  CheckCircle2, 
  Truck, 
  Building2, 
  ArrowRight,
  Sparkles,
  Smartphone,
  Wallet,
  AlertCircle,
  HelpCircle,
  Clock,
  QrCode,
  Check
} from 'lucide-react';
import { CartItem, Currency, CustomerDetails, Order, PaymentMethodType, ShippingMethod } from '../types';
import { SHIPPING_METHODS } from '../data/mockProducts';
import { formatPrice } from '../utils/formatters';
import { saveOrder } from '../data/sampleOrders';

interface SecureCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: Currency;
  discountAmount: number;
  promoCode: string;
  onOrderSuccess: (order: Order) => void;
}

export const SecureCheckoutModal: React.FC<SecureCheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  currency,
  discountAmount,
  promoCode,
  onOrderSuccess
}) => {
  // Step: 'details' -> 'payment' -> '3d_secure' -> 'processing'
  const [step, setStep] = useState<'details' | 'payment' | '3d_secure' | 'processing'>('details');

  // Customer Form
  const [customer, setCustomer] = useState<CustomerDetails>({
    fullName: 'Alex Vance',
    email: 'alex.vance@example.com',
    phone: '+1 (555) 439-0129',
    address: '450 Silicon Avenue, Suite 300',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94107',
    country: 'United States',
    deliveryNotes: 'Leave with front desk or secure parcel locker'
  });

  // Shipping selection
  const [selectedShipping, setSelectedShipping] = useState<ShippingMethod>(SHIPPING_METHODS[0]);

  // Payment method selection: default to 'stripe'
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('stripe');

  // Stripe / Card details
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('888');
  const [cardHolder, setCardHolder] = useState('ALEX VANCE');
  const [saveCardForFuture, setSaveCardForFuture] = useState(true);

  // Square specific details
  const [squareSubMethod, setSquareSubMethod] = useState<'square_pay' | 'cash_app' | 'square_card'>('square_pay');
  const [cashAppTag, setCashAppTag] = useState('$alexvance');

  // Form error validation
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [processingMessage, setProcessingMessage] = useState('Initializing 256-Bit SSL Handshake...');

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const tax = (subtotal - discountAmount) * 0.08; // 8% sales tax
  const total = Math.max(0, subtotal - discountAmount + selectedShipping.price + tax);

  // Card Brand Detection
  const getCardBrand = (num: string) => {
    const clean = num.replace(/\D/g, '');
    if (clean.startsWith('4')) return { brand: 'Visa', color: 'from-blue-600 to-indigo-900', logo: 'VISA' };
    if (clean.startsWith('5')) return { brand: 'Mastercard', color: 'from-red-600 to-amber-700', logo: 'MASTERCARD' };
    if (clean.startsWith('3')) return { brand: 'American Express', color: 'from-sky-700 to-slate-900', logo: 'AMEX' };
    return { brand: 'Credit / Debit Card', color: 'from-slate-800 to-slate-950', logo: 'STRIPE' };
  };

  const cardInfo = getCardBrand(cardNumber);

  const validateDetails = (): boolean => {
    const errors: Record<string, string> = {};
    if (!customer.fullName.trim()) errors.fullName = 'Name is required';
    if (!customer.email.trim() || !customer.email.includes('@')) errors.email = 'Valid email is required';
    if (!customer.address.trim()) errors.address = 'Street address is required';
    if (!customer.city.trim()) errors.city = 'City is required';
    if (!customer.zipCode.trim()) errors.zipCode = 'ZIP / Postal code is required';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateDetails()) {
      setStep('payment');
    }
  };

  const handleExecutePayment = () => {
    if (paymentMethod === 'stripe' || paymentMethod === 'card') {
      // Show simulated 3D Secure bank verification
      setStep('3d_secure');
    } else {
      finalizeOrderPayment();
    }
  };

  const finalizeOrderPayment = () => {
    setStep('processing');
    setProcessingMessage('Connecting to Verified Gateway Gateway...');

    setTimeout(() => {
      if (paymentMethod === 'stripe' || paymentMethod === 'card') {
        setProcessingMessage('Stripe Elements Tokenizing Card with AES-256...');
      } else if (paymentMethod === 'paypal') {
        setProcessingMessage('PayPal Express 1-Click Vault Authorization Verified...');
      } else if (paymentMethod === 'square') {
        setProcessingMessage('Square Web Payments SDK Encrypted Handshake Confirmed...');
      } else {
        setProcessingMessage('Tokenizing Credentials with 256-Bit SSL...');
      }
    }, 800);

    setTimeout(() => {
      setProcessingMessage('Payment Authorized • Reserving Quality Tested Batch...');
    }, 1600);

    setTimeout(() => {
      // Fire celebration confetti
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // ignore
      }

      const randomOrderNum = Math.floor(10000 + Math.random() * 90000);
      const newOrderId = `NC-${randomOrderNum}`;

      // Resolve Gateway Name
      let gatewayTitle = 'Stripe PCI-DSS Level 1 Gateway';
      let cardLastDigits: string | undefined = cardNumber.slice(-4) || '4242';
      let cardBrandDisplay = cardInfo.brand;

      if (paymentMethod === 'paypal') {
        gatewayTitle = 'PayPal Express & Pay-in-4';
        cardLastDigits = undefined;
        cardBrandDisplay = 'PayPal Account';
      } else if (paymentMethod === 'square') {
        gatewayTitle = squareSubMethod === 'cash_app' ? 'Square Cash App Pay' : 'Square Web Payments SDK';
        cardLastDigits = squareSubMethod === 'square_card' ? '8814' : undefined;
        cardBrandDisplay = squareSubMethod === 'cash_app' ? 'Cash App Pay' : 'Square Pay Token';
      } else if (paymentMethod === 'apple_pay') {
        gatewayTitle = 'Apple Pay Biometric Tokenizer';
        cardLastDigits = undefined;
        cardBrandDisplay = 'Apple Card / Device Account';
      } else if (paymentMethod === 'google_pay') {
        gatewayTitle = 'Google Pay Encrypted Vault';
        cardLastDigits = undefined;
        cardBrandDisplay = 'Google Pay';
      } else if (paymentMethod === 'klarna') {
        gatewayTitle = 'Klarna Pay in 4 Installments';
        cardLastDigits = undefined;
        cardBrandDisplay = 'Klarna Credit';
      } else if (paymentMethod === 'cod') {
        gatewayTitle = 'Escrow Cash on Delivery';
        cardLastDigits = undefined;
        cardBrandDisplay = 'Doorstep Escrow';
      }

      const newOrder: Order = {
        id: newOrderId,
        createdAt: new Date().toISOString(),
        items: [...items],
        subtotal,
        discount: discountAmount,
        shippingFee: selectedShipping.price,
        tax,
        total,
        customer: { ...customer },
        shippingMethod: selectedShipping,
        paymentMethod,
        paymentDetails: {
          gateway: gatewayTitle,
          transactionId: `txn_nc_${Math.random().toString(36).substring(2, 11)}`,
          cardLast4: cardLastDigits,
          cardBrand: cardBrandDisplay,
          status: 'captured',
          verifiedAt: new Date().toLocaleTimeString()
        },
        tracking: {
          currentStatus: 'order_confirmed',
          trackingNumber: `NC-TRK-${randomOrderNum}-US`,
          carrierName: 'Nobel Express Logistics',
          estimatedArrival: selectedShipping.estimatedDelivery,
          currentLocationName: 'Nobel Conect Automated Fulfillment Hub #2',
          progressPercentage: 15,
          courierDriver: {
            name: 'Jordan Rivera',
            phone: '+1 (555) 392-8812',
            vehicle: 'Nobel Electric Van #28',
            licensePlate: '8NC552',
            rating: 4.95,
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
          },
          liveRoute: {
            startLocation: { name: 'Nobel Regional Hub #2', x: 15, y: 75 },
            currentLocation: { name: 'Nobel Regional Hub #2', x: 15, y: 75 },
            destinationLocation: { name: `${customer.city} (${customer.zipCode})`, x: 88, y: 25 }
          },
          events: [
            {
              id: 'ev-1',
              status: 'order_confirmed',
              title: 'Order Placed & Payment Authorized',
              description: `Transaction verified via ${gatewayTitle}. Zero merchant card storage. Invoice generated.`,
              location: 'Nobel Conect Secure Cloud Server',
              timestamp: 'Just now',
              completed: true,
              current: true
            },
            {
              id: 'ev-2',
              status: 'quality_checked',
              title: 'Quality Inspection & Barcode Scan',
              description: 'Item batch verified against durability checklist and serial numbers recorded.',
              location: 'Bay 12 Packing Facility',
              timestamp: 'Estimated in 2 hours',
              completed: false
            },
            {
              id: 'ev-3',
              status: 'dispatched',
              title: 'Dispatched to Transit Hub',
              description: 'Loaded onto regional electric freight with active GPS tracker.',
              location: 'Express Logistics Depot',
              timestamp: 'Awaiting hand-off',
              completed: false
            },
            {
              id: 'ev-4',
              status: 'out_for_delivery',
              title: 'Doorstep Delivery Route',
              description: 'Assigned to local driver Jordan Rivera for direct delivery.',
              location: 'Local Neighborhood Zone',
              timestamp: 'Scheduled upon arrival',
              completed: false
            },
            {
              id: 'ev-5',
              status: 'delivered',
              title: 'Delivered & Signature Verification',
              description: 'Delivered securely to your specified address.',
              location: customer.address,
              timestamp: 'Awaiting dispatch',
              completed: false
            }
          ]
        }
      };

      saveOrder(newOrder);
      onOrderSuccess(newOrder);
    }, 2400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        id="secure-checkout-modal"
        className="relative bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden"
      >
        {/* Top Trust Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300">
              <Lock className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base tracking-tight font-['Outfit']">
                  Nobel Conect Secure Checkout
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  PCI-DSS Level 1
                </span>
              </div>
              <p className="text-xs text-slate-400">
                End-to-end tokenized gateways (Stripe, PayPal, Square) with 256-bit encryption
              </p>
            </div>
          </div>
          {step !== 'processing' && (
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Breadcrumb Steps */}
        <div className="px-6 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs font-semibold">
          <div className="flex items-center gap-2">
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
              step === 'details' ? 'bg-indigo-600 text-white' : 'bg-emerald-600 text-white'
            }`}>
              {step !== 'details' ? '✓' : '1'}
            </span>
            <span className={step === 'details' ? 'text-indigo-600 font-bold' : 'text-slate-600'}>
              Shipping Details
            </span>
          </div>
          <span className="text-slate-300">→</span>
          <div className="flex items-center gap-2">
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
              step === 'payment' || step === '3d_secure' || step === 'processing'
                ? 'bg-indigo-600 text-white' 
                : 'bg-slate-200 text-slate-600'
            }`}>
              2
            </span>
            <span className={step === 'payment' ? 'text-indigo-600 font-bold' : 'text-slate-600'}>
              Payment Gateways (Stripe, PayPal, Square)
            </span>
          </div>
          <span className="text-slate-300">→</span>
          <div className="flex items-center gap-2">
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
              step === 'processing' ? 'bg-emerald-600 text-white animate-pulse' : 'bg-slate-200 text-slate-600'
            }`}>
              3
            </span>
            <span className={step === 'processing' ? 'text-emerald-600 font-bold' : 'text-slate-600'}>
              Live Tracking
            </span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          
          {/* STEP 1: Shipping Details */}
          {step === 'details' && (
            <form onSubmit={handleProceedToPayment} className="space-y-5">
              
              {/* Customer Contact */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-indigo-600" />
                  Contact & Shipping Address
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={customer.fullName}
                      onChange={(e) => setCustomer({ ...customer, fullName: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:border-indigo-600"
                      placeholder="e.g. Alex Vance"
                    />
                    {formErrors.fullName && <p className="text-[10px] text-rose-600 mt-0.5">{formErrors.fullName}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Email (for live tracking alerts)</label>
                    <input
                      type="email"
                      value={customer.email}
                      onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:border-indigo-600"
                      placeholder="alex@example.com"
                    />
                    {formErrors.email && <p className="text-[10px] text-rose-600 mt-0.5">{formErrors.email}</p>}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Street Address</label>
                    <input
                      type="text"
                      value={customer.address}
                      onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:border-indigo-600"
                      placeholder="e.g. 450 Silicon Avenue, Suite 300"
                    />
                    {formErrors.address && <p className="text-[10px] text-rose-600 mt-0.5">{formErrors.address}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">City</label>
                    <input
                      type="text"
                      value={customer.city}
                      onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:border-indigo-600"
                      placeholder="San Francisco"
                    />
                    {formErrors.city && <p className="text-[10px] text-rose-600 mt-0.5">{formErrors.city}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">State</label>
                      <input
                        type="text"
                        value={customer.state}
                        onChange={(e) => setCustomer({ ...customer, state: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:border-indigo-600"
                        placeholder="CA"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">ZIP Code</label>
                      <input
                        type="text"
                        value={customer.zipCode}
                        onChange={(e) => setCustomer({ ...customer, zipCode: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:border-indigo-600"
                        placeholder="94107"
                      />
                      {formErrors.zipCode && <p className="text-[10px] text-rose-600 mt-0.5">{formErrors.zipCode}</p>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Shipping Method Selection */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-indigo-600" />
                  Select Delivery Option
                </h4>

                <div className="space-y-2">
                  {SHIPPING_METHODS.map((method) => (
                    <label
                      key={method.id}
                      className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        selectedShipping.id === method.id
                          ? 'border-indigo-600 bg-indigo-50/50 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shipping_method"
                          checked={selectedShipping.id === method.id}
                          onChange={() => setSelectedShipping(method)}
                          className="text-indigo-600 focus:ring-indigo-500"
                        />
                        <div>
                          <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                            <span>{method.name}</span>
                            <span className="text-[10px] font-medium text-slate-500">
                              ({method.estimatedDelivery})
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-500 mt-0.5">{method.description}</div>
                        </div>
                      </div>
                      <span className="text-xs font-black text-slate-900 font-['Outfit']">
                        {method.price === 0 ? 'FREE' : formatPrice(method.price, currency)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-400 block">Total Due</span>
                  <span className="text-lg font-black text-indigo-700 font-['Outfit']">
                    {formatPrice(total, currency)}
                  </span>
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md flex items-center gap-2 transition-all cursor-pointer"
                >
                  <span>Select Payment Gateway</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: Secure Payment Gateways */}
          {step === 'payment' && (
            <div className="space-y-6">
              
              {/* Payment Gateway Tabs */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    Select Secure Payment Gateway
                  </h4>
                  <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 font-semibold flex items-center gap-1">
                    <Lock className="w-3 h-3 text-emerald-600" />
                    PCI-DSS Level 1 Compliant
                  </span>
                </div>

                {/* Primary Gateways Grid (Stripe, PayPal, Square featured first) */}
                <div className="grid grid-cols-3 gap-2 mb-2">
                  {/* Stripe */}
                  <button
                    onClick={() => setPaymentMethod('stripe')}
                    className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                      paymentMethod === 'stripe' || paymentMethod === 'card'
                        ? 'border-indigo-600 bg-indigo-50/70 shadow-xs ring-2 ring-indigo-600/30'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs font-mono">
                        S
                      </div>
                      {(paymentMethod === 'stripe' || paymentMethod === 'card') && (
                        <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                      )}
                    </div>
                    <div className="mt-2">
                      <div className="text-xs font-extrabold text-slate-900">Stripe</div>
                      <div className="text-[10px] text-slate-500">Cards & 3D Secure 2</div>
                    </div>
                  </button>

                  {/* PayPal */}
                  <button
                    onClick={() => setPaymentMethod('paypal')}
                    className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                      paymentMethod === 'paypal'
                        ? 'border-indigo-600 bg-indigo-50/70 shadow-xs ring-2 ring-indigo-600/30'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-sky-600 font-sans tracking-tight">PayPal</span>
                      {paymentMethod === 'paypal' && <CheckCircle2 className="w-4 h-4 text-indigo-600" />}
                    </div>
                    <div className="mt-2">
                      <div className="text-xs font-extrabold text-slate-900">PayPal</div>
                      <div className="text-[10px] text-slate-500">1-Click & Pay in 4</div>
                    </div>
                  </button>

                  {/* Square */}
                  <button
                    onClick={() => setPaymentMethod('square')}
                    className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                      paymentMethod === 'square'
                        ? 'border-indigo-600 bg-indigo-50/70 shadow-xs ring-2 ring-indigo-600/30'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-5 h-5 rounded-md bg-slate-900 text-white flex items-center justify-center font-bold text-[10px]">
                        ■
                      </div>
                      {paymentMethod === 'square' && <CheckCircle2 className="w-4 h-4 text-indigo-600" />}
                    </div>
                    <div className="mt-2">
                      <div className="text-xs font-extrabold text-slate-900">Square</div>
                      <div className="text-[10px] text-slate-500">Square & Cash App</div>
                    </div>
                  </button>
                </div>

                {/* Secondary Alternatives (Apple Pay, Google Pay, Klarna, COD) */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    onClick={() => setPaymentMethod('apple_pay')}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      paymentMethod === 'apple_pay'
                        ? 'border-indigo-600 bg-indigo-50/60 ring-1 ring-indigo-600'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="text-[11px] font-bold text-slate-900 flex items-center gap-1">
                      <Smartphone className="w-3.5 h-3.5 text-slate-700" />
                      <span>Apple Pay</span>
                    </div>
                    <div className="text-[9px] text-slate-500">Touch/Face ID</div>
                  </button>

                  <button
                    onClick={() => setPaymentMethod('google_pay')}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      paymentMethod === 'google_pay'
                        ? 'border-indigo-600 bg-indigo-50/60 ring-1 ring-indigo-600'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="text-[11px] font-bold text-slate-900 flex items-center gap-1">
                      <Wallet className="w-3.5 h-3.5 text-blue-600" />
                      <span>Google Pay</span>
                    </div>
                    <div className="text-[9px] text-slate-500">Fast 1-Tap</div>
                  </button>

                  <button
                    onClick={() => setPaymentMethod('klarna')}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      paymentMethod === 'klarna'
                        ? 'border-indigo-600 bg-indigo-50/60 ring-1 ring-indigo-600'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="text-[11px] font-bold text-slate-900 flex items-center gap-1">
                      <span className="text-pink-600 font-black text-xs">Klarna.</span>
                    </div>
                    <div className="text-[9px] text-slate-500">4 Payments</div>
                  </button>

                  <button
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      paymentMethod === 'cod'
                        ? 'border-indigo-600 bg-indigo-50/60 ring-1 ring-indigo-600'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="text-[11px] font-bold text-slate-900 flex items-center gap-1">
                      <Truck className="w-3.5 h-3.5 text-amber-600" />
                      <span>COD Escrow</span>
                    </div>
                    <div className="text-[9px] text-slate-500">Pay at Door</div>
                  </button>
                </div>
              </div>

              {/* GATEWAY 1: STRIPE ELEMENTS UI */}
              {(paymentMethod === 'stripe' || paymentMethod === 'card') && (
                <div className="space-y-4 bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800 flex items-center gap-1.5">
                      <CreditCard className="w-4 h-4 text-indigo-600" />
                      Stripe Elements Card Form
                    </span>
                    <span className="text-[10px] text-indigo-600 font-semibold bg-indigo-100/70 px-2 py-0.5 rounded">
                      AES-256 Client Tokenized
                    </span>
                  </div>

                  {/* Virtual Card Preview */}
                  <div className={`p-4 sm:p-5 rounded-2xl bg-gradient-to-r ${cardInfo.color} text-white shadow-lg space-y-4`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5 text-white/80" />
                        <span className="text-[10px] uppercase font-bold tracking-widest text-white/80">Nobel Conect Secure</span>
                      </div>
                      <span className="text-sm font-black tracking-wider">{cardInfo.logo}</span>
                    </div>

                    <div className="font-mono text-base sm:text-lg tracking-widest font-semibold py-1">
                      {cardNumber || '•••• •••• •••• ••••'}
                    </div>

                    <div className="flex items-end justify-between text-xs text-white/90">
                      <div>
                        <span className="text-[9px] uppercase tracking-wider block text-white/70">Cardholder</span>
                        <span className="font-bold">{cardHolder || 'VALUED CUSTOMER'}</span>
                      </div>
                      <div>
                        <span className="text-[9px] uppercase tracking-wider block text-white/70">Expires</span>
                        <span className="font-bold">{cardExpiry || 'MM/YY'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Stripe Inputs */}
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Card Number</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          placeholder="4242 4242 4242 4242"
                          maxLength={19}
                          className="w-full pl-9 pr-3 py-2 text-xs font-mono bg-white border border-slate-300 rounded-xl focus:outline-hidden focus:border-indigo-600"
                        />
                        <CreditCard className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Expiration</label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="MM/YY"
                          maxLength={5}
                          className="w-full px-3 py-2 text-xs font-mono bg-white border border-slate-300 rounded-xl focus:outline-hidden focus:border-indigo-600 text-center"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center justify-between">
                          <span>CVV / CVC</span>
                          <span className="text-[10px] text-slate-400 flex items-center gap-0.5">
                            <Lock className="w-2.5 h-2.5" /> 3 digits
                          </span>
                        </label>
                        <input
                          type="password"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          placeholder="•••"
                          maxLength={4}
                          className="w-full px-3 py-2 text-xs font-mono bg-white border border-slate-300 rounded-xl focus:outline-hidden focus:border-indigo-600 text-center"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Name on Card</label>
                      <input
                        type="text"
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
                        placeholder="ALEX VANCE"
                        className="w-full px-3 py-2 text-xs font-semibold uppercase bg-white border border-slate-300 rounded-xl focus:outline-hidden focus:border-indigo-600"
                      />
                    </div>

                    <label className="flex items-center gap-2 pt-1 text-xs text-slate-600 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={saveCardForFuture}
                        onChange={(e) => setSaveCardForFuture(e.target.checked)}
                        className="rounded text-indigo-600 focus:ring-indigo-500"
                      />
                      <span>Save encrypted Stripe customer token for future 1-click checkout</span>
                    </label>
                  </div>
                </div>
              )}

              {/* GATEWAY 2: PAYPAL GATEWAY */}
              {paymentMethod === 'paypal' && (
                <div className="space-y-4 bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 flex items-center gap-2">
                      <span className="text-sky-700 font-black text-sm">PayPal</span>
                      <span>Express Checkout</span>
                    </span>
                    <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      $0 Fraud Liability
                    </span>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Connect directly to your PayPal account to pay with your PayPal Balance, linked bank accounts, or <strong>Pay in 4 interest-free installments</strong> of {formatPrice(total / 4, currency)}.
                    </p>

                    <div className="p-3 bg-sky-50 rounded-xl border border-sky-100 flex items-center justify-between text-xs text-sky-800">
                      <span>PayPal Account: <strong>{customer.email}</strong></span>
                      <span className="font-semibold text-emerald-600">✓ Token Linked</span>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>PayPal Buyer Protection covers all Nobel Conect qualifying shipments.</span>
                  </div>
                </div>
              )}

              {/* GATEWAY 3: SQUARE WEB PAYMENTS SDK */}
              {paymentMethod === 'square' && (
                <div className="space-y-4 bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 flex items-center gap-2">
                      <div className="w-5 h-5 rounded bg-slate-900 text-white flex items-center justify-center font-black text-[10px]">
                        ■
                      </div>
                      <span>Square Web Payments SDK</span>
                    </span>
                    <span className="text-[10px] text-slate-600 font-semibold bg-slate-200/70 px-2 py-0.5 rounded">
                      End-to-End Encrypted
                    </span>
                  </div>

                  {/* Square Sub-methods */}
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setSquareSubMethod('square_pay')}
                      className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                        squareSubMethod === 'square_pay'
                          ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      Square Pay
                    </button>
                    <button
                      type="button"
                      onClick={() => setSquareSubMethod('cash_app')}
                      className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                        squareSubMethod === 'cash_app'
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      Cash App Pay
                    </button>
                    <button
                      type="button"
                      onClick={() => setSquareSubMethod('square_card')}
                      className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                        squareSubMethod === 'square_card'
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      Square Card / Chip
                    </button>
                  </div>

                  {/* Sub method views */}
                  {squareSubMethod === 'square_pay' && (
                    <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
                      <div className="text-xs font-bold text-slate-900">1-Tap Checkout with Square Pay</div>
                      <p className="text-[11px] text-slate-500">
                        Square securely retrieves your verified shipping address and stored payment tokens across any Square merchant.
                      </p>
                      <div className="p-2.5 bg-slate-100 rounded-lg text-xs font-mono text-slate-700 flex items-center justify-between">
                        <span>Terminal ID: SQ-TERM-8849-POS</span>
                        <span className="text-emerald-600 font-bold">Ready</span>
                      </div>
                    </div>
                  )}

                  {squareSubMethod === 'cash_app' && (
                    <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
                          <QrCode className="w-4 h-4" />
                          Cash App Pay by Square
                        </span>
                        <span className="text-[10px] text-slate-400">Mobile or Desktop</span>
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                          Your $cashtag or phone number
                        </label>
                        <input
                          type="text"
                          value={cashAppTag}
                          onChange={(e) => setCashAppTag(e.target.value)}
                          className="w-full px-3 py-2 text-xs font-mono bg-slate-50 border border-slate-300 rounded-lg focus:outline-hidden focus:border-emerald-600"
                        />
                      </div>
                      <p className="text-[10px] text-slate-400">
                        Scan the Cash App QR in the next step to authorize instant transfer.
                      </p>
                    </div>
                  )}

                  {squareSubMethod === 'square_card' && (
                    <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2 text-xs text-slate-600">
                      <p>
                        Square Terminal tokenization ready. Card information is encrypted at the physical or browser layer and never transmitted in plaintext.
                      </p>
                      <div className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" />
                        Square Hardware & Virtual Terminal Verified
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* OTHER ALTERNATIVES */}
              {['apple_pay', 'google_pay', 'klarna', 'cod'].includes(paymentMethod) && (
                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 text-center space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900 text-sm">
                      {paymentMethod === 'apple_pay' && 'Ready for Apple Pay Biometric Token'}
                      {paymentMethod === 'google_pay' && 'Ready for Google Pay 1-Tap Vault'}
                      {paymentMethod === 'klarna' && 'Klarna 4-Installment Plan'}
                      {paymentMethod === 'cod' && 'Cash on Delivery Verified Escrow'}
                    </h5>
                    <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                      {paymentMethod === 'apple_pay' && 'Confirm seamlessly using your Touch ID or Face ID biometric device key.'}
                      {paymentMethod === 'google_pay' && 'Authenticate seamlessly using your linked Google Payment credential.'}
                      {paymentMethod === 'klarna' && 'Pay 4 interest-free payments of ' + formatPrice(total / 4, currency) + ' every 2 weeks.'}
                      {paymentMethod === 'cod' && 'A secure 4-digit verification SMS code will be generated upon doorstep arrival.'}
                    </p>
                  </div>
                </div>
              )}

              {/* PCI-DSS Compliance Info Bar */}
              <div className="p-3 bg-slate-900 text-white rounded-xl text-[11px] space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-emerald-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>PCI-DSS Level 1 & SOC-2 Type II Certified</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Nobel Conect strictly enforces client-side cryptographic tokenization. Payment details bypass merchant servers directly to Stripe, PayPal, or Square.
                </p>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-4">
                <button
                  onClick={() => setStep('details')}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  ← Back to Details
                </button>

                <button
                  id="confirm-payment-btn"
                  onClick={handleExecutePayment}
                  className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-emerald-600/30 flex items-center gap-2 cursor-pointer transition-all"
                >
                  <Lock className="w-4 h-4" />
                  <span>
                    {paymentMethod === 'stripe' && `Pay ${formatPrice(total, currency)} with Stripe`}
                    {paymentMethod === 'paypal' && `Pay ${formatPrice(total, currency)} with PayPal`}
                    {paymentMethod === 'square' && `Pay ${formatPrice(total, currency)} with Square`}
                    {paymentMethod !== 'stripe' && paymentMethod !== 'paypal' && paymentMethod !== 'square' && `Authorize & Pay ${formatPrice(total, currency)}`}
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: 3D Secure Bank Verification Simulation */}
          {step === '3d_secure' && (
            <div className="space-y-5 text-center py-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto border border-blue-200">
                <Lock className="w-7 h-7" />
              </div>

              <div className="space-y-1">
                <h4 className="text-base font-extrabold text-slate-900 font-['Outfit']">
                  Verified by Visa / Mastercard 3D Secure 2.0
                </h4>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  A high-assurance authentication challenge has been securely matched with your issuing bank for <strong>{formatPrice(total, currency)}</strong>.
                </p>
              </div>

              {/* Simulated OTP Display */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 max-w-sm mx-auto space-y-3">
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span>Merchant: Nobel Conect</span>
                  <span>Ref: #NC-AUTH-9921</span>
                </div>

                <div className="flex justify-center gap-2 font-mono text-base font-bold text-slate-800">
                  <span className="w-8 h-10 rounded-lg bg-white border border-slate-300 flex items-center justify-center">8</span>
                  <span className="w-8 h-10 rounded-lg bg-white border border-slate-300 flex items-center justify-center">4</span>
                  <span className="w-8 h-10 rounded-lg bg-white border border-slate-300 flex items-center justify-center">1</span>
                  <span className="w-8 h-10 rounded-lg bg-white border border-slate-300 flex items-center justify-center">9</span>
                  <span className="w-8 h-10 rounded-lg bg-white border border-slate-300 flex items-center justify-center">0</span>
                  <span className="w-8 h-10 rounded-lg bg-white border border-slate-300 flex items-center justify-center">2</span>
                </div>

                <div className="text-[11px] text-emerald-600 font-semibold flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Stripe Biometric Token Verified
                </div>
              </div>

              <button
                id="complete-3ds-btn"
                onClick={finalizeOrderPayment}
                className="w-full max-w-sm mx-auto py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all cursor-pointer"
              >
                Confirm & Place Order
              </button>
            </div>
          )}

          {/* STEP 4: Processing State */}
          {step === 'processing' && (
            <div className="py-12 text-center space-y-6">
              <div className="relative w-20 h-20 mx-auto">
                <div className="w-20 h-20 rounded-full border-4 border-indigo-100 border-t-indigo-600 animate-spin" />
                <Lock className="w-8 h-8 text-indigo-600 absolute inset-0 m-auto animate-pulse" />
              </div>

              <div className="space-y-2">
                <h4 className="text-lg font-black text-slate-900 font-['Outfit']">
                  Securing Your Transaction
                </h4>
                <p className="text-xs font-semibold text-indigo-600 animate-pulse">
                  {processingMessage}
                </p>
                <p className="text-[11px] text-slate-400 max-w-xs mx-auto pt-1">
                  Please do not refresh or close this window. Your order is being initialized with real-time tracking telemetry.
                </p>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
