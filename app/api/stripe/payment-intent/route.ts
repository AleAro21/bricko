import { NextResponse } from "next/server";
import Stripe from "stripe";
import { cookies } from "next/headers";
import { apiService } from "@/app/apiService";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
});

export async function POST(request: Request) {
  try {
    // Extract values from the request body but do NOT trust the userId from here.
    const { paymentAmount, currency = "MXN", serviceType } = await request.json();
    
    // Get authentication token and userId from cookies.
    const tokenCookie = cookies().get("token");
    const userIdCookie = cookies().get("userId");
    if (!tokenCookie || !userIdCookie) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }
    
    // Use the userId from cookies (which is expected to be a valid uuid).
    const userId = userIdCookie.value;
    
    // Set token in apiService for authentication.
    apiService.setToken(tokenCookie.value);
    
    // Convert amount to the smallest currency unit (e.g., cents)
    const amount = Math.round(paymentAmount * 100);

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "MXN",
      payment_method_types: ['card', 'oxxo'],
      payment_method_options: {
        card: {
          installments: {
            enabled: true,
          },
        },
      },
      metadata: { serviceType, userId },
    });

    // Create the payment intention record in your backend.
    const intentionData = await apiService.createPaymentIntent(userId, {
      paymentAmount,
      currency,
      servicetype: serviceType, // Using lowercase key if required by your backend
    });
    
    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      intention: intentionData,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
