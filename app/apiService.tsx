import { User, CreateUserData, Address, Contact, Pet } from '@/types';
import options from './api/auth/[...nextauth]/options';

const API_BASE_URL = "https://51lyy4n8z0.execute-api.us-east-2.amazonaws.com/dev";

export class APIService {
  private static instance: APIService;
  private token: string | null = null;

  private constructor() { }

  static getInstance(): APIService {
    if (!APIService.instance) {
      APIService.instance = new APIService();
    }
    return APIService.instance;
  }

  setToken(token: string) {
    this.token = token;
  }

  private async fetchWithAuth(endpoint: string, options: RequestInit = {}) {
    if (!this.token) {
      throw new Error('No authentication token available');
    }

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`,
      ...options.headers,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`API call failed: ${response.statusText}`);
    }

    return response.json();
  }

  async createUser(userData: CreateUserData): Promise<User> {
    const response = await this.fetchWithAuth('/wills/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    console.log('API Response:', response);
    return response.response;
  }

  async getUser(userId: string): Promise<User> {
    const response = await this.fetchWithAuth(`/wills/users/${userId}`);
    console.log('API Response:', response); 
    console.log("headers", response.headers);
    return response.response;
  }

  async updateUser(userId: string, userData: Partial<User>): Promise<User> {
    const response = await this.fetchWithAuth(`/wills/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
    console.log('API Response:', response);
    return response.response;
  }

  async createUserAddress(userId: string, addressData: Address): Promise<Address> {
    const response = await this.fetchWithAuth(`/wills/user/${userId}/address`, {
      method: 'POST',
      body: JSON.stringify(addressData),
    });
    console.log('API Response:', response);
    return response.response;
  }

  async getUserAddress(userId: string): Promise<Address> {
    const response = await this.fetchWithAuth(`/wills/user/${userId}/address`);
    console.log('API Response:', response);
    return response.response;
  }

  async updateUserAddress(userId: string, addressData: Partial<Address>): Promise<Address> {
    const response = await this.fetchWithAuth(`/wills/user/${userId}/address`, {
      method: 'PUT',
      body: JSON.stringify(addressData),
    });
    console.log('API Response:', response);
    return response.response;
  }

  async createContact(userId: string, contactData: Contact): Promise<Contact> {
    const response = await this.fetchWithAuth(`/wills/users/${userId}/contacts`, {
      method: 'POST',
      body: JSON.stringify(contactData),
    });
    console.log('API Response:', response);
    return response.response;
  }

  async getContacts(userId: string): Promise<Contact[]> {
    const response = await this.fetchWithAuth(`/wills/users/${userId}/contacts`);
    console.log('API Response:', response);
    return response.response;
  }

  async updateContact(userId: string, contactId: string, contactData: Partial<Contact>): Promise<Contact> {
    const response = await this.fetchWithAuth(`/wills/users/${userId}/contacts/${contactId}`, {
      method: 'PUT',
      body: JSON.stringify(contactData),
    });
    console.log('API Response:', response);
    return response.response;
  }

  async createPet(userId: string, petData: Omit<Pet, 'id'>): Promise<Pet> {
    const response = await this.fetchWithAuth(`/wills/user/${userId}/pets`, {
      method: 'POST',
      body: JSON.stringify(petData),
    });
    console.log('API Response:', response);
    return response.response;
  }

  async getPets(userId: string): Promise<Pet[]> {
    const response = await this.fetchWithAuth(`/wills/user/${userId}/pets`);
    console.log('API Response:', response);
    return response.response;
  }

  async getPet(userId: string, petId: string): Promise<Pet> {
    const response = await this.fetchWithAuth(`/wills/user/${userId}/pets/${petId}`);
    console.log('API Response:', response);
    return response.response;
  }

  async updatePet(userId: string, petId: string, petData: Partial<Pet>): Promise<Pet> {
    const response = await this.fetchWithAuth(`/wills/user/${userId}/pets/${petId}`, {
      method: 'PUT',
      body: JSON.stringify(petData),
    });
    console.log('API Response:', response);
    return response.response;
  }

  async deletePet(userId: string, petId: string): Promise<void> {
    await this.fetchWithAuth(`/wills/user/${userId}/pets/${petId}`, {
      method: 'DELETE',
    });
  }
}

export const apiService = APIService.getInstance();