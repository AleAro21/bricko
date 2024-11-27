'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import graylogo from '../../assets/greylogo.png';

interface CardLinkProps {
  href: string;
  title: string;
}

const CardLink: React.FC<CardLinkProps> = ({ href, title }) => (
  <Link
    href={href}
    className='bg-white h-[80px] w-[220px] rounded-[20px] text-center flex flex-col p-4 items-center hover:border cursor-pointer'
  >
    <p className='title h-[50px]'>{title}</p>
  </Link>
);

interface BackButtonProps {
  onClick: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick }) => (
  <div
    onClick={onClick}
    className='flex items-center text-[14px] font-[500] gap-2 pt-1 text-[#9999] cursor-pointer border-b border-transparent hover:border-[#9999] transition-all delay-150'
  >
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 448 512'
      height={18}
      width={18}
    >
      <path
        fill='#9999'
        d='M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z'
      />
    </svg>
    Back
  </div>
);

const Country: React.FC = () => {
  const router = useRouter();

  return (
    <>
      <div className='py-4'>
        <Image 
          src={graylogo} 
          width={100} 
          height={100} 
          alt="Testador Logo"
        />
      </div>
      <div className='flex flex-col mx-auto items-center justify-center p-24 h-[80vh]'>
        <p className='title py-4'>Do you live in North America?</p>
        <div className='flex gap-2'>
          <CardLink
            href='/start/property'
            title='NO'
          />
          <CardLink
            href='/start/property'
            title='Yes'
          />
        </div>
        <BackButton onClick={() => router.back()} />
      </div>
    </>
  );
};

export default Country;