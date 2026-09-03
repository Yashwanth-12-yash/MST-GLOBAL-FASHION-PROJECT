export type CurrencyCode = 'INR' | 'USD' | 'EUR' | 'GBP' | 'AED';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  name: string;
  rateToINR: number; // 1 Currency = X INR (or INR converted to this)
  inrToCurrencyRate: number; // multiplier for INR to target currency
  flag: string;
}

export type ScreenType =
  | 'discover'
  | 'categories'
  | 'wishlist'
  | 'bag'
  | 'account'
  | 'product_detail'
  | 'checkout';

export interface ProductColor {
  name: string;
  hex: string;
  borderHex?: string;
}

export interface ProductSizeOption {
  label: string;
  sublabel: string;
  priceDeltaINR?: number;
}

export interface Product {
  id: string;
  title: string;
  subtitle: string;
  atelier: string;
  sku: string;
  priceINR: number;
  mrpINR: number;
  rating: number;
  reviewCount: number;
  primaryImage: string;
  galleryImages?: string[];
  category: string;
  tags?: string[];
  editionBadge?: string;
  stockLimit?: number;
  isRareWeave?: boolean;
  colors: ProductColor[];
  sizes: ProductSizeOption[];
  description: string;
  fabricBase: string;
  zariComposition: string;
  weavingTechnique: string;
  sareeLength: string;
  careInstructions: string[];
  shippingNotes: string[];
  crossSells?: {
    id: string;
    title: string;
    priceINR: number;
    image: string;
  }[];
}

export interface CartItem {
  id: string;
  product: Product;
  selectedColor: ProductColor;
  selectedSize: ProductSizeOption;
  quantity: number;
  priceINR: number;
}

export interface OrderItem {
  id: string;
  orderNumber: string;
  customerName: string;
  customerAvatar: string;
  customerCountry: string;
  customerFlag: string;
  customerCity: string;
  itemCount: number;
  summaryText: string;
  status: 'Packed & Labeled' | 'Tailoring Prep' | 'Verified' | 'DHL Ready' | 'Delivered';
  settledTotalFormatted: string;
  paymentMethod: string;
  trackingNumber?: string;
  isBespokeVerified?: boolean;
  assignedArtisan?: string;
}

export interface WarehouseHub {
  id: string;
  name: string;
  inStock: number;
  held: number;
  status: 'Optimal' | 'Alert' | 'Reserve';
}

export interface AuditLogEntry {
  id: string;
  user: string;
  timeUTC: string;
  action: string;
  highlight?: string;
}
