import React, { useState, useEffect } from 'react';
import { 
  Star, 
  ShieldCheck, 
  ThumbsUp, 
  CheckCircle2, 
  MessageSquare, 
  Filter, 
  Sparkles,
  ArrowRight,
  UserCheck,
  ShoppingBag
} from 'lucide-react';
import { Product, ProductReview } from '../types';
import { MOCK_PRODUCTS } from '../data/mockProducts';
import { getStoredReviews, voteReviewHelpful } from '../data/reviewsData';

interface CustomerReviewsShowcaseProps {
  onOpenProductReviews: (product: Product) => void;
  onExploreProducts: () => void;
}

export const CustomerReviewsShowcase: React.FC<CustomerReviewsShowcaseProps> = ({
  onOpenProductReviews,
  onExploreProducts
}) => {
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [selectedRatingFilter, setSelectedRatingFilter] = useState<number | 'all'>('all');
  const [votedMap, setVotedMap] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setReviews(getStoredReviews());
  }, []);

  const handleHelpfulVote = (reviewId: string) => {
    if (votedMap[reviewId]) return;
    const updated = voteReviewHelpful(reviewId);
    setReviews(updated);
    setVotedMap(prev => ({ ...prev, [reviewId]: true }));
  };

  // Find product by id
  const getProductForReview = (productId: string) => {
    return MOCK_PRODUCTS.find(p => p.id === productId);
  };

  const filteredReviews = reviews.filter(rev => {
    if (selectedRatingFilter === 'all') return true;
    return rev.rating === selectedRatingFilter;
  });

  const totalReviewsCount = reviews.length;
  const averageRating = totalReviewsCount > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviewsCount).toFixed(1)
    : '4.9';

  return (
    <section id="customer-reviews-showcase" className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header with Aggregate Rating Stats */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold uppercase tracking-wider">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              Verified Customer Ratings & Reviews
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-['Outfit']">
              Loved by Discerning Shoppers Worldwide
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              Read transparent feedback, star ratings, and unedited experiences from verified Nobel Conect buyers.
            </p>
          </div>

          {/* Aggregate Badge */}
          <div className="bg-slate-50 p-4 sm:p-5 rounded-3xl border border-slate-200/80 flex items-center gap-5 shadow-xs shrink-0">
            <div className="text-center pr-4 border-r border-slate-200">
              <div className="text-3xl sm:text-4xl font-black text-slate-900 font-['Outfit'] flex items-center justify-center gap-1">
                <span>{averageRating}</span>
                <span className="text-sm text-slate-400 font-normal">/ 5</span>
              </div>
              <div className="flex items-center justify-center gap-0.5 text-amber-400 mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>100% Verified Purchases</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Based on real customer orders & verified serial tracking
              </p>
            </div>
          </div>
        </div>

        {/* Rating Filter Pills */}
        <div className="flex items-center justify-between gap-4 flex-wrap border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-xs font-semibold text-slate-500 flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5" /> Filter by:
            </span>
            <button
              onClick={() => setSelectedRatingFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedRatingFilter === 'all'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Reviews ({reviews.length})
            </button>
            {[5, 4, 3].map((stars) => {
              const count = reviews.filter(r => r.rating === stars).length;
              return (
                <button
                  key={stars}
                  onClick={() => setSelectedRatingFilter(stars)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    selectedRatingFilter === stars
                      ? 'bg-amber-500 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <span>{stars} Stars</span>
                  <span className="text-[10px] opacity-75">({count})</span>
                </button>
              );
            })}
          </div>

          <button
            onClick={onExploreProducts}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 cursor-pointer"
          >
            <span>Review an item from catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.slice(0, 6).map((review) => {
            const product = getProductForReview(review.productId);
            return (
              <div
                key={review.id}
                className="bg-slate-50/70 hover:bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  {/* Top row: stars + verified badge */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-slate-200'
                          }`}
                        />
                      ))}
                    </div>

                    {review.isVerifiedPurchase && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Verified Purchase
                      </span>
                    )}
                  </div>

                  {/* Review Title & Content */}
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {review.title}
                    </h4>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      "{review.comment}"
                    </p>
                  </div>
                </div>

                {/* Bottom: Reviewer details & Associated Product pill */}
                <div className="pt-4 border-t border-slate-200/80 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-slate-900 flex items-center gap-1.5">
                        <UserCheck className="w-3.5 h-3.5 text-indigo-600" />
                        <span>{review.authorName}</span>
                      </div>
                      <span className="text-[10px] text-slate-400">{review.date}</span>
                    </div>

                    <button
                      onClick={() => handleHelpfulVote(review.id)}
                      className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer ${
                        votedMap[review.id]
                          ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                          : 'text-slate-500 hover:bg-slate-200 hover:text-slate-800'
                      }`}
                      title="Mark review as helpful"
                    >
                      <ThumbsUp className="w-3 h-3" />
                      <span>{review.helpfulCount}</span>
                    </button>
                  </div>

                  {/* Associated Product Link */}
                  {product && (
                    <button
                      onClick={() => onOpenProductReviews(product)}
                      className="w-full p-2.5 rounded-2xl bg-white border border-slate-200 hover:border-indigo-400 flex items-center justify-between gap-3 text-left transition-all cursor-pointer group/item"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-8 h-8 rounded-lg object-cover shrink-0"
                        />
                        <div className="truncate">
                          <span className="text-[11px] font-bold text-slate-800 truncate block group-hover/item:text-indigo-600">
                            {product.name}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            View all {product.rating}★ reviews
                          </span>
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover/item:text-indigo-600 shrink-0" />
                    </button>
                  )}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
