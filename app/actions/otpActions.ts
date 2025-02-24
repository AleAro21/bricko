// app/actions/otpActions.server.ts
"use server";

import { confirmSignUp, signIn, fetchAuthSession } from "aws-amplify/auth";
import { apiService } from "@/app/apiService";
import { Amplify } from "aws-amplify";
import awsConfig from "../../aws-exports";
// Import Next.js cookies API
import { cookies } from "next/headers";

interface ConfirmOtpParams {
  email: string;
  otp: string;
  password: string;
  name: string;
  fatherLastName: string;
  motherLastName: string;
}

Amplify.configure(awsConfig);

export async function confirmOtpAction({
  email,
  otp,
  password,
  name,
  fatherLastName,
  motherLastName,
}: ConfirmOtpParams): Promise<{ success: boolean; error?: string; user?: any }> {
  try {
    // Confirm the sign up using OTP
    await confirmSignUp({ username: email, confirmationCode: otp });

    // Sign in with email and password
    const signInResponse = await signIn({ username: email, password });
    if (!signInResponse.isSignedIn) {
      throw new Error("Sign in failed");
    }

    // Retrieve tokens
    const session = await fetchAuthSession();
    if (!session.tokens?.accessToken) {
      throw new Error("Failed to retrieve tokens");
    }
    
    // Set an HTTP‑only cookie with the access token.
    // This cookie will be sent with subsequent requests automatically.
    cookies().set("token", session.tokens.accessToken.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    // Create the user using your API service
    const userData = { name, fatherLastName, motherLastName, email };
    const createdUser = await apiService.createUser(userData);

    return { success: true, user: createdUser };
  } catch (error: any) {
    return { success: false, error: error.message || "An error occurred during confirmation" };
  }
}
