export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    middleName: string;
    acceptTerms: boolean;
    acceptOffers: boolean;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface CreateUserData {
    firstName: string | null;
    lastName: string | null;
    middleName: string | null;
    email: string;
    acceptTerms: boolean;
    acceptOffers: boolean;
  }