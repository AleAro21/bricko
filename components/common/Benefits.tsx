'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import graylogo from '../../assets/greylogo.png';

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
      fill="#04724D"
      d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"
    />
  </svg>
);

interface BenefitItemProps {
  title: string;
  description: string;
}

const BenefitItem: React.FC<BenefitItemProps> = ({ title, description }) => (
  <div className="flex items-start py-2 gap-3">
    <CheckIcon className="w-[30px] h-[30px] my-1 min-h-[30px] min-w-[30px]" />
    <div>
      <p className="sm-title">{title}</p>
      <p className="text-style">{description}</p>
    </div>
  </div>
);

interface ContinueButtonProps {
  href: string;
  text: string;
}

const ContinueButton: React.FC<ContinueButtonProps> = ({ href, text }) => (
  <Link href={href}>
    <div className="w-full text-[14px] text-[#FFFFFF] font-[600] bg-[#0171e3] px-4 py-4 mt-2 rounded-[100px] uppercase text-center cursor-pointer">
      {text}
    </div>
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
    <>
      <div className="py-4">
        <Image src={graylogo} width={150} height={150} alt="Gray Logo" />
      </div>
      <div className="flex flex-col md:w-[50%] max-w-[500px] mx-auto items-center justify-center py-6 h-full min-h-[80vh]">
        <div>
          <p className="title py-2 text-center md:w-[80%] mx-auto">{title}</p>
          <div className="py-2">
            <div className="border rounded-[10px] p-4 w-full">
              <BenefitItem
                title="Comparte lo que más valoras"
                description="Distribuye tu patrimonio, incluyendo propiedades y cuentas, de manera justa entre tus seres queridos y/u organizaciones benéficas."
              />
              <BenefitItem
                title="Comparte lo que más valoras"
                description="Organiza la distribución de tus bienes con la ayuda de nuestro equipo experto, todo mediante una llamada telefónica."
              />
              <ContinueButton href={buttonConfig.href} text={buttonConfig.text} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Benefits;