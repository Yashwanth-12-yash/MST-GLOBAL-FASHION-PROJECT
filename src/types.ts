export type CurrencyCode =
  | 'INR'
  | 'USD'
  | 'GBP'
  | 'EUR'
  | 'AED'
  | 'SGD'
  | 'MYR'
  | 'SAR'
  | 'AUD'
  | 'CAD';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  name: string;
  rateAgainstINR: number;
  autoRate?: number;
  adminOverride?: boolean;
  flag: string;
}

export type ScreenType =
  | 'discover'
  | 'categories'
  | 'wishlist'
  | 'bag'
  | 'account'
  | 'product_detail'
  | 'checkout'
  | 'admin'
  | 'logistics';

export type AdminMenuTab =
  | 'dashboard'
  | 'catalogue_products'
  | 'catalogue_categories'
  | 'catalogue_attributes'
  | 'catalogue_bulk'
  | 'inventory'
  | 'orders'
  | 'customers'
  | 'payments'
  | 'shipping'
  | 'tax'
  | 'currency'
  | 'coupons'
  | 'reviews'
  | 'marketing'
  | 'cms'
  | 'reports'
  | 'notifications'
  | 'support'
  | 'roles'
  | 'settings'
  | 'audit_logs';

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
  productCode?: string;
  priceINR: number;
  mrpINR: number;
  rating: number;
  reviewCount: number;
  primaryImage: string;
  galleryImages?: string[];
  videoUrl?: string;
  category: string;
  categoryId?: string;
  collection?: string;
  collectionId?: string;
  subcategory?: string;
  brand?: string;
  tags?: string[];
  editionBadge?: string;
  stockLimit?: number;
  isRareWeave?: boolean;
  colors: ProductColor[];
  sizes: ProductSizeOption[];
  description: string;
  shortDescription?: string;
  fabricBase: string;
  zariComposition: string;
  weavingTechnique: string;
  sareeLength?: string;
  weightKg?: number;
  careInstructions: string[];
  shippingNotes: string[];
  seoTitle?: string;
  seoDescription?: string;
  urlSlug?: string;
  crossSells?: {
    id: string;
    title: string;
    priceINR: number;
    image: string;
  }[];
}

export interface CategoryItem {
  id: string;
  name: string;
  stylesCount: string;
  image: string;
  description?: string;
  matchingCollectionName?: string;
}

export interface CollectionItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  categoryName: string;
  categoryId: string;
  image: string;
  stylesCount: string;
  themeColor?: string;
}

export interface CartItem {
  id: string;
  product: Product;
  selectedColor: ProductColor;
  selectedSize: ProductSizeOption;
  quantity: number;
  priceINR: number;
}

export interface CustomerAddress {
  id: string;
  label: 'Home' | 'Office' | 'Other';
  fullName: string;
  mobile: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  isDefaultShipping?: boolean;
  isDefaultBilling?: boolean;
}

export interface OrderItem {
  id: string;
  orderNumber: string;
  invoiceId?: string;
  paymentId?: string;
  shipmentId?: string;
  customerName: string;
  customerEmail?: string;
  customerMobile?: string;
  customerAvatar: string;
  customerCountry: string;
  customerFlag: string;
  customerCity: string;
  itemCount: number;
  summaryText: string;
  status:
    | 'ORDER PLACED'
    | 'PAYMENT CONFIRMED'
    | 'ORDER CONFIRMED'
    | 'PROCESSING'
    | 'PACKED'
    | 'SHIPPED'
    | 'OUT FOR DELIVERY'
    | 'DELIVERED'
    | 'CANCELLED'
    | 'RETURN REQUESTED'
    | 'RETURN APPROVED'
    | 'RETURN PICKED UP'
    | 'REFUND INITIATED'
    | 'REFUNDED'
    | 'FAILED DELIVERY';
  paymentStatus?: 'INITIATED' | 'PROCESSING' | 'SUCCESS' | 'FAILED' | 'CANCELLED' | 'REFUNDED';
  settledTotalFormatted: string;
  grandTotalINR?: number;
  grandTotalForeign?: number;
  currency?: CurrencyCode;
  exchangeRateUsed?: number;
  paymentMethod: string;
  courierName?: string;
  trackingNumber?: string;
  estimatedDeliveryDate?: string;
  orderDate?: string;
  shippingAddress?: CustomerAddress | any;
  billingAddress?: CustomerAddress | any;
  items?: Array<{
    productId: string;
    sku: string;
    name: string;
    size: string;
    color: string;
    quantity: number;
    unitPriceINR: number;
    totalPriceINR: number;
    unitPriceForeign?: number;
    totalPriceForeign?: number;
    image: string;
  }>;
  subtotalINR?: number;
  subtotalForeign?: number;
  couponCode?: string;
  couponDiscountINR?: number;
  couponDiscountForeign?: number;
  shippingFeeINR?: number;
  shippingFeeForeign?: number;
  taxAmountINR?: number;
  taxAmountForeign?: number;
  isBespokeVerified?: boolean;
  assignedArtisan?: string;
}

