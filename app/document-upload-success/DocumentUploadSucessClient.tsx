'use client';

import { FC, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle } from 'phosphor-react';
import Image from 'next/image';
import graylogo from '@/assets/greylogo.png';

const DocumentUploadSucessClient: FC = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/plan-payment');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="relative min-h-screen bg-[#f5f5f7]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="relative flex flex-col min-h-screen"
      >
        <main className="container mx-auto flex flex-col flex-grow overflow-hidden">
          <div className="w-full max-w-6xl mx-auto flex flex-col min-h-[75vh] mb-4">
           
            
            <div className="flex-grow flex items-center justify-center px-4 sm:px-5">
              <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-lg max-w-2xl w-full text-center">
                <div className="flex justify-center mb-8">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle weight="fill" size={48} className="text-green-600" />
                  </div>
                </div>
                
                <h1 className="text-[28px] sm:text-[32px] font-[500] tracking-[-1px] leading-[1.2] mb-4">
                  <span className="text-[#1d1d1f]">Exito al subir tu </span>
                  <span
                    style={{
                      backgroundImage: "linear-gradient(to right, #34d399, #10b981)",
                    }}
                    className="inline-block text-transparent bg-clip-text"
                  >
                     identificación
                  </span>
                </h1>
                
                <p className="text-[16px] text-[#1d1d1f] mb-8">
                  Estamos preparando y certificando tu poliza de seguro. Este proceso tomará solo unos segundos.
                </p>

                <div className="flex justify-center items-center gap-3">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#047aff]"></div>
                  <span className="text-[15px] text-gray-600">Preparando documento...</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </motion.div>
    </div>
  );
};

export default DocumentUploadSucessClient;