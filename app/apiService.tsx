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
    Assignation
  } from '@/types';
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
        const error = new Error(`API call failed: ${response.status} ${response.statusText}`);
        // Attach the status code to the error object
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
        // If the API response has a 'testaments' key, use that.
        if (response.response && Array.isArray(response.response.testaments)) {
          return response.response.testaments;
        }
        // Fallback in case the response is already an array.
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
  }

  export const apiService = APIService.getInstance();
