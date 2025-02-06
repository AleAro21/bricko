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
    birthDate: string
    nationality: string
    gender: string
    phoneNumber: string
    countryCode: string
    maritalstatus: string
  }
  
  
  export interface CreateUserData {
    name: string | null;
    fatherLastName: string | null;
    motherLastName: string | null;
    email: string;  
  }