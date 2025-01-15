'use client';

import React from 'react';
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
  const dynamicTitle = heading.split("¿")[1]?.split("?")[0] || heading;

  return (
    <main className='container mx-auto flex flex-col min-h-screen'>
      <div className='py-5 px-20'>
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
      
      <div className='flex flex-col items-center justify-center min-h-[80vh] w-full max-w-6xl mx-auto px-5'>
        <div className='w-full flex flex-col items-center mb-10'>
          <h1 className='text-3xl font-medium mb-10 text-center'>{heading}</h1>
          
          <div className='w-full max-w-2xl'>
            <Card
              linkNo={linkNo}
              linkyes={linkyes}
              titleNo={titleNo}
              titleYes={titleYes}
            />
          </div>
        </div>

        <motion.div 
          className="w-full max-w-2xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            className="bg-blue-500/10 rounded-xl p-5 border border-blue-500/20 overflow-hidden cursor-pointer group"
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <h2 className="text-xl font-medium text-gray-900 mb-5">
              ¿Cómo afecta mi testamento?
              {/* {dynamicTitle.toLowerCase()} */}
       
            </h2>
            <p className="text-gray-600 transform origin-top transition-all duration-200 ease-out opacity-80 group-hover:opacity-100">
              {box}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
};

export default Start;