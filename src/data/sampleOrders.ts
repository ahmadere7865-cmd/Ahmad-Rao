import { Order } from '../types';
import { MOCK_PRODUCTS, SHIPPING_METHODS } from './mockProducts';

export const SAMPLE_ORDERS: Order[] = [
  {
    id: 'NC-88421',
    createdAt: new Date(Date.now() - 36 * 3600 * 1000).toISOString(),
    items: [
      {
        product: MOCK_PRODUCTS[0], // AcousticPro Headphones
        quantity: 1
      },
      {
        product: MOCK_PRODUCTS[7], // PowerMatrix Charging Dock
        quantity: 1
      }
    ],
    subtotal: 208.98,
    discount: 20.90, // 10% off
    shippingFee: 0,
    tax: 15.05,
    total: 203.13,
    customer: {
      fullName: 'Sarah Jenkins',
      email: 'sarah.jenkins@example.com',
      phone: '+1 (555) 234-8901',
      address: '742 Evergreen Terrace, Apt 4B',
      city: 'Portland',
      state: 'OR',
      zipCode: '97201',
      country: 'United States',
      deliveryNotes: 'Please leave at front porch or ring doorbell.'
    },
    shippingMethod: SHIPPING_METHODS[1],
    paymentMethod: 'card',
    paymentDetails: {
      gateway: 'Stripe 256-Bit SSL Gateway',
      transactionId: 'txn_9921_nc_sec_89234',
      cardLast4: '4242',
      cardBrand: 'Visa',
      status: 'captured',
      verifiedAt: new Date(Date.now() - 36 * 3600 * 1000).toLocaleTimeString()
    },
    tracking: {
      currentStatus: 'out_for_delivery',
      trackingNumber: 'NC-EXP-88421-US',
      carrierName: 'Nobel Express Logistics',
      estimatedArrival: 'Today, within 35 minutes (Est. 2:45 PM)',
      currentLocationName: 'Hawthorne Blvd & 12th Ave (1.8 miles away)',
      progressPercentage: 80,
      courierDriver: {
        name: 'Marcus Vance',
        phone: '+1 (555) 892-3411',
        vehicle: 'Nobel Electric Van #42',
        licensePlate: '7XNC90',
        rating: 4.96,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
      },
      liveRoute: {
        startLocation: { name: 'Nobel Fulfillment Hub #3', x: 15, y: 75 },
        currentLocation: { name: 'Transit Node: Central Metro', x: 68, y: 42 },
        destinationLocation: { name: 'Customer Residence: 742 Evergreen', x: 88, y: 25 }
      },
      events: [
        {
          id: 'ev-1',
          status: 'order_confirmed',
          title: 'Order Placed & Payment Verified',
          description: 'Payment tokenized via 256-bit SSL gateway. Order sent to fulfillment.',
          location: 'Nobel Conect Secure Server',
          timestamp: 'Yesterday at 9:15 AM',
          completed: true
        },
        {
          id: 'ev-2',
          status: 'quality_checked',
          title: 'Quality Inspection Passed',
          description: 'All items verified against batch quality standards and serial numbers logged.',
          location: 'Pacific Distribution Center, Bay 14',
          timestamp: 'Yesterday at 1:40 PM',
          completed: true
        },
        {
          id: 'ev-3',
          status: 'dispatched',
          title: 'Dispatched with Nobel Express',
          description: 'Package scanned onto Express electric delivery fleet with active GPS beacon.',
          location: 'Metro Logistics Terminal',
          timestamp: 'Today at 7:30 AM',
          completed: true
        },
        {
          id: 'ev-4',
          status: 'out_for_delivery',
          title: 'Out for Doorstep Delivery',
          description: 'Courier Marcus Vance is 1.8 miles away. Hand-off scheduled soon.',
          location: 'Hawthorne Delivery Zone',
          timestamp: 'Today at 1:10 PM',
          completed: true,
          current: true
        },
        {
          id: 'ev-5',
          status: 'delivered',
          title: 'Delivered & Signature Acquired',
          description: 'Package handed to recipient or placed in secure delivery box.',
          location: 'Customer Address',
          timestamp: 'Estimated 2:45 PM',
          completed: false
        }
      ]
    }
  },
  {
    id: 'NC-77290',
    createdAt: new Date(Date.now() - 72 * 3600 * 1000).toISOString(),
    items: [
      {
        product: MOCK_PRODUCTS[1], // Chronos Smartwatch
        quantity: 1
      }
    ],
    subtotal: 189.00,
    discount: 0,
    shippingFee: 0,
    tax: 15.12,
    total: 204.12,
    customer: {
      fullName: 'David K.',
      email: 'david.k@example.com',
      phone: '+1 (555) 765-4321',
      address: '108 West Beacon St',
      city: 'Seattle',
      state: 'WA',
      zipCode: '98101',
      country: 'United States'
    },
    shippingMethod: SHIPPING_METHODS[0],
    paymentMethod: 'apple_pay',
    paymentDetails: {
      gateway: 'Apple Pay Biometric Token',
      transactionId: 'apl_token_88301_nc',
      cardBrand: 'Apple Card',
      status: 'completed',
      verifiedAt: '3 days ago'
    },
    tracking: {
      currentStatus: 'delivered',
      trackingNumber: 'NC-STD-77290-WA',
      carrierName: 'Nobel Express Logistics',
      estimatedArrival: 'Delivered',
      currentLocationName: 'Delivered to recipient - Front Door',
      progressPercentage: 100,
      courierDriver: {
        name: 'Elena Rostova',
        phone: '+1 (555) 321-9988',
        vehicle: 'Nobel Courier Van #19',
        licensePlate: '9NC881',
        rating: 4.98,
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
      },
      liveRoute: {
        startLocation: { name: 'Seattle Hub', x: 15, y: 75 },
        currentLocation: { name: 'Customer Porch', x: 88, y: 25 },
        destinationLocation: { name: 'Delivered', x: 88, y: 25 }
      },
      events: [
        {
          id: 'ev-1',
          status: 'order_confirmed',
          title: 'Order Verified',
          description: 'Apple Pay authentication confirmed.',
          location: 'Secure Cloud',
          timestamp: '3 days ago',
          completed: true
        },
        {
          id: 'ev-2',
          status: 'quality_checked',
          title: 'Quality Checked',
          description: 'Tested and packed in shock-resistant packaging.',
          location: 'Northwest Hub',
          timestamp: '2 days ago',
          completed: true
        },
        {
          id: 'ev-3',
          status: 'dispatched',
          title: 'Dispatched in Transit',
          description: 'Departed sorting facility.',
          location: 'Seattle Hub',
          timestamp: 'Yesterday at 8:00 AM',
          completed: true
        },
        {
          id: 'ev-4',
          status: 'out_for_delivery',
          title: 'Out for Delivery',
          description: 'Driver loaded package into delivery vehicle.',
          location: 'Downtown Route',
          timestamp: 'Yesterday at 11:30 AM',
          completed: true
        },
        {
          id: 'ev-5',
          status: 'delivered',
          title: 'Delivered Safely',
          description: 'Package placed on front porch. Photo confirmation recorded.',
          location: 'Customer Porch',
          timestamp: 'Yesterday at 2:15 PM',
          completed: true,
          current: true
        }
      ]
    }
  }
];

