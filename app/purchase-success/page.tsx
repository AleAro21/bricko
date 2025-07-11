'use client';

import { FC, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle, Coins, TrendUp } from 'phosphor-react';

const PurchaseSuccessClient: FC = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/profile');
    }, 4000);

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
                  <span className="text-[#1d1d1f]">¡Compra </span>
                  <span
                    style={{
                      backgroundImage: "linear-gradient(to right, #f95940, #f95940)",
                    }}
                    className="inline-block text-transparent bg-clip-text"
                  >
                    exitosa!
                  </span>
                </h1>
                
                <p className="text-[16px] text-[#1d1d1f] mb-8">
                  Felicidades, ahora eres propietario de tokens inmobiliarios. 
                  Tus tokens han sido registrados en la blockchain.
                </p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-[#f95940]/20 rounded-xl p-4">
                    <div className="flex items-center justify-center mb-2">
                      <Coins className="text-[#f95940] w-6 h-6" />
                    </div>
                    <p className="text-[14px] text-gray-600 mb-1">Tokens adquiridos</p>
                    <p className="text-[18px] font-[600] text-[#f95940]">10</p>
                  </div>
                  <div className="bg-green-50 rounded-xl p-4">
                    <div className="flex items-center justify-center mb-2">
                      <TrendUp className="text-green-600 w-6 h-6" />
                    </div>
                    <p className="text-[14px] text-gray-600 mb-1">Rendimiento estimado</p>
                    <p className="text-[18px] font-[600] text-green-600">12.5% anual</p>
                  </div>
                </div>

                <div className="flex justify-center items-center gap-3">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#f95940]"></div>
                  <span className="text-[15px] text-gray-600">Redirigiendo a tu perfil...</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </motion.div>
    </div>
  );
};

export default PurchaseSuccessClient;