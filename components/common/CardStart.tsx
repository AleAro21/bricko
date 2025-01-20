import React from 'react';
import { FaCheck } from 'react-icons/fa';

interface CardStartProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  isSelected: boolean;
  onClick: () => void;
}

const CardStart: React.FC<CardStartProps> = ({ icon, title, description, isSelected, onClick }) => {
  return (
    <div    
      onClick={onClick}
      className={`relative flex flex-col items-start p-4 sm:p-6 rounded-xl transition-all duration-200 cursor-pointer w-full h-auto min-h-[150px] sm:min-h-[280px]
        ${isSelected 
          ? 'bg-blue-50 border border-blue-500' 
          : 'bg-white hover:bg-gray-50'
        }`}
    >
      {isSelected && (
        <div className="absolute top-4 right-4 w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
          <FaCheck className="text-white text-xs" />
        </div>
      )}
      <div className="flex items-center mb-3">
        <div className="w-10 h-10 flex items-center justify-center text-xl text-[#333336]">
          {icon}
        </div>
      </div>
      <h3 className="text-[18px] sm:text-[20px] text-[#1d1d1f] font-[500] mb-2 pr-2 tracking-[0.1px] leading-[1.3]">{title}</h3>
      <p className="text-[14px] font-[300] text-[#1d1d1f] mb-0 pr-4 tracking-[0.1px] leading-[1.3]">{description}</p>
    </div>
  );
};

export default CardStart;