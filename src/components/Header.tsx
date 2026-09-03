import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CURRENCIES, BRAND_LOGO_URL, AVATAR_PROFILE_URL } from '../data/mockData';
import { CurrencyCode } from '../types';

interface HeaderProps {
  showBackButton?: boolean;
  pageTitle?: string;
}

export const Header: React.FC<HeaderProps> = ({ showBackButton, pageTitle }) => {
  const {
    currentScreen,
    setCurrentScreen,
    currency,
    setCurrency,
    cartCount,
    wishlistCount,
    setIsMenuOpen
  } = useApp();

  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const currentCurrObj = CURRENCIES[currency] || CURRENCIES.INR;

  const handleCurrencySelect = (code: CurrencyCode) => {
    setCurrency(code);
    setIsCurrencyDropdownOpen(false);
  };

  // If on product detail or checkout and back button is requested
  if (showBackButton) {
    return (
      <header className="fixed top-0 w-full z-50 pt-safe bg-[#f9f9f7]/95 backdrop-blur-xl border-b border-black/[0.04] shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
        <div className="h-16 px-4 md:px-8 max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              aria-label="Go Back"
              className="w-11 h-11 flex items-center justify-center text-[#1a1c1b] active:scale-95 transition-transform"
              onClick={() => setCurrentScreen('discover')}
            >
              <span className="material-symbols-outlined text-[24px]">arrow_back_ios_new</span>
            </button>
            <img
              alt="MST Global Fashion Logo"
              className="h-7 w-auto object-contain cursor-pointer"
              src={BRAND_LOGO_URL}
              onClick={() => setCurrentScreen('discover')}
            />
            <h1 className="font-headline-sm text-headline-sm tracking-tight font-medium text-[#1a1c1b] uppercase truncate max-w-[190px]">
              {pageTitle || 'MST Atelier'}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              aria-label="Wishlist"
              className="relative w-11 h-11 flex items-center justify-center text-[#1a1c1b] active:scale-95 transition-transform"
              onClick={() => setCurrentScreen('wishlist')}
            >
              <span className="material-symbols-outlined text-[22px]">favorite</span>
              {wishlistCount > 0 && (
                <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-black text-white font-label-caps-sm text-label-caps-sm flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>
            <button
              aria-label="Shopping Bag"
              className="relative w-11 h-11 flex items-center justify-center text-[#1a1c1b] active:scale-95 transition-transform"
              onClick={() => setCurrentScreen('bag')}
            >
              <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
              {cartCount > 0 && (
                <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[#735c00] text-white font-label-caps-sm text-label-caps-sm flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              aria-label="Account Profile"
              onClick={() => setCurrentScreen('account')}
              className="pl-1 active:scale-95 transition-transform"
            >
              <img
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover ring-1 ring-black/10"
                src={AVATAR_PROFILE_URL}
              />
            </button>
          </div>
        </div>
      </header>
    );
  }

  return (
    <>
      <header className="fixed top-0 w-full z-50 pt-safe bg-[#f9f9f7]/95 backdrop-blur-xl border-b border-black/[0.04] shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
        <div className="h-28 flex flex-col justify-between">
          {/* Top Announcement Bar */}
          <div className="h-8 px-4 md:px-8 bg-[#f4f4f2] text-[#444748] flex items-center justify-between text-xs overflow-hidden relative">
            <div className="relative">
              <button
                onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
                className="h-6 px-2 flex items-center gap-1 rounded-full bg-[#ffffff] text-[#1a1c1b] font-label-caps-sm text-label-caps-sm uppercase tracking-widest shadow-xs hover:bg-[#e8e8e6] transition-colors"
              >
                <span>{currentCurrObj.flag}</span>
                <span>{currentCurrObj.code} {currentCurrObj.symbol.trim()}</span>
                <span className="material-symbols-outlined text-[13px]">expand_more</span>
              </button>

              {/* Currency Dropdown menu */}
              {isCurrencyDropdownOpen && (
                <div className="absolute top-8 left-0 w-44 bg-white rounded-lg shadow-xl border border-black/10 py-1 z-50 flex flex-col animate-in fade-in zoom-in-95">
                  <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#735c00] border-b border-gray-100">
                    Select Billing Currency
                  </div>
                  {Object.values(CURRENCIES).map((c) => (
                    <button
                      key={c.code}
                      onClick={() => handleCurrencySelect(c.code)}
                      className={`px-3 py-2 text-left text-xs flex items-center justify-between hover:bg-[#f4f4f2] transition-colors ${
                        currency === c.code ? 'font-bold text-black bg-[#f9f9f7]' : 'text-gray-700'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{c.flag}</span>
                        <span>{c.name}</span>
                      </span>
                      <span className="text-gray-500 font-mono text-[11px]">{c.symbol}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex-1 px-3 truncate text-center">
              <span className="font-label-caps-sm text-label-caps-sm uppercase tracking-widest text-[#735c00] font-semibold">
                Worldwide Express Shipping &amp; Duties Included over ₹15,000
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-3 text-[11px] tracking-wider text-[#444748]">
              <span>DHL EXPRESS</span>
              <span>•</span>
              <span>24/7 CONCIERGE</span>
            </div>
          </div>

          {/* Main Brand & Nav Bar */}
          <div className="h-20 px-4 md:px-8 max-w-7xl w-full mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2 md:gap-4">
              <button
                aria-label="Menu"
                className="w-11 h-11 flex items-center justify-center text-[#1a1c1b] active:scale-95 transition-transform"
                onClick={() => setIsMenuOpen(true)}
              >
                <span className="material-symbols-outlined text-[24px]">menu</span>
              </button>
              <div
                onClick={() => setCurrentScreen('discover')}
                className="flex items-center gap-2 cursor-pointer"
              >
                <img
                  alt="MST Global Fashion Logo"
                  className="h-8 md:h-9 w-auto object-contain"
                  src={BRAND_LOGO_URL}
                />
                <span className="font-headline-sm text-headline-sm tracking-tight font-medium uppercase text-[#1a1c1b] hidden xs:inline">
                  MST
                </span>
              </div>
            </div>

            <div className="flex items-center">
              <button
                aria-label="Search Catalog"
                className="w-11 h-11 flex items-center justify-center text-[#1a1c1b] active:scale-95 transition-transform hover:text-[#735c00]"
                onClick={() => setIsSearchOpen(true)}
              >
                <span className="material-symbols-outlined text-[22px]">search</span>
              </button>
              <button
                aria-label="Wishlist"
                className="relative w-11 h-11 flex items-center justify-center text-[#1a1c1b] active:scale-95 transition-transform hover:text-[#735c00]"
                onClick={() => setCurrentScreen('wishlist')}
              >
                <span className="material-symbols-outlined text-[22px]">favorite</span>
                {wishlistCount > 0 && (
                  <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-black text-white font-label-caps-sm text-label-caps-sm flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </button>
              <button
                aria-label="Shopping Bag"
                className="relative w-11 h-11 flex items-center justify-center text-[#1a1c1b] active:scale-95 transition-transform hover:text-[#735c00]"
                onClick={() => setCurrentScreen('bag')}
              >
                <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
                {cartCount > 0 && (
                  <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[#735c00] text-white font-label-caps-sm text-label-caps-sm flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
              <button
                aria-label="Account Profile"
                onClick={() => setCurrentScreen('account')}
                className="pl-2 active:scale-95 transition-transform"
                title="Global Operations Center"
              >
                <img
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-[#735c00]/30 hover:ring-[#735c00]"
                  src={AVATAR_PROFILE_URL}
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Global Search Overlay Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-start justify-center pt-20 px-4">
          <div className="w-full max-w-xl bg-[#ffffff] rounded-xl shadow-2xl p-6 flex flex-col gap-4 animate-in fade-in slide-in-from-top-4">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <div className="flex items-center gap-2 flex-1">
                <span className="material-symbols-outlined text-gray-400">search</span>
                <input
                  type="text"
                  placeholder="Search sarees, lehengas, sherwanis, high jewelry..."
                  className="w-full text-base font-body-md outline-none bg-transparent"
                  value={searchQuery}
                  autoFocus
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button
                onClick={() => setIsSearchOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <span className="font-label-caps-sm text-label-caps-sm text-gray-400 uppercase tracking-widest">
                Popular Atelier Collections
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  'Banarasi Katan Silk',
                  '24K Zari Weave',
                  'Velvet Anarkali',
                  'Bespoke Sherwani',
                  'Polki Kundan Choker',
                  'Bridal Lehengas'
                ].map((term) => (
                  <button
                    key={term}
                    onClick={() => {
                      setSearchQuery(term);
                    }}
                    className="px-3 py-1.5 rounded-full bg-[#f4f4f2] text-xs font-medium hover:bg-black hover:text-white transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setIsSearchOpen(false);
                  setCurrentScreen('categories');
                }}
                className="w-full py-3 bg-black text-white font-label-caps-md text-label-caps-md uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 hover:bg-neutral-800"
              >
                <span>Browse All Ateliers</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
