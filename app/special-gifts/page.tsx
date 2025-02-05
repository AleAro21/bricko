'use client';

import { FC } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/common/DashboardLayout";
import { motion } from "framer-motion";
import { Diamond, Stack, Car, Money, Question } from "phosphor-react";

interface LegacyCardProps {
  title: string;
  description: string;
  icon: JSX.Element;
  onClick: () => void;
}

const LegacyCard: FC<LegacyCardProps> = ({ title, description, icon, onClick }) => (
  <div    
    onClick={onClick}
    className="relative flex flex-col items-start p-6 rounded-xl transition-all duration-500 cursor-pointer w-full h-auto min-h-[120px] bg-white shadow-md hover:shadow-lg hover:scale-[1.02]"
  >
    <div className="flex items-center mb-2">
      <div className="w-8 h-8 flex items-center justify-center text-lg text-[#047aff]">
        {icon}
      </div>
    </div>
    <h3 className="text-[20px] sm:text-[24px] text-[#000000] font-[500] mb-1 pr-2 tracking-[0.1px] leading-[1.3]">
      {title}
    </h3>
    <p className="text-[13px] sm:text-[15px] font-[300] text-[#1d1d1f] mb-0 pr-4 tracking-[0.1px] leading-[1.3]">
      {description}
    </p>
  </div>
);

const AccountAndPropertyPage: FC = () => {
  const router = useRouter();

  const legacyTypes = [
    {
      title: "Artículo Único",
      description: "Un artículo especial como un anillo de bodas, obra de arte o reloj",
      icon: <Diamond size={24} weight="thin" />,
      onClick: () => router.push('/legacy?type=single')
    },
    {
      title: "Colección",
      description: "Una colección de artículos como discos, tazas u otros objetos coleccionables",
      icon: <Stack size={24} weight="thin" />,
      onClick: () => router.push('/legacy?type=collection')
    },
    {
      title: "Vehículo",
      description: "Un automóvil, motocicleta u otro tipo de vehículo",
      icon: <Car size={24} weight="thin" />,
      onClick: () => router.push('/legacy?type=vehicle')
    },
    {
      title: "Dinero",
      description: "Una cantidad específica de dinero para legar",
      icon: <Money size={24} weight="thin" />,
      onClick: () => router.push('/legacy?type=money')
    },
    {
      title: "Otro",
      description: "Cualquier otro tipo de legado que desee asignar",
      icon: <Question size={24} weight="thin" />,
      onClick: () => router.push('/legacy?type=other')
    }
  ];

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
          <div className="grid grid-cols-1 lg:grid-cols-[1.5fr,1fr] gap-8 lg:gap-24">
            <div className="space-y-6">
              <div>
                <div className="inline-flex items-center h-[32px] bg-[#047aff] bg-opacity-10 px-[12px] py-[6px] rounded-md mb-2.5">
                  <span className="text-[#047aff] text-[14px] font-[400]">LEGADOS</span>
                </div>

                <h1 className="text-[32px] sm:text-[38px] font-[500] tracking-[-1.5px] leading-[1.2] sm:leading-[52px] mb-[15px]">
                  <span className="text-[#1d1d1f]">Seleccione el tipo de </span>
                  <span className="bg-gradient-to-r from-[#3d9bff] to-[#047aff] inline-block text-transparent bg-clip-text">
                    legado
                  </span>
                </h1>
                <p className="text-[16px] text-[#1d1d1f] leading-6 mb-4">
                  En una herencia, el heredero sucede al testador en la titularidad de sus bienes, y también de sus deudas, y adquiere todos los derechos y obligaciones que no se extingan con la muerte del causante. En cambio, en un legado, el legatario adquiere bienes concretos, pero sin responder del pasivo de la herencia.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {legacyTypes.map((legacy, index) => (
                  <LegacyCard key={index} {...legacy} />
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6 h-fit lg:sticky lg:top-6">
              <h2 className="text-[20px] font-[500] text-[#1d1d1f] mb-4">¿Qué es un legado?</h2>
              <div className="space-y-4">
                <p className="text-[15px] text-[#1d1d1f] leading-6">
                  Un legado es una disposición testamentaria por la cual el testador deja a una persona determinada:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#047aff] flex items-center justify-center mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-[15px] text-[#1d1d1f] leading-6">
                      Bienes específicos y determinados
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#047aff] flex items-center justify-center mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-[15px] text-[#1d1d1f] leading-6">
                      Cantidades de dinero concretas
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#047aff] flex items-center justify-center mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-[15px] text-[#1d1d1f] leading-6">
                      Derechos específicos sobre bienes
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default AccountAndPropertyPage;