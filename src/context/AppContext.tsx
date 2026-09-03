import React, { createContext, useContext, useState } from 'react';
import {
  CurrencyCode,
  Product,
  CartItem,
  OrderItem,
  ProductColor,
  ProductSizeOption,
  ScreenType,
  AuditLogEntry
} from '../types';
import {
  CURRENCIES,
  AURUM_SAREE_PRODUCT,
  INITIAL_ORDERS,
  INITIAL_AUDIT_LOGS
} from '../data/mockData';

interface AppContextType {
  currentScreen: ScreenType;
  setCurrentScreen: (screen: ScreenType) => void;
  selectedProduct: Product;
  setSelectedProduct: (product: Product) => void;
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
  formatPrice: (priceINR: number, forceCurrency?: CurrencyCode) => string;
  cart: CartItem[];
  addToCart: (
    product: Product,
    color?: ProductColor,
    size?: ProductSizeOption,
    quantity?: number
  ) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  cartSubtotalINR: number;
  cartCount: number;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  wishlistCount: number;
  promoCode: string | null;
  applyPromoCode: (code: string) => boolean;
  promoDiscountRatio: number;
  orders: OrderItem[];
  addOrder: (order: OrderItem) => void;
  updateOrderStatus: (orderId: string, status: OrderItem['status']) => void;
  auditLogs: AuditLogEntry[];
  addAuditLog: (entry: Omit<AuditLogEntry, 'id' | 'timeUTC'>) => void;
  // Modals & Drawers
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  isConciergeOpen: boolean;
  setIsConciergeOpen: (open: boolean) => void;
  is360ModalOpen: boolean;
  setIs360ModalOpen: (open: boolean) => void;
  isSizeDrawerOpen: boolean;
  setIsSizeDrawerOpen: (open: boolean) => void;
  activeInvoiceOrder: OrderItem | null;
  setActiveInvoiceOrder: (order: OrderItem | null) => void;
  activeShipLabelOrder: OrderItem | null;
  setActiveShipLabelOrder: (order: OrderItem | null) => void;
  activeArtisanOrder: OrderItem | null;
  setActiveArtisanOrder: (order: OrderItem | null) => void;
  completedOrderModal: { orderNumber: string; totalFormatted: string } | null;
  setCompletedOrderModal: (
    data: { orderNumber: string; totalFormatted: string } | null
  ) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('discover');
  const [selectedProduct, setSelectedProduct] =
    useState<Product>(AURUM_SAREE_PRODUCT);
  const [currency, setCurrency] = useState<CurrencyCode>('INR');
  const [wishlist, setWishlist] = useState<string[]>([
    AURUM_SAREE_PRODUCT.id,
    'mst-anarkali-nocturne-8810',
    'cross-kundan-choker',
    'cross-minaudiere'
  ]);
  const [promoCode, setPromoCode] = useState<string | null>('MSTGLOBAL15');

