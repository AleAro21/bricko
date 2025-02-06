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
    governmentId: string;
    birthDate: string
    nationality: string
    gender: string
    phoneNumber: string
    countryCode: string
    maritalstatus: string
  }
  
  
  export interface CreateUserData {
    firstName: string | null;
    lastName: string | null;
    middleName: string | null;
    email: string;  
  }