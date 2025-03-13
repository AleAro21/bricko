'use client';

import { motion } from 'framer-motion';
import { FC, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import graylogo from "../../../assets/greylogo.png";
import Apple from "@/assets/Apple.png";
import Google from "@/assets/Google.png";
import PrimaryButton from "@/components/reusables/PrimaryButton";
import FooterTwo from '@/components/common/FooterTwo';
import Spinner from "@/components/reusables/Spinner";
import { Lock } from "phosphor-react";
import { flushSync } from "react-dom";

interface SocialButtonProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

const SocialButton: FC<SocialButtonProps> = ({ src, alt, width, height, className = "" }) => (
  <button
    className={`w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-sm hover:shadow-md transition-shadow border border-gray-100 ${className}`}
  >
    <Image src={src} width={width} height={height} alt={alt} />
  </button>
);

const BasicsPage: FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Use controlled state for form fields
  const [name, setName] = useState("");
  const [fatherLastName, setFatherLastName] = useState("");
  const [motherLastName, setMotherLastName] = useState("");
  const [email, setEmail] = useState("");
  const [terms, setTerms] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    // Force the spinner on the button to render immediately.
    flushSync(() => {
      setIsLoading(true);
    });
    let didNavigate = false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Por favor, ingresa un correo electrónico válido.");
      setIsLoading(false);
      return;
    }
    if (!terms) {
      alert("Por favor, acepta los términos y condiciones para continuar.");
      setIsLoading(false);
      return;
    }
    // Simulate an asynchronous action (e.g., an API call)
    await new Promise<void>((resolve) =>
      setTimeout(() => {
        // Store user data in sessionStorage
        sessionStorage.setItem("email", email);
        sessionStorage.setItem("name", name);
        sessionStorage.setItem("fatherLastName", fatherLastName);
        sessionStorage.setItem("motherLastName", motherLastName);
        router.push("/start/password");
        didNavigate = true;
        resolve();
      }, 1000)
    );
    if (!didNavigate) {
      setIsLoading(false);
    }
  };

  const handleLoginClick = (): void => {
    router.push("/start/login");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="flex flex-col min-h-screen"
    >
      <main className="container mx-auto flex flex-col flex-grow bg-[#f5f5f7] overflow-hidden">
        <div className="w-full max-w-6xl mx-auto flex flex-col min-h-[75vh] mb-4">
          <div className="py-4 px-4 sm:px-5">
            <a href="https://testador.mx">
              <Image src={graylogo} width={150} height={150} alt="Testador Logo" />
            </a>
          </div>
          <div className="px-4 sm:px-5 flex-grow">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-24 h-full">
              {/* Left column - Title section (hidden on mobile) */}
              <div className="hidden lg:block lg:w-1/3">
                <div className="inline-flex items-center h-[32px] bg-[#047aff] bg-opacity-10 px-[12px] py-[6px] rounded-md mb-2.5 mt-5">
                  <span className="text-[#047aff] text-[14px] font-[400]">CREA TU CUENTA</span>
                </div>
                <h1 className="text-[32px] sm:text-[38px] font-[500] tracking-[-1.5px] leading-[1.2] sm:leading-[52px] mb-[15px]">
                  <span className="text-[#1d1d1f]">Testamento digital </span>
                  <span
                    style={{
                      backgroundImage:
                        "linear-gradient(to left, #047aff 30%, #0d4ba3 100%)",
                    }}
                    className="inline-block text-transparent bg-clip-text"
                  >
                    México
                  </span>
                </h1>
                <ul className="space-y-4 mb-8">
                  {[
                    "Desde $599 MXN",
                    "No requiere abogado ni notario",
                    "100% seguro y legal"
                  ].map((text, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#047aff] flex items-center justify-center mt-0.5">
                        <svg
                          className="w-3.5 h-3.5 text-[#FFFFFF]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span className="text-[16px] text-[#1d1d1f] leading-6">{text}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex items-start gap-1">
                  <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center mt-0">
                    <Lock size={17} className="text-gray-500" />
                  </div>
                  <p className="text-gray-500 text-[14px] ml-2">
                    <span className="font-bold text-textColor">Tus datos siempre seguros</span> <br />
                    En Testamento.mx, usamos cifrado <span className="font-bold">AES-256</span> <span className="font-bold">blockchain</span> para garantizar la seguridad, integridad y privacidad de tu información.
                  </p>
                </div>
              </div>

              {/* Right column - Form container */}
              <div className="w-full lg:w-3/5 flex items-center mt-[30px] lg:mt-0">
                <div className="bg-white rounded-2xl px-4 sm:px-8 md:px-12 py-8 shadow-lg w-full max-w-xl mx-auto">
                  <h2 className="text-[22px] sm:text-[26px] font-[500] text-[#1d1d1f] mb-5 break-words sm:whitespace-nowrap">
                    <span className="lg:hidden">Regístrate</span>
                    <span className="hidden lg:inline">Regístrate en Testamento.mx</span>
                  </h2>

                  {/* Lock note for mobile only */}
                  <div className="flex items-start gap-1 mb-4 lg:hidden">
                    <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                      <Lock size={17} className="text-gray-500" />
                    </div>
                    <p className="text-gray-500 text-[14px] ml-2">
                      <span className="font-bold text-textColor">Tus datos siempre seguros</span> <br />
                      En Testamento.mx, usamos cifrado <span className="font-bold">AES-256</span> <span className="font-bold">blockchain</span> para garantizar la seguridad, integridad y privacidad de tu información.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-2.5">
                    <div className="space-y-2.5">
                      <div>
                        <label htmlFor="name" className="block text-[17px] font-[400] text-[#1d1d1f] mb-2.5">
                          Nombre
                        </label>
                        <input
                          type="text"
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 transition-all"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="fatherLastName" className="block text-[17px] font-[400] text-[#1d1d1f] mb-2.5">
                          Apellido Paterno
                        </label>
                        <input
                          type="text"
                          id="fatherLastName"
                          value={fatherLastName}
                          onChange={(e) => setFatherLastName(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 transition-all"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="motherLastName" className="block text-[17px] font-[400] text-[#1d1d1f] mb-2.5">
                          Apellido Materno
                        </label>
                        <input
                          type="text"
                          id="motherLastName"
                          value={motherLastName}
                          onChange={(e) => setMotherLastName(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 transition-all"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-[17px] font-[400] text-[#1d1d1f] mb-2.5">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 transition-all"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          id="terms"
                          checked={terms}
                          onChange={(e) => setTerms(e.target.checked)}
                          className="self-center h-5 w-5 sm:h-3 sm:w-3 rounded border-gray-300 text-blue-500 focus:ring-blue-500 mt-2.5 transition-all"
                        />
                        <span className="text-[12px] pt-2.5 text-[#1d1d1f]">
                          Acepto los{" "}
                          <a href="https://www.testamento.mx/terminos" className="text-blue-500 underline">
                            términos y condiciones
                          </a>{" "}
                          y{" "}
                          <a href="https://www.testamento.mx/privacidad" className="text-blue-500 underline">
                            políticas de privacidad
                          </a>{" "}
                          de Testamento.mx
                        </span>
                      </label>
                    </div>

                    <div className="flex justify-center pt-2.5">
                      <PrimaryButton type="submit" disabled={isLoading}>
                        {isLoading ? <Spinner size={24} /> : "Continuar"}
                      </PrimaryButton>
                    </div>

                    <div className="text-center mt-5">
                      <button
                        type="button"
                        onClick={() => router.push("/start/login")}
                        className="text-[14px] text-[#1d1d1f] hover:underline"
                      >
                        Ya tengo cuenta <span className="text-blue-500">Ingresar</span>
                      </button>
                    </div>

                    <div className="flex items-center my-5">
                      <div className="w-full h-[1px] bg-gray-300"></div>
                      <div className="w-full h-[1px] bg-gray-300"></div>
                    </div>

                    <div className="flex justify-center gap-4">
                      <SocialButton src={Google.src} width={20} height={20} alt="Google" />
                      <SocialButton src={Apple.src} width={24} height={24} alt="Apple" />
                    </div>

                    <div className="text-center text-sm text-gray-500 mt-5">
                      ¿Problemas para registrarte?{" "}
                      <a href="mailto:ayuda@testamento.mx" className="text-blue-500 underline text-[14px]">
                        Contáctanos
                      </a>
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
  );
};


export default BasicsPage;
