'use client';

import React, { useState, useEffect, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FaUser, FaPhoneAlt, FaSms } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import graylogo from '@/assets/greylogo.png';
import PrimaryButton from '@/components/reusables/PrimaryButton';

interface OTPInputProps {
  length?: number;
  onComplete?: (otp: string) => void;
}

const OTPInput: React.FC<OTPInputProps> = ({ length = 6, onComplete }) => {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(''));
  const [timer, setTimer] = useState<number>(30);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const router = useRouter();

  const handleChange = (element: HTMLInputElement, index: number): void => {
    if (isNaN(Number(element.value))) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.nextSibling) {
      (element.nextSibling as HTMLInputElement).focus();
    }
  };

  const handleSubmit = (): void => {
    const otpString = otp.join('');
    if (onComplete) {
      onComplete(otpString);
    }
    router.push('/start/congratulation');
  };

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [timer]);

  const resetTimer = (): void => {
    setTimer(30);
  };

  const togglePopup = (): void => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative bg-gray-100">
      <div className="absolute top-4 left-40">
        <Image src={graylogo} alt="Logo" width={100} />
      </div>

      <div className="container w-3/4 mx-auto flex flex-col relative">
        <div className="flex flex-col lg:flex-row items-start lg:items-start space-y-8 lg:space-y-0 lg:space-x-8 mt-8">
          <div className="lg:w-1/2 w-full">
            <h2 className="text-gray-500 text-lg font-bold mb-2 uppercase">
              Verificación en 2 pasos
            </h2>
            <p className="text-2xl font-semibold mb-4">
              Ingresa el código que te enviamos por WhatsApp
            </p>
            <p className="text-gray-600 mb-6">
              Es un código de 6 dígitos enviado al teléfono terminado en 4558.
            </p>
            <div className="flex items-center mb-4 p-4 bg-gray-50 border border-gray-300 rounded-full shadow-sm">
              <FaUser className="text-blue-600 text-xl mr-2" />
              <span className="text-gray-700">
                correodeusuario@testamento.com
              </span>
            </div>
            <div className="border-b border-gray-300 my-4 w-full px-4"></div>
            <a href="#" className="text-blue-600 text-sm">
              Necesito ayuda
            </a>
          </div>

          <div className="lg:w-[70%] w-full max-w-xl p-8 bg-white rounded-2xl shadow-lg flex flex-col items-center relative">
            <p className="text-sm text-gray-500 mb-2">Ingresa el código</p>
            <div className="otp-inputs flex space-x-2 mb-4">
              {otp.map((data, index) => (
                <input
                  className="w-12 h-12 border rounded-lg text-center text-xl focus:outline-none focus:border-blue-500 border-gray-300"
                  type="text"
                  maxLength={1}
                  key={index}
                  value={data}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e.target, index)}
                  onFocus={(e) => e.target.select()}
                />
              ))}
            </div>

            <div className="flex w-full justify-start mb-4">
              <p className="text-gray-500 text-sm">
                {timer > 0 ? (
                  `Reenviar código en 00:${timer < 10 ? `0${timer}` : timer}`
                ) : (
                  <span
                    className="text-blue-600 cursor-pointer"
                    onClick={resetTimer}
                  >
                    Reenviar código
                  </span>
                )}
              </p>
            </div>

            <div className="flex w-full items-center justify-between">
              <PrimaryButton onClick={handleSubmit}>Continuar</PrimaryButton>
              <a
                href="#"
                onClick={togglePopup}
                className="text-blue-600 text-sm ml-4 whitespace-nowrap"
              >
                Elegir otro método
              </a>
            </div>

            <AnimatePresence>
              {showPopup && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="absolute top-0 lg:left-full lg:ml-4 mt-8 lg:mt-0 bg-white rounded-2xl shadow-lg p-6 w-64 z-50"
                >
                  <h3 className="text-lg font-semibold mb-6 text-gray-700">
                    Elegir método
                  </h3>
                  <button
                    onClick={togglePopup}
                    className="absolute top-4 right-4 text-gray-500 text-xl focus:outline-none"
                  >
                    &times;
                  </button>
                  <div className="flex items-center mb-6 cursor-pointer hover:bg-gray-100 p-3 rounded-lg w-full">
                    <FaPhoneAlt className="text-blue-600 mr-3" />
                    <span className="text-gray-800">Mandar por llamada</span>
                  </div>
                  <div className="flex items-center cursor-pointer hover:bg-gray-100 p-3 rounded-lg w-full">
                    <FaSms className="text-blue-600 mr-3" />
                    <span className="text-gray-800">Mandar por SMS</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPInput;