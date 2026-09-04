import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  HERO_IMAGE_URL,
  CATEGORIES,
  COLLECTIONS,
  AURUM_SAREE_PRODUCT,
  NOCTURNE_ANARKALI_PRODUCT,
  ALL_PRODUCTS,
  ATELIER_STORY_BG
} from '../data/mockData';
import { Product } from '../types';

export const DiscoverScreen: React.FC = () => {
  const {
    setCurrentScreen,
    setSelectedProduct,
    currency,
    formatPrice,
    toggleWishlist,
    isWishlisted,
    addToCart,
    applyPromoCode,
    setIsConciergeOpen,
    showToast,
    setSelectedCategoryFilter
  } = useApp();

  const [rateMode, setRateMode] = useState(0);
  const [copied, setCopied] = useState(false);
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    const chosenSizeLabel = selectedSizes[product.id];
    const chosenSize = product.sizes.find((s) => s.label === chosenSizeLabel) || product.sizes[0];
    addToCart(product, product.colors[0], chosenSize, 1);
    setRecentlyAddedId(product.id);
    setTimeout(() => {
      setRecentlyAddedId(null);
    }, 2000);
  };

  const rateQuotes = [
    '1 USD ≈ ₹83.45',
    '1 GBP ≈ ₹105.80',
    '1 AED ≈ ₹22.72',
    '1 EUR ≈ ₹90.45'
  ];

  const handleNextRate = () => {
    setRateMode((prev) => (prev + 1) % rateQuotes.length);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText('MSTGLOBAL15').then(() => {
      setCopied(true);
      applyPromoCode('MSTGLOBAL15');
      setTimeout(() => setCopied(false), 2200);
    });
  };

  const handleOpenProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentScreen('product_detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col w-full pb-24 text-[#1a1c1b] select-none max-w-7xl mx-auto">
      {/* Hero Section: Editorial Campaign */}
      <section className="relative w-full overflow-hidden bg-[#1c1b1b]">
        <div
          className="relative w-full h-[540px] md:h-[620px] bg-cover bg-center flex flex-col justify-between p-5 md:p-10 text-white"
          style={{ backgroundImage: `url('${HERO_IMAGE_URL}')` }}
        >
          {/* Gradient Scrim Layer */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20 pointer-events-none" />

          {/* Top Micro Bar (Currency indicator & Pill Badge) */}
          <div className="relative z-10 flex items-center justify-between gap-2 pt-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md font-label-caps-sm text-label-caps-sm tracking-widest uppercase text-white shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#fed65b] animate-pulse" />
              Exclusive Preview
            </span>

            {/* Rate conversion chip */}
            <button
              onClick={handleNextRate}
              className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/25 backdrop-blur-md text-white font-label-caps-sm text-label-caps-sm uppercase tracking-wider active:scale-95 transition-transform hover:bg-white/35"
              title="Click to toggle currency parity"
            >
              <span className="material-symbols-outlined text-[13px] text-[#ffe088]">
                currency_exchange
              </span>
              <span>{rateQuotes[rateMode]}</span>
            </button>
          </div>

          {/* Hero Typography & CTAs */}
          <div className="relative z-10 flex flex-col gap-2 mt-auto pb-4 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-[#735c00] text-white font-label-caps-sm text-label-caps-sm uppercase tracking-widest">
                Festive 2026
              </span>
              <span className="text-white/80 font-label-caps-sm text-label-caps-sm uppercase tracking-widest">
                Artisanal Zardozi
              </span>
            </div>

            <h2 className="font-display-xl-mobile md:font-display-xl text-display-xl-mobile md:text-display-xl tracking-tight leading-none text-white">
              The Royal Heritage
            </h2>

            <p className="font-body-sm text-body-sm text-white/85 line-clamp-2 max-w-md">
              Hand-spun Mulberry silk woven by master artisans of Varanasi with pure electroplated gilded threads.
            </p>

            {/* CTA Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-3 max-w-sm">
              <button
                onClick={() => handleOpenProduct(AURUM_SAREE_PRODUCT)}
                className="w-full py-3.5 px-4 bg-[#735c00] hover:bg-[#856b00] text-white font-label-caps-md text-label-caps-md uppercase tracking-wider text-center flex items-center justify-center gap-1 shadow-lg active:scale-95 transition-all"
              >
                <span>Shop New</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
              <button
                onClick={() => {
                  showToast('The 2026 Haute Couture Lookbook is open');
                  setCurrentScreen('categories');
                }}
                className="w-full py-3.5 px-4 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-label-caps-md text-label-caps-md uppercase tracking-wider text-center active:scale-95 transition-all"
              >
                Lookbook
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Global Client Perks Rail */}
      <section className="w-full bg-[#f4f4f2] px-5 py-3 overflow-x-auto no-scrollbar shadow-xs">
        <div className="flex items-center gap-6 min-w-max justify-around max-w-6xl mx-auto">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#735c00] text-[20px]">
              flight_takeoff
            </span>
            <div className="flex flex-col">
              <span className="font-label-caps-sm text-label-caps-sm uppercase text-[#1a1c1b] font-bold">
                DHL / FedEx Express
              </span>
              <span className="font-label-sm text-label-sm text-[#444748]">
                3-5 Day Global Delivery
              </span>
            </div>
          </div>
          <div className="w-px h-6 bg-[#e2e3e1]" />
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#735c00] text-[20px]">
              verified
            </span>
            <div className="flex flex-col">
              <span className="font-label-caps-sm text-label-caps-sm uppercase text-[#1a1c1b] font-bold">
                Duties &amp; Taxes Prepaid
              </span>
              <span className="font-label-sm text-label-sm text-[#444748]">
                No Surprise Import Fees
              </span>
            </div>
          </div>
          <div className="w-px h-6 bg-[#e2e3e1]" />
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#735c00] text-[20px]">
              styler
            </span>
            <div className="flex flex-col">
              <span className="font-label-caps-sm text-label-caps-sm uppercase text-[#1a1c1b] font-bold">
                Complimentary Fitting
              </span>
              <span className="font-label-sm text-label-sm text-[#444748]">
                Custom Blouse Tailoring
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Categories Header */}
      <section className="w-full px-5 pt-8 pb-3">
        <div className="flex items-end justify-between">
          <div>
            <span className="font-label-caps-md text-label-caps-md uppercase tracking-widest text-[#735c00] font-bold">
              Haute Collections
            </span>
            <h3 className="font-headline-md text-headline-md text-[#1a1c1b] tracking-tight">
              Curated Ateliers
            </h3>
          </div>
          <button
            onClick={() => setCurrentScreen('categories')}
            className="font-label-caps-sm text-label-caps-sm text-[#444748] uppercase tracking-widest underline decoration-[#c4c7c7] underline-offset-4 hover:text-black"
          >
            All Taxonomies
          </button>
        </div>

        {/* Category Arch Carousel */}
        <div className="flex gap-4 overflow-x-auto no-scrollbar pt-4 -mx-5 px-5">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => {
                if (setSelectedCategoryFilter) setSelectedCategoryFilter(cat.name);
                setCurrentScreen('categories');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group flex flex-col items-center flex-shrink-0 w-28 gap-2 cursor-pointer"
            >
              <div className="w-28 h-36 rounded-t-full rounded-b-lg overflow-hidden bg-[#eeeeec] relative shadow-xs">
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url('${cat.image}')` }}
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
              </div>
              <div className="flex flex-col items-center text-center">
                <span className="font-label-caps-sm text-label-caps-sm text-[#1a1c1b] uppercase tracking-wider font-semibold line-clamp-1">
                  {cat.name}
                </span>
                <span className="font-label-sm text-label-sm text-[#444748]">
                  {cat.stylesCount}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Archival Matching Collections Preview Row */}
        <div className="mt-6 pt-5 border-t border-black/[0.06]">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-[#735c00]">
                collections_bookmark
              </span>
              <span className="font-label-caps-sm text-label-caps-sm uppercase tracking-widest text-[#735c00] font-bold">
                Matching Haute Collections
              </span>
            </div>
            <button
              onClick={() => {
                if (setSelectedCategoryFilter) setSelectedCategoryFilter(null);
                setCurrentScreen('categories');
              }}
              className="text-xs text-[#444748] hover:text-black font-semibold uppercase tracking-wider"
            >
              View All 10 Archives ➔
            </button>
          </div>

          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 -mx-5 px-5">
            {COLLECTIONS.map((col) => (
              <div
                key={col.id}
                onClick={() => {
                  if (setSelectedCategoryFilter) setSelectedCategoryFilter(col.categoryName);
                  setCurrentScreen('categories');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex-shrink-0 w-64 bg-white rounded-xl overflow-hidden border border-black/[0.06] shadow-xs hover:shadow-md cursor-pointer group transition-all"
              >
                <div className="relative aspect-[16/9] w-full bg-[#eeeeec] overflow-hidden">
                  <img
                    src={col.image}
                    alt={col.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2 text-white">
                    <span className="text-[9px] uppercase tracking-wider text-[#fed65b] font-bold">
                      {col.categoryName}
                    </span>
                    <h4 className="font-bold text-xs leading-tight line-clamp-1 text-white">
                      {col.name}
                    </h4>
                  </div>
                </div>
                <div className="p-2.5 bg-[#fdfdfc]">
                  <p className="text-[10px] text-[#735c00] italic font-medium line-clamp-1">"{col.tagline}"</p>
                  <div className="flex items-center justify-between mt-2 pt-1 border-t border-black/[0.04] text-[10px] text-[#444748]">
                    <span>{col.stylesCount}</span>
                    <span className="font-bold uppercase tracking-wider text-black group-hover:underline">Explore ➔</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curated Product Drops / Trending Grid */}
      <section className="w-full px-5 pt-8 pb-4">
        <div className="flex items-end justify-between mb-4">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-[#735c00]">
                local_fire_department
              </span>
              <span className="font-label-caps-sm text-label-caps-sm uppercase tracking-widest text-[#735c00] font-bold">
                Runway Exclusives
              </span>
            </div>
            <h3 className="font-headline-md text-headline-md text-[#1a1c1b]">Trending Now</h3>
          </div>
          <div className="flex items-center gap-1 text-[#444748] font-label-caps-sm text-label-caps-sm uppercase tracking-wider">
            <span>Global Fast-Track</span>
          </div>
        </div>

        {/* Editorial Product Card Grid with Prominent Add to Cart Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {ALL_PRODUCTS.map((product) => {
            const isWish = isWishlisted(product.id);
            const isAdded = recentlyAddedId === product.id;
            const currentSizeLabel = selectedSizes[product.id] || product.sizes[0]?.label;

            return (
              <div
                key={product.id}
                className="flex flex-col bg-white rounded-xl overflow-hidden shadow-xs group border border-black/[0.06] hover:shadow-md transition-shadow"
              >
                {/* Image & Badges */}
                <div
                  className="relative aspect-[3/4] w-full bg-[#eeeeec] overflow-hidden cursor-pointer"
                  onClick={() => handleOpenProduct(product)}
                >
                  <img
                    src={product.primaryImage}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Top Badges */}
                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    {product.editionBadge ? (
                      <span className="px-2 py-0.5 rounded-full bg-black/80 text-white font-label-caps-sm text-label-caps-sm uppercase tracking-wider backdrop-blur-xs">
                        {product.editionBadge}
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full bg-[#40000a] text-[#dd565f] font-label-caps-sm text-label-caps-sm font-bold uppercase tracking-wider">
                        Rare Weave
                      </span>
                    )}
                    {product.mrpINR > product.priceINR && (
                      <span className="px-1.5 py-0.5 rounded-full bg-[#735c00] text-white font-label-caps-sm text-label-caps-sm uppercase tracking-wider w-fit">
                        Save {Math.round(((product.mrpINR - product.priceINR) / product.mrpINR) * 100)}%
                      </span>
                    )}
                  </div>

                  {/* Wishlist Heart */}
                  <button
                    aria-label="Add to wishlist"
                    className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/85 backdrop-blur-md flex items-center justify-center text-[#1a1c1b] shadow-xs active:scale-75 transition-transform"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                  >
                    <span
                      className={`material-symbols-outlined text-[18px] ${
                        isWish ? 'text-[#ba1a1a]' : ''
                      }`}
                      style={isWish ? { fontVariationSettings: "'FILL' 1" } : undefined}
                    >
                      {isWish ? 'favorite' : 'favorite_border'}
                    </span>
                  </button>

                  {/* Color preview dots */}
                  {product.colors && product.colors.length > 0 && (
                    <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-white/85 backdrop-blur-xs px-2 py-1 rounded-full shadow-xs">
                      {product.colors.slice(0, 3).map((col) => (
                        <span
                          key={col.name}
                          className="w-3 h-3 rounded-full ring-1 ring-black/20"
                          style={{ backgroundColor: col.hex }}
                          title={col.name}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Details & Actions */}
                <div className="p-3.5 flex flex-col gap-2 flex-1 justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[#444748] font-label-sm text-label-sm">
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          if (setSelectedCategoryFilter) setSelectedCategoryFilter(product.category);
                          setCurrentScreen('categories');
                        }}
                        className="font-label-caps-sm text-label-caps-sm text-[#735c00] font-semibold uppercase hover:underline cursor-pointer"
                      >
                        {product.category}
                      </span>
                      <span className="flex items-center gap-0.5 text-[#735c00] font-bold text-xs">
                        <span
                          className="material-symbols-outlined text-[13px]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          star
                        </span>
                        4.9
                      </span>
                    </div>

                    {product.collection && (
                      <span className="text-[10px] text-[#444748] font-medium line-clamp-1 flex items-center gap-1 mt-0.5">
                        <span className="material-symbols-outlined text-[11px] text-[#735c00]">
                          collections_bookmark
                        </span>
                        <span>{product.collection}</span>
                      </span>
                    )}

                    <h4
                      onClick={() => handleOpenProduct(product)}
                      className="font-headline-sm text-headline-sm line-clamp-1 text-[#1a1c1b] leading-snug cursor-pointer hover:text-[#735c00] mt-0.5 font-medium"
                    >
                      {product.title}
                    </h4>

                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="font-headline-sm text-headline-sm font-bold text-[#1a1c1b]">
                        {formatPrice(product.priceINR)}
                      </span>
                      {product.mrpINR > product.priceINR && (
                        <span className="font-body-sm text-body-sm line-through text-[#444748]">
                          {formatPrice(product.mrpINR)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Size Options Selector */}
                  {product.sizes && product.sizes.length > 1 && (
                    <div className="flex items-center gap-1 pt-1">
                      <span className="text-[10px] text-[#444748] uppercase tracking-wider font-semibold mr-1">
                        Size:
                      </span>
                      <div className="flex items-center gap-1 flex-wrap">
                        {product.sizes.slice(0, 4).map((size) => (
                          <button
                            key={size.label}
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedSizes((prev) => ({ ...prev, [product.id]: size.label }));
                            }}
                            className={`px-2 py-0.5 text-center font-label-caps-sm text-label-caps-sm rounded text-[11px] transition-colors border ${
                              currentSizeLabel === size.label
                                ? 'bg-black text-white border-black font-bold'
                                : 'bg-[#f4f4f2] text-[#1a1c1b] border-black/10 hover:bg-[#eeeeec]'
                            }`}
                          >
                            {size.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Prominent Action Buttons */}
                  <div className="flex flex-col gap-1.5 pt-1 mt-auto">
                    <button
                      id={`discover-add-to-cart-${product.id}`}
                      onClick={(e) => handleQuickAdd(e, product)}
                      className={`w-full py-2.5 px-3 ${
                        isAdded
                          ? 'bg-[#1b5e20] text-white'
                          : 'bg-[#1a1c1b] hover:bg-neutral-800 text-white'
                      } rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-xs active:scale-95`}
                    >
                      <span className="material-symbols-outlined text-[17px] text-[#ffe088]">
                        {isAdded ? 'check_circle' : 'shopping_bag'}
                      </span>
                      <span>{isAdded ? '✓ Added To Bag' : 'Add To Cart'}</span>
                    </button>

                    <button
                      onClick={() => handleOpenProduct(product)}
                      className="w-full py-1.5 bg-[#f4f4f2] hover:bg-[#eeeeec] text-[#1a1c1b] rounded-lg text-[11px] font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-1"
                    >
                      <span>View Atelier Details</span>
                      <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Interactive Runway Story / Craft Spotlight */}
      <section className="w-full px-5 py-4">
        <div className="relative w-full rounded-xl overflow-hidden bg-black p-6 md:p-10 text-white shadow-xl">
          <div
            className="absolute inset-0 opacity-30 bg-cover bg-center"
            style={{ backgroundImage: `url('${ATELIER_STORY_BG}')` }}
          />
          <div className="relative z-10 flex flex-col gap-3 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#fed65b]" />
              <span className="font-label-caps-sm text-label-caps-sm uppercase tracking-widest text-[#ffe088]">
                The Atelier Gazette
              </span>
            </div>
            <h3 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg leading-tight text-white font-serif">
              340 Hours of Hand-Spun Devotion
            </h3>
            <p className="font-body-sm text-body-sm text-white/80">
              Every MST bridal ensemble is individually cut and numbered by heritage artisans in Lucknow and Varanasi. Experience virtual video fitting directly from our master tailoring suite.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setIsConciergeOpen(true)}
                className="px-5 py-2.5 bg-white text-black font-label-caps-md text-label-caps-md uppercase tracking-wider rounded shadow-md active:scale-95 transition-transform flex items-center gap-2 hover:bg-[#f4f4f2]"
              >
                <span className="material-symbols-outlined text-[16px]">video_call</span>
                <span>Book Private Concierge</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* VIP Global Membership & Discount Banner */}
      <section className="w-full px-5 py-4">
        <div className="w-full bg-[#fed65b] text-[#745c00] rounded-lg p-6 flex flex-col gap-3 relative overflow-hidden shadow-xs">
          <div className="flex items-start justify-between">
            <div>
              <span className="font-label-caps-sm text-label-caps-sm uppercase tracking-widest font-bold text-[#745c00]/80">
                First Order Privilege
              </span>
              <h4 className="font-headline-md text-headline-md font-bold tracking-tight text-[#241a00]">
                15% Off Worldwide
              </h4>
            </div>
            <div className="w-10 h-10 rounded-full bg-white/40 flex items-center justify-center">
              <span className="material-symbols-outlined text-[#735c00] text-[22px]">
                card_membership
              </span>
            </div>
          </div>
          <p className="font-body-sm text-body-sm text-[#745c00]/90">
            Unlock priority global customs dispatch and bespoke tailoring consultations.
          </p>
          <div className="flex items-center gap-3 pt-1">
            <div className="flex-1 bg-white px-4 py-2.5 rounded font-body-md text-body-md text-[#1a1c1b] flex items-center justify-between shadow-inner">
              <span className="font-bold tracking-wider font-mono">MSTGLOBAL15</span>
              <span className="font-label-caps-sm text-label-caps-sm uppercase text-[#735c00] font-semibold">
                Active
              </span>
            </div>
            <button
              onClick={handleCopyCode}
              className="px-4 py-2.5 bg-black text-white rounded font-label-caps-md text-label-caps-md uppercase tracking-wider active:scale-95 transition-transform flex items-center gap-1 hover:bg-neutral-800"
            >
              <span className="material-symbols-outlined text-[16px]">content_copy</span>
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Editorial Newsletter Footer Signoff */}
      <section className="w-full px-5 pt-8 pb-4 flex flex-col items-center text-center gap-2">
        <div className="w-10 h-px bg-[#e2e3e1] mb-2" />
        <span className="font-label-caps-sm text-label-caps-sm uppercase tracking-widest text-[#444748]">
          MST Global Fashion House
        </span>
        <p className="font-headline-sm text-headline-sm italic text-[#1a1c1b] font-serif max-w-lg">
          "Honoring ancestral craft on the world's most prestigious stages."
        </p>
        <div className="flex items-center gap-4 text-[#444748] pt-2 flex-wrap justify-center">
          <span className="font-label-caps-sm text-label-caps-sm">NEW DELHI</span>
          <span>•</span>
          <span className="font-label-caps-sm text-label-caps-sm">LONDON</span>
          <span>•</span>
          <span className="font-label-caps-sm text-label-caps-sm">NEW YORK</span>
          <span>•</span>
          <span className="font-label-caps-sm text-label-caps-sm">DUBAI</span>
        </div>
      </section>
    </div>
  );
};
