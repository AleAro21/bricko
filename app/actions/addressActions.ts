"use server";

import { apiService } from "@/app/apiService";
import { cookies } from "next/headers";

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

/**
 * Retrieves the user's address from the API.
 * Returns the first address if an array is returned.
 */
export async function getAddressFromServer(userId: string): Promise<Address | null> {
  try {
    const token = cookies().get("token")?.value;
    if (!token) throw new Error("No authentication token available");
    apiService.setToken(token);
    const response = await apiService.getUserAddress(userId);
    if (!response) return null;
    return Array.isArray(response) ? response[0] : response;
  } catch (error) {
    console.error("Error fetching address:", error);
    return null;
  }
}

/**
 * Updates (or creates) the user's address.
 * If currentCity is provided, it updates the existing address;
 * otherwise, it creates a new address.
 */
export async function updateUserAddressAction(
  userId: string,
  addressData: Address,
  currentCity?: string
): Promise<Address> {
  const token = cookies().get("token")?.value;
  if (!token) {
    throw new Error("No authentication token available");
  }
  apiService.setToken(token);
  
  let response;
  if (currentCity) {
    // Update existing address. (Assuming your API uses the city as an identifier.)
    response = await apiService.updateUserAddress(currentCity, addressData);
  } else {
    // Create new address.
    response = await apiService.createUserAddress(userId, addressData);
  }
  
  return Array.isArray(response) ? response[0] : response;
}
