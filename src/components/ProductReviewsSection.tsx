import React, { useState, useEffect } from 'react';
import { 
  Star, 
  CheckCircle2, 
  ThumbsUp, 
  MessageSquarePlus, 
  Filter, 
  Sparkles, 
  ShieldCheck, 
  User, 
  X,
  Send,
  AlertCircle
} from 'lucide-react';
import { Product, ProductReview, ProductRatingStats } from '../types';
import { 
  getProductReviews, 
  saveProductReview, 
  voteReviewHelpful, 
  getProductRatingStats 
} from '../data/reviewsData';

interface ProductReviewsSectionProps {
  product: Product;
  onReviewAdded?: () => void;
}

export const ProductReviewsSection: React.FC<ProductReviewsSectionProps> = ({
  product,
  onReviewAdded
}) => {
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [stats, setStats] = useState<ProductRatingStats>({
    averageRating: product.rating,
    totalReviews: product.reviewCount,
    recommendedPercentage: 97,
    distribution: { 5: 80, 4: 15, 3: 4, 2: 1, 1: 0 }
  });

  const [filterRating, setFilterRating] = useState<number | 'all'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'highest' | 'helpful'>('newest');
  const [showReviewModal, setShowReviewModal] = useState(false);

  // Review Form State
  const [formRating, setFormRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [orderId, setOrderId] = useState('');
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [recommend, setRecommend] = useState(true);
  const [verifiedBuyer, setVerifiedBuyer] = useState(true);
  const [formError, setFormError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const loadData = () => {
    const list = getProductReviews(product.id);
    setReviews(list);
    const calculatedStats = getProductRatingStats(product.id, product.rating, product.reviewCount);
    setStats(calculatedStats);
  };

  useEffect(() => {
    loadData();
  }, [product.id]);

  const handleHelpfulVote = (reviewId: string) => {
    voteReviewHelpful(reviewId);
    loadData();
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!authorName.trim()) {
      setFormError('Please enter your name');
      return;
    }
    if (!reviewTitle.trim()) {
      setFormError('Please enter a headline for your review');
      return;
    }
    if (!reviewComment.trim() || reviewComment.trim().length < 10) {
      setFormError('Please provide at least 10 characters detailing your experience');
      return;
    }

    saveProductReview({
      productId: product.id,
      authorName: authorName.trim(),
      rating: formRating,
      title: reviewTitle.trim(),
      comment: reviewComment.trim(),
      verifiedPurchase: verifiedBuyer,
      orderId: orderId.trim() || undefined,
      recommend
    });

    setSubmitSuccess(true);
    loadData();
    if (onReviewAdded) onReviewAdded();

    setTimeout(() => {
      setSubmitSuccess(false);
      setShowReviewModal(false);
      // Reset form
      setReviewTitle('');
      setReviewComment('');
    }, 1400);
  };

  // Filtered & Sorted list
  const filteredReviews = reviews.filter(r => {
    if (filterRating === 'all') return true;
    return Math.round(r.rating) === filterRating;
  }).sort((a, b) => {
    if (sortBy === 'highest') return b.rating - a.rating;
    if (sortBy === 'helpful') return b.helpfulCount - a.helpfulCount;
    return 0; // default newest
  });

  const ratingDescriptors: Record<number, string> = {
    5: 'Exceptional — Highly Recommended',
    4: 'Very Good — Solid Performance',
    3: 'Average — Met Standard Expectations',
    2: 'Below Average — Room for Improvement',
    1: 'Poor — Dissatisfied'
  };

  return (
    <div id="product-reviews-container" className="space-y-6 pt-4">
      {/* Top Header with Breakdown */}
      <div className="bg-slate-50 rounded-2xl p-4 sm:p-6 border border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          {/* Average Rating Score */}
          <div className="md:col-span-4 text-center md:text-left space-y-2 border-b md:border-b-0 md:border-r border-slate-200 pb-4 md:pb-0 md:pr-6">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="text-4xl sm:text-5xl font-black text-slate-900 font-['Outfit']">
                {stats.averageRating.toFixed(1)}
              </span>
              <div>
                <div className="flex items-center text-amber-400">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`w-4 h-4 ${
                        s <= Math.round(stats.averageRating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-slate-300'
                      }`}
                    />
                  ))}
                </div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">
                  Based on {stats.totalReviews} verified reviews
                </div>
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{stats.recommendedPercentage}% of customers recommend this</span>
            </div>
          </div>

          {/* Star Distribution Bars */}
          <div className="md:col-span-5 space-y-1.5 text-xs">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = stats.distribution[star as keyof typeof stats.distribution] || 0;
              const pct = stats.totalReviews > 0 ? Math.round((count / stats.totalReviews) * 100) : 0;

              return (
                <button
                  key={star}
                  onClick={() => setFilterRating(filterRating === star ? 'all' : star)}
                  className={`w-full flex items-center gap-2 group text-left cursor-pointer transition-colors ${
                    filterRating === star ? 'font-bold text-indigo-700' : 'text-slate-600'
                  }`}
                >
                  <span className="w-12 text-[11px] font-medium flex items-center gap-1">
                    <span>{star}</span>
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  </span>
                  
                  <div className="flex-1 h-2 rounded-full bg-slate-200 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${
                        filterRating === star ? 'bg-indigo-600' : 'bg-amber-400 group-hover:bg-amber-500'
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>

                  <span className="w-8 text-right text-[10px] text-slate-400">
                    {pct}%
                  </span>
                </button>
              );
            })}
          </div>

          {/* Call to Action: Write a review */}
          <div className="md:col-span-3 text-center md:text-right">
            <button
              onClick={() => setShowReviewModal(true)}
              className="w-full sm:w-auto px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>Write a Review</span>
            </button>
            <p className="text-[11px] text-slate-400 mt-2">
              Purchased this item? Share your verified feedback
            </p>
          </div>

        </div>
      </div>

      {/* Filter and Sort Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-slate-500 font-medium">Filter:</span>
          <div className="flex items-center gap-1 overflow-x-auto">
            <button
              onClick={() => setFilterRating('all')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
                filterRating === 'all'
                  ? 'bg-slate-900 text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
              }`}
            >
              All Stars
            </button>
            {[5, 4, 3, 2, 1].map((s) => (
              <button
                key={s}
                onClick={() => setFilterRating(filterRating === s ? 'all' : s)}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-colors flex items-center gap-1 cursor-pointer ${
                  filterRating === s
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                <span>{s}</span>
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-500 font-medium">Sort By:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-white border border-slate-200 rounded-lg px-2.5 py-1 font-semibold text-slate-800 text-xs focus:outline-hidden focus:border-indigo-600 cursor-pointer"
          >
            <option value="newest">Most Recent</option>
            <option value="highest">Highest Rating</option>
            <option value="helpful">Most Helpful</option>
          </select>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-3.5">
        {filteredReviews.length > 0 ? (
          filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 space-y-3 shadow-2xs hover:border-slate-300 transition-colors"
            >
              {/* Reviewer Meta & Star Rating */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs uppercase font-['Outfit']">
                    {rev.authorName.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-xs sm:text-sm">
                        {rev.authorName}
                      </span>
                      {rev.verifiedPurchase && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                          <ShieldCheck className="w-3 h-3 text-emerald-600" />
                          Verified Buyer
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium">
                      Reviewed {rev.date} {rev.orderId && `• Order #${rev.orderId}`}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-amber-400">
                  {[1, 2, 3, 4, 5].map((st) => (
                    <Star
                      key={st}
                      className={`w-3.5 h-3.5 ${
                        st <= rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Title & Comment */}
              <div>
                <h5 className="font-bold text-slate-900 text-xs sm:text-sm">
                  {rev.title}
                </h5>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1">
                  {rev.comment}
                </p>
              </div>

              {/* Recommendation & Helpful Button */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                {rev.recommend ? (
                  <span className="text-emerald-700 text-[11px] font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Recommends this product
                  </span>
                ) : (
                  <span />
                )}

                <button
                  onClick={() => handleHelpfulVote(rev.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                    rev.userVotedHelpful
                      ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-600'
                  }`}
                >
                  <ThumbsUp className={`w-3 h-3 ${rev.userVotedHelpful ? 'fill-indigo-600 text-indigo-600' : ''}`} />
                  <span>Helpful ({rev.helpfulCount})</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10 bg-slate-50 rounded-2xl border border-slate-200">
            <p className="text-xs text-slate-500">
              No reviews found matching {filterRating !== 'all' ? `${filterRating}-star rating` : 'current filters'}.
            </p>
            <button
              onClick={() => setFilterRating('all')}
              className="mt-2 text-xs font-bold text-indigo-600 hover:underline cursor-pointer"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* Review Submission Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          <div className="relative bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden">
            {/* Header */}
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300">
                  <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                </div>
                <div>
                  <h4 className="font-bold text-base font-['Outfit']">
                    Submit Customer Review
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-1">
                    {product.name}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowReviewModal(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submitSuccess ? (
              <div className="p-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h5 className="font-black text-lg text-slate-900 font-['Outfit']">
                  Review Published!
                </h5>
                <p className="text-xs text-slate-500">
                  Thank you for contributing to Nobel Conect. Your feedback is now live on this product.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="p-5 sm:p-6 space-y-4 max-h-[80vh] overflow-y-auto">
                {formError && (
                  <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                {/* Interactive Star Rating Selector */}
                <div className="space-y-1 text-center py-2 bg-slate-50 rounded-2xl border border-slate-200">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600 block">
                    Your Overall Rating
                  </label>
                  <div className="flex items-center justify-center gap-2 pt-1">
                    {[1, 2, 3, 4, 5].map((starVal) => {
                      const isFilled = starVal <= (hoverRating || formRating);
                      return (
                        <button
                          key={starVal}
                          type="button"
                          onMouseEnter={() => setHoverRating(starVal)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => setFormRating(starVal)}
                          className="p-1 transition-transform hover:scale-125 focus:outline-hidden cursor-pointer"
                        >
                          <Star
                            className={`w-7 h-7 transition-colors ${
                              isFilled
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-slate-300'
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>
                  <div className="text-xs font-semibold text-indigo-700 pt-0.5">
                    {ratingDescriptors[hoverRating || formRating]}
                  </div>
                </div>

                {/* Author Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      placeholder="e.g. Jordan Miller"
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:border-indigo-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address (private)
                    </label>
                    <input
                      type="email"
                      value={authorEmail}
                      onChange={(e) => setAuthorEmail(e.target.value)}
                      placeholder="jordan@example.com"
                      className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:border-indigo-600"
                    />
                  </div>
                </div>

                {/* Optional Order ID */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center justify-between">
                    <span>Nobel Conect Order ID (optional)</span>
                    <span className="text-[10px] text-slate-400">e.g. NC-88421</span>
                  </label>
                  <input
                    type="text"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    placeholder="NC-XXXXX"
                    className="w-full px-3.5 py-2 text-xs font-mono uppercase bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:border-indigo-600"
                  />
                </div>

                {/* Review Headline */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Review Headline
                  </label>
                  <input
                    type="text"
                    value={reviewTitle}
                    onChange={(e) => setReviewTitle(e.target.value)}
                    placeholder="e.g. Best wireless sound I have experienced in this price range"
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:border-indigo-600"
                  />
                </div>

                {/* Detailed Feedback */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Detailed Review
                  </label>
                  <textarea
                    rows={4}
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    placeholder="Describe product performance, material durability, packaging, and shipping experience..."
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:border-indigo-600"
                  />
                </div>

                {/* Toggles */}
                <div className="space-y-2 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700">
                    <input
                      type="checkbox"
                      checked={verifiedBuyer}
                      onChange={(e) => setVerifiedBuyer(e.target.checked)}
                      className="rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="flex items-center gap-1 font-medium">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      Verified Nobel Conect Customer Purchase
                    </span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700">
                    <input
                      type="checkbox"
                      checked={recommend}
                      onChange={(e) => setRecommend(e.target.checked)}
                      className="rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="font-medium">
                      I recommend this product to other Nobel Conect customers
                    </span>
                  </label>
                </div>

                {/* Submit Action */}
                <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowReviewModal(false)}
                    className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-800 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Publish Review</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
