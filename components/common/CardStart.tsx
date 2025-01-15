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
      className={`relative flex flex-col items-center p-6 rounded-xl transition-all duration-200 border cursor-pointer
        ${isSelected 
          ? 'bg-blue-50 border-blue-500' 
          : 'bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50'
        }`}
    >
      {isSelected && (
        <div className="absolute top-5 right-5 w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
          <FaCheck className="text-white text-xs" />
        </div>
      )}
      <div className={`w-15 h-15 flex items-center justify-center text-3xl mb-5 rounded-full transition-transform duration-200
        ${isSelected ? 'bg-white' : 'bg-white'}`}
      >
        {icon}
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-5">{title}</h3>
      <p className="text-sm text-gray-500 text-center">{description}</p>
    </div>
  );
}

export default CardStart;