"use client";
import { useRouter } from "next/navigation";
import graylogo from "../../../assets/greylogo.png";
import Image from "next/image";
import Link from "next/link";

const page = () => {
  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
    const emailInput = document.getElementById("email").value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(emailInput)) {
      alert("Por favor, ingresa un correo electrónico válido.");
      return;
    }

    router.push("/start/password");
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
              Crea tu Testamento Digital
            </p>
            <p className="text-style py-4 text-center md:w-[60%] mx-auto">
              Nuestros usuarios pueden tardar 25 minutos en completar su
              testamento
            </p>
            <div className="">
              <form onSubmit={handleSubmit}>
                <div className="mb-2">
                  <div className="py-3">
                    <label htmlFor="country" className="text-style">
                      Nombre
                    </label>
                    <input
                      type="text"
                      id="country"
                      className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-6"
                      required
                    />
                  </div>
                  <div className="py-3">
                    <label htmlFor="fatherLastName" className="text-style">
                      Apellido Paterno
                    </label>
                    <input
                      type="text"
                      id="fatherLastName"
                      className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-6"
                      required
                    />
                  </div>
                  <div className="py-3">
                    <label htmlFor="motherLastName" className="text-style">
                      Apellido Materno
                    </label>
                    <input
                      type="text"
                      id="motherLastName"
                      className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-6"
                      required
                    />
                  </div>
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
                  <p className="text-style py-4 flex items-center gap-3">
                    <input type="checkbox" className="h-[13px] w-[13px]" />
                    Acepto los términos y condiciones de Testamento.mx
                  </p>
                  <p className="text-style py-4 flex items-center gap-3">
                    <input type="checkbox" className="h-[24px] w-[24px]" />
                    Deseo recibir correos electrónicos con consejos, ofertas y
                    actualizaciones ocasionales de Testamento.mx
                  </p>
                  <button
                    type="submit"
                    className="w-full text-center text-[14px] text-[#4a4a4a] font-[600] bg-[#FFDF4E] px-4 py-4 rounded-[100px] uppercase cursor-pointer"
                  >
                    CONTINUAR
                  </button>
                  <div className="text-style pt-4 mb-10 text-center">
                    <Link href="">
                      <p className="cursor-pointer">
                        Ya tengo cuenta{" "}
                        <span className="text-blue-500 underline">
                          Ingresar
                        </span>
                      </p>
                    </Link>
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
