"use client";
import { FC, FormEvent, useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import graylogo from "../../../assets/greylogo.png";
import Image from "next/image";
import PrimaryButton from "@/components/reusables/PrimaryButton";

interface PasswordStrength {
  label: string;
  color: string;
}

const PasswordPage: FC = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const pass: number = Math.min(password.length * 10, 100);

  const getStrengthDetails = (pass: number): PasswordStrength => {
    if (pass < 40) return { label: "Débil", color: "text-red-600" };
    if (pass < 70) return { label: "Mediana", color: "text-yellow-600" };
    return { label: "Fuerte", color: "text-green-600" };
  };

  const strengthDetails = getStrengthDetails(pass);

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    router.push("/start/phoneNumber");
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  // Dynamic color based on pass value, transitioning from red to green
  const getColor = (): string => {
    const red = Math.max(255 - (pass * 2), 0);
    const green = Math.min(pass * 2, 128);
    return `rgb(${red}, ${green}, 0)`;
  };

  return (
    <>
      <main className="container w-3/4 mx-auto flex flex-col h-full min-h-screen">
        <div className="py-4">
          <Image src={graylogo} width={100} alt="Gray Logo" />
        </div>
        <div className="flex flex-col md:w-[50%] max-w-[500px] mx-auto items-center justify-center h-full">
          <div>
            <p className="title py-2 text-center md:w-[60%] mx-auto">
              Crea tu contraseña
            </p>
            <p className="text-style py-4 text-center md:w-[60%] mx-auto">
              Una contraseña fuerte es tu primera defensa. Asegúrate de no
              compartirla.
            </p>
            <form onSubmit={handleSubmit} className="">
              <div className="mb-2">
                <div className="py-3">
                  <label htmlFor="password" className="text-style">
                    {`Contraseña (mínimo 10 caracteres)`}
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-6"
                    required
                    minLength={10}
                    onChange={handlePasswordChange}
                  />
                  <div
                    onClick={() => setShowPassword(!showPassword)}
                    className="flex items-center justify-end text-style py-4 gap-2 cursor-pointer"
                  >
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-eye-slash-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z" />
                        <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-eye-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                      </svg>
                    )}
                    <span className="text-[#000000]">
                      {showPassword ? "Hide" : "Mostrar"}
                    </span>
                  </div>
                </div>
                <div className="relative mt-4 w-full h-3 rounded-full bg-gray-200 overflow-hidden">
                  <div
                    className="h-full transition-all duration-500 rounded-full"
                    style={{
                      width: `${pass}%`,
                      backgroundColor: getColor(),
                    }}
                  ></div>
                </div>
                <div className="flex justify-center mt-2">
                  <span className={`text-sm ${strengthDetails.color}`}>
                    {strengthDetails.label}
                  </span>
                </div>
                <div className="flex justify-center mt-4">
                  <PrimaryButton onClick={handleSubmit}>Continuar</PrimaryButton>
                </div>
                <p className="text-style text-center pt-4">
                  Creando una cuenta, aceptas estar en conformidad con nuestros
                  Términos y Políticas de Privacidad.
                </p>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default PasswordPage;