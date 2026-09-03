import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  HERO_IMAGE_URL,
  CATEGORIES,
  AURUM_SAREE_PRODUCT,
  NOCTURNE_ANARKALI_PRODUCT,
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
    showToast
  } = useApp();

  const [rateMode, setRateMode] = useState(0);
  const [copied, setCopied] = useState(false);

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
              onClick={() => setCurrentScreen('categories')}
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

        {/* 2 Column Editorial Product Card Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-6">
          {/* Product Card 1: Aurum Handloom Saree */}
          <div className="flex flex-col bg-white rounded-sm overflow-hidden shadow-xs group border border-black/[0.04]">
            <div
              className="relative aspect-[3/4] w-full bg-[#eeeeec] overflow-hidden cursor-pointer"
              onClick={() => handleOpenProduct(AURUM_SAREE_PRODUCT)}
            >
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url('${AURUM_SAREE_PRODUCT.primaryImage}')` }}
              />
              {/* Top Floating Tag */}
              <div className="absolute top-2 left-2 flex flex-col gap-1">
                <span className="px-2 py-0.5 rounded-full bg-[#40000a] text-[#dd565f] font-label-caps-sm text-label-caps-sm font-bold uppercase tracking-wider">
                  Only 3 Left
                </span>
                <span className="px-1.5 py-0.5 rounded-full bg-black text-white font-label-caps-sm text-label-caps-sm uppercase tracking-wider">
                  -18%
                </span>
              </div>
              {/* Wishlist Heart Button */}
              <button
                aria-label="Add to wishlist"
                className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-[#1a1c1b] shadow-xs active:scale-75 transition-transform"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(AURUM_SAREE_PRODUCT.id);
                }}
              >
                <span
                  className={`material-symbols-outlined text-[18px] ${
                    isWishlisted(AURUM_SAREE_PRODUCT.id) ? 'text-[#ba1a1a]' : ''
                  }`}
                  style={
                    isWishlisted(AURUM_SAREE_PRODUCT.id)
                      ? { fontVariationSettings: "'FILL' 1" }
                      : undefined
                  }
                >
                  {isWishlisted(AURUM_SAREE_PRODUCT.id) ? 'favorite' : 'favorite_border'}
                </span>
              </button>
              {/* Swatches floating over bottom of image */}
              <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-white/80 backdrop-blur-xs px-1.5 py-1 rounded-full">
                <span className="w-3 h-3 rounded-full bg-[#D4AF37] ring-1 ring-white" />
                <span className="w-3 h-3 rounded-full bg-[#8E1B2A] ring-1 ring-white" />
                <span className="w-3 h-3 rounded-full bg-[#1c3829] ring-1 ring-white" />
              </div>
            </div>

            {/* Product Details */}
            <div className="p-3 flex flex-col gap-1">
              <div className="flex items-center justify-between text-[#444748] font-label-sm text-label-sm">
                <span className="flex items-center gap-0.5 text-[#735c00] font-bold">
                  <span
                    className="material-symbols-outlined text-[13px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  4.9
                </span>
                <span>(128 reviews)</span>
              </div>
              <h4
                onClick={() => handleOpenProduct(AURUM_SAREE_PRODUCT)}
                className="font-headline-sm text-headline-sm line-clamp-1 text-[#1a1c1b] leading-snug cursor-pointer hover:text-[#735c00]"
              >
                Aurum Handloom Saree
              </h4>
              <div className="flex items-baseline gap-2">
                <span className="font-headline-sm text-headline-sm font-bold text-[#1a1c1b]">
                  {formatPrice(AURUM_SAREE_PRODUCT.priceINR)}
                </span>
                <span className="font-body-sm text-body-sm line-through text-[#444748]">
                  {formatPrice(AURUM_SAREE_PRODUCT.mrpINR)}
                </span>
              </div>
              <span className="font-label-caps-sm text-label-caps-sm text-[#735c00] font-semibold">
                ≈ $342 USD (Duties Incl.)
              </span>
              {/* Size quick buttons */}
              <div className="grid grid-cols-3 gap-1 pt-1">
                {['S', 'M', 'L'].map((size) => (
                  <button
                    key={size}
                    onClick={() => {
                      addToCart(
                        AURUM_SAREE_PRODUCT,
                        AURUM_SAREE_PRODUCT.colors[0],
                        AURUM_SAREE_PRODUCT.sizes.find((s) => s.label === size) ||
                          AURUM_SAREE_PRODUCT.sizes[0]
                      );
                    }}
                    className="py-1 text-center font-label-caps-sm text-label-caps-sm bg-[#eeeeec] text-[#1a1c1b] rounded hover:bg-black hover:text-white active:bg-black active:text-white transition-colors"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Card 2: Nocturne Velvet Anarkali */}
          <div className="flex flex-col bg-white rounded-sm overflow-hidden shadow-xs group border border-black/[0.04]">
            <div
              className="relative aspect-[3/4] w-full bg-[#eeeeec] overflow-hidden cursor-pointer"
              onClick={() => handleOpenProduct(NOCTURNE_ANARKALI_PRODUCT)}
            >
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url('${NOCTURNE_ANARKALI_PRODUCT.primaryImage}')` }}
              />
              <div className="absolute top-2 left-2">
                <span className="px-2 py-0.5 rounded-full bg-[#e2e3e1] text-[#1a1c1b] font-label-caps-sm text-label-caps-sm font-bold uppercase tracking-wider">
                  Bespoke
                </span>
              </div>
              <button
                aria-label="Add to wishlist"
                className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-[#1a1c1b] shadow-xs active:scale-75 transition-transform"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(NOCTURNE_ANARKALI_PRODUCT.id);
                }}
              >
                <span
                  className={`material-symbols-outlined text-[18px] ${
                    isWishlisted(NOCTURNE_ANARKALI_PRODUCT.id) ? 'text-[#ba1a1a]' : ''
                  }`}
                  style={
                    isWishlisted(NOCTURNE_ANARKALI_PRODUCT.id)
                      ? { fontVariationSettings: "'FILL' 1" }
                      : undefined
                  }
                >
                  {isWishlisted(NOCTURNE_ANARKALI_PRODUCT.id) ? 'favorite' : 'favorite_border'}
                </span>
              </button>
              <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-white/80 backdrop-blur-xs px-1.5 py-1 rounded-full">
                <span className="w-3 h-3 rounded-full bg-[#1a1c1b] ring-1 ring-white" />
                <span className="w-3 h-3 rounded-full bg-[#392131] ring-1 ring-white" />
              </div>
            </div>

            {/* Product Details */}
            <div className="p-3 flex flex-col gap-1">
              <div className="flex items-center justify-between text-[#444748] font-label-sm text-label-sm">
                <span className="flex items-center gap-0.5 text-[#735c00] font-bold">
                  <span
                    className="material-symbols-outlined text-[13px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  4.8
                </span>
                <span>(94 reviews)</span>
              </div>
              <h4
                onClick={() => handleOpenProduct(NOCTURNE_ANARKALI_PRODUCT)}
                className="font-headline-sm text-headline-sm line-clamp-1 text-[#1a1c1b] leading-snug cursor-pointer hover:text-[#735c00]"
              >
                Nocturne Velvet Anarkali
              </h4>
              <div className="flex items-baseline gap-2">
                <span className="font-headline-sm text-headline-sm font-bold text-[#1a1c1b]">
                  {formatPrice(NOCTURNE_ANARKALI_PRODUCT.priceINR)}
                </span>
              </div>
              <span className="font-label-caps-sm text-label-caps-sm text-[#735c00] font-semibold">
                ≈ $239 USD (Duties Incl.)
              </span>
              {/* Size quick buttons */}
              <div className="grid grid-cols-3 gap-1 pt-1">
                {['M', 'L', 'XL'].map((size) => (
                  <button
                    key={size}
                    onClick={() => {
                      addToCart(
                        NOCTURNE_ANARKALI_PRODUCT,
                        NOCTURNE_ANARKALI_PRODUCT.colors[0],
                        NOCTURNE_ANARKALI_PRODUCT.sizes.find((s) => s.label === size) ||
                          NOCTURNE_ANARKALI_PRODUCT.sizes[0]
                      );
                    }}
                    className="py-1 text-center font-label-caps-sm text-label-caps-sm bg-[#eeeeec] text-[#1a1c1b] rounded hover:bg-black hover:text-white active:bg-black active:text-white transition-colors"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>
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
