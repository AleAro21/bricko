"use server";

import { apiService } from "@/app/apiService";
import { cookies } from "next/headers";
import type { Payment, paymentIntention } from "@/types";
import { getUserAction } from "@/app/actions/userActions";

/**
 * Creates a new payment intention for the current user.
 * The user is fetched using getUserAction (similar to other actions).
 */
export async function createPaymentIntentionAction(
  paymentData: Omit<paymentIntention, "id" | "intentionDate" | "expireDate" | "status">
): Promise<paymentIntention> {
  try {
    // Get the current user
    const userResult = await getUserAction();
    if (!userResult.success || !userResult.user) {
      throw new Error("Usuario no encontrado");
    }
    const userId = userResult.user.id;

    // Get the auth token from cookies
    const token = cookies().get("token")?.value;
    if (!token) throw new Error("No authentication token available");
    apiService.setToken(token);

    // Create the payment intention via your API service
    const intention = await apiService.createPaymentIntent(userId, paymentData);
    console.log("Payment intention created:", intention);
    return intention;
  } catch (error: any) {
    console.error("Error creating payment intention:", error);
    throw error;
  }
}

/**
 * Confirms a payment for the current user.
 * This action fetches the current user using getUserAction and then
 * calls your API service to create the payment record.
 */
export async function confirmPaymentAction(
  paymentData: Omit<Payment, "id" | "paymentDate" | "status">
): Promise<Payment> {
  try {
    // Get the current user (using the same pattern as in other actions)
    const userResult = await getUserAction();
    if (!userResult.success || !userResult.user) {
      throw new Error("Usuario no encontrado");
    }
    const userId = userResult.user.id;

    // Get the auth token from cookies
    const token = cookies().get("token")?.value;
    if (!token) throw new Error("No authentication token available");
    apiService.setToken(token);

    // Create the payment record via your API service
    const payment = await apiService.createPayment(userId, paymentData);
    console.log("Payment confirmed:", payment);
    return payment;
  } catch (error: any) {
    console.error("Error confirming payment:", error);
    throw error;
  }
}
