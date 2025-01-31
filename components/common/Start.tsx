'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Card from '@/components/common/Card';
import { motion, AnimatePresence } from 'framer-motion';
import graylogo from '../../assets/greylogo.png';

interface StartProps {
  heading: string;
  linkNo: string;
  linkyes: string;
  titleNo: string;
  titleYes: string;
  box: string;
}

const Start: React.FC<StartProps> = ({
  heading,
  linkNo,
  linkyes,
  titleNo,
  titleYes,
  box,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsExpanded(false);
    }
  };

  return (
    <>
      <main className='container mx-auto flex flex-col min-h-screen'>
        <div className='w-full max-w-6xl mx-auto'>
          <div className='py-5 px-4 sm:px-5'>
            <motion.a
              href='https://testador.mx'
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Image
                src={graylogo}
                width={150}
                height={150}
                alt="Testador Logo"
              />
            </motion.a>
          </div>
          <div className='flex flex-col justify-start min-h-[80vh] px-4 sm:px-5'>
            <div className="mb-8 sm:mb-[30px] py-14">
              <div className='max-w-[800px]'>
                <h1 className='text-[32px] sm:text-[46px] font-[500] tracking-[-1.5px] leading-[1.2] sm:leading-[52px] mb-[5px] mt-[0px] text-start text-[#1d1d1f]'>
                  {heading}
                </h1>
                <p className="text-[18px] sm:text-[20px] font-[300] tracking-[-0.1px] leading-[1.3] text-[#1d1d1f] text-start whitespace-nowrap sm:whitespace-normal">
                  Selecciona las opciones que mejor describan tu situación
                </p>
              </div>
            </div>

            <div className='w-full max-w-3xl mx-auto'>
              <div className='mb-4'>
                <Card
                  linkNo={linkNo}
                  linkyes={linkyes}
                  titleNo={titleNo}
                  titleYes={titleYes}
                />
              </div>

              <div className='sm:flex sm:justify-center w-full'>
                <div className='w-full sm:w-[calc(520px+1.5rem)] flex justify-end'>
                  <button
                    onClick={() => setIsExpanded(true)}
                    className="text-[14px] pt-5 sm:text-[14px] text-[#0066CC] font-[400] hover:underline"
                  >
                    ¿Cómo afecta mi testamento?
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50"
          >
            {/* Apply the onClick event only on the backdrop */}
            <div className="fixed inset-0 bg-black/50" onClick={handleOverlayClick} />

            <div className="relative bg-white rounded-2xl p-8 shadow-2xl w-full max-w-2xl z-10">
              <button
                onClick={() => setIsExpanded(false)}
                className="absolute top-4 right-4 w-8 h-8 bg-[#e8e8ed] rounded-full flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text[#6e6e73]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
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
};

export default Start;