import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES, ALL_PRODUCTS } from '../data/mockData';
import { Product } from '../types';

export const CategoriesScreen: React.FC = () => {
  const { setSelectedProduct, setCurrentScreen, formatPrice, toggleWishlist, isWishlisted } =
    useApp();
  const [selectedCat, setSelectedCat] = useState<string>('All');
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const filterChips = ['All', 'Handloom', 'Zari Silk', 'Bespoke Fit', 'Ready To Ship'];

  const filteredProducts = ALL_PRODUCTS.filter((p) => {
    if (selectedCat !== 'All' && !p.category.toLowerCase().includes(selectedCat.toLowerCase())) {
      return false;
    }
    if (activeFilter === 'Handloom') return p.title.toLowerCase().includes('handloom');
    if (activeFilter === 'Zari Silk') return p.fabricBase?.toLowerCase().includes('silk');
    if (activeFilter === 'Ready To Ship') return p.id.includes('saree') || p.id.includes('anarkali');
    return true;
  });

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setCurrentScreen('product_detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col w-full pb-24 text-[#1a1c1b] px-4 max-w-6xl mx-auto">
      {/* Header */}
      <div className="pt-6 pb-2">
        <span className="font-label-caps-md text-label-caps-md text-[#735c00] font-bold uppercase tracking-widest">
          Atelier Collections
        </span>
        <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-[#1a1c1b] font-serif">
          Curated Taxonomies
        </h2>
        <p className="font-body-sm text-body-sm text-[#444748] mt-1">
          Explore artisanal weaves, royal bridal heritage, and handcrafted polki jewelry.
        </p>
      </div>

      {/* Categories Horizontal Selector */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-2 -mx-4 px-4">
        <button
          onClick={() => setSelectedCat('All')}
          className={`px-4 py-2 rounded-full font-label-caps-sm text-label-caps-sm uppercase tracking-wider transition-all ${
            selectedCat === 'All'
              ? 'bg-black text-white'
              : 'bg-[#eeeeec] text-[#1a1c1b] hover:bg-[#e2e3e1]'
          }`}
        >
          All Ateliers
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCat(cat.name)}
            className={`px-4 py-2 rounded-full font-label-caps-sm text-label-caps-sm uppercase tracking-wider whitespace-nowrap transition-all ${
              selectedCat === cat.name
                ? 'bg-black text-white'
                : 'bg-[#eeeeec] text-[#1a1c1b] hover:bg-[#e2e3e1]'
            }`}
          >
            {cat.name} ({cat.stylesCount})
          </button>
        ))}
      </div>

      {/* Secondary Filter Chips */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-2">
        {filterChips.map((chip) => (
          <button
            key={chip}
            onClick={() => setActiveFilter(chip)}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
              activeFilter === chip
                ? 'bg-[#735c00] text-white'
                : 'bg-[#f4f4f2] text-[#444748] hover:bg-[#e8e8e6]'
            }`}
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-4">
        {filteredProducts.map((p) => {
          const wish = isWishlisted(p.id);
          return (
            <div
              key={p.id}
              className="group bg-white rounded-xl overflow-hidden shadow-xs border border-black/[0.04] flex flex-col"
            >
              <div
                onClick={() => handleProductSelect(p)}
                className="relative aspect-[3/4] bg-[#eeeeec] cursor-pointer overflow-hidden"
              >
                <img
                  src={p.primaryImage}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <button
                  aria-label="Wishlist toggle"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(p.id);
                  }}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-[#1a1c1b] active:scale-75 transition-transform"
                >
                  <span
                    className={`material-symbols-outlined text-[18px] ${
                      wish ? 'text-[#ba1a1a]' : ''
                    }`}
                    style={wish ? { fontVariationSettings: "'FILL' 1" } : undefined}
                  >
                    {wish ? 'favorite' : 'favorite_border'}
                  </span>
                </button>
                {p.editionBadge && (
                  <span className="absolute bottom-2 left-2 bg-black/80 text-white font-label-caps-sm text-label-caps-sm px-2 py-0.5 rounded backdrop-blur-xs">
                    {p.editionBadge}
                  </span>
                )}
              </div>

              <div className="p-3 flex flex-col gap-1 flex-1 justify-between">
                <div>
                  <span className="font-label-caps-sm text-label-caps-sm text-[#735c00] font-semibold uppercase">
                    {p.category}
                  </span>
                  <h3
                    onClick={() => handleProductSelect(p)}
                    className="font-headline-sm text-headline-sm text-[#1a1c1b] line-clamp-1 cursor-pointer hover:text-[#735c00]"
                  >
                    {p.title}
                  </h3>
                </div>
                <div className="pt-2">
                  <div className="flex items-baseline gap-2">
                    <span className="font-headline-sm text-headline-sm font-semibold text-[#1a1c1b]">
                      {formatPrice(p.priceINR)}
                    </span>
                    {p.mrpINR > p.priceINR && (
                      <span className="font-body-sm text-body-sm line-through text-[#444748]">
                        {formatPrice(p.mrpINR)}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => handleProductSelect(p)}
                    className="w-full mt-2 py-2 bg-[#eeeeec] hover:bg-black hover:text-white rounded text-xs font-semibold uppercase tracking-wider transition-colors"
                  >
                    View Atelier Specs
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
