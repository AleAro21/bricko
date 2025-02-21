// ============================
// Existing Types
// ============================

export interface User {
  id: string;
  email: string;
  name: string;
  fatherLastName: string;
  motherLastName: string;
  middleName: string;
  acceptTerms: boolean;
  acceptOffers: boolean;
  createdAt: string;
  updatedAt: string;
  governmentId: string;
  birthDate: string;
  nationality: string;
  gender: string;
  phoneNumber: string;
  countryPhoneCode: string;
  maritalstatus: string;
}

export interface UserProgress {
  response: any;
  profile: string
  assets: string
  assignments: string
  executors: string
}

export interface CreateUserData {
  name: string | null;
  fatherLastName: string | null;
  motherLastName: string | null;
  email: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Contact {
  id?: string;
  name: string;
  fatherLastName: string;
  motherLastName: string;
  birthDate?: string;
  email: string;
  relationToUser: string;
  countryPhoneCode: string;
  phoneNumber: string;
  country: string;
  trustedContact: boolean;
  notes: string;
  governmentId: string;
  gender: string;
}

export interface Pet {
  id: string;
  name: string;
  species: string;
  dateOfBirth: string;
  notes: string;
}

export interface UserAsset {
  id?: string;
  categoryId: string;
  name: string;
  description: string;
  value: number;
  currency: string;
  metadata: object;
  createdAt?: string;
  updatedAt?: string;
}

export interface Assignment {
  assetid: string;
  percentage: number;
  assignmentType: string;
  assignmentId: string;
  notes: string;
}

// ============================
// New Will & Assignment Types
// ============================

// Will-related interfaces

export interface CreateWillRequest {
  legalAdvisor?: string;
  notes?: string;
  terms?: string;
  [property: string]: any;
}

export interface UpdateWillRequest {
  legalAdvisor?: string;
  notes?: string;
  /**
   * Only "ACTIVE" or "INACTIVE" are allowed for updates.
   */
  status?: WillStatus;
  terms?: string;
  [property: string]: any;
}

export interface Will {
  legalAdvisor?: string;
  notes?: string;
  terms?: string;
  creationDate?: Date;
  /**
   * Unique identifier
   */
  id?: string;
  status?: WillStatus;
  updateDate?: Date;
  userId?: string;
  version?: number;
  [property: string]: any;
}

export enum WillStatus {
  Active = "ACTIVE",
  Deleted = "DELETED",
  Expired = "EXPIRED",
  Inactive = "INACTIVE",
}

// Assignment-related interfaces

export interface CreateAssignmentRequest {
  assetId: string;
  /**
   * ID of the contact or legal entity
   */
  assignmentId: string;
  assignmentType: AssignmentType;
  notes: string;
  percentage: number;
  [property: string]: any;
}

export interface UpdateAssignmentRequest {
  assetId: string;
  /**
   * ID of the contact or legal entity
   */
  assignmentId: string;
  assignmentType: AssignmentType;
  notes: string;
  percentage: number;
  [property: string]: any;
}

export enum AssignmentType {
  C = "c",
  Le = "le",
}

export interface ResponseAssignation {
  failed?: Failed;
  received: number;
  success?: Success;
  [property: string]: any;
}

export interface Failed {
  count?: number;
  detail: FailedDetail[];
  [property: string]: any;
}

export interface FailedDetail {
  assetId: string;
  assignmentId: string;
  assignmentType: AssignmentType;
  assingationId?: string;
  msj: string;
  [property: string]: any;
}

export interface Success {
  count: number;
  detail: SuccessDetail[];
  [property: string]: any;
}

export interface SuccessDetail {
  assetId: string;
  assignmentId?: string;
  assignmentType: AssignmentType;
  assingationId: string;
  [property: string]: any;
}

export interface Assignation {
  assetId: string;
  assignmentId: string;
  assignmentType: AssignmentType;
  notes: string;
  percentage: number;
  createdAt: Date;
  /**
   * Unique identifier for the assignment
   */
  id: string;
  testamentId: string;
  updatedAt: Date;
  [property: string]: any;
}

// ============================
// New Asset Category Types
// ============================

export interface AssetCategory {
  id: string;
  name: string;
  metadata: {
    subcategories: string[];
  };
  description: string;
  // If you don't always receive a 'type', you can mark it optional:
  type?: string;
}

export interface GetAssetsCategoriesResponse {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  categories: AssetCategory[];
}

// Optionally, you can define an AssetOption interface for your UI needs:
export interface AssetOption {
  id: string; // same as categoryId
  key: string;
  label: string;
  description: string;
  subcategories: string[];
  type: string; 
}

export interface Executor {
  id: string;
  testamentHeaderId: string;
  type: string; // e.g. "Contact"
  contactId: string;
  createdAt: string;
  updatedAt: string;
}

