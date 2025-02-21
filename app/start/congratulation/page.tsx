'use client';

import { FC, useState, useEffect } from "react";
import CardStart from "@/components/common/CardStart";
import { Globe, Users, Newspaper, Buildings } from 'phosphor-react';
import { useRouter } from 'next/navigation';
import PrimaryButton from '@/components/reusables/PrimaryButton';
import graylogo from '../../../assets/greylogo.png';
import Image from 'next/image';
import { useUser } from "@/context/UserContext";
import { motion } from 'framer-motion';

type ItemData = {
  id: number;
  name: string;
};

type DataItem = {
  items: {
    itemData: ItemData[] | null;
  };
};

export default function CongratulationsPage() {
  const router = useRouter();
  const [childData, setChildData] = useState<ItemData[] | null>(null);
  const { user, setUser } = useUser();
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const maxSelections = 1;

  useEffect(() => {
    const checkUser = () => {
      const storedUser = sessionStorage.getItem('userObject');
      if (storedUser && !user) {
        setUser(JSON.parse(storedUser));
      } else if (!user && !sessionStorage.getItem('userId')) {
        router.push('/start/login');
      }
    };

    checkUser();
  }, []); // Only run on mount

  const cards = [
    {
      icon: <Globe size={70} weight="thin" />,
      title: "Internet",
      description: "Google, redes sociales, sitio web o app",
    },
    {
      icon: <Users size={70} weight="thin" />,
      title: "Recomendación",
      description: "Amigos, familia o colegas",
    },
    {
      icon: <Buildings size={70} weight="thin" />,
      title: "Producto",
      description: "Banco, Seguro, Afore o Pensión",
    },
    {
      icon: <Newspaper size={70} weight="thin" />,
      title: "Medios",
      description: "Periódico, revista, TV o radio",
    }
  ];

  const handleCardClick = (index: number) => {
    setSelectedCards(prev => {
      if (prev.includes(index)) {
        return prev.filter(i => i !== index);
      } else {
        if (maxSelections && prev.length >= maxSelections) {
          return [...prev.slice(1), index];
        }
        return [...prev, index];
      }
    });
  };

  const handleContinue = () => {
    router.push('/about-yourself/name');
  };

  const userName = user?.name || '';

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
              <span className='bg-gradient-to-r from-[#3d9bff] to-[#047aff] inline-block text-transparent bg-clip-text'>
                ¡Felicidades {userName}!
              </span>
              <span className='text-[#1d1d1f]'> Estás un paso más cerca de la tranquilidad</span>
            </h1>
            <p className="text-[18px] sm:text-[20px] font-[400] tracking-[-0.1px] leading-[1.3] text-[#1d1d1f] text-start mb-[5px] sm:mb-[55px]">
              Nos encantaría saber, ¿cómo descubriste Testamento.mx?
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
              Ninguno aplica
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