const LOCAL_STORAGE_KEY = 'nobel_conect_orders_v1';

export function getStoredOrders(): Order[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed to load orders from localStorage', e);
  }
  // Initialize with sample orders
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(SAMPLE_ORDERS));
  } catch (e) {
    // Ignore storage issues
  }
  return SAMPLE_ORDERS;
}

export function saveOrder(order: Order): void {
  try {
    const current = getStoredOrders();
    const updated = [order, ...current.filter(o => o.id !== order.id)];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save order to localStorage', e);
  }
}

export function updateOrderStatus(orderId: string, nextStatus: Order['tracking']['currentStatus']): Order | null {
  const orders = getStoredOrders();
  const order = orders.find(o => o.id === orderId);
  if (!order) return null;

  order.tracking.currentStatus = nextStatus;
  
  if (nextStatus === 'quality_checked') {
    order.tracking.progressPercentage = 35;
    order.tracking.currentLocationName = 'Nobel Conect QA & Fulfillment Bay 14';
    order.tracking.liveRoute.currentLocation = { name: 'Quality Inspection Bay', x: 30, y: 65 };
  } else if (nextStatus === 'dispatched') {
    order.tracking.progressPercentage = 55;
    order.tracking.currentLocationName = 'Departed Distribution Center - In Transit on Highway 101';
    order.tracking.liveRoute.currentLocation = { name: 'Highway Transit Corridor', x: 50, y: 52 };
  } else if (nextStatus === 'out_for_delivery') {
    order.tracking.progressPercentage = 80;
    order.tracking.currentLocationName = 'Local Courier in your neighborhood (1.4 miles away)';
    order.tracking.liveRoute.currentLocation = { name: 'Neighborhood Route', x: 74, y: 35 };
  } else if (nextStatus === 'delivered') {
    order.tracking.progressPercentage = 100;
    order.tracking.currentLocationName = 'Delivered at Doorstep - Signed by Resident';
    order.tracking.estimatedArrival = 'Delivered Just Now';
    order.tracking.liveRoute.currentLocation = { name: 'Customer Destination', x: 88, y: 25 };
  }

  // Update events
  const statusHierarchy = ['order_confirmed', 'quality_checked', 'dispatched', 'out_for_delivery', 'delivered'];
  const currentIndex = statusHierarchy.indexOf(nextStatus);
  
  order.tracking.events = order.tracking.events.map((ev) => {
    const evIndex = statusHierarchy.indexOf(ev.status);
    const completed = evIndex <= currentIndex;
    const isCurrent = evIndex === currentIndex;
    return {
      ...ev,
      completed,
      current: isCurrent,
      timestamp: isCurrent ? 'Just now' : ev.timestamp
    };
  });

  saveOrder(order);
  return order;
}
