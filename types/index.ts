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
  maritalstatus?: string;
  hasChildren: boolean;
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
  id?: string;
  length?: number;
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
  otherParentId?: string;
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

export interface Payment {
  id?: string;
  userId?: string;
  amount?: number;
  currency?: string;
  methodpayment?: string;
  paymentDate?: string;
  itemspaid?: object;
  paymentMetadata?: object;
  intentionId?: string;
  comments?: string;
  paymentData?: string;
  status?: string;
}

export interface serviceType {
  suscription: string;
  addon: string;
}

export interface paymentIntention {
  id?: string;
  userId?: string;
  paymentAmount?: number;
  currency?: string;
  intentionDate?: string; 
  paymentDate?: string;
  expireDate?: string;
  paymentId?: string;
  serviceType?: serviceType;
  status?: string;
}

export interface countryOptions {
  AF?: string;
  AX?: string;
  AL?: string;
  DZ?: string;
  AS?: string;
  AD?: string;
  AO?: string;
  AI?: string;
  AQ?: string;
  AG?: string;
  AR?: string;
  AM?: string;
  AW?: string;
  AU?: string;
  AT?: string;
  AZ?: string;
  BS?: string;
  BH?: string;
  BD?: string;
  BB?: string;
  BY?: string;
  BE?: string;
  BZ?: string;
  BJ?: string;
  BM?: string;
  BT?: string;
  BO?: string;
  BQ?: string;
  BA?: string;
  BW?: string;
  BR?: string;
  IO?: string;
  VG?: string;
  BN?: string;
  BG?: string;
  BF?: string;
  BI?: string;
  CV?: string;
  KH?: string;
  CM?: string;
  CA?: string;
  KY?: string;
  CF?: string;
  TD?: string;
  CL?: string;
  CN?: string;
  CX?: string;
  CC?: string;
  CO?: string;
  KM?: string;
  CD?: string;
  CG?: string;
  CK?: string;
  CR?: string;
  CI?: string;
  HR?: string;
  CU?: string;
  CW?: string;
  CY?: string;
  CZ?: string;
  DK?: string;
  DJ?: string;
  DM?: string;
  DO?: string;
  EC?: string;
  EG?: string;
  SV?: string;
  GQ?: string;
  ER?: string;
  EE?: string;
  SZ?: string;
  ET?: string;
  FK?: string;
  FO?: string;
  FJ?: string;
  FI?: string;
  FR?: string;
  GF?: string;
  PF?: string;
  TF?: string;
  GA?: string;
  GM?: string;
  GE?: string;
  DE?: string;
  GH?: string;
  GI?: string;
  GR?: string;
  GL?: string;
  GD?: string;
  GP?: string;
  GU?: string;
  GT?: string;
  GG?: string;
  GN?: string;
  GW?: string;
  GY?: string;
  HT?: string;
  VA?: string;
  HN?: string;
  HK?: string;
  HU?: string;
  IS?: string;
  IN?: string;
  ID?: string;
  IR?: string;
  IQ?: string;
  IE?: string;
  IM?: string;
  IL?: string;
  IT?: string;
  JM?: string;
  JP?: string;
  JE?: string;
  JO?: string;
  KZ?: string;
  KE?: string;
  KI?: string;
  KP?: string;
  KR?: string;
  KW?: string;
  KG?: string;
  LA?: string;
  LV?: string;
  LB?: string;
  LS?: string;
  LR?: string;
  LY?: string;
  LI?: string;
  LT?: string;
  LU?: string;
  MO?: string;
  MG?: string;
  MW?: string;
  MY?: string;
  MV?: string;
  ML?: string;
  MT?: string;
  MH?: string;
  MQ?: string;
  MR?: string;
  MU?: string;
  YT?: string;
  MX?: string;
  FM?: string;
  MD?: string;
  MC?: string;
  MN?: string;
  ME?: string;
  MS?: string;
  MA?: string;
  MZ?: string;
  MM?: string;
  NA?: string;
  NR?: string;
  NP?: string;
  NL?: string;
  NC?: string;
  NZ?: string;
  NI?: string;
  NE?: string;
  NG?: string;
  NU?: string;
  NF?: string;
  MK?: string;
  MP?: string;
  NO?: string;
  OM?: string;
  PK?: string;
  PW?: string;
  PS?: string;
  PA?: string;
  PG?: string;
  PY?: string;
  PE?: string;
  PH?: string;
  PN?: string;
  PL?: string;
  PT?: string;
  PR?: string;
  QA?: string;
  RE?: string;
  RO?: string;
  RU?: string;
  RW?: string;
  BL?: string;
  SH?: string;
  KN?: string;
  LC?: string;
  MF?: string;
  PM?: string;
  VC?: string;
  WS?: string;
  SM?: string;
  ST?: string;
  SA?: string;
  SN?: string;
  RS?: string;
  SC?: string;
  SL?: string;
  SG?: string;
  SX?: string;
  SK?: string;
  SI?: string;
  SB?: string;
  SO?: string;
  ZA?: string;
  SS?: string;
  ES?: string;
  LK?: string;
  SD?: string;
  SR?: string;
  SJ?: string;
  SE?: string;
  CH?: string;
  SY?: string;
  TW?: string;
  TJ?: string;
  TZ?: string;
  TH?: string;
  TL?: string;
  TG?: string;
  TK?: string;
  TO?: string;
  TT?: string;
  TN?: string;
  TR?: string;
  TM?: string;
  TC?: string;
  TV?: string;
  UG?: string;
  UA?: string;
  AE?: string;
  GB?: string;
  US?: string;
  UY?: string;
  UZ?: string;
  VU?: string;
  VE?: string;
  VN?: string;
  WF?: string;
  EH?: string;
  YE?: string;
  ZM?: string;
  ZW?: string;
}

export interface PaymentIntention {
  id: string;
  status: string;
  amount: number;
  currency: string;
  createdAt: string;
  updatedAt: string;
}

export interface SubscriptionCatalogResponse {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  subscriptions: Subscription[];
}

export interface Subscription {
  id: string;
  name: string;
  description: string;
  type: "subscription" | "addOn";
  metadata: SubscriptionMetadata;
  country: string;
  createdAt: string;
  updatedAt: string;
  pricelist: PriceList[];
}

export interface SubscriptionMetadata {
  notes?: string;
  coverages?: Coverages;
  addOnsAvailable?: boolean;
}

export interface Coverages {
  storage?: { included: boolean };
  seguroDeVida?: { included: boolean; description: string };
  testamentoDigital?: { included: boolean; description: string };
  seguroGastosFunerarios?: { included: boolean };
}

export interface PriceList {
  id: string;
  priceId: string;
  currency: string;
  price: number;
  serviceId: string;
  serviceType: "subscriptions" | "addOns";
}

export interface UserSubscriptionsResponse {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  subscriptions: UserSubscription[];
}

export interface UserSubscription {
  id: string;
  userId: string;
  productId: string | null;
  suscriptionType: string;
  suscriptionDate: string;
  paymentDate: string;
  expireDate: string;
  currency: string;
  status: "Active" | "Inactive";
  paymentGateway: "credit" | "paypal" | "bank_transfer"; // Expand if needed
  paymentAmount: number;
  paymentId: string;
}

