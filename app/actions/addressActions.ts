// app/actions/addressActions.ts
'use server'

import { apiService } from '../apiService';

export interface Address {
  id?: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export async function getAddressFromServer(userId: string): Promise<Address | null> {
  try {
    const address = await apiService.getUserAddress(userId);
    return address;
  } catch (error) {
    console.error("Error fetching address:", error);
    return null;
  }
}

export async function updateUserAddressAction(
  userId: string,
  addressData: Address,
  currentCity?: string
): Promise<Address> {
  try {
    // First, check if the user already has an address
    let existingAddress: Address | null = null;
    try {
      existingAddress = await apiService.getUserAddress(userId);
    } catch (error) {
      console.log("No existing address found, will create new one");
    }

    // If the user already has an address, update it
    if (existingAddress && existingAddress.id) {
      console.log("Updating existing address with ID:", existingAddress.id);
      return await apiService.updateUserAddress(existingAddress.id, addressData);
    } else {
      // Otherwise, create a new address
      console.log("Creating new address for user:", userId);
      return await apiService.createUserAddress(userId, addressData);
    }
  } catch (error) {
    console.error("Error updating address:", error);
    throw error;
  }
}