export interface WarehouseHub {
  id: string;
  name: string;
  code?: string;
  city?: string;
  country?: string;
  inStock: number;
  held: number;
  status: 'Optimal' | 'Alert' | 'Reserve';
}

export interface AuditLogEntry {
  id: string;
  user: string;
  timeUTC: string;
  action: string;
  entity?: string;
  oldValue?: string;
  newValue?: string;
  highlight?: string;
}

export interface CouponData {
  id: string;
  code: string;
  discountType: 'Percentage' | 'Fixed';
  discountValue: number;
  minOrderValueINR: number;
  maxDiscountINR: number;
  startDate: string;
  expiryDate: string;
  usageLimit: number;
  usedCount: number;
  isActive: boolean;
}

export interface ReviewItem {
  id: string;
  productId: string;
  customerId: string;
  customerName: string;
  rating: number;
  title: string;
  comment: string;
  isVerifiedPurchase: boolean;
  status: 'Approved' | 'Pending' | 'Rejected';
  createdAt: string;
}

export interface SupportTicketItem {
  id: string;
  ticketNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  orderNumber?: string;
  issueCategory: string;
  status: 'OPEN' | 'IN PROGRESS' | 'WAITING FOR CUSTOMER' | 'RESOLVED' | 'CLOSED';
  messages: Array<{
    id: string;
    sender: 'Customer' | 'Support Agent' | 'System';
    senderName: string;
    message: string;
    timestamp: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

export interface ReturnRequestItem {
  id: string;
  orderId: string;
  productId: string;
  sku: string;
  productName: string;
  quantity: number;
  reason: string;
  description: string;
  status: string;
  refundAmountINR: number;
  refundAmountForeign: number;
  currency: string;
  createdAt: string;
}

export type UserRole =
  | 'super_admin'
  | 'admin'
  | 'catalogue_manager'
  | 'order_manager'
  | 'finance_manager'
  | 'marketing_manager'
  | 'support_agent'
  | 'customer';

export interface UserAccount {
  id: string;
  email: string;
  fullName: string;
  mobile?: string;
  country?: string;
  role: UserRole;
  avatar?: string;
  createdAt?: string;
}

export interface LocationServiceability {
  isServiceable: boolean;
  courierName: string;
  serviceType: string;
  estimatedDeliveryDays: number;
  deliveryEtaDate: string;
  hubCode: string;
  zone: string;
  detectedCity?: string;
  detectedState?: string;
  codAvailable: boolean;
  originHub?: string;
  transitRoute?: string[];
  verificationVerdict: 'VERIFIED' | 'WARNING' | 'UNSERVICEABLE';
  verificationDetails?: string;
  error?: string;
}

export interface Address {
  id: string;
  label: string; // e.g., 'Home', 'Office', 'Overseas Residence'
  name: string;
  mobile: string;
  email?: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
  deliveryInstructions?: string;
  serviceability?: LocationServiceability;
}


