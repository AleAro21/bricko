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
    countryPhoneCode: string
    maritalstatus: string
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