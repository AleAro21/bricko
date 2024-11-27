import React, { ReactNode } from 'react';
import Image from 'next/image';
import Navbar from './Navbar';
import Footer from './Footer';
import logo from '../../assets/CustomerSupport.png';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className='w-full relative'>
      <Navbar />
      <div className='w-full'>{children}</div>
      <Footer />
      <div className="fixed bottom-[20px] right-[20px]">
        <div className="bg-yellow-400 cursor-pointer rounded-full h-[50px] w-[50px] flex items-center justify-center">
          <Image 
            src={logo} 
            alt="Customer Support"
            className='w-full h-full rounded-full'
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;