import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { DiscoverScreen } from './components/DiscoverScreen';
import { ProductDetailScreen } from './components/ProductDetailScreen';
import { OperationsScreen } from './components/OperationsScreen';
import { CheckoutScreen } from './components/CheckoutScreen';
import { CategoriesScreen } from './components/CategoriesScreen';
import { BagScreen } from './components/BagScreen';
import { WishlistScreen } from './components/WishlistScreen';
import { Modals } from './components/Modals';

const MainApp: React.FC = () => {
  const { currentScreen, toastMessage } = useApp();

  return (
    <div className="min-h-screen bg-[#f9f9f7] text-[#1a1c1b] flex flex-col selection:bg-[#fed65b] selection:text-black">
      {/* Universal Luxury Header */}
      <Header />

      {/* Screen Router */}
      <main className="flex-1 w-full">
        {currentScreen === 'discover' && <DiscoverScreen />}
        {currentScreen === 'product_detail' && <ProductDetailScreen />}
        {currentScreen === 'categories' && <CategoriesScreen />}
        {currentScreen === 'wishlist' && <WishlistScreen />}
        {currentScreen === 'bag' && <BagScreen />}
        {currentScreen === 'account' && <OperationsScreen />}
        {currentScreen === 'checkout' && <CheckoutScreen />}
      </main>

      {/* Sticky Bottom Navigation (Discover, Categories, Wishlist, Bag, Account) */}
      <BottomNav />

      {/* Modals Suite (Size Drawer, 360 Orbit, Video Concierge, Invoice, DHL Label, Artisan Assignment) */}
      <Modals />

      {/* Toast Notification Pill */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-black/90 text-white backdrop-blur-md px-4 py-2.5 rounded-full font-body-sm text-body-sm shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <span className="w-2 h-2 rounded-full bg-[#fed65b] animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
