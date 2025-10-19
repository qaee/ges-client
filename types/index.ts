export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  companyName?: string;
  phoneNumber?: string;
  role: 'ADMIN' | 'MERCHANT' | 'BUYER' | 'RESELLER';
  tier: 'TIER1_ENTERPRISE' | 'TIER2_RETAILER' | 'TIER3_SMB' | null;
}

export interface AuthResponse {
  token: string;
  userId: number;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  tier: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  companyName?: string;
  phoneNumber?: string;
  role?: string;
  tier?: string;
}

// Product Variant with full attribute support
export interface BulkPricingTier {
  quantity: number;    // Minimum quantity for this tier
  price: number;       // Price per unit at this tier
}

export interface ProductVariant {
  id?: number;
  sku?: string;
  variantName?: string; // e.g., "Red / Medium"
  attributes: Record<string, string>; // {"color": "Red", "size": "M", "material": "Cotton"}
  originalPrice?: number;
  discountedPrice?: number;
  quantity?: number;
  minOrderQuantity?: number;
  maxOrderQuantity?: number;
  bulkPricing?: BulkPricingTier[];
  images?: string[]; // Variant-specific images
  primaryImageIndex?: number;
  status?: 'ACTIVE' | 'INACTIVE' | 'OUT_OF_STOCK';
  createdAt?: Date;
  updatedAt?: Date;
}

// Shipping and logistics information
export interface ShippingInfo {
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
    unit: 'in' | 'cm';
  };
  casePack?: number; // Units per case
  casesPerPallet?: number;
  palletsAvailable?: number;
  fobPort?: string; // FOB shipping port
  leadTime?: number; // Days
}

// Compliance and certification
export interface ProductCompliance {
  rnNumber?: string; // RN (Registered Number)
  upcCode?: string; // Universal Product Code
  gtin?: string; // Global Trade Item Number
  ce?: boolean; // CE marking
  fda?: boolean; // FDA approved
  organic?: boolean;
  certification?: string[]; // Other certifications
}

// Product enums matching server schema
export enum ProductCategory {
  ELECTRONICS = 'ELECTRONICS',
  APPAREL = 'APPAREL',
  FURNITURE = 'FURNITURE',
  GENERAL_MERCHANDISE = 'GENERAL_MERCHANDISE',
  FOOTWEAR = 'FOOTWEAR',
  HOME_GOODS = 'HOME_GOODS',
  ACCESSORIES = 'ACCESSORIES'
}

export enum ProductType {
  CLOSEOUT = 'CLOSEOUT',
  OVERSTOCK = 'OVERSTOCK',
  FACTORY_OVERRUN = 'FACTORY_OVERRUN',
  BRANDED = 'BRANDED',
  PRIVATE_LABEL = 'PRIVATE_LABEL'
}

export enum ProductStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  OUT_OF_STOCK = 'OUT_OF_STOCK',
  PENDING_APPROVAL = 'PENDING_APPROVAL'
}

export enum VariantType {
  SIMPLE = 'SIMPLE',   // No variants (traditional product)
  PARENT = 'PARENT'    // Parent product with variants
}

// Lightweight product overview for list/dashboard display
export interface ProductOverview {
  id: number;
  name: string;
  description?: string;
  brand?: string;
  category: string;
  type: string;

  // Pricing
  originalPrice: number;
  discountedPrice: number;
  basePrice?: number; // For parent products

  // Inventory
  quantity?: number; // For simple products

  // Variant info (without full variant details)
  variantType?: VariantType | string;
  variantCount?: number; // Count of variants instead of full list

  // Images (only what's needed for display)
  images: string[];
  primaryImageIndex?: number;

  // Status
  status: string;
}

// Enhanced Product interface matching server schema
export interface Product {
  id: number;
  name: string;
  description?: string;
  sku?: string;
  brand?: string;
  category: string;
  type: string;

  // Pricing structure
  originalPrice: number;
  discountedPrice: number;

  // Inventory management
  quantity?: number;
  minOrderQuantity?: number;

  // ========== VARIANT SUPPORT ==========
  // Variant type: SIMPLE (no variants), PARENT (has variants)
  variantType?: VariantType | string;

  // Base price for parent products (usually the lowest variant price)
  basePrice?: number;

  // Variant options configuration (for parent products)
  // Example: {"color": ["Red", "Blue"], "size": ["S", "M", "L"]}
  variantOptions?: Record<string, string[]>;

  // All variants for this parent product
  variants?: ProductVariant[];

  // Common attributes (for filtering/searching)
  // Example: {"material": "Cotton", "gender": "Unisex"}
  attributes?: Record<string, string>;

  // ========== END VARIANT SUPPORT ==========

  // Images
  images: string[];
  primaryImageIndex?: number;

  // Merchant and status
  merchant?: User;
  status: string;

  // Timestamps
  createdAt?: Date;
  updatedAt?: Date;

  // Legacy fields (for backward compatibility)
  wholesalePrice?: number;
  retailPrice?: number;
  minimumPrice?: number;
  maxOrderQuantity?: number;
  reservedQuantity?: number;
  material?: string;
  size?: string;
  color?: string;
  model?: string;
  condition?: 'NEW' | 'USED' | 'REFURBISHED' | 'DAMAGED' | 'INTACT';
  costPrice?: number;
  margin?: number;
  currency?: string;
  taxRate?: number;
  shipping?: ShippingInfo;
  compliance?: ProductCompliance;
  featured?: boolean;
  publishedAt?: Date;
  expiresAt?: Date;
  views?: number;
  inquiries?: number;
  lastUpdated?: Date;
  tags?: string[];
  keywords?: string[];
  metaDescription?: string;
  variantCount?: number;
}

export interface Order {
  id: number;
  orderNumber: string;
  buyer: User;
  merchant: User;
  orderItems: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  status: string;
  shippingAddress: ShippingAddress;
  trackingNumber?: string;
}

export interface OrderItem {
  id: number;
  product: Product;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface ShippingAddress {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  phoneNumber: string;
}