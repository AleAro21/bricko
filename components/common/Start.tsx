'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Card from '@/components/common/Card';
import { motion } from 'framer-motion';
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

  return (
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
              width={100} 
              height={100} 
              alt="Testador Logo"
            />
          </motion.a>
        </div>
        <div className='flex flex-col justify-start min-h-[80vh] px-4 sm:px-5'>
          <div className="mb-8 sm:mb-[30px] py-14">
            <h1 className='text-[32px] sm:text-[46px] font-[500] tracking-[-1.5px] leading-[1.2] sm:leading-[52px] mb-[5px] mt-[10px] text-start text-[#1d1d1f]'>
              {heading}
            </h1>
            <p className="text-[18px] sm:text-[20px] font-[400] tracking-[-0.1px] leading-[1.3] text-[#1d1d1f] text-start">
              Selecciona las opciones que <br className="hidden sm:block" /> mejor describan tu situación
            </p>
          </div>

          <div className='w-full max-w-3xl mx-auto mb-8 sm:mb-10'>
            <Card
              linkNo={linkNo}
              linkyes={linkyes}
              titleNo={titleNo}
              titleYes={titleYes}
            />
          </div>

          <motion.div 
            className="w-full max-w-2xl mx-auto mt-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="bg-[#D8F1FF] rounded-xl p-6 border border-blue-500/20 overflow-hidden cursor-pointer group shadow-sm hover:shadow-md transition-all duration-200"
              whileHover={{ y: -2 }}
              animate={{ height: isExpanded ? "auto" : "auto" }}
              transition={{ duration: 0.2 }}   
              onClick={() => setIsExpanded(!isExpanded)}       
            >
              <div className="flex items-start justify-between">
                <h2 className="text-[18px] sm:text-[20px] text-[#1d1d1f] font-[500] mb-2 tracking-[0.1px] leading-[1.3]">
                  ¿Cómo afecta mi testamento?
                </h2>
                <motion.div 
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-[#0066CC] mt-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </motion.div>
              </div>
              <motion.div
                animate={{ 
                  height: isExpanded ? "auto" : "100px",
                  opacity: isExpanded ? 1 : 0.9
                }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <p className="text-[14px] font-[300] text-[#1d1d1f] tracking-[0.1px] leading-[1.5] transform origin-top transition-all duration-200 ease-out">
                  {box}
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default Start;