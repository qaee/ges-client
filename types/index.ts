export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  companyName?: string;
  phoneNumber?: string;
  role: 'ADMIN' | 'MERCHANT' | 'BUYER' | 'RESELLER';
  tier: 'TIER1_ENTERPRISE' | 'TIER2_RETAILER' | 'TIER3_SMB';
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

// Size and color variant information
export interface ProductVariant {
  id?: number;
  size?: string;
  color?: string;
  quantity: number;
  sku?: string;
  additionalCost?: number; // Extra cost for this variant
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

// Enhanced Product interface
export interface Product {
  id: number;
  name: string;
  description: string;
  sku: string;
  brand: string;
  category: string;
  type: string;
  
  // Pricing structure
  originalPrice: number;
  discountedPrice: number;
  wholesalePrice?: number; // Separate wholesale pricing
  retailPrice?: number; // MSRP
  minimumPrice?: number; // Floor price
  
  // Inventory management
  quantity: number;
  minOrderQuantity: number;
  maxOrderQuantity?: number;
  variants?: ProductVariant[]; // Size/color variants
  reservedQuantity?: number; // Quantity on hold
  
  // Product specifications
  material?: string; // e.g., "100% Cotton"
  size?: string; // Main size or size range
  color?: string; // Main color
  model?: string; // Model number/style
  condition: 'NEW' | 'USED' | 'REFURBISHED' | 'DAMAGED' | 'INTACT';
  
  // Business information
  costPrice?: number; // Merchant's cost
  margin?: number; // Profit margin percentage
  currency: string; // USD, CAD, etc.
  taxRate?: number; // Tax rate percentage
  
  // Shipping & logistics
  shipping?: ShippingInfo;
  
  // Compliance & certification
  compliance?: ProductCompliance;
  
  // Additional merchant data
  images: string[];
  primaryImageIndex?: number;
  merchant: User;
  status: string;
  
  // Marketplace features
  featured?: boolean;
  publishedAt?: Date;
  expiresAt?: Date;
  views?: number;
  inquiries?: number;
  lastUpdated?: Date;
  
  // SEO and marketing
  tags?: string[];
  keywords?: string[];
  metaDescription?: string;
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