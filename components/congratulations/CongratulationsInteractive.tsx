'use client';
import { useState } from 'react';
import CardStart from '@/components/common/CardStart';
import { Globe, Users, Newspaper, Buildings } from 'phosphor-react';
import { useRouter } from 'next/navigation';
import PrimaryButton from '@/components/reusables/PrimaryButton';
import Spinner from '@/components/reusables/Spinner';
import { flushSync } from 'react-dom';

export default function CongratulationsInteractive() {
  const router = useRouter();
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const maxSelections = 1;

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
    if (isLoading) return;
    
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

  const handleContinue = async () => {
    // Force the spinner to show immediately
    flushSync(() => {
      setIsLoading(true);
    });

    try {
      // Here you could add any API calls needed before navigation
      router.push('/about-yourself/name');
    } catch (error) {
      console.error('Navigation error:', error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full mb-8 sm:mb-10">
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
        <PrimaryButton type="button" onClick={handleContinue} disabled={isLoading}>
          {isLoading ? <Spinner size={24} /> : "Continuar"}
        </PrimaryButton>
        <button
          onClick={handleContinue}
          disabled={isLoading}
          className="text-[14px] font-[400] text-[#0066CC] hover:text-[#0066CC] hover:underline transition-colors duration-200 flex items-center justify-center gap-1 tracking-[-0.22px] leading-[20px] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Ninguno aplica
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </>
  );
}