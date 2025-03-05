// app/actions/loginAction.ts
"use server";

import { signIn, fetchAuthSession, signOut } from "aws-amplify/auth";
import { apiService } from "@/app/apiService";
import { cookies } from "next/headers";
import awsConfig from "@/aws-exports";
import { Amplify } from "aws-amplify";

Amplify.configure(awsConfig);

export async function loginAction(formData: FormData): Promise<{ success: boolean; error?: string; user?: any }> {
  const email = formData.get("email")?.toString() || "";
  const password = formData.get("password")?.toString() || "";

  try {
    // Sign in the user
    const signInResponse = await signIn({ username: email, password });
    if (!signInResponse.isSignedIn) {
      throw new Error("Sign in failed");
    }
    
    // Retrieve tokens from the session
    const session = await fetchAuthSession();
    if (!session.tokens?.accessToken) {
      await signOut();
      throw new Error("Failed to retrieve tokens");
    }
    const tokenStr = session.tokens.accessToken.toString();

    // Set an HTTP‑only cookie with the access token
    cookies().set("token", tokenStr, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });
    
    // Update your API service with the token
    apiService.setToken(tokenStr);

    // Retrieve the authenticated user data.
    // Replace "123" with the appropriate identifier or API logic as needed.
    const userData = await apiService.getUser("123");
    console.log("User data: recieved in login Actions", userData);

    // Set a cookie with the user ID for later server-side use.
    cookies().set("userId", userData.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
    });

    return { success: true, user: userData };
  } catch (error: any) {
    await signOut();
    console.error("Login error:", error);
    return { success: false, error: error.message || "Authentication failed" };
  }
}
