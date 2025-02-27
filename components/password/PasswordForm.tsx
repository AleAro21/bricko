'use client';
import { FC, FormEvent, useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { signUp } from "aws-amplify/auth";
import Image from "next/image";
import PrimaryButton from "@/components/reusables/PrimaryButton";
import Spinner from "@/components/reusables/Spinner";
import { flushSync } from "react-dom";

export interface PasswordStrength {
  label: string;
  colorClass: string;
  colorValue: string;
}

function getStrengthDetails(validCount: number, total: number): PasswordStrength {
  if (validCount === total) {
    return { label: "Lo lograste", colorClass: "text-green-600", colorValue: "rgb(0, 128, 0)" };
  } else if (validCount >= Math.ceil(total / 2)) {
    return { label: "Casi lo lograste", colorClass: "text-yellow-600", colorValue: "rgb(204, 204, 0)" };
  } else {
    return { label: "No segura", colorClass: "text-red-600", colorValue: "rgb(255, 0, 0)" };
  }
}

const PasswordForm: FC = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Define requirements based on the password value.
  const passwordRequirements = [
    { label: "Al menos una minúscula (a-z)", isValid: /[a-z]/.test(password) },
    { label: "Al menos una mayúscula (A-Z)", isValid: /[A-Z]/.test(password) },
    { label: "Al menos un número (0-9)", isValid: /\d/.test(password) },
    { label: "Al menos un caracter especial (!@#$%^&*)", isValid: /[!@#$%^&*(),.?":{}|<>]/.test(password) },
    { label: "Mínimo 10 caracteres", isValid: password.length >= 10 },
  ];

  const validCount = passwordRequirements.filter((req) => req.isValid).length;
  const totalRequirements = passwordRequirements.length;
  const isAllValid = validCount === totalRequirements;
  const strengthDetails = getStrengthDetails(validCount, totalRequirements);
  const progressWidth = (validCount / totalRequirements) * 100;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!isAllValid) {
      setErrorMessage("Aún no cumples con todos los requisitos de la contraseña.");
      return;
    }
    const email = sessionStorage.getItem("email");
    if (!email) {
      setErrorMessage("No se encontró el correo electrónico. Por favor, regresa al paso anterior.");
      return;
    }

    // Force the spinner to appear on the button immediately.
    // Note: We gather necessary data before disabling any inputs.
    const didNavigate = { value: false };
    // Use flushSync so the spinner is visible immediately.
    flushSync(() => {
      setIsLoading(true);
    });
    
    try {
      sessionStorage.setItem("password", password);
      const { isSignUpComplete, nextStep } = await signUp({
        username: email,
        password: password,
        options: { userAttributes: { email } },
      });
      if (isSignUpComplete || nextStep.signUpStep === "CONFIRM_SIGN_UP") {
        router.push("/start/otp");
        didNavigate.value = true;
      }
    } catch (error: any) {
      console.error("Sign up failed", error);
      setErrorMessage(error.message || "No se pudo completar el registro. Intenta de nuevo.");
      sessionStorage.removeItem("password");
      sessionStorage.removeItem("email");
      sessionStorage.removeItem("name");
      sessionStorage.removeItem("fatherLastName");
      sessionStorage.removeItem("motherLastName");
      router.push("/start/basics");
    } finally {
      if (!didNavigate.value) {
        setIsLoading(false);
      }
    }
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
    if (errorMessage) setErrorMessage(null);
  };

  return (
    <div className="bg-white rounded-2xl px-4 sm:px-8 md:px-12 py-8 shadow-lg w-full max-w-xl mx-auto">
      <h2 className="text-[22px] sm:text-[26px] font-[500] text-[#1d1d1f] mb-5">
        <span className="lg:hidden">Crea tu contraseña</span>
        <span className="hidden lg:inline">Crea tu contraseña</span>
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
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
                  <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8"/>
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="relative w-full h-1.5 rounded-full bg-gray-200 overflow-hidden">
            <div
              className="h-full transition-all duration-500 rounded-full"
              style={{ width: `${progressWidth}%`, backgroundColor: strengthDetails.colorValue }}
            />
          </div>
          <div className="flex justify-center">
            <span className={`text-sm ${strengthDetails.colorClass}`}>{strengthDetails.label}</span>
          </div>
        </div>

        {/* List of Requirements */}
        <div className="mt-4 space-y-2">
          {passwordRequirements.map((req, idx) => (
            <div key={idx} className="flex items-center gap-2">
              {req.isValid ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-check-circle-fill text-green-600" viewBox="0 0 16 16">
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.97 11.03a.75.75 0 0 0 1.08.022l3.992-3.99a.75.75 0 1 0-1.06-1.06L7.477 9.477 5.53 7.53a.75.75 0 1 0-1.06 1.06l2.5 2.44z"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x-circle-fill text-red-400" viewBox="0 0 16 16">
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.646 4.646a.5.5 0 0 0-.708.708L7.293 6.707 5.939 8.061a.5.5 0 1 0 .707.708l1.354-1.354 1.354 1.354a.5.5 0 0 0 .708-.708L8.707 6.707l1.354-1.353a.5.5 0 0 0-.708-.708L8 6l-1.354-1.354z"/>
                </svg>
              )}
              <span className={`text-sm ${req.isValid ? "text-green-600" : "text-gray-600"}`}>{req.label}</span>
            </div>
          ))}
        </div>

        {errorMessage && (
          <p className="text-red-500 text-sm text-center">{errorMessage}</p>
        )}

        <div className="flex justify-center pt-2.5">
          <PrimaryButton type="submit" disabled={!isAllValid || isLoading}>
            {isLoading ? <Spinner size={24} /> : "Continuar"}
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
};

export default PasswordForm;
