'use client';

import { motion } from 'framer-motion';
import { FC, FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import graylogo from '../../../assets/greylogo.png';
import FooterTwo from '@/components/common/FooterTwo';
import GradientCanvas from "@/components/reusables/GradientCanvas";
import Spinner from "@/components/reusables/Spinner";

const BookingWillPage: FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Handle form submission logic here
      console.log('Form submitted');
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen">
      <GradientCanvas />
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
                  <div className="inline-flex items-center h-[32px] bg-[#047aff] bg-opacity-10 px-[12px] py-[6px] rounded-md mb-2.5 mt-5">
                    <span className="text-[#047aff] text-[14px] font-[400]">TESTAMENTO TELEFÓNICO</span>
                  </div>

                  <h1 className="text-[32px] sm:text-[38px] font-[500] tracking-[-1.5px] leading-[1.2] sm:leading-[52px] mb-[15px]">
                    <span className="text-[#1d1d1f]">Agenda tu </span>
                    <span
                      style={{
                        backgroundImage:
                          "linear-gradient(to right, #7abaff 1%, #047aff 60%, #0d4ba3 100%)",
                      }}
                      className="inline-block text-transparent bg-clip-text"
                    >
                      llamada
                    </span>
                  </h1>

                  <p className="text-[16px] text-[#1d1d1f] leading-6 mb-8">
                    Nuestro equipo de expertos te guiará paso a paso en la creación de tu testamento.
                  </p>
                </div>

                {/* Right column - Form in white container */}
                <div className='w-full lg:w-3/5 flex items-center mt-[30px] lg:mt-0'>
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-4 sm:px-8 md:px-12 py-8 shadow-lg w-full max-w-xl mx-auto">
                    <h2 className="text-[22px] sm:text-[26px] font-[500] text-[#1d1d1f] mb-5">
                      Agenda tu llamada
                    </h2>
                    <p className="text-[16px] text-[#1d1d1f] leading-6 mb-8">
                      Nos pondremos en contacto contigo en breve para ayudarte a
                      evaluar tus necesidades y responder a tus preguntas.
                    </p>
                    
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div>
                        <label htmlFor="fullName" className="block text-[17px] font-[400] text-[#1d1d1f] mb-2.5">
                          Nombre Completo
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 transition-all"
                          required
                          disabled={isLoading}
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-[17px] font-[400] text-[#1d1d1f] mb-2.5">
                          Número de Teléfono
                        </label>
                        <input
                          type="tel"
                          id="phone"
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
                          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 transition-all"
                          required
                          disabled={isLoading}
                        />
                      </div>

                      <div className="flex justify-center pt-2.5">
                        <button
                          type="submit"
                          disabled={isLoading}
                          className="w-full text-[14px] text-white font-[600] bg-[#047aff] px-6 py-2.5 rounded-[100px] hover:bg-[#0366d6] transition-colors duration-200"
                        >
                          {isLoading ? <Spinner size={24} /> : 'Enviar'}
                        </button>
                      </div>

                      <p className="text-[14px] text-gray-500 text-center mt-4">
                        Al hacer clic en "Enviar", aceptas nuestros{' '}
                        <a href="#" className="text-[#047aff] hover:underline">
                          Términos y Condiciones
                        </a>{' '}
                        y nuestra{' '}
                        <a href="#" className="text-[#047aff] hover:underline">
                          Política de Privacidad
                        </a>
                        .
                      </p>
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

export default BookingWillPage;