
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { cookies } from 'next/headers';
import { apiService } from '@/app/apiService';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
});

export async function POST(request: Request) {
  try {
    const { paymentAmount, currency = "MXN", serviceType, userId } = await request.json();
    
    // Get authentication token from cookies
    const tokenCookie = cookies().get("token");
    const userIdCookie = cookies().get("userId");
    
    if (!tokenCookie || !userIdCookie) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }
    
    // Set token in apiService for authentication
    apiService.setToken(tokenCookie.value);
    
    // Amount is expected in the smallest currency unit (e.g., cents)
// Amount is expected in the smallest currency unit (e.g., cents)
    const amount = Math.round(paymentAmount * 100);

    const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency,
    metadata: { serviceType: serviceType, userId },
    });

    // Create a payment intention record using the existing createPaymentIntent method
    // Note: using servicetype (lowercase t) instead of serviceType
    const intentionData = await apiService.createPaymentIntent(userId, {
      paymentAmount,
      currency,
      servicetype: serviceType, // Changed from serviceType to servicetype
    });
    
    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      intention: intentionData,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}