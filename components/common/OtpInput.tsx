'use client';

import React, { useState, useEffect, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Envelope, Phone, ChatCircle } from 'phosphor-react';
import { motion, AnimatePresence } from 'framer-motion';
import graylogo from '@/assets/greylogo.png';
import PrimaryButton from '@/components/reusables/PrimaryButton';
import User from "@/assets/TrustPerson.png";
import CustomerSupport from "@/assets/CustomerSupport.png";
import { confirmSignUp, resendSignUpCode, fetchAuthSession, signIn } from "aws-amplify/auth";
import { apiService } from '@/app/apiService';
import { useUser } from '@/context/UserContext';
import FooterTwo from '@/components/common/FooterTwo';

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
    { id: 'email', icon: <Envelope size={24} weight="regular" />, label: 'Email' },
    { id: 'sms', icon: <ChatCircle size={24} weight="regular" />, label: 'SMS' },
    { id: 'call', icon: <Phone size={24} weight="regular" />, label: 'Llamada' },
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="flex flex-col min-h-screen"
    >
      <main className='container mx-auto flex flex-col flex-grow bg-[#f5f5f7] overflow-hidden'>
        <div className='w-full max-w-6xl mx-auto flex flex-col min-h-[75vh] mb-4'>
          <div className='py-4 px-4 sm:px-5'>
            <a href='https://testador.mx'>
              <Image src={graylogo} width={150} height={150} alt="Testador Logo" />
            </a>
          </div>
          <div className='px-4 sm:px-5 flex-grow'>
            <div className='flex flex-col lg:flex-row gap-8 lg:gap-24 h-full'>
              {/* Left column - Title section */}
              <div className="lg:w-1/3">
                <div className="inline-flex items-center h-[32px] bg-[#047aff] bg-opacity-10 px-[12px] py-[6px] rounded-md mb-2.5 mt-5">
                  <span className="text-[#047aff] text-[14px] font-[400]">VERIFICACIÓN EN 2 PASOS</span>
                </div>

                <h1 className='text-[32px] sm:text-[38px] font-[500] tracking-[-1.5px] leading-[1.2] sm:leading-[52px] mb-[15px]'>
                  <span className='text-[#1d1d1f]'>Ingresa tu código de </span>
                  <span className='bg-gradient-to-r from-[#3d9bff] to-[#047aff] inline-block text-transparent bg-clip-text'>verificación</span>
                </h1>
                <p className="text-[16px] text-[#1d1d1f] leading-6 mb-4">
                  Es un código de 6 dígitos enviado a {" "}
                  <span className="font-bold">{sessionStorage.getItem("email")}</span>
                </p>
              </div>

              {/* Right column - OTP Form in white container */}
              <div className='w-full lg:w-3/5 flex items-center mt-[0px] lg:mt-0'>
                <div className="bg-white rounded-2xl px-4 sm:px-8 md:px-12 py-8 shadow-lg w-full max-w-xl mx-auto">
                  <motion.div
                    key={currentMethod.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex items-center space-x-2 mb-8"
                  >
                    <div className="text-[#047aff]">
                      <Envelope size={24} weight="regular" />
                    </div>
                    <span className="text-[#1d1d1f] text-[17px] font-[400]">
                      Código por correo electrónico
                    </span>
                  </motion.div>

                  <div className="flex justify-start space-x-4 mb-8">
                    {otp.map((data, index) => (
                      <input
                        className="w-12 h-12 border rounded-lg text-center text-xl focus:outline-none focus:border-[#047aff] border-gray-300 transition-all"
                        type="text"
                        maxLength={1}
                        key={index}
                        value={data}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e.target, index)}
                        onFocus={(e) => e.target.select()}
                      />
                    ))}
                  </div>

                  <div className="flex w-full justify-between items-center mb-8">
                    <p className="text-[14px] text-[#1d1d1f]">
                      {timer > 0 ? (
                        `Reenviar código en 00:${timer < 10 ? `0${timer}` : timer}`
                      ) : (
                        <span
                          className="text-[#047aff] cursor-pointer hover:underline"
                          onClick={handleResendCode}
                        >
                          Reenviar código
                        </span>
                      )}
                    </p>
                    <button
                      onClick={rotateVerificationMethod}
                      className="text-[#047aff] text-[14px] hover:underline transition-colors"
                    >
                      Cambiar método de verificación
                    </button>
                  </div>

                  <div className="flex w-full flex-col sm:flex-row sm:items-center sm:justify-between items-center gap-4">
                    <div className="w-full sm:w-auto flex justify-center">
                      <PrimaryButton onClick={handleSubmit}>Continuar</PrimaryButton>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full overflow-hidden">
                        <Image
                          src={CustomerSupport}
                          alt="Customer Support"
                          width={32}
                          height={32}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[#1d1d1f] text-[14px]">¿Necesitas ayuda?</span>
                        <a
                          href="mailto:ayuda@testamento.mx"
                          className="text-[#047aff] text-[14px] hover:underline"
                        >
                          Contáctanos
                        </a>
                      </div>
                    </div>
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
                        <h3 className="text-[18px] font-[500] mb-6 text-[#1d1d1f]">
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
                            <div className="text-[#047aff] mr-3">{method.icon}</div>
                            <span className="text-[#1d1d1f] text-[14px]">
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
      </main>
      <FooterTwo />
    </motion.div>
  );
};

export default OTPInput;