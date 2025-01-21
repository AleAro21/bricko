'use client';

import { FC, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import graylogo from "../../../assets/greylogo.png";
import Apple from "@/assets/Apple.png";
import Facebook from "@/assets/Facebook.png";
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

const LoginPage: FC = () => {
  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const emailInput = document.getElementById("email") as HTMLInputElement;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(emailInput.value)) {
      alert("Por favor, ingresa un correo electrónico válido.");
      return;
    }

    router.push("/start/otp");
  };

  const handleLoginClick = (): void => {
    router.push("/start/basics");
  };

  return (
    <main className='container mx-auto flex flex-col min-h-screen bg-[#f5f5f7]'>
      <div className='w-full max-w-6xl mx-auto flex flex-col min-h-screen'>
        <div className='py-5 px-4 sm:px-5'>
          <a href='https://testador.mx'>
            <Image
              src={graylogo}
              width={100}
              height={100}
              alt="Testador Logo"
            />
          </a>
        </div>
        <div className='px-4 sm:px-5 flex-grow'>
          <div className='flex flex-col lg:flex-row gap-12 lg:gap-24 h-full'>
            {/* Left column - Title section */}
            <div className="lg:w-1/3">
              <h1 className='text-[32px] sm:text-[46px] font-[500] tracking-[-1.5px] leading-[1.2] sm:leading-[52px] mt-14 mb-[5px] text-[#1d1d1f]'>
                Bienvenido de nuevo
              </h1>
              <p className="text-[18px] sm:text-[20px] font-[400] tracking-[-0.1px] leading-[1.3] text-[#1d1d1f] mb-6">
                Ingresa tu correo electrónico y tu contraseña para continuar
              </p>
            </div>

            {/* Right column - Form in white container */}
            <div className='lg:w-2/3 flex items-center'>
              <div className="bg-white rounded-2xl p-8 shadow-sm w-full">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="email" className="block text-[17px] font-[400] text-[#1d1d1f] mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="passWord" className="block text-[17px] font-[400] text-[#1d1d1f] mb-2">
                        Contraseña
                      </label>
                      <input
                        type="password"
                        id="passWord"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <PrimaryButton type="submit">
                      Continuar
                    </PrimaryButton>
                  </div>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={handleLoginClick}
                      className="text-[14px] text-[#1d1d1f] hover:underline"
                    >
                      No tengo cuenta <span className="text-blue-500">Registrar</span>
                    </button>
                  </div>

                  <div className="flex items-center my-4">
                    <div className="w-full h-[1px] bg-gray-300"></div>
                    <span className="mx-3 text-gray-500">O</span>
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
  );
};

export default LoginPage;