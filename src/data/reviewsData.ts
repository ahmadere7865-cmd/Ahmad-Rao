import { ProductReview, ProductRatingStats } from '../types';

export const INITIAL_REVIEWS: ProductReview[] = [
  // AcousticPro Headphones (prod-1)
  {
    id: 'rev-101',
    productId: 'prod-1',
    authorName: 'Marcus Sterling',
    rating: 5,
    title: 'Unbelievable noise cancellation and clarity for the price!',
    comment: 'I travel weekly for work and have tested Bose and Sony flagships. The AcousticPro from Nobel Conect matches their active noise cancellation at literally half the cost. The battery life lasted through a 14-hour flight with 60% remaining. The memory foam cushions are delightfully soft.',
    date: '3 days ago',
    verifiedPurchase: true,
    orderId: 'NC-88421',
    helpfulCount: 42,
    recommend: true
  },
  {
    id: 'rev-102',
    productId: 'prod-1',
    authorName: 'Elena Rostova',
    rating: 5,
    title: 'Sublime acoustics, crisp highs and deep punchy bass',
    comment: 'The 40mm beryllium drivers make orchestral tracks and acoustic guitars sing with crisp detail. USB-C charging is fast, and the build quality feels super premium with the aluminum accents. Delivered in 2 days with real-time GPS tracking!',
    date: '1 week ago',
    verifiedPurchase: true,
    orderId: 'NC-77290',
    helpfulCount: 19,
    recommend: true
  },
  {
    id: 'rev-103',
    productId: 'prod-1',
    authorName: 'David K.',
    rating: 4,
    title: 'Terrific build quality, slightly snug fit for large heads',
    comment: 'Audio fidelity is top tier. ANC easily cancels office HVAC noise and coffee shop chatter. My only slight critique is the headband tension is slightly firm on day one, but it softened up nicely after a week of wearing.',
    date: '2 weeks ago',
    verifiedPurchase: true,
    helpfulCount: 8,
    recommend: true
  },

  // Chronos Elite Smartwatch (prod-2)
  {
    id: 'rev-201',
    productId: 'prod-2',
    authorName: 'Dr. Arthur Campbell',
    rating: 5,
    title: 'Grade 5 titanium feels indestructible and looks high-end',
    comment: 'I wear this in surgery and during marathon training. The sapphire crystal is completely scratch-resistant. Heart rate and SpO2 sensor accuracy matches my medical grade pulse oximeter. Incredible value for titanium construction.',
    date: '4 days ago',
    verifiedPurchase: true,
    orderId: 'NC-77290',
    helpfulCount: 35,
    recommend: true
  },
  {
    id: 'rev-202',
    productId: 'prod-2',
    authorName: 'Sophia Lin',
    rating: 5,
    title: 'Battery actually lasts 12+ days on a single charge',
    comment: 'No more charging my watch every evening! The Always-On AMOLED screen is razor sharp even under bright direct sunlight. The companion app connects seamlessly with Apple Health.',
    date: '2 weeks ago',
    verifiedPurchase: true,
    helpfulCount: 22,
    recommend: true
  },

  // Lumina Arc Task Light (prod-3)
  {
    id: 'rev-301',
    productId: 'prod-3',
    authorName: 'Julian H.',
    rating: 5,
    title: 'Completely cured my late-night desk eye fatigue',
    comment: 'The CRI 97+ daylight rating is genuinely noticeable when working on architectural schematics and graphic design. The wireless charging pad in the base is a great touch for keeping my phone topped off without extra wires.',
    date: '5 days ago',
    verifiedPurchase: true,
    helpfulCount: 14,
    recommend: true
  },
  {
    id: 'rev-302',
    productId: 'prod-3',
    authorName: 'Clara Oswald',
    rating: 5,
    title: 'Minimalist industrial aesthetics and stepless dimming',
    comment: 'The counterbalanced arm moves with zero effort and stays rock steady in position. Nobel Conect packaging was immaculate and delivery arrived on time.',
    date: '3 weeks ago',
    verifiedPurchase: true,
    helpfulCount: 11,
    recommend: true
  },

  // SoundSphere 360 Speaker (prod-4)
  {
    id: 'rev-401',
    productId: 'prod-4',
    authorName: 'Tyler Brooks',
    rating: 5,
    title: 'Survived an entire weekend camping trip and a dip in the lake',
    comment: 'It actually floats! We threw it in the water while paddleboarding and it kept playing clear sound without missing a beat. 30W output fills a backyard barbecue effortlessly.',
    date: '6 days ago',
    verifiedPurchase: true,
    helpfulCount: 27,
    recommend: true
  },

  // Nomad Pro Backpack (prod-5)
  {
    id: 'rev-501',
    productId: 'prod-5',
    authorName: 'Rachel Green',
    rating: 5,
    title: 'The ultimate commuter and one-bag travel companion',
    comment: 'Cordura nylon is thick and water beads right off during heavy downpours. The suspended laptop pocket protects my 16-inch laptop from hard table drops. The luggage strap slid easily over my suitcase handle.',
    date: '1 week ago',
    verifiedPurchase: true,
    helpfulCount: 16,
    recommend: true
  },

  // AeroGlide 4K Drone (prod-6)
  {
    id: 'rev-601',
    productId: 'prod-6',
    authorName: 'Vikram Mehta',
    rating: 5,
    title: 'Buttery smooth 4K gimbal footage and failsafe GPS return',
    comment: 'Under 249 grams so no FAA registration hurdles. The mechanical gimbal keeps video cinematic even in gusty 25mph coastal winds. The auto return-to-home works like a charm.',
    date: '2 days ago',
    verifiedPurchase: true,
    helpfulCount: 31,
    recommend: true
  },

  // ZenMist Diffuser (prod-7)
  {
    id: 'rev-701',
    productId: 'prod-7',
    authorName: 'Hannah Abbott',
    rating: 5,
    title: 'Heavy frosted ceramic dome looks like art on my nightstand',
    comment: 'Whisper quiet — you truly cannot hear it running. The warm ambient glow creates the most peaceful evening atmosphere. Essential oils disperse evenly across the whole living room.',
    date: '1 week ago',
    verifiedPurchase: true,
    helpfulCount: 9,
    recommend: true
  },

  // PowerMatrix 3-in-1 Charging Dock (prod-8)
  {
    id: 'rev-801',
    productId: 'prod-8',
    authorName: 'Nathan Drake',
    rating: 5,
    title: 'Replaced 3 separate ugly cords on my nightstand',
    comment: 'Genuine 15W MagSafe snap has high magnetic strength. Charges iPhone, Apple Watch Ultra, and AirPods all simultaneously without overheating. Excellent craftsmanship.',
    date: '4 days ago',
    verifiedPurchase: true,
    orderId: 'NC-88421',
    helpfulCount: 24,
    recommend: true
  }
];

