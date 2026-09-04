import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES, COLLECTIONS, ALL_PRODUCTS } from '../data/mockData';
import { Product, CategoryItem, CollectionItem } from '../types';

export const CategoriesScreen: React.FC = () => {
  const {
    setSelectedProduct,
    setCurrentScreen,
    formatPrice,
    toggleWishlist,
    isWishlisted,
    addToCart,
    selectedCategoryFilter,
    setSelectedCategoryFilter
  } = useApp();

  const [activeTab, setActiveTab] = useState<'all_products' | 'categories' | 'collections'>('all_products');
  const [selectedCatId, setSelectedCatId] = useState<string>('all');
  const [selectedColId, setSelectedColId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeFilterChip, setActiveFilterChip] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'recommended' | 'price-asc' | 'price-desc' | 'rating'>('recommended');
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  // Sync with global category filter from context if provided
  useEffect(() => {
    if (selectedCategoryFilter) {
      const matchCat = CATEGORIES.find(
        (c) => c.name.toLowerCase() === selectedCategoryFilter.toLowerCase() || c.id === selectedCategoryFilter
      );
      if (matchCat) {
        setSelectedCatId(matchCat.id);
        setSelectedColId('all');
        setActiveTab('all_products');
      }
    }
  }, [selectedCategoryFilter]);

  const filterChips = [
    'All',
    'Handloom Weaves',
    'Pure Zari Silk',
    'Royal Bridal',
    "Men's Regalia",
    'High Jewelry',
    'Ready To Ship'
  ];

  // Derive active category and collection objects
  const activeCategory: CategoryItem | undefined = CATEGORIES.find((c) => c.id === selectedCatId);
  const activeCollection: CollectionItem | undefined = COLLECTIONS.find((col) => col.id === selectedColId);

  // Handle selecting a category
  const handleSelectCategory = (catId: string) => {
    if (selectedCatId === catId) {
      setSelectedCatId('all');
      if (setSelectedCategoryFilter) setSelectedCategoryFilter(null);
    } else {
      setSelectedCatId(catId);
      setSelectedColId('all');
      const cat = CATEGORIES.find((c) => c.id === catId);
      if (setSelectedCategoryFilter && cat) setSelectedCategoryFilter(cat.name);
    }
  };

  // Handle selecting a collection
  const handleSelectCollection = (colId: string) => {
    if (selectedColId === colId) {
      setSelectedColId('all');
    } else {
      setSelectedColId(colId);
      setSelectedCatId('all');
      if (setSelectedCategoryFilter) setSelectedCategoryFilter(null);
    }
  };

  // Switch between matching category and collection
  const handleJumpToMatchingCollection = (collectionName: string) => {
    const col = COLLECTIONS.find((c) => c.name.toLowerCase() === collectionName.toLowerCase());
    if (col) {
      setSelectedColId(col.id);
      setSelectedCatId('all');
      if (setSelectedCategoryFilter) setSelectedCategoryFilter(null);
      setActiveTab('all_products');
    }
  };

  const handleJumpToMatchingCategory = (categoryId: string) => {
    const cat = CATEGORIES.find((c) => c.id === categoryId);
    if (cat) {
      setSelectedCatId(cat.id);
      setSelectedColId('all');
      if (setSelectedCategoryFilter) setSelectedCategoryFilter(cat.name);
      setActiveTab('all_products');
    }
  };

  // Filter products based on selected category, collection, search query, and chips
  const filteredProducts = ALL_PRODUCTS.filter((p) => {
    // Category filter
    if (selectedCatId !== 'all') {
      const cat = CATEGORIES.find((c) => c.id === selectedCatId);
      if (cat && p.categoryId !== cat.id && !p.category.toLowerCase().includes(cat.name.toLowerCase())) {
        return false;
      }
    }

    // Collection filter
    if (selectedColId !== 'all') {
      const col = COLLECTIONS.find((c) => c.id === selectedColId);
      if (col && p.collectionId !== col.id && !p.collection?.toLowerCase().includes(col.name.toLowerCase())) {
        return false;
      }
    }

    // Keyword Search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const matchTitle = p.title.toLowerCase().includes(query);
      const matchCategory = p.category.toLowerCase().includes(query);
      const matchCollection = p.collection?.toLowerCase().includes(query);
      const matchFabric = p.fabricBase?.toLowerCase().includes(query);
      const matchDesc = p.description?.toLowerCase().includes(query);
      if (!matchTitle && !matchCategory && !matchCollection && !matchFabric && !matchDesc) {
        return false;
      }
    }

    // Secondary Chips
    if (activeFilterChip === 'Handloom Weaves') {
      return (
        p.title.toLowerCase().includes('handloom') ||
        p.fabricBase?.toLowerCase().includes('handloom') ||
        p.category.toLowerCase().includes('silk')
      );
    }
    if (activeFilterChip === 'Pure Zari Silk') {
      return (
        p.fabricBase?.toLowerCase().includes('silk') ||
        p.description?.toLowerCase().includes('zari') ||
        p.title.toLowerCase().includes('zari')
      );
    }
    if (activeFilterChip === 'Royal Bridal') {
      return (
        p.category.toLowerCase().includes('bridal') ||
        p.category.toLowerCase().includes('lehenga') ||
        p.collectionId?.includes('bridal')
      );
    }
    if (activeFilterChip === "Men's Regalia") {
      return (
        p.category.toLowerCase().includes('men') ||
        p.category.toLowerCase().includes('sherwani') ||
        p.category.toLowerCase().includes('bandhgala')
      );
    }
    if (activeFilterChip === 'High Jewelry') {
      return p.category.toLowerCase().includes('jewelry') || p.category.toLowerCase().includes('polki');
    }
    if (activeFilterChip === 'Ready To Ship') {
      return (p.stockLimit ?? 1) > 0;
    }

    return true;
  }).sort((a, b) => {
    if (sortBy === 'price-asc') return a.priceINR - b.priceINR;
    if (sortBy === 'price-desc') return b.priceINR - a.priceINR;
    if (sortBy === 'rating') return (b.rating || 4.9) - (a.rating || 4.9);
    return 0;
  });

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setCurrentScreen('product_detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    addToCart(product, product.colors[0], product.sizes[0], 1);
    setRecentlyAddedId(product.id);
    setTimeout(() => {
      setRecentlyAddedId(null);
    }, 2000);
  };

  const clearAllFilters = () => {
    setSelectedCatId('all');
    setSelectedColId('all');
    setActiveFilterChip('All');
    setSearchQuery('');
    if (setSelectedCategoryFilter) setSelectedCategoryFilter(null);
  };

  return (
    <div className="flex flex-col w-full pb-28 text-[#1a1c1b] px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Editorial Header */}
      <div className="pt-6 pb-4 border-b border-black/[0.06]">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#735c00]" />
              <span className="font-label-caps-md text-label-caps-md text-[#735c00] font-bold uppercase tracking-widest">
                Haute Couture Ateliers & Archives
              </span>
            </div>
            <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-[#1a1c1b] font-serif mt-1">
              Curated Taxonomies & Collections
            </h1>
            <p className="font-body-sm text-body-sm text-[#444748] mt-1 max-w-2xl">
              Discover 10 master ateliers paired directly with their signature heritage collections—from sacred Banarasi & Kanjeevaram weaves to Nizam high jewelry.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3 self-start sm:self-auto bg-[#f4f4f2] px-3.5 py-2 rounded-xl text-xs font-medium text-[#444748] border border-black/[0.04]">
            <span><strong>{CATEGORIES.length}</strong> Categories</span>
            <span className="text-black/20">•</span>
            <span><strong>{COLLECTIONS.length}</strong> Collections</span>
            <span className="text-black/20">•</span>
            <span><strong>{ALL_PRODUCTS.length}</strong> Masterpieces</span>
          </div>
        </div>

        {/* Primary View Mode Tabs */}
        <div className="flex items-center gap-2 mt-5 border-b border-black/[0.08] -mx-4 sm:-mx-6 px-4 sm:px-6">
          <button
            onClick={() => setActiveTab('all_products')}
            className={`pb-3 px-3 font-label-caps-sm text-label-caps-sm uppercase tracking-wider transition-colors relative flex items-center gap-1.5 ${
              activeTab === 'all_products'
                ? 'text-[#1a1c1b] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-black'
                : 'text-[#444748] hover:text-black font-medium'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">grid_view</span>
            <span>All Catalog Items ({filteredProducts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('categories')}
            className={`pb-3 px-3 font-label-caps-sm text-label-caps-sm uppercase tracking-wider transition-colors relative flex items-center gap-1.5 ${
              activeTab === 'categories'
                ? 'text-[#1a1c1b] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-black'
                : 'text-[#444748] hover:text-black font-medium'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">category</span>
            <span>Explore 10 Categories</span>
          </button>

          <button
            onClick={() => setActiveTab('collections')}
            className={`pb-3 px-3 font-label-caps-sm text-label-caps-sm uppercase tracking-wider transition-colors relative flex items-center gap-1.5 ${
              activeTab === 'collections'
                ? 'text-[#1a1c1b] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-black'
                : 'text-[#444748] hover:text-black font-medium'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">collections_bookmark</span>
            <span>Explore 10 Matching Collections</span>
          </button>
        </div>
      </div>

      {/* ACTIVE SELECTION BANNER (Shows when a specific category or collection is selected) */}
      {(activeCategory || activeCollection) && (
        <div className="mt-4 p-4 md:p-5 rounded-2xl bg-gradient-to-r from-[#1a1c1b] via-[#2c271e] to-[#1a1c1b] text-white shadow-md relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="relative z-10 flex-1">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-[#fed65b] text-black text-[10px] font-bold uppercase tracking-wider">
                {activeCategory ? 'Active Category' : 'Active Collection'}
              </span>
              <span className="text-white/60 text-xs">
                {activeCategory?.stylesCount || activeCollection?.stylesCount}
              </span>
            </div>

            <h2 className="font-headline-md text-headline-md text-white font-serif">
              {activeCategory ? activeCategory.name : activeCollection?.name}
            </h2>

            <p className="text-white/80 text-xs sm:text-sm mt-1 max-w-2xl line-clamp-2">
              {activeCategory ? activeCategory.description : activeCollection?.description}
            </p>

            {/* Direct Category-Collection Match Link */}
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              {activeCategory && (
                <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-xs text-xs">
                  <span className="text-[#ffe088] font-semibold">Matched Collection:</span>
                  <span className="text-white font-medium">{activeCategory.matchingCollectionName}</span>
                  <button
                    onClick={() => handleJumpToMatchingCollection(activeCategory.matchingCollectionName)}
                    className="ml-1 text-[#fed65b] hover:underline font-bold text-xs flex items-center"
                  >
                    View Collection
                    <span className="material-symbols-outlined text-[14px] ml-0.5">arrow_forward</span>
                  </button>
                </div>
              )}

              {activeCollection && (
                <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-xs text-xs">
                  <span className="text-[#ffe088] font-semibold">Matched Category:</span>
                  <span className="text-white font-medium">{activeCollection.categoryName}</span>
                  <button
                    onClick={() => handleJumpToMatchingCategory(activeCollection.categoryId)}
                    className="ml-1 text-[#fed65b] hover:underline font-bold text-xs flex items-center"
                  >
                    View Category
                    <span className="material-symbols-outlined text-[14px] ml-0.5">arrow_forward</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="relative z-10 flex items-center gap-2 self-stretch md:self-auto justify-end">
            <button
              onClick={clearAllFilters}
              className="px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-1.5 backdrop-blur-xs"
            >
              <span className="material-symbols-outlined text-[15px]">close</span>
              <span>Clear Filter</span>
            </button>
          </div>
        </div>
      )}

      {/* VIEW: CATEGORIES GRID TAB */}
      {activeTab === 'categories' && (
        <div className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-headline-sm text-headline-sm font-serif">10 Curated Ateliers</h2>
              <p className="text-xs text-[#444748] mt-0.5">
                Each category is directly linked to an archival haute couture collection. Click any category to filter catalog pieces.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCatId === cat.id;
              return (
                <div
                  key={cat.id}
                  onClick={() => {
                    handleSelectCategory(cat.id);
                    setActiveTab('all_products');
                  }}
                  className={`group relative bg-white rounded-2xl overflow-hidden cursor-pointer border transition-all duration-300 flex flex-col ${
                    isSelected
                      ? 'border-black shadow-md ring-2 ring-black'
                      : 'border-black/[0.06] hover:border-black/30 hover:shadow-md'
                  }`}
                >
                  <div className="relative aspect-[4/3] w-full bg-[#eeeeec] overflow-hidden">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-2 left-2 right-2 text-white">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[#ffe088]">
                        {cat.stylesCount}
                      </span>
                      <h3 className="font-bold text-sm leading-tight text-white">{cat.name}</h3>
                    </div>
                  </div>

                  <div className="p-3 flex flex-col justify-between flex-1 gap-2 bg-[#fdfdfc]">
                    <p className="text-[11px] text-[#444748] line-clamp-2 leading-relaxed">
                      {cat.description}
                    </p>

                    <div className="pt-2 border-t border-black/[0.04]">
                      <span className="text-[10px] text-[#735c00] font-semibold uppercase tracking-wider block">
                        Matched Collection:
                      </span>
                      <span className="text-xs font-medium text-[#1a1c1b] line-clamp-1">
                        {cat.matchingCollectionName}
                      </span>
                    </div>

                    <button
                      className={`w-full py-1.5 px-2 rounded text-[11px] font-bold uppercase tracking-wider transition-colors mt-1 ${
                        isSelected
                          ? 'bg-black text-white'
                          : 'bg-[#eeeeec] text-[#1a1c1b] group-hover:bg-black group-hover:text-white'
                      }`}
                    >
                      {isSelected ? '✓ Filtering' : 'Browse Items'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW: COLLECTIONS ARCHIVE TAB */}
      {activeTab === 'collections' && (
        <div className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-headline-sm text-headline-sm font-serif">10 Archival Collections</h2>
              <p className="text-xs text-[#444748] mt-0.5">
                Archival capsules pairing centuries-old craftsmanship with modern luxury. Click to inspect curated items.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {COLLECTIONS.map((col) => {
              const isSelected = selectedColId === col.id;
              return (
                <div
                  key={col.id}
                  onClick={() => {
                    handleSelectCollection(col.id);
                    setActiveTab('all_products');
                  }}
                  className={`group bg-white rounded-2xl overflow-hidden cursor-pointer border transition-all duration-300 flex flex-col ${
                    isSelected
                      ? 'border-black ring-2 ring-black shadow-lg'
                      : 'border-black/[0.06] hover:border-black/30 hover:shadow-md'
                  }`}
                >
                  <div className="relative aspect-[16/9] w-full bg-[#eeeeec] overflow-hidden">
                    <img
                      src={col.image}
                      alt={col.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] uppercase font-bold tracking-wider">
                        {col.stylesCount}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <span className="text-[11px] uppercase tracking-wider text-[#fed65b] font-semibold">
                        Matched: {col.categoryName}
                      </span>
                      <h3 className="font-headline-sm text-headline-sm font-serif text-white leading-tight">
                        {col.name}
                      </h3>
                    </div>
                  </div>

                  <div className="p-4 flex flex-col justify-between flex-1 gap-3">
                    <div>
                      <p className="text-xs font-semibold text-[#735c00] italic mb-1">"{col.tagline}"</p>
                      <p className="text-xs text-[#444748] leading-relaxed line-clamp-3">
                        {col.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-black/[0.06] flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs text-[#444748]">
                        <span className="material-symbols-outlined text-[16px] text-[#735c00]">verified</span>
                        <span>Certified Masterloom</span>
                      </div>

                      <button
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
                          isSelected
                            ? 'bg-black text-white'
                            : 'bg-[#1a1c1b] text-white hover:bg-neutral-800'
                        }`}
                      >
                        {isSelected ? '✓ Viewing' : 'Explore Pieces'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* CONTROLS BAR: Fast Category Quick-Bar, Search, and Chips */}
      <div className="pt-6 flex flex-col gap-3">
        {/* Quick Horizontal Scroll of all 10 Categories */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 -mx-4 sm:-mx-6 px-4 sm:px-6">
          <button
            onClick={() => {
              setSelectedCatId('all');
              setSelectedColId('all');
              if (setSelectedCategoryFilter) setSelectedCategoryFilter(null);
            }}
            className={`px-3.5 py-1.5 rounded-full font-label-caps-sm text-label-caps-sm uppercase tracking-wider whitespace-nowrap transition-all ${
              selectedCatId === 'all' && selectedColId === 'all'
                ? 'bg-black text-white font-bold'
                : 'bg-[#eeeeec] text-[#1a1c1b] hover:bg-[#e2e3e1]'
            }`}
          >
            All Pieces ({ALL_PRODUCTS.length})
          </button>

          {CATEGORIES.map((cat) => {
            const isSelected = selectedCatId === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleSelectCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full font-label-caps-sm text-label-caps-sm uppercase tracking-wider whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-black text-white font-bold'
                    : 'bg-[#eeeeec] text-[#1a1c1b] hover:bg-[#e2e3e1]'
                }`}
              >
                <span>{cat.name}</span>
                <span className={`text-[10px] ${isSelected ? 'text-[#fed65b]' : 'text-[#735c00]'}`}>
                  • {cat.matchingCollectionName.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Input, Sort, and Filter Chips */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-black/[0.06] shadow-xs">
          {/* Search Box */}
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-[#444748]">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by weave, fabric, zardozi needlework, collection..."
              className="w-full pl-9 pr-8 py-2 bg-[#f4f4f2] text-xs rounded-xl focus:outline-none focus:ring-1 focus:ring-black placeholder:text-[#747778]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 self-end md:self-auto">
            <span className="text-xs text-[#444748] font-medium whitespace-nowrap">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#f4f4f2] border border-black/10 rounded-xl px-2.5 py-1.5 text-xs text-[#1a1c1b] font-medium focus:outline-none"
            >
              <option value="recommended">Curated Picks</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated (4.9+)</option>
            </select>
          </div>
        </div>

        {/* Secondary Filter Chips */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
          {filterChips.map((chip) => (
            <button
              key={chip}
              onClick={() => setActiveFilterChip(chip)}
              className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                activeFilterChip === chip
                  ? 'bg-[#735c00] text-white font-semibold'
                  : 'bg-[#f4f4f2] text-[#444748] hover:bg-[#e8e8e6]'
              }`}
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

      {/* PRODUCTS SECTION HEADER */}
      <div className="pt-6 pb-2 flex items-baseline justify-between">
        <div>
          <h3 className="font-headline-sm text-headline-sm font-serif text-[#1a1c1b]">
            {selectedCatId !== 'all'
              ? `${activeCategory?.name} Ensemble`
              : selectedColId !== 'all'
              ? `${activeCollection?.name} Archive`
              : 'All Haute Couture Pieces'}
          </h3>
          <p className="text-xs text-[#444748] mt-0.5">
            Showing {filteredProducts.length} certified artisan handcrafts
          </p>
        </div>

        {(selectedCatId !== 'all' || selectedColId !== 'all' || searchQuery || activeFilterChip !== 'All') && (
          <button
            onClick={clearAllFilters}
            className="text-xs font-bold uppercase tracking-wider text-[#ba1a1a] hover:underline"
          >
            Reset All Filters
          </button>
        )}
      </div>

      {/* EMPTY STATE */}
      {filteredProducts.length === 0 && (
        <div className="p-12 text-center bg-white rounded-2xl border border-black/[0.06] mt-4">
          <span className="material-symbols-outlined text-4xl text-gray-300 mb-2">dry_cleaning</span>
          <h4 className="font-bold text-base text-[#1a1c1b]">No matching pieces found</h4>
          <p className="text-xs text-[#444748] mt-1 max-w-sm mx-auto">
            Try adjusting your search criteria or resetting filters to browse our entire atelier catalog.
          </p>
          <button
            onClick={clearAllFilters}
            className="mt-4 px-4 py-2 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-lg"
          >
            Show All Catalog Pieces
          </button>
        </div>
      )}

      {/* PRODUCTS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 pt-3">
        {filteredProducts.map((p) => {
          const wish = isWishlisted(p.id);
          const isAdded = recentlyAddedId === p.id;
          const matchingCat = CATEGORIES.find((c) => c.id === p.categoryId);
          const matchingCol = COLLECTIONS.find((c) => c.id === p.collectionId);

          return (
            <div
              key={p.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-xs border border-black/[0.06] hover:shadow-md transition-all flex flex-col"
            >
              {/* Product Image & Badges */}
              <div
                onClick={() => handleProductSelect(p)}
                className="relative aspect-[3/4] bg-[#eeeeec] cursor-pointer overflow-hidden"
              >
                <img
                  src={p.primaryImage}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Wishlist Button */}
                <button
                  aria-label="Wishlist toggle"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(p.id);
                  }}
                  className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/85 backdrop-blur-md flex items-center justify-center text-[#1a1c1b] shadow-xs active:scale-75 transition-transform"
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

                {/* Top Badges */}
                <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
                  {p.editionBadge ? (
                    <span className="px-2 py-0.5 rounded-full bg-black/80 text-white font-label-caps-sm text-label-caps-sm uppercase tracking-wider backdrop-blur-xs">
                      {p.editionBadge}
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full bg-[#40000a] text-[#dd565f] font-label-caps-sm text-label-caps-sm font-bold uppercase tracking-wider">
                      Artisan Handloom
                    </span>
                  )}
                  {p.mrpINR > p.priceINR && (
                    <span className="px-1.5 py-0.5 rounded-full bg-[#735c00] text-white font-label-caps-sm text-label-caps-sm uppercase tracking-wider w-fit">
                      Save {Math.round(((p.mrpINR - p.priceINR) / p.mrpINR) * 100)}%
                    </span>
                  )}
                </div>

                {/* Fabric pill */}
                {p.fabricBase && (
                  <div className="absolute bottom-2.5 left-2.5">
                    <span className="px-2 py-0.5 rounded bg-white/90 text-black text-[10px] font-semibold backdrop-blur-xs shadow-xs">
                      {p.fabricBase}
                    </span>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-3.5 flex flex-col gap-1.5 flex-1 justify-between bg-white">
                <div>
                  {/* Category and Matching Collection Tags */}
                  <div className="flex flex-col gap-0.5 mb-1">
                    <div className="flex items-center justify-between">
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          if (matchingCat) handleSelectCategory(matchingCat.id);
                        }}
                        className="font-label-caps-sm text-label-caps-sm text-[#735c00] font-bold uppercase cursor-pointer hover:underline"
                      >
                        {p.category}
                      </span>
                      <div className="flex items-center text-[11px] text-[#444748] font-medium">
                        <span className="material-symbols-outlined text-[13px] text-[#fed65b] mr-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>
                          star
                        </span>
                        <span>{p.rating || 4.9}</span>
                      </div>
                    </div>

                    {p.collection && (
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          if (matchingCol) handleSelectCollection(matchingCol.id);
                        }}
                        className="text-[10px] text-[#444748] font-medium hover:text-black line-clamp-1 cursor-pointer flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-[11px] text-[#735c00]">collections_bookmark</span>
                        <span>{p.collection}</span>
                      </span>
                    )}
                  </div>

                  <h3
                    onClick={() => handleProductSelect(p)}
                    className="font-headline-sm text-headline-sm text-[#1a1c1b] line-clamp-1 cursor-pointer hover:text-[#735c00] font-medium leading-tight"
                  >
                    {p.title}
                  </h3>
                </div>

                <div className="pt-2">
                  <div className="flex items-baseline gap-2">
                    <span className="font-headline-sm text-headline-sm font-bold text-[#1a1c1b]">
                      {formatPrice(p.priceINR)}
                    </span>
                    {p.mrpINR > p.priceINR && (
                      <span className="font-body-sm text-body-sm line-through text-[#444748]">
                        {formatPrice(p.mrpINR)}
                      </span>
                    )}
                  </div>

                  {/* Actions: Add to Bag & View Details */}
                  <div className="flex flex-col gap-1.5 mt-3">
                    <button
                      onClick={(e) => handleQuickAdd(e, p)}
                      className={`w-full py-2.5 px-3 ${
                        isAdded
                          ? 'bg-[#1b5e20] text-white'
                          : 'bg-[#1a1c1b] hover:bg-neutral-800 text-white'
                      } rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-xs active:scale-95`}
                    >
                      <span className="material-symbols-outlined text-[16px] text-[#ffe088]">
                        {isAdded ? 'check_circle' : 'shopping_bag'}
                      </span>
                      <span>{isAdded ? '✓ Added To Bag' : 'Add To Cart'}</span>
                    </button>

                    <button
                      onClick={() => handleProductSelect(p)}
                      className="w-full py-1.5 bg-[#f4f4f2] hover:bg-[#eeeeec] text-[#1a1c1b] rounded-xl text-[11px] font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-1"
                    >
                      <span>View Atelier Details</span>
                      <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
