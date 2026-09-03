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
    setIsMenuOpen,
    currentUser,
    isAdmin,
    setIsAuthModalOpen,
    setAuthModalMode,
    quickLoginAdmin,
    quickLoginCustomer,
    logout,
    showToast
  } = useApp();

  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const currentCurrObj = CURRENCIES[currency] || CURRENCIES.INR;

  const handleCurrencySelect = (code: CurrencyCode) => {
    setCurrency(code);
    setIsCurrencyDropdownOpen(false);
    const selected = CURRENCIES[code];
    showToast(`Currency updated: ${selected.flag} ${selected.code} (${selected.symbol.trim()})`);
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
          <div className="h-8 px-4 md:px-8 bg-[#f4f4f2] text-[#444748] flex items-center justify-between text-xs relative z-30">
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
                className="h-6 px-2.5 flex items-center gap-1.5 rounded-full bg-[#ffffff] text-[#1a1c1b] font-label-caps-sm text-[10px] uppercase tracking-widest shadow-xs hover:bg-[#eaeae8] transition-all border border-black/5"
                title="Change store billing currency"
              >
                <span className="text-[13px]">{currentCurrObj.flag}</span>
                <span className="font-semibold">{currentCurrObj.code}</span>
                <span className="text-gray-500 font-normal">{currentCurrObj.symbol.trim()}</span>
                <span className={`material-symbols-outlined text-[13px] transition-transform duration-200 ${isCurrencyDropdownOpen ? 'rotate-180' : ''}`}>
                  expand_more
                </span>
              </button>

              {/* Currency Dropdown menu with click-outside backdrop */}
              {isCurrencyDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40 bg-black/10 backdrop-blur-[0.5px]"
                    onClick={() => setIsCurrencyDropdownOpen(false)}
                  />
                  <div className="absolute top-8 left-0 w-52 max-h-80 overflow-y-auto bg-white rounded-xl shadow-2xl border border-black/10 py-1.5 z-50 flex flex-col animate-in fade-in zoom-in-95">
                    <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#735c00] border-b border-gray-100 flex items-center justify-between">
                      <span>Store Currency</span>
                      <span className="text-[9px] text-gray-400 font-normal">Real-Time FX</span>
                    </div>
                    {Object.values(CURRENCIES).map((c) => (
                      <button
                        key={c.code}
                        type="button"
                        onClick={() => handleCurrencySelect(c.code)}
                        className={`px-3 py-2 text-left text-xs flex items-center justify-between hover:bg-[#f4f4f2] transition-colors ${
                          currency === c.code ? 'font-bold text-black bg-[#fbf9f4]' : 'text-gray-700'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-[14px]">{c.flag}</span>
                          <span className="truncate">{c.name}</span>
                        </span>
                        <div className="flex items-center gap-1.5 shrink-0 pl-2">
                          <span className="text-gray-400 font-mono text-[11px]">{c.symbol}</span>
                          {currency === c.code && (
                            <span className="material-symbols-outlined text-[14px] text-[#735c00]">check</span>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="flex-1 px-3 truncate text-center">
              <span className="font-label-caps-sm text-label-caps-sm uppercase tracking-widest text-[#735c00] font-semibold">
                Worldwide Express Shipping &amp; Duties Included over ₹15,000
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-3 text-[11px] tracking-wider text-[#444748]">
              <button
                onClick={() => setCurrentScreen('discover')}
                className={`hover:text-black transition-colors font-medium ${
                  currentScreen === 'discover' ? 'text-black font-bold underline' : ''
                }`}
              >
                STORE
              </button>

              {isAdmin && (
                <>
                  <span>•</span>
                  <button
                    onClick={() => setCurrentScreen('admin')}
                    className={`hover:text-black transition-colors font-bold flex items-center gap-1.5 text-[#735c00] bg-[#fed65b]/20 px-2 py-0.5 rounded-full ${
                      currentScreen === 'admin' ? 'ring-1 ring-[#735c00]' : ''
                    }`}
                    title="Atelier Admin ERP Console (Yashwanth)"
                  >
                    <span className="material-symbols-outlined text-[14px]">shield_person</span>
                    <span>ADMIN ERP (19 MENUS)</span>
                  </button>
                  <span>•</span>
                  <button
                    onClick={() => setCurrentScreen('logistics')}
                    className={`hover:text-black transition-colors font-medium ${
                      currentScreen === 'logistics' ? 'text-black font-bold underline' : ''
                    }`}
                  >
                    LOGISTICS
                  </button>
                </>
              )}

              <span>•</span>
              <button
                onClick={() => {
                  if (!currentUser) {
                    setAuthModalMode('login');
                    setIsAuthModalOpen(true);
                  } else {
                    setCurrentScreen('account');
                  }
                }}
                className={`hover:text-black transition-colors font-medium ${
                  currentScreen === 'account' ? 'text-black font-bold underline' : ''
                }`}
              >
                {currentUser
                  ? `MY ACCOUNT (${currentUser.fullName.split(' ')[0].toUpperCase()})`
                  : 'SIGN IN / REGISTER'}
              </button>
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
              <div className="relative pl-2">
                <button
                  aria-label="Account Profile"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-1.5 p-1 rounded-full hover:bg-black/5 active:scale-95 transition-all"
                  title="Account & Authentication"
                >
                  <div className="relative">
                    <img
                      alt="Profile"
                      className={`w-8 h-8 rounded-full object-cover ring-2 ${
                        isAdmin ? 'ring-[#fed65b]' : 'ring-black/10'
                      }`}
                      src={currentUser?.avatar || AVATAR_PROFILE_URL}
                    />
                    {isAdmin && (
                      <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#fed65b] text-black text-[8px] font-bold flex items-center justify-center shadow-xs border border-white">
                        ★
                      </span>
                    )}
                  </div>
                  <span className="material-symbols-outlined text-[16px] text-gray-500">
                    expand_more
                  </span>
                </button>

                {/* Account Popover Menu */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 top-11 w-72 bg-white rounded-2xl shadow-2xl border border-black/10 py-3 px-3 z-50 animate-in fade-in zoom-in-95 text-xs text-[#1a1c1b]">
                    {/* User header */}
                    <div className="p-2.5 rounded-xl bg-[#f9f9f7] border border-black/5 mb-2">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-black truncate max-w-[150px]">
                          {currentUser ? currentUser.fullName : 'Guest Visitor'}
                        </span>
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                          isAdmin ? 'bg-[#fed65b] text-black' : 'bg-gray-200 text-gray-700'
                        }`}>
                          {currentUser ? currentUser.role.replace('_', ' ') : 'Guest'}
                        </span>
                      </div>
                      <span className="block text-[10px] text-gray-500 truncate mt-0.5">
                        {currentUser ? currentUser.email : 'No active session'}
                      </span>
                    </div>

                    {/* Admin Access / Customer Navigation */}
                    <div className="py-1 space-y-1">
                      {isAdmin ? (
                        <>
                          <button
                            onClick={() => {
                              setIsUserMenuOpen(false);
                              setCurrentScreen('admin');
                            }}
                            className="w-full text-left px-2.5 py-2 rounded-xl bg-[#fffdf5] hover:bg-[#fff9e6] border border-[#fed65b]/60 text-[#735c00] font-bold flex items-center gap-2"
                          >
                            <span className="material-symbols-outlined text-[16px]">shield_person</span>
                            <span>Launch Admin ERP (19 Menus)</span>
                          </button>

                          <button
                            onClick={() => {
                              setIsUserMenuOpen(false);
                              setCurrentScreen('logistics');
                            }}
                            className="w-full text-left px-2.5 py-2 rounded-xl hover:bg-gray-100 flex items-center gap-2 font-medium"
                          >
                            <span className="material-symbols-outlined text-[16px] text-gray-500">local_shipping</span>
                            <span>Logistics &amp; AWB Hub</span>
                          </button>

                          <button
                            onClick={() => {
                              setIsUserMenuOpen(false);
                              setCurrentScreen('account');
                            }}
                            className="w-full text-left px-2.5 py-2 rounded-xl hover:bg-gray-100 flex items-center gap-2"
                          >
                            <span className="material-symbols-outlined text-[16px] text-gray-500">manage_accounts</span>
                            <span>My Account &amp; Settings</span>
                          </button>

                          <button
                            onClick={() => {
                              quickLoginCustomer();
                              setIsUserMenuOpen(false);
                            }}
                            className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-black flex items-center gap-2 text-[11px]"
                            title="Test how customers experience the store"
                          >
                            <span className="material-symbols-outlined text-[14px]">visibility</span>
                            <span>Preview as Customer</span>
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => {
                              setIsUserMenuOpen(false);
                              setCurrentScreen('account');
                            }}
                            className="w-full text-left px-2.5 py-2 rounded-xl hover:bg-gray-100 flex items-center gap-2 font-medium"
                          >
                            <span className="material-symbols-outlined text-[16px] text-gray-500">package_2</span>
                            <span>My Orders &amp; Tracking</span>
                          </button>

                          <button
                            onClick={() => {
                              setIsUserMenuOpen(false);
                              setCurrentScreen('account');
                            }}
                            className="w-full text-left px-2.5 py-2 rounded-xl hover:bg-gray-100 flex items-center gap-2"
                          >
                            <span className="material-symbols-outlined text-[16px] text-gray-500">location_on</span>
                            <span>Saved Addresses &amp; Measurements</span>
                          </button>

                          <button
                            onClick={() => {
                              setIsUserMenuOpen(false);
                              setCurrentScreen('account');
                            }}
                            className="w-full text-left px-2.5 py-2 rounded-xl hover:bg-gray-100 flex items-center gap-2"
                          >
                            <span className="material-symbols-outlined text-[16px] text-gray-500">support_agent</span>
                            <span>Concierge Support Tickets</span>
                          </button>
                        </>
                      )}
                    </div>

                    {/* Login / Register / Logout triggers */}
                    <div className="pt-2 border-t border-gray-100 flex items-center justify-between px-1">
                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          setAuthModalMode('login');
                          setIsAuthModalOpen(true);
                        }}
                        className="text-[11px] font-semibold text-black hover:underline"
                      >
                        Sign In / Register
                      </button>

                      {currentUser && (
                        <button
                          onClick={() => {
                            setIsUserMenuOpen(false);
                            logout();
                          }}
                          className="text-[11px] font-medium text-red-600 hover:underline"
                        >
                          Sign Out
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
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
