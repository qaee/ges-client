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

export interface Product {
  id: number;
  name: string;
  description: string;
  sku: string;
  brand: string;
  category: string;
  type: string;
  originalPrice: number;
  discountedPrice: number;
  quantity: number;
  minOrderQuantity: number;
  images: string[];
  merchant: User;
  status: string;
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