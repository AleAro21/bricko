import React from 'react';
import { Check, X } from 'phosphor-react';

interface CardProps {
  linkNo: string;
  linkyes: string;
  titleNo: string;
  titleYes: string;
}

const Card: React.FC<CardProps> = ({ linkNo, linkyes, titleNo, titleYes }) => {
  const [selectedCard, setSelectedCard] = React.useState<'yes' | 'no' | null>(null);

  const handleCardClick = (type: 'yes' | 'no') => {
    setSelectedCard(type);
    if (type === 'yes') {
      window.location.href = linkyes;
    } else {
      window.location.href = linkNo;
    }
  };

  return (
    <div className="grid grid-cols-1 sm:flex sm:justify-center gap-6">
      <div
        onClick={() => handleCardClick('yes')}
        className={`relative flex flex-col items-start p-4 sm:p-4 rounded-xl transition-all duration-500 cursor-pointer w-full sm:w-[260px] h-auto min-h-[150px] sm:h-[280px] shadow-md hover:shadow-lg
          ${selectedCard === 'yes'
            ? 'bg-blue-50 border border-blue-500' 
            : 'bg-white hover:scale-[1.02]'
          }`}
      >
        {selectedCard === 'yes' && (
          <div className="absolute top-4 right-4 w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
            <Check weight="bold" className="text-white text-xs" />
          </div>
        )}
        <div className="flex items-center mb-3">
          <div className="w-10 h-10 flex items-center justify-center text-xl text-[#047aff]">
            <Check size={40} weight="thin" />
          </div>
        </div>
        <h3 className="text-[28px] text-[#1d1d1f] font-[500] mb-2 pr-2 tracking-[0.1px] leading-[1.3]">Sí</h3>
        <p className="text-[17px] font-[300] text-[#1d1d1f] mb-0 pr-4 tracking-[0.1px] leading-[1.3]">{titleYes}</p>
      </div>

      <div
        onClick={() => handleCardClick('no')}
        className={`relative flex flex-col items-start p-4 sm:p-4 rounded-xl transition-all duration-500 cursor-pointer w-full sm:w-[260px] h-auto min-h-[150px] sm:h-[280px] shadow-md hover:shadow-lg
          ${selectedCard === 'no' 
            ? 'bg-blue-50 border border-blue-500' 
            : 'bg-white hover:scale-[1.02]'
          }`}
      >
        {selectedCard === 'no' && (
          <div className="absolute top-4 right-4 w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
            <Check weight="bold" className="text-white text-xs" />
          </div>
        )}
        <div className="flex items-center mb-3">
          <div className="w-10 h-10 flex items-center justify-center text-xl text-[#ff3d51]">
            <X size={40} weight="thin" />
          </div>
        </div>
        <h3 className="text-[28px] text-[#1d1d1f] font-[500] mb-2 pr-2 tracking-[0.1px] leading-[1.3]">No</h3>
        <p className="text-[17px] font-[300] text-[#1d1d1f] mb-0 pr-4 tracking-[0.1px] leading-[1.3]">{titleNo}</p>
      </div>
    </div>
  );
}

export default Card;