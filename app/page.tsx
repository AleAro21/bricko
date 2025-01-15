"use client";

import { useState } from 'react';
import CardStart from "@/components/common/CardStart";
import { FaHeart, FaUser, FaUsers, FaHome } from 'react-icons/fa';
import Image from 'next/image';
import graylogo from '../assets/greylogo.png';
import { useRouter } from 'next/navigation';
import PrimaryButton from '@/components/reusables/PrimaryButton';
import Partner from "@/assets/Ring.png"
import Single from "@/assets/TrustPerson.png"
import Family from "@/assets/Family.png"
import Living from "@/assets/face_square.png"



export default function Home() {
  const router = useRouter();
  const [selectedCards, setSelectedCards] = useState<number[]>([]);

  const cards = [
    {
      icon: <Image src={Partner} width={70} height={70} alt="Partner icon" />,  
      title: "En Pareja",
      description: "Incluye compromiso, en unión libre o viviendo con tu pareja",
    },
    {
      icon: <Image src={Single} width={70} height={70} alt="Single icon" />,
      title: "Soltero",
      description: "Para personas que no están en una relación actualmente",
    },
    {
      icon: <Image src={Family} width={70} height={70} alt="Family icon" />,
      title: "Familia",
      description: "Para familias con hijos o dependientes",
    },
    {
      icon: <Image src={Living} width={70} height={70} alt="Living icon" />,
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
      <div className='flex flex-col items-center justify-center min-h-[80vh] w-full max-w-6xl mx-auto'>
        <h1 className='text-3xl font-medium mb-5 text-center'>
          Cuentanos un poco sobre ti
        </h1>
        <p className="text-lg text-gray-600 text-center mb-10 md:w-3/4 mx-auto">
          Selecciona las opciones que mejor describan tu situación actual
        </p>
        <div className='flex flex-wrap justify-center gap-5 w-full px-5 mb-10'>
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
        <div className="flex flex-col gap-5">
          <PrimaryButton 
            type="button"
            onClick={handleContinue}
          >
            Continuar
          </PrimaryButton>
          <button 
          onClick={handleContinue}
          className="mt-4 text-blue-500 hover:text-blue-500 transition-colors duration-200"
        >
          Ninguna aplica
        </button>
        </div>
      </div>
    </main>
  );
}