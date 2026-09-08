import React, { useState, useEffect } from 'react';
import { 
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
  Sparkles, 
  RefreshCw, 
  BellRing, 
  Package, 
  User, 
  ArrowRight,
  Navigation,
  ExternalLink,
  Check
} from 'lucide-react';
import { Currency, Order } from '../types';
import { getStoredOrders, updateOrderStatus } from '../data/sampleOrders';
import { LiveRouteRadar } from './LiveRouteRadar';
import { formatPrice } from '../utils/formatters';

interface OrderTrackingSectionProps {
  currency: Currency;
  onOpenFullModal?: (orderId: string) => void;
  onViewProduct?: (productId: string) => void;
}

export const OrderTrackingSection: React.FC<OrderTrackingSectionProps> = ({
  currency,
  onOpenFullModal,
  onViewProduct
}) => {
  const [orders, setOrders] = useState<Order[]>(() => getStoredOrders());
  const [selectedOrderId, setSelectedOrderId] = useState<string>(() => {
    const list = getStoredOrders();
    return list.length > 0 ? list[0].id : '';
  });
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchError, setSearchError] = useState<string | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [copiedInvoice, setCopiedInvoice] = useState(false);

  const reloadOrders = () => {
    const list = getStoredOrders();
    setOrders(list);
    if (!selectedOrderId && list.length > 0) {
      setSelectedOrderId(list[0].id);
    }
  };

  useEffect(() => {
    reloadOrders();
  }, []);

  const currentOrder = orders.find(o => o.id === selectedOrderId) || orders[0];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchError(null);
    const cleaned = searchQuery.trim().toUpperCase();
    if (!cleaned) return;

    const match = orders.find(
      o => o.id.toUpperCase() === cleaned || o.tracking.trackingNumber.toUpperCase() === cleaned
    );

    if (match) {
      setSelectedOrderId(match.id);
      setSearchQuery('');
    } else {
      setSearchError(`No order found matching "${searchQuery}". Try selecting from available demo orders.`);
    }
  };

  const handleAdvanceStep = () => {
    if (!currentOrder || isSimulating) return;
    setIsSimulating(true);

    const stages: Array<Order['tracking']['currentStatus']> = [
      'order_confirmed',
      'quality_checked',
      'dispatched',
      'out_for_delivery',
      'delivered'
    ];
    const currentIndex = stages.indexOf(currentOrder.tracking.currentStatus);
    const nextStatus = stages[(currentIndex + 1) % stages.length];

    setTimeout(() => {
      const updated = updateOrderStatus(currentOrder.id, nextStatus);
      if (updated) {
        setOrders(getStoredOrders());
      }
      setIsSimulating(false);
    }, 600);
  };

  const handleCopySummary = () => {
    if (!currentOrder) return;
    const text = `Nobel Conect Order #${currentOrder.id}\nStatus: ${currentOrder.tracking.currentStatus}\nCarrier: ${currentOrder.tracking.carrierName}\nEstimated Delivery: ${currentOrder.tracking.estimatedArrival}\nTotal: ${formatPrice(currentOrder.total, currency)}`;
    navigator.clipboard.writeText(text);
    setCopiedInvoice(true);
    setTimeout(() => setCopiedInvoice(false), 2000);
  };

  if (!currentOrder) return null;

  // The 4 core lifecycle stages requested by the user:
  // 1. Confirmation, 2. Processing (QA), 3. Shipping (Dispatched/Out for delivery), 4. Estimated Delivery Date
  const lifecycleMilestones = [
    {
      key: 'confirmation',
      label: 'Order Confirmation',
      sublabel: 'Payment Authorized & Stock Allocated',
      isCompleted: true,
      isCurrent: currentOrder.tracking.currentStatus === 'order_confirmed'
    },
    {
      key: 'processing',
      label: 'Order Processing',
      sublabel: 'Multi-point QA & Shock-proof Pack',
      isCompleted: ['quality_checked', 'dispatched', 'out_for_delivery', 'delivered'].includes(currentOrder.tracking.currentStatus),
      isCurrent: currentOrder.tracking.currentStatus === 'quality_checked'
    },
    {
      key: 'shipping',
      label: 'Shipping & Transit',
      sublabel: 'Electric Courier GPS Dispatch',
      isCompleted: ['dispatched', 'out_for_delivery', 'delivered'].includes(currentOrder.tracking.currentStatus),
      isCurrent: ['dispatched', 'out_for_delivery'].includes(currentOrder.tracking.currentStatus)
    },
    {
      key: 'delivery',
      label: 'Estimated Delivery Date',
      sublabel: currentOrder.tracking.estimatedArrival,
      isCompleted: currentOrder.tracking.currentStatus === 'delivered',
      isCurrent: currentOrder.tracking.currentStatus === 'delivered'
    }
  ];

  return (
    <section 
      id="order-tracking"
      className="py-16 bg-slate-900 text-white relative overflow-hidden border-y border-slate-800"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold tracking-wider uppercase font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Live Telemetry & GPS Dispatch
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white font-['Outfit']">
              Real-Time Order Tracking Directly on Website
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Track your package from confirmation through processing, air/ground transit, and doorstep delivery with live GPS telemetry.
            </p>
          </div>

          {/* Search bar */}
          <div className="w-full md:w-auto md:min-w-[340px]">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter Order ID (e.g. NC-88421)..."
                className="w-full pl-10 pr-24 py-3 text-xs bg-slate-800/90 border border-slate-700 rounded-2xl text-white placeholder-slate-400 focus:outline-hidden focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 font-mono shadow-inner"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 bottom-1.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer flex items-center gap-1"
              >
                <span>Track</span>
              </button>
            </form>
            {searchError && (
              <p className="text-[11px] text-rose-400 mt-1 pl-1">{searchError}</p>
            )}
          </div>
        </div>

        {/* Order Selector Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-b border-slate-800 pb-4">
          <span className="text-xs text-slate-400 font-semibold mr-1">Active Shipments:</span>
          {orders.map((ord) => {
            const isSelected = ord.id === currentOrder.id;
            return (
              <button
                key={ord.id}
                onClick={() => setSelectedOrderId(ord.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 ring-2 ring-indigo-400/40'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                }`}
              >
                <span>{ord.id}</span>
                <span className={`w-2 h-2 rounded-full ${
                  ord.tracking.currentStatus === 'delivered' ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'
                }`} />
                <span className="text-[10px] font-sans font-normal text-slate-400 capitalize">
                  {ord.tracking.currentStatus.replace(/_/g, ' ')}
                </span>
              </button>
            );
          })}
        </div>

        {/* Main Tracking Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: 4-Stage Lifecycle & Event History */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 4 Core Lifecycle Milestones Card */}
            <div className="bg-slate-800/80 rounded-3xl p-6 border border-slate-700/80 shadow-xl space-y-6">
              
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-700">
                <div>
                  <div className="text-xs text-indigo-400 font-mono font-bold">
                    Tracking #: {currentOrder.tracking.trackingNumber}
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-white font-['Outfit'] mt-0.5">
                    Order Status: <span className="capitalize text-emerald-400">{currentOrder.tracking.currentStatus.replace(/_/g, ' ')}</span>
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleAdvanceStep}
                    disabled={isSimulating}
                    className="px-3.5 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                    title="Simulate advancing to next shipment milestone"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 text-indigo-400 ${isSimulating ? 'animate-spin' : ''}`} />
                    <span>{isSimulating ? 'Advancing...' : 'Simulate Status Update'}</span>
                  </button>

                  <button
                    onClick={handleCopySummary}
                    className="p-2 bg-slate-700/70 hover:bg-slate-600 text-slate-300 rounded-xl text-xs transition-colors cursor-pointer"
                    title="Copy receipt summary"
                  >
                    {copiedInvoice ? <Check className="w-4 h-4 text-emerald-400" /> : <FileText className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-slate-300">
                  <span className="font-semibold">Fulfillment Progress</span>
                  <span className="font-mono text-emerald-400 font-bold">{currentOrder.tracking.progressPercentage}% Complete</span>
                </div>
                <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-700">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 via-blue-500 to-emerald-400 rounded-full transition-all duration-700"
                    style={{ width: `${currentOrder.tracking.progressPercentage}%` }}
                  />
                </div>
              </div>

              {/* The 4 Core Lifecycle Stages */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2">
                {lifecycleMilestones.map((stage, idx) => (
                  <div
                    key={stage.key}
                    className={`p-3.5 rounded-2xl border transition-all ${
                      stage.isCurrent
                        ? 'bg-indigo-950/60 border-indigo-500 shadow-md shadow-indigo-500/10'
                        : stage.isCompleted
                        ? 'bg-slate-900/60 border-slate-700'
                        : 'bg-slate-900/30 border-slate-800 opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-[11px] font-bold font-mono">
                        {stage.isCompleted ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : (
                          idx + 1
                        )}
                      </span>
                      {stage.isCurrent && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold bg-indigo-500 text-white animate-pulse">
                          ACTIVE
                        </span>
                      )}
                    </div>
                    <div className="text-xs font-bold text-white font-['Outfit']">
                      {stage.label}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1 line-clamp-2">
                      {stage.sublabel}
                    </div>
                  </div>
                ))}
              </div>

              {/* Estimated Delivery Date Highlight Box */}
              <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 p-4 rounded-2xl border border-indigo-500/30 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-indigo-300 font-bold block">
                      Estimated Delivery Date
                    </span>
                    <span className="text-base sm:text-lg font-black text-white font-['Outfit']">
                      {currentOrder.tracking.estimatedArrival}
                    </span>
                  </div>
                </div>

                <div className="text-right text-xs">
                  <span className="text-slate-400 block">Logistics Carrier</span>
                  <span className="font-bold text-white">{currentOrder.tracking.carrierName}</span>
                </div>
              </div>

              {/* Real-Time Event Milestones list */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Telemetry Event Log
                </h4>
                <div className="space-y-3">
                  {currentOrder.tracking.events.map((ev) => (
                    <div
                      key={ev.id}
                      className={`p-3.5 rounded-xl border flex items-start gap-3 transition-colors ${
                        ev.current
                          ? 'bg-indigo-900/30 border-indigo-500/60'
                          : ev.completed
                          ? 'bg-slate-900/40 border-slate-700/60'
                          : 'bg-slate-900/20 border-slate-800/40 opacity-50'
                      }`}
                    >
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                        ev.completed ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-500'
                      }`}>
                        {ev.completed ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-bold text-white truncate">
                            {ev.title}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400 shrink-0">
                            {ev.timestamp}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          {ev.description}
                        </p>
                        <div className="text-[10px] text-indigo-400 mt-1 font-mono flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span>{ev.location}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Live GPS Route Radar & Courier Details */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Live GPS Route Radar Widget */}
            <div className="bg-slate-800/80 rounded-3xl p-6 border border-slate-700/80 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Navigation className="w-4 h-4 text-emerald-400" />
                  <h4 className="text-sm font-bold text-white font-['Outfit']">
                    Live GPS Vehicle Telemetry
                  </h4>
                </div>
                <span className="text-[10px] font-mono text-slate-400">
                  Update: 3s ago
                </span>
              </div>

              {/* Integrated SVG Radar Map */}
              <div className="rounded-2xl overflow-hidden border border-slate-700 bg-slate-950">
                <LiveRouteRadar tracking={currentOrder.tracking} liveRoute={currentOrder.tracking.liveRoute} />
              </div>

              {/* Driver & Courier Card */}
              {currentOrder.tracking.courierDriver && (
                <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-700/80 space-y-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={currentOrder.tracking.courierDriver.avatar}
                      alt={currentOrder.tracking.courierDriver.name}
                      className="w-11 h-11 rounded-xl object-cover border border-indigo-500/40"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white truncate">
                          {currentOrder.tracking.courierDriver.name}
                        </span>
                        <span className="text-[10px] text-amber-400 font-bold flex items-center gap-0.5">
                          ★ {currentOrder.tracking.courierDriver.rating}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 truncate">
                        {currentOrder.tracking.courierDriver.vehicle} • Plate: {currentOrder.tracking.courierDriver.licensePlate}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                    <button
                      onClick={() => alert(`Connecting secure dispatch call to driver ${currentOrder.tracking.courierDriver?.name}...`)}
                      className="py-2 px-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-slate-700"
                    >
                      <Phone className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Call Driver</span>
                    </button>
                    <button
                      onClick={() => alert(`Opening SMS dispatch messenger for Order #${currentOrder.id}...`)}
                      className="py-2 px-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-slate-700"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Message</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Delivery Address & Security Note */}
              <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-700/60 space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="font-bold">Destination Address</span>
                  <span className="text-[10px] text-emerald-400 font-semibold">Verified</span>
                </div>
                <p className="text-slate-400 leading-relaxed text-[11px]">
                  {currentOrder.customer.fullName} • {currentOrder.customer.address}, {currentOrder.customer.city}, {currentOrder.customer.state} {currentOrder.customer.zipCode}
                </p>
                {currentOrder.customer.deliveryNotes && (
                  <p className="text-[10px] text-indigo-300 bg-indigo-950/40 p-2 rounded-lg border border-indigo-900/50">
                    Note: "{currentOrder.customer.deliveryNotes}"
                  </p>
                )}
              </div>

              {/* Order Items in this shipment */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span className="font-bold flex items-center gap-1">
                    <Package className="w-3.5 h-3.5 text-indigo-400" />
                    Shipment Items ({currentOrder.items.length})
                  </span>
                  <span className="text-white font-mono font-bold">
                    {formatPrice(currentOrder.total, currency)}
                  </span>
                </div>

                <div className="space-y-1.5 max-h-48 overflow-y-auto">
                  {currentOrder.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-2 bg-slate-900/50 rounded-xl border border-slate-700/60 flex items-center justify-between gap-2 text-xs"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-8 h-8 rounded-lg object-cover bg-slate-800 shrink-0"
                        />
                        <div className="truncate">
                          <div className="text-white font-medium truncate text-[11px]">{item.product.name}</div>
                          <div className="text-[10px] text-slate-400">Qty: {item.quantity}</div>
                        </div>
                      </div>
                      <span className="font-mono text-slate-300 shrink-0 text-xs">
                        {formatPrice(item.product.price * item.quantity, currency)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
