import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ALL_PRODUCTS } from '../data/mockData';

export const WishlistScreen: React.FC = () => {
  const {
    wishlist,
    toggleWishlist,
    addToCart,
    setSelectedProduct,
    setCurrentScreen,
    formatPrice
  } = useApp();

  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  const wishlistedProducts = ALL_PRODUCTS.filter((p) => wishlist.includes(p.id));

  if (wishlistedProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <div className="w-16 h-16 rounded-full bg-[#f4f4f2] flex items-center justify-center text-[#ba1a1a] mb-4">
          <span className="material-symbols-outlined text-[32px]">favorite_border</span>
        </div>
        <h3 className="font-headline-md text-headline-md text-[#1a1c1b] font-serif">
          Your Wishlist is Empty
        </h3>
        <p className="font-body-sm text-body-sm text-[#444748] mt-1 max-w-sm">
          Bookmark hand-spun bridal sarees, heirloom brocades, and bespoke couture to review anytime.
        </p>
        <button
          onClick={() => setCurrentScreen('discover')}
          className="mt-6 px-6 py-3 bg-black text-white font-label-caps-md text-label-caps-md uppercase tracking-wider rounded-lg shadow-sm hover:bg-neutral-800 transition-colors"
        >
          Explore Discover
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full pb-32 text-[#1a1c1b] px-4 max-w-4xl mx-auto">
      <div className="pt-6 pb-2">
        <span className="font-label-caps-md text-label-caps-md text-[#735c00] font-bold uppercase tracking-widest">
          Personal Atelier
        </span>
        <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-[#1a1c1b] font-serif">
          Saved Ensembles ({wishlistedProducts.length})
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {wishlistedProducts.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-xl overflow-hidden shadow-xs border border-black/[0.04] flex flex-col"
          >
            <div
              className="relative aspect-[3/4] bg-[#eeeeec] cursor-pointer"
              onClick={() => {
                setSelectedProduct(p);
                setCurrentScreen('product_detail');
              }}
            >
              <img src={p.primaryImage} alt={p.title} className="w-full h-full object-cover" />
              <button
                aria-label="Remove from wishlist"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(p.id);
                }}
                className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#ba1a1a] shadow-xs active:scale-75 transition-transform"
              >
                <span
                  className="material-symbols-outlined text-[18px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  favorite
                </span>
              </button>
            </div>

            <div className="p-3 flex flex-col gap-1 flex-1 justify-between">
              <div>
                <span className="font-label-caps-sm text-label-caps-sm text-[#735c00] font-semibold uppercase">
                  {p.category}
                </span>
                <h4
                  onClick={() => {
                    setSelectedProduct(p);
                    setCurrentScreen('product_detail');
                  }}
                  className="font-headline-sm text-headline-sm text-[#1a1c1b] line-clamp-1 cursor-pointer hover:text-[#735c00]"
                >
                  {p.title}
                </h4>
                <p className="font-headline-sm text-headline-sm font-semibold text-[#1a1c1b] mt-1">
                  {formatPrice(p.priceINR)}
                </p>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  onClick={() => {
                    addToCart(p, p.colors[0], p.sizes[0], 1);
                    setRecentlyAddedId(p.id);
                    setTimeout(() => setRecentlyAddedId(null), 2000);
                  }}
                  className={`flex-1 py-2.5 ${
                    recentlyAddedId === p.id
                      ? 'bg-[#1b5e20] text-white'
                      : 'bg-[#1a1c1b] text-white hover:bg-neutral-800'
                  } rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-xs active:scale-95`}
                >
                  <span className="material-symbols-outlined text-[16px] text-[#ffe088]">
                    {recentlyAddedId === p.id ? 'check_circle' : 'shopping_bag'}
                  </span>
                  <span>{recentlyAddedId === p.id ? '✓ Added To Bag' : 'Add To Cart'}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
