'use client';

import { motion } from 'framer-motion';
import React from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import graylogo from '../../assets/greylogo.png';
import FooterTwo from '@/components/common/FooterTwo';
import GradientCanvas from "@/components/reusables/GradientCanvas";

interface CheckIconProps {
  className?: string;
}

const CheckIcon: React.FC<CheckIconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    className={className}
  >
    <path
      fill="#f95940"
      d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"
    />
  </svg>
);

interface BenefitItemProps {
  title: string;
  description: string;
}

const BenefitItem: React.FC<BenefitItemProps> = ({ title, description }) => (
  <div className="flex items-start gap-3 py-4">
    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#f95940] flex items-center justify-center mt-0.5">
      <svg
        className="w-3.5 h-3.5 text-[#FFFFFF]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2.5}
          d="M5 13l4 4L19 7"
        />
      </svg>
    </div>
    <div>
      <h3 className="text-[16px] font-[500] text-[#1d1d1f] mb-1">{title}</h3>
      <p className="text-[16px] text-[#1d1d1f] leading-6">{description}</p>
    </div>
  </div>
);

interface ContinueButtonProps {
  href: string;
  text: string;
}

const ContinueButton: React.FC<ContinueButtonProps> = ({ href, text }) => (
  <Link href={href}>
    <button className="w-full text-[14px] text-white font-[600] bg-[#f95940] px-6 py-2.5 rounded-[100px] hover:bg-[#0366d6] transition-colors duration-200">
      {text}
    </button>
  </Link>
);

const Benefits: React.FC = () => {
  const params = useSearchParams();
  const recommendation = params?.get('recommendation') || '';
  const isTelephonic = recommendation === 'telephonic';

  const title = isTelephonic
    ? 'Lo sentimos por el momento no cumples con los requisitos para crear tu testamento en línea'
    : 'Crea tu Testamento Digital';

  const buttonConfig = {
    href: isTelephonic
      ? '/booking/will??utm_source=sign_up_telephone'
      : '/start/basics',
    text: isTelephonic ? 'Obtener más información' : 'Continuar',
  };

  return (
    <div className="relative min-h-screen">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="relative flex flex-col min-h-screen"
      >
        <main className='container mx-auto flex flex-col flex-grow overflow-hidden'>
          <div className='w-full max-w-6xl mx-auto flex flex-col min-h-[75vh] mb-4'>
            <div className='py-4 px-4 sm:px-5'>
              <a href='https://testador.mx'>
                <Image src={graylogo} width={150} height={150} alt="Testador Logo" />
              </a>
            </div>
            <div className='px-4 sm:px-5 flex-grow'>
              <div className='flex flex-col lg:flex-row gap-8 lg:gap-24 h-full'>
                {/* Left column - Title section */}
                <div className="hidden lg:block lg:w-1/3">
                  <div className="inline-flex items-center h-[32px] bg-[#f95940] bg-opacity-10 px-[12px] py-[6px] rounded-md mb-2.5 mt-5">
                    <span className="text-[#f95940] text-[14px] font-[400]">TESTAMENTO DIGITAL</span>
                  </div>

                  <h1 className="text-[32px] sm:text-[38px] font-[500] tracking-[-1.5px] leading-[1.2] sm:leading-[52px] mb-[15px]">
                    <span className="text-[#1d1d1f]">Protege tu </span>
                    <span
                      style={{
                        backgroundImage:
                          "linear-gradient(to left, #f95940 30%, #f95940 100%)",
                      }}
                      className="inline-block text-transparent bg-clip-text"
                    >
                      legado
                    </span>
                  </h1>

                  <p className="text-[16px] text-[#1d1d1f] leading-6 mb-8">
                    Asegura el futuro de tus seres queridos con un testamento digital seguro y legal.
                  </p>
                </div>

                {/* Right column - Content in white container */}
                <div className='w-full lg:w-3/5 flex items-center mt-[30px] lg:mt-0'>
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-4 sm:px-8 md:px-12 py-8 shadow-lg w-full max-w-xl mx-auto">
                    <h2 className="text-[22px] sm:text-[26px] font-[500] text-[#1d1d1f] mb-5">
                      {title}
                    </h2>

                    <div className="space-y-2">
                      <BenefitItem
                        title="Comparte lo que más valoras"
                        description="Distribuye tu patrimonio, incluyendo propiedades y cuentas, de manera justa entre tus seres queridos y/u organizaciones benéficas."
                      />
                      <BenefitItem
                        title="Proceso guiado y profesional"
                        description="Organiza la distribución de tus bienes con la ayuda de nuestro equipo experto, todo mediante una llamada telefónica."
                      />
                    </div>

                    <div className="mt-8">
                      <ContinueButton href={buttonConfig.href} text={buttonConfig.text} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <FooterTwo />
      </motion.div>
    </div>
  );
};

export default Benefits;