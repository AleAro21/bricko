'use client';

import { motion } from 'framer-motion';
import React, { FormEvent, useState } from 'react';
import Image from 'next/image';
import graylogo from '../../assets/greylogo.png';
import PrimaryButton from "@/components/reusables/PrimaryButton";
import FooterTwo from '@/components/common/FooterTwo';
import GradientCanvas from "@/components/reusables/GradientCanvas";
import Spinner from "@/components/reusables/Spinner";

interface FormData {
  country: string;
  email: string;
}

const WaitingList: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    country: '',
    email: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Handle form submission logic here
      console.log('Form submitted:', formData);
      // Add your API call here
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  return (
    <div className="relative min-h-screen">

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="relative flex flex-col min-h-screen"
      >
        <main className='container mx-auto flex flex-col flex-grow overflow-hidden'>
          <div className='w-full max-w-6xl mx-auto flex flex-col min-h-[75vh] mb-4'>
            <div className='py-4 px-4 sm:px-5'>
              <a href='https://testador.mx'>
                <Image src={graylogo} width={150} height={150} alt="Testador Logo" />
              </a>
            </div>
            <div className='px-4 sm:px-5 flex-grow'>
              <div className='flex flex-col lg:flex-row gap-8 lg:gap-24 h-full'>
                {/* Left column - Title section */}
                <div className="hidden lg:block lg:w-1/3">
                  <div className="inline-flex items-center h-[32px] bg-[#f95940] bg-opacity-10 px-[12px] py-[6px] rounded-md mb-2.5 mt-5">
                    <span className="text-[#f95940] text-[14px] font-[400]">LISTA DE ESPERA</span>
                  </div>

                  <h1 className="text-[32px] sm:text-[38px] font-[500] tracking-[-1.5px] leading-[1.2] sm:leading-[52px] mb-[15px]">
                    <span className="text-[#1d1d1f]">Próximamente en </span>
                    <span
                      style={{
                        backgroundImage:
                          "linear-gradient(to left, #f95940 30%, #f95940 100%)",
                      }}
                      className="inline-block text-transparent bg-clip-text"
                    >
                      tu país
                    </span>
                  </h1>

                  <p className="text-[16px] text-[#1d1d1f] leading-6 mb-8">
                    Estamos trabajando para expandir nuestros servicios a más países. 
                    Déjanos tus datos y te avisaremos cuando estemos disponibles en tu región.
                  </p>
                </div>

                {/* Right column - Form in white container */}
                <div className='w-full lg:w-3/5 flex items-center mt-[30px] lg:mt-0'>
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-4 sm:px-8 md:px-12 py-8 shadow-lg w-full max-w-xl mx-auto">
                    <h2 className="text-[22px] sm:text-[26px] font-[500] text-[#1d1d1f] mb-5">
                      Una disculpa, en este momento solo estamos disponibles en México
                    </h2>
                    <p className="text-[16px] text-gray-600 mb-6">
                      Si deseas saber cuándo estaremos disponibles en tu país, por favor,
                      déjanos tu dirección de correo electrónico y el país donde vives.
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div>
                        <label htmlFor="country" className="block text-[17px] font-[400] text-[#1d1d1f] mb-2.5">
                          País de Residencia
                        </label>
                        <input
                          type="text"
                          id="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 transition-all"
                          required
                          disabled={isLoading}
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-[17px] font-[400] text-[#1d1d1f] mb-2.5">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 transition-all"
                          required
                          disabled={isLoading}
                        />
                      </div>

                      <div className="flex justify-center pt-2.5">
                        <PrimaryButton type="submit" disabled={isLoading}>
                          {isLoading ? <Spinner size={24} /> : 'Enviar'}
                        </PrimaryButton>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <FooterTwo />
      </motion.div>
    </div>
  );
};

export default WaitingList;