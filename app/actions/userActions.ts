"use server";

import { apiService } from "@/app/apiService";
import { User } from "@/types";
import { cookies } from "next/headers";


export interface UpdateUserInput {
  id: string;
  name?: string;
  middleName?: string;
  fatherLastName?: string;
  motherLastName?: string;
  governmentId?: string;
  // Allow null in the input, but we'll convert it below
  birthDate?: string | null;
  nationality?: string;
  gender?: 'male' | 'female';
  phoneNumber?: string;
  countryPhoneCode?: string;
}

export async function updateUserAction(
  userData: UpdateUserInput
): Promise<{ success: boolean; user?: User; error?: string }> {
  try {
    // Create a payload that matches Partial<User>
    const payload: Partial<User> = {
      ...userData,
      // Convert a null birthDate to undefined so that it matches the expected type
      birthDate: userData.birthDate === null ? undefined : userData.birthDate,
    };

    const updatedUser = await apiService.updateUser(userData.id, payload);
    return { success: true, user: updatedUser };
  } catch (error: any) {
    console.error("Error in updateUserAction:", error);
    return { success: false, error: error.message || "Error updating user" };
  }
}

export async function getUserAction() {
  try {
    // Retrieve user token from cookies
    const token = cookies().get("token")?.value;
    if (!token) {
      return { success: false, error: "No authentication token found" };
    }

    // Fetch user from API
    apiService.setToken(token);
    const user = await apiService.getUser(token);
    console.log("User fetched from user Action:", user);

    if (!user) {
      return { success: false, error: "User not found" };
    }

    return { success: true, user };
  } catch (error: any) {
    console.error("Error fetching user:", error);
    return { success: false, error: error.message || "Failed to fetch user" };
  }
}
