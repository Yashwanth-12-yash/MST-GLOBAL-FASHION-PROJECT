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
    showToast,
    cartCount
  } = useApp();

  const product = selectedProduct;
  const [quantity, setQuantity] = useState(1);
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
  const finalPriceINR = (product.priceINR + sizeDelta) * quantity;
  const finalMrpINR = (product.mrpINR + sizeDelta) * quantity;

  const handleAddToCartClick = () => {
    setAddedState(true);
    addToCart(product, selectedColor, selectedSize, quantity);
    setTimeout(() => {
      setAddedState(false);
    }, 2500);
  };

  const handleBuyNowClick = () => {
    addToCart(product, selectedColor, selectedSize, quantity);
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
      {/* Top Heritage Breadcrumb, Back Navigation & Bag Shortcut */}
      <div className="px-4 py-2.5 flex items-center justify-between bg-[#f4f4f2] text-xs border-b border-black/[0.04]">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentScreen('discover')}
            className="flex items-center gap-1 py-1 px-2 rounded-md bg-white text-[#1a1c1b] font-medium border border-black/10 hover:bg-[#e8e8e6] transition-colors shadow-xs text-xs active:scale-95"
          >
            <span className="material-symbols-outlined text-[15px]">arrow_back</span>
            <span>Back</span>
          </button>
          <div className="hidden sm:flex items-center gap-1.5 text-[#444748] font-label-caps-sm text-label-caps-sm uppercase truncate">
            <span>Heritage Atelier</span>
            <span>/</span>
            <span>Varanasi</span>
            <span>/</span>
            <span className="text-[#1a1c1b] font-semibold">{product.category}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-[#735c00] font-label-caps-sm text-label-caps-sm font-semibold shrink-0">
            <span
              className="material-symbols-outlined text-[14px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              verified
            </span>
            <span>100% Certified Silk Mark</span>
          </div>
          <button
            onClick={() => setCurrentScreen('bag')}
            className="relative flex items-center gap-1 text-[#1a1c1b] py-1 px-2 rounded-md bg-white border border-black/10 hover:bg-[#e8e8e6] transition-colors shadow-xs text-xs font-semibold"
          >
            <span className="material-symbols-outlined text-[16px]">shopping_bag</span>
            <span>Bag</span>
            {cartCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-[#735c00] text-white text-[10px] font-bold">
                {cartCount}
              </span>
            )}
          </button>
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

      {/* Prominent Inline Purchase & Add to Cart Section */}
      <section className="px-4 pt-6">
        <div className="bg-white p-5 rounded-2xl border border-black/10 shadow-sm flex flex-col gap-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex flex-col">
              <span className="font-label-caps-md text-label-caps-md uppercase tracking-wider font-bold text-[#1a1c1b]">
                Select Quantity
              </span>
              <span className="text-xs text-[#735c00] font-medium">
                Pessimistic allocation holds your pieces for 15 minutes
              </span>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center border border-black/20 rounded-lg bg-[#f9f9f7] overflow-hidden shadow-xs">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-10 h-10 flex items-center justify-center text-lg font-bold text-[#1a1c1b] hover:bg-[#eeeeec] active:bg-[#e2e3e1] transition-colors"
              >
                −
              </button>
              <span className="w-10 text-center font-bold text-sm text-[#1a1c1b]">
                {quantity}
              </span>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                className="w-10 h-10 flex items-center justify-center text-lg font-bold text-[#1a1c1b] hover:bg-[#eeeeec] active:bg-[#e2e3e1] transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Large Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <button
              id="inline-add-to-cart-btn"
              onClick={handleAddToCartClick}
              className={`w-full h-14 ${
                addedState ? 'bg-[#1b5e20]' : 'bg-[#1a1c1b] hover:bg-neutral-800'
              } text-white font-label-caps-md text-label-caps-md uppercase tracking-wider flex items-center justify-center gap-2 rounded-xl transition-all shadow-md active:scale-[0.98]`}
            >
              <span className="material-symbols-outlined text-[20px] text-[#ffe088]">
                {addedState ? 'check_circle' : 'shopping_bag'}
              </span>
              <span className="font-bold text-sm sm:text-base">
                {addedState ? '✓ Added To Bag' : 'Add To Cart'}
              </span>
            </button>

            <button
              id="inline-buy-now-btn"
              onClick={handleBuyNowClick}
              className="w-full h-14 bg-[#735c00] hover:bg-[#856b00] text-white font-label-caps-md text-label-caps-md uppercase tracking-wider flex items-center justify-center gap-2 rounded-xl transition-all shadow-md active:scale-[0.98]"
            >
              <span className="material-symbols-outlined text-[20px] text-[#ffe088]">
                bolt
              </span>
              <span className="font-bold text-sm sm:text-base">Buy Now • Instant Checkout</span>
            </button>
          </div>

          {/* Guarantee & Dispatch assurance footer */}
          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-black/5 text-center text-[11px] text-[#444748]">
            <div className="flex flex-col items-center">
              <span className="material-symbols-outlined text-[18px] text-[#735c00]">verified</span>
              <span className="font-semibold text-[#1a1c1b]">100% Genuine</span>
              <span>Govt. Silk Mark</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="material-symbols-outlined text-[18px] text-[#735c00]">local_shipping</span>
              <span className="font-semibold text-[#1a1c1b]">DHL Express</span>
              <span>24h Dispatch</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="material-symbols-outlined text-[18px] text-[#735c00]">lock</span>
              <span className="font-semibold text-[#1a1c1b]">Prepaid Duties</span>
              <span>No Custom Fees</span>
            </div>
          </div>
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
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md px-4 py-3 pb-safe border-t border-black/10 shadow-[0_-6px_25px_rgba(0,0,0,0.08)]">
        <div className="flex items-center gap-2 sm:gap-3 max-w-2xl mx-auto">
          {/* Back button */}
          <button
            onClick={() => setCurrentScreen('discover')}
            className="w-11 h-11 rounded-lg bg-[#eeeeec] hover:bg-[#e2e3e1] flex items-center justify-center text-[#1a1c1b] shrink-0 transition-colors shadow-xs"
            title="Back to Collections"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          </button>

          {/* Live Price snippet */}
          <div className="flex flex-col flex-shrink-0 min-w-[70px]">
            <span className="font-label-caps-sm text-label-caps-sm text-[#444748] uppercase font-medium">
              {quantity > 1 ? `Total (${quantity})` : 'Total'}
            </span>
            <span className="font-headline-sm text-headline-sm font-bold text-[#1a1c1b] leading-tight">
              {formatPrice(finalPriceINR)}
            </span>
          </div>

          {/* Add to Bag / Cart */}
          <button
            id="sticky-add-to-cart-btn"
            onClick={handleAddToCartClick}
            className={`flex-1 h-12 ${
              addedState ? 'bg-[#1b5e20]' : 'bg-[#1a1c1b] hover:bg-neutral-800'
            } text-white font-label-caps-md text-label-caps-md uppercase tracking-wider flex items-center justify-center gap-1.5 rounded-lg transition-all shadow-sm active:scale-[0.98]`}
          >
            <span className="material-symbols-outlined text-[18px] text-[#ffe088]">
              {addedState ? 'check_circle' : 'shopping_bag'}
            </span>
            <span className="font-bold text-xs sm:text-sm">
              {addedState ? '✓ Added To Bag' : 'Add To Cart'}
            </span>
          </button>

          {/* 1-Click Buy Now */}
          <button
            id="sticky-buy-now-btn"
            onClick={handleBuyNowClick}
            className="flex-1 h-12 bg-[#735c00] hover:bg-[#856b00] text-white font-label-caps-md text-label-caps-md uppercase tracking-wider flex items-center justify-center gap-1.5 rounded-lg transition-all shadow-sm active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[18px] text-[#ffe088]">bolt</span>
            <span className="font-bold text-xs sm:text-sm">Buy Now</span>
          </button>

          {/* Bag View Shortcut */}
          <button
            onClick={() => setCurrentScreen('bag')}
            className="relative w-11 h-11 rounded-lg bg-[#eeeeec] hover:bg-[#e2e3e1] flex items-center justify-center text-[#1a1c1b] shrink-0 transition-colors shadow-xs"
            title="View Shopping Bag"
          >
            <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-[#735c00] text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
