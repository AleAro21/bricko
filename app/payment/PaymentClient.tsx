'use client';

import { FC, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import DashboardLayout from "@/components/common/DashboardLayout";
import PaymentSummary from "./PaymentSummary";
import PaymentElementWrapper from "./PaymentElementWrapper";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Heart, ShieldStar, FirstAid, Users, Calculator, ArrowRight } from "phosphor-react";
import { IconProps } from "phosphor-react";
import PaymentMethodSelector from "./PaymentMethodSelection";
import CardPaymentForm from "./CardPaymentForm";
import OxxoPayment from "./OxxoPayment";
import logo from '../../assets/greylogo.svg';

interface PlanType {
  name: string;
  price: number;
  features: string[];
  icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>>;
  coverage: number;
  recommended?: boolean;
}

const PLANS: Record<string, PlanType> = {
  basic: {
    name: 'Protección Básica',
    price: 399,
    coverage: 500000,
    features: [
      'Cobertura por fallecimiento',
      'Asistencia funeraria básica',
      'Atención telefónica 24/7',
      'Documentación digital',
    ],
    icon: Heart,
  },
  pro: {
    name: 'Protección Plus',
    price: 699,
    coverage: 1000000,
    features: [
      'Todo lo del plan Básico',
      'Doble indemnización por accidente',
      'Asistencia funeraria premium',
      'Gestor personal dedicado',
      'Cobertura por invalidez',
    ],
    icon: ShieldStar,
    recommended: true,
  },
  premium: {
    name: 'Protección Total',
    price: 999,
    coverage: 2000000,
    features: [
      'Todo lo del plan Plus',
      'Cobertura internacional',
      'Servicios médicos premium',
      'Asistencia familiar completa',
      'Beneficios en vida',
      'Ahorro programado',
    ],
    icon: FirstAid,
  },
};

const PaymentClient: FC = () => {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<keyof typeof PLANS>('pro');
  const [showSpotlight, setShowSpotlight] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'oxxo'>('card');

  // Mock asset value from previous step - in a real app, this would come from your state management
  const assetValue = 3000000; // 2.5M MXN
  const numberOfTokens = 100;
  const tokenValue = assetValue / numberOfTokens;

  useEffect(() => {
    // Automatically select recommended plan based on asset value
    if (assetValue >= 2000000) {
      setSelectedPlan('premium');
      PLANS.premium.recommended = true;
      PLANS.pro.recommended = false;
    } else if (assetValue >= 1000000) {
      setSelectedPlan('pro');
      PLANS.pro.recommended = true;
      PLANS.premium.recommended = false;
    } else {
      setSelectedPlan('basic');
      PLANS.basic.recommended = true;
      PLANS.pro.recommended = false;
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
                <div className="space-y-8">
                  <div>
                    <div className="inline-flex items-center h-[32px] bg-[#047aff] bg-opacity-10 px-[12px] py-[6px] rounded-md mb-2.5">
                      <span className="text-[#047aff] text-[14px] font-[400]">SEGURO DE VIDA</span>
                    </div>
                    <h1 className="text-[32px] sm:text-[38px] font-[500] tracking-[-1.5px] leading-[1.2] sm:leading-[52px] mb-[15px]">
                      <span className="text-[#1d1d1f]">Elija su plan de </span>
                      <span
                        style={{
                          backgroundImage: "linear-gradient(to left, #047aff 30%, #0d4ba3 100%)",
                        }}
                        className="inline-block text-transparent bg-clip-text"
                      >
                        protección
                      </span>
                    </h1>

                    {/* Asset Value Summary */}
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 mb-8">
                      <div className="flex items-start gap-3">
                        <Calculator size={24} className="text-blue-600 flex-shrink-0" />
                        <div>
                          <h3 className="text-[16px] font-[500] text-[#1d1d1f] mb-2">
                            Recomendación Personalizada
                          </h3>
                          <p className="text-[14px] text-gray-600 mb-4">
                            Basado en tu activo tokenizado valorado en {formatCurrency(assetValue)} y dividido en {numberOfTokens} tokens 
                            ({formatCurrency(tokenValue)} por token), te recomendamos el siguiente plan:
                          </p>
                          <div className="flex items-center gap-2 text-blue-600">
                            <ArrowRight size={20} />
                            <span className="font-medium">Plan {PLANS[selectedPlan].name}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mb-8 relative" style={{ zIndex: 6 }}>
                      <div className="space-y-4">
                        {(Object.keys(PLANS) as Array<keyof typeof PLANS>).map((planKey) => {
                          const plan = PLANS[planKey];
                          const Icon = plan.icon;
                          const isSelected = selectedPlan === planKey;

                          return (
                            <div
                              key={planKey}
                              onClick={() => {
                                setSelectedPlan(planKey);
                                setShowSpotlight(false);
                              }}
                              className={`cursor-pointer p-6 rounded-xl transition-all duration-300 ${
                                isSelected
                                  ? "bg-white shadow-lg border-2 border-[#047aff]"
                                  : "bg-white shadow-md hover:shadow-lg border-2 border-transparent"
                              }`}
                            >
                              <div className="flex items-start gap-4">
                                <div className={`rounded-full p-2 ${
                                  isSelected ? "bg-[#047aff] text-white" : "bg-gray-100 text-gray-600"
                                }`}>
                                  <Icon size={24} weight="bold" />
                                </div>
                                
                                <div className="flex-grow">
                                  <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-lg font-medium">{plan.name}</h3>
                                    <div className="flex items-center gap-3">
                                      {plan.recommended && (
                                        <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">
                                          Recomendado
                                        </span>
                                      )}
                                      <p className="text-xl font-semibold text-[#047aff]">
                                        ${plan.price}
                                        <span className="text-sm text-gray-500 font-normal">/mes</span>
                                      </p>
                                    </div>
                                  </div>

                                  <p className="text-sm text-gray-600 mb-3">
                                    Cobertura hasta {formatCurrency(plan.coverage)}
                                  </p>

                                  <ul className="space-y-2 mb-4">
                                    {plan.features.map((feature, index) => (
                                      <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                                        <Check size={16} className="text-green-500 flex-shrink-0" />
                                        {feature}
                                      </li>
                                    ))}
                                  </ul>

                                  <button
                                    className={`w-full py-2 px-4 rounded-lg transition-colors duration-200 ${
                                      isSelected
                                        ? "bg-[#047aff] text-white"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                                  >
                                    {isSelected ? "Plan seleccionado" : "Seleccionar plan"}
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className={`transition-opacity duration-300 ${showSpotlight ? 'opacity-50' : 'opacity-100'}`}>
                      <h2 className="text-[16px] font-[400] text-[#1d1d1f] mb-4">Información de pago</h2>
                      <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden">
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

                <div className={`transition-opacity duration-300 ${showSpotlight ? 'opacity-50' : 'opacity-100'}`}>
                  <div className="sticky top-8">
                    <PaymentSummary
                      amount={PLANS[selectedPlan].price}
                      basePrice={PLANS[selectedPlan].price}
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