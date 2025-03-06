"use client";
import { FC } from 'react';
import DashboardLayout from "@/components/common/DashboardLayout";
import { useRouter } from "next/navigation";
import { motion } from 'framer-motion';
import PrimaryButton from "@/components/reusables/PrimaryButton";
import Link from "next/link";

const ExecutorsIntroductionPage: FC = () => {
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
                    <span className="text-[#047aff] text-[14px] font-[400]">ALBACEAS</span>
                  </div>
                  <Link href="#" className="inline-flex items-center h-[32px] text-[#047aff] hover:text-[#0456b0]">
                    <span className="w-5 h-5 inline-flex items-center justify-center rounded-full border border-[#047aff] text-sm">?</span>
                  </Link>
                </div>

                <h1 className="text-[32px] sm:text-[38px] font-[500] tracking-[-1.5px] leading-[1.2] sm:leading-[52px] mb-[15px]">
                  <span className="text-[#1d1d1f]">¿Qué es un </span>
                  <span
                    style={{ backgroundImage: "linear-gradient(to right, #7abaff 1%, #047aff 60%, #0d4ba3 100%)" }}
                    className="inline-block text-transparent bg-clip-text"
                  >
                    albacea?
                  </span>
                </h1>

                <p className="text-[16px] text-[#1d1d1f] leading-6">
                  Los albaceas son responsables de llevar a cabo los detalles de su testamento después de su muerte.
                  Esto se conoce como "administrar su patrimonio".
                </p>
              </div>

              <div className="space-y-4">
                <p className="text-[16px] text-[#1d1d1f] leading-6">
                  Esto puede implicar ordenar sus finanzas, asegurarse de que se paguen las deudas o los impuestos
                  y asegurarse de que lo restante se distribuya adecuadamente de acuerdo con su testamento.
                  Es un papel serio que asumir.
                </p>
              </div>

              <div className="pt-6 flex justify-end">
                <PrimaryButton
                  onClick={() => router.push("/executers/choose")}
                >
                  Guardar y continuar
                </PrimaryButton>
              </div>
            </div>

            {/* Right Column - Additional Info */}
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
                    ¿A quién elijo para que sea mi albacea?
                  </h2>
                </div>
                <div className="space-y-4">
                  <p className="text-[16px] text-[#1d1d1f] leading-6">
                    Puede elegir albaceas profesionales, amigos y familiares, o una combinación de ambos.
                  </p>
                  <p className="text-[16px] text-[#1d1d1f] leading-6">
                    Hay bastantes detalles importantes que debemos analizar. Es por eso que es posible que
                    tardemos un poco más en leer estas próximas páginas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default ExecutorsIntroductionPage;