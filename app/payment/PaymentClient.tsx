'use client';

import { FC, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import DashboardLayout from "@/components/common/DashboardLayout";
import PaymentSummary from "./PaymentSummary";
import PaymentElementWrapper from "./PaymentElementWrapper";
import { motion } from "framer-motion";
import { Calculator, Users, Question } from "phosphor-react";
import PaymentMethodSelector from "./PaymentMethodSelection";
import CardPaymentForm from "./CardPaymentForm";
import OxxoPayment from "./OxxoPayment";
import Modal from "@/components/common/Modal";
import logo from '../../assets/greylogo.svg';

interface PlanType {
  name: string;
  price: number;
  features: string[];
  coverage: number;
}

const PLANS: Record<string, PlanType> = {
  basic: {
    name: 'Protección Básica',
    price: 399,
    coverage: 100000,
    features: [
      'Cobertura por fallecimiento',
      'Asistencia funeraria básica',
      'Atención telefónica 24/7',
      'Documentación digital',
    ],
  },
  standard: {
    name: 'Protección Estándar',
    price: 699,
    coverage: 200000,
    features: [
      'Todo lo del plan Básico',
      'Doble indemnización por accidente',
      'Asistencia funeraria premium',
      'Gestor personal dedicado',
    ],
  },
  premium: {
    name: 'Protección Premium',
    price: 1599,
    coverage: 500000,
    features: [
      'Todo lo del plan Estándar',
      'Cobertura internacional',
      'Servicios médicos premium',
      'Asistencia familiar completa',
    ],
  },
};

const PaymentClient: FC = () => {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<keyof typeof PLANS>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'oxxo'>('card');
  const [showModal, setShowModal] = useState(false);

  
  const assetValue = 3000000; // 3M MXN
  const tokenizationFee = assetValue * 0.01; // 0.1% of asset value
  const numberOfTokens = 1000;
  const tokenValue = assetValue / numberOfTokens;

  useEffect(() => {

    if (assetValue >= 2000000) {
      setSelectedPlan('premium');
    } else if (assetValue >= 1000000) {
      setSelectedPlan('standard');
    } else {
      setSelectedPlan('basic');
    }
  }, [assetValue]);

  const handleOnSubmit = () => {
    router.push('/payment-success');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <DashboardLayout>
      <div className="relative min-h-screen">
        <Modal showModal={showModal} setShowModal={setShowModal}>
          <h2 className="text-[30px] font-semibold text-[#1d1d1f] mb-4">
            Costos tradicionales de herencia
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-[20px] font-semibold text-[#1d1d1f] mb-3">
                Proceso tradicional:
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <div>
                    <span className="font-medium">Tiempo:</span>
                    <p className="text-gray-600">6-24 meses en promedio</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <div>
                    <span className="font-medium">Costos legales:</span>
                    <p className="text-gray-600">5-10% del valor del activo ({formatCurrency(assetValue * 0.05)} - {formatCurrency(assetValue * 0.1)})</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <div>
                    <span className="font-medium">Gastos notariales:</span>
                    <p className="text-gray-600">2-4% del valor del activo ({formatCurrency(assetValue * 0.02)} - {formatCurrency(assetValue * 0.04)})</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <div>
                    <span className="font-medium">Otros gastos:</span>
                    <p className="text-gray-600">Impuestos, trámites, certificaciones, etc.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-[20px] font-semibold text-[#1d1d1f] mb-3">
                Con tokenización:
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">•</span>
                  <div>
                    <span className="font-medium">Tiempo:</span>
                    <p className="text-gray-600">Inmediato</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">•</span>
                  <div>
                    <span className="font-medium">Costo total:</span>
                    <p className="text-gray-600">Solo {formatCurrency(tokenizationFee)} (0.1% del valor)</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </Modal>

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
                <div className="space-y-8">
                  <div>
                    <div className="inline-flex items-center h-[32px] bg-[#047aff] bg-opacity-10 px-[12px] py-[6px] rounded-md mb-2.5">
                      <span className="text-[#047aff] text-[14px] font-[400]">PAGO</span>
                    </div>
                    <div className="flex items-center gap-2 mb-[15px]">
                      <h1 className="text-[32px] sm:text-[38px] font-[500] tracking-[-1.5px] leading-[1.2] sm:leading-[52px]">
                        <span className="text-[#1d1d1f]">Finaliza tu </span>
                        <span
                          style={{
                            backgroundImage: "linear-gradient(to left, #047aff 30%, #0d4ba3 100%)",
                          }}
                          className="inline-block text-transparent bg-clip-text"
                        >
                          proceso
                        </span>
                      </h1>
                      <Question 
                        weight="regular"
                        className="text-blue-500 w-7 h-7 cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => setShowModal(true)}
                      />
                    </div>

                    {/* Asset Value Summary */}
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 mb-8">
                      <div className="flex items-start gap-3">
                        <Calculator size={24} className="text-blue-600 flex-shrink-0" />
                        <div>
                          <h3 className="text-[16px] font-[500] text-[#1d1d1f] mb-2">
                            Resumen de tu Activo
                          </h3>
                          <div className="space-y-2">
                            <p className="text-[14px] text-gray-600">
                              Valor del activo: {formatCurrency(assetValue)}
                            </p>
                            <p className="text-[14px] text-gray-600">
                              Tokens: {numberOfTokens} ({formatCurrency(tokenValue)} por token)
                            </p>
                            <p className="text-[14px] text-gray-600">
                              Comisión de tokenización (0.1%): {formatCurrency(tokenizationFee)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h2 className="text-[16px] font-[400] text-[#1d1d1f] mb-4">Información de pago</h2>
                      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        <div className="p-6 space-y-6">
                          <PaymentMethodSelector onMethodSelect={setPaymentMethod} />
                          
                          <div className="mt-6">
                            {paymentMethod === 'card' ? (
                              <CardPaymentForm onSubmit={handleOnSubmit} />
                            ) : (
                              <OxxoPayment />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="sticky top-8">
                    <PaymentSummary
                      amount={PLANS[selectedPlan].price + tokenizationFee}
                      basePrice={PLANS[selectedPlan].price}
                      tokenizationFee={tokenizationFee}
                      planName={PLANS[selectedPlan].name}
                      features={PLANS[selectedPlan].features}
                      coverage={PLANS[selectedPlan].coverage}
                      isInsurance={true}
                    />

                    <div className="mt-6 bg-blue-50 rounded-xl p-6">
                      <div className="flex items-start gap-3">
                        <Users size={24} className="text-blue-600 flex-shrink-0" />
                        <div>
                          <h3 className="text-[16px] font-[500] text-[#1d1d1f] mb-2">
                            Protección Familiar Garantizada
                          </h3>
                          <p className="text-[14px] text-gray-600">
                            Tu familia estará protegida con una cobertura completa y beneficios exclusivos.
                          </p>
                        </div>
                      </div>
                    </div>
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