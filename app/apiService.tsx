import {
  User,
  CreateUserData,
  Address,
  Contact,
  Pet,
  UserAsset,
  // New Will & Assignment types:
  CreateWillRequest,
  UpdateWillRequest,
  Will,
  CreateAssignmentRequest,
  UpdateAssignmentRequest,
  ResponseAssignation,
  Assignation,
  AssetCategory,
  GetAssetsCategoriesResponse,
  UserProgress
} from '@/types';

import { cookies } from 'next/headers';
import { fetchAuthSession } from "aws-amplify/auth";

const API_BASE_URL = "https://51lyy4n8z0.execute-api.us-east-2.amazonaws.com/dev";

export interface Executor {
  id: string;
  testamentHeaderId: string;
  type: string;
  contactId: string;
  createdAt: string;
  updatedAt: string;
}

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

  // For APIService class
async refreshToken() {
  try {
    // Updated imports for Amplify v6
    
    const session = await fetchAuthSession();
    
    // Get the access token from the session
    const newToken = session.tokens?.accessToken?.toString();
    
    if (!newToken) {
      throw new Error('Failed to get new access token');
    }
    
    // Update the token in your service
    this.setToken(newToken);
    
    // Also update the token cookie
    document.cookie = `token=${newToken}; path=/; max-age=${60 * 60}; SameSite=Strict`;
    
    return newToken;
  } catch (error) {
    console.error('Failed to refresh token:', error);
    throw error;
  }
}

  private async fetchWithAuth(endpoint: string, options: RequestInit = {}, tokenOverride?: string) {
    const token = tokenOverride || this.token;
    if (!token) {
      throw new Error('No authentication token available');
    }
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...options.headers,
    };

    console.log('Request Payload:', {
      endpoint,
      options: {
        ...options,
        headers,
      },
    });

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      let errorDetails = '';
      try {
        errorDetails = await response.text();
      } catch (err) {
        errorDetails = 'No additional details';
      }
      const error = new Error(`API call failed: ${response.status} ${response.statusText} - ${errorDetails}`);
      (error as any).status = response.status;
      throw error;
    }
    return response.json();
  }
  

  // ============================
  // Existing User/Address/Contact/Pet/Asset methods
  // ============================

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

  async getUserProgress(userId: string): Promise<UserProgress> {
    const response = await this.fetchWithAuth(`/wills/users/${userId}/completness`);
    console.log('API Response:', response);
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
    
    // Handle both possibilities - it could be an array or a single object
    if (Array.isArray(response.response)) {
      return response.response[0]; // Return the first item if it's an array
    } else {
      return response.response; // Return directly if it's an object
    }
  }

  async getUserAddress(userId: string): Promise<Address[]> {
    const response = await this.fetchWithAuth(`/wills/user/${userId}/address`);
    console.log('API Response:', response);
    return response.response; // This is an array of addresses
  }

  async updateUserAddress(addressId: string, addressData: Partial<Address>): Promise<Address> {
    const response = await this.fetchWithAuth(`/wills/address/${addressId}`, {
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
    // Return the contacts array directly
    return response.response.contacts;
  }

  async getContact(contactId: string): Promise<Contact> {
    const response = await this.fetchWithAuth(`/wills/contacts/${contactId}`);
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

  async deleteContact(userId: string, contactId: string): Promise<void> {
    await this.fetchWithAuth(`/wills/contacts/${contactId}`, {
      method: 'DELETE',
    });
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

  async createUserAsset(userId: string, assetData: Omit<UserAsset, 'id'>): Promise<UserAsset> {
    const response = await this.fetchWithAuth(`/wills/user/${userId}/asset`, {
      method: 'POST',
      body: JSON.stringify(assetData),
    });
    console.log('API Response:', response);
    return response.response;
  }

  async getUserAssets(userId: string): Promise<UserAsset[]> {
    const response = await this.fetchWithAuth(`/wills/user/${userId}/assets`);
    console.log('API Response:', response);
    return response.response;
  }

  async getUserAsset(userId: string, assetId: string): Promise<UserAsset> {
    const response = await this.fetchWithAuth(`/wills/asset/${assetId}`);
    console.log('API Response:', response);
    return response.response;
  }

  async updateUserAsset(userId: string, assetId: string, assetData: Partial<UserAsset>): Promise<UserAsset> {
    const response = await this.fetchWithAuth(`/wills/asset/${assetId}`, {
      method: 'PUT',
      body: JSON.stringify(assetData),
    });
    console.log('API Response:', response);
    return response.response;
  }

  async deleteUserAsset(userId: string, assetId: string): Promise<void> {
    await this.fetchWithAuth(`/wills/asset/${assetId}`, {
      method: 'DELETE',
    });
  }

  // ============================
  // New Will Endpoints
  // ============================

  /**
   * Create a new will for a user.
   * POST wills/users/{{userId}}/testaments
   */
  async createWill(userId: string, willData: CreateWillRequest): Promise<Will> {
    const response = await this.fetchWithAuth(`/wills/users/${userId}/testaments`, {
      method: 'POST',
      body: JSON.stringify(willData),
    });
    console.log('Create Will Response:', response);
    return response.response;
  }

  async getAllWills(userId: string): Promise<Will[]> {
    try {
      const response = await this.fetchWithAuth(`/wills/users/${userId}/testaments`);
      console.log('Get All Wills Response:', response);
      if (response.response && Array.isArray(response.response.testaments)) {
        return response.response.testaments;
      }
      return Array.isArray(response.response) ? response.response : [];
    } catch (error: any) {
      if (error.status === 404 || error.message.includes("Not Found")) {
        return [];
      }
      throw error;
    }
  }

  /**
   * Update an existing will.
   * PUT wills/testaments/{{testamentId}}
   */
  async updateWill(testamentId: string, willData: UpdateWillRequest): Promise<Will | null> {
    const response = await this.fetchWithAuth(`/wills/testaments/${testamentId}`, {
      method: 'PUT',
      body: JSON.stringify(willData),
    });
    console.log('Update Will Response:', response);
    return response.response;
  }

  /**
   * Get a specific will.
   * GET wills/testaments/{{testamentId}}
   */
  async getWill(testamentId: string): Promise<Will> {
    const response = await this.fetchWithAuth(`/wills/testaments/${testamentId}`);
    console.log('Get Will Response:', response);
    return response.response;
  }

  // ============================
  // Assignment Endpoints
  // ============================

  /**
   * Create an assignment for a will.
   * POST wills/testaments/{{testamentId}}/assignments
   */
  async createAssignment(testamentId: string, assignmentData: CreateAssignmentRequest): Promise<ResponseAssignation[]> {
    const response = await this.fetchWithAuth(`/wills/testaments/${testamentId}/assignments`, {
      method: 'POST',
      body: JSON.stringify(assignmentData),
    });
    console.log('Create Assignment Response:', response);
    return response.response;
  }

  /**
   * Update an assignment.
   * PUT wills/testaments/{{assignmentId}}/assignments
   */
  async updateAssignment(assignmentId: string, assignmentData: UpdateAssignmentRequest): Promise<Assignation> {
    const response = await this.fetchWithAuth(`/wills/testaments/${assignmentId}/assignments`, {
      method: 'PUT',
      body: JSON.stringify(assignmentData),
    });
    console.log('Update Assignment Response:', response);
    return response.response;
  }

  // ============================
  // Assets Categories Endpoints
  // ============================

  /**
   * Get Assets Categories
   * GET wills/assets/categories
   */
  async getAssetsCategories(): Promise<GetAssetsCategoriesResponse> {
    const response = await this.fetchWithAuth('/wills/assets/categories');
    console.log('Get Assets Categories Response:', response);
    return response.response;
  }

  /**
   * Get Category by Id
   * GET wills/category/{{categoryId}}/assets
   */
  async getCategoryById(categoryId: string): Promise<AssetCategory> {
    const response = await this.fetchWithAuth(`/wills/category/${categoryId}/assets`);
    console.log('Get Category By Id Response:', response);
    return response.response;
  }

  // ============================
  // Executor Endpoints
  // ============================

  /**
   * Create a new executor.
   * POST wills/executors
   * Body Example:
   * {
   *   "testamentHeaderId": "d2155a93-964b-47b1-b758-16c87e59f30b",
   *   "contactId": "b3f50f99-ed2e-46c2-a872-d18efdeb630d",
   *   "type": "Contact"
   * }
   */
  async createExecutor(testamentHeaderId: string, contactId: string, type: string): Promise<Executor> {
    const body = { testamentHeaderId, contactId, type };
    const response = await this.fetchWithAuth('/wills/executors', {
      method: 'POST',
      body: JSON.stringify(body)
    });
    console.log('Create Executor Response:', response);
    return response.response;
  }

  /**
   * Retrieve an executor by its ID.
   * GET wills/executors/{{execId}}
   */

  async getExecutorById(execId: string): Promise<Executor> {
    const response = await this.fetchWithAuth(`/wills/executors/${execId}`);
    console.log('Get Executor By Id Response:', response);
    return response
  }

  async getAllExecutors(userId: string): Promise<Executor[]> {
    const response = await this.fetchWithAuth(`/wills/${userId}/executors`);
    console.log('Get All Executors Response:', response);
    const executors = response.response.executors || response.response; // adjust based on your API response structure
    return Array.isArray(executors) ? executors : [executors];
  }


  /**
   * Update an existing executor.
   * PUT wills/executors/{{execId}}
   */
  async updateExecutor(execId: string, data: { testamentHeaderId: string; contactId: string; type: string }): Promise<Executor> {
    const response = await this.fetchWithAuth(`/wills/executors/${execId}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
    console.log('Update Executor Response:', response);
    return response.response;
  }

  /**
   * Delete an executor.
   * DELETE wills/executors/{{execId}}
   */
  async deleteExecutor(execId: string): Promise<void> {
    await this.fetchWithAuth(`/wills/executors/${execId}`, {
      method: 'DELETE'
    });
    console.log('Executor deleted successfully');
  }
}

export const apiService = APIService.getInstance();
