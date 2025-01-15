import React from 'react';
import Link from 'next/link';

interface CardProps {
  linkNo: string;
  linkyes: string;
  titleNo: string;
  titleYes: string;
}

const Card: React.FC<CardProps> = ({ linkNo, linkyes, titleNo, titleYes }) => {
  return (
    <div className="w-full flex flex-col sm:flex-row gap-4">
      <Link href={linkyes} className="flex-1">
        <div className="bg-white hover:bg-gray-50 border border-gray-200 rounded-2xl p-6 transition-all duration-300 transform hover:scale-[1.02] min-h-[160px] flex flex-col">
          <h3 className="text-2xl font-semibold mb-2 text-gray-900">Sí</h3>
          <p className="text-gray-600 flex-1">{titleYes}</p>
        </div>
      </Link>
      
      <Link href={linkNo} className="flex-1">
        <div className="bg-white hover:bg-gray-50 border border-gray-200 rounded-2xl p-6 transition-all duration-300 transform hover:scale-[1.02] min-h-[160px] flex flex-col">
          <h3 className="text-2xl font-semibold mb-2 text-gray-900">No</h3>
          <p className="text-gray-600 flex-1">{titleNo}</p>
        </div>
      </Link>
    </div>
  );
}

export default Card;