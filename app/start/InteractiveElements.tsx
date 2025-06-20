"use client";

import { useState } from 'react';
import Card from '@/components/common/Card';
import { motion, AnimatePresence } from 'framer-motion';

interface InteractiveElementsProps {
  linkNo: string;
  linkyes: string;
  titleNo: string;
  titleYes: string;
  box: string;
}

export default function InteractiveElements({
  linkNo,
  linkyes,
  titleNo,
  titleYes,
  box,
}: InteractiveElementsProps) {
  const [selectedCard, setSelectedCard] = useState<'yes' | 'no' | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCardClick = (type: 'yes' | 'no') => {
    setSelectedCard(type);
    if (type === 'yes') {
      window.location.href = linkyes;
    } else {
      window.location.href = linkNo;
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsExpanded(false);
    }
  };

  return (
    <>
      <div className="w-full max-w-3xl mx-auto">
        <div className="mb-4">
          <div className="grid grid-cols-1 sm:flex sm:justify-center gap-6">
            <div
              onClick={() => handleCardClick('yes')}
              className={`relative flex flex-col items-start p-4 sm:p-4 rounded-xl transition-all duration-500 cursor-pointer w-full sm:w-[260px] h-auto min-h-[150px] sm:h-[280px] shadow-md hover:shadow-lg ${
                selectedCard === 'yes'
                  ? 'bg-[#f95940]/20 border border-blue-500'
                  : 'bg-white hover:scale-[1.02]'
              }`}
            >
              {selectedCard === 'yes' && (
                <div className="absolute top-4 right-4 w-5 h-5 rounded-full bg-[#f95940]/200 flex items-center justify-center">
                  {/* Yes icon */}
                </div>
              )}
              <h3 className="text-[28px] text-[#1d1d1f] font-[500] mb-2 pr-2 tracking-[0.1px] leading-[1.3]">Sí</h3>
              <p className="text-[17px] font-[300] text-[#1d1d1f] mb-0 pr-4 tracking-[0.1px] leading-[1.3]">
                {titleYes}
              </p>
            </div>

            <div
              onClick={() => handleCardClick('no')}
              className={`relative flex flex-col items-start p-4 sm:p-4 rounded-xl transition-all duration-500 cursor-pointer w-full sm:w-[260px] h-auto min-h-[150px] sm:h-[280px] shadow-md hover:shadow-lg ${
                selectedCard === 'no'
                  ? 'bg-[#f95940]/20 border border-blue-500'
                  : 'bg-white hover:scale-[1.02]'
              }`}
            >
              {selectedCard === 'no' && (
                <div className="absolute top-4 right-4 w-5 h-5 rounded-full bg-[#f95940]/200 flex items-center justify-center">
                  {/* No icon */}
                </div>
              )}
              <h3 className="text-[28px] text-[#1d1d1f] font-[500] mb-2 pr-2 tracking-[0.1px] leading-[1.3]">No</h3>
              <p className="text-[17px] font-[300] text-[#1d1d1f] mb-0 pr-4 tracking-[0.1px] leading-[1.3]">
                {titleNo}
              </p>
            </div>
          </div>
        </div>
        <div className="sm:flex sm:justify-center w-full">
          <div className="w-full sm:w-[calc(520px+1.5rem)] flex justify-end">
            <button
              onClick={() => setIsExpanded(true)}
              className="text-[14px] pt-5 sm:text-[14px] text-[#0066CC] font-[400] hover:underline"
            >
              ¿Cómo afecta mi testamento?
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50"
          >
            <div
              className="fixed inset-0 bg-black/50"
              onClick={handleOverlayClick}
            />
            <div className="relative bg-white rounded-2xl p-8 shadow-2xl w-full max-w-2xl z-10">
              <button
                onClick={() => setIsExpanded(false)}
                className="absolute top-4 right-4 w-8 h-8 bg-[#e8e8ed] rounded-full flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-[#6e6e73]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <h2 className="text-[30px] font-semibold text-[#1d1d1f] mb-4">
                ¿Cómo afecta mi testamento?
              </h2>
              <p className="text-[17px] font-[400] text-gray-700 tracking-[0.1px] leading-[1.6]">
                {box}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
