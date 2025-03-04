"use client";
import { FC, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/common/DashboardLayout";
import PaymentMethod from "./PaymentMethod";
import PaymentSummary from "./PaymentSummary";
import CardFormPayment from "./CardFormPayment";
import TransferForm from "./TransferForm";
import { motion } from "framer-motion";
import { getSubscriptionCatalogAction } from "@/app/actions/payments";
import { SubscriptionCatalogResponse, Subscription } from "@/types";
import GradientCanvas from "@/components/reusables/GradientCanvas";

const PaymentClient: FC = () => {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState<"card" | "transfer">("card");
  const [catalog, setCatalog] = useState<SubscriptionCatalogResponse | null>(null);
  const [selectedSubscription, setSelectedSubscription] = useState<Subscription | undefined>(undefined);

  // Fetch the subscription catalog on component mount
  useEffect(() => {
    (async () => {
      try {
        const catalogResponse = await getSubscriptionCatalogAction();
        setCatalog(catalogResponse);
        // Set the first subscription as default if available
        if (catalogResponse?.subscriptions?.length > 0) {
          setSelectedSubscription(catalogResponse.subscriptions[0]);
        }
      } catch (error) {
        console.error("Error fetching subscription catalog:", error);
      }
    })();
  }, []);

  // Update the payment amount based on the selected subscription,
  // fallback to a default value (2499) if none is selected.
  // No need to divide by 100 as the amount is already in the correct format
  const paymentAmount = selectedSubscription?.pricelist[0]?.price || 899;

  return (
    <DashboardLayout>
      <div className="relative min-h-screen">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="relative flex flex-col min-h-screen"
        >
          <main className="container mx-auto flex flex-col flex-grow overflow-hidden">
            <div className="w-full max-w-6xl mx-auto flex flex-col min-h-[75vh] mb-4 px-4 sm:px-5 py-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                {/* Left Column - Title, Subscription Selection, and Payment Form */}
                <div className="space-y-8">
                  <div>
                    <div className="inline-flex items-center h-[32px] bg-[#047aff] bg-opacity-10 px-[12px] py-[6px] rounded-md mb-2.5">
                      <span className="text-[#047aff] text-[14px] font-[400]">PAGO</span>
                    </div>

                    <h1 className="text-[32px] sm:text-[38px] font-[500] tracking-[-1.5px] leading-[1.2] sm:leading-[52px] mb-[15px]">
                      <span className="text-[#1d1d1f]">Seleccione su </span>
                      <span
                        style={{
                          backgroundImage:
                            "linear-gradient(to right, #7abaff 1%, #047aff 60%, #0d4ba3 100%)",
                        }}
                        className="inline-block text-transparent bg-clip-text"
                      >
                        método de pago
                      </span>
                    </h1>

                    {/* Subscription Options */}
                    <div className="mb-8">
                      <h2 className="text-[20px] font-[500] text-[#1d1d1f] mb-4">Seleccione una suscripción</h2>
                      {catalog ? (
                        <div className="grid grid-cols-1 gap-4">
                          {catalog.subscriptions.map((subscription) => (
                            <div
                              key={subscription.id}
                              onClick={() => setSelectedSubscription(subscription)}
                              className={`cursor-pointer p-5 rounded-xl transition-all duration-300 ${
                                selectedSubscription?.id === subscription.id
                                  ? "bg-white shadow-lg border-l-4 border-[#047aff]"
                                  : "bg-white/90 backdrop-blur-sm shadow-md hover:shadow-lg"
                              }`}
                            >
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="text-[18px] font-[500] text-[#1d1d1f]">{subscription.name}</h3>
                                  <p className="text-[14px] text-gray-600 mt-1">{subscription.description}</p>
                                </div>
                                <div className="text-right">
                                  <p className="text-[22px] font-[500] text-[#047aff]">
                                    ${subscription.pricelist[0]?.price.toFixed(2)}
                                  </p>
                                  <p className="text-[14px] text-gray-500">{subscription.pricelist[0]?.currency}</p>
                                </div>
                              </div>
                              {selectedSubscription?.id === subscription.id && (
                                <div className="mt-3 text-[14px] text-[#047aff]">
                                  ✓ Seleccionado
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-5 shadow-md">
                          <p className="text-center text-gray-600">Cargando opciones de suscripción...</p>
                        </div>
                      )}
                    </div>

                    {/* Payment Method Selection */}
                    <h2 className="text-[20px] font-[500] text-[#1d1d1f] mb-4">Método de pago</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                      <PaymentMethod
                        method="card"
                        selected={paymentMethod === "card"}
                        onSelect={() => setPaymentMethod("card")}
                      />
                      <PaymentMethod
                        method="transfer"
                        selected={paymentMethod === "transfer"}
                        onSelect={() => setPaymentMethod("transfer")}
                      />
                    </div>
                  </div>

                  {/* Payment Form */}
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden">
                    <div className="p-6">
                      <h2 className="text-[20px] font-[500] text-[#1d1d1f] mb-6">
                        {paymentMethod === "card" ? "Detalles de la tarjeta" : "Detalles de transferencia"}
                      </h2>
                      {paymentMethod === "card" ? (
                        <CardFormPayment amount={paymentAmount} />
                      ) : (
                        <TransferForm amount={paymentAmount} />
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Column - Payment Summary */}
                <div>
                  <div className="sticky top-8">
                    <PaymentSummary amount={paymentAmount} subscription={selectedSubscription} />
                  </div>
                </div>
              </div>
            </div>
          </main>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default PaymentClient;