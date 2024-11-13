"use client";
import { useRouter } from "next/navigation";
import graylogo from "../../../assets/greylogo.png";
import Image from "next/image";
import Apple from "@/assets/Apple.png";
import Facebook from "@/assets/Facebook.png";
import Google from "@/assets/Google.png";

const page = () => {
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailInput = document.getElementById("email").value;
    const termsCheckbox = document.getElementById("terms");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(emailInput)) {
      alert("Por favor, ingresa un correo electrónico válido.");
      return;
    }


    router.push("/start/otp");
  };

  const handleLoginClick = () => {
    router.push("/start/basics");
  };

  return (
    <>
      <main className="container w-3/4 mx-auto flex flex-col h-full min-h-screen">
        <div className="py-4 ">
          <Image src={graylogo} width={100} />
        </div>
        <div className="flex flex-col md:w-[50%] max-w-[500px] mx-auto items-center justify-center h-full ">
          <div className="">
            <p className="title py-2 text-center md:w-[60%] mx-auto">
              Bienvenido de nuevo
            </p>
            <p className="text-style py-4 text-center md:w-[60%] mx-auto">
              Ingresa tu correo electrónico y tu contraseña para continuar
            </p>
            <div className="">
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
                      type="text"
                      id="passWord"
                      className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-6"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full text-center text-[14px] text-[#FFFFFF] font-[600] bg-[#0171e3] px-4 py-4 mt-4 rounded-[100px] uppercase cursor-pointer"
                  >
                    CONTINUAR
                  </button>
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
                    <button className="w-14 h-14 mr-4 mb-10 rounded-full bg-white flex items-center justify-center">
                      <Image src={Google} width={20} height={20} alt="Google" />
                    </button>
                    <button className="w-14 h-14 mr-4 ml-4 mb-10 rounded-full bg-white flex items-center justify-center">
                      <Image
                        src={Facebook}
                        width={12}
                        height={12}
                        alt="Facebook"
                      />
                    </button>
                    <button className="w-14 h-14 ml-4 mb-10 rounded-full bg-white flex items-center justify-center">
                      <Image src={Apple} width={24} height={24} alt="Apple" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="w-full flex items-center justify-between"></div>
        </div>
      </main>
    </>
  );
};

export default page;
