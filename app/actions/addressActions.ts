"use server";
import { apiService } from "@/app/apiService";
import { cookies } from "next/headers";
import { Address } from '@/types'; 



export async function getAddressFromServer(userId: string): Promise<Address | null> {
  try {
    const addresses = await apiService.getUserAddress(userId);
    // Return the first address in the array, or null if no addresses
    return addresses && addresses.length > 0 ? addresses[0] : null;
  } catch (error) {
    console.error("Error fetching address:", error);
    return null;
  }
}

/**
 * Updates (or creates) the user's address.
 * If a currentCity is provided, it assumes an update.
 * Otherwise, it creates a new address.
 */
export async function updateUserAddressAction(
  userId: string,
  addressData: Address,
  currentCity?: string // This should NOT be used as the address ID
): Promise<Address> {
  try {
    // First, check if the user already has an address
    let existingAddresses: Address[] = [];
    try {
      existingAddresses = await apiService.getUserAddress(userId);
      console.log("Existing addresses found:", existingAddresses);
    } catch (error) {
      console.log("No existing address found, will create new one");
    }

    // If the user already has an address, update it (we'll use the first one)
    if (existingAddresses.length > 0 && existingAddresses[0].id) {
      const addressId = existingAddresses[0].id;
      console.log("Updating existing address with ID:", addressId);
      return await apiService.updateUserAddress(addressId, addressData);
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