  // Initial cart matching the Checkout screenshot (Aurum Saree + Kundan Choker)
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: 'cart-init-1',
      product: AURUM_SAREE_PRODUCT,
      selectedColor: AURUM_SAREE_PRODUCT.colors[0],
      selectedSize: AURUM_SAREE_PRODUCT.sizes[0],
      quantity: 1,
      priceINR: 28500
    },
    {
      id: 'cart-init-2',
      product: {
        id: 'cross-kundan-choker',
        title: 'Artisanal Kundan Choker',
        subtitle: 'Polki Temple Kundan Choker',
        atelier: 'MST Royal Jewels Atelier',
        sku: 'MST-JW-0912',
        priceINR: 9180,
        mrpINR: 12000,
        rating: 4.9,
        reviewCount: 38,
        primaryImage:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuDKtK8zSGo5CUOG04IaWN8uuCh59h3IFrvccA5kC_ESm2OXpiADLpfg0cepdR3NY00NDMs2ypjx1DoeL494uHojYQ_tH5QgJ9NlD64f05AByfBTHAFxIkd_TErz-dxYrse01b9cEXc4dze5BrvmTX5VHsHEPaWy3jsN8LjTXnA-z_ILCpKgwH1RoOo6mBkm0TvulZDunxJk1zLFXIJMOOoGqCGZJ_4W238XLsuoY-2TojqRPEZu81EQ',
        galleryImages: [],
        category: 'High Jewelry',
        colors: [{ name: '22K Antique Gold & Emerald', hex: '#D4AF37' }],
        sizes: [{ label: 'Adjustable Dori', sublabel: 'Standard Fit' }],
        description: 'Handcrafted temple choker necklace.',
        fabricBase: '22K Electroplated Hallmarked Silver',
        zariComposition: 'Uncut Polki Diamonds & Natural Emeralds',
        weavingTechnique: 'Jadau Kundan Hand Setting',
        sareeLength: 'Adjustable length with handcrafted silk cord',
        careInstructions: ['Store in velvet box', 'Keep away from moisture'],
        shippingNotes: ['Insured armoclad transport']
      },
      selectedColor: { name: '22K Antique Gold & Emerald', hex: '#D4AF37' },
      selectedSize: { label: 'Adjustable Dori', sublabel: 'Standard Fit' },
      quantity: 1,
      priceINR: 9180
    }
  ]);

  const [orders, setOrders] = useState<OrderItem[]>(INITIAL_ORDERS);
  const [auditLogs, setAuditLogs] =
    useState<AuditLogEntry[]>(INITIAL_AUDIT_LOGS);

  // Modals
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isConciergeOpen, setIsConciergeOpen] = useState(false);
  const [is360ModalOpen, setIs360ModalOpen] = useState(false);
  const [isSizeDrawerOpen, setIsSizeDrawerOpen] = useState(false);
  const [activeInvoiceOrder, setActiveInvoiceOrder] =
    useState<OrderItem | null>(null);
  const [activeShipLabelOrder, setActiveShipLabelOrder] =
    useState<OrderItem | null>(null);
  const [activeArtisanOrder, setActiveArtisanOrder] =
    useState<OrderItem | null>(null);
  const [completedOrderModal, setCompletedOrderModal] = useState<{
    orderNumber: string;
    totalFormatted: string;
  } | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2800);
  };

  const formatPrice = (
    priceINR: number,
    forceCurrency?: CurrencyCode
  ): string => {
    const target = CURRENCIES[forceCurrency || currency] || CURRENCIES.INR;
    if (target.code === 'INR') {
      return `${target.symbol}${priceINR.toLocaleString('en-IN')}`;
    }
    const converted = priceINR * target.inrToCurrencyRate;
    return `${target.symbol}${converted.toFixed(target.code === 'AED' ? 0 : 2)}`;
  };

  const addToCart = (
    product: Product,
    color?: ProductColor,
    size?: ProductSizeOption,
    quantity = 1
  ) => {
    const chosenColor = color || product.colors[0];
    const chosenSize = size || product.sizes[0];
    const priceWithDelta = product.priceINR + (chosenSize.priceDeltaINR || 0);

    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor.name === chosenColor.name &&
          item.selectedSize.label === chosenSize.label
      );
      if (existingIdx > -1) {
        const copy = [...prev];
        copy[existingIdx].quantity += quantity;
        return copy;
      }
      return [
        ...prev,
        {
          id: `cart-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          product,
          selectedColor: chosenColor,
          selectedSize: chosenSize,
          quantity,
          priceINR: priceWithDelta
        }
      ];
    });
    showToast(`Added ${product.subtitle || product.title} to your bag`);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    showToast('Item removed from your bag');
  };

  const updateCartQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => setCart([]);

  const cartSubtotalINR = cart.reduce(
    (sum, item) => sum + item.priceINR * item.quantity,
    0
  );

  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        showToast('Removed from Atelier Wishlist');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to Atelier Wishlist');
        return [...prev, productId];
      }
    });
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  const applyPromoCode = (code: string): boolean => {
    const trimmed = code.trim().toUpperCase();
    if (trimmed === 'MSTGLOBAL15' || trimmed === 'GLOBALVIP') {
      setPromoCode(trimmed);
      showToast('VIP Privilege activated: 15% discount applied worldwide!');
      return true;
    }
    showToast('Invalid promotional code. Try MSTGLOBAL15');
    return false;
  };

  const promoDiscountRatio = promoCode ? 0.15 : 0;

  const addOrder = (order: OrderItem) => {
    setOrders((prev) => [order, ...prev]);
    addAuditLog({
      user: 'concierge@mstglobal.com',
      action: `Created synchronous DDP order ${order.orderNumber}`,
      highlight: order.settledTotalFormatted
    });
  };

  const updateOrderStatus = (
    orderId: string,
    status: OrderItem['status']
  ) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
    showToast(`Order status updated to: ${status}`);
  };

  const addAuditLog = (entry: Omit<AuditLogEntry, 'id' | 'timeUTC'>) => {
    const now = new Date();
    const hours = String(now.getUTCHours()).padStart(2, '0');
    const mins = String(now.getUTCMinutes()).padStart(2, '0');
    const newEntry: AuditLogEntry = {
      id: `audit-${Date.now()}`,
      timeUTC: `${hours}:${mins} UTC`,
      ...entry
    };
    setAuditLogs((prev) => [newEntry, ...prev.slice(0, 19)]);
  };

  return (
    <AppContext.Provider
      value={{
        currentScreen,
        setCurrentScreen,
        selectedProduct,
        setSelectedProduct,
        currency,
        setCurrency,
        formatPrice,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartSubtotalINR,
        cartCount,
        wishlist,
        toggleWishlist,
        isWishlisted,
        wishlistCount: wishlist.length,
        promoCode,
        applyPromoCode,
        promoDiscountRatio,
        orders,
        addOrder,
        updateOrderStatus,
        auditLogs,
        addAuditLog,
        // Modals & Drawers
        isMenuOpen,
        setIsMenuOpen,
        isConciergeOpen,
        setIsConciergeOpen,
        is360ModalOpen,
        setIs360ModalOpen,
        isSizeDrawerOpen,
        setIsSizeDrawerOpen,
        activeInvoiceOrder,
        setActiveInvoiceOrder,
        activeShipLabelOrder,
        setActiveShipLabelOrder,
        activeArtisanOrder,
        setActiveArtisanOrder,
        completedOrderModal,
        setCompletedOrderModal,
        toastMessage,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
