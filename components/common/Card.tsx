import React from 'react';
import Link from 'next/link';

interface CardProps {
  linkNo: string;
  linkyes: string;
  titleNo: string;
  titleYes: string;
}

const Card: React.FC<CardProps> = ({ linkNo, linkyes, titleNo, titleYes }) => {
  const cardBaseClasses = 'bg-white border border-gray-200 w-full max-w-[220px] py-4 px-4 rounded-[20px] transition-transform duration-300 ease-out transform hover:-translate-y-2 hover:shadow-lg';
  const transitionStyle = { transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)' };

  return (
    <div className='flex justify-center gap-3 w-full text-center'>
      <Link
        href={linkNo}
        className={cardBaseClasses}
        style={transitionStyle}
      >
        <p className='text-[30px] font-[500]'>No</p>
        <p className='text-[16px] text-[#000000] font-[400]'>{titleNo}</p>
      </Link>
      <Link
        href={linkyes}
        className={cardBaseClasses}
        style={transitionStyle}
      >
        <p className='text-[30px] font-[500]'>Sí</p>
        <p className='text-[16px] text-[#000000] font-[400]'>{titleYes}</p>
      </Link>
    </div>
  );
};

export default Card;