import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CURRENCIES } from '../data/mockData';
import { CurrencyCode, ProductColor, ProductSizeOption } from '../types';

export const ProductDetailScreen: React.FC = () => {
  const {
    selectedProduct,
    currency,
    setCurrency,
    formatPrice,
    addToCart,
    setCurrentScreen,
    toggleWishlist,
    isWishlisted,
    setIsSizeDrawerOpen,
    setIs360ModalOpen,
    setIsConciergeOpen,
    showToast
  } = useApp();

  const product = selectedProduct;
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<ProductSizeOption>(product.sizes[0]);
  const [addedState, setAddedState] = useState(false);

  const allImages = [
    product.primaryImage,
    ...(product.galleryImages || [])
  ];

  const currentImage = allImages[activeImageIndex] || product.primaryImage;
  const wishActive = isWishlisted(product.id);

  // Price calculations with size option delta
  const sizeDelta = selectedSize.priceDeltaINR || 0;
  const finalPriceINR = product.priceINR + sizeDelta;
  const finalMrpINR = product.mrpINR + sizeDelta;

  const handleAddToCartClick = () => {
    setAddedState(true);
    addToCart(product, selectedColor, selectedSize, 1);
    setTimeout(() => {
      setAddedState(false);
    }, 2000);
  };

  const handleBuyNowClick = () => {
    addToCart(product, selectedColor, selectedSize, 1);
    setCurrentScreen('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: product.title,
          text: product.description,
          url: window.location.href
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Atelier link copied to clipboard');
    }
  };

  return (
    <div className="flex flex-col w-full pb-32 bg-[#f9f9f7] max-w-4xl mx-auto">
      {/* Top Heritage Breadcrumb & Notice */}
      <div className="px-4 py-2.5 flex items-center justify-between bg-[#f4f4f2] text-xs">
        <div className="flex items-center gap-1.5 text-[#444748] font-label-caps-sm text-label-caps-sm uppercase truncate">
          <span>Heritage Atelier</span>
          <span>/</span>
          <span>Varanasi</span>
          <span>/</span>
          <span className="text-[#1a1c1b] font-semibold">{product.category}</span>
        </div>
        <div className="flex items-center gap-1 text-[#735c00] font-label-caps-sm text-label-caps-sm font-semibold shrink-0">
          <span
            className="material-symbols-outlined text-[14px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            verified
          </span>
          <span>100% Certified Silk Mark</span>
        </div>
      </div>

      {/* Product Gallery Section */}
      <section className="relative w-full bg-white">
        <div className="relative w-full aspect-[3/4] max-h-[620px] overflow-hidden bg-[#eeeeec]">
          <img
            id="main-product-image"
            alt={product.title}
            src={currentImage}
            className="w-full h-full object-cover transition-all duration-700 ease-out"
          />

          {/* Interactive Badges Overlay */}
          <div className="absolute top-4 left-4 flex flex-col gap-2 items-start z-10">
            <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-[#1a1c1b] font-label-caps-sm text-label-caps-sm rounded-full tracking-widest shadow-xs">
              {product.editionBadge || 'EDITION NO. 18/50'}
            </span>
            {product.isRareWeave && (
              <span className="px-3 py-1 bg-[#ba1a1a] text-white font-label-caps-sm text-label-caps-sm rounded-full tracking-wider shadow-xs flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                RARE ARTISAN WEAVE
              </span>
            )}
          </div>

          <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
            <button
              aria-label="Share Saree"
              onClick={handleShare}
              className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#1a1c1b] shadow-xs active:scale-95 transition-transform hover:bg-white"
            >
              <span className="material-symbols-outlined text-[19px]">share</span>
            </button>
            <button
              aria-label="Save to Wishlist"
              onClick={() => toggleWishlist(product.id)}
              className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#1a1c1b] shadow-xs active:scale-95 transition-transform hover:bg-white"
            >
              <span
                className={`material-symbols-outlined text-[20px] ${
                  wishActive ? 'text-[#ba1a1a]' : 'text-[#1a1c1b]'
                }`}
                style={wishActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                {wishActive ? 'favorite' : 'favorite_border'}
              </span>
            </button>
          </div>

          {/* 360 View & Zoom Triggers */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-10">
            <button
              onClick={() => setIs360ModalOpen(true)}
              className="px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[#1a1c1b] font-label-sm text-label-sm flex items-center gap-1.5 shadow-xs active:scale-95 transition-all hover:bg-white"
            >
              <span className="material-symbols-outlined text-[16px] text-[#735c00]">360</span>
              <span>Interactive 360°</span>
            </button>
            <button
              aria-label="Zoom Weave"
              onClick={() => showToast('24K Zari Micro-Zoom Active (400% detail)')}
              className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#1a1c1b] shadow-xs active:scale-95 transition-all hover:bg-white"
            >
              <span className="material-symbols-outlined text-[18px]">zoom_in</span>
            </button>
          </div>
        </div>

        {/* Thumbnail Strip */}
        <div className="px-4 py-3 bg-[#f4f4f2] flex items-center gap-3 overflow-x-auto no-scrollbar">
          {allImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImageIndex(idx)}
              className={`thumbnail-btn flex-shrink-0 w-16 h-20 rounded bg-[#eeeeec] overflow-hidden transition-all ${
                activeImageIndex === idx
                  ? 'ring-2 ring-black opacity-100'
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              <img src={img} alt={`Angle ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </section>

      {/* Title & Multi-Currency Header */}
      <section className="px-4 pt-6 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="font-label-caps-md text-label-caps-md tracking-widest text-[#735c00] font-semibold uppercase">
            {product.atelier}
          </span>
          <span className="font-label-caps-sm text-label-caps-sm text-[#444748] bg-[#eeeeec] px-2 py-0.5 rounded">
            {product.sku}
          </span>
        </div>

        <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg font-normal text-[#1a1c1b] leading-snug font-serif">
          {product.title}
        </h2>

        {/* Ratings & Authenticity */}
        <div className="flex items-center gap-3 pt-1">
          <div className="flex items-center gap-1 bg-[#e8e8e6] px-2 py-1 rounded">
            <span className="font-label-sm text-label-sm font-semibold text-[#1a1c1b]">
              {product.rating}
            </span>
            <div className="flex text-[#735c00] text-[13px]">
              {[1, 2, 3, 4, 5].map((i) => (
                <span
                  key={i}
                  className="material-symbols-outlined text-[14px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
              ))}
            </div>
          </div>
          <span
            onClick={() => showToast('142 Verified boutique clients from NYC, London & Dubai')}
            className="font-body-sm text-body-sm text-[#444748] underline cursor-pointer hover:text-black"
          >
            {product.reviewCount} verified boutique reviews
          </span>
        </div>

        {/* Pricing Module with Currency Selector */}
        <div className="mt-3 p-4 rounded-xl bg-[#f4f4f2] flex flex-col gap-2 border border-black/[0.04]">
          <div className="flex items-baseline justify-between flex-wrap gap-2">
            <div className="flex items-baseline gap-2">
              <span className="font-headline-md text-headline-md text-[#1a1c1b] font-semibold">
                {formatPrice(finalPriceINR)}
              </span>
              <span className="font-body-sm text-body-sm text-[#444748] line-through">
                {formatPrice(finalMrpINR)}
              </span>
              <span className="px-2 py-0.5 bg-[#ba1a1a] text-white font-label-caps-sm text-label-caps-sm rounded">
                18% OFF
              </span>
            </div>

            {/* Multi-currency Selector Dropdown */}
            <div className="relative">
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
                className="bg-[#eeeeec] text-[#1a1c1b] font-label-sm text-label-sm px-3 py-1.5 rounded-lg focus:outline-none cursor-pointer pr-7 appearance-none border border-black/10"
              >
                {Object.values(CURRENCIES).map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code} ({c.symbol.trim()})
                  </option>
                ))}
              </select>
              <span className="material-symbols-outlined text-[16px] text-[#1a1c1b] pointer-events-none absolute right-2 top-2">
                expand_more
              </span>
            </div>
          </div>

          <p className="font-body-sm text-body-sm text-[#444748]">
            Inclusive of all import duties and luxury GST. Approx{' '}
            <span className="font-medium text-[#1a1c1b]">{formatPrice(finalPriceINR, 'USD')} USD</span>{' '}
            /{' '}
            <span className="font-medium text-[#1a1c1b]">{formatPrice(finalPriceINR, 'EUR')} EUR</span>{' '}
            /{' '}
            <span className="font-medium text-[#1a1c1b]">{formatPrice(finalPriceINR, 'GBP')} GBP</span>
            .
          </p>

          {/* Scarcity Badge */}
          <div className="flex items-center gap-2 pt-1 text-[#8a1828] bg-[#ffdad6]/60 px-3 py-2 rounded-lg">
            <span className="material-symbols-outlined text-[16px] text-[#ba1a1a] animate-pulse">
              hourglass_bottom
            </span>
            <span className="font-label-sm text-label-sm font-medium">
              Pessimistic stock reservation active — Only 3 pieces remain in warehouse
            </span>
          </div>
        </div>
      </section>

      {/* Colour Variant Matrix */}
      <section className="px-4 pt-6 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="font-label-caps-md text-label-caps-md text-[#1a1c1b] uppercase tracking-wider font-semibold">
            Colour: <span className="font-normal text-[#444748]">{selectedColor.name}</span>
          </span>
          <span className="font-label-caps-sm text-label-caps-sm text-[#735c00] uppercase font-bold">
            Natural Dye
          </span>
        </div>

        <div className="flex items-center gap-3">
          {product.colors.map((color) => {
            const isSelected = selectedColor.name === color.name;
            return (
              <button
                key={color.name}
                onClick={() => setSelectedColor(color)}
                className={`color-swatch-btn group relative w-10 h-10 rounded-full p-0.5 transition-all ${
                  isSelected ? 'ring-2 ring-black scale-105' : 'ring-1 ring-black/20 hover:scale-105'
                }`}
                title={color.name}
              >
                <span
                  className="block w-full h-full rounded-full shadow-inner"
                  style={{ backgroundColor: color.hex }}
                />
              </button>
            );
          })}
        </div>
      </section>

      {/* Blouse Stitching & Size Matrix */}
      <section className="px-4 pt-6 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-label-caps-md text-label-caps-md text-[#1a1c1b] uppercase tracking-wider font-semibold">
              Blouse Stitching &amp; Size
            </span>
            <span className="font-body-sm text-body-sm text-[#444748]">
              Selected: {selectedSize.label} ({selectedSize.sublabel})
            </span>
          </div>
          <button
            onClick={() => setIsSizeDrawerOpen(true)}
            className="flex items-center gap-1 font-label-sm text-label-sm text-[#735c00] font-semibold hover:underline"
          >
            <span className="material-symbols-outlined text-[16px]">straighten</span>
            <span>Size Guide</span>
          </button>
        </div>

        {/* Size Matrix: 9 Choices (3x3 grid) */}
        <div className="grid grid-cols-3 gap-2">
          {product.sizes.map((size) => {
            const isSelected = selectedSize.label === size.label;
            return (
              <button
                key={size.label}
                onClick={() => setSelectedSize(size)}
                className={`py-2.5 px-2 rounded-lg font-label-sm text-label-sm flex flex-col items-center justify-center transition-all border ${
                  isSelected
                    ? 'bg-black text-white border-black shadow-sm'
                    : 'bg-[#eeeeec] text-[#1a1c1b] border-transparent hover:bg-[#e8e8e6]'
                }`}
              >
                <span className="font-semibold">{size.label}</span>
                <span
                  className={`text-[10px] ${
                    isSelected
                      ? 'text-white/80'
                      : size.priceDeltaINR
                      ? 'text-[#735c00] font-medium'
                      : 'text-[#444748]'
                  }`}
                >
                  {size.sublabel}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Value & Trust Pillars */}
      <section className="px-4 pt-6">
        <div className="grid grid-cols-2 gap-3 bg-[#f4f4f2] p-4 rounded-xl border border-black/[0.04]">
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-[22px] text-[#735c00]">
              flight_takeoff
            </span>
            <div className="flex flex-col">
              <span className="font-label-caps-md text-label-caps-md font-bold text-[#1a1c1b]">
                Global Express
              </span>
              <span className="font-body-sm text-body-sm text-[#444748]">
                Dispatches in 24h via DHL Express to USA, UK, UAE
              </span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-[22px] text-[#735c00]">
              workspace_premium
            </span>
            <div className="flex flex-col">
              <span className="font-label-caps-md text-label-caps-md font-bold text-[#1a1c1b]">
                Artisan Direct
              </span>
              <span className="font-body-sm text-body-sm text-[#444748]">
                Handcrafted by Master Weaver Rameshwar in Varanasi
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Accordions: Craftsmanship, Care & Shipping */}
      <section className="px-4 pt-6 flex flex-col gap-2">
        {/* Accordion 1 */}
        <details className="group bg-[#f4f4f2] rounded-xl overflow-hidden border border-black/[0.04]" open>
          <summary className="flex items-center justify-between p-4 cursor-pointer list-none select-none font-semibold">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-[#1a1c1b]">
                architecture
              </span>
              <span className="font-label-caps-md text-label-caps-md text-[#1a1c1b] uppercase">
                Artisan Craft &amp; Material Matrix
              </span>
            </div>
            <span className="material-symbols-outlined text-[20px] text-[#444748] transition-transform duration-300 group-open:rotate-180">
              expand_more
            </span>
          </summary>
          <div className="px-4 pb-4 flex flex-col gap-2 text-[#444748] font-body-sm text-body-sm">
            <div className="grid grid-cols-3 gap-2 py-1.5 bg-[#eeeeec] rounded px-3">
              <span className="text-[#1a1c1b] font-medium">Fabric Base</span>
              <span className="col-span-2">{product.fabricBase}</span>
            </div>
            <div className="grid grid-cols-3 gap-2 py-1.5 bg-[#eeeeec] rounded px-3">
              <span className="text-[#1a1c1b] font-medium">Zari Composition</span>
              <span className="col-span-2">{product.zariComposition}</span>
            </div>
            <div className="grid grid-cols-3 gap-2 py-1.5 bg-[#eeeeec] rounded px-3">
              <span className="text-[#1a1c1b] font-medium">Weaving Technique</span>
              <span className="col-span-2">{product.weavingTechnique}</span>
            </div>
            <div className="grid grid-cols-3 gap-2 py-1.5 bg-[#eeeeec] rounded px-3">
              <span className="text-[#1a1c1b] font-medium">Saree Length</span>
              <span className="col-span-2">{product.sareeLength}</span>
            </div>
          </div>
        </details>

        {/* Accordion 2 */}
        <details className="group bg-[#f4f4f2] rounded-xl overflow-hidden border border-black/[0.04]">
          <summary className="flex items-center justify-between p-4 cursor-pointer list-none select-none font-semibold">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-[#1a1c1b]">
                dry_cleaning
              </span>
              <span className="font-label-caps-md text-label-caps-md text-[#1a1c1b] uppercase">
                Care, Storage &amp; Longevity
              </span>
            </div>
            <span className="material-symbols-outlined text-[20px] text-[#444748] transition-transform duration-300 group-open:rotate-180">
              expand_more
            </span>
          </summary>
          <div className="px-4 pb-4 flex flex-col gap-2 text-[#444748] font-body-sm text-body-sm">
            {product.careInstructions.map((inst, i) => (
              <p key={i}>• {inst}</p>
            ))}
          </div>
        </details>

        {/* Accordion 3 */}
        <details className="group bg-[#f4f4f2] rounded-xl overflow-hidden border border-black/[0.04]">
          <summary className="flex items-center justify-between p-4 cursor-pointer list-none select-none font-semibold">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-[#1a1c1b]">
                local_shipping
              </span>
              <span className="font-label-caps-md text-label-caps-md text-[#1a1c1b] uppercase">
                Bespoke Concierge &amp; Global Dispatch
              </span>
            </div>
            <span className="material-symbols-outlined text-[20px] text-[#444748] transition-transform duration-300 group-open:rotate-180">
              expand_more
            </span>
          </summary>
          <div className="px-4 pb-4 flex flex-col gap-2 text-[#444748] font-body-sm text-body-sm">
            {product.shippingNotes.map((note, i) => (
              <p key={i}>• {note}</p>
            ))}
          </div>
        </details>
      </section>

      {/* Complete The Ensemble Recommendation */}
      {product.crossSells && product.crossSells.length > 0 && (
        <section className="px-4 pt-8 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="font-label-caps-md text-label-caps-md text-[#1a1c1b] uppercase tracking-wider font-semibold">
              Curated Ensemble Pairings
            </span>
            <span className="font-label-caps-sm text-label-caps-sm text-[#735c00] font-semibold">
              MST Signature Look
            </span>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
            {product.crossSells.map((cross) => (
              <div
                key={cross.id}
                className="flex-shrink-0 w-44 bg-[#f4f4f2] rounded-lg p-2.5 flex flex-col gap-2 border border-black/[0.04]"
              >
                <div className="w-full h-44 rounded bg-[#eeeeec] overflow-hidden">
                  <img src={cross.image} alt={cross.title} className="w-full h-full object-cover" />
                </div>
                <span className="font-label-caps-sm text-label-caps-sm text-[#444748] truncate font-medium">
                  {cross.title}
                </span>
                <span className="font-label-sm text-label-sm font-bold text-[#1a1c1b]">
                  {formatPrice(cross.priceINR)}
                </span>
                <button
                  onClick={() => {
                    showToast(`Added matching ${cross.title} to your bag`);
                    addToCart(
                      {
                        ...product,
                        id: cross.id,
                        title: cross.title,
                        subtitle: cross.title,
                        priceINR: cross.priceINR,
                        primaryImage: cross.image
                      },
                      undefined,
                      undefined,
                      1
                    );
                  }}
                  className="w-full py-2 bg-[#e8e8e6] hover:bg-black hover:text-white text-[#1a1c1b] font-label-caps-sm text-label-caps-sm rounded transition-colors uppercase font-semibold"
                >
                  Add Match
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Sticky Conversion Footer Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md px-4 py-3 pb-safe border-t border-black/10 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
        <div className="flex items-center gap-3 max-w-xl mx-auto">
          {/* Live Price snippet */}
          <div className="flex flex-col flex-shrink-0">
            <span className="font-label-caps-sm text-label-caps-sm text-[#444748] uppercase font-medium">
              Total
            </span>
            <span className="font-headline-sm text-headline-sm font-semibold text-[#1a1c1b] leading-tight">
              {formatPrice(finalPriceINR)}
            </span>
          </div>

          {/* Add to Bag */}
          <button
            onClick={handleAddToCartClick}
            className="flex-1 h-12 bg-[#e8e8e6] hover:bg-[#e2e3e1] text-[#1a1c1b] font-label-caps-md text-label-caps-md uppercase tracking-wider flex items-center justify-center gap-1.5 rounded-lg transition-all active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[18px]">
              {addedState ? 'check_circle' : 'shopping_bag'}
            </span>
            <span>{addedState ? 'Reserved In Bag' : 'Add To Bag'}</span>
          </button>

          {/* 1-Click Buy Now */}
          <button
            onClick={handleBuyNowClick}
            className="flex-1 h-12 bg-black hover:bg-neutral-800 text-white font-label-caps-md text-label-caps-md uppercase tracking-wider flex items-center justify-center gap-1.5 rounded-lg transition-all active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[18px] text-[#ffe088]">bolt</span>
            <span>Buy Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};
