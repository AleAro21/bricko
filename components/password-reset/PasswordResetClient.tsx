'use client';
import { useState, FormEvent, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Envelope, Lock, Eye, EyeSlash } from "phosphor-react";
import graylogo from "../../assets/greylogo.png";
import PrimaryButton from "@/components/reusables/PrimaryButton";
import FooterTwo from "@/components/common/FooterTwo";
import GradientCanvas from "@/components/reusables/GradientCanvas";
import Spinner from "@/components/reusables/Spinner";
import { resetPasswordAction, confirmResetPasswordAction } from "@/app/actions/passwordActions";

const PasswordResetClient = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams ? searchParams.get('token') : null;
  const mode = token ? 'reset' : 'forgot';
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Clear form state when switching between forgot/reset modes
  useEffect(() => {
    setErrorMessage(null);
    setSuccessMessage(null);
    setPassword("");
    setConfirmPassword("");
    setEmail("");
  }, [mode]);

  const handleForgotSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsLoading(true);

    if (!email) {
      setErrorMessage("Por favor, ingresa tu correo electrónico");
      setIsLoading(false);
      return;
    }

    try {
      // Call the server action to initiate password reset
      const result = await resetPasswordAction(email);
      
      if (result.success) {
        setSuccessMessage("Se ha enviado un correo electrónico con instrucciones para restablecer tu contraseña");
        setEmail("");
      } else {
        setErrorMessage(result.error || "No se pudo enviar el correo de restablecimiento. Intenta nuevamente.");
      }
    } catch (error: any) {
      console.error("Password reset error:", error);
      setErrorMessage("Error al procesar la solicitud. Por favor, intenta nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsLoading(true);

    if (!token) {
      setErrorMessage("Token de restablecimiento inválido o expirado");
      setIsLoading(false);
      return;
    }

    if (password.length < 8) {
      setErrorMessage("La contraseña debe tener al menos 8 caracteres");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden");
      setIsLoading(false);
      return;
    }

    try {
      const result = await confirmResetPasswordAction(token, password);
      
      if (result.success) {
        setSuccessMessage("Tu contraseña ha sido actualizada correctamente");
        setPassword("");
        setConfirmPassword("");
      } else {
        setErrorMessage(result.error || "No se pudo actualizar la contraseña. Intenta nuevamente.");
      }
    } catch (error: any) {
      console.error("Password reset error:", error);
      setErrorMessage("Error al procesar la solicitud. Por favor, intenta nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  // Content for the left column based on mode
  const getLeftColumnContent = () => {
    if (mode === 'forgot') {
      return {
        badge: "RECUPERAR CONTRASEÑA",
        title: (
          <>
            <span className="text-[#1d1d1f]">¿Olvidaste tu </span>
            <span
              style={{
                backgroundImage:
                  "linear-gradient(to right, #7abaff 1%, #047aff 60%, #0d4ba3 100%)",
              }}
              className="inline-block text-transparent bg-clip-text"
            >
              contraseña?
            </span>
          </>
        ),
        description: "No te preocupes, te enviaremos un correo electrónico con instrucciones para restablecer tu contraseña.",
        steps: [
          "Ingresa tu correo electrónico registrado",
          "Revisa tu bandeja de entrada",
          "Sigue las instrucciones del correo",
        ]
      };
    } else {
      return {
        badge: "NUEVA CONTRASEÑA",
        title: (
          <>
            <span className="text-[#1d1d1f]">Crea una </span>
            <span
              style={{
                backgroundImage:
                  "linear-gradient(to right, #7abaff 1%, #047aff 60%, #0d4ba3 100%)",
              }}
              className="inline-block text-transparent bg-clip-text"
            >
              nueva contraseña
            </span>
          </>
        ),
        description: "Crea una contraseña segura para proteger tu cuenta.",
        steps: [
          "Usa al menos 8 caracteres",
          "Combina letras, números y símbolos",
          "Evita información personal obvia",
        ]
      };
    }
  };

  const leftColumnContent = getLeftColumnContent();

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
        <main className="container mx-auto flex flex-col flex-grow overflow-hidden">
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
                    <span className="text-[#047aff] text-[14px] font-[400]">{leftColumnContent.badge}</span>
                  </div>
                  <h1 className="text-[32px] sm:text-[38px] font-[500] tracking-[-1.5px] leading-[1.2] sm:leading-[52px] mb-[15px]">
                    {leftColumnContent.title}
                  </h1>
                  <p className="text-[16px] text-[#1d1d1f] leading-6 mb-8">
                    {leftColumnContent.description}
                  </p>
                  <ul className="space-y-4 mb-8">
                    {leftColumnContent.steps.map((text, index) => (
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
                      <Lock weight="thin" size={17} className="text-gray-500" />
                    </div>
                    <p className="text-gray-500 text-[14px] ml-2">
                      En Testamento.mx, usamos cifrado <span className="font-bold">AES-256</span>{" "}
                      <span className="font-bold">blockchain</span> para garantizar la seguridad, integridad y privacidad de tu información.
                    </p>
                  </div>
                </div>
                {/* Right column - Form */}
                <div className="w-full lg:w-3/5 flex items-center mt-[30px] lg:mt-0">
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-4 sm:px-8 md:px-12 py-8 shadow-lg w-full max-w-xl mx-auto">
                    <h2 className="text-[22px] sm:text-[26px] font-[500] text-[#1d1d1f] mb-5 break-words sm:whitespace-nowrap">
                      {mode === 'forgot' ? 'Recuperar contraseña' : 'Crear nueva contraseña'}
                    </h2>
                    {successMessage ? (
                      <div className="space-y-5">
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-5">
                          <div className="flex">
                            <div className="flex-shrink-0">
                              {mode === 'forgot' ? <Envelope size={24} className="text-green-500" /> : <Lock size={24} className="text-green-500" />}
                            </div>
                            <div className="ml-3">
                              <p className="text-[15px] text-green-700">{successMessage}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-center pt-2.5">
                          <PrimaryButton onClick={() => router.push("/start/login")}>
                            {mode === 'forgot' ? 'Volver a iniciar sesión' : 'Ir a iniciar sesión'}
                          </PrimaryButton>
                        </div>
                      </div>
                    ) : mode === 'forgot' ? (
                      <form onSubmit={handleForgotSubmit} className="space-y-5">
                        <div>
                          <p className="text-[16px] text-[#1d1d1f] leading-6 mb-5">
                            Ingresa tu correo electrónico y te enviaremos instrucciones para restablecer tu contraseña.
                          </p>
                          <div>
                            <label htmlFor="email" className="block text-[17px] font-[400] text-[#1d1d1f] mb-2.5">
                              Email
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 transition-all"
                              required
                              disabled={isLoading}
                            />
                          </div>
                        </div>
                        {errorMessage && (
                          <p className="text-red-500 text-[14px] text-center mt-2.5">{errorMessage}</p>
                        )}
                        <div className="flex justify-center pt-2.5">
                          <PrimaryButton type="submit" disabled={isLoading}>
                            {isLoading ? <Spinner size={24} /> : "Enviar instrucciones"}
                          </PrimaryButton>
                        </div>
                        <div className="text-center mt-5">
                          <button
                            type="button"
                            onClick={() => router.push("/start/login")}
                            className="text-[14px] text-[#1d1d1f] hover:underline"
                            disabled={isLoading}
                          >
                            Volver a <span className="text-blue-500">iniciar sesión</span>
                          </button>
                        </div>
                      </form>
                    ) : (
                      <form onSubmit={handleResetSubmit} className="space-y-5">
                        <div className="space-y-5">
                          <div>
                            <label htmlFor="password" className="block text-[17px] font-[400] text-[#1d1d1f] mb-2.5">
                              Nueva contraseña
                            </label>
                            <div className="relative">
                              <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
                                {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                              </button>
                            </div>
                          </div>
                          <div>
                            <label htmlFor="confirmPassword" className="block text-[17px] font-[400] text-[#1d1d1f] mb-2.5">
                              Confirmar contraseña
                            </label>
                            <div className="relative">
                              <input
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirmPassword"
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 transition-all"
                                required
                                disabled={isLoading}
                              />
                              <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                                disabled={isLoading}
                              >
                                {showConfirmPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                              </button>
                            </div>
                          </div>
                        </div>
                        {errorMessage && (
                          <p className="text-red-500 text-[14px] text-center mt-2.5">{errorMessage}</p>
                        )}
                        <div className="flex justify-center pt-2.5">
                          <PrimaryButton type="submit" disabled={isLoading}>
                            {isLoading ? <Spinner size={24} /> : "Actualizar contraseña"}
                          </PrimaryButton>
                        </div>
                        <div className="text-center mt-5">
                          <button
                            type="button"
                            onClick={() => router.push("/start/login")}
                            className="text-[14px] text-[#1d1d1f] hover:underline"
                            disabled={isLoading}
                          >
                            Volver a <span className="text-blue-500">iniciar sesión</span>
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* Mobile security note */}
            <div className="px-4 py-6 text-start lg:hidden">
              <div className="flex items-start gap-0">
                <div className="flex-shrink-0 w-6 h-6 flex items-center justify-start mt-0">
                  <Lock weight="thin" size={17} className="text-gray-500" />
                </div>
                <p className="text-gray-500 text-[14px] ml-2">
                  En Testamento.mx, usamos cifrado <span className="font-bold">AES-256</span>{" "}
                  <span className="font-bold">blockchain</span> para garantizar la seguridad, integridad y privacidad de tu información.
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

export default PasswordResetClient;