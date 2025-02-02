'use client';
import { motion } from 'framer-motion';
import { FC, FormEvent, useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { signUp } from 'aws-amplify/auth';
import graylogo from "../../../assets/greylogo.png";
import Image from "next/image";
import PrimaryButton from "@/components/reusables/PrimaryButton";
import FooterTwo from '@/components/common/FooterTwo';

interface PasswordStrength {
  label: string;
  color: string;
}

const PasswordPage: FC = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const pass: number = Math.min(password.length * 10, 100);

  const getStrengthDetails = (pass: number): PasswordStrength => {
    if (pass < 40) return { label: "Débil", color: "text-red-600" };
    if (pass < 70) return { label: "Mediana", color: "text-yellow-600" };
    return { label: "Fuerte", color: "text-green-600" };
  };

  const strengthDetails = getStrengthDetails(pass);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
  
    const email = sessionStorage.getItem("email");
    if (!email) {
      setErrorMessage("No se encontró el correo electrónico. Por favor, regresa al paso anterior.");
      return;
    }
  
    if (password.length < 10) {
      setErrorMessage("La contraseña debe tener al menos 10 caracteres.");
      return;
    }
  
    try {
      sessionStorage.setItem("password", password);
  
      const { isSignUpComplete, nextStep } = await signUp({
        username: email,
        password: password,
        options: {
          userAttributes: { email },
        },
      });
  
      if (isSignUpComplete) {
        console.log("User signed up successfully:", nextStep);
        router.push("/start/otp");
      } else if (nextStep.signUpStep === "CONFIRM_SIGN_UP") {
        router.push("/start/otp");
      }
    } catch (error: any) {
      console.error("Sign up failed", error);
      setErrorMessage(error.message || "Registration failed. Please try again.");
    }
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  const getColor = (): string => {
    const red = Math.max(255 - (pass * 2), 0);
    const green = Math.min(pass * 2, 128);
    return `rgb(${red}, ${green}, 0)`;
  };

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
              {/* Left column - Title section - Hidden on mobile */}
              <div className="hidden lg:block lg:w-1/3">
                <div className="inline-flex items-center h-[32px] bg-[#047aff] bg-opacity-10 px-[12px] py-[6px] rounded-md mb-2.5 mt-5">
                  <span className="text-[#047aff] text-[14px] font-[400]">CREA TU CONTRASEÑA</span>
                </div>

                <h1 className='text-[32px] sm:text-[38px] font-[500] tracking-[-1.5px] leading-[1.2] sm:leading-[52px] mb-[15px] text-[#1d1d1f]'>
                  Protege tu cuenta
                </h1>

                <p className="text-[16px] text-[#1d1d1f] leading-6 mb-8">
                  Una contraseña fuerte es tu primera defensa. Asegúrate de no compartirla.
                </p>
              </div>

              {/* Right column - Form in white container */}
              <div className='w-full lg:w-3/5 flex items-center mt-[30px] lg:mt-0'>
                <div className="bg-white rounded-2xl px-4 sm:px-8 md:px-12 py-8 shadow-lg w-full max-w-xl mx-auto">
                  <h2 className="text-[22px] sm:text-[26px] font-[500] text-[#1d1d1f] mb-5 break-words sm:whitespace-nowrap">
                    <span className="lg:hidden">Crea tu contraseña</span>
                    <span className="hidden lg:inline">Crea tu contraseña</span>
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-5">
                      <div>
                        <label htmlFor="password" className="block text-[17px] font-[400] text-[#1d1d1f] mb-2.5">
                          Contraseña (mínimo 10 caracteres)
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 transition-all"
                            required
                            minLength={10}
                            onChange={handlePasswordChange}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none flex items-center gap-2"
                          >
                            {showPassword ? (
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-slash-fill" viewBox="0 0 16 16">
                                <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z"/>
                                <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z"/>
                              </svg>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
                                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
                              </svg>
                            )}
                            <span className="text-sm">{showPassword ? "Hide" : "Mostrar"}</span>
                          </button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="relative w-full h-1.5 rounded-full bg-gray-200 overflow-hidden">
                          <div
                            className="h-full transition-all duration-500 rounded-full"
                            style={{
                              width: `${pass}%`,
                              backgroundColor: getColor(),
                            }}
                          />
                        </div>
                        <div className="flex justify-center">
                          <span className={`text-sm ${strengthDetails.color}`}>
                            {strengthDetails.label}
                          </span>
                        </div>
                      </div>
                    </div>

                    {errorMessage && (
                      <p className="text-red-500 text-sm text-center">{errorMessage}</p>
                    )}

                    <div className="flex justify-center pt-2.5">
                      <PrimaryButton type="submit">Continuar</PrimaryButton>
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

export default PasswordPage;