import React from 'react';
import { useApp } from '../context/AppContext';
import { ScreenType } from '../types';

export const BottomNav: React.FC = () => {
  const { currentScreen, setCurrentScreen, cartCount, wishlistCount } = useApp();

  // If in full checkout screen or product detail view, hide bottom nav so user has an unobstructed purchase bar
  if (currentScreen === 'checkout' || currentScreen === 'product_detail') {
    return null;
  }

  const navItems: {
    screen: ScreenType;
    label: string;
    icon: string;
    badge?: number;
    badgeColor?: string;
  }[] = [
    {
      screen: 'discover',
      label: 'Discover',
      icon: 'home'
    },
    {
      screen: 'categories',
      label: 'Categories',
      icon: 'grid_view'
    },
    {
      screen: 'wishlist',
      label: 'Wishlist',
      icon: 'favorite',
      badge: wishlistCount,
      badgeColor: 'bg-black text-white'
    },
    {
      screen: 'bag',
      label: 'Bag',
      icon: 'shopping_bag',
      badge: cartCount,
      badgeColor: 'bg-[#735c00] text-white'
    },
    {
      screen: 'account',
      label: 'Account',
      icon: 'person'
    }
  ];

  return (
    <nav className="fixed bottom-0 w-full z-50 pb-safe bg-[#f9f9f7]/95 backdrop-blur-xl border-t border-black/[0.05] shadow-[0_-2px_12px_rgba(0,0,0,0.04)]">
      <div className="max-w-md mx-auto flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const isActive =
            currentScreen === item.screen ||
            (item.screen === 'discover' && currentScreen === 'product_detail');

          return (
            <button
              key={item.screen}
              onClick={() => setCurrentScreen(item.screen)}
              className={`relative flex flex-col items-center justify-center min-w-[56px] h-14 gap-0.5 transition-colors active:scale-95 ${
                isActive ? 'text-black font-semibold' : 'text-[#444748] hover:text-black'
              }`}
            >
              <div className="relative flex items-center justify-center">
                <span
                  className="material-symbols-outlined text-[22px]"
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
                >
                  {item.icon}
                </span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span
                    className={`absolute -top-1 -right-2 min-w-[16px] h-4 px-1 rounded-full ${item.badgeColor} font-label-caps-sm text-label-caps-sm flex items-center justify-center leading-tight shadow-xs`}
                  >
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="font-label-caps-sm text-label-caps-sm uppercase tracking-wider">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
