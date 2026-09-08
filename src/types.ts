export type Category = 'all' | 'electronics' | 'audio' | 'lifestyle' | 'home' | 'wearables';

export interface Product {
  id: string;
  name: string;
  category: Category;
  tagline: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  image: string;
  badge?: 'Best Value' | 'Top Rated' | 'Quality Pick' | 'Bestseller' | 'New Arrival';
  inStock: boolean;
  stockCount: number;
  description: string;
  features: string[];
  specs: Record<string, string>;
  warrantyMonths: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export type PaymentMethodType = 'stripe' | 'paypal' | 'square' | 'card' | 'apple_pay' | 'google_pay' | 'klarna' | 'cod';

export interface ProductReview {
  id: string;
  productId: string;
  authorName: string;
  rating: number; // 1 to 5
  title: string;
  comment: string;
  date: string;
  verifiedPurchase: boolean;
  orderId?: string;
  helpfulCount: number;
  recommend: boolean;
  userVotedHelpful?: boolean;
}

export interface ProductRatingStats {
  averageRating: number;
  totalReviews: number;
  recommendedPercentage: number;
  distribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

export interface ShippingMethod {
  id: string;
  name: string;
  price: number;
  estimatedDelivery: string;
  description: string;
}

export interface CustomerDetails {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  deliveryNotes?: string;
}

export interface TrackingEvent {
  id: string;
  status: 'order_confirmed' | 'quality_checked' | 'dispatched' | 'out_for_delivery' | 'delivered';
  title: string;
  description: string;
  location: string;
  timestamp: string;
  completed: boolean;
  current?: boolean;
}

export interface OrderTracking {
  currentStatus: 'order_confirmed' | 'quality_checked' | 'dispatched' | 'out_for_delivery' | 'delivered';
  trackingNumber: string;
  carrierName: string;
  estimatedArrival: string;
  currentLocationName: string;
  progressPercentage: number;
  courierDriver?: {
    name: string;
    phone: string;
    vehicle: string;
    licensePlate: string;
    rating: number;
    avatar: string;
  };
  liveRoute: {
    startLocation: { name: string; x: number; y: number };
    currentLocation: { name: string; x: number; y: number };
    destinationLocation: { name: string; x: number; y: number };
  };
  events: TrackingEvent[];
}

export interface Order {
  id: string;
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  tax: number;
  total: number;
  customer: CustomerDetails;
  shippingMethod: ShippingMethod;
  paymentMethod: PaymentMethodType;
  paymentDetails: {
    gateway: string;
    transactionId: string;
    cardLast4?: string;
    cardBrand?: string;
    status: 'authorized' | 'captured' | 'completed';
    verifiedAt: string;
  };
  tracking: OrderTracking;
}

export type Currency = 'USD' | 'EUR' | 'GBP';
