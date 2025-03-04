"use server";

import { apiService } from "@/app/apiService";
import { cookies } from "next/headers";
import type {
  Payment,
  paymentIntention,
  SubscriptionCatalogResponse,
  UserSubscriptionsResponse,
  UserSubscription,
} from "@/types";
import { getUserAction } from "@/app/actions/userActions";

/**
 * Creates a new payment intention for the current user.
 * The user is fetched using getUserAction.
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

    // Create the payment record via your API service
    const payment = await apiService.createPayment(userId, paymentData);
    console.log("Payment confirmed:", payment);
    return payment;
  } catch (error: any) {
    console.error("Error confirming payment:", error);
    throw error;
  }
}

/**
 * Fetches the subscription catalog from the API.
 */
export async function getSubscriptionCatalogAction(): Promise<SubscriptionCatalogResponse> {
  try {
    // Get the auth token from cookies
    const token = cookies().get("token")?.value;
    if (!token) throw new Error("No authentication token available");
    apiService.setToken(token);

    // Retrieve the subscription catalog from your API service
    const catalog = await apiService.getSubscriptionCatalog();
    console.log("Subscription catalog retrieved:", catalog);
    return catalog;
  } catch (error: any) {
    console.error("Error fetching subscription catalog:", error);
    throw error;
  }
}

/**
 * Fetches the current user's subscriptions.
 */
export async function getUserSubscriptionsAction(): Promise<UserSubscriptionsResponse> {
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

    // Retrieve the user's subscriptions from your API service
    const subscriptions = await apiService.getUserSubscriptions(userId);
    console.log("User subscriptions retrieved:", subscriptions);
    return subscriptions;
  } catch (error: any) {
    console.error("Error fetching user subscriptions:", error);
    throw error;
  }
}

/**
 * Fetches a specific subscription service by its paymentId.
 */
export async function getServiceByIdAction(paymentId: string): Promise<UserSubscription> {
  try {
    // Get the auth token from cookies
    const token = cookies().get("token")?.value;
    if (!token) throw new Error("No authentication token available");
    apiService.setToken(token);

    // Retrieve the service by id from your API service
    const service = await apiService.getServiceById(paymentId);
    console.log("Service retrieved:", service);
    return service;
  } catch (error: any) {
    console.error("Error fetching service by id:", error);
    throw error;
  }
}


