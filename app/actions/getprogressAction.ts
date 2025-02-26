// app/actions/getProgressAction.ts
"use server";

import { fetchAuthSession } from "aws-amplify/auth";
import { cookies } from "next/headers";
import { apiService } from "@/app/apiService";

export async function getProgressAction(userId: string): Promise<{ success: boolean; progressData?: any; error?: string }> {
  try {
    let tokenStr = "";
    // Try to get the token from the HTTP‑only cookie
    const tokenCookie = cookies().get("token");
    if (tokenCookie && tokenCookie.value) {
      tokenStr = tokenCookie.value;
    } else {
      // Fallback: retrieve token from the auth session
      const session = await fetchAuthSession();
      if (!session.tokens?.accessToken) {
        throw new Error("No authentication token available");
      }
      tokenStr = session.tokens.accessToken.toString();
    }
    // Set the token in your API service
    apiService.setToken(tokenStr);
    // Fetch the progress data using the provided userId
    const progressData = await apiService.getUserProgress(userId);
    return { success: true, progressData };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to fetch progress" };
  }
}
