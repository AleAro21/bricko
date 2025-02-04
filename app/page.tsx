'use client';

import { useState } from 'react';
import CardStart from "@/components/common/CardStart";
import { Heartbeat, Headphones, HourglassMedium, CreditCard } from 'phosphor-react';
import { useRouter } from 'next/navigation';
import PrimaryButton from '@/components/reusables/PrimaryButton';
import graylogo from '../assets/greylogo.png';
import Image from 'next/image';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { motion } from 'framer-motion';

export default function Home() {
  const router = useRouter();
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const maxSelections = 4; 

  const cards = [
    {
      icon: <Heartbeat size={70} weight="thin" />,
      title: "Save ",
      description: "Get $180-$650 in credit toward iPhone 16 or iPhone 16 Pro ",
    },
    {
      icon: <Headphones size={70} weight="thin" />,
      title: "Soltero",
      description: "Para personas que no están en una relación actualmente",
    },
    {
      icon: <HourglassMedium size={40} weight="thin" />,
      title: "Familia",
      description: "Para familias con hijos o dependientes",
    },
    {
      icon: <CreditCard size={70} weight="thin" />,
      title: "Convivencia",
      description: "Para personas que comparten vivienda",
    }
  ];

  const handleCardClick = (index: number) => {
    setSelectedCards(prev => {
      if (prev.includes(index)) {
        return prev.filter(i => i !== index);
      } else {
        if (maxSelections && prev.length >= maxSelections) {
          return [index]; // Replace the existing selection with the new one
        }
        return [...prev, index];
      }
    });
  };

  const handleContinue = () => {
    router.push('/start/childern');
  };

  return (
    <motion.main 
      className='container mx-auto flex flex-col min-h-screen'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
    >
      <div className='w-full max-w-6xl mx-auto'>
        <div className='py-5 px-4 sm:px-5'>
          <a href='https://testador.mx'>
            <Image 
              src={graylogo} 
              width={150}
              height={150}
              alt="Testador Logo"
            />
          </a>
        </div>
        <div className='flex flex-col justify-start sm:justify-center min-h-[80vh] px-4 sm:px-5'>
          <div className="mb-8 sm:mb-[30px]">
            <h1 className='text-[32px] sm:text-[46px] font-[500] tracking-[-1.5px] leading-[1.2] sm:leading-[52px] mb-[15px]'>
              <span className='text-[#1d1d1f]'>Cuentanos de </span>
              <span className='bg-gradient-to-r from-[#3d9bff] to-[#047aff] inline-block text-transparent bg-clip-text'>ti</span>
            </h1>
            <p className="text-[18px] sm:text-[20px] font-[400] tracking-[-0.1px] leading-[1.3] text-[#1d1d1f] text-start mb-6 sm:mb-[55px]">
              Selecciona las opciones que mejor describan tu situación
            </p>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full mb-8 sm:mb-10'>
            {cards.map((card, index) => (
              <div key={index} className="w-full">
                <CardStart
                  icon={card.icon}
                  title={card.title}
                  description={card.description}
                  isSelected={selectedCards.includes(index)}
                  onClick={() => handleCardClick(index)}
                  maxSelections={maxSelections}
                  currentSelections={selectedCards.length}
                />
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center sm:items-end w-full gap-4 pb-8 sm:pb-0">
            <PrimaryButton 
              type="button"
              onClick={handleContinue}
            >
              Continuar
            </PrimaryButton>
            <button 
              onClick={handleContinue}
              className="text-[14px] font-[400] text-[#0066CC] hover:text-[#0066CC] hover:underline transition-colors duration-200 flex items-center justify-center gap-1 tracking-[-0.22px] leading-[20px]"
            >
              Ninguna aplica
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </motion.main>
  );
}