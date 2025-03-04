// components/Payment/CardFormPayment.tsx
"use client";

import { FC, useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import PrimaryButton from "@/components/reusables/PrimaryButton";
import Spinner from "@/components/reusables/Spinner";
import { useRouter } from "next/navigation";
import { getUserAction } from "@/app/actions/userActions";
import { Lock } from "phosphor-react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

// Custom card element style to match the design
const cardElementOptions = {
  style: {
    base: {
      color: "#1d1d1f",
      fontFamily: '"Inter", sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
      padding: "10px 12px",
    },
    invalid: {
      color: "#ef4444",
      iconColor: "#ef4444",
    },
  },
  hidePostalCode: true,
};

const CheckoutForm: FC<{ amount: number }> = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [cardholderName, setCardholderName] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

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
    setError(null);

    if (!stripe || !elements || !userId) {
      setError("No se pudo conectar con el procesador de pagos. Por favor, intente de nuevo.");
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
          paymentAmount: amount,
          currency: "MXN",
          serviceType: "subscription",
          userId: userId
        }),
      });
      
      const intentData = await intentResponse.json();
      
      if (!intentResponse.ok) {
        throw new Error(intentData.error || "No se pudo crear la intención de pago");
      }

      const clientSecret = intentData.clientSecret;
      if (!clientSecret) {
        throw new Error("No se recibió el secreto del cliente desde la API.");
      }

      // 2. Confirm the payment with Stripe
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
          billing_details: { name: cardholderName },
        },
      });

      if (result.error) {
        throw new Error(result.error.message || "El pago falló");
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

        if (confirmResponse.ok) {
          router.push("/payment-success");
        } else {
          throw new Error(confirmData.error || "Error al confirmar el pago en el servidor");
        }
      }
    } catch (error: any) {
      console.error("Payment error:", error);
      setError(error.message);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="cardholder-name" className="block text-[17px] font-[400] text-[#1d1d1f] mb-2.5">
          Nombre en la tarjeta
        </label>
        <input
          id="cardholder-name"
          type="text"
          value={cardholderName}
          onChange={(e) => setCardholderName(e.target.value)}
          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 transition-all"
          placeholder="Juan Pérez"
          required
          disabled={loading}
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="card-element" className="block text-[17px] font-[400] text-[#1d1d1f] mb-2.5">
          Información de la tarjeta
        </label>
        <div className="p-3 border border-gray-300 rounded-lg focus-within:border-blue-500 transition-all">
          <CardElement id="card-element" options={cardElementOptions} />
        </div>
      </div>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}
      
      <div className="flex items-center gap-2 text-gray-500 mt-2">
        <Lock weight="thin" size={16} />
        <span className="text-[14px]">Sus datos están protegidos con cifrado AES-256</span>
      </div>
      
      <div className="pt-4">
        <PrimaryButton type="submit" className="w-full" disabled={!stripe || loading || !userId}>
          {loading ? <Spinner size={24} /> : `Pagar $${amount.toFixed(2)} MXN`}
        </PrimaryButton>
      </div>
    </form>
  );
};

const CardFormPayment: FC<{ amount?: number }> = ({ amount = 9999 }) => (
  <Elements stripe={stripePromise}>
    <CheckoutForm amount={amount} />
  </Elements>
);

export default CardFormPayment;