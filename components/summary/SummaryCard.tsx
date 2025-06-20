'use client';

import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

interface SummaryCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href?: string;
}

const SummaryCard = ({ 
  icon, 
  title, 
  description,
  href
}: SummaryCardProps): JSX.Element => {
  const router = useRouter();

  const handleClick = () => {
    if (href) {
      router.push(href);
    }
  };

  return (
    <div    
      onClick={handleClick}
      className="relative flex flex-col items-start p-4 rounded-xl transition-all duration-500 cursor-pointer w-full h-full min-h-[160px] shadow-md hover:shadow-lg bg-white hover:scale-[1.02]"
    >
      <div className="absolute top-3 right-3 w-4 h-4 rounded-full bg-gray-100 flex items-center justify-center">
        <FaArrowRight className="text-gray-600 text-[10px]" />
      </div>
      <div className="flex items-center mb-2">
        <div className="w-8 h-8 flex items-center justify-center text-lg text-[#f95940]">
          {icon}
        </div>
      </div>
      <h3 className="text-[18px] text-[#000000] font-[500] mb-1 pr-2 tracking-[0.1px] leading-[1.3]">{title}</h3>
      <p className="text-[13px] font-[300] text-[#1d1d1f] mb-0 pr-4 tracking-[0.1px] leading-[1.3]">{description}</p>
    </div>
  );
};


export default SummaryCard;