"use client";
import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import PrimaryButton from "@/components/reusables/PrimaryButton";
import Spinner from "@/components/reusables/Spinner";
import { useRouter } from "next/navigation";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

// The inner checkout form using the Payment Element
const CheckoutForm = ({ amount }: { amount: number }) => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) return;
    if (loading) return;
    setLoading(true);
    setError(null);
  
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment-success`,
      },
      redirect: "if_required",
    });
  
    if (error) {
      setError(error.message || "Payment failed");
    } else if (paymentIntent) {
      if (paymentIntent.status === "succeeded") {
        router.push("/payment-success");
      } else {
        // Optionally handle other statuses if needed
        setError(`Unexpected payment status: ${paymentIntent.status}`);
      }
    }
    setLoading(false);
  };
  
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}
      <PrimaryButton type="submit" className="w-full" disabled={!stripe || loading}>
        {loading ? <Spinner size={24} /> : `Pagar $${amount.toFixed(2)} MXN`}
      </PrimaryButton>
    </form>
  );
};

// The wrapper that fetches the client secret and initializes the Payment Element
const PaymentElementWrapper = ({ amount }: { amount: number }) => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    // Create a PaymentIntent on mount
    fetch("/api/stripe/payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Include your auth headers if needed (e.g., Authorization)
      },
      body: JSON.stringify({
        paymentAmount: amount,
        currency: "MXN",
        serviceType: "subscription",
        // Include additional data as needed (e.g., userId)
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setFetchError(data.error);
        } else {
          setClientSecret(data.clientSecret);
        }
      })
      .catch((err) => {
        console.error(err);
        setFetchError("Error fetching payment details");
      });
  }, [amount]);

  if (fetchError) {
    return <div>Error: {fetchError}</div>;
  }

  if (!clientSecret) {
    return <div>Loading payment details...</div>;
  }

  const options = {
    clientSecret,
    appearance: {
      theme: "stripe" as "stripe",
    },
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm amount={amount} />
    </Elements>
  );
};

export default PaymentElementWrapper;
