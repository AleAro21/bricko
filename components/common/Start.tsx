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
  const dynamicTitle = heading.split("¿")[1]?.split("?")[0] || heading;
  const [isExpanded, setIsExpanded] = useState(false); // Add this state

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
          className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-5 border border-blue-500/20 overflow-hidden cursor-pointer group"
          whileHover={{ y: -2 }}
          animate={{ height: isExpanded ? "auto" : "auto" }}
          transition={{ duration: 0.2 }}   
          onClick={() => setIsExpanded(!isExpanded)}       
        >
          <h2 className="text-xl font-medium text-gray-900 mb-5">
            ¿Cómo afecta mi testamento?
          </h2>
          <motion.p 
            className="text-gray-600 transform origin-top transition-all duration-200 ease-out opacity-80 group-hover:opacity-100"
            animate={{ height: isExpanded ? "auto" : "100px" }}
            style={{ overflow: "hidden" }}
          >
            {box}
          </motion.p>
          <motion.div 
            className="mt-2 text-blue-600 text-sm"
            animate={{ opacity: 1 }}
          >
            {isExpanded ? "Ver menos" : "Ver más"}
             
          </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
};

export default Start;