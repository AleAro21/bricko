'use client';

import React from 'react';
import Image from 'next/image';
import Card from '@/components/common/Card';
import graylogo from '../../assets/greylogo.png';

interface StartProps {
  heading: string;
  linkNo: string;
  linkyes: string;
  titleNo: string;
  titleYes: string;
}

const Start: React.FC<StartProps> = ({
  heading,
  linkNo,
  linkyes,
  titleNo,
  titleYes,
}) => {
  return (
    <>
      <div className='py-4'>
        <a href='https://testador.mx' className='w-full'>
          <Image 
            src={graylogo} 
            width={100} 
            height={100} 
            alt="Testador Logo"
          />
        </a>
      </div>
      <div className='flex flex-col md:w-[50%] max-w-[500px] mx-auto items-center justify-center h-[80vh]'>
        <p className='text-[30px] font-[500] py-4 text-center'>{heading}</p>
        <Card
          linkNo={linkNo}
          linkyes={linkyes}
          titleNo={titleNo}
          titleYes={titleYes}
        />
      </div>
    </>
  );
};

export default Start;