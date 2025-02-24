// app/actions/userActions.server.ts
"use server";

import { apiService } from "@/app/apiService";

export interface CreateUserInput {
  name: string;
  fatherLastName: string;
  motherLastName: string;
  email: string;
}

/**
 * createUserAction securely creates a user using the APIService.
 * This action runs on the server, so your secret token and configuration remain hidden.
 */
export async function createUserAction(userData: CreateUserInput): Promise<{
  success: boolean;
  user?: any;
  error?: string;
}> {
  try {
    // You could also add server-side validation here if desired.
    const createdUser = await apiService.createUser(userData);
    return { success: true, user: createdUser };
  } catch (error: any) {
    console.error("Error in createUserAction:", error);
    return { success: false, error: error.message || "Error creating user" };
  }
}
