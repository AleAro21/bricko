"use client";
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
  <button className={`w-14 h-14 rounded-full bg-white flex items-center justify-center ${className}`}>
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
    <>
      <main className="container w-3/4 mx-auto flex flex-col h-full min-h-screen">
        <div className="py-4">
          <Image src={graylogo} width={100} alt="Gray Logo" />
        </div>
        <div className="flex flex-col md:w-[50%] max-w-[500px] mx-auto items-center justify-center h-full">
          <div>
            <p className="title py-2 text-center md:w-[60%] mx-auto">
              Bienvenido de nuevo
            </p>
            <p className="text-style py-4 text-center md:w-[60%] mx-auto">
              Ingresa tu correo electrónico y tu contraseña para continuar
            </p>
            <div>
              <form onSubmit={handleSubmit}>
                <div className="mb-2">
                  <div className="py-3">
                    <label htmlFor="email" className="text-style">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-6"
                      required
                    />
                  </div>
                  <div className="py-3">
                    <label htmlFor="passWord" className="text-style">
                      Contraseña
                    </label>
                    <input
                      type="password"
                      id="passWord"
                      className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-6"
                      required
                    />
                  </div>

                  <div className="flex justify-center">
                    <PrimaryButton type="submit" onClick={() => {}}>Continuar</PrimaryButton>
                  </div>
                  <div className="text-style pt-4 mb-10 text-center">
                    <p onClick={handleLoginClick} className="cursor-pointer">
                      No tengo cuenta{" "}
                      <span className="text-blue-500 underline">Registrar</span>
                    </p>
                  </div>
                  {/* Divider */}
                  <div className="flex items-center my-4">
                    <div className="w-full h-[1px] bg-gray-300"></div>
                    <span className="mx-3 text-gray-500">O</span>
                    <div className="w-full h-[1px] bg-gray-300"></div>
                  </div>

                  {/* Social Buttons */}
                  <div className="flex justify-center gap-4 mt-4">
                    <SocialButton
                      src={Google.src}
                      width={20}
                      height={20}
                      alt="Google"
                      className="mr-4 mb-10"
                    />
                      {/* <SocialButton
                        src={Facebook.src}
                        width={12}
                        height={12}
                        alt="Facebook"
                        className="mr-4 ml-4 mb-10"
                      /> */}
                    <SocialButton
                      src={Apple.src}
                      width={24}
                      height={24}
                      alt="Apple"
                      className="ml-4 mb-10"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default LoginPage;