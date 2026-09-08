import React, { useState, useEffect } from 'react';
import { 
  X, 
  MapPin, 
  Search, 
  Truck, 
  Phone, 
  MessageSquare, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  FileText, 
  ShieldCheck, 
  ChevronRight,
  Sparkles,
  RefreshCw,
  BellRing,
  ExternalLink
} from 'lucide-react';
import { Currency, Order } from '../types';
import { getStoredOrders, updateOrderStatus } from '../data/sampleOrders';
import { LiveRouteRadar } from './LiveRouteRadar';
import { formatPrice } from '../utils/formatters';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  currency: Currency;
  initialOrderId?: string;
  onExploreProducts: () => void;
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  isOpen,
  onClose,
  currency,
  initialOrderId,
  onExploreProducts
}) => {
  const [orders, setOrders] = useState<Order[]>(() => getStoredOrders());
  const [selectedOrderId, setSelectedOrderId] = useState<string>(() => {
    const stored = getStoredOrders();
    if (initialOrderId && stored.some(o => o.id === initialOrderId)) {
      return initialOrderId;
    }
    return stored.length > 0 ? stored[0].id : '';
  });
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchError, setSearchError] = useState<string | null>(null);
  const [smsNotificationsActive, setSmsNotificationsActive] = useState(true);
  const [copiedInvoice, setCopiedInvoice] = useState(false);
  const [isSimulatingStep, setIsSimulatingStep] = useState(false);

  // Sync orders on open or initialOrderId change
  useEffect(() => {
    if (isOpen) {
      const stored = getStoredOrders();
      setOrders(stored);
      if (initialOrderId && stored.some(o => o.id === initialOrderId)) {
        setSelectedOrderId(initialOrderId);
      } else if (!selectedOrderId && stored.length > 0) {
        setSelectedOrderId(stored[0].id);
      }
    }
  }, [isOpen, initialOrderId, selectedOrderId]);

  if (!isOpen) return null;

  const currentOrder = orders.find(o => o.id === selectedOrderId) || orders[0];

  const handleSearchOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchError(null);
    const cleaned = searchQuery.trim().toUpperCase();
    const found = orders.find(
      o => o.id.toUpperCase() === cleaned || o.tracking.trackingNumber.toUpperCase() === cleaned
    );
    if (found) {
      setSelectedOrderId(found.id);
      setSearchQuery('');
    } else {
      setSearchError(`No order found for "${searchQuery}". Please check your order ID or choose from active orders below.`);
    }
  };

  // Advance live courier simulation
  const handleAdvanceSimulation = () => {
    if (!currentOrder || isSimulatingStep) return;
    setIsSimulatingStep(true);

    const statuses: Array<Order['tracking']['currentStatus']> = [
      'order_confirmed',
      'quality_checked',
      'dispatched',
      'out_for_delivery',
      'delivered'
    ];
    const currentIndex = statuses.indexOf(currentOrder.tracking.currentStatus);
    const nextStatus = statuses[(currentIndex + 1) % statuses.length];

    setTimeout(() => {
      const updated = updateOrderStatus(currentOrder.id, nextStatus);
      if (updated) {
        setOrders(getStoredOrders());
      }
      setIsSimulatingStep(false);
    }, 600);
  };

  const handleCopyReceipt = () => {
    if (!currentOrder) return;
    const summary = `Nobel Conect Order Receipt\nOrder ID: ${currentOrder.id}\nCarrier: ${currentOrder.tracking.carrierName}\nStatus: ${currentOrder.tracking.currentStatus}\nEstimated Delivery: ${currentOrder.tracking.estimatedArrival}\nTotal: ${formatPrice(currentOrder.total, currency)}`;
    navigator.clipboard.writeText(summary);
    setCopiedInvoice(true);
    setTimeout(() => setCopiedInvoice(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        id="order-tracking-modal"
        className="relative bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 sm:p-6 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300">
              <MapPin className="w-6 h-6 text-emerald-400 animate-bounce" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-black text-lg sm:text-xl tracking-tight font-['Outfit']">
                  Real-Time Order Tracking
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  GPS Active
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Follow your Nobel Conect parcel from automated QA inspection to your doorstep
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleAdvanceSimulation}
              disabled={isSimulatingStep}
              className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              title="Advance the live courier through steps to see real-time tracking in action"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSimulatingStep ? 'animate-spin' : ''}`} />
              <span>Simulate Next Step</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Order Selector & Search Strip */}
        <div className="bg-slate-50 border-b border-slate-200 p-4 sm:px-6 flex flex-wrap items-center justify-between gap-3 shrink-0">
          {/* Quick Select Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto py-1 max-w-full">
            <span className="text-xs font-semibold text-slate-500 shrink-0">Track Order:</span>
            {orders.map((ord) => (
              <button
                key={ord.id}
                onClick={() => setSelectedOrderId(ord.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                  selectedOrderId === ord.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:border-slate-300'
                }`}
              >
                <span>{ord.id}</span>
                <span className={`w-1.5 h-1.5 rounded-full ${
                  ord.tracking.currentStatus === 'delivered'
                    ? 'bg-emerald-400'
                    : ord.tracking.currentStatus === 'out_for_delivery'
                    ? 'bg-amber-400 animate-ping'
                    : 'bg-indigo-400'
                }`} />
              </button>
            ))}
          </div>

          {/* Search Input for other orders */}
          <form onSubmit={handleSearchOrder} className="flex items-center gap-2 flex-1 max-w-xs ml-auto">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Enter Order ID (e.g. NC-88421)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs placeholder-slate-400 font-mono uppercase focus:outline-hidden focus:border-indigo-600"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
            </div>
            <button
              type="submit"
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white font-semibold text-xs rounded-lg cursor-pointer"
            >
              Track
            </button>
          </form>
        </div>

        {searchError && (
          <div className="px-6 py-2 bg-rose-50 border-b border-rose-200 text-rose-700 text-xs flex items-center justify-between">
            <span>{searchError}</span>
            <button onClick={() => setSearchError(null)} className="underline font-semibold">Dismiss</button>
          </div>
        )}

        {/* Modal Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {currentOrder ? (
            <>
              {/* Order Status Banner */}
              <div className="bg-gradient-to-r from-indigo-50 via-slate-50 to-emerald-50 rounded-2xl p-4 sm:p-5 border border-indigo-100 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500 font-medium">Tracking Number:</span>
                    <span className="font-mono text-xs font-bold text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-200">
                      {currentOrder.tracking.trackingNumber}
                    </span>
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900 mt-1 font-['Outfit']">
                    {currentOrder.tracking.currentStatus === 'order_confirmed' && 'Order Verified & Processing'}
                    {currentOrder.tracking.currentStatus === 'quality_checked' && 'Quality Checked & Sealed'}
                    {currentOrder.tracking.currentStatus === 'dispatched' && 'Dispatched • In Transit'}
                    {currentOrder.tracking.currentStatus === 'out_for_delivery' && 'Out for Delivery • Courier Nearby'}
                    {currentOrder.tracking.currentStatus === 'delivered' && 'Delivered Safely to Doorstep'}
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Carrier: <strong className="text-indigo-700">{currentOrder.tracking.carrierName}</strong> • {currentOrder.tracking.currentLocationName}
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Estimated Delivery</span>
                  <span className="text-base sm:text-lg font-black text-emerald-600 font-['Outfit']">
                    {currentOrder.tracking.estimatedArrival}
                  </span>
                </div>
              </div>

              {/* Interactive Live Route Radar / GPS Map */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-indigo-600" />
                    Live Route GPS Navigation
                  </h4>
                  <span className="text-[11px] text-slate-500">
                    Auto-updates every 10 seconds
                  </span>
                </div>
                <LiveRouteRadar tracking={currentOrder.tracking} />
              </div>

              {/* Courier Driver & Support Card */}
              {currentOrder.tracking.courierDriver && (
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={currentOrder.tracking.courierDriver.avatar}
                      alt={currentOrder.tracking.courierDriver.name}
                      className="w-12 h-12 rounded-xl object-cover border border-slate-200 shadow-xs"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900 font-['Outfit']">
                          {currentOrder.tracking.courierDriver.name}
                        </span>
                        <span className="text-[10px] bg-indigo-50 text-indigo-700 font-bold px-1.5 py-0.2 rounded border border-indigo-200">
                          ★ {currentOrder.tracking.courierDriver.rating}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500">
                        {currentOrder.tracking.courierDriver.vehicle} • Plate: <span className="font-mono font-semibold text-slate-700">{currentOrder.tracking.courierDriver.licensePlate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${currentOrder.tracking.courierDriver.phone}`}
                      className="px-3 py-2 bg-white hover:bg-slate-100 text-slate-700 font-semibold text-xs rounded-xl border border-slate-200 shadow-2xs flex items-center gap-1.5 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Call Courier</span>
                    </a>
                    <button
                      onClick={() => alert(`Direct SMS dispatch connected to driver ${currentOrder.tracking.courierDriver?.name}. Delivery instructions updated.`)}
                      className="px-3 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold text-xs rounded-xl border border-indigo-200 flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-indigo-600" />
                      <span>Send Instructions</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Milestone Events Timeline */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-indigo-600" />
                  Shipment Checkpoint Milestones
                </h4>

                <div className="relative pl-6 border-l-2 border-indigo-200 space-y-5 ml-3">
                  {currentOrder.tracking.events.map((event) => (
                    <div key={event.id} className="relative group">
                      {/* Node Bullet */}
                      <div className={`absolute -left-[31px] top-0 w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        event.current
                          ? 'bg-indigo-600 border-indigo-600 ring-4 ring-indigo-100'
                          : event.completed
                          ? 'bg-emerald-500 border-emerald-500'
                          : 'bg-white border-slate-300'
                      }`}>
                        {event.completed && <span className="text-white text-[8px]">✓</span>}
                      </div>

                      <div className="bg-slate-50/70 p-3.5 rounded-xl border border-slate-200/80">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h5 className={`text-xs font-bold ${
                            event.current ? 'text-indigo-600 font-extrabold' : 'text-slate-900'
                          }`}>
                            {event.title}
                          </h5>
                          <span className="text-[11px] text-slate-400 font-mono">
                            {event.timestamp}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 mt-1">
                          {event.description}
                        </p>
                        <div className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                          <MapPin className="w-2.5 h-2.5" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Items & Payment Details Accordion */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-900 uppercase tracking-wider">
                  <span>Order Items ({currentOrder.items.length})</span>
                  <button
                    onClick={handleCopyReceipt}
                    className="text-indigo-600 font-semibold text-xs hover:underline flex items-center gap-1"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>{copiedInvoice ? 'Copied Receipt!' : 'Copy Summary Receipt'}</span>
                  </button>
                </div>

                <div className="divide-y divide-slate-200 text-xs">
                  {currentOrder.items.map((item, idx) => (
                    <div key={idx} className="py-2.5 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-10 h-10 rounded-lg object-cover bg-white border border-slate-200"
                        />
                        <div>
                          <div className="font-bold text-slate-800">{item.product.name}</div>
                          <div className="text-slate-500">Qty: {item.quantity} • {item.product.tagline}</div>
                        </div>
                      </div>
                      <div className="font-bold text-slate-900 font-['Outfit']">
                        {formatPrice(item.product.price * item.quantity, currency)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Financial Summary */}
                <div className="pt-2 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-slate-600">
                  <div>
                    <span className="text-slate-400 block">Subtotal</span>
                    <span className="font-semibold text-slate-800">{formatPrice(currentOrder.subtotal, currency)}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Shipping</span>
                    <span className="font-semibold text-slate-800">{currentOrder.shippingFee === 0 ? 'FREE' : formatPrice(currentOrder.shippingFee, currency)}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Payment Gateway</span>
                    <span className="font-semibold text-indigo-700">{currentOrder.paymentDetails.gateway}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Total Charged</span>
                    <span className="font-bold text-slate-900 text-xs">{formatPrice(currentOrder.total, currency)}</span>
                  </div>
                </div>
              </div>

              {/* Delivery Address & SMS alert toggle */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div>
                  <span className="font-bold text-slate-900 block">Destination Address:</span>
                  <span className="text-slate-600">
                    {currentOrder.customer.fullName} • {currentOrder.customer.address}, {currentOrder.customer.city}, {currentOrder.customer.state} {currentOrder.customer.zipCode}
                  </span>
                </div>

                <label className="flex items-center gap-2 cursor-pointer text-slate-700 font-medium">
                  <input
                    type="checkbox"
                    checked={smsNotificationsActive}
                    onChange={(e) => setSmsNotificationsActive(e.target.checked)}
                    className="rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="flex items-center gap-1">
                    <BellRing className="w-3.5 h-3.5 text-indigo-600" />
                    SMS Milestone Updates Enabled
                  </span>
                </label>
              </div>

            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-500 text-sm">No orders to display.</p>
              <button
                onClick={() => {
                  onClose();
                  onExploreProducts();
                }}
                className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold"
              >
                Explore Products
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Encrypted Nobel Conect Telemetry Protocol</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white font-semibold rounded-xl transition-colors cursor-pointer"
          >
            Close Tracker
          </button>
        </div>
      </div>
    </div>
  );
};
