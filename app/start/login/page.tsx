'use client';
import { motion } from 'framer-motion';
import { FC, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Amplify } from 'aws-amplify';
import { signIn, fetchAuthSession, signOut } from 'aws-amplify/auth';
import { Lock, Eye, EyeSlash } from "phosphor-react"; // Import Lock icon
import Image from "next/image";
import graylogo from "../../../assets/greylogo.png";
import Apple from "@/assets/Apple.png";
import Google from "@/assets/Google.png";
import PrimaryButton from "@/components/reusables/PrimaryButton";
import FooterTwo from '@/components/common/FooterTwo';
import awsConfig from "@/aws-exports";
import { useUser } from "@/context/UserContext";
import { apiService } from "@/app/apiService";
import GradientCanvas from "@/components/reusables/GradientCanvas";
import Spinner from "@/components/reusables/Spinner";

Amplify.configure(awsConfig);

interface SocialButtonProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

const SocialButton: FC<SocialButtonProps> = ({ src, alt, width, height, className = "" }) => (
  <button className={`w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-sm hover:shadow-md transition-shadow border border-gray-100 ${className}`}>
    <Image src={src} width={width} height={height} alt={alt} />
  </button>
);

const LoginPage: FC = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useUser();

  const cleanupCognitoData = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error during cleanup:", error);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    const emailInput = (document.getElementById("email") as HTMLInputElement).value;
    const passwordInput = (document.getElementById("password") as HTMLInputElement).value;

    try {
      const { isSignedIn } = await signIn({ username: emailInput, password: passwordInput });

      if (isSignedIn) {
        const { tokens } = await fetchAuthSession();
        if (!tokens?.accessToken) {
          await cleanupCognitoData();
          throw new Error("Failed to retrieve tokens");
        }

        apiService.setToken(tokens.accessToken.toString());

        try {
          const userData = await apiService.getUser("123");
          setUser(userData);
          sessionStorage.setItem('userId', userData.id);
          router.push("/summary");
        } catch (error) {
          await cleanupCognitoData();
          console.error("Failed to fetch user data:", error);
          setErrorMessage("No se pudo obtener los datos del usuario. Es posible que el servicio no esté disponible temporalmente. Por favor, inténtelo de nuevo más tarde");
        }
      }
    } catch (error: any) {
      console.error("Login failed", error);
      await cleanupCognitoData();
      setErrorMessage(error.message || "Authentication failed. Please try again.");
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
                {/* Left column - Title section - Hidden on mobile */}
                <div className="hidden lg:block lg:w-1/3">
                  <div className="inline-flex items-center h-[32px] bg-[#047aff] bg-opacity-10 px-[12px] py-[6px] rounded-md mb-2.5 mt-5">
                    <span className="text-[#047aff] text-[14px] font-[400]">INICIAR SESIÓN</span>
                  </div>

                  <h1 className="text-[32px] sm:text-[38px] font-[500] tracking-[-1.5px] leading-[1.2] sm:leading-[52px] mb-[15px]">
                    <span className="text-[#1d1d1f]">Administra tu </span>
                    <span
                      style={{
                        backgroundImage:
                          "linear-gradient(to right, #7abaff 1%, #047aff 60%, #0d4ba3 100%)",
                      }}
                      className="inline-block text-transparent bg-clip-text"
                    >
                      testamento
                    </span>
                  </h1>




                  <ul className="space-y-4 mb-8">
                    {[
                      "Edita y actualiza en cualquier momento",
                      "Añade o cambia beneficiarios y activos",
                      "Elige quién y cuándo lo recibe",
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
                  {/* Security note with bullet-style lock icon */}
                  <div className="flex items-start gap-1">
                    <div className="flex-shrink-0 w-6 h-6  flex items-center justify-center mt-0">
                      <Lock weight="thin" size={17} className="text-gray-500" />
                    </div>
                    <p className="text-gray-500 text-[14px] ml-2">
                      En Testamento.mx, usamos cifrado <span className="font-bold">AES-256</span> <span className="font-bold">blockchain</span> para garantizar la seguridad, integridad y privacidad de tu información.
                    </p>
                  </div>
                </div>
                {/* Right column - Form in white container */}
                <div className='w-full lg:w-3/5 flex items-center mt-[30px] lg:mt-0'>
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-4 sm:px-8 md:px-12 py-8 shadow-lg w-full max-w-xl mx-auto">
                    <h2 className="text-[22px] sm:text-[26px] font-[500] text-[#1d1d1f] mb-5 break-words sm:whitespace-nowrap">Iniciar sesión en Testamento.mx</h2>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="space-y-5">
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
                        <div>
                          <label htmlFor="password" className="block text-[17px] font-[400] text-[#1d1d1f] mb-2.5">
                            Contraseña
                          </label>
                          <div className="relative">
                            <input
                              type={showPassword ? "text" : "password"}
                              id="password"
                              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 transition-all"
                              required
                              disabled={isLoading}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                              disabled={isLoading}
                            >
                              {showPassword ? (
                                <EyeSlash size={20} />
                              ) : (
                                <Eye size={20} />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>

                      {errorMessage && (
                        <p className="text-red-500 text-[14px] text-center mt-2.5">{errorMessage}</p>
                      )}

                      <div className="flex justify-center pt-2.5">
                        <PrimaryButton type="submit" disabled={isLoading}>
                          {isLoading ? <Spinner size={24} /> : 'Continuar'}
                        </PrimaryButton>
                      </div>

                      <div className="text-center mt-5">
                        <button
                          type="button"
                          onClick={() => router.push("/start/basics")}
                          className="text-[14px] text-[#1d1d1f] hover:underline"
                          disabled={isLoading}
                        >
                          No tengo cuenta <span className="text-blue-500">Registrar</span>
                        </button>
                      </div>

                      <div className="flex items-center my-5">
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

                      <div className="text-center text-sm text-gray-500 mt-5">
                        ¿Problemas para iniciar sesión? <a href="mailto: ayuda@testamento.mx" className="text-blue-500 underline">Contáctanos</a>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            {/* Mobile security note */}
            <div className="px-4 py-6 text-start lg:hidden">
              <div className="flex items-start gap-0">
                <div className="flex-shrink-0 w-6 h-6  flex items-center justify-start mt-0">
                  <Lock weight="thin" size={17} className="text-gray-500" />
                </div>
                <p className="text-gray-500 text-[14px] ml-2">
                  En Testamento.mx, usamos cifrado <span className="font-bold">AES-256</span> <span className="font-bold">blockchain</span> para garantizar la seguridad, integridad y privacidad de tu información.
                </p>
              </div>
            </div>
          </div>
        </main>

        <FooterTwo />
      </motion.div>
    </div>
  );
};

export default LoginPage;
