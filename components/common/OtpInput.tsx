"use client";

import React, { useState, useEffect, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FaUser, FaPhoneAlt, FaSms, FaWhatsapp } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import graylogo from '@/assets/greylogo.png';
import PrimaryButton from '@/components/reusables/PrimaryButton';
import User from "@/assets/TrustPerson.png";
import { confirmSignUp, resendSignUpCode, fetchAuthSession, signIn } from "aws-amplify/auth";
import { apiService } from '@/app/apiService';
import { useUser } from '@/context/UserContext';

interface OTPInputProps {
  length?: number;
  onComplete?: (otp: string) => void;
}

interface VerificationMethod {
  id: string;
  icon: React.ReactNode;
  label: string;
}

const OTPInput: React.FC<OTPInputProps> = ({ length = 6, onComplete }) => {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(''));
  const [timer, setTimer] = useState<number>(30);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [currentMethodIndex, setCurrentMethodIndex] = useState<number>(0);
  const router = useRouter();
  const { setUser } = useUser();

  const verificationMethods: VerificationMethod[] = [
    { id: 'whatsapp', icon: <FaWhatsapp className="text-2xl" />, label: 'WhatsApp' },
    { id: 'sms', icon: <FaSms className="text-2xl" />, label: 'SMS' },
    { id: 'call', icon: <FaPhoneAlt className="text-2xl" />, label: 'Llamada' },
  ];

  const rotateVerificationMethod = () => {
    setCurrentMethodIndex((prevIndex) =>
      (prevIndex + 1) % verificationMethods.length
    );
    resetTimer();
  };

  const handleChange = (element: HTMLInputElement, index: number): void => {
    if (isNaN(Number(element.value))) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.nextSibling && element.value !== '') {
      (element.nextSibling as HTMLInputElement).focus();
    }
  };

  const handleSubmit = async (): Promise<void> => {
    const otpString = otp.join("");
    const email = sessionStorage.getItem("email");
    
    if (!email) {
      alert("No se encontró el correo electrónico. Por favor, regresa al paso anterior.");
      return;
    }

    try {
      // Confirm signup
      await confirmSignUp({ username: email, confirmationCode: otpString });
      
      // Sign in
      const password = sessionStorage.getItem("password");
      if (!password) {
        throw new Error("Password not found in session storage");
      }

      const { isSignedIn } = await signIn({ username: email, password });
      if (!isSignedIn) {
        throw new Error("Sign in failed");
      }

      // Get tokens
      const { tokens } = await fetchAuthSession();
      if (!tokens?.accessToken) {
        throw new Error("Failed to retrieve tokens");
      }

      // Set token in API service
      apiService.setToken(tokens.accessToken.toString());

      // Create user
      const userData = {
        firstName: sessionStorage.getItem("firstName"),
        lastName: sessionStorage.getItem("lastName"),
        middleName: sessionStorage.getItem("middleName"),
        email,
        acceptTerms: true,
        acceptOffers: true,
      };

      const createdUser = await apiService.createUser(userData);
      
      // Store user ID and set user in context
      sessionStorage.setItem('userId', createdUser.id);
      setUser(createdUser);

      router.push("/start/congratulation");
    } catch (error: any) {
      console.error("Error during confirmation process:", error);
      alert(error.message || "An error occurred during confirmation");
    }
  };

  const handleResendCode = async (): Promise<void> => {
    const email = sessionStorage.getItem("email");
    if (!email) {
      alert("No se encontró el correo electrónico.");
      return;
    }

    try {
      await resendSignUpCode({ username: email });
      alert("Código de verificación reenviado.");
      resetTimer();
    } catch (error: any) {
      console.error("Failed to resend code", error);
      alert(error.message || "Failed to resend code. Please try again.");
    }
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

  const currentMethod = verificationMethods[currentMethodIndex];


  return (
    <main className='container mx-auto flex flex-col min-h-screen bg-[#f5f5f7]'>
      <div className='w-full max-w-6xl mx-auto flex flex-col min-h-screen'>
        <div className='py-5 px-4 sm:px-5'>
          <a href='https://testador.mx'>
            <Image
              src={graylogo}
              width={150}
              height={150}
              alt="Testador Logo"
            />
          </a>
        </div>
        <div className='px-4 sm:px-5 flex-grow'>
          <div className="mb-8 sm:mb-[30px] py-14">
            <div className='flex flex-col lg:flex-row gap-12 lg:gap-24'>
              {/* Left column - Title section */}
              <div className="lg:w-1/3 lg:sticky lg:top-8 lg:self-start">
                <h2 className="text-gray-500 text-lg font-bold mb-2 uppercase">
                  Verificación en 2 pasos
                </h2>
                <p className="text-2xl font-semibold mb-4">
                  Ingresa el código que te enviamos por correo
                  {/* {currentMethod.label} */}
                </p>
                <p className="text-gray-600 mb-6">
                  Es un código de 6 dígitos enviado a
                </p>
                <div className="flex items-center mb-4 p-4 pr-12 bg-gray-50 border border-gray-300 rounded-full shadow-sm">
                  <Image src={User} width={30} height={30} alt="Partner icon" />
                  <span className="text-gray-700 ml-3">
                    {sessionStorage.getItem("email")}
                  </span>
                </div>
                <div className="border-b border-gray-300 my-4 w-full"></div>
                <a href="#" className="text-blue-600 text-sm">
                  Necesito ayuda
                </a>
              </div>

              {/* Right column - OTP Form in white container */}
              <div className='lg:w-2/3'>
                <div className="bg-white rounded-2xl p-8 shadow-sm w-full">
                  <motion.div
                    key={currentMethod.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex items-center space-x-2 mb-6"
                  >
                    <div className="text-blue-600">
                      {currentMethod.icon}
                    </div>
                    <span className="text-gray-700 font-medium">
                      Código por correo electrónico
                      {/* {currentMethod.label} */}
                    </span>
                  </motion.div>

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

                  <div className="flex w-full justify-between items-center mb-4">
                    <p className="text-gray-500 text-sm">
                      {timer > 0 ? (
                        `Reenviar código en 00:${timer < 10 ? `0${timer}` : timer}`
                      ) : (
                        <span
                          className="text-blue-600 cursor-pointer"
                          onClick={handleResendCode}
                        >
                          Reenviar código
                        </span>
                      )}
                    </p>
                    <button
                      onClick={rotateVerificationMethod}
                      className="text-blue-600 text-sm hover:text-blue-700 transition-colors"
                    >
                      Cambiar método de verificación
                    </button>
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
                        className="absolute right-0 top-0 mt-8 bg-white rounded-2xl shadow-lg p-6 w-64 z-50"
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
                        {verificationMethods.map((method) => (
                          <div
                            key={method.id}
                            className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-3 rounded-lg w-full"
                            onClick={() => {
                              setCurrentMethodIndex(verificationMethods.findIndex(m => m.id === method.id));
                              togglePopup();
                              resetTimer();
                            }}
                          >
                            <div className="text-blue-600 mr-3">{method.icon}</div>
                            <span className="text-gray-800">
                              Mandar por {method.label}
                            </span>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default OTPInput;