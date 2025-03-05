"use client";
import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/common/DashboardLayout";
import PaymentSummary from "./PaymentSummary";
import PaymentElementWrapper from "./PaymentElementWrapper";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X } from "phosphor-react";

const BASE_PRICE = 899;
const ADDON_PRICE = 100;

const PaymentClient: FC = () => {
  const router = useRouter();
  const [addonSelected, setAddonSelected] = useState<boolean | null>(null);
  const [showSpotlight, setShowSpotlight] = useState(true);

  // Calculate payment amount with optional addon
  const paymentAmount = BASE_PRICE + (addonSelected ? ADDON_PRICE : 0);

  return (
    <DashboardLayout>
      <div className="relative min-h-screen">
        {/* Spotlight overlay with lower z-index than navbar */}
        <AnimatePresence>
          {showSpotlight && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/20"
              style={{ zIndex: 5 }}
            />
          )}
        </AnimatePresence>

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
                {/* Left Column */}
                <div className="space-y-8">
                  <div>
                    <div className="inline-flex items-center h-[32px] bg-[#047aff] bg-opacity-10 px-[12px] py-[6px] rounded-md mb-2.5">
                      <span className="text-[#047aff] text-[14px] font-[400]">PAGO</span>
                    </div>
                    <h1 className="text-[32px] sm:text-[38px] font-[500] tracking-[-1.5px] leading-[1.2] sm:leading-[52px] mb-[15px]">
                      <span className="text-[#1d1d1f]">Complete su </span>
                      <span
                        style={{
                          backgroundImage: "linear-gradient(to right, #7abaff 1%, #047aff 60%, #0d4ba3 100%)",
                        }}
                        className="inline-block text-transparent bg-clip-text"
                      >
                        compra
                      </span>
                    </h1>

                    {/* Add-on Option */}
                    <div className="mb-8 relative" style={{ zIndex: 6 }}>
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.3 }}
                        className="bg-gradient-to-r from-blue-50 to-white p-1 rounded-xl"
                      >
                        <div className={`p-5 rounded-xl transition-all duration-300 ${addonSelected === null
                            ? "bg-white shadow-md"
                            : addonSelected
                              ? "bg-white shadow-lg border-2 border-[#047aff]"
                              : "bg-white shadow-md opacity-75"
                          }`}>
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="text-[18px] font-[500] text-[#1d1d1f]">Seguro de Modificaciones</h3>
                                <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">Recomendado</span>
                              </div>
                              <p className="text-[14px] text-gray-600 mt-1">
                                Incluye 3 modificaciones futuras a su testamento sin costo adicional.
                                Sin este seguro, cualquier modificación futura requerirá una nueva compra completa.
                              </p>
                            </div>
                            <div className="text-right ml-4">
                              <p className="text-[22px] font-[500] text-[#047aff]">$100.00</p>
                              <p className="text-[14px] text-gray-500">MXN</p>
                            </div>
                          </div>

                          <div className="mt-4 flex gap-3">
                            <button
                              onClick={() => {
                                setAddonSelected(true);
                                setShowSpotlight(false);
                              }}
                              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-200 ${addonSelected === true
                                  ? "bg-[#047aff] text-white"
                                  : "bg-blue-50 hover:bg-blue-100 text-[#047aff]"
                                }`}
                            >

                              Sí, quiero protección
                            </button>
                            <button
                              onClick={() => {
                                setAddonSelected(false);
                                setShowSpotlight(false);
                              }}
                              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-200 ${addonSelected === false
                                  ? "bg-gray-200 text-gray-700"
                                  : "bg-gray-50 hover:bg-gray-100 text-gray-600"
                                }`}
                            >

                              No, gracias
                            </button>
                          </div>

                         
                        </div>
                      </motion.div>
                    </div>

                    <div className={`transition-opacity duration-300 ${showSpotlight ? 'opacity-50' : 'opacity-100'}`}>
                      <h2 className="text-[16px] font-[400] text-[#1d1d1f] mb-4">Información de pago</h2>
                      <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden">
                        <div className="p-6">
                          <PaymentElementWrapper amount={paymentAmount} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Payment Summary */}
                <div className={`transition-opacity duration-300 ${showSpotlight ? 'opacity-50' : 'opacity-100'}`}>
                  <div className="sticky top-8">
                    <PaymentSummary
                      amount={paymentAmount}
                      basePrice={BASE_PRICE}
                      addonPrice={addonSelected ? ADDON_PRICE : 0}
                      addonSelected={addonSelected ?? false}
                    />
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