import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { apiService } from "@/app/apiService";

export async function POST(request: Request) {
  try {
    const { userId, amount, currency, intentionId, stripePaymentId } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: "Missing userId parameter" }, { status: 400 });
    }

    // Get authentication token from cookies
    const tokenCookie = cookies().get("token");
    const userIdCookie = cookies().get("userId");
    if (!tokenCookie || !userIdCookie) {
      return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }
    
    // Set token in apiService for authentication
    apiService.setToken(tokenCookie.value);

    // Record the payment in your backend without confirming it again on Stripe.
    const paymentData = await apiService.createPayment(userId, {
      amount,
      currency: 'MXN',
      methodPayment: "paymentgw",
      itemsPaid: [
        {
          id: "1",
          quantity: 1,
          serviceType: "subscription",
        },
      ],
      paymentMetadata: {
        stripePaymentId: stripePaymentId,
      },
      intentionId,
      status: "New", // Update status based on your logic (or later via webhook)
      comments: "Payment processed via Stripe",
    });

    console.log("Payment creation successful:", paymentData);
    return NextResponse.json({ response: paymentData });
  } catch (error: any) {
    console.error("Payment creation failed:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
