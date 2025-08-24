export enum UserRole {
  BUYER = 'BUYER',
  SELLER = 'SELLER',
  ADMIN = 'ADMIN'
}

export enum UserStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  SUSPENDED = 'SUSPENDED'
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
  businessProfile?: BusinessProfile;
}

export interface BusinessProfile {
  id: string;
  userId: string;
  companyName: string;
  businessNumber: string;
  country: string;
  companyLocation: string;
  contactNumber: string;
  designation: string;
  dateOfBirth?: Date;
  verificationStatus: VerificationStatus;
  verificationDocuments?: VerificationDocument[];
  createdAt: Date;
  updatedAt: Date;
}

export enum VerificationStatus {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  VERIFIED = 'VERIFIED',
  FAILED = 'FAILED',
  ADDITIONAL_INFO_REQUIRED = 'ADDITIONAL_INFO_REQUIRED'
}

export interface VerificationDocument {
  id: string;
  businessProfileId: string;
  documentType: DocumentType;
  fileName: string;
  fileUrl: string;
  uploadedAt: Date;
  verifiedAt?: Date;
  verifiedBy?: string;
  status: DocumentStatus;
  notes?: string;
}

export enum DocumentType {
  BUSINESS_LICENSE = 'BUSINESS_LICENSE',
  TAX_CERTIFICATE = 'TAX_CERTIFICATE',
  INCORPORATION_DOCUMENT = 'INCORPORATION_DOCUMENT',
  BANK_STATEMENT = 'BANK_STATEMENT',
  IDENTITY_PROOF = 'IDENTITY_PROOF',
  ADDRESS_PROOF = 'ADDRESS_PROOF',
  OTHER = 'OTHER'
}

export enum DocumentStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}

export interface RegistrationFormData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  companyName: string;
  businessNumber: string;
  country: string;
  companyLocation: string;
  contactNumber: string;
  designation: string;
  dateOfBirth?: string;
  acceptTerms: boolean;
  acceptPrivacy: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface ApiError {
  message: string;
  code?: string;
  details?: any;
}