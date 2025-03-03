
// components/Payment/CardFormPayment.tsx
"use client";

import { FC, useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import PrimaryButton from "@/components/reusables/PrimaryButton";
import { useRouter } from "next/navigation";
import { getUserAction } from "@/app/actions/userActions";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

const CheckoutForm: FC<{ amount: number }> = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [cardholderName, setCardholderName] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Get the current user and token
    const fetchUser = async () => {
      try {
        const userResult = await getUserAction();
        if (userResult.success && userResult.user) {
          setUserId(userResult.user.id);
        } else {
          console.error("Failed to get user");
        }
        
        // Get token from cookies
        const cookies = document.cookie.split(';');
        const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('token='));
        if (tokenCookie) {
          setToken(tokenCookie.split('=')[1]);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    
    fetchUser();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements || !userId) {
      console.error("Stripe has not loaded correctly or user not found.");
      return;
    }

    setLoading(true);

    try {
      // 1. Create a Payment Intent
      const intentResponse = await fetch("/api/stripe/payment-intent", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          paymentAmount: amount, // amount in the smallest currency unit (e.g., cents)
          currency: "MXN",
          serviceType: "subscription",
          userId: userId
        }),
      });
      
      const intentData = await intentResponse.json();
      console.log("Payment Intent Response:", intentData);
      
      if (!intentResponse.ok) {
        throw new Error(intentData.error || "Failed to create payment intent");
      }

      const clientSecret = intentData.clientSecret;
      if (!clientSecret) {
        throw new Error("No client secret returned from API.");
      }

      // 2. Confirm the payment with Stripe
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
          billing_details: { name: cardholderName },
        },
      });
      
      console.log("Stripe Confirm Result:", result);

      if (result.error) {
        throw new Error(result.error.message || "Payment failed");
      } else if (result.paymentIntent?.status === "succeeded") {
        // 3. Confirm the payment on your backend
        const confirmResponse = await fetch("/api/payments", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            userId: userId,
            amount: amount,
            currency: "MXN",
            methodpayment: "card",
            intentionId: intentData.intention?.id,
            stripePaymentId: result.paymentIntent.id,
          }),
        });
        
        const confirmData = await confirmResponse.json();
        console.log("Backend Payment Confirmation Response:", confirmData);

        if (confirmResponse.ok) {
          router.push("/payment-success");
        } else {
          throw new Error(confirmData.error || "Error confirming payment on backend");
        }
      }
    } catch (error: any) {
      console.error("Payment error:", error);
      alert(error.message);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="cardholder-name" className="block text-sm font-medium text-gray-700">
          Nombre en la tarjeta
        </label>
        <input
          id="cardholder-name"
          type="text"
          value={cardholderName}
          onChange={(e) => setCardholderName(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          placeholder="Juan Pérez"
          required
        />
      </div>
      <CardElement className="p-4 border rounded-lg" />
      <PrimaryButton type="submit" className="w-full" disabled={!stripe || loading || !userId}>
        {loading ? "Procesando..." : "Pagar Ahora"}
      </PrimaryButton>
    </form>
  );
};

const CardFormPayment: FC<{ amount?: number }> = ({ amount = 9999 }) => (
  <Elements stripe={stripePromise}>
    <CheckoutForm amount={amount} />
  </Elements>
);

export default CardFormPayment;