const REVIEWS_STORAGE_KEY = 'nobel_conect_reviews_v1';

export function getStoredReviews(): ProductReview[] {
  try {
    const raw = localStorage.getItem(REVIEWS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error loading reviews from localStorage', e);
  }
  try {
    localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(INITIAL_REVIEWS));
  } catch (e) {
    // ignore
  }
  return INITIAL_REVIEWS;
}

export function getProductReviews(productId: string): ProductReview[] {
  const all = getStoredReviews();
  return all.filter(r => r.productId === productId);
}

export function saveProductReview(review: Omit<ProductReview, 'id' | 'date' | 'helpfulCount'>): ProductReview {
  const all = getStoredReviews();
  const newReview: ProductReview = {
    ...review,
    id: `rev-${Date.now()}`,
    date: 'Just now',
    helpfulCount: 0
  };
  const updated = [newReview, ...all];
  try {
    localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save review', e);
  }
  return newReview;
}

export function voteReviewHelpful(reviewId: string): { helpfulCount: number; userVoted: boolean } {
  const all = getStoredReviews();
  let updatedCount = 0;
  let userVoted = false;

  const updated = all.map(r => {
    if (r.id === reviewId) {
      if (r.userVotedHelpful) {
        updatedCount = Math.max(0, r.helpfulCount - 1);
        userVoted = false;
        return { ...r, helpfulCount: updatedCount, userVotedHelpful: false };
      } else {
        updatedCount = r.helpfulCount + 1;
        userVoted = true;
        return { ...r, helpfulCount: updatedCount, userVotedHelpful: true };
      }
    }
    return r;
  });

  try {
    localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to update review helpful count', e);
  }

  return { helpfulCount: updatedCount, userVoted };
}

export function getProductRatingStats(productId: string, defaultRating = 4.8, defaultCount = 100): ProductRatingStats {
  const reviews = getProductReviews(productId);

  if (reviews.length === 0) {
    return {
      averageRating: defaultRating,
      totalReviews: defaultCount,
      recommendedPercentage: 96,
      distribution: {
        5: Math.round(defaultCount * 0.78),
        4: Math.round(defaultCount * 0.16),
        3: Math.round(defaultCount * 0.04),
        2: Math.round(defaultCount * 0.01),
        1: Math.round(defaultCount * 0.01)
      }
    };
  }

  const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  let sum = 0;
  let recommendCount = 0;

  reviews.forEach(r => {
    const star = Math.min(5, Math.max(1, Math.round(r.rating))) as 1 | 2 | 3 | 4 | 5;
    distribution[star] = (distribution[star] || 0) + 1;
    sum += r.rating;
    if (r.recommend) recommendCount++;
  });

  const averageRating = Number((sum / reviews.length).toFixed(1));
  const recommendedPercentage = Math.round((recommendCount / reviews.length) * 100);

  return {
    averageRating,
    totalReviews: reviews.length,
    recommendedPercentage,
    distribution
  };
}
