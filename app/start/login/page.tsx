'use client';
import { motion } from 'framer-motion';
import { FC, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Amplify } from 'aws-amplify';
import { signIn } from 'aws-amplify/auth';
import Image from "next/image";
import graylogo from "../../../assets/greylogo.png";
import Apple from "@/assets/Apple.png";
import Google from "@/assets/Google.png";
import PrimaryButton from "@/components/reusables/PrimaryButton";
import awsConfig from "@/aws-exports";

Amplify.configure(awsConfig);

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

const LoginPage: FC = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const emailInput = (document.getElementById("email") as HTMLInputElement).value;
    const passwordInput = (document.getElementById("password") as HTMLInputElement).value;

    try {
      const { isSignedIn, nextStep } = await signIn({ username: emailInput, password: passwordInput });
      if (isSignedIn) {
        console.log("User signed in successfully:", nextStep);
        router.push("/summary");
      } else {
        console.log("Next step required:", nextStep);
      }
    } catch (error: any) {
      console.error("Login failed", error);
      setErrorMessage(error.message || "Authentication failed. Please try again.");
    }
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
                  Bienvenido de nuevo
                </h1>
                <p className="text-[17px] sm:text-[20px] font-[300] tracking-[-0.1px] leading-[1.3] text-[#1d1d1f] mb-6">
                  Ingresa tu correo electrónico y tu contraseña para continuar
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
                  <h2 className="text-[26px] font-[500] text-[#1d1d1f] mb-6">Iniciar sesión en Testamento.mx</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-6">
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
                      <div>
                        <label htmlFor="password" className="block text-[17px] font-[400] text-[#1d1d1f] mb-2">
                          Contraseña
                        </label>
                        <input
                          type="password"
                          id="password"
                          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 transition-all"
                          required
                        />
                      </div>
                    </div>

                    {errorMessage && (
                      <p className="text-red-500 text-[14px] text-center">{errorMessage}</p>
                    )}

                    <div className="flex justify-center">
                      <PrimaryButton type="submit">Continuar</PrimaryButton>
                    </div>

                    <div className="text-center">
                      <button
                        type="button"
                        onClick={() => router.push("/start/basics")}
                        className="text-[14px] text-[#1d1d1f] hover:underline"
                      >
                        No tengo cuenta <span className="text-blue-500">Registrar</span>
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

export default LoginPage;