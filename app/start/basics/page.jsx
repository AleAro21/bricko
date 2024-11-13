"use client";
import { useRouter } from "next/navigation";
import graylogo from "../../../assets/greylogo.png";
import Apple from "@/assets/Apple.png";
import Facebook from "@/assets/Facebook.png";
import Google from "@/assets/Google.png";
import Image from "next/image";
import PrimaryButton from "@/components/reusables/PrimaryButton";

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

    if (!termsCheckbox.checked) {
      alert("Por favor, acepta los términos y condiciones para continuar.");
      return;
    }

    router.push("/start/password");
  };

  const handleLoginClick = () => {
    router.push("/start/login");
  };

  return (
    <>
      <main className="container w-3/4 mx-auto flex flex-col h-full min-h-screen">
        <div className="py-4 ">
          <Image src={graylogo} width={100} />
        </div>
        <div className="flex flex-col md:w-[60%] max-w-[500px] mx-auto items-center justify-center h-full ">
          <div className="">
            <p className="title py-2 text-center md:w-[80%] mx-auto">
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
                    <input
                      type="checkbox"
                      id="terms"
                      className="h-[13px] w-[13px]"
                    />
                    Acepto los términos y condiciones de Testamento.mx
                  </p>
                  <p className="text-style py-4 flex items-center gap-3">
                    <input type="checkbox" className="h-[24px] w-[24px]" />
                    Deseo recibir correos electrónicos con consejos, ofertas y
                    actualizaciones ocasionales de Testamento.mx
                  </p>
                  <div className="flex justify-center " >
                    <PrimaryButton>Continuar</PrimaryButton>
                  </div>
                  <div className="text-style pt-4 mb-10 text-center">
                    <p onClick={handleLoginClick} className="cursor-pointer">
                      Ya tengo cuenta{" "}
                      <span className="text-blue-500 underline">Ingresar</span>
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
