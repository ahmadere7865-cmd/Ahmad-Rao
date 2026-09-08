import React, { useState, useMemo, useEffect } from 'react';
import { 
  Sparkles, 
  SlidersHorizontal, 
  Search, 
  ShoppingBag, 
  Check, 
  ArrowUpDown,
  Filter
} from 'lucide-react';
import { Category, Currency, CartItem, Product, Order } from './types';
import { MOCK_PRODUCTS } from './data/mockProducts';
import { getStoredOrders } from './data/sampleOrders';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ProductCard } from './components/ProductCard';
import { ProductQuickView } from './components/ProductQuickView';
import { CartDrawer } from './components/CartDrawer';
import { FavoritesDrawer } from './components/FavoritesDrawer';
import { SecureCheckoutModal } from './components/SecureCheckoutModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { OrderTrackingSection } from './components/OrderTrackingSection';
import { CustomerReviewsShowcase } from './components/CustomerReviewsShowcase';
import { CustomerSupportModal } from './components/CustomerSupportModal';
import { Footer } from './components/Footer';

export default function App() {
  // Navigation & Search State
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [currency, setCurrency] = useState<Currency>('USD');

  // Modals & Drawers
  const [cartOpen, setCartOpen] = useState(false);
  const [favoritesOpen, setFavoritesOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [trackingOpen, setTrackingOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [quickViewTab, setQuickViewTab] = useState<'details' | 'reviews'>('details');

  // Active tracking order ID to focus on when opening tracker
  const [activeTrackingOrderId, setActiveTrackingOrderId] = useState<string | undefined>(undefined);

  // Cart State
  const [cart, setCart] = useState<CartItem[]>([
    { product: MOCK_PRODUCTS[0], quantity: 1 } // Pre-populated so users can experience cart immediately
  ]);
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [appliedPromoCode, setAppliedPromoCode] = useState<string>('');

  // Wishlist / Favorites State
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('nobel_wishlist_ids');
      return saved ? JSON.parse(saved) : ['prod-1', 'prod-3'];
    } catch {
      return ['prod-1', 'prod-3'];
    }
  });

  // Sync wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('nobel_wishlist_ids', JSON.stringify(wishlistIds));
    } catch (e) {
      console.error('Error saving wishlist to localStorage', e);
    }
  }, [wishlistIds]);

  // Added item toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  // Cart Handlers
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });

    setRecentlyAddedId(product.id);
    setTimeout(() => setRecentlyAddedId(null), 1500);
    showToast(`Added "${product.name}" to cart`);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleStartCheckout = (discount: number, promo: string) => {
    setDiscountAmount(discount);
    setAppliedPromoCode(promo);
    setCartOpen(false);
    setCheckoutOpen(true);
  };

  const handleBuyNowDirect = (product: Product, quantity: number) => {
    setCart([{ product, quantity }]);
    setQuickViewProduct(null);
    setDiscountAmount(0);
    setAppliedPromoCode('');
    setCheckoutOpen(true);
  };

  // On successful order creation from payment gateway
  const handleOrderSuccess = (order: Order) => {
    setCheckoutOpen(false);
    setCart([]); // Clear cart
    setActiveTrackingOrderId(order.id);
    setTrackingOpen(true); // Direct user right to real-time tracking!
  };

  // Wishlist Handlers
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(product.id);
      if (exists) {
        showToast(`Removed "${product.name}" from Favorites`);
        return prev.filter((id) => id !== product.id);
      } else {
        showToast(`Saved "${product.name}" to Favorites ❤️`);
        return [...prev, product.id];
      }
    });
  };

  const handleRemoveFavorite = (productId: string) => {
    const product = MOCK_PRODUCTS.find((p) => p.id === productId);
    setWishlistIds((prev) => prev.filter((id) => id !== productId));
    if (product) {
      showToast(`Removed "${product.name}" from Favorites`);
    }
  };

  const handleClearFavorites = () => {
    setWishlistIds([]);
    showToast('Cleared all favorites');
  };

  const handleAddAllFavoritesToCart = () => {
    const favoriteProducts = MOCK_PRODUCTS.filter((p) => wishlistIds.includes(p.id));
    if (favoriteProducts.length === 0) return;

    setCart((prev) => {
      let updated = [...prev];
      for (const prod of favoriteProducts) {
        const idx = updated.findIndex((item) => item.product.id === prod.id);
        if (idx >= 0) {
          updated[idx] = { ...updated[idx], quantity: updated[idx].quantity + 1 };
        } else {
          updated.push({ product: prod, quantity: 1 });
        }
      }
      return updated;
    });

    showToast(`Added ${favoriteProducts.length} favorite ${favoriteProducts.length === 1 ? 'item' : 'items'} to cart!`);
    setFavoritesOpen(false);
    setCartOpen(true);
  };

  const wishlistProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((p) => wishlistIds.includes(p.id));
  }, [wishlistIds]);

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === 'all' || product.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.tagline.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured
    });
  }, [searchQuery, selectedCategory, sortBy]);

  const categories: { id: Category; label: string }[] = [
    { id: 'all', label: 'All Products' },
    { id: 'electronics', label: 'Smart Tech & Drones' },
    { id: 'audio', label: 'High-Fidelity Audio' },
    { id: 'wearables', label: 'Titanium Wearables' },
    { id: 'home', label: 'Living & Workspace' },
    { id: 'lifestyle', label: 'Travel & Lifestyle' }
  ];

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl border border-slate-700 flex items-center gap-2.5 text-xs font-semibold animate-in fade-in slide-in-from-bottom-3 duration-200">
          <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
            <Check className="w-3 h-3 stroke-[3]" />
          </span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Banner */}
      <AnnouncementBar />

      {/* Navbar */}
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        cartCount={totalCartCount}
        onOpenCart={() => setCartOpen(true)}
        wishlistCount={wishlistIds.length}
        onOpenFavorites={() => setFavoritesOpen(true)}
        onOpenTracker={() => {
          setActiveTrackingOrderId(undefined);
          setTrackingOpen(true);
        }}
        onOpenSupport={() => setSupportOpen(true)}
        onNavigateToWhyUs={() => {
          document.getElementById('why-choose-us-section')?.scrollIntoView({ behavior: 'smooth' });
        }}
        currentCurrency={currency}
        onCurrencyChange={setCurrency}
      />

      {/* Hero Welcome Section */}
      <HeroSection
        onExploreClick={() => {
          document.getElementById('product-catalog-section')?.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenTracker={() => {
          setActiveTrackingOrderId(undefined);
          setTrackingOpen(true);
        }}
      />

      {/* Why Choose Nobel Conect - 6 Core Pillars */}
      <WhyChooseUs
        onExploreProducts={() => {
          document.getElementById('product-catalog-section')?.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenSupport={() => setSupportOpen(true)}
      />

      {/* Main Catalog Section */}
      <main id="product-catalog-section" className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 w-full">
        
        {/* Catalog Header & Filters */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                Handpicked Collections
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-['Outfit']">
                Explore Quality Products & Value
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Showing {filteredProducts.length} premium products backed by guaranteed quality and secure delivery.
              </p>
            </div>

            {/* Sorting & Category Controls */}
            <div className="flex items-center gap-3 self-start md:self-auto">
              <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-200 text-xs shadow-2xs">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-slate-500 font-medium">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="font-bold text-slate-800 bg-transparent focus:outline-hidden cursor-pointer"
                >
                  <option value="featured">Featured Picks</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
          </div>

          {/* Category Pill Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                    : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                currency={currency}
                onAddToCart={(p) => handleAddToCart(p, 1)}
                onQuickView={(p, tab) => {
                  setQuickViewProduct(p);
                  setQuickViewTab(tab || 'details');
                }}
                isAdded={recentlyAddedId === product.id}
                isFavorited={wishlistIds.includes(product.id)}
                onToggleWishlist={handleToggleWishlist}
              />
            ))}
          </div>
        ) : (
          <div className="mt-12 text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <Search className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800 font-['Outfit']">No products match your search</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Try searching for a different keyword or switch to "All Products".
              </p>
            </div>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-sm"
            >
              Reset Filters
            </button>
          </div>
        )}

      </main>

      {/* Customer Reviews & Ratings Showcase */}
      <CustomerReviewsShowcase
        onOpenProductReviews={(prod) => {
          setQuickViewProduct(prod);
          setQuickViewTab('reviews');
        }}
        onExploreProducts={() => {
          document.getElementById('product-catalog-section')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Live Order Tracking Directly on Website */}
      <OrderTrackingSection
        currency={currency}
        onOpenFullModal={(orderId) => {
          setActiveTrackingOrderId(orderId);
          setTrackingOpen(true);
        }}
        onViewProduct={(prodId) => {
          const found = MOCK_PRODUCTS.find(p => p.id === prodId);
          if (found) {
            setQuickViewProduct(found);
            setQuickViewTab('details');
          }
        }}
      />

      {/* Footer */}
      <Footer
        onOpenTracker={() => {
          const el = document.getElementById('order-tracking');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          } else {
            setActiveTrackingOrderId(undefined);
            setTrackingOpen(true);
          }
        }}
        onOpenSupport={() => setSupportOpen(true)}
        onNavigateToWhyUs={() => {
          document.getElementById('why-choose-us-section')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        currency={currency}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleStartCheckout}
        onExploreProducts={() => {
          document.getElementById('product-catalog-section')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Favorites & Wishlist Drawer */}
      <FavoritesDrawer
        isOpen={favoritesOpen}
        onClose={() => setFavoritesOpen(false)}
        products={wishlistProducts}
        currency={currency}
        onAddToCart={(p, qty) => handleAddToCart(p, qty || 1)}
        onRemoveFavorite={handleRemoveFavorite}
        onClearFavorites={handleClearFavorites}
        onAddAllToCart={handleAddAllFavoritesToCart}
        onExploreProducts={() => {
          setFavoritesOpen(false);
          document.getElementById('product-catalog-section')?.scrollIntoView({ behavior: 'smooth' });
        }}
        onQuickView={(p) => {
          setFavoritesOpen(false);
          setQuickViewProduct(p);
          setQuickViewTab('details');
        }}
      />

      {/* Multi-Gateway Secure Checkout Modal */}
      <SecureCheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        items={cart}
        currency={currency}
        discountAmount={discountAmount}
        promoCode={appliedPromoCode}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Real-Time Order Tracking Modal */}
      <OrderTrackingModal
        isOpen={trackingOpen}
        onClose={() => setTrackingOpen(false)}
        currency={currency}
        initialOrderId={activeTrackingOrderId}
        onExploreProducts={() => {
          setTrackingOpen(false);
          document.getElementById('product-catalog-section')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Product Quick View Modal */}
      <ProductQuickView
        product={quickViewProduct}
        currency={currency}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNowDirect}
        defaultTab={quickViewTab}
        isFavorited={quickViewProduct ? wishlistIds.includes(quickViewProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />

      {/* Customer Support Live Chat Modal */}
      <CustomerSupportModal
        isOpen={supportOpen}
        onClose={() => setSupportOpen(false)}
        onOpenTracker={() => {
          setSupportOpen(false);
          setTrackingOpen(true);
        }}
      />

    </div>
  );
}
