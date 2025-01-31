'use client';
import { motion } from 'framer-motion';
import { FC, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import graylogo from "../../../assets/greylogo.png";
import Apple from "@/assets/Apple.png";
import Google from "@/assets/Google.png";
import PrimaryButton from "@/components/reusables/PrimaryButton";

interface SocialButtonProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

const SocialButton: FC<SocialButtonProps> = ({ src, alt, width, height, className = "" }) => (
  <button className={`w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-sm hover:shadow-md transition-shadow ${className}`}>
    <Image src={src} width={width} height={height} alt={alt} />
  </button>
);

const BasicsPage: FC = () => {
  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const emailInput = document.getElementById("email") as HTMLInputElement;
    const termsCheckbox = document.getElementById("terms") as HTMLInputElement;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(emailInput.value)) {
      alert("Por favor, ingresa un correo electrónico válido.");
      return;
    }

    if (!termsCheckbox.checked) {
      alert("Por favor, acepta los términos y condiciones para continuar.");
      return;
    }

    // Store user data in sessionStorage
    const firstName = (document.getElementById("name") as HTMLInputElement).value;
    const lastName = (document.getElementById("fatherLastName") as HTMLInputElement).value;
    const middleName = (document.getElementById("motherLastName") as HTMLInputElement).value;

    sessionStorage.setItem("email", emailInput.value);
    sessionStorage.setItem("firstName", firstName);
    sessionStorage.setItem("lastName", lastName);
    sessionStorage.setItem("middleName", middleName);

    router.push("/start/password");
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
    >
      <main className='container mx-auto flex flex-col min-h-screen bg-[#f5f5f7]'>
        <div className='w-full max-w-6xl mx-auto flex flex-col min-h-screen mb-6'>
          <div className='py-5 px-4 sm:px-5'>
            <a href='https://testador.mx'>
              <Image src={graylogo} width={150} height={150} alt="Testador Logo" />
            </a>
          </div>
          <div className='px-4 sm:px-5 flex-grow'>
            <div className='flex flex-col lg:flex-row gap-12 lg:gap-24 h-full'>
              {/* Left column - Title section - Hidden on mobile */}
              <div className="hidden lg:block lg:w-1/3">
                <h1 className='text-[32px] sm:text-[38px] font-[500] tracking-[-1.5px] leading-[1.2] sm:leading-[52px] mt-14 mb-[5px] text-[#1d1d1f]'>
                  Testamento digital
                </h1>
                <p className="text-[17px] sm:text-[20px] font-[300] tracking-[-0.1px] leading-[1.3] text-[#1d1d1f] mb-6">
                  Regitrate, nuestros usuarios pueden tardar 25 minutos en completar su testamento
                </p>
                <ul className="space-y-4 mb-8">
                  {[
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                    "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                    "Ut enim ad minim veniam, quis nostrud exercitation."
                  ].map((text, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#047aff]/10 flex items-center justify-center mt-0.5">
                        <svg
                          className="w-3.5 h-3.5 text-[#047aff]"
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
              </div>

              {/* Right column - Form in white container */}
              <div className='w-full lg:w-3/5 flex items-center'>
                <div className="bg-white rounded-2xl px-12 py-8 shadow-sm w-full max-w-xl mx-auto">
                  <h2 className="text-[26px] font-[500] text-[#1d1d1f] mb-6 whitespace-nowrap">Crear cuenta en Testamento.mx</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-6">
                      <div>
                        <label htmlFor="name" className="block text-[17px] font-[400] text-[#1d1d1f] mb-2">
                          Nombre
                        </label>
                        <input
                          type="text"
                          id="name"
                          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 transition-all"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="fatherLastName" className="block text-[17px] font-[400] text-[#1d1d1f] mb-2">
                          Apellido Paterno
                        </label>
                        <input
                          type="text"
                          id="fatherLastName"
                          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 transition-all"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="motherLastName" className="block text-[17px] font-[400] text-[#1d1d1f] mb-2">
                          Apellido Materno
                        </label>
                        <input
                          type="text"
                          id="motherLastName"
                          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 transition-all"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-[17px] font-[400] text-[#1d1d1f] mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 transition-all"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label className="flex items-start gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          id="terms"
                          className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500 transition-all"
                        />
                        <span className="text-[14px] text-[#1d1d1f]">
                          Acepto los términos y condiciones de Testamento.mx
                        </span>
                      </label>
                    </div>

                    <div className="flex justify-center">
                      <PrimaryButton type="submit">Continuar</PrimaryButton>
                    </div>

                    <div className="text-center">
                      <button
                        type="button"
                        onClick={handleLoginClick}
                        className="text-[14px] text-[#1d1d1f] hover:underline"
                      >
                        Ya tengo cuenta <span className="text-blue-500">Ingresar</span>
                      </button>
                    </div>

                    <div className="flex items-center my-4">
                      <div className="w-full h-[1px] bg-gray-300"></div>
                      <div className="w-full h-[1px] bg-gray-300"></div>
                    </div>

                    <div className="flex justify-center gap-4">
                      <SocialButton
                        src={Google.src}
                        width={20}
                        height={20}
                        alt="Google"
                      />
                      <SocialButton
                        src={Apple.src}
                        width={24}
                        height={24}
                        alt="Apple"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </motion.div>
  );
};

export default BasicsPage;