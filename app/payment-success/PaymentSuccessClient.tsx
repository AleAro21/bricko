"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight } from "phosphor-react";
import PrimaryButton from "@/components/reusables/PrimaryButton";
import GradientCanvas from "@/components/reusables/GradientCanvas";
import Image from "next/image";
import graylogo from "@/assets/greylogo.png";

const PaymentSuccessClient: FC = () => {
  const router = useRouter();

  return (
    <div className="relative min-h-screen">
      <GradientCanvas />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="relative flex flex-col min-h-screen"
      >
        <main className="container mx-auto flex flex-col flex-grow overflow-hidden">
          <div className="w-full max-w-6xl mx-auto flex flex-col min-h-[75vh] mb-4">
            <div className="py-4 px-4 sm:px-5">
              <a href="https://testador.mx">
                <Image src={graylogo} width={150} height={150} alt="Testador Logo" />
              </a>
            </div>
            
            <div className="flex-grow flex items-center justify-center px-4 sm:px-5">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-10 sm:p-12 shadow-lg max-w-2xl w-full text-center">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle weight="fill" size={48} className="text-green-600" />
                  </div>
                </div>
                
                <h1 className="text-[28px] sm:text-[32px] font-[500] tracking-[-1px] leading-[1.2] mb-4">
                  <span className="text-[#1d1d1f]">¡Pago </span>
                  <span
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, #34d399, #10b981)",
                    }}
                    className="inline-block text-transparent bg-clip-text"
                  >
                    exitoso!
                  </span>
                </h1>
                
                <p className="text-[16px] text-[#1d1d1f] mb-8 max-w-md mx-auto">
                  Tu testamento ha sido legalizado correctamente. Ahora puedes acceder a todas las funciones y compartirlo con tus seres queridos.
                </p>
                
                <div className="bg-gray-50 rounded-lg p-5 mb-8 max-w-md mx-auto">
                  <div className="flex flex-col space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#047aff] flex items-center justify-center mt-0.5">
                        <CheckCircle weight="fill" className="w-3.5 h-3.5 text-white" />
                      </div>
                      <span className="text-[15px] text-[#1d1d1f] leading-6">Testamento legalizado y validado</span>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#047aff] flex items-center justify-center mt-0.5">
                        <CheckCircle weight="fill" className="w-3.5 h-3.5 text-white" />
                      </div>
                      <span className="text-[15px] text-[#1d1d1f] leading-6">Acceso a todas las funciones premium</span>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#047aff] flex items-center justify-center mt-0.5">
                        <CheckCircle weight="fill" className="w-3.5 h-3.5 text-white" />
                      </div>
                      <span className="text-[15px] text-[#1d1d1f] leading-6">Soporte técnico prioritario</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <PrimaryButton onClick={() => router.push("/summary")} className="px-8">
                    <span>Ir al resumen</span>
                  </PrimaryButton>
                </div>
              </div>
            </div>
          </div>
        </main>
      </motion.div>
    </div>
  );
};

export default PaymentSuccessClient;