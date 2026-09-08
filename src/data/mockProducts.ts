import { Product, ShippingMethod } from '../types';

export const SHIPPING_METHODS: ShippingMethod[] = [
  {
    id: 'standard',
    name: 'Nobel Standard Delivery',
    price: 0,
    estimatedDelivery: '3–5 Business Days',
    description: 'Safe & tracked delivery via Nobel Express logistics network'
  },
  {
    id: 'express',
    name: 'Express Priority Courier',
    price: 9.99,
    estimatedDelivery: '1–2 Business Days',
    description: 'Dedicated air freight with expedited dispatch & continuous GPS tracking'
  },
  {
    id: 'sameday',
    name: 'Same-Day Metro Dispatch',
    price: 18.99,
    estimatedDelivery: 'Today by 8:00 PM',
    description: 'Direct courier hand-off for select metropolitan zones'
  }
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'AcousticPro ANC Wireless Headphones',
    category: 'audio',
    tagline: 'Pure studio fidelity with 42dB adaptive hybrid noise cancellation',
    price: 149.99,
    originalPrice: 219.99,
    rating: 4.9,
    reviewCount: 428,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    badge: 'Bestseller',
    inStock: true,
    stockCount: 14,
    description: 'Engineered for audiophiles and travelers alike, the AcousticPro delivers rich, high-resolution acoustics with 40mm beryllium drivers and whisper-quiet hybrid noise cancellation.',
    features: [
      'Active Hybrid Noise Cancellation (-42dB)',
      'Up to 55-hour battery life with USB-C quick charge',
      'Plush memory foam earcups with aerospace aluminum chassis',
      'Dual multi-point Bluetooth 5.3 connection'
    ],
    specs: {
      'Driver Size': '40mm High-Res Dynamic',
      'Battery Life': '55 Hours (ANC off) / 40 Hours (ANC on)',
      'Connectivity': 'Bluetooth 5.3 + 3.5mm Aux',
      'Weight': '248 grams'
    },
    warrantyMonths: 24
  },
  {
    id: 'prod-2',
    name: 'Chronos Elite Titanium Smartwatch',
    category: 'wearables',
    tagline: 'Aerospace-grade titanium frame with AMOLED retina touch display',
    price: 189.00,
    originalPrice: 249.00,
    rating: 4.8,
    reviewCount: 312,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    badge: 'Quality Pick',
    inStock: true,
    stockCount: 8,
    description: 'Sleek, durable, and packed with health-monitoring sensors. Chronos Elite measures continuous heart rate, SpO2, HRV, and sleep stages, packaged in scratch-resistant sapphire crystal glass.',
    features: [
      'Grade 5 Titanium bezel with sapphire crystal lens',
      '1.43-inch Always-On Super AMOLED (1000 nits)',
      'Comprehensive 24/7 health, sleep, and ECG metrics',
      '5 ATM water resistance (swimming safe up to 50m)'
    ],
    specs: {
      'Display': '1.43" AMOLED 466x466',
      'Battery': 'Up to 14 days normal usage',
      'Waterproof': '50 Meters (5 ATM)',
      'Compatibility': 'iOS & Android'
    },
    warrantyMonths: 24
  },
  {
    id: 'prod-3',
    name: 'Lumina Arc Ergonomic LED Task Light',
    category: 'home',
    tagline: 'Flicker-free natural daylight spectrum with wireless touch dimming',
    price: 79.50,
    originalPrice: 119.00,
    rating: 4.9,
    reviewCount: 194,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
    badge: 'Top Rated',
    inStock: true,
    stockCount: 22,
    description: 'Designed to eliminate eye strain during long hours of reading or creative work. Features CRI 97+ circadian lighting that shifts automatically with the sun.',
    features: [
      '97+ High Color Rendering Index (CRI)',
      'Stepless dual-dial brightness and color temperature adjustment',
      'Integrated Qi wireless phone fast-charging base (15W)',
      'Precision counterbalanced aluminum arm'
    ],
    specs: {
      'Max Luminance': '1200 Lux at 45cm',
      'Color Temperature': '2700K – 6500K Tunable',
      'Wireless Charging': '15W Fast Charge Qi Certified',
      'Lifespan': '50,000+ hours'
    },
    warrantyMonths: 36
  },
  {
    id: 'prod-4',
    name: 'SoundSphere 360 Waterproof Speaker',
    category: 'audio',
    tagline: 'Omnidirectional room-filling bass with IPX7 submersible design',
    price: 64.99,
    originalPrice: 89.99,
    rating: 4.7,
    reviewCount: 560,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80',
    badge: 'Best Value',
    inStock: true,
    stockCount: 30,
    description: 'Punchy 360-degree sound with dual passive bass radiators. Rugged silicone weave allows it to float on water or withstand dust, dirt, and drops.',
    features: [
      '30W RMS output with dual neodymium drivers',
      'IPX7 waterproof & buoyant (it floats in the pool)',
      'PartyLink pairs up to 100+ units together',
      '20-hour non-stop battery with power bank output'
    ],
    specs: {
      'Audio Output': '30W Stereo 360°',
      'Battery Life': '20 Hours at 60% Volume',
      'Waterproof Rating': 'IPX7 Certified',
      'Range': '30 meters / 100 ft'
    },
    warrantyMonths: 12
  },
  {
    id: 'prod-5',
    name: 'Nomad Pro Weatherproof Everyday Backpack',
    category: 'lifestyle',
    tagline: 'Modular 24L capacity with RFID-blocking passport compartment',
    price: 94.00,
    originalPrice: 135.00,
    rating: 4.9,
    reviewCount: 280,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    badge: 'Quality Pick',
    inStock: true,
    stockCount: 11,
    description: 'Crafted from 1000D ballistic recycled nylon with waterproof YKK AquaGuard zippers. Includes a suspended padded sleeve fitting up to 16-inch laptops.',
    features: [
      'Weatherproof recycled Cordura exterior',
      'Suspended 16" laptop pocket with fleece lining',
      'Concealed RFID travel passport and cash pocket',
      'Ergonomic breathable back panel with luggage passthrough'
    ],
    specs: {
      'Volume': '24 Liters',
      'Laptop Sleeve': 'Fits up to 16" MacBook Pro',
      'Material': '1000D Recycled Cordura Nylon',
      'Weight': '1.1 kg'
    },
    warrantyMonths: 60
  },
  {
    id: 'prod-6',
    name: 'AeroGlide 4K GPS Folding Drone',
    category: 'electronics',
    tagline: '3-Axis stabilized 4K HDR camera with 35-minute flight time',
    price: 279.99,
    originalPrice: 389.99,
    rating: 4.8,
    reviewCount: 168,
    image: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=800&q=80',
    badge: 'New Arrival',
    inStock: true,
    stockCount: 6,
    description: 'Capture cinematic 4K video with effortless stability. Intelligent auto-return, follow-me AI tracking, and level-6 wind resistance make flying intuitive for everyone.',
    features: [
      '4K HDR 60fps video with 1/2-inch CMOS sensor',
      '3-Axis mechanical gimbal for jitter-free footage',
      '10km high-definition video transmission range',
      'Dual GPS + GLONASS fail-safe return-to-home'
    ],
    specs: {
      'Camera': '4K / 60fps, 48MP Stills',
      'Max Flight Time': '35 Minutes per battery',
      'Max Distance': '10 Kilometers',
      'Weight': '249g (No license required)'
    },
    warrantyMonths: 12
  },
  {
    id: 'prod-7',
    name: 'ZenMist Ultrasonic Diffuser & Ambient Lamp',
    category: 'home',
    tagline: 'Hand-blown frosted ceramic dome with whisper-quiet vaporization',
    price: 48.00,
    originalPrice: 65.00,
    rating: 4.7,
    reviewCount: 342,
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80',
    badge: 'Best Value',
    inStock: true,
    stockCount: 19,
    description: 'Transform your room into a tranquil haven. Uses 2.4MHz ultrasonic frequencies to disperse natural botanical oils without heat, keeping air purified and moist.',
    features: [
      'Solid ceramic exterior with warm candle-glow ambient light',
      'Ultrasonic cool-mist atomization (sub-20dB silent operation)',
      'Automatic waterless auto-shutoff sensor',
      'Covers up to 500 square feet continuously for 12 hours'
    ],
    specs: {
      'Water Capacity': '300 mL',
      'Coverage Area': '45 - 50 m²',
      'Noise Level': '< 19 dB',
      'Timer Modes': '1h / 3h / 6h / Continuous'
    },
    warrantyMonths: 24
  },
  {
    id: 'prod-8',
    name: 'PowerMatrix 3-in-1 MagSafe Charging Dock',
    category: 'electronics',
    tagline: 'Simultaneous fast wireless charging for Phone, Watch, and Earbuds',
    price: 58.99,
    originalPrice: 85.00,
    rating: 4.9,
    reviewCount: 410,
    image: 'https://images.unsplash.com/photo-1622445262464-84b1456045b6?auto=format&fit=crop&w=800&q=80',
    badge: 'Bestseller',
    inStock: true,
    stockCount: 25,
    description: 'Cut cable clutter on your bedside table or office desk. Features genuine 15W MagSafe magnetic alignment for iPhones, plus dedicated Apple/Galaxy watch and earbud pads.',
    features: [
      'Official 15W peak MagSafe magnetic charging',
      'Space-saving foldable design ideal for travel',
      'Intelligent thermal management and foreign object detection',
      'Soft-touch matte silicone with solid zinc alloy hinge'
    ],
    specs: {
      'Output': '15W Phone + 5W Watch + 5W Earbuds',
      'Input Port': 'USB-C (30W PD adapter included)',
      'Dimensions': '140 x 75 x 18 mm (Folded)',
      'Safety': 'Qi 2.0, CE, FCC, RoHS Certified'
    },
    warrantyMonths: 24
  }
];
