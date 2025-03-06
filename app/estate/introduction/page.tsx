"use client";
import { FC } from 'react';
import DashboardLayout from "@/components/common/DashboardLayout";
import { useRouter } from "next/navigation";
import { motion } from 'framer-motion';
import PrimaryButton from "@/components/reusables/PrimaryButton";
import Link from "next/link";

const IntroductionPage: FC = () => {
  const router = useRouter();

  return (
    <DashboardLayout>
      <motion.div
        className="min-h-screen bg-[#f5f5f7]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.2 }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-5 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24">
            {/* Left Column - Title and Description */}
            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-2 mb-2.5">
                  <div className="inline-flex items-center h-[32px] bg-[#047aff] bg-opacity-10 px-[12px] py-[6px] rounded-md">
                    <span className="text-[#047aff] text-[14px] font-[400]">RECOMENDACIONES</span>
                  </div>
                  <Link href="#" className="inline-flex items-center h-[32px] text-[#047aff] hover:text-[#0456b0]">
                    <span className="w-5 h-5 inline-flex items-center justify-center rounded-full border border-[#047aff] text-sm">?</span>
                  </Link>
                </div>

                <h1 className="text-[32px] sm:text-[38px] font-[500] tracking-[-1.5px] leading-[1.2] sm:leading-[52px] mb-[15px]">
                  <span className="text-[#1d1d1f]">Consultar </span>
                  <span
                    style={{ backgroundImage: "linear-gradient(to right, #7abaff 1%, #047aff 60%, #0d4ba3 100%)" }}
                    className="inline-block text-transparent bg-clip-text"
                  >
                    abogados
                  </span>
                </h1>


                <div className="space-y-4">
                  <p className="text-[16px] text-[#1d1d1f] leading-6">
                    Tu patrimonio es todo lo que posee, excepto cualquier
                    obsequio específico que decida dejar a otras personas más
                    adelante. Esto se conoce como patrimonio residual.
                  </p>
                  <p className="text-[16px] text-[#1d1d1f] leading-6">
                    En esta sección podrá dividir tu patrimonio residual entre
                    personas e incluso organizaciones benéficas.
                  </p>
                  <p className="text-[16px] text-[#1d1d1f] leading-6">
                    Podrás agregar tus regalos más tarde.
                  </p>
                </div>
              </div>

              <div className="pt-6 flex justify-end">
                <PrimaryButton
                  onClick={() => router.push("/estate/people")}
                >
                  Guardar y continuar
                </PrimaryButton>
              </div>
            </div>

            {/* Right Column - Info Box */}
            <div className="bg-white rounded-2xl shadow-md p-6 space-y-8 h-fit">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-[#04724D] bg-opacity-10 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      width="20"
                      height="20"
                      className="fill-[#04724D]"
                    >
                      <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
                    </svg>
                  </div>
                  <h2 className="text-[22px] font-[500] text-[#1d1d1f]">
                    Qué incluye tu patrimonio residual
                  </h2>
                </div>
                <div className="space-y-4">
                  {[
                    "Propiedades e inversiones no específicamente designadas",
                    "Bienes personales y artículos de valor que no estén asignados",
                    "Fondos no designados en obsequios o legados específicos"
                  ].map((text, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#04724D] bg-opacity-10 flex items-center justify-center mt-0.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#04724D]" />
                      </div>
                      <span className="text-[16px] text-[#1d1d1f] leading-6">{text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8 border-t border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-[#D00E01] bg-opacity-10 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      width="20"
                      height="20"
                      className="fill-[#D00E01]"
                    >
                      <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" />
                    </svg>
                  </div>
                  <h2 className="text-[22px] font-[500] text-[#1d1d1f]">
                    Lo que no incluye tu patrimonio residual
                  </h2>
                </div>
                <div className="space-y-4">
                  {[
                    "Cuentas bancarias y cuentas de ahorro especiales (como cuentas ISA, si aplican)",
                    "Inversiones específicas",
                    "Propiedades o bienes previamente asignados como obsequios específicos"
                  ].map((text, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#D00E01] bg-opacity-10 flex items-center justify-center mt-0.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#D00E01]" />
                      </div>
                      <span className="text-[16px] text-[#1d1d1f] leading-6">{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default IntroductionPage;