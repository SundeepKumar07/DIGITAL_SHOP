import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ProductCard from "../Route/ProductCard/ProductCard";
import EventCard from "../../components/Events/EventCard"; // Make sure path matches your directory
import { BACKEND_URL } from "../../../server";

const ShopProfileData = ({ isOwner, shopId }) => {
  const [active, setActive] = useState(1);
  const { isLoading: productsLoading, allProducts, error: productError } = useSelector((state) => state.product);
  const { allEvents, isLoading: eventsLoading } = useSelector((state) => state.events || {});

  // 1. Filter products belonging to this shop
  const products = allProducts?.filter((item) => item.shopId === shopId) || [];

  // 2. Filter events belonging to this shop
  const events = allEvents?.filter((item) => item.shopId === shopId) || [];

  // 3. Extract and safely aggregate all reviews across this shop's products
  const reviews = allProducts?.filter((item) => item.shopId === shopId && item.reviews).flatMap((item) => item.reviews) || [];

  const tabItems = [
    { id: 1, label: `Shop Products (${products.length})` },
    { id: 2, label: `Shop Events (${events.length})` },
    { id: 3, label: `Shop Reviews (${reviews.length})` },
  ];

  // Helper function to dynamically render stars based on numeric rating values
  const renderStars = (rating) => {
    const totalStars = 5;
    const filledStars = Math.round(rating || 0);
    return (
      <span className="text-amber-400 text-sm tracking-tight">
        {"★".repeat(filledStars)}{"☆".repeat(totalStars - filledStars)}
      </span>
    );
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
      
      {/* Header & Navigation Tabs Container */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-gray-200 pb-4 gap-4">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-6 sm:gap-8 overflow-x-auto no-scrollbar">
          {tabItems.map((tab) => {
            const isActive = active === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                className={`text-base font-semibold transition-all duration-200 relative pb-4 -mb-4 border-b-2 outline-none whitespace-nowrap ${
                  isActive
                    ? "text-blue-600 border-blue-600 font-bold"
                    : "text-gray-500 border-transparent hover:text-gray-800"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Dashboard Link Action */}
        {isOwner && (
          <Link
            to="/shop-dashboard"
            className="inline-flex items-center justify-center px-4 py-2.5 bg-gray-900 text-white font-medium text-sm rounded-lg hover:bg-gray-800 transition duration-200 shadow-sm md:w-auto w-full"
          >
            Go to Dashboard
          </Link>
        )}
      </div>

      {/* Main Dynamic Content Display Area */}
      <div className="pt-6">
        
        {/* PRODUCTS TAB */}
        {active === 1 && (
          <>
            {productsLoading ? (
              <div className="flex flex-col items-center justify-center py-16 gap-3">
                <div className="w-8 h-8 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin" />
                <p className="text-sm font-medium text-gray-400">Loading products...</p>
              </div>
            ) : productError ? (
              <div className="text-center text-sm font-medium text-red-500 bg-red-50 rounded-lg p-4 max-w-md mx-auto my-8">
                {productError}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {products.length > 0 ? (
                  products.map((product) => (
                    <ProductCard data={product} key={product._id} />
                  ))
                ) : (
                  <div className="col-span-full flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-gray-100 rounded-xl bg-gray-50/50">
                    <p className="text-base font-semibold text-gray-700">No products found</p>
                    <p className="text-xs text-gray-400 mt-1">This shop has not posted items yet.</p>
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {/* EVENTS TAB */}
        {active === 2 && (
          <>
            {eventsLoading ? (
              <div className="flex flex-col items-center justify-center py-16 gap-3">
                <div className="w-8 h-8 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin" />
                <p className="text-sm font-medium text-gray-400">Loading shop events...</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {events.length > 0 ? (
                  events.map((event) => (
                    <EventCard data={event} key={event._id} />
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-gray-100 rounded-xl bg-gray-50/50">
                    <p className="text-base font-semibold text-gray-700">No ongoing events found</p>
                    <p className="text-xs text-gray-400 mt-1">Stay tuned for upcoming limited-time deals.</p>
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {/* REVIEWS TAB */}
        {active === 3 && (
          <div className="flex flex-col gap-4 max-w-4xl mx-auto">
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <div key={index} className="w-full bg-gray-50/40 border border-gray-100 p-4 rounded-xl flex items-start gap-4">
                  {/* User Avatar */}
                  <img
                    src={review?.user?.avatar ? `${BACKEND_URL}/${review.user.avatar}` : "/placeholder.png"}
                    alt="reviewer profile"
                    className="w-10 h-10 rounded-full object-cover border border-gray-100 flex-shrink-0"
                  />
                  
                  {/* Review Info Data Block */}
                  <div className="flex-1 space-y-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <h4 className="text-sm font-bold text-gray-800">{review?.user?.name || "Anonymous User"}</h4>
                      <div className="flex items-center gap-2">
                        {renderStars(review?.rating)}
                        <span className="text-[11px] font-medium text-gray-400">
                          {review?.createdAt ? new Date(review.createdAt).toLocaleDateString() : ""}
                        </span>
                      </div>
                    </div>
                    
                    {/* Feedback message narrative content */}
                    <p className="text-sm text-gray-600 leading-relaxed pt-0.5">
                      {review?.comment || "The buyer did not leave a written note with this review."}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-gray-100 rounded-xl bg-gray-50/50">
                <p className="text-base font-semibold text-gray-700">No reviews verified yet</p>
                <p className="text-xs text-gray-400 mt-1">Purchased product customer testimonials will appear here.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopProfileData;