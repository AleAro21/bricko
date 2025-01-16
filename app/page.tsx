"use client";

import { useState } from 'react';
import CardStart from "@/components/common/CardStart";
import { FaHeart, FaUser, FaUsers, FaHome } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import PrimaryButton from '@/components/reusables/PrimaryButton';
import graylogo from '../assets/greylogo.png';
import Image from 'next/image';

export default function Home() {
  const router = useRouter();
  const [selectedCards, setSelectedCards] = useState<number[]>([]);

  const cards = [
    {
      icon: <FaHeart size={70} />,
      title: "Save with Apple Trade In.",
      description: "Get $180-$650 in credit toward iPhone 16 or iPhone 16 Pro when you trade in iPhone 12 or higher.",
    },
    {
      icon: <FaHeart size={70} />,
      title: "Soltero",
      description: "Para personas que no están en una relación actualmente",
    },
    {
      icon: <FaHeart size={70} />,
      title: "Familia",
      description: "Para familias con hijos o dependientes",
    },
    {
      icon: <FaHeart size={70} />,
      title: "Convivencia",
      description: "Para personas que comparten vivienda",
    }
  ];

  const handleCardClick = (index: number) => {
    setSelectedCards(prev => {
      if (prev.includes(index)) {
        return prev.filter(i => i !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  const handleContinue = () => {
    router.push('/start/childern');
  };

  return (
    <main className='container mx-auto flex flex-col min-h-screen'>
      <div className='py-5 px-20'>
        <a href='https://testador.mx'>
          <Image 
            src={graylogo} 
            width={100}
            height={100}
            alt="Testador Logo"
          />
        </a>
      </div>
      <div className='flex flex-col justify-center min-h-[80vh] w-full max-w-6xl mx-auto'>
        <div className="px-5 mb-[30px]">
          <h1 className='text-[40px] font-[400] tracking-normal mb-[15px] text-start text-[#1d1d1f]'>
            Cuéntanos un poco sobre ti
          </h1>
          <p className="text-[17px] font-[200] tracking-normal text-[#1d1d1f] text-start mb-[30px]">
            Selecciona las opciones que mejor describan tu situación actual
          </p>
        </div>
        <div className='flex flex-wrap justify-between w-full px-5 mb-10'>
          {cards.map((card, index) => (
            <div key={index} className="w-64">
              <CardStart
                icon={card.icon}
                title={card.title}
                description={card.description}
                isSelected={selectedCards.includes(index)}
                onClick={() => handleCardClick(index)}
              />
            </div>
          ))}
        </div>
        <div className="flex flex-col items-end w-full px-5 gap-4">
          <PrimaryButton 
            type="button"
            onClick={handleContinue}
          >
            Continuar
          </PrimaryButton>
          <button 
            onClick={handleContinue}
            className="text-[14px] font-[400] text-[#0066CC] hover:text-[#0066CC] hover:underline transition-colors duration-200 flex items-center gap-1"
          >
            Ninguna aplica
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mt-[1px]" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </main>
  );